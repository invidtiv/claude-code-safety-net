import { afterEach, expect, spyOn, test } from 'bun:test';
import { join } from 'node:path';
import { runDoctor } from '@/cli/doctor';
import { installCursor } from '@/hosts/cursor/install';
import { captureConsole } from '../../helpers/console-capture';
import { writeTree } from '../../helpers/fixture-tree';
import { rulesConfig, v1Rulebook } from '../../helpers/rulebook-seeds';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
  withProcessEnv,
} from '../../helpers/temp-home';

afterEach(removeTempRoots);

async function runTextDoctor(home: string, configured: boolean, env: Record<string, string> = {}) {
  const values = isolationEnv(home, {
    PATH: join(home, 'bin'),
    NO_COLOR: '1',
    FORCE_COLOR: undefined,
    ...env,
  });
  const environment = environmentFor(home, values);
  if (configured) installCursor(environment);
  const output: string[] = [];
  const stdout = spyOn(process.stdout, 'write').mockImplementation((chunk) => {
    output.push(String(chunk));
    return true;
  });
  try {
    const result = await withProcessEnv(values, () =>
      captureConsole(() =>
        runDoctor(environment, {
          cwd: join(home, 'project'),
          skipUpdateCheck: true,
        }),
      ),
    );
    if (process.stdout.isTTY) {
      for (const line of [
        '┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛',
        '┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ',
        '━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ ',
      ])
        expect(Bun.stripANSI(output.join(''))).toContain(line);
    }
    if (!process.stdout.isTTY) expect(output).toEqual([]);
    return result;
  } finally {
    stdout.mockRestore();
  }
}

test('text doctor shows active custom rules and project safety reductions', async () => {
  const home = createTempRoot('doctor-text-policy-');
  writeTree(home, {
    bin: null,
    '.cc-safety-net/rules/rule.json': rulesConfig(['team']),
    '.cc-safety-net/rules/team/rulebook.json': v1Rulebook('team'),
    'project/.cc-safety-net/rules/rule.json': rulesConfig(['project-team']),
    'project/.cc-safety-net/rules/project-team/rulebook.json': v1Rulebook('project-team'),
    '.cc-safety-net/policy.json': JSON.stringify({ version: 1, safety: { level: 'strict' } }),
    'project/.cc-safety-net/policy.json': JSON.stringify({
      version: 1,
      safety: { level: 'standard' },
      destructive_command_protection: { overrides: { 'git.clean-force': 'off' } },
    }),
  });
  const result = await runTextDoctor(home, true);
  expect(result.returned).toBe(0);
  expect(result.error).toEqual([]);
  const text = result.log.join('\n');
  expect(text).toContain('Effective rules (2 total)');
  expect(text).toMatch(/user\s+│ team\/block-docker-system-prune\s+│ docker system\s+│ prune/);
  expect(text).toMatch(
    /project\s+│ project-team\/block-docker-system-prune\s+│ docker system\s+│ prune/,
  );
  expect(text).toContain('Project policy deltas:');
  expect(text).toContain('git.clean-force: off');
  expect(text).toContain('[WARNING]');
  expect(text).toMatch(/\d+ findings?: .*warning/);
});

test('text doctor names project safety reductions as ignored under tighten-only', async () => {
  const home = createTempRoot('doctor-text-tighten-');
  writeTree(home, {
    bin: null,
    '.cc-safety-net/policy.json': JSON.stringify({ version: 1, safety: { level: 'strict' } }),
    'project/.cc-safety-net/policy.json': JSON.stringify({
      version: 1,
      safety: { level: 'standard' },
    }),
  });
  const result = await runTextDoctor(home, true, { CC_SAFETY_NET_PROJECT_TIGHTEN_ONLY: '1' });
  const text = result.log.join('\n');
  expect(text).toContain('Selected preset: strict (user policy)');
  expect(text).toContain('Project policy deltas (ignored):');
  expect(text).toContain('project policy lowers level: strict -> standard');
});

test.each([false, true])(
  'text doctor reports integration configuration: %s',
  async (configured) => {
    const home = createTempRoot('doctor-text-');
    writeTree(home, { bin: null, project: null });
    const result = await runTextDoctor(home, configured);
    expect(result.returned).toBe(configured ? 0 : 1);
    expect(result.error).toEqual([]);
    const text = result.log.join('\n');
    expect(text).toContain('Synthetic self-test: 3/3 passed');
    expect(text).toContain('Effective rules: (none - using built-in rules only)');
    expect(text).toContain('Selected preset: standard');
    expect(text).toContain('No blocked commands in the last 7 days');
    expect(text).toMatch(/npm\s+│ not found/);
    expect(text).toContain(
      configured ? 'No findings from inspected doctor facts.' : 'integration.none-configured',
    );
    expect(text).toContain(configured ? 'Verified' : '1 finding: 1 error.');
  },
);
