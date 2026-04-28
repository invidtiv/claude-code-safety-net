import { dangerousInText } from '@/core/analyze/dangerous-text';
import { analyzeSegment, segmentChangesCwd } from '@/core/analyze/segment';
import { parseEnvAssignment, splitShellCommands } from '@/core/shell';
import { GIT_CONTEXT_ENV_OVERRIDES } from '@/core/worktree';
import {
  type AnalyzeNestedOverrides,
  type AnalyzeOptions,
  type AnalyzeResult,
  type Config,
  MAX_RECURSION_DEPTH,
} from '@/types';

const REASON_STRICT_UNPARSEABLE =
  'Command could not be safely analyzed (strict mode). Verify manually.';

export const REASON_RECURSION_LIMIT =
  'Command exceeds maximum recursion depth and cannot be safely analyzed.';
const GIT_CONTEXT_ENV_OVERRIDE_NAMES: ReadonlySet<string> = new Set(GIT_CONTEXT_ENV_OVERRIDES);
const GIT_CONTEXT_APPEND_ASSIGNMENT_RE = /^([A-Za-z_][A-Za-z0-9_]*)\+=/;

export type InternalOptions = AnalyzeOptions & { config: Config };

export function analyzeCommandInternal(
  command: string,
  depth: number,
  options: InternalOptions,
): AnalyzeResult | null {
  if (depth >= MAX_RECURSION_DEPTH) {
    return { reason: REASON_RECURSION_LIMIT, segment: command };
  }

  const segments = splitShellCommands(command);

  // Strict mode: block if command couldn't be parsed (unclosed quotes, etc.)
  // Detected when splitShellCommands returns a single segment containing the raw command
  if (
    options.strict &&
    segments.length === 1 &&
    segments[0]?.length === 1 &&
    segments[0][0] === command &&
    command.includes(' ')
  ) {
    return { reason: REASON_STRICT_UNPARSEABLE, segment: command };
  }

  const originalCwd = options.cwd;
  // Preserve effectiveCwd from caller (e.g., after cd in prior segment of outer command)
  // undefined = use cwd, null = unknown (after cd/pushd)
  let effectiveCwd: string | null | undefined =
    options.effectiveCwd !== undefined ? options.effectiveCwd : options.cwd;
  const shellGitContextState = createShellGitContextEnvState(options.envAssignments);

  for (const segment of segments) {
    const segmentStr = segment.join(' ');
    const segmentEnvAssignments = shellGitContextState.effectiveEnvAssignments;

    if (segment.length === 1 && segment[0]?.includes(' ')) {
      const textReason = dangerousInText(segment[0]);
      if (textReason) {
        return { reason: textReason, segment: segmentStr };
      }
      if (segmentChangesCwd(segment)) {
        effectiveCwd = null;
      }
      continue;
    }

    const reason = analyzeSegment(segment, depth, {
      ...options,
      cwd: originalCwd,
      effectiveCwd,
      envAssignments: segmentEnvAssignments,
      analyzeNested: (nestedCommand: string, overrides?: AnalyzeNestedOverrides): string | null => {
        // Pass current effectiveCwd so nested analysis sees CWD changes from prior segments
        const nestedEffectiveCwd =
          overrides && Object.hasOwn(overrides, 'effectiveCwd')
            ? overrides.effectiveCwd
            : effectiveCwd;
        return (
          analyzeCommandInternal(nestedCommand, depth + 1, {
            ...options,
            effectiveCwd: nestedEffectiveCwd,
            envAssignments: overrides?.envAssignments ?? segmentEnvAssignments,
            worktreeMode: overrides?.worktreeMode ?? options.worktreeMode,
          })?.reason ?? null
        );
      },
    });
    if (reason) {
      return { reason, segment: segmentStr };
    }

    if (segmentChangesCwd(segment)) {
      effectiveCwd = null;
    }

    applyShellGitContextEnvSegment(segment, shellGitContextState);
  }

  return null;
}

