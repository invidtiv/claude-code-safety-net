import { afterEach, beforeEach, expect, test } from 'bun:test';
import { realpathSync } from 'node:fs';
import { join } from 'node:path';
import { createCwdDenial, createFailedClosedDenial, formatDenial } from '@/core/denial';
import {
  createDeepSeekHarnessGuardHandler,
  registerDeepSeekHarnessGuard,
} from '@/hosts/deepseek-harness/guard';
import { createHookFixture, type HookFixture } from '../../helpers/hook-hosts';
import {
  captureInProcessCall,
  describeDifferential,
  expectFallbackDeny,
} from '../../helpers/in-process';

const SESSION = 'dsh-session-1';
const ANALYZER_FAILURE = 'injected analyzer failure';
const EXECUTION_FAILURE = 'injected execution failure';
const HOME_DELETE_RULE = 'Rule: powershell.remove-item-recursive-force-root-or-home';
const HOME_CWD_DELETE_RULE = 'Rule: rm.recursive-force-home-cwd';
const cwdReason = (directory: 'session' | 'requested') =>
  createCwdDenial({ directory, problem: 'unusable', cwd: '' }).reason;

type Row = {
  name: string;
  execution: (fixture: HookFixture) => unknown;
  launchCwd?: (fixture: HookFixture) => string;
  breaks?: true;
  env?: Record<string, string | undefined>;
  contains?: string;
  blocked: boolean;
  lines: number;
};

const tool =
  (name: string, args: unknown, sessionCwd = (fixture: HookFixture) => fixture.project) =>
  (fixture: HookFixture) => ({
    name,
    arguments: typeof args === 'function' ? args(fixture) : args,
    agent: { session: { header: { id: SESSION, cwd: sessionCwd(fixture) } } },
  });

const ROWS: readonly Row[] = [
  {
    name: 'a destructive bash command',
    execution: tool('bash', { command: 'git push --force origin main', description: 'push' }),
    contains: 'BLOCKED by CC Safety Net',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a safe bash command recorded as an allow',
    execution: tool('bash', { command: 'git status', description: 'status' }),
    blocked: false,
    lines: 1,
  },
  {
    name: 'a pwsh deletion of the home directory',
    execution: tool('pwsh', { command: 'Remove-Item -Recurse -Force $HOME' }),
    contains: HOME_DELETE_RULE,
    blocked: true,
    lines: 1,
  },
  {
    name: 'a pwsh deletion after an assignment to the read-only $HOME',
    execution: tool('pwsh', {
      command: "$home = 'D:\\temp'\nRemove-Item -Recurse -Force $home",
    }),
    contains: HOME_DELETE_RULE,
    blocked: true,
    lines: 1,
  },
  {
    name: 'a recursive deletion inside the session workspace',
    execution: tool('bash', { command: 'rm -rf build' }),
    blocked: false,
    lines: 1,
  },
  {
    name: 'the same deletion from a workdir in the home directory',
    execution: tool('bash', (fixture: HookFixture) => ({
      command: 'rm -rf build',
      workdir: fixture.home,
    })),
    contains: HOME_CWD_DELETE_RULE,
    blocked: true,
    lines: 1,
  },
  {
    name: 'a workdir inside the workspace',
    execution: tool('bash', { command: 'git status', workdir: 'sub' }),
    blocked: false,
    lines: 1,
  },
  {
    name: 'a workdir that does not exist',
    execution: tool('bash', { command: 'git status', workdir: 'missing' }),
    contains: cwdReason('requested'),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a blank workdir',
    execution: tool('bash', { command: 'git status', workdir: '' }),
    contains: 'failed closed',
    blocked: true,
    lines: 1,
  },
  {
    name: 'bash arguments that are not an object',
    execution: tool('bash', 'git status'),
    contains: 'failed closed',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a bash call with a blank command',
    execution: tool('bash', { command: '   ' }),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a read of a private key',
    execution: tool('read', (fixture: HookFixture) => ({
      file_path: join(fixture.home, '.ssh', 'id_rsa'),
    })),
    contains: 'Rule: secret.home.ssh',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a read of a file in the project',
    execution: tool('read', { file_path: 'README.md' }),
    blocked: false,
    lines: 0,
  },
  { name: 'an execution that is null', execution: () => null, blocked: true, lines: 0 },
  {
    name: 'an execution without a tool name',
    execution: tool('', { command: 'git status' }),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a call outside any agent session runs from the launch directory',
    execution: () => ({ name: 'bash', arguments: { command: 'rm -rf build' } }),
    launchCwd: (fixture) => fixture.home,
    contains: HOME_CWD_DELETE_RULE,
    blocked: true,
    lines: 0,
  },
  {
    name: 'a session directory that is a regular file',
    execution: tool('bash', { command: 'git status' }, (fixture) => fixture.file),
    contains: cwdReason('session'),
    blocked: true,
    lines: 1,
  },
  {
    name: 'an analyzer that fails on a command',
    execution: tool('bash', { command: 'echo analyzed' }),
    breaks: true,
    contains: 'Command: echo analyzed',
    blocked: true,
    lines: 1,
  },
  {
    name: 'an analyzer that fails with debug output on',
    execution: tool('bash', { command: 'echo analyzed' }),
    breaks: true,
    env: { CC_SAFETY_NET_DEBUG: '1' },
    blocked: true,
    lines: 1,
  },
];

