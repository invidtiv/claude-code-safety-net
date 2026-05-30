import { runHookAdapter } from '@/bin/hook/common';
import { redactSecrets } from '@/core/audit';
import { formatBlockedMessage } from '@/core/format';
import type { HookInput, HookOutput } from '@/types';

function outputDeny(reason: string, command?: string, segment?: string): void {
  const message = formatBlockedMessage({
    reason,
    command,
    segment,
    redact: redactSecrets,
    manualPermissionAdvice: reason.includes('rule sync') ? false : undefined,
  });

  const output: HookOutput = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: message,
    },
  };

  console.log(JSON.stringify(output));
}

export async function runClaudeCodeHook(): Promise<void> {
  await runHookAdapter<HookInput>({
    outputDeny,
    isSupported: (input) => input.tool_name === 'Bash',
    getCommand: (input) => input.tool_input?.command,
    getCwd: (input) => input.cwd,
    getSessionId: (input) => input.session_id,
  });
}
