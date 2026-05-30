import { runHookAdapter } from '@/bin/hook/common';
import { redactSecrets } from '@/core/audit';
import { formatBlockedMessage } from '@/core/format';
import type { GeminiHookInput, GeminiHookOutput } from '@/types';

function outputGeminiDeny(reason: string, command?: string, segment?: string): void {
  const message = formatBlockedMessage({
    reason,
    command,
    segment,
    redact: redactSecrets,
  });

  // Gemini CLI expects exit code 0 with JSON for policy blocks; exit 2 is for hook errors.
  const output: GeminiHookOutput = {
    decision: 'deny',
    reason: message,
    systemMessage: message,
  };

  console.log(JSON.stringify(output));
}

export async function runGeminiCLIHook(): Promise<void> {
  await runHookAdapter<GeminiHookInput>({
    outputDeny: outputGeminiDeny,
    isSupported: (input) =>
      input.hook_event_name === 'BeforeTool' && input.tool_name === 'run_shell_command',
    getCommand: (input) => input.tool_input?.command,
    getCwd: (input) => input.cwd,
    getSessionId: (input) => input.session_id,
  });
}
