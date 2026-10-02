import { afterAll, describe, expect, spyOn, test } from 'bun:test';
import * as budgetModule from '@/core/budget';
import { AnalysisLimit, LIMITS, type LimitKind } from '@/core/budget';
import { createProcessEnvironment } from '@/core/environment';
import { resolveProtectedGitMetadata } from '@/core/git/metadata';
import { analyzerCapBreach } from '@/gate/analyzer';
import { evaluateGuard } from '@/gate/pipeline';
import { bashCall, createGateTree } from '../helpers/gate-differential';
import { policySnapshot } from '../helpers/policy';

const tree = createGateTree('gate-analysis-budget-');
const environment = createProcessEnvironment();
const snapshot = policySnapshot();
const dependencies = { loadPolicySnapshot: () => snapshot, resolveGitMetadata: () => null };

afterAll(() => {
  tree.remove();
});

function copies(count: number, make: (index: number) => string) {
  return Array.from({ length: count }, (_, index) => make(index));
}

const numberedArgs = (count: number) => copies(count, (index) => `arg${index}`).join(' ');

const ROWS: readonly { kind: LimitKind; name: string; breaching: string; below: string }[] = [
  {
    kind: 'derivedTokens',
    name: 'derived tokens',
    breaching: `custom-tool ${copies(190, () => 'bash').join(' ')}`,
    below: `custom-tool ${copies(150, () => 'bash').join(' ')}`,
  },
  {
    kind: 'trackedHeredocFiles',
    name: 'tracked heredoc files',
    breaching: `tee ${copies(65, (index) => `file${index}.txt`).join(' ')} <<'END'\nbody\nEND`,
    below: `tee ${copies(64, (index) => `file${index}.txt`).join(' ')} <<'END'\nbody\nEND`,
  },
  {
    kind: 'controlFlowStates',
    name: 'control-flow states',
    breaching: copies(64, (index) => `export GIT_WORK_TREE=w${index}`).join(' && '),
    below: copies(63, (index) => `export GIT_WORK_TREE=w${index}`).join(' && '),
  },
  {
    kind: 'wrapperPeelIterations',
    name: 'wrapper peel iterations',
    breaching: `${copies(21, () => 'busybox').join(' ')} echo ok`,
    below: `${copies(19, () => 'busybox').join(' ')} echo ok`,
  },
  {
    kind: 'wrapperPeelIterations',
    name: 'child normalization peels',
    breaching: `find . -exec ${copies(24, () => 'busybox').join(' ')} rm {} \\;`,
    below: `find . -exec ${copies(10, () => 'busybox').join(' ')} rm {} \\;`,
  },
  {
    kind: 'derivedCommandShape',
    name: 'an unnormalizable derived child',
    breaching: `xargs env -S 'echo "quoted"'`,
    below: `xargs env -S 'echo quoted'`,
  },
  {
    kind: 'derivedTokens',
    name: 'parallel expansion',
    breaching: `parallel echo ${copies(149, () => 'w').join(' ')} {} ::: ${numberedArgs(120)}`,
    below: `parallel echo ${copies(149, () => 'w').join(' ')} {} ::: ${numberedArgs(100)}`,
  },
  {
    kind: 'wrapperPeelIterations',
    name: 'env wrapper peel iterations',
    breaching: `${copies(21, () => 'env').join(' ')} echo ok`,
    below: `${copies(19, () => 'env').join(' ')} echo ok`,
  },
  {
    kind: 'trackedHeredocFiles',
    name: 'tee and redirect heredoc files',
    breaching: `tee ${copies(64, (index) => `sink${index}`).join(' ')} > extra <<'BODY'\nhello\nBODY`,
    below: `tee ${copies(63, (index) => `sink${index}`).join(' ')} > extra <<'BODY'\nhello\nBODY`,
  },
  {
    kind: 'controlFlowStates',
    name: 'GIT_DIR control-flow states',
    breaching: copies(64, (index) => `export GIT_DIR=g${index}`).join(' && '),
    below: copies(63, (index) => `export GIT_DIR=g${index}`).join(' && '),
  },
  {
    kind: 'derivedTokens',
    name: 'derived command work',
    breaching: `unmapped-head ${copies(200, () => 'sh').join(' ')}`,
    below: `unmapped-head ${copies(100, () => 'sh').join(' ')}`,
  },
];

describe('one budget, one report per analyzer cap', () => {
  for (const row of ROWS) {
    test(`${row.name}: the pipeline reports the denial and the audit class`, () => {
      expect(
        evaluateGuard(bashCall(row.breaching, tree.workspace), { environment, dependencies }),
      ).toStrictEqual({
        stage: 'command-analysis',
        level: 'standard',
        errorCode: LIMITS[row.kind].errorCode,
        decision: {
          kind: 'deny',
          reason: LIMITS[row.kind].reason,
          intent: 'stop_and_explain',
          evidence: { command: row.breaching, segment: row.breaching },
        },
      });
      const below = evaluateGuard(bashCall(row.below, tree.workspace), {
        environment,
        dependencies,
      });
      expect(below.errorCode).not.toBe(LIMITS[row.kind].errorCode);
      if (below.decision.kind === 'deny')
        expect(below.decision.reason).not.toBe(LIMITS[row.kind].reason);
    });
  }

  test('and no other kind in the table is answered as an analyzer cap', () => {
    const analyzerKinds = new Set<LimitKind>(ROWS.map((row) => row.kind));
    const mapped = (Object.keys(LIMITS) as LimitKind[]).filter(
      (kind) => analyzerCapBreach(new AnalysisLimit(kind), 'x') !== null,
    );
    expect(mapped.sort()).toStrictEqual([...analyzerKinds].sort());
  });
});

describe('one Budget per evaluation', () => {
  const metadata = resolveProtectedGitMetadata(tree.repository, environment);
  const inRepository = { loadPolicySnapshot: () => snapshot, resolveGitMetadata: () => metadata };

  for (const command of [
    'd=./build; cd ./src && rm -rf "$d"',
    "cat > notes.txt <<'EOF'\nhello\nEOF",
    String.raw`find . -name '*.log' -exec rm {} \;`,
    'echo build | xargs rm -rf',
    'parallel rm -rf {} ::: build dist',
  ]) {
    test(`${command.split('\n')[0]} creates exactly one budget`, () => {
      const spy = spyOn(budgetModule, 'createBudget');
      const evaluation = evaluateGuard(bashCall(command, tree.repository), {
        environment,
        dependencies: inRepository,
      });
      const calls = spy.mock.calls.length;
      spy.mockRestore();
      expect(evaluation.stage).toBe('command-analysis');
      expect(calls).toBe(1);
    });
  }
});
