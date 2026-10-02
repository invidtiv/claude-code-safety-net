import { afterEach, beforeEach, expect, test } from 'bun:test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createCwdDenial, createFailedClosedDenial, formatDenial } from '@/core/denial';
import { createProcessEnvironment } from '@/core/environment';
import { getUserPolicyPath } from '@/core/policy/paths';
import { createPiToolCallHandler as portedHandler } from '@/hosts/pi/tool-call';
import { createHookFixture, type HookFixture } from '../../helpers/hook-hosts';
import {
  captureInProcessCall,
  describeDifferential,
  expectFallbackDeny,
} from '../../helpers/in-process';

const SESSION = 'pi-1';
const ANALYZER_FAILURE = 'injected analyzer failure';
const SECRET_SCAN_FAILURE = 'injected secret scan failure';
const CONTEXT_FAILURE = 'injected context failure';
const SESSION_UNUSABLE = createCwdDenial({
  directory: 'session',
  problem: 'unusable',
  cwd: '',
}).reason;

type Row = {
  name: string;
  event: (fixture: HookFixture) => unknown;
  cwd?: (fixture: HookFixture) => string;
  breaks?: 'analyzer' | 'secret-scan';
  brokenPolicy?: true;
  env?: Record<string, string | undefined>;
  contains?: string;
  blocked: boolean;
  lines: number;
};

const failingAnalyzer = (): never => {
  throw new Error(ANALYZER_FAILURE);
};

const failingSecretScan = (): never => {
  throw new Error(SECRET_SCAN_FAILURE);
};

const bash = (command: string) => ({ type: 'tool_call', toolName: 'bash', input: { command } });
const read = (path: string) => ({ type: 'tool_call', toolName: 'read', input: { path } });

const ROWS: readonly Row[] = [
  {
    name: 'a destructive command',
    event: () => bash('git push --force origin main'),
    contains: 'BLOCKED by CC Safety Net',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a safe command recorded as an allow',
    event: () => bash('git status'),
    blocked: false,
    lines: 1,
  },
  {
    name: 'a safe command under the blocked-only audit scope',
    event: () => bash('git status'),
    env: { CC_SAFETY_NET_AUDIT_SCOPE: 'blocked' },
    blocked: false,
    lines: 0,
  },
  {
    name: 'a bash call without a tool input',
    event: () => ({ type: 'tool_call', toolName: 'bash' }),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a bash call with a blank command',
    event: () => bash('   '),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a destructive powershell command',
    event: () => ({
      type: 'tool_call',
      toolName: 'powershell',
      input: { command: 'git reset --hard' },
    }),
    contains: 'Rule: git.reset-hard',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a read of a file in the project',
    event: () => read('README.md'),
    blocked: false,
    lines: 0,
  },
  {
    name: 'a read of a private key',
    event: (fixture) => read(join(fixture.home, '.ssh', 'id_rsa')),
    contains: 'Rule: secret.home.ssh',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a read call without a tool input',
    event: () => ({ type: 'tool_call', toolName: 'read' }),
    blocked: false,
    lines: 0,
  },
  { name: 'an event that is null', event: () => null, blocked: false, lines: 0 },
  {
    name: 'an event of another type',
    event: () => ({ type: 'other', toolName: 'bash', input: { command: 'rm -rf /' } }),
    blocked: false,
    lines: 0,
  },
  {
    name: 'an event without a tool name',
    event: () => ({ type: 'tool_call', toolName: '', input: { command: 'git status' } }),
    blocked: true,
    lines: 1,
  },
  {
    name: 'a context directory that is a regular file',
    event: () => bash('git status'),
    cwd: (fixture) => fixture.file,
    contains: SESSION_UNUSABLE,
    blocked: true,
    lines: 1,
  },
  {
    name: 'a context directory that does not exist',
    event: () => bash('git status'),
    cwd: (fixture) => fixture.missing,
    contains: SESSION_UNUSABLE,
    blocked: true,
    lines: 1,
  },
  {
    name: 'a context without a directory',
    event: () => bash('git status'),
    cwd: () => '',
    contains: 'failed closed',
    blocked: true,
    lines: 1,
  },
  {
    name: 'an analyzer that fails on a command',
    event: () => bash('echo analyzed'),
    breaks: 'analyzer',
    contains: 'Command: echo analyzed',
    blocked: true,
    lines: 1,
  },
  {
    name: 'an analyzer that fails with debug output on',
    event: () => bash('echo analyzed'),
    breaks: 'analyzer',
    env: { CC_SAFETY_NET_DEBUG: '1' },
    blocked: true,
    lines: 1,
  },
  {
    name: 'a secret scan that fails on a read',
    event: () => ({
      type: 'tool_call',
      toolName: 'read',
      input: { path: 'README.md', command: 'cat README.md' },
    }),
    breaks: 'secret-scan',
    blocked: true,
    lines: 1,
  },
  {
    name: 'a user policy file that is not valid JSON',
    event: () => bash('git reset --hard HEAD~1'),
    brokenPolicy: true,
    contains: 'Config warning:',
    blocked: true,
    lines: 1,
  },
];