export interface ShellGitContextEnvState {
  effectiveEnvAssignments?: ReadonlyMap<string, string>;
  shellAssignments: Map<string, string>;
  exportedNames: Set<string>;
  allexport: boolean;
}

export function createShellGitContextEnvState(
  effectiveEnvAssignments?: ReadonlyMap<string, string>,
): ShellGitContextEnvState {
  return {
    effectiveEnvAssignments,
    shellAssignments: new Map(),
    exportedNames: new Set(),
    allexport: false,
  };
}

export function applyShellGitContextEnvSegment(
  tokens: readonly string[],
  state: ShellGitContextEnvState,
): void {
  const commandInfo = getShellCommandInfo(tokens);
  if (!commandInfo) {
    return;
  }

  const { command, commandIndex, leadingAssignments } = commandInfo;
  if (command === null) {
    for (const assignment of leadingAssignments.values()) {
      setShellGitContextAssignment(state, assignment);
    }
    return;
  }

  if (command === 'set') {
    const allexport = getAllexportChange(tokens, commandIndex);
    if (allexport !== null) {
      state.allexport = allexport;
    }
    return;
  }

  if (command !== 'export' && command !== 'typeset' && command !== 'declare') {
    return;
  }

  for (const assignment of leadingAssignments.values()) {
    setShellGitContextAssignment(state, assignment);
  }

  if (command === 'export') {
    const operandsStart = getExportOperandsStart(tokens, commandIndex);
    if (operandsStart === null) {
      return;
    }
    for (const token of tokens.slice(operandsStart)) {
      addExportedGitContextEnvAssignment(state, token);
    }
    return;
  }

  const operandsInfo = getTypesetOperandsInfo(tokens, commandIndex);
  if (operandsInfo === null) {
    return;
  }
  for (const token of tokens.slice(operandsInfo.operandsStart)) {
    addTypesetGitContextEnvAssignment(state, token, operandsInfo.exports);
  }
}

interface GitContextAssignment {
  name: string;
  value: string;
}

interface ShellCommandInfo {
  command: string | null;
  commandIndex: number;
  leadingAssignments: Map<string, GitContextAssignment>;
}

function getShellCommandInfo(tokens: readonly string[]): ShellCommandInfo | null {
  const leadingAssignments = new Map<string, GitContextAssignment>();
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    if (!token) {
      return null;
    }
    const assignment = parseShellAssignment(token);
    if (!assignment) {
      break;
    }
    if (GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(assignment.name)) {
      leadingAssignments.set(assignment.name, assignment);
    }
    i++;
  }

  if (i >= tokens.length) {
    return { command: null, commandIndex: i, leadingAssignments };
  }

  let commandIndex = i;
  let command = tokens[commandIndex] ?? null;
  if (command === 'builtin' || command === 'command') {
    commandIndex++;
    command = tokens[commandIndex] ?? null;
  }
  if (command === null) {
    return null;
  }

  return { command, commandIndex, leadingAssignments };
}

function parseShellAssignment(token: string): GitContextAssignment | null {
  return parseEnvAssignment(token) ?? parseGitContextAppendEnvAssignment(token);
}

function parseGitContextEnvAssignment(token: string): GitContextAssignment | null {
  const assignment = parseEnvAssignment(token) ?? parseGitContextAppendEnvAssignment(token);
  if (!assignment || !GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(assignment.name)) {
    return null;
  }
  return assignment;
}

function parseGitContextAppendEnvAssignment(token: string): GitContextAssignment | null {
  const match = token.match(GIT_CONTEXT_APPEND_ASSIGNMENT_RE);
  const name = match?.[1];
  if (!name || !GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(name)) {
    return null;
  }
  const eqIdx = token.indexOf('=');
  return { name, value: token.slice(eqIdx + 1) };
}

