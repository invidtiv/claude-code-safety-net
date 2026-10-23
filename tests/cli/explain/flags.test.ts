import { afterEach, describe, expect, test } from 'bun:test';
import { join } from 'node:path';
import { parseExplainFlags } from '@/cli/explain/flags';
import { captureConsole } from '../../helpers/console-capture';
import { createTempRoot, removeTempRoots } from '../../helpers/temp-home';

afterEach(removeTempRoots);

const USAGE =
  'Usage: cc-safety-net explain [--json] [--cwd <path>] [--shell <auto|posix|powershell>] <command>';

describe('explain argument parsing', () => {
  test('preserves shell argument boundaries and literal apostrophes', () => {
    expect(parseExplainFlags(['--json', 'printf', '%s', "a'b", 'two words', ''])).toEqual({
      json: true,
      cwd: undefined,
      command: "printf %s 'a'\\''b' 'two words' ''",
    });
  });

  test('the delimiter permits a command that starts with dashes', () => {
    expect(parseExplainFlags(['--', '--version'])).toEqual({
      json: false,
      cwd: undefined,
      command: '--version',
    });
  });

  test('selects the shell dialect to parse the command in', () => {
    expect(parseExplainFlags(['--shell', 'posix', 'git status'])).toEqual({
      json: false,
      cwd: undefined,
      shell: 'posix',
      command: 'git status',
    });
  });

  test('quotes separate arguments the way PowerShell reads them', () => {
    expect(parseExplainFlags(['--shell', 'powershell', 'Write-Output', "a'b"])).toEqual({
      json: false,
      cwd: undefined,
      shell: 'powershell',
      command: "Write-Output 'a''b'",
    });
  });

  test('rejects a shell dialect it does not know', async () => {
    const result = await captureConsole(() => parseExplainFlags(['--shell', 'bash', 'git status']));
    expect(result.returned).toBeNull();
    expect(result.log).toEqual([]);
    expect(result.error).toEqual([
      'Error: --shell must be auto, posix, or powershell, got: bash',
      USAGE,
    ]);
  });

  test('rejects a nonexistent working directory before analysis', async () => {
    const cwd = join(createTempRoot('explain-flags-'), 'missing');
    const result = await captureConsole(() => parseExplainFlags(['--cwd', cwd, 'git status']));
    expect(result.returned).toBeNull();
    expect(result.log).toEqual([]);
    expect(result.error).toEqual([`Error: --cwd path does not exist: ${cwd}`]);
  });

  test.each([
    [[], ['Error: No command provided', USAGE]],
    [
      ['--cwd'],
      ['--cwd requires a value', USAGE, 'Pass -- before a command that starts with dashes.'],
    ],
  ])('rejects incomplete arguments %j', async (args, errors) => {
    const result = await captureConsole(() => parseExplainFlags(args));
    expect(result.returned).toBeNull();
    expect(result.log).toEqual([]);
    expect(result.error).toEqual(errors);
  });
});
