import { afterEach, describe, expect, test } from 'bun:test';
import { detect as detectCursor } from '@/hosts/cursor/detect';
import { installCursor, uninstallCursor } from '@/hosts/cursor/install';
import { expectRow, fileAt, hostRunner } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const CONFIG = '.cursor/hooks.json';
const CONFIG_PATH = `<home>/${CONFIG}`;
const MANAGED = 'npx -y cc-safety-net hook --cursor';
const CANONICAL = { command: MANAGED, timeout: 30, failClosed: true };
const DRIFTED = { command: MANAGED, timeout: 10 };
const FOREIGN = { command: 'echo other', timeout: 5 };

const cursorConfig = (preToolUse: readonly unknown[]) =>
  `${JSON.stringify({ version: 1, hooks: { preToolUse } }, null, 2)}\n`;

const CONFIGURED = {
  platform: 'cursor',
  status: 'configured',
  method: 'hook config',
  configPath: CONFIG_PATH,
} as const;

const { row, detection } = hostRunner((environment) => ({
  install: () => installCursor(environment),
  detect: () => detectCursor({ environment, cwd: environment.home }),
  uninstall: () => uninstallCursor(environment),
}));

afterEach(removeTempRoots);

describe('the Cursor hook config differential', () => {
  test('writes the canonical entry when the host has no hook config', async () => {
    expectRow((await row({})).steps, {
      file: CONFIG,
      alreadyInstalled: false,
      wrote: cursorConfig([CANONICAL]),
      detected: CONFIGURED,
      left: cursorConfig([]),
    });
  });

  test('leaves a foreign entry alone and restores the file byte for byte', async () => {
    const seed = cursorConfig([FOREIGN]);

    expectRow((await row({ [CONFIG]: seed })).steps, {
      file: CONFIG,
      alreadyInstalled: false,
      wrote: cursorConfig([FOREIGN, CANONICAL]),
      detected: CONFIGURED,
      left: seed,
    });
  });

  test('collapses a drifted entry and its duplicate into one canonical entry', async () => {
    expectRow((await row({ [CONFIG]: cursorConfig([DRIFTED, CANONICAL, FOREIGN]) })).steps, {
      file: CONFIG,
      alreadyInstalled: false,
      wrote: cursorConfig([CANONICAL, FOREIGN]),
      detected: CONFIGURED,
      left: cursorConfig([FOREIGN]),
    });
  });

  test('refuses a hook config carrying comments instead of dropping them', async () => {
    const seed = `{\n  // ours\n  "version": 1\n}\n`;
    const { steps, tree } = await row({ [CONFIG]: seed });

    expect(steps?.install.result).toMatchObject({
      ok: false,
      error: {
        name: 'Error',
        message: expect.stringContaining(`Failed to parse Cursor hooks config ${CONFIG_PATH}: `),
      },
    });
    expect(fileAt(tree, CONFIG)).toBe(seed);
  });

  test.each([
    ['{"version": 2}\n', 'must set "version": 1'],
    ['{"version": 1, "hooks": []}\n', '"hooks" must be an object'],
    ['{"version": 1, "hooks": {"preToolUse": {}}}\n', '"hooks.preToolUse" must be an array'],
  ])('refuses a shape it cannot edit safely: %s', async (seed, reason) => {
    const refusal = {
      ok: false,
      error: { name: 'Error', message: `Cursor hooks config ${CONFIG_PATH} ${reason}` },
    } as const;
    const { steps, tree } = await row({ [CONFIG]: seed });

    expect(steps?.install.result).toEqual(refusal);
    expect(steps?.finalUninstall).toEqual(refusal);
    expect(fileAt(tree, CONFIG)).toBe(seed);
  });

  test('replaces a symlinked hook config with a regular file of its own', async () => {
    const seed = cursorConfig([FOREIGN]);
    const { steps } = await row({ 'foreign.json': seed, [CONFIG]: { symlink: '../foreign.json' } });

    expect(steps?.install.tree.find((entry) => entry.path === CONFIG)?.kind).toBe('file');
    expect(fileAt(steps?.install.tree, 'foreign.json')).toBe(seed);
    expect(fileAt(steps?.install.tree, CONFIG)).toBe(cursorConfig([FOREIGN, CANONICAL]));
  });
});