let fixture: HookFixture;
let rulesDir: string;

beforeEach(() => {
  fixture = createHookFixture('next-pi-');
  rulesDir = join(fixture.root, 'pi-config', 'rules');
  mkdirSync(rulesDir, { recursive: true });
  writeFileSync(getUserPolicyPath(createProcessEnvironment(), { userConfigDir: rulesDir }), '{');
});

afterEach(() => {
  fixture.remove();
});

function contextFor(row: Row) {
  return {
    cwd: (row.cwd ?? ((current: HookFixture) => current.project))(fixture),
    sessionManager: { getSessionId: () => SESSION },
  };
}

function runSide(row: Row) {
  const handler = portedHandler({
    guardDependencies:
      row.breaks === 'analyzer'
        ? { analyzeCommand: failingAnalyzer }
        : row.breaks === 'secret-scan'
          ? { findSensitiveTarget: failingSecretScan }
          : undefined,
    policyOptions: row.brokenPolicy ? { userConfigDir: rulesDir } : undefined,
  });
  return captureInProcessCall(fixture, row.env ?? {}, () =>
    handler(row.event(fixture), contextFor(row)),
  );
}

describeDifferential('one Pi tool call through both handlers', ROWS, runSide, (row, agreed) => {
  expect(agreed.entries).toHaveLength(row.lines);
  expect(agreed.returned?.reason ?? '').toContain(row.contains ?? '');
  expect(agreed.returned === undefined).toBe(!row.blocked);
  if (row.breaks === 'secret-scan') {
    expect(agreed.returned?.reason).not.toContain('Command:');
    expect(agreed.returned?.reason).toContain('failed closed');
  }
  if (row.env?.CC_SAFETY_NET_DEBUG === '1') {
    expect(agreed.stderr).toStrictEqual([
      `CC Safety Net debug: pi tool_call analysis failed: ${ANALYZER_FAILURE}`,
    ]);
  }
  if (row.name === 'a context directory that is a regular file') {
    expect(agreed.returned?.reason).toContain(`Working directory: ${fixture.file}`);
    expect(agreed.entries[0]?.entry).toMatchObject({
      decision: 'deny',
      agent: 'pi',
      cwd: fixture.file,
    });
  }
});

test('a context that throws blocks in Pi form instead of escaping the handler', async () => {
  const hostile = {
    get cwd(): string {
      throw new Error(CONTEXT_FAILURE);
    },
    sessionManager: { getSessionId: () => SESSION },
  };
  expectFallbackDeny(
    await captureInProcessCall(fixture, {}, () => portedHandler({})(bash('git status'), hostile)),
    {
      denial: { block: true, reason: formatDenial(createFailedClosedDenial()) },
      failure: CONTEXT_FAILURE,
    },
  );
});
