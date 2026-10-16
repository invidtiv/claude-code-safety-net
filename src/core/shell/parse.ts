import {
  type CommandParserLimits,
  type CommandProgram,
  DEFAULT_COMMAND_PARSER_LIMITS,
  type ShellKind,
} from './model';
import { parsePosixCommand } from './posix';
import { parsePowerShellCommand, shouldUsePowerShellParser } from './powershell';

export { DEFAULT_COMMAND_PARSER_LIMITS };

const AUTO_POWERSHELL_DIVERGENCE_ISSUE = {
  code: 'ambiguous-auto-powershell',
  message:
    'the shell was guessed as PowerShell, and #, a backtick, or a backslash before a quote or line break reads differently in PowerShell and POSIX shells',
};

const POSIX_DIVERGENT_TEXT = /[#`]|\\['"\n\r]/;

export function parseCommand(
  source: string,
  dialect: ShellKind = 'auto',
  limits: CommandParserLimits = DEFAULT_COMMAND_PARSER_LIMITS,
): CommandProgram {
  if (dialect === 'powershell') return parsePowerShellCommand(source, limits);
  if (
    dialect === 'auto' &&
    shouldUsePowerShellParser(source.slice(0, limits.maxInputLength), limits)
  ) {
    const program = parsePowerShellCommand(source, limits);
    if (program.status === 'limited' || !POSIX_DIVERGENT_TEXT.test(source)) {
      return program;
    }
    return {
      ...program,
      status: 'invalid',
      issues: [...program.issues, AUTO_POWERSHELL_DIVERGENCE_ISSUE],
    };
  }
  return parsePosixCommand(source, limits);
}
