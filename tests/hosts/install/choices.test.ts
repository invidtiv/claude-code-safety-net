import { afterEach, describe, expect, test } from 'bun:test';
import { join } from 'node:path';
import {
  applyInstallTargetState,
  buildInstallTargetChoicesAsync,
  type InstallTargetChoice,
  probeInstallTarget,
} from '@/hosts/install/choices';
import type { NativeCommand } from '@/hosts/install/native';
import { type InstallTarget } from '@/hosts/install/targets';
import { createFakeBin, type FakeScriptEntry } from '../../helpers/fake-bin';
import { createTempRoot, removeTempRoots, withProcessEnv } from '../../helpers/temp-home';

const SCRIPT: readonly FakeScriptEntry[] = [
  { command: 'present', stdout: '1.0.0\n' },
  { command: 'broken', exit: 1 },
  { command: 'stalled', delayMs: 1000 },
];

const CONFIGURED: readonly InstallTarget[] = ['cursor', 'pi'];
const ANSWERING = ['cursor --version', 'pi --version'];

const scriptedProbe = (command: NativeCommand) => ANSWERING.includes(command.join(' '));

const groupedReasons = (
  choices: readonly InstallTargetChoice[],
): { configured: readonly string[]; rest: readonly string[] } => {
  const distinct = (rows: readonly InstallTargetChoice[]) => [
    ...new Set(rows.map((row) => `${row.available} ${row.unavailableReason ?? ''}`.trim())),
  ];
  return {
    configured: distinct(choices.filter((choice) => CONFIGURED.includes(choice.target))),
    rest: distinct(choices.filter((choice) => !CONFIGURED.includes(choice.target))),
  };
};

afterEach(removeTempRoots);

describe('probing a host CLI', () => {
  test('a clean exit means present; a failure and a missing binary do not', async () => {
    const bin = createFakeBin(join(createTempRoot('next-probe-'), 'fake'), SCRIPT);
    const commands: NativeCommand[] = [
      ['present', '--version'],
      ['broken', '--version'],
      ['absent', '--version'],
    ];
    const ported = await withProcessEnv(bin.env, () =>
      Promise.all(commands.map((command) => probeInstallTarget(command))),
    );
    expect(ported).toEqual([true, false, false]);
  });

  test('a CLI that never answers is unavailable once the probe cap expires', async () => {
    const bin = createFakeBin(join(createTempRoot('next-probe-'), 'fake'), SCRIPT);
    const stalled: NativeCommand = ['stalled', '--version'];
    const started = Date.now();
    const probed = await withProcessEnv(bin.env, () => probeInstallTarget(stalled, 100));
    const elapsed = Date.now() - started;
    expect(probed).toBe(false);
    expect(elapsed).toBeGreaterThanOrEqual(100);
    expect(elapsed).toBeLessThan(900);
  });
});

describe('the install picker rows', () => {
  test.each([
    [undefined, { configured: ['true'], rest: ['false CLI not installed'] }],
    ['install', { configured: ['false already installed'], rest: ['false CLI not installed'] }],
    ['uninstall', { configured: ['true'], rest: ['false not installed'] }],
  ] as const)('uses independent availability reasons for %s', async (action, expected) => {
    const options = { action, configuredTargets: CONFIGURED };
    const base = await buildInstallTargetChoicesAsync(scriptedProbe);
    expect(groupedReasons(await buildInstallTargetChoicesAsync(scriptedProbe, options))).toEqual(
      expected,
    );
    expect(groupedReasons(applyInstallTargetState(base, options))).toEqual(expected);
  });
});
