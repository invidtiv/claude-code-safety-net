#!/usr/bin/env node
import { findCommand } from '@/bin/commands';
import { parseDoctorFlags, runDoctor } from '@/bin/doctor/index';
import {
  explainCommand,
  formatTraceHuman,
  formatTraceJson,
  parseExplainFlags,
} from '@/bin/explain/index';
import { printHelp, printVersion, showCommandHelp } from '@/bin/help';
import { runHookInstallCommand } from '@/bin/hook/install';
import {
  findHookIntegrationByFlag,
  findLegacyTopLevelHookIntegration,
  type HookIntegration,
} from '@/bin/hook/integrations';
import { runRuleCommand } from '@/bin/rule';
import { printStatusline } from '@/bin/statusline';

type ParsedCommand =
  | { mode: 'hook'; integration: HookIntegration }
  | { mode: 'hook-install'; args: string[] }
  | { mode: 'hook-uninstall'; args: string[] }
  | { mode: 'rule'; args: string[] }
  | { mode: 'statusline' }
  | { mode: 'doctor'; args: string[] }
  | { mode: 'explain'; args: string[] };

/**
 * Check if --help or -h is present in args (but not as a quoted command argument).
 */
function hasHelpFlag(args: readonly string[]): boolean {
  return args.includes('--help') || args.includes('-h');
}

/**
 * Handle "help <command>" pattern.
 * Returns true if handled (printed help or error), false if not the help command.
 */
function handleHelpCommand(args: readonly string[]): boolean {
  if (args[0] !== 'help') {
    return false;
  }

  const commandName = args[1];
  if (!commandName) {
    // Just "help" with no argument - show main help
    printHelp();
    process.exit(0);
  }

  if (showCommandHelp(commandName)) {
    process.exit(0);
  }

  console.error(`Unknown command: ${commandName}`);
  console.error("Run 'cc-safety-net --help' for available commands.");
  process.exit(1);
}

/**
 * Handle "<command> --help" pattern for subcommands.
 * Returns true if handled, false otherwise.
 */
function handleCommandHelp(args: readonly string[]): boolean {
  if (!hasHelpFlag(args)) {
    return false;
  }

  const commandName = args[0];
  if (!commandName || commandName.startsWith('-')) {
    // Not a subcommand, will be handled by global help
    return false;
  }

  // Check if this is a known command
  const command = findCommand(commandName);
  if (command) {
    showCommandHelp(commandName);
    process.exit(0);
  }

  return false;
}

function parseCliArgs(args: string[]): ParsedCommand | null {
  // Handle "help <command>" pattern first
  if (handleHelpCommand(args)) {
    return null;
  }

  // Handle "<command> --help" pattern
  if (handleCommandHelp(args)) {
    return null;
  }

  if (args[0] === 'explain') {
    return { mode: 'explain', args: args.slice(1) };
  }

  if (args[0] === 'rule') {
    return { mode: 'rule', args: args.slice(1) };
  }

  if (args[0] === 'statusline') {
    if (args.includes('--claude-code') || args.includes('-cc')) return { mode: 'statusline' };
    showCommandHelp('statusline');
    process.exit(1);
  }

  if (args[0] === 'hook') {
    if (args[1] === 'install') return { mode: 'hook-install', args: args.slice(2) };
    if (args[1] === 'uninstall') return { mode: 'hook-uninstall', args: args.slice(2) };

    const integration = findHookIntegrationByFlag(args);
    if (integration) return { mode: 'hook', integration };

    showCommandHelp('hook');
    process.exit(1);
  }

  if (args.length === 0 || hasHelpFlag(args)) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-V')) {
    printVersion();
    process.exit(0);
  }

  if (args.includes('doctor') || args.includes('--doctor')) {
    return { mode: 'doctor', args };
  }

  const legacyIntegration = findLegacyTopLevelHookIntegration(args[0]);
  if (legacyIntegration) return { mode: 'hook', integration: legacyIntegration };

  console.error(`Unknown option: ${args[0]}`);
  console.error("Run 'cc-safety-net --help' for usage.");
  process.exit(1);
}

async function main(): Promise<void> {
  const command = parseCliArgs(process.argv.slice(2));
  if (command?.mode === 'hook') {
    await command.integration.run();
  } else if (command?.mode === 'hook-install') {
    process.exit(runHookInstallCommand('install', command.args));
  } else if (command?.mode === 'hook-uninstall') {
    process.exit(runHookInstallCommand('uninstall', command.args));
  } else if (command?.mode === 'rule') {
    process.exit(await runRuleCommand(command.args));
  } else if (command?.mode === 'statusline') {
    await printStatusline();
  } else if (command?.mode === 'doctor') {
    const flags = parseDoctorFlags(command.args);
    const exitCode = await runDoctor({
      json: flags.json,
      skipUpdateCheck: flags.skipUpdateCheck,
    });
    process.exit(exitCode);
  } else if (command?.mode === 'explain') {
    // Check for --help in explain args
    if (hasHelpFlag(command.args) || command.args.length === 0) {
      showCommandHelp('explain');
      process.exit(0);
    }

    const flags = parseExplainFlags(command.args);
    if (!flags) {
      process.exit(1);
    }

    const result = explainCommand(flags.command, { cwd: flags.cwd });
    const asciiOnly = !!process.env.NO_COLOR || !process.stdout.isTTY;

    if (flags.json) {
      console.log(formatTraceJson(result));
    } else {
      console.log(formatTraceHuman(result, { asciiOnly }));
    }
    process.exit(0);
  }
}

main().catch((error: unknown) => {
  console.error('Safety Net error:', error);
  process.exit(1);
});
