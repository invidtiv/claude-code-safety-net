import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir as systemTempDir } from 'node:os';
import { join } from 'node:path';
import { createBudget, REASON_DERIVED_COMMAND_WORK_LIMIT } from '@/core/budget';
import type { CustomRule } from '@/core/policy/types';
import { textCommandWords } from '@/gate/analyzer/command-words';
import {
  analyzeParallel,
  extractParallelChildStart,
  REASON_PARALLEL_RM,
  REASON_PARALLEL_SHELL,
} from '@/gate/analyzer/parallel';
import { analyzeChildCommand } from '@/gate/analyzer/segment';
import { pairedEnvironments } from '../../core/differential-inputs';
import { describeOutcome, writeTree } from '../../helpers/fixture-tree';
import { policySnapshot, testModes } from '../../helpers/policy';

let root = '';
let home = '';
let project = '';

beforeAll(() => {
  root = realpathSync(mkdtempSync(join(systemTempDir(), 'next-parallel-')));
  home = join(root, 'user');
  project = join(root, 'project');
  writeTree(root, { 'user/.cache': null, 'project/build': null, other: null, 'x~1/deep': null });
});

afterAll(() => {
  rmSync(root, { recursive: true, force: true });
});

const RULES: readonly CustomRule[] = [
  {
    name: 'no-prod-deploy',
    command: 'deploy-tool',
    block_args: ['--prod'],
    reason: 'Production deploys are manual.',
  },
  {
    name: 'no-registry-publish',
    command: 'npm',
    subcommand: 'publish',
    block_args: ['--force'],
    reason: 'Publishing is manual.',
  },
];

const NESTED = { id: 'custom.nested-job', reason: 'nested job', intent: 'manual_only' } as const;

type ParallelRow = {
  readonly label: string;
  readonly strict?: boolean;
  readonly paranoidRm?: boolean;
  readonly worktreeMode?: boolean;
  readonly rules?: readonly CustomRule[];
  readonly env?: Record<string, string>;
  readonly assignments?: ReadonlyMap<string, string>;
  readonly disabledRule?: string;
};

function bothAnalyzers(tokens: readonly string[], row: ParallelRow) {
  const paired = pairedEnvironments({ HOME: home, ...row.env }, home);
  const budget = createBudget();
  const jobs: string[] = [];
  const snapshot = policySnapshot({ rules: row.rules ?? [], transparent_wrappers: ['uv'] });
  const settings = {
    cwd: project,
    originalCwd: project,
    strict: row.strict,
    paranoidRm: row.paranoidRm,
    worktreeMode: row.worktreeMode,
    allowTmpdirVar: true,
    envAssignments: row.assignments ?? new Map<string, string>(),
    protectedGitMetadata: null,
    policy: {
      ...snapshot.policy,
      effectiveDestructiveCommandRules: row.disabledRule
        ? {
            [row.disabledRule]: {
              enabled: false,
              inheritedEnabled: true,
              changesInherited: true,
              source: 'rule_override' as const,
            },
          }
        : {},
    },
  };
  const dispatchOptions = {
    ...settings,
    policySnapshot: snapshot,
    effectiveCapabilities: testModes().capabilities,
    effectiveCwd: project,
    environment: paired,
    budget,
    analyzeNested: (command: string, overrides?: { effectiveCwd?: string | null }) => {
      jobs.push(`${command} @ ${overrides?.effectiveCwd ?? '-'}`);
      return command.includes('BOOM')
        ? { reason: NESTED.reason, ruleId: NESTED.id, intent: NESTED.intent }
        : null;
    },
  };
  return {
    match: describeOutcome(() =>
      analyzeParallel(textCommandWords(tokens), {
        ...dispatchOptions,
        analyzeChild: (childTokens, child) =>
          analyzeChildCommand(childTokens, 0, dispatchOptions, child),
        analyzeNested: (command: string, overrides?: { effectiveCwd?: string | null }) => {
          jobs.push(`${command} @ ${overrides?.effectiveCwd ?? '-'}`);
          return command.includes('BOOM') ? NESTED : null;
        },
      }),
    ),
    budget,
    jobs,
  };
}

