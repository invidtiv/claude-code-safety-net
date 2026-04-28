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
  let effectiveEnvAssignments = options.envAssignments;
  const shellGitContextAssignments = new Map<string, string>();

  for (const segment of segments) {
    const segmentStr = segment.join(' ');
    const segmentEnvAssignments = effectiveEnvAssignments;

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

    const shellAssignments = getShellGitContextEnvAssignments(segment);
    for (const [k, v] of shellAssignments) {
      shellGitContextAssignments.set(k, v);
    }

    const exportedEnvAssignments = getExportedGitContextEnvAssignments(
      segment,
      shellGitContextAssignments,
    );
    if (exportedEnvAssignments.size > 0) {
      const nextEnvAssignments = new Map(effectiveEnvAssignments ?? []);
      for (const [k, v] of exportedEnvAssignments) {
        nextEnvAssignments.set(k, v);
      }
      effectiveEnvAssignments = nextEnvAssignments;
    }
  }

  return null;
}

export function getShellGitContextEnvAssignments(tokens: readonly string[]): Map<string, string> {
  const result = new Map<string, string>();

  for (const token of tokens) {
    const assignment = parseEnvAssignment(token);
    if (!assignment) {
      return new Map();
    }
    if (GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(assignment.name)) {
      result.set(assignment.name, assignment.value);
    }
  }

  return result;
}

export function getExportedGitContextEnvAssignments(
  tokens: readonly string[],
  shellGitContextAssignments: ReadonlyMap<string, string>,
): Map<string, string> {
  const result = new Map<string, string>();
  const command = tokens[0];
  if (!command) {
    return result;
  }

  const operandsStart =
    command === 'export'
      ? getExportOperandsStart(tokens)
      : command === 'typeset' || command === 'declare'
        ? getTypesetExportOperandsStart(tokens)
        : null;

  if (operandsStart === null) {
    return result;
  }

  for (const token of tokens.slice(operandsStart)) {
    addExportedGitContextEnvAssignment(result, shellGitContextAssignments, token);
  }
  return result;
}

function getExportOperandsStart(tokens: readonly string[]): number | null {
  const firstOperand = tokens[1];
  if (firstOperand === undefined) {
    return 1;
  }
  if (firstOperand === '--') {
    return 2;
  }
  if (firstOperand.startsWith('-')) {
    return null;
  }
  return 1;
}

function getTypesetExportOperandsStart(tokens: readonly string[]): number | null {
  let i = 1;
  let hasExportFlag = false;
  while (i < tokens.length) {
    const token = tokens[i];
    if (!token) {
      return null;
    }
    if (token === '--') {
      return hasExportFlag ? i + 1 : null;
    }
    if (token.startsWith('-')) {
      hasExportFlag = hasExportFlag || token.slice(1).includes('x');
      i++;
      continue;
    }
    if (token.startsWith('+')) {
      return null;
    }
    return hasExportFlag ? i : null;
  }
  return hasExportFlag ? i : null;
}

function addExportedGitContextEnvAssignment(
  result: Map<string, string>,
  shellGitContextAssignments: ReadonlyMap<string, string>,
  token: string,
): void {
  const assignment = parseEnvAssignment(token);
  if (assignment) {
    if (GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(assignment.name)) {
      result.set(assignment.name, assignment.value);
    }
    return;
  }

  if (GIT_CONTEXT_ENV_OVERRIDE_NAMES.has(token)) {
    const value = shellGitContextAssignments.get(token);
    if (value !== undefined) {
      result.set(token, value);
    }
  }
}
