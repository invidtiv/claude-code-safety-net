import { runHookAdapter } from '@/bin/hook/common';
import { redactSecrets } from '@/core/audit';
import { formatBlockedMessage } from '@/core/format';
import type { HookOutput, KimiCliHookInput } from '@/types';

function outputKimiDeny(
  reason: string,
  command?: string,
  segment?: string,
  manualPermissionAdvice?: boolean,
): void {
  const message = formatBlockedMessage({
    reason,
    command,
    segment,
    redact: redactSecrets,
    manualPermissionAdvice,
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

export async function runKimiCliHook(): Promise<void> {
  await runHookAdapter<KimiCliHookInput>({
    outputDeny: outputKimiDeny,
    isSupported: (input) => input.hook_event_name === 'PreToolUse' && input.tool_name === 'Shell',
    getCommand: (input) => input.tool_input?.command,
    getCwd: (input) => input.cwd,
    getSessionId: (input) => input.session_id,
  });
}