function setShellGitContextAssignment(
  state: ShellGitContextEnvState,
  assignment: GitContextAssignment,
): void {
  state.shellAssignments.set(assignment.name, assignment.value);
  if (state.allexport || state.exportedNames.has(assignment.name)) {
    setEffectiveGitContextAssignment(state, assignment);
  }
}

function setEffectiveGitContextAssignment(
  state: ShellGitContextEnvState,
  assignment: GitContextAssignment,
): void {
  const nextEnvAssignments = new Map(state.effectiveEnvAssignments ?? []);
  nextEnvAssignments.set(assignment.name, assignment.value);
  state.effectiveEnvAssignments = nextEnvAssignments;
}

function addExportedGitContextEnvAssignment(state: ShellGitContextEnvState, token: string): void {
  const assignment = parseGitContextEnvAssignment(token);
  if (assignment) {
    state.shellAssignments.set(assignment.name, assignment.value);
    state.exportedNames.add(assignment.name);
    setEffectiveGitContextAssignment(state, assignment);
    return;
  }

  if (GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(token)) {
    state.exportedNames.add(token);
    const value = state.shellAssignments.get(token);
    if (value !== undefined) {
      setEffectiveGitContextAssignment(state, { name: token, value });
    }
  }
}

function addTypesetGitContextEnvAssignment(
  state: ShellGitContextEnvState,
  token: string,
  exports: boolean,
): void {
  const assignment = parseGitContextEnvAssignment(token);
  if (assignment) {
    state.shellAssignments.set(assignment.name, assignment.value);
    if (exports) {
      state.exportedNames.add(assignment.name);
      setEffectiveGitContextAssignment(state, assignment);
    } else if (state.allexport || state.exportedNames.has(assignment.name)) {
      setEffectiveGitContextAssignment(state, assignment);
    }
    return;
  }

  if (exports && GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(token)) {
    state.exportedNames.add(token);
    const value = state.shellAssignments.get(token);
    if (value !== undefined) {
      setEffectiveGitContextAssignment(state, { name: token, value });
    }
  }
}

function getExportOperandsStart(tokens: readonly string[], commandIndex: number): number | null {
  const firstOperand = tokens[commandIndex + 1];
  if (firstOperand === undefined) {
    return commandIndex + 1;
  }
  if (firstOperand === '--') {
    return commandIndex + 2;
  }
  if (firstOperand.startsWith('-')) {
    return null;
  }
  return commandIndex + 1;
}

interface TypesetOperandsInfo {
  operandsStart: number;
  exports: boolean;
}

function getTypesetOperandsInfo(
  tokens: readonly string[],
  commandIndex: number,
): TypesetOperandsInfo | null {
  let i = commandIndex + 1;
  let hasExportFlag = false;
  while (i < tokens.length) {
    const token = tokens[i];
    if (!token) {
      return null;
    }
    if (token === '--') {
      return { operandsStart: i + 1, exports: hasExportFlag };
    }
    if (token.startsWith('-')) {
      hasExportFlag = hasExportFlag || token.slice(1).includes('x');
      i++;
      continue;
    }
    if (token.startsWith('+')) {
      return null;
    }
    return { operandsStart: i, exports: hasExportFlag };
  }
  return { operandsStart: i, exports: hasExportFlag };
}

function getAllexportChange(tokens: readonly string[], commandIndex: number): boolean | null {
  let i = commandIndex + 1;
  while (i < tokens.length) {
    const token = tokens[i];
    if (!token) {
      return null;
    }
    if (token === '-o' || token === '+o') {
      if (tokens[i + 1] === 'allexport') {
        return token === '-o';
      }
      i += 2;
      continue;
    }
    if (token.startsWith('-') && token.slice(1).includes('a')) {
      return true;
    }
    if (token.startsWith('+') && token.slice(1).includes('a')) {
      return false;
    }
    i++;
  }
  return null;
}
