import { afterEach, describe, expect, test } from 'bun:test';
import { detect as detectKimi } from '@/hosts/kimi-code/detect';
import { installKimiCode, uninstallKimiCode } from '@/hosts/kimi-code/install';
import { differential, expectRow, fileAt, hostRunner } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const TOML = '.kimi-code/config.toml';
const MANAGED = 'npx -y cc-safety-net hook --kimi-code';
const HOOK_BLOCK = `[[hooks]]\nevent = "PreToolUse"\ncommand = "${MANAGED}"`;
const INLINE_HOOK = `{ event = "PreToolUse", command = "${MANAGED}" }`;
const COMMENTED = '# top comment\nmodel = "x" # trailing\n\n[model]\nname = "y"\n';
const INLINE_SEED =
  'name = "before"\nhooks = [\n  { event = "PostToolUse", command = "echo" }, # keep\n]\nmodel = "kimi-k2"\n';

const CONFIGURED = {
  platform: 'kimi-code',
  status: 'configured',
  method: 'hook config',
  configPath: `<home>/${TOML}`,
} as const;

const INSTALLED = '.kimi-code/plugins/installed.json';
const PLUGIN = {
  platform: 'kimi-code',
  method: 'plugin config',
  configPath: `<home>/${INSTALLED}`,
} as const;
const installedPlugins = (...plugins: readonly { id: string; enabled: boolean }[]) =>
  JSON.stringify({
    version: 1,
    plugins: plugins.map((plugin) => ({
      ...plugin,
      root: '/plugins/root',
      source: 'github',
      installedAt: '2026-10-13T00:00:00.000Z',
    })),
  });

const { row, detection } = hostRunner((environment) => ({
  install: () => installKimiCode(environment),
  detect: () => detectKimi({ environment, cwd: environment.home }),
  uninstall: () => uninstallKimiCode(environment),
}));

afterEach(removeTempRoots);

