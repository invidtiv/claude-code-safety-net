import { afterEach, expect, test } from 'bun:test';
import { mkdirSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  markDeepSeekHarnessDesktopAvailable,
  planDeepSeekHarnessInstall,
  planDeepSeekHarnessUninstall,
} from '@/hosts/deepseek-harness/install';
import type { InstallTargetChoice } from '@/hosts/install/choices';
import { type TreeSpec, writeTree } from '../../helpers/fixture-tree';
import { createTempRoot, environmentFor, removeTempRoots } from '../../helpers/temp-home';

const DESKTOP_MANIFEST = '.dsh/profiles/desktop/package.json';
const WEB_MANIFEST = '.dsh/profiles/web/package.json';
const MAC_CLI = 'DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh';
const WINDOWS_CLI = 'AppData/Local/Programs/DeepSeek Harness/resources/runtime/cli/bin/dsh.cmd';
const MAC_LOCK = 'Library/Application Support/@deepseek-ai/dsh-desktop/SingletonLock';
const NPX_DSH = ['npx', '-y', '@deepseek-ai/dsh'] as const;
const RUNNING =
  'Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.';

const manifest = (installed: boolean) =>
  JSON.stringify({
    dependencies: installed ? { 'cc-safety-net': '^2.4.15' } : {},
    dsh: { profile: { bundles: installed ? ['cc-safety-net'] : [] } },
  });

afterEach(removeTempRoots);

function machine(tree: TreeSpec) {
  const root = createTempRoot('dsh-install-');
  const home = join(root, 'home');
  const systemApplications = join(root, 'Applications');
  mkdirSync(systemApplications, { recursive: true });
  writeTree(home, tree);
  return {
    home,
    systemApplications,
    environment: environmentFor(home, {}),
    lock: (pid: number) => {
      mkdirSync(dirname(join(home, MAC_LOCK)), { recursive: true });
      symlinkSync(`host.local-${pid}`, join(home, MAC_LOCK));
    },
  };
}

function plan(
  current: ReturnType<typeof machine>,
  npmDsh: boolean,
  platform: NodeJS.Platform = 'darwin',
) {
  const probed: unknown[] = [];
  const planned = planDeepSeekHarnessInstall(current.environment, {
    platform,
    systemApplications: current.systemApplications,
    probe: (command) => {
      probed.push(command);
      return npmDsh;
    },
  });
  return { planned, probed };
}

test('without a Desktop profile the plugin goes to the web profile through npx', async () => {
  const run = plan(machine({}), false);

  expect(await run.planned).toMatchObject({
    commands: [[...NPX_DSH, 'plugin', '--profile', 'web', 'add', 'cc-safety-net']],
    message: 'Added cc-safety-net to the DeepSeek Harness web profile.',
  });
  expect(run.probed).toEqual([]);
});

test('a Desktop with an npm DeepSeek Harness beside it gets the plugin in both profiles', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false), [`Applications/${MAC_CLI}`]: '' });
  const run = plan(current, true);

  expect(await run.planned).toMatchObject({
    commands: [
      [
        join(current.home, 'Applications', MAC_CLI),
        'plugin',
        '--profile',
        'desktop',
        'add',
        'cc-safety-net',
      ],
      [...NPX_DSH, 'plugin', '--profile', 'web', 'add', 'cc-safety-net'],
    ],
    message: 'Added cc-safety-net to the DeepSeek Harness Desktop and web profiles.',
  });
  expect(run.probed).toEqual([
    ['npx', '--offline', '--no-install', '@deepseek-ai/dsh', '--version'],
  ]);
});

test('a Desktop alone gets the plugin only in its own profile', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false) });
  writeTree(current.systemApplications, { [MAC_CLI]: '' });

  expect(await plan(current, false).planned).toMatchObject({
    commands: [
      [
        join(current.systemApplications, MAC_CLI),
        'plugin',
        '--profile',
        'desktop',
        'add',
        'cc-safety-net',
      ],
    ],
    message: 'Added cc-safety-net to the DeepSeek Harness Desktop profile.',
  });
});

test('a Desktop profile whose app is not in a default location points at the Plugins page', async () => {
  expect(await plan(machine({ [DESKTOP_MANIFEST]: manifest(false) }), false).planned).toMatchObject(
    {
      commands: [[...NPX_DSH, 'plugin', '--profile', 'web', 'add', 'cc-safety-net']],
      message: [
        'Added cc-safety-net to the DeepSeek Harness web profile.',
        'DeepSeek Harness Desktop is not in its default location, so add cc-safety-net from its Plugins page.',
      ].join('\n'),
    },
  );
});

test('a running Desktop stops the install before anything changes', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false), [`Applications/${MAC_CLI}`]: '' });
  current.lock(process.pid);
  const run = plan(current, true);

  await expect(run.planned).rejects.toThrow(RUNNING);
  expect(run.probed).toEqual([]);
});

