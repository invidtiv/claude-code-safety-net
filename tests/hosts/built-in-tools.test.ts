import { describe, expect, test } from 'bun:test';
import { getBuiltInToolRefusal } from '@/hosts/built-in-tools';

const shellRefusal = (name: string, integrations: string) =>
  `"${name}" is a built-in shell tool of ${integrations}, and is already analyzed. Built-in tools cannot be declared.`;

describe('built-in shell tools', () => {
  test.each([
    ['Bash', 'Claude Code'],
    ['PowerShell', 'Claude Code'],
    ['Monitor', 'Claude Code'],
    ['Bash', 'Codex'],
    ['bash', 'GitHub Copilot CLI'],
    ['powershell', 'GitHub Copilot CLI'],
    ['Shell', 'Cursor'],
    ['exec', 'Devin CLI'],
    ['write_to_process', 'Devin CLI'],
    ['Execute', 'Factory Droid'],
    ['run_shell_command', 'Gemini CLI'],
    ['run_terminal_command', 'Grok Build'],
    ['terminal', 'Hermes Agent'],
    ['Bash', 'Kimi Code'],
    ['run_command', 'Antigravity CLI'],
    ['manage_task', 'Antigravity CLI'],
    ['powershell', 'Pi'],
    ['pwsh', 'DeepSeek Harness'],
    ['bash', 'OpenCode'],
    ['shell', 'OpenCode'],
    ['exec', 'OpenClaw'],
  ])('%s is named as a shell tool of %s', (name, integration) => {
    expect(getBuiltInToolRefusal(name)).toStartWith(`"${name}" is a built-in shell tool of `);
    expect(getBuiltInToolRefusal(name)).toContain(integration);
  });

  test('every integration sharing a name is listed in alphabetical order', () => {
    expect(getBuiltInToolRefusal('bash')).toBe(
      shellRefusal(
        'bash',
        'Claude Code, Codex, DeepSeek Harness, GitHub Copilot CLI, Kimi Code, OpenCode and Pi',
      ),
    );
  });

  test('a name owned by one integration names it alone', () => {
    expect(getBuiltInToolRefusal('pwsh')).toBe(shellRefusal('pwsh', 'DeepSeek Harness'));
  });

  test('a spelling that differs only in case and separators still matches', () => {
    expect(getBuiltInToolRefusal('Run-Shell-Command')).toBe(
      shellRefusal('Run-Shell-Command', 'Gemini CLI'),
    );
  });
});

describe('built-in file tools', () => {
  for (const name of ['read', 'Write', 'apply_patch', 'Grep', 'glob']) {
    test(`${name} is refused as a file tool`, () => {
      expect(getBuiltInToolRefusal(name)).toBe(
        `"${name}" is a built-in file tool, and is already analyzed. Built-in tools cannot be declared.`,
      );
    });
  }
});

test('a community tool name is not refused', () => {
  expect(getBuiltInToolRefusal('ops_bash')).toBeUndefined();
});