describe('the Kimi Code hook config differential', () => {
  test('writes the hook block when the host has no config', async () => {
    expectRow((await row({})).steps, {
      file: TOML,
      alreadyInstalled: false,
      wrote: `${HOOK_BLOCK}\n`,
      detected: CONFIGURED,
      left: '\n',
    });
  });

  test('appends the block after the config the user wrote, and gives it back untouched', async () => {
    expectRow((await row({ [TOML]: COMMENTED })).steps, {
      file: TOML,
      alreadyInstalled: false,
      wrote: `${COMMENTED}\n${HOOK_BLOCK}\n`,
      detected: CONFIGURED,
      left: COMMENTED,
    });
  });

  test('joins an inline hooks array as one more item, and takes only that item back out', async () => {
    const { steps } = await row({ [TOML]: INLINE_SEED });
    expect(Bun.TOML.parse(fileAt(steps?.uninstall.tree, TOML) ?? '')).toEqual({
      name: 'before',
      model: 'kimi-k2',
      hooks: [{ event: 'PostToolUse', command: 'echo' }],
    });
    expectRow(steps, {
      file: TOML,
      alreadyInstalled: false,
      wrote: `name = "before"\nhooks = [\n  { event = "PostToolUse", command = "echo" }, # keep,\n     ${INLINE_HOOK}]\nmodel = "kimi-k2"\n`,
      detected: CONFIGURED,
      left: 'name = "before"\nhooks = [\n  { event = "PostToolUse", command = "echo" }, # keep,\n     ]\nmodel = "kimi-k2"\n',
    });
  });

  test.each([
    ['an empty file', '', {}, {}],
    ['blank lines', '\n\n', {}, {}],
    [
      'a key without a final newline',
      'model = "kimi-k2"',
      { model: 'kimi-k2' },
      { model: 'kimi-k2' },
    ],
    [
      'an empty array with a comment',
      'hooks = [ ] # empty\nmodel = "kimi-k2"\n',
      { model: 'kimi-k2' },
      { model: 'kimi-k2' },
    ],
    [
      'a hooks key inside a table',
      '[agent]\nhooks = ["keep"]\n',
      { agent: { hooks: ['keep'] } },
      { agent: { hooks: ['keep'] } },
    ],
    [
      'a hooks key inside a comment',
      '# hooks = []\nmodel = "kimi-k2"\n',
      { model: 'kimi-k2' },
      { model: 'kimi-k2' },
    ],
    ['a comments-only inline array', 'hooks = [\n # keep\n]\n', {}, { hooks: [] }],
  ])('round-trips %s through the config installer', async (_case, seed, userConfig, left) => {
    const { steps } = await row({ [TOML]: seed });
    expect(steps?.install.result).toMatchObject({ ok: true, value: { alreadyInstalled: false } });
    expect(Bun.TOML.parse(fileAt(steps?.install.tree, TOML) ?? '')).toEqual({
      ...userConfig,
      hooks: [{ event: 'PreToolUse', command: MANAGED }],
    });
    expect(steps?.reinstall.tree).toEqual(steps?.install.tree);
    expect(Bun.TOML.parse(fileAt(steps?.uninstall.tree, TOML) ?? '')).toEqual(left);
    expect(steps?.finalUninstall).toMatchObject({ ok: true, value: { alreadyInstalled: false } });
    if (seed.includes('# keep')) expect(fileAt(steps?.uninstall.tree, TOML)).toContain('# keep');
  });

  test.each([
    [
      'a single line without a final newline',
      'hooks = [{ event = "Stop", command = "keep" }]',
      'keep',
    ],
    ['a trailing comma', 'hooks = [\n { event = "Stop", command = "keep" },\n]\n', 'keep'],
    ['CRLF line endings', 'hooks = [\r\n { event = "Stop", command = "keep" }\r\n]\r\n', 'keep'],
    ['tab indentation', '\thooks = [\n\t\t{ event = "Stop", command = "keep" }\n\t]\n', 'keep'],
    [
      'escaped quotes and brackets',
      'hooks = [{ event = "Stop", command = "echo ] \\" }" }]\n',
      'echo ] " }',
    ],
  ])('preserves the foreign hook in %s', async (_case, seed, command) => {
    const { steps } = await row({ [TOML]: seed });
    expect(steps?.install.result).toMatchObject({ ok: true, value: { alreadyInstalled: false } });
    expect(Bun.TOML.parse(fileAt(steps?.install.tree, TOML) ?? '')).toEqual({
      hooks: [
        { event: 'Stop', command },
        { event: 'PreToolUse', command: MANAGED },
      ],
    });
    expect(steps?.reinstall.tree).toEqual(steps?.install.tree);
    expect(Bun.TOML.parse(fileAt(steps?.uninstall.tree, TOML) ?? '')).toEqual({
      hooks: [{ event: 'Stop', command }],
    });
    expect(steps?.finalUninstall).toMatchObject({ ok: true, value: { alreadyInstalled: false } });
    if (seed.endsWith('\r\n')) expect(fileAt(steps?.uninstall.tree, TOML)).toEndWith('\r\n');
    if (!seed.endsWith('\n')) expect(fileAt(steps?.uninstall.tree, TOML)).toEndWith(']');
  });

  test.each([
    [
      'first inline item',
      `hooks = [${INLINE_HOOK}, { event = "Stop", command = "keep" }]\n`,
      { hooks: [{ event: 'Stop', command: 'keep' }] },
    ],
    [
      'last inline item',
      `hooks = [{ event = "Stop", command = "keep" }, ${INLINE_HOOK}]\n`,
      { hooks: [{ event: 'Stop', command: 'keep' }] },
    ],
    ['only inline item', `hooks = [${INLINE_HOOK}]\n`, { hooks: [] }],
    [
      'last hook table',
      `[[hooks]]\nevent = "Stop"\ncommand = "keep"\n${HOOK_BLOCK}\n`,
      { hooks: [{ event: 'Stop', command: 'keep' }] },
    ],
    [
      'middle hook table',
      `[[hooks]]\nevent = "Stop"\ncommand = "keep"\n${HOOK_BLOCK}\n[[hooks]]\nevent = "Stop"\ncommand = "also keep"\n`,
      {
        hooks: [
          { event: 'Stop', command: 'keep' },
          { event: 'Stop', command: 'also keep' },
        ],
      },
    ],
  ])('removes the managed %s without changing the other hooks', async (_case, seed, expected) => {
    const { steps } = await row({ [TOML]: seed });
    expect(fileAt(steps?.install.tree, TOML)).toBe(seed);
    expect(Bun.TOML.parse(fileAt(steps?.uninstall.tree, TOML) ?? '')).toEqual(expected);
    expect(steps?.finalUninstall).toMatchObject({ ok: true, value: { alreadyInstalled: false } });
  });

  test('leaves a command mentioned outside the hook array untouched', async () => {
    const seed = `hooks = [{ event = "Stop", command = "keep" }]\n[notes]\ntext = '${INLINE_HOOK}'\n`;
    const result = await differential({ seed: { [TOML]: seed } }, uninstallKimiCode);
    expect(result.outcome.kind).toBe('returned');
    expect(fileAt(result.tree, TOML)).toBe(seed);
    expect(Bun.TOML.parse(fileAt(result.tree, TOML) ?? '')).toEqual({
      hooks: [{ event: 'Stop', command: 'keep' }],
      notes: { text: INLINE_HOOK },
    });
  });

  test('drops an empty inline hooks array so the block can take the key over', async () => {
    expectRow((await row({ [TOML]: 'hooks = []\n[model]\nname = "y"\n' })).steps, {
      file: TOML,
      alreadyInstalled: false,
      wrote: `[model]\nname = "y"\n\n${HOOK_BLOCK}\n`,
      detected: CONFIGURED,
      left: '[model]\nname = "y"\n',
    });
  });

  test.each([
    ['a string that never closes', 'hooks = [ "abc\n', 'Unterminated string in Kimi Code config'],
    [
      'an array that never closes',
      'hooks = [ { event = "PreToolUse" }\n',
      'Unmatched hooks array in Kimi Code config',
    ],
  ])('refuses %s instead of rewriting the config', async (_label, seed, message) => {
    const { steps, tree } = await row({ [TOML]: seed });

    expect(steps?.install.result).toEqual({ ok: false, error: { name: 'Error', message } });
    expect(fileAt(tree, TOML)).toBe(seed);
  });

  test('takes its own block back out and leaves the table that follows it', async () => {
    const table = '[model]\nname = "y"\n';
    expectRow((await row({ [TOML]: `${HOOK_BLOCK}\n\n${table}` })).steps, {
      file: TOML,
      alreadyInstalled: true,
      wrote: `${HOOK_BLOCK}\n\n${table}`,
      detected: CONFIGURED,
      left: `\n${table}`,
    });
  });

  test('follows KIMI_CODE_HOME out of the home directory', async () => {
    const relocated = 'kimi-home/config.toml';
    const { steps } = await row({}, { KIMI_CODE_HOME: '<home>/kimi-home' });

    expect(fileAt(steps?.install.tree, TOML)).toBeUndefined();
    expectRow(steps, {
      file: relocated,
      alreadyInstalled: false,
      wrote: `${HOOK_BLOCK}\n`,
      detected: { ...CONFIGURED, configPath: `<home>/${relocated}` },
      left: '\n',
    });
  });
});

