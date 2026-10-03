import { afterEach, describe, expect, test } from 'bun:test';
import { stripJsonComments } from '@/core/io/jsonc';
import { uninstallOpenCode } from '@/hosts/opencode/install';
import type { TreeSpec } from '../../helpers/fixture-tree';
import { differential, fileAt } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const CONFIG = '.config/opencode/opencode.json';
const CONFIG_C = '.config/opencode/opencode.jsonc';
const CACHE = '.cache/opencode/packages/cc-safety-net@latest';
afterEach(removeTempRoots);

describe('taking the plugin back out of the config', () => {
  const uninstall = async (seed: TreeSpec, env?: Record<string, string>) => {
    const result = await differential(
      {
        seed,
        env,
      },
      (environment) => uninstallOpenCode(environment),
    );
    return { outcome: result.outcome, tree: result.tree };
  };

  test.each([
    ['the default cache', {}, CACHE],
    [
      'the XDG cache',
      { XDG_CACHE_HOME: '<home>/xdgcache' },
      'xdgcache/opencode/packages/cc-safety-net@latest',
    ],
  ])(
    'removes our formatted config entry and %s, preserving unrelated files',
    async (_case, env, cache) => {
      const result = await uninstall(
        {
          [CONFIG]: '{\n  "$schema": "x",\n  "plugin": ["other", "cc-safety-net", "third"]\n}\n',
          [`${cache}/node_modules/cc-safety-net/package.json`]: '{}',
          'keep.txt': 'kept',
        },
        env,
      );

      expect(result.outcome).toEqual({
        kind: 'returned',
        value: { path: `<home>/${CONFIG}`, alreadyInstalled: true },
      });
      expect(fileAt(result.tree, CONFIG)).toBe(
        '{\n  "$schema": "x",\n  "plugin": ["other",  "third"]\n}\n',
      );
      expect(
        result.tree.filter((entry) => entry.path === cache || entry.path.startsWith(`${cache}/`)),
      ).toEqual([]);
      expect(fileAt(result.tree, 'keep.txt')).toBe('kept');
    },
  );

  test.each([
    [
      'a nested array before the root array',
      '{"x":{"plugin":["cc-safety-net"]},"plugin":["cc-safety-net","keep"]}\n',
      '{"x":{"plugin":["cc-safety-net"]},"plugin":["keep"]}\n',
    ],
    ['the last item', '{"plugin":["keep","cc-safety-net"]}\n', '{"plugin":["keep"]}\n'],
    ['a trailing comma', '{"plugin":["keep","cc-safety-net",]}\n', '{"plugin":["keep",]}\n'],
    [
      'a managed name in a comment',
      '{"plugin":[/* cc-safety-net */"keep"]}\n',
      '{"plugin":[/* cc-safety-net */"keep"]}\n',
    ],
    [
      'a managed name in another string',
      '{"note":"cc-safety-net","plugin":["cc-safety-net","keep"]}\n',
      '{"note":"cc-safety-net","plugin":["keep"]}\n',
    ],
    [
      'an escaped quote and bracket in an unrelated package name',
      '{"plugin":["quote \\" ] cc-safety-net","cc-safety-net"]}\n',
      '{"plugin":["quote \\" ] cc-safety-net"]}\n',
    ],
    [
      'comments around the brackets',
      '{"plugin": /* before */ [ // after\n"cc-safety-net"\n]}\n',
      '{"plugin": /* before */ [ // after\n\n]}\n',
    ],
    [
      'CRLF lines',
      '{\r\n"plugin":[\r\n"cc-safety-net",\r\n"keep"\r\n]}\r\n',
      '{\r\n"plugin":[\r\n\r\n"keep"\r\n]}\r\n',
    ],
    [
      'tab indentation',
      '{\n\t"plugin":[\n\t\t"one",\n\t\t"cc-safety-net",\n\t\t"three"\n\t]}\n',
      '{\n\t"plugin":[\n\t\t"one",\n\t\t\t\t"three"\n\t]}\n',
    ],
  ])('preserves %s through removal and a second uninstall', async (_case, content, expected) => {
    const removed = await uninstall({ [CONFIG_C]: content });
    expect(removed.outcome.kind).toBe('returned');
    const left = fileAt(removed.tree, CONFIG_C);
    expect(left).toBe(expected);
    expect(() => JSON.parse(stripJsonComments(left ?? ''))).not.toThrow();
    const repeated = await uninstall({ [CONFIG_C]: left ?? null });
    expect(repeated.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${CONFIG_C}`, alreadyInstalled: false },
    });
    expect(fileAt(repeated.tree, CONFIG_C)).toBe(expected);
  });

  test('keeps every comment and every other byte of an opencode.jsonc', async () => {
    const result = await uninstall({
      [CONFIG_C]:
        '{\n  // keep me\n  "plugin": [\n    "cc-safety-net@1.2.3", /* c */\n    "other"\n  ]\n}\n',
    });

    expect(result.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${CONFIG_C}`, alreadyInstalled: true },
    });
    expect(fileAt(result.tree, CONFIG_C)).toBe(
      '{\n  // keep me\n  "plugin": [\n     /* c */\n    "other"\n  ]\n}\n',
    );
  });

  test('edits the file that holds the plugin and leaves the other untouched', async () => {
    const first = '{\n  "plugin": ["other"]\n}\n';
    const result = await uninstall({
      [CONFIG]: first,
      [CONFIG_C]: '{\n  "plugin": ["cc-safety-net"]\n}\n',
    });

    expect(result.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${CONFIG_C}`, alreadyInstalled: true },
    });
    expect(fileAt(result.tree, CONFIG)).toBe(first);
    expect(fileAt(result.tree, CONFIG_C)).toBe('{\n  "plugin": []\n}\n');
  });

  test.each([
    [
      'the existing config when it never held the plugin',
      { [CONFIG_C]: '{\n  "plugin": []\n}\n' },
      CONFIG_C,
    ],
    ['the default path when no config exists', {}, CONFIG],
  ])('reports %s', async (_case, seed, path) => {
    expect((await uninstall(seed)).outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${path}`, alreadyInstalled: false },
    });
  });

  test('refuses to touch a config it cannot parse', async () => {
    const result = await uninstall({ [CONFIG]: '{ not json' });

    expect(result.outcome).toEqual({
      kind: 'threw',
      message: `Failed to parse OpenCode config <home>/${CONFIG}: JSON Parse error: Expected '}'`,
    });
    expect(fileAt(result.tree, CONFIG)).toBe('{ not json');
  });

  test('removes package objects under the singular key without touching other options', async () => {
    const result = await uninstall({
      [CONFIG_C]:
        '{/* keep */"plugin":[{"package":"cc-safety-net@latest","options":{"shell":"powershell"}},{"package":"other","options":{"note":"cc-safety-net"}}]}',
    });
    expect(result.outcome.kind).toBe('returned');
    expect(fileAt(result.tree, CONFIG_C)).toBe(
      '{/* keep */"plugin":[{"package":"other","options":{"note":"cc-safety-net"}}]}',
    );
  });

  test('removes both generations from both files without changing unrelated objects or comments', async () => {
    const result = await uninstall({
      [CONFIG]: '{"plugin":["cc-safety-net"],"plugins":["cc-safety-net@latest","other"]}',
      [CONFIG_C]:
        '{\n// keep\n"plugins": [\n{"package":"other","options":{"note":"cc-safety-net"}},\n/* before */ {"package":"cc-safety-net@latest","options":{"nested":[1,{"x":"}"}]}} /* after */,\n"other-cc-safety-net"\n]}',
    });
    expect(result.outcome.kind).toBe('returned');
    expect(fileAt(result.tree, CONFIG)).toBe('{"plugin":[],"plugins":["other"]}');
    expect(fileAt(result.tree, CONFIG_C)).toBe(
      '{\n// keep\n"plugins": [\n{"package":"other","options":{"note":"cc-safety-net"}},\n/* before */  /* after */\n"other-cc-safety-net"\n]}',
    );
  });

  const NATIVE_CONFIG = 'native-config/opencode.json';
  const uninstallWithNativeConfigDir = async (seed: TreeSpec) =>
    await differential(
      { seed, env: { OPENCODE_CONFIG_DIR: '<home>/native-config' } },
      (environment) => uninstallOpenCode(environment),
    );

  test('removes a v1 entry from the XDG config while OPENCODE_CONFIG_DIR names another directory', async () => {
    const result = await uninstallWithNativeConfigDir({ [CONFIG]: '{"plugin":["cc-safety-net"]}' });

    expect(result.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${CONFIG}`, alreadyInstalled: true },
    });
    expect(fileAt(result.tree, CONFIG)).toBe('{"plugin":[]}');
  });

  test('removes the entry from both directories v1 loads', async () => {
    const result = await uninstallWithNativeConfigDir({
      [NATIVE_CONFIG]: '{"plugin":["cc-safety-net"]}',
      [CONFIG]: '{"plugin":["cc-safety-net"]}',
    });

    expect(result.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${NATIVE_CONFIG}`, alreadyInstalled: true },
    });
    expect(fileAt(result.tree, NATIVE_CONFIG)).toBe('{"plugin":[]}');
    expect(fileAt(result.tree, CONFIG)).toBe('{"plugin":[]}');
  });

  test('removes a v2 entry from the directory OPENCODE_CONFIG_DIR names', async () => {
    const result = await uninstallWithNativeConfigDir({
      [NATIVE_CONFIG]: '{"plugins":["cc-safety-net@latest"]}',
    });

    expect(result.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${NATIVE_CONFIG}`, alreadyInstalled: true },
    });
    expect(fileAt(result.tree, NATIVE_CONFIG)).toBe('{"plugins":[]}');
  });
});
