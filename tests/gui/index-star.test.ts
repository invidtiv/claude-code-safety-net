import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { delimiter, dirname, join } from 'node:path';
import { fetchStarContext as portedStarContext, starRepo as portedStarRepo } from '@/gui/index';
import { createFakeBin, type FakeScriptEntry } from '../helpers/fake-bin';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
  withProcessEnv,
} from '../helpers/temp-home';

const STARRED_PATH = '/user/starred/kenryu42/cc-safety-net';

const bothSides = async <T>(
  script: readonly FakeScriptEntry[],
  run: (side: { command: string; root: string }) => Promise<T>,
  env: (root: string) => Record<string, string | undefined> = () => ({}),
) => {
  const root = createTempRoot('gui-star-ported-');
  const fake = createFakeBin(root, script);
  const result = await withProcessEnv(
    {
      ...env(root),
      CC_SAFETY_NET_FAKE_LOG: fake.env.CC_SAFETY_NET_FAKE_LOG,
      CC_SAFETY_NET_FAKE_SCRIPT: fake.env.CC_SAFETY_NET_FAKE_SCRIPT,
    },
    async () =>
      run({
        command: join(fake.binDir, 'gh'),
        root,
      }),
  );
  return { result, calls: fake.readLog().map((line) => line.split('\t')[0]) };
};

const gh = (args: string[], exit: number, extra: Partial<FakeScriptEntry> = {}): FakeScriptEntry =>
  ({ command: 'gh', args, exit, ...extra }) as FakeScriptEntry;

const AUTH_OK = gh(['auth'], 0);

describe('the GUI star button', () => {
  afterEach(removeTempRoots);

  test('reports a failed star when gh is not on the machine', async () => {
    const star = await bothSides([], (side) => portedStarRepo(join(side.root, 'missing', 'gh')));

    expect(star.result).toStrictEqual({ ok: false });
    expect(star.calls).toStrictEqual([]);
  });

  test('gives up on a gh that never answers', async () => {
    const row = await bothSides([gh(['api'], 0, { delayMs: 2000 })], async (side) => {
      const started = Date.now();
      const result = await portedStarRepo(side.command, 100);
      expect(Date.now() - started).toBeLessThan(1000);
      return result;
    });

    expect(row.result).toStrictEqual({ ok: false });
  });

  test('stars the repository with a fixed argv', async () => {
    const row = await bothSides([gh(['api', '-X', 'PUT', STARRED_PATH], 0)], (side) =>
      portedStarRepo(side.command),
    );

    expect(row.result).toStrictEqual({ ok: true });
    expect(row.calls).toStrictEqual([`gh api -X PUT ${STARRED_PATH}`]);
  });
});

describe('the GUI star context', () => {
  afterEach(removeTempRoots);

  const anHourAgo = () => new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const seedLogs = (home: string) => {
    const logsDir = join(home, 'logs');
    mkdirSync(logsDir, { recursive: true });
    writeFileSync(
      join(logsDir, 'feed.jsonl'),
      [
        { command: 'rm -rf /', decision: 'deny', sessionId: 's1' },
        { command: 'git push --force', decision: 'deny', sessionId: 's1' },
        { command: 'ls', decision: 'allow', sessionId: 's1' },
      ]
        .map((record) => `${JSON.stringify({ ts: anHourAgo(), ...record })}\n`)
        .join(''),
    );
    return logsDir;
  };

  const contextOver = async (fetchRepo: typeof fetch) => {
    const row = await bothSides(
      [AUTH_OK, gh(['api'], 0)],
      async (side) => {
        const home = join(side.root, 'home');
        const values = isolationEnv(home);
        return withProcessEnv(
          { PATH: `${dirname(side.command)}${delimiter}${process.env.PATH}` },
          () =>
            portedStarContext(environmentFor(home, values), {
              logsDir: seedLogs(home),
              fetchRepo,
            }),
        );
      },
      (root) => isolationEnv(join(root, 'home')),
    );
    expect(row.calls).toStrictEqual([]);
    return row.result;
  };

  const respondsWith = (body: unknown, status = 200) =>
    (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

  test('reads the star count and the retained blocked total without running gh', async () => {
    const context = await contextOver(respondsWith({ stargazers_count: 42 }));

    expect(context).toStrictEqual({ starCount: 42, blockedTotal: 2 });
  });

  test.each([
    ['a refused request', respondsWith({ stargazers_count: 42 }, 500)],
    ['a count that is not a number', respondsWith({ stargazers_count: 'many' })],
    [
      'a request that never lands',
      (async () => {
        throw new Error('offline');
      }) as unknown as typeof fetch,
    ],
  ])('degrades the star count on %s without losing the rest', async (_label, fetchRepo) => {
    expect(await contextOver(fetchRepo)).toStrictEqual({
      starCount: null,
      blockedTotal: 2,
    });
  });
});
