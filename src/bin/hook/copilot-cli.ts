import { parseHookJson, runHookAdapter } from '@/bin/hook/common';
import { redactSecrets } from '@/core/audit';
import { formatBlockedMessage } from '@/core/format';
import type { CopilotCliHookInput, CopilotCliHookOutput } from '@/types';

function outputCopilotDeny(reason: string, command?: string, segment?: string): void {
  const message = formatBlockedMessage({
    reason,
    command,
    segment,
    redact: redactSecrets,
  });

  const output: CopilotCliHookOutput = {
    permissionDecision: 'deny',
    permissionDecisionReason: message,
  };

  console.log(JSON.stringify(output));
}

export async function runCopilotCliHook(): Promise<void> {
  await runHookAdapter<CopilotCliHookInput>({
    outputDeny: outputCopilotDeny,
    isSupported: (input) => input.toolName === 'bash',
    getCommand: (input, outputDeny) =>
      parseHookJson<{ command?: string }>(
        input.toolArgs,
        outputDeny,
        'Failed to parse toolArgs JSON.',
      )?.command,
    getCwd: (input) => input.cwd,
    getSessionId: (input) => `copilot-${input.timestamp ?? Date.now()}`,
  });
}