describe('parallel command parsing', () => {
  test('the child command starts after the options and their values', () => {
    const rows: readonly { readonly tokens: readonly string[]; readonly start: number }[] = [
      { tokens: ['parallel', 'rm', '-rf'], start: 1 },
      { tokens: ['parallel', '--', 'rm', '-rf', '{}', ':::', 'a'], start: 2 },
      { tokens: ['parallel', '-j4', 'echo', ':::', 'a'], start: 2 },
      { tokens: ['parallel', '-j', '4', 'echo', ':::', 'a'], start: 3 },
      { tokens: ['parallel', '--jobs', '4', 'echo', ':::', 'a'], start: 3 },
      { tokens: ['parallel', '-n', '2', 'echo', ':::', 'a', 'b'], start: 3 },
      { tokens: ['parallel', '-I', '{}', 'echo', '{}', ':::', 'a'], start: 3 },
      { tokens: ['parallel', '-I%', 'echo', '%', ':::', 'a'], start: 2 },
      { tokens: ['parallel', '-S', 'host', 'rm', '-rf', '{}', ':::', 'a'], start: 3 },
      { tokens: ['parallel', '--workdir', '/tmp', 'rm', '-rf', 'x', ':::', 'a'], start: 3 },
      { tokens: ['parallel', '--dry-run', 'rm', '-rf', '{}', ':::', 'a'], start: 2 },
      { tokens: ['parallel', 'echo', '{}', ':::', 'a', 'b'], start: 1 },
      { tokens: ['parallel'], start: 1 },
      { tokens: ['parallel', ':::', 'a'], start: 3 },
      { tokens: [], start: 0 },
      { tokens: ['-j4'], start: 1 },
    ];
    for (const row of rows) {
      expect(extractParallelChildStart(row.tokens), row.tokens.join(' ')).toBe(row.start);
    }
  });
});

