import { resolve } from 'node:path';
import { REASON_SAFETY_NET_FAILED_CLOSED } from '@/bin/hook/common';
import { analyzeCommand, loadConfig } from '@/core/analyze';
import { redactSecrets, writeAuditLog } from '@/core/audit';
import type { LoadConfigOptions } from '@/core/config';
import { ENV_FLAGS, envTruthy, getCCSafetyNetEnvModes } from '@/core/env';
import { formatBlockedMessage } from '@/core/format';

type PiApi = {
  on: (
    event: 'tool_call',
    handler: (event: unknown, ctx: PiToolUseContext) => PiToolUseResult,
  ) => void;
};

type PiToolUseContext = {
  cwd: string;
  sessionManager: {
    getSessionFile: () => string | undefined;
  };
  safetyNetAnalyzeCommand?: typeof analyzeCommand;
  safetyNetConfigOptions?: LoadConfigOptions;
};

type PiToolUseResult = { block: true; reason: string } | undefined;

type PiToolUseEvent = {
  type?: string;
  toolName?: string;
  input?: Record<string, unknown>;
};

type PiShellToolAdapter = {
  commandField: string;
  cwdField?: string;
};

const PI_SHELL_TOOL_ADAPTERS: Partial<Record<string, PiShellToolAdapter>> = {
  bash: {
    commandField: 'command',
  },
  Shell: {
    commandField: 'command',
    cwdField: 'working_directory',
  },
};

type PiShellToolUse =
  | {
      command: string;
      cwd: string;
    }
  | {
      malformed: true;
    };

export function registerToolUseEvent(pi: PiApi): void {
  pi.on('tool_call', handlePiToolUse);
}

export function handlePiToolUse(event: unknown, ctx: PiToolUseContext): PiToolUseResult {
  const shellToolUse = getPiShellToolUse(event, ctx);
  if (!shellToolUse) return undefined;

  if ('malformed' in shellToolUse) {
    return blockPiToolUse(REASON_SAFETY_NET_FAILED_CLOSED);
  }

  const command = shellToolUse.command;
  const cwd = shellToolUse.cwd;
  const modes = getCCSafetyNetEnvModes();
  let result: ReturnType<typeof analyzeCommand>;
  try {
    result = (ctx.safetyNetAnalyzeCommand ?? analyzeCommand)(command, {
      cwd,
      config: loadConfig(cwd, {
        repairLocalRulebooks: true,
        ...ctx.safetyNetConfigOptions,
      }),
      strict: modes.strict,
      paranoidRm: modes.paranoidRm,
      paranoidInterpreters: modes.paranoidInterpreters,
      worktreeMode: modes.worktreeMode,
    });
  } catch (error) {
    if (envTruthy(ENV_FLAGS.debug)) {
      console.error(
        `CC Safety Net debug: pi tool_use analysis failed: ${redactSecrets(error instanceof Error ? error.message : String(error))}`,
      );
    }
    return blockPiToolUse(REASON_SAFETY_NET_FAILED_CLOSED, command, command);
  }

  if (!result) {
    const sessionId = ctx.sessionManager.getSessionFile();
    if (sessionId && envTruthy(ENV_FLAGS.debug)) {
      writeAuditLog(sessionId, command, command, 'allowed', cwd, {
        decision: 'allow',
      });
    }
    return undefined;
  }

  const sessionId = ctx.sessionManager.getSessionFile();
  if (sessionId) {
    writeAuditLog(sessionId, command, result.segment, result.reason, cwd);
  }
  return blockPiToolUse(result.reason, command, result.segment, result.manualPermissionAdvice);
}

function getPiShellToolUse(event: unknown, ctx: PiToolUseContext): PiShellToolUse | undefined {
  if (!event || typeof event !== 'object') return undefined;
  const toolUse = event as PiToolUseEvent;
  if (typeof toolUse.toolName !== 'string') return undefined;

  const adapter = PI_SHELL_TOOL_ADAPTERS[toolUse.toolName];
  if (!adapter) return undefined;
  if (!toolUse.input || typeof toolUse.input !== 'object') return { malformed: true };

  const command = toolUse.input[adapter.commandField];
  if (typeof command !== 'string') return { malformed: true };

  const cwdInput = adapter.cwdField ? toolUse.input[adapter.cwdField] : undefined;
  const cwd = typeof cwdInput === 'string' ? resolve(ctx.cwd, cwdInput) : ctx.cwd;
  return { command, cwd };
}

function blockPiToolUse(
  reason: string,
  command?: string,
  segment?: string,
  manualPermissionAdvice?: boolean,
): PiToolUseResult {
  return {
    block: true,
    reason: formatBlockedMessage({
      reason,
      command,
      segment,
      redact: redactSecrets,
      manualPermissionAdvice,
    }),
  };
}
