import { runClaudeCodeHook } from '@/bin/hook/claude-code';
import { runCopilotCliHook } from '@/bin/hook/copilot-cli';
import { runGeminiCLIHook } from '@/bin/hook/gemini-cli';
import { runKimiCliHook } from '@/bin/hook/kimi-cli';

export type HookIntegration = {
  id: string;
  displayName: string;
  flags: readonly [string, string];
  description: string;
  legacyTopLevel: boolean;
  run: () => Promise<void>;
};

export const hookIntegrations: readonly HookIntegration[] = [
  {
    id: 'claude-code',
    displayName: 'Claude Code',
    flags: ['-cc', '--claude-code'],
    description: 'Run as Claude Code PreToolUse hook',
    legacyTopLevel: true,
    run: runClaudeCodeHook,
  },
  {
    id: 'copilot-cli',
    displayName: 'Copilot CLI',
    flags: ['-cp', '--copilot-cli'],
    description: 'Run as Copilot CLI PreToolUse hook',
    legacyTopLevel: true,
    run: runCopilotCliHook,
  },
  {
    id: 'gemini-cli',
    displayName: 'Gemini CLI',
    flags: ['-gc', '--gemini-cli'],
    description: 'Run as Gemini CLI BeforeTool hook',
    legacyTopLevel: true,
    run: runGeminiCLIHook,
  },
  {
    id: 'kimi-cli',
    displayName: 'Kimi CLI',
    flags: ['-kc', '--kimi-cli'],
    description: 'Run as Kimi CLI PreToolUse hook',
    legacyTopLevel: false,
    run: runKimiCliHook,
  },
];

export function findHookIntegrationByFlag(args: readonly string[]): HookIntegration | undefined {
  return hookIntegrations.find((integration) =>
    integration.flags.some((flag) => args.includes(flag)),
  );
}

export function findLegacyTopLevelHookIntegration(
  flag: string | undefined,
): HookIntegration | undefined {
  return hookIntegrations.find(
    (integration) =>
      integration.legacyTopLevel &&
      integration.flags.some((integrationFlag) => integrationFlag === flag),
  );
}