let fixture: HookFixture;

beforeEach(() => {
  fixture = createHookFixture('next-deepseek-harness-');
});

afterEach(() => {
  fixture.remove();
});

function runRow(row: Row) {
  const handler = createDeepSeekHarnessGuardHandler({
    guardDependencies: row.breaks
      ? {
          analyzeCommand: () => {
            throw new Error(ANALYZER_FAILURE);
          },
        }
      : undefined,
  });
  return captureInProcessCall(fixture, row.env ?? {}, () =>
    handler(row.execution(fixture), (row.launchCwd ?? ((current) => current.project))(fixture)),
  );
}

const rowNamed = (name: string) => ROWS.find((row) => row.name === name) as Row;

describeDifferential('one DeepSeek Harness tool execution', ROWS, runRow, (row, outcome) => {
  expect(outcome.entries).toHaveLength(row.lines);
  expect(outcome.returned ?? '').toContain(row.contains ?? '');
  expect(outcome.returned === undefined).toBe(!row.blocked);
});

test('the debug line names the failing DeepSeek Harness guard', async () => {
  const debugged = await runRow(rowNamed('an analyzer that fails with debug output on'));

  expect(debugged.stderr).toStrictEqual([
    `CC Safety Net debug: deepseek-harness tool guard analysis failed: ${ANALYZER_FAILURE}`,
  ]);
});

test('the audit records the session, agent and command DeepSeek Harness was about to run', async () => {
  const allowed = await runRow(rowNamed('a safe bash command recorded as an allow'));

  expect(allowed.entries[0]?.entry).toMatchObject({
    decision: 'allow',
    agent: 'deepseek-harness',
    command: 'git status',
    cwd: realpathSync(fixture.project),
    sessionId: SESSION,
  });
});

test('registering installs one tool guard that denies with the formatted reason', async () => {
  const guards: ((execution: unknown) => string | undefined)[] = [];
  registerDeepSeekHarnessGuard({
    tools: {
      guard: (guard) => {
        guards.push(guard);
        return () => {};
      },
    },
  });
  const [guard] = guards;

  expect(guards).toHaveLength(1);
  const decided = await captureInProcessCall(fixture, {}, () => [
    guard?.(tool('bash', { command: 'git reset --hard' })(fixture)),
    guard?.(tool('bash', { command: 'git status' })(fixture)),
  ]);
  expect(decided.returned?.[0]).toContain('Rule: git.reset-hard');
  expect(decided.returned?.[1]).toBeUndefined();
});

test('an execution that throws blocks instead of escaping the guard', async () => {
  const hostile = {
    name: 'bash',
    get arguments(): unknown {
      throw new Error(EXECUTION_FAILURE);
    },
  };
  expectFallbackDeny(
    await captureInProcessCall(fixture, {}, () =>
      createDeepSeekHarnessGuardHandler()(hostile, fixture.project),
    ),
    { denial: formatDenial(createFailedClosedDenial()), failure: EXECUTION_FAILURE },
  );
});