describe('the Cursor detector differential', () => {
  test('names every drift a reinstall would repair', async () => {
    expect(await detection({ [CONFIG]: cursorConfig([DRIFTED, CANONICAL, FOREIGN]) })).toEqual({
      kind: 'returned',
      value: {
        ...CONFIGURED,
        errors: [
          'Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates',
          'Managed hook is missing "failClosed": true; reinstall to repair',
          'Managed hook "timeout" is not 30; reinstall to repair',
        ],
      },
    });
  });

  test('says nothing is installed for a foreign or absent config', async () => {
    const absent = {
      kind: 'returned',
      value: { platform: 'cursor', status: 'n/a', configPath: CONFIG_PATH },
    } as const;

    expect(await detection({ [CONFIG]: cursorConfig([FOREIGN]) })).toEqual(absent);
    expect(await detection({})).toEqual(absent);
  });

  test('reports a config it cannot parse instead of guessing', async () => {
    expect(await detection({ [CONFIG]: '{ "version": 1, }\n' })).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'cursor',
        status: 'n/a',
        configPath: CONFIG_PATH,
        errors: [expect.stringContaining(`Failed to parse Cursor hooks config ${CONFIG_PATH}: `)],
      },
    });
  });
});

const CLAUDE_INSTALL = '.claude/plugins/cache/cc-marketplace/cc-safety-net/2.6.1';
const CLAUDE_CURSOR_MANIFEST = `${CLAUDE_INSTALL}/.cursor-plugin/plugin.json`;
const claudePlugin = (enabled: boolean) => ({
  '.claude/plugins/installed_plugins.json': JSON.stringify({
    plugins: {
      'cc-safety-net@cc-marketplace': [
        { scope: 'user', installPath: `<home>/${CLAUDE_INSTALL}`, version: '2.6.1' },
      ],
    },
  }),
  '.claude/settings.json': JSON.stringify({
    enabledPlugins: { 'cc-safety-net@cc-marketplace': enabled },
  }),
});
const CLAUDE_CURSOR_PLUGIN = { ...claudePlugin(true), [CLAUDE_CURSOR_MANIFEST]: '{}' };

describe('Cursor protected through the Claude Code plugin', () => {
  test('counts as configured when the enabled Claude Code plugin carries the Cursor manifest', async () => {
    expect(await detection(CLAUDE_CURSOR_PLUGIN)).toEqual({
      kind: 'returned',
      value: {
        platform: 'cursor',
        status: 'configured',
        method: 'Claude Code plugin',
        configPath: `<home>/${CLAUDE_CURSOR_MANIFEST}`,
      },
    });
  });

  test('warns that the npx hook duplicates the Claude Code plugin', async () => {
    expect(
      await detection({ ...CLAUDE_CURSOR_PLUGIN, [CONFIG]: cursorConfig([CANONICAL]) }),
    ).toEqual({
      kind: 'returned',
      value: {
        ...CONFIGURED,
        errors: [
          'The Claude Code plugin already runs this check in Cursor, so every tool call is checked twice. Run `cc-safety-net uninstall --cursor` to remove this hook.',
        ],
      },
    });
  });

  test('ignores a Claude Code plugin that is disabled or predates the Cursor manifest', async () => {
    const absent = {
      kind: 'returned',
      value: { platform: 'cursor', status: 'n/a', configPath: CONFIG_PATH },
    } as const;

    expect(await detection({ ...claudePlugin(false), [CLAUDE_CURSOR_MANIFEST]: '{}' })).toEqual(
      absent,
    );
    expect(await detection(claudePlugin(true))).toEqual(absent);
  });
});
