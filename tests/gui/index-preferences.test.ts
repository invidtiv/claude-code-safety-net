import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createPolicyGuiServer } from '@/gui/index';
import { type GuiRequest, runGuiRow } from '../helpers/gui-differential';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
} from '../helpers/temp-home';

const PREFERENCES_FILE = 'home/.cc-safety-net/gui.json';

const pagePayload = (html: unknown) => {
  const match = String(html).match(
    /<script id="ccsn-data" type="application\/json">(.*?)<\/script>/,
  );
  return JSON.parse(match?.[1] ?? '') as { token: string; preferences: unknown };
};

const savePreferences = (body: unknown): GuiRequest => ({
  method: 'POST',
  path: '/api/preferences',
  body,
});

describe('the gui preferences', () => {
  afterEach(removeTempRoots);

  test('a saved language and theme survive a server restart', async () => {
    const home = join(createTempRoot('gui-preferences-'), 'home');
    mkdirSync(home, { recursive: true });
    const start = () => createPolicyGuiServer(() => environmentFor(home, isolationEnv(home)));
    const post = async (server: { origin: string; token: string }, body: unknown) => {
      const response = await fetch(
        `${server.origin}/api/preferences?token=${encodeURIComponent(server.token)}`,
        {
          method: 'POST',
          headers: { 'x-cc-safety-net-token': server.token },
          body: JSON.stringify(body),
        },
      );
      return response.status;
    };
    const servedPreferences = async () => {
      const server = await start();
      const page = await fetch(`${server.origin}/?token=${encodeURIComponent(server.token)}`)
        .then((response) => response.text())
        .finally(server.close);
      return pagePayload(page).preferences;
    };

    const first = await start();
    expect(await post(first, { language: 'ja', theme: 'dark' }).finally(first.close)).toBe(200);
    expect(await servedPreferences()).toStrictEqual({ language: 'ja', theme: 'dark' });

    const second = await start();
    expect(await post(second, { theme: 'auto' }).finally(second.close)).toBe(200);
    expect(await servedPreferences()).toStrictEqual({ language: 'ja' });
  });

  test('a first launch serves no preference and writes nothing', async () => {
    const row = await runGuiRow({ seed: {}, requests: [{ path: '/' }] });

    expect(pagePayload(row.responses[0]?.body).preferences).toStrictEqual({});
    expect(row.tree.some((entry) => entry.path === PREFERENCES_FILE)).toBe(false);
  });

  test('an unknown language, theme or field is refused and leaves the saved file alone', async () => {
    const saved = '{\n  "language": "zh-CN"\n}\n';
    const row = await runGuiRow({
      seed: { [PREFERENCES_FILE]: saved },
      requests: [
        savePreferences({ language: 'fr' }),
        savePreferences({ theme: 'sepia' }),
        savePreferences({ language: 'ja', fontSize: 14 }),
        savePreferences(['ja']),
        { method: 'POST', path: '/api/preferences', raw: '{ not json' },
      ],
    });

    expect(row.responses.map((response) => response.status)).toEqual([400, 400, 400, 400, 400]);
    expect(row.tree.find((entry) => entry.path === PREFERENCES_FILE)?.content).toBe(saved);
  });

  test('a preference change needs the session token in the header', async () => {
    const row = await runGuiRow({
      seed: {},
      requests: [
        { ...savePreferences({ language: 'ja' }), token: 'query' },
        { ...savePreferences({ language: 'ja' }), token: 'wrong-header' },
      ],
    });

    expect(row.responses.map((response) => response.status)).toEqual([403, 403]);
    expect(row.tree.some((entry) => entry.path === PREFERENCES_FILE)).toBe(false);
  });

  test('an unreadable or invalid preferences file is served as no preference', async () => {
    const served = async (content: string) => {
      const row = await runGuiRow({
        seed: { [PREFERENCES_FILE]: content },
        requests: [{ path: '/' }],
      });
      return pagePayload(row.responses[0]?.body).preferences;
    };

    expect(await served('{ not json')).toStrictEqual({});
    expect(await served('["ja"]')).toStrictEqual({});
    expect(await served('{"language":"fr","theme":7}')).toStrictEqual({});
    expect(await served('{"language":"ja","theme":"blue"}')).toStrictEqual({ language: 'ja' });
  });
});