describe('parallel analysis', () => {
  const idFor = (tokens: readonly string[], row: ParallelRow = { label: 'bare' }) => {
    const outcome = bothAnalyzers(tokens, row).match;
    if (!outcome.ok) throw outcome.error;
    return outcome.value?.id ?? null;
  };

  test('a job whose template can carry a command is unverifiable', () => {
    const rows: readonly { readonly tokens: readonly string[]; readonly id: string | null }[] = [
      { tokens: ['parallel', 'rm', '-rf', '{}'], id: 'parallel.rm-recursive-force-dynamic' },
      { tokens: ['parallel', 'bash', '-c', '{}'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'git', '{}'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'git', '{}', ':::', 'status'], id: null },
      { tokens: ['parallel', 'git', '-c', '{}', 'status'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'find', '{}', '-delete'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'awk', '-f', '{}'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'python3', '-c', '{}'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'eval', '{}'], id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'source', '{}'], id: 'parallel.shell-dynamic' },
      {
        tokens: ['parallel', 'git', 'checkout', '--', '{}', ':::', '.'],
        id: 'git.checkout-double-dash',
      },
      { tokens: ['parallel', 'find', '.', '-name', '{}'], id: null },
      { tokens: ['parallel', 'find', '.', '-newermt', '{}', '-print'], id: null },
      { tokens: ['parallel', 'python3', '{}'], id: 'parallel.shell-dynamic' },
    ];
    for (const row of rows) {
      expect(idFor(row.tokens), row.tokens.join(' ')).toBe(row.id);
    }
    const template = bothAnalyzers(['parallel', 'rm', '-rf', '{}'], { label: 'bare' }).match;
    expect(template.ok && template.value?.reason).toBe(REASON_PARALLEL_RM);
    const script = bothAnalyzers(['parallel', 'bash', '-c', '{}'], { label: 'bare' }).match;
    expect(script.ok && script.value?.reason).toBe(REASON_PARALLEL_SHELL);
  });

  test('a job with no placeholder is analyzed as the command it runs', () => {
    const rows: readonly {
      readonly tokens: readonly string[];
      readonly row?: ParallelRow;
      readonly id: string | null;
    }[] = [
      { tokens: ['parallel', 'echo', ':::', 'a', 'b'], id: null },
      { tokens: ['parallel', 'git', 'status', ':::', 'a'], id: null },
      { tokens: ['parallel', 'git', 'reset', '--hard', ':::', 'a'], id: 'git.reset-hard' },
      { tokens: ['parallel', 'find', '.', '-delete', ':::', 'a'], id: 'find.delete' },
      { tokens: ['parallel', 'rm', '-rf', '/', ':::', 'a'], id: 'rm.recursive-force-root-or-home' },
      {
        tokens: ['parallel', 'busybox', 'rm', '-rf', '/', ':::', 'a'],
        id: 'rm.recursive-force-root-or-home',
      },
      { tokens: ['parallel', 'rm', 'build', ':::', 'a'], id: null },
      {
        tokens: ['parallel', 'deploy-tool', '--prod'],
        row: { label: 'custom rules', rules: RULES },
        id: 'custom.no-prod-deploy',
      },
      { tokens: ['parallel', 'deploy-tool', '--prod'], id: null },
      { tokens: ['parallel', 'uv', 'run', 'rm', '-rf', '{}', ':::', 'a'], id: null },
      { tokens: ['parallel', 'FOO=bar', 'echo', ':::', 'a'], id: null },
      {
        tokens: ['parallel', 'FOO=rm -rf /', 'echo', ':::', 'a'],
        id: 'raw-text.dangerous-command',
      },
    ];
    for (const row of rows) {
      expect(idFor(row.tokens, row.row), row.tokens.join(' ')).toBe(row.id);
    }
  });

  test('a placeholder in a custom-rule command is dynamic input, not a solved rule', () => {
    const custom: ParallelRow = { label: 'custom rules', rules: RULES };
    const rows: readonly {
      readonly tokens: readonly string[];
      readonly row?: ParallelRow;
      readonly id: string | null;
    }[] = [
      { tokens: ['parallel', 'deploy-tool', '{}'], row: custom, id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'deploy-tool', 'x{}'], row: custom, id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'npm', '{}'], row: custom, id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'npm', 'publish', '{}'], row: custom, id: 'parallel.shell-dynamic' },
      { tokens: ['parallel', 'npm', '{}'], id: null },
      {
        tokens: ['parallel', 'deploy-tool', '{}', ':::', '--prod'],
        row: custom,
        id: 'custom.no-prod-deploy',
      },
      { tokens: ['parallel', 'deploy-tool', '{}', ':::', 'safe'], row: custom, id: null },
    ];
    for (const row of rows) {
      expect(idFor(row.tokens, row.row), row.tokens.join(' ')).toBe(row.id);
    }
  });

  test('an input the reader cannot enumerate makes the command stream unverifiable', () => {
    const rows: readonly { readonly tokens: readonly string[]; readonly id: string | null }[] = [
      { tokens: ['parallel'], id: 'parallel.command-stream-dynamic' },
      { tokens: ['parallel', '::::', 'file'], id: 'parallel.command-stream-dynamic' },
      { tokens: ['parallel', ':::+', 'a'], id: 'parallel.command-stream-dynamic' },
      { tokens: ['parallel', '-a', 'list', 'echo'], id: 'parallel.command-stream-dynamic' },
      {
        tokens: ['parallel', '--colsep', ',', 'echo', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--rpl', '{x}', 'echo', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '-I', '%', 'echo', '%', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--env', 'FOO', 'echo', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--pipe', 'rm', '-rf', '{}'],
        id: 'parallel.rm-recursive-force-dynamic',
      },
      {
        tokens: ['parallel', '--workdir', '...', 'rm', '-rf', 'x', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--wd=', 'rm', '-rf', 'x', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', 'echo', '{1}', '{2}', ':::', 'a', 'b', ':::', 'c', 'd'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', 'rm', '-rf', '{1}', ':::', 'a', ':::', 'b'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', 'echo', ':::', 'a', ':::', 'b', 'c'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', 'echo', '{-1}', ':::', 'a', 'b'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--workdir', '/tmp', 'rm', '-rf', 'x', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      {
        tokens: ['parallel', '--wd', '/tmp', 'echo', ':::', 'a'],
        id: 'parallel.command-stream-dynamic',
      },
      { tokens: ['parallel', '-I', '{}', 'echo', '{}', ':::', 'a'], id: null },
      { tokens: ['parallel', '--dry-run', 'rm', '-rf', '{}', ':::', 'a'], id: null },
      { tokens: ['parallel', 'echo', '{1}', ':::', 'a', 'b'], id: null },
      {
        tokens: ['parallel', 'rm', '-rf', '{1}', ':::', '/'],
        id: 'rm.recursive-force-root-or-home',
      },
    ];
    for (const row of rows) {
      expect(idFor(row.tokens), row.tokens.join(' ')).toBe(row.id);
    }
    expect(
      idFor(['parallel'], { label: 'off', disabledRule: 'parallel.command-stream-dynamic' }),
    ).toBeNull();
  });

  test('a job the analyzer can read is handed to the caller with its directory', () => {
    const pair = bothAnalyzers(['parallel', 'bash', '-c', 'echo BOOM'], { label: 'bare' });
    expect(pair.jobs).toStrictEqual([`echo BOOM @ ${project}`]);
    expect(pair.match.ok && pair.match.value).toStrictEqual(NESTED);
  });

  test('a quoted command is handed to the caller as the shell source each job runs', () => {
    const rows: readonly { readonly tokens: readonly string[]; readonly jobs: string[] }[] = [
      { tokens: ['parallel', 'rm -rf {}', ':::', '../other'], jobs: ['rm -rf ../other'] },
      { tokens: ['parallel', 'rm -rf', ':::', '/'], jobs: ['rm -rf /'] },
      { tokens: ['parallel', 'git reset --hard', ':::', 'x'], jobs: ['git reset --hard x'] },
      { tokens: ['parallel', 'echo {}', ':::', 'a', 'b'], jobs: ['echo a', 'echo b'] },
    ];
    for (const row of rows) {
      expect(bothAnalyzers(row.tokens, { label: 'bare' }).jobs, row.tokens.join(' ')).toStrictEqual(
        row.jobs.map((job) => `${job} @ ${project}`),
      );
    }
    expect(idFor(['parallel', 'rm -rf {}'])).toBe('parallel.shell-dynamic');
    expect(idFor(['parallel', 'rm -rf', '{}'])).toBe('parallel.rm-recursive-force-dynamic');
    expect(idFor(['parallel', 'git reset --hard'])).toBe('git.reset-hard');
    expect(idFor(['parallel', 'echo {}', ':::', 'a'])).toBeNull();
  });

  test('a PARALLEL value in the environment makes the construction unverifiable', () => {
    const plain = bothAnalyzers(['parallel', 'echo', ':::', 'a'], { label: 'bare' });
    expect(plain.match).toStrictEqual({ ok: true, value: null });
    const ambient = bothAnalyzers(['parallel', 'echo', ':::', 'a'], {
      label: 'ambient',
      env: { PARALLEL: '-j4' },
    });
    expect(ambient.match.ok && ambient.match.value?.id).toBe('parallel.command-stream-dynamic');
    const shadowed = bothAnalyzers(['parallel', 'echo', ':::', 'a'], {
      label: 'shadowed',
      env: { PARALLEL: '-j4' },
      assignments: new Map([['PARALLEL', '']]),
    });
    expect(shadowed.match).toStrictEqual({ ok: true, value: null });
  });

  test('an argument list past the derived-token cap breaches the analysis budget', () => {
    const overCap = Array.from({ length: 5462 }, (_, index) => `job${index}`);
    const breach = bothAnalyzers(['parallel', 'echo', '{}', ':::', ...overCap], {
      label: 'breach',
    });
    expect(breach.match).toStrictEqual({
      ok: false,
      error: { name: 'AnalysisLimit', message: REASON_DERIVED_COMMAND_WORK_LIMIT },
    });
    const within = bothAnalyzers(['parallel', 'echo', '{}', ':::', ...overCap.slice(0, 5461)], {
      label: 'within',
    });
    expect(within.match).toStrictEqual({ ok: true, value: null });
    expect(within.budget.counters.get('derivedTokens')).toBe(16_383);
    const commands = bothAnalyzers(['parallel', ':::', 'true', 'true'], { label: 'commands' });
    expect(commands.match).toStrictEqual({ ok: true, value: null });
    expect(commands.budget.counters.get('derivedTokens')).toBe(2);
  });

  test('a job matrix whose cells exceed the derived-token cap breaches before any child runs', () => {
    const group = (size: number) => Array.from({ length: size }, (_, index) => `v${index}`);
    const off: ParallelRow = { label: 'off', disabledRule: 'parallel.command-stream-dynamic' };
    const breach = bothAnalyzers(['parallel', ':::', ...group(128), ':::', ...group(65)], off);
    expect(breach.match).toStrictEqual({
      ok: false,
      error: { name: 'AnalysisLimit', message: REASON_DERIVED_COMMAND_WORK_LIMIT },
    });
    const within = bothAnalyzers(['parallel', ':::', ...group(128), ':::', ...group(64)], off);
    expect(within.match).toStrictEqual({ ok: true, value: null });
    const wideThenProduct = bothAnalyzers(
      ['parallel', ...group(4096).flatMap((arg) => [':::', arg]), ':::', ...group(8)],
      off,
    );
    expect(wideThenProduct.match).toStrictEqual({
      ok: false,
      error: { name: 'AnalysisLimit', message: REASON_DERIVED_COMMAND_WORK_LIMIT },
    });
  });

  test('a workdir still re-roots the child when the command-stream rule is off', () => {
    const tokens = ['parallel', '--workdir', root, 'rm', '-rf', 'user', ':::', 'x'];
    expect(idFor(tokens, { label: 'off', disabledRule: 'parallel.command-stream-dynamic' })).toBe(
      'rm.recursive-force-root-or-home',
    );
    expect(idFor(tokens)).toBe('parallel.command-stream-dynamic');
  });

  test('a tilde inside a workdir path is not tilde expansion', () => {
    const tokens = [
      'parallel',
      '--workdir',
      join(root, 'x~1', 'deep'),
      'rm',
      '-rf',
      '../../user',
      ':::',
      'x',
    ];
    expect(idFor(tokens, { label: 'off', disabledRule: 'parallel.command-stream-dynamic' })).toBe(
      'rm.recursive-force-root-or-home',
    );
  });

  test('a product and a negative index still reach the child when the command-stream rule is off', () => {
    const off: ParallelRow = { label: 'off', disabledRule: 'parallel.command-stream-dynamic' };
    expect(idFor(['parallel', 'rm', '-rf', '{2}', ':::', 'x', ':::', home], off)).toBe(
      'rm.recursive-force-root-or-home',
    );
    expect(idFor(['parallel', 'rm', '-rf', '{-1}', ':::', 'x', home], off)).toBe(
      'rm.recursive-force-root-or-home',
    );
    expect(idFor(['parallel', ':::', 'BOOM', ':::', 'x'], off)).toBe('custom.nested-job');
  });

  test('a placeholder replaced by a long argument is charged by its size', () => {
    expect(
      bothAnalyzers(['parallel', 'echo', '{}'.repeat(2048), ':::', 'a'.repeat(1024)], {
        label: 'breach',
      }).match,
    ).toStrictEqual({
      ok: false,
      error: { name: 'AnalysisLimit', message: REASON_DERIVED_COMMAND_WORK_LIMIT },
    });
    expect(
      bothAnalyzers(['parallel', 'echo', '{}'.repeat(512), ':::', 'a'.repeat(1024)], {
        label: 'within',
      }).match,
    ).toStrictEqual({ ok: true, value: null });
  });

  test('a template token replicated for every job is charged by its size', () => {
    expect(
      bothAnalyzers(
        [
          'parallel',
          'echo',
          `${'w'.repeat(40_000)}{}`,
          ':::',
          ...Array.from({ length: 40 }, () => 'x'),
        ],
        { label: 'breach' },
      ).match,
    ).toStrictEqual({
      ok: false,
      error: { name: 'AnalysisLimit', message: REASON_DERIVED_COMMAND_WORK_LIMIT },
    });
    expect(
      bothAnalyzers(['parallel', 'echo', `${'w'.repeat(40_000)}{}`, ':::', 'x'], {
        label: 'within',
      }).match,
    ).toStrictEqual({ ok: true, value: null });
  });

  test('the two reasons are the strings the denials render', () => {
    expect(REASON_PARALLEL_RM).toBe(
      'parallel rm -rf with dynamic input is dangerous. Use explicit file list instead.',
    );
    expect(REASON_PARALLEL_SHELL).toBe(
      'parallel with shell -c can execute arbitrary commands from dynamic input. Run the inner command directly on an explicit file list instead.',
    );
  });
});
