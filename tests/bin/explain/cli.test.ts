/**
 * Tests for the explain command CLI flag parsing.
 */
import { describe, expect, test } from 'bun:test';
import { createLinkedWorktreeFixture, runSafetyNetCli, withTempDir } from '../../helpers.ts';

async function explainJson(args: string[]) {
  const result = await runSafetyNetCli(['explain', '--json', ...args]);
  return {
    parsed: JSON.parse(result.output),
    exitCode: result.exitCode,
  };
}

describe('explain CLI flag parsing', () => {
  test('explain preserves --debug in command when it appears after first positional arg', async () => {
    const { parsed, exitCode } = await explainJson(['echo', '--debug']);
    const parseStep = parsed.trace.steps.find((s: { type: string }) => s.type === 'parse');
    expect(parseStep.input).toBe('echo --debug');
    expect(exitCode).toBe(0);
  });

  test('explain preserves --json in command when after positional arg', async () => {
    const { parsed, exitCode } = await explainJson(['git', 'push', '--json']);
    const parseStep = parsed.trace.steps.find((s: { type: string }) => s.type === 'parse');
    expect(parseStep.input).toBe('git push --json');
    expect(exitCode).toBe(0);
  });

  test('explain with -- separator treats everything after as command', async () => {
    const { parsed, exitCode } = await explainJson(['--', '--debug']);
    const parseStep = parsed.trace.steps.find((s: { type: string }) => s.type === 'parse');
    expect(parseStep.input).toBe('--debug');
    expect(exitCode).toBe(0);
  });

  test('explain unknown flag is treated as start of command', async () => {
    const { parsed, exitCode } = await explainJson(['--unknown-flag', 'foo']);
    const parseStep = parsed.trace.steps.find((s: { type: string }) => s.type === 'parse');
    expect(parseStep.input).toBe('--unknown-flag foo');
    expect(exitCode).toBe(0);
  });

  test('explain single-arg command with pipe preserves shell operators', async () => {
    const { parsed, exitCode } = await explainJson(['git status | rm -rf /']);
    const parseStep = parsed.trace.steps.find((s: { type: string }) => s.type === 'parse');
    expect(parseStep.input).toBe('git status | rm -rf /');
    expect(parseStep.segments).toEqual([
      ['git', 'status'],
      ['rm', '-rf', '/'],
    ]);
    expect(parsed.result).toBe('blocked');
    expect(exitCode).toBe(0);
  });

  test('explain --cwd <path> passes cwd to analysis', async () => {
    await withTempDir('safety-net-explain-', async (tempDir) => {
      const { parsed, exitCode } = await explainJson(['--cwd', tempDir, 'rm -rf ./foo']);
      expect(parsed.result).toBe('allowed');
      expect(exitCode).toBe(0);
    });
  });

  test('explain --json reports worktree relaxation', async () => {
    const fixture = createLinkedWorktreeFixture();
    try {
      const proc = Bun.spawn(
        [
          'bun',
          'src/bin/cc-safety-net.ts',
          'explain',
          '--json',
          '--cwd',
          fixture.linkedWorktree,
          'git reset --hard',
        ],
        {
          stdout: 'pipe',
          stderr: 'pipe',
          env: { ...process.env, SAFETY_NET_WORKTREE: '1' },
        },
      );

      const output = await new Response(proc.stdout).text();
      const exitCode = await proc.exited;

      const parsed = JSON.parse(output);
      const worktreeStep = parsed.trace.segments
        .flatMap((s: { steps: Array<{ type: string }> }) => s.steps)
        .find((s: { type: string }) => s.type === 'worktree-relaxation');
      expect(parsed.result).toBe('allowed');
      expect(worktreeStep).toBeDefined();
      expect(exitCode).toBe(0);
    } finally {
      fixture.cleanup();
    }
  });

  test('explain --cwd without path shows error', async () => {
    const proc = Bun.spawn(['bun', 'src/bin/cc-safety-net.ts', 'explain', '--cwd'], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    expect(stderr).toContain('--cwd requires a path');
    expect(exitCode).toBe(1);
  });

  test('explain --cwd with following flag shows error', async () => {
    const proc = Bun.spawn(
      ['bun', 'src/bin/cc-safety-net.ts', 'explain', '--cwd', '--json', 'echo hello'],
      {
        stdout: 'pipe',
        stderr: 'pipe',
      },
    );

    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    expect(stderr).toContain('--cwd requires a path');
    expect(exitCode).toBe(1);
  });
});