describe('the Kimi Code detector differential', () => {
  test('says nothing is installed for a foreign or absent config', async () => {
    const absent = {
      kind: 'returned',
      value: { platform: 'kimi-code', status: 'n/a', configPath: `<home>/${TOML}` },
    } as const;

    expect(await detection({ [TOML]: COMMENTED })).toEqual(absent);
    expect(await detection({})).toEqual(absent);
  });

  test.each([
    [
      'an unknown key in a foreign table',
      `[[hooks]]\nevent = "PostToolUse"\ncommand = "echo"\ncwd = "/tmp"\n\n${HOOK_BLOCK}\n`,
      'hooks entry 1 is invalid (unknown key "cwd")',
    ],
    [
      'an unknown key on the managed table',
      `${HOOK_BLOCK}\nenv = { A = "1" }\n`,
      'hooks entry 1 is invalid (unknown key "env")',
    ],
    [
      'an event Kimi does not know in an inline array',
      `hooks = [\n  { event = "AfterTool", command = "echo" }, # foreign\n  ${INLINE_HOOK},\n]\n`,
      'hooks entry 1 is invalid ("event" is not a Kimi Code hook event)',
    ],
    [
      'a missing event',
      `${HOOK_BLOCK}\n\n[[hooks]]\ncommand = "echo"\n`,
      'hooks entry 2 is invalid ("event" is not a Kimi Code hook event)',
    ],
    [
      'an empty command',
      `[[hooks]]\nevent = "Stop"\ncommand = ""\n\n${HOOK_BLOCK}\n`,
      'hooks entry 1 is invalid ("command" is missing or empty)',
    ],
    [
      'a matcher that is not a string',
      `[[hooks]]\nevent = "Stop"\nmatcher = 5\ncommand = "echo"\n\n${HOOK_BLOCK}\n`,
      'hooks entry 1 is invalid ("matcher" is not a string)',
    ],
    [
      'a key given twice',
      `${HOOK_BLOCK}\ncommand = "echo"\n`,
      'hooks entry 1 is invalid (duplicate key "command")',
    ],
    [
      'a key given twice under another spelling',
      `[[hooks]]\nevent = "Stop"\n"event" = "Stop"\ncommand = "echo"\n\n${HOOK_BLOCK}\n`,
      'hooks entry 1 is invalid (duplicate key "event")',
    ],
    ...['0', '601', '1.5', '"30"', '1__0', '_10'].map(
      (timeout) =>
        [
          `a timeout of ${timeout}`,
          `${HOOK_BLOCK}\ntimeout = ${timeout}\n`,
          'hooks entry 1 is invalid ("timeout" is not an integer from 1 to 600)',
        ] as const,
    ),
  ])('reports every hook dropped for %s', async (_case, config, problem) => {
    expect(await detection({ [TOML]: config })).toEqual({
      kind: 'returned',
      value: {
        ...CONFIGURED,
        status: 'disabled',
        errors: [`Kimi Code ignores every hook because ${problem}; fix it in <home>/${TOML}`],
      },
    });
  });

  test.each(['1_0', '+6_00', '1.0', '6e2'])(
    'keeps the hook configured for a timeout of %s, which TOML reads as a whole number',
    async (timeout) => {
      expect(await detection({ [TOML]: `${HOOK_BLOCK}\ntimeout = ${timeout}\n` })).toEqual({
        kind: 'returned',
        value: CONFIGURED,
      });
    },
  );

  test.each([
    ['a literal multiline command', "command = '''\necho it's here\n'''"],
    ['a basic multiline command', 'command = """\necho start\n[ -f ~/.x ] && echo\n"""'],
    ['a multiline string beside an invalid key', 'command = """\necho\n"""\ncwd = "/tmp"'],
  ])('refuses to judge the entries beside %s', async (_case, command) => {
    expect(
      await detection({ [TOML]: `[[hooks]]\nevent = "Stop"\n${command}\n\n${HOOK_BLOCK}\n` }),
    ).toEqual({ kind: 'returned', value: CONFIGURED });
  });

  test('keeps the hook configured beside foreign entries that use every allowed key', async () => {
    const foreign =
      '[[hooks]]\nevent = \'PostToolUse\' # trailing\nmatcher = "Bash"\ncommand = "echo \'# not a comment\', \\"x\\""\ntimeout = 600\n';
    expect(
      await detection({ [TOML]: `model = "x"\n\n${foreign}\n${HOOK_BLOCK}\ntimeout = 1\n` }),
    ).toEqual({ kind: 'returned', value: CONFIGURED });
    expect(
      await detection({ [TOML]: INLINE_SEED.replace('hooks = [', `hooks = [\n  ${INLINE_HOOK},`) }),
    ).toEqual({
      kind: 'returned',
      value: CONFIGURED,
    });
  });

  test.each([
    [true, { ...PLUGIN, status: 'configured' as const }],
    [
      false,
      {
        ...PLUGIN,
        status: 'disabled' as const,
        errors: [
          'cc-safety-net is installed but not enabled in Kimi Code; run /plugins enable cc-safety-net',
        ],
      },
    ],
  ])('reports a plugin install with enabled %p', async (enabled, expected) => {
    expect(
      await detection({ [INSTALLED]: installedPlugins({ id: 'cc-safety-net', enabled }) }),
    ).toEqual({
      kind: 'returned',
      value: expected,
    });
  });

  test.each([
    ['is not JSON', '{'],
    ['is a directory', null],
    ['holds no plugin list', '{"version":1}'],
  ])('names the plugin list when it %s', async (_case, installed) => {
    expect(await detection({ [INSTALLED]: installed })).toEqual({
      kind: 'returned',
      value: {
        platform: 'kimi-code',
        status: 'n/a',
        configPath: `<home>/${INSTALLED}`,
        errors: [
          `Cannot read <home>/${INSTALLED}, so doctor cannot tell whether the Kimi Code plugin is installed`,
        ],
      },
    });
  });

  test('follows KIMI_CODE_HOME to the plugin record and ignores other plugins', async () => {
    expect(
      await detection(
        {
          'kimi-home/plugins/installed.json': installedPlugins({
            id: 'cc-safety-net',
            enabled: true,
          }),
        },
        { KIMI_CODE_HOME: '<home>/kimi-home' },
      ),
    ).toEqual({
      kind: 'returned',
      value: {
        ...PLUGIN,
        status: 'configured',
        configPath: '<home>/kimi-home/plugins/installed.json',
      },
    });
    expect(
      await detection({ [INSTALLED]: installedPlugins({ id: 'other', enabled: true }) }),
    ).toEqual({
      kind: 'returned',
      value: { platform: 'kimi-code', status: 'n/a', configPath: `<home>/${TOML}` },
    });
  });

  test('reports a config it cannot read instead of guessing', async () => {
    expect(await detection({ [TOML]: null })).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'kimi-code',
        status: 'n/a',
        configPath: `<home>/${TOML}`,
        errors: [expect.stringContaining(`Failed to read <home>/${TOML}: EISDIR`)],
      },
    });
  });
});
