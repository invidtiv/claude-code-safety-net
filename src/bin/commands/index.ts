import { doctorCommand } from './doctor';
import { explainCommand } from './explain';
import { hookCommand } from './hook';
import { ruleCommand } from './rule';
import { statuslineCommand } from './statusline';
import type { Command } from './types';

/** @internal Exported for testing */
export type { Command, CommandOption, CommandSubcommand } from './types';

/**
 * All registered commands.
 * Order determines display order in main help.
 * @internal Exported for testing
 */
export const commands: readonly Command[] = [
  doctorCommand,
  explainCommand,
  ruleCommand,
  hookCommand,
  statuslineCommand,
];

/**
 * Lookup a command by name or alias.
 * Returns undefined if not found.
 */
export function findCommand(nameOrAlias: string): Command | undefined {
  const normalized = nameOrAlias.toLowerCase();
  return commands.find(
    (cmd) =>
      cmd.name.toLowerCase() === normalized ||
      cmd.aliases?.some((alias) => alias.toLowerCase() === normalized),
  );
}

/**
 * Get all visible commands (non-hidden) for main help display.
 */
export function getVisibleCommands(): readonly Command[] {
  return commands.filter((cmd) => !cmd.hidden);
}
