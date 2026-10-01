import { resolve } from 'node:path';
import { formatDenial } from '@/core/denial';
import type { PathResolver } from '@/core/environment';
import { getNonCommandToolInputKind } from '@/core/tool-input';
import { firstTrustedRoot } from '@/gate/intake';
import { type CommandToolKind, createToolInvocation, type ToolInvocation } from '@/gate/invocation';
import {
  createPluginToolCallHandler,
  type MalformedToolCall,
  malformedToolCall,
  type PluginHandlerOptions,
  type PluginToolCallHost,
  refusedCwdToolCall,
} from '@/hosts/hook/plugin-adapter';

type DeepSeekHarnessToolExecution = {
  name: unknown;
  arguments: unknown;
  agent?: { session: { header: { id: string; cwd: string } } };
};

type DeepSeekHarnessToolGuard = (execution: unknown) => string | undefined;

type DeepSeekHarnessContext = {
  tools: { guard: (guard: DeepSeekHarnessToolGuard) => () => void };
};

const DEEPSEEK_HARNESS_COMMAND_TOOLS = new Map<string, CommandToolKind>([
  ['bash', 'posix'],
  ['pwsh', 'powershell'],
]);

const DEEPSEEK_HARNESS_HOST: PluginToolCallHost<unknown, string, string | undefined> = {
  agent: 'deepseek-harness',
  debugLabel: 'deepseek-harness tool guard',
  extract: (execution, launchCwd, paths) => getDeepSeekHarnessToolCall(execution, launchCwd, paths),
  getSessionId: (execution) =>
    (execution as DeepSeekHarnessToolExecution | null)?.agent?.session.header.id,
  allow: undefined,
  block: (denial) => formatDenial(denial),
  includeEvidenceOnError: (toolCall) => toolCall.route.kind === 'command',
};

export function registerDeepSeekHarnessGuard(ctx: DeepSeekHarnessContext): void {
  const handle = createDeepSeekHarnessGuardHandler();
  ctx.tools.guard((execution) => handle(execution, process.cwd()));
}

/** @internal */
export function createDeepSeekHarnessGuardHandler(
  options: PluginHandlerOptions = {},
): (execution: unknown, launchCwd: string) => string | undefined {
  return createPluginToolCallHandler(DEEPSEEK_HARNESS_HOST, options);
}

function getDeepSeekHarnessToolCall(
  execution: unknown,
  launchCwd: string,
  paths: PathResolver,
): MalformedToolCall | ToolInvocation {
  if (!execution || typeof execution !== 'object') return malformedToolCall(null);
  const toolCall = execution as DeepSeekHarnessToolExecution;
  const toolName = toolCall.name;
  if (typeof toolName !== 'string' || toolName.trim() === '') return malformedToolCall(null);

  const sessionCwd = toolCall.agent?.session.header.cwd ?? launchCwd;
  const workspace = firstTrustedRoot([sessionCwd], paths);
  if (!workspace) {
    return refusedCwdToolCall(
      { directory: 'session', problem: 'unusable', cwd: sessionCwd },
      { toolName },
    );
  }

  const input = toolCall.arguments;
  const shell = DEEPSEEK_HARNESS_COMMAND_TOOLS.get(toolName);
  if (!shell) {
    return createToolInvocation(
      toolName,
      input,
      { kind: getNonCommandToolInputKind(toolName) },
      { configCwd: workspace, executionCwd: workspace },
      null,
    );
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return malformedToolCall(workspace, { toolName });
  }
  const shellInput = input as Record<string, unknown>;
  const command = shellInput.command;
  if (typeof command !== 'string' || command.trim() === '') {
    return malformedToolCall(workspace, { toolName });
  }

  const workdir = shellInput.workdir;
  if (workdir !== undefined && (typeof workdir !== 'string' || workdir.trim() === '')) {
    return malformedToolCall(workspace, { command, toolName });
  }
  const executionCwd =
    workdir === undefined ? workspace : firstTrustedRoot([resolve(workspace, workdir)], paths);
  if (!executionCwd) {
    return refusedCwdToolCall(
      { directory: 'requested', problem: 'unusable', cwd: workdir as string },
      { command, toolName },
    );
  }

  return createToolInvocation(
    toolName,
    input,
    { kind: 'command', shell },
    { configCwd: workspace, executionCwd },
    command,
  );
}