test('a lock left by a Desktop that is no longer running does not stop the install', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false), [`Applications/${MAC_CLI}`]: '' });
  current.lock(2_147_483_646);

  expect((await plan(current, false).planned).commands).toHaveLength(1);
});

test('Windows finds Desktop in the per-user Programs folder and its lockfile while it runs', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false), [WINDOWS_CLI]: '' });

  expect((await plan(current, false, 'win32').planned).commands).toEqual([
    [join(current.home, WINDOWS_CLI), 'plugin', '--profile', 'desktop', 'add', 'cc-safety-net'],
  ]);

  writeTree(current.home, { 'AppData/Roaming/@deepseek-ai/dsh-desktop/lockfile': '' });
  await expect(plan(current, false, 'win32').planned).rejects.toThrow(RUNNING);
});

test('uninstall removes the plugin from each profile that has it', () => {
  const current = machine({
    [DESKTOP_MANIFEST]: manifest(true),
    [WEB_MANIFEST]: manifest(true),
    [`Applications/${MAC_CLI}`]: '',
  });
  const location = { platform: 'darwin', systemApplications: current.systemApplications } as const;

  expect(planDeepSeekHarnessUninstall(current.environment, location)).toEqual([
    [
      join(current.home, 'Applications', MAC_CLI),
      'plugin',
      '--profile',
      'desktop',
      'remove',
      'cc-safety-net',
    ],
    [...NPX_DSH, 'plugin', '--profile', 'web', 'remove', 'cc-safety-net'],
  ]);
  current.lock(process.pid);
  expect(() => planDeepSeekHarnessUninstall(current.environment, location)).toThrow(RUNNING);
});

test('uninstall leaves profiles without the plugin alone, and says when no profile has it', () => {
  const webOnly = machine({ [DESKTOP_MANIFEST]: manifest(false), [WEB_MANIFEST]: manifest(true) });
  const location = { platform: 'darwin', systemApplications: webOnly.systemApplications } as const;

  expect(planDeepSeekHarnessUninstall(webOnly.environment, location)).toEqual([
    [...NPX_DSH, 'plugin', '--profile', 'web', 'remove', 'cc-safety-net'],
  ]);
  expect(() => planDeepSeekHarnessUninstall(machine({}).environment, location)).toThrow(
    'cc-safety-net is not installed in the DeepSeek Harness web or Desktop profile',
  );
});

test('uninstall from a Desktop that is not in a default location points at the Plugins page', () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(true), [WEB_MANIFEST]: manifest(true) });

  expect(() =>
    planDeepSeekHarnessUninstall(current.environment, {
      platform: 'darwin',
      systemApplications: current.systemApplications,
    }),
  ).toThrow(
    'DeepSeek Harness Desktop is not in its default location, so remove cc-safety-net from its Plugins page.',
  );
});

test('the install picker offers DeepSeek Harness when only Desktop is present', () => {
  const pi: InstallTargetChoice = {
    target: 'pi',
    flag: '--pi',
    label: 'Pi',
    available: false,
    unavailableReason: 'CLI not installed',
  };
  const dsh: InstallTargetChoice = {
    target: 'deepseek-harness',
    flag: '--deepseek-harness',
    label: 'DeepSeek Harness',
    available: false,
    unavailableReason: 'CLI not installed',
  };
  const withDesktop = machine({
    [DESKTOP_MANIFEST]: manifest(false),
    [`Applications/${MAC_CLI}`]: '',
  });
  const mark = (current: ReturnType<typeof machine>) =>
    markDeepSeekHarnessDesktopAvailable([pi, dsh], current.environment, {
      platform: 'darwin',
      systemApplications: current.systemApplications,
    });

  expect(mark(withDesktop)).toEqual([
    pi,
    { ...dsh, available: true, unavailableReason: undefined },
  ]);
  expect(mark(machine({}))).toEqual([pi, dsh]);
});

test('install checks afterwards that DeepSeek Harness enabled the bundle in every profile it targeted', async () => {
  const current = machine({ [DESKTOP_MANIFEST]: manifest(false), [`Applications/${MAC_CLI}`]: '' });
  const planned = await plan(current, true).planned;

  writeTree(current.home, { [DESKTOP_MANIFEST]: manifest(true), [WEB_MANIFEST]: manifest(true) });
  expect(await planned.afterInstall()).toBeUndefined();

  writeTree(current.home, {
    [WEB_MANIFEST]: JSON.stringify({
      dependencies: { 'cc-safety-net': '^2.4.14' },
      dsh: { profile: { bundles: [] } },
    }),
  });
  await expect(planned.afterInstall()).rejects.toThrow(
    'DeepSeek Harness installed cc-safety-net in the web profile but did not enable it. Enable it from the Plugins page, or update cc-safety-net if your registry served a release without DeepSeek Harness support.',
  );
});
