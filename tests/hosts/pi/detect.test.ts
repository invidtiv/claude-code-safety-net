import { afterEach, expect, test } from 'bun:test';
import type { HookDetection } from '@/hosts/detect/context';
import { detect as detectPi } from '@/hosts/pi/detect';
import type { TreeSpec } from '../../helpers/fixture-tree';
import { detectionRunner } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const SETTINGS = '.pi/agent/settings.json';
const SETTINGS_PATH = `<home>/${SETTINGS}`;
const settings = (...packages: readonly unknown[]): TreeSpec => ({
  [SETTINGS]: JSON.stringify({ packages }),
});

const detection = detectionRunner((environment) =>
  detectPi({ environment, cwd: environment.home }),
);

const status = (value: HookDetection) => ({ kind: 'returned' as const, value });

afterEach(removeTempRoots);

test.each([
  ['Pi never wrote its settings', {} as TreeSpec],
  ['the settings hold no package list', { [SETTINGS]: '{}' } as TreeSpec],
  ['the package list is empty', settings()],
  ['another package is installed', settings('npm:other', { source: 'npm:cc-safety-net-fork' })],
])('reports Pi absent when %s', async (_case, seed) => {
  expect(await detection(seed)).toEqual(status({ platform: 'pi', status: 'n/a' }));
});

test.each([
  ['a bare source string with a version', settings('npm:cc-safety-net@1')],
  ['a bare source string without one', settings('npm:cc-safety-net')],
  ['an entry with no resource filter', settings({ source: 'npm:cc-safety-net' })],
  [
    'a filter that keeps the extension',
    settings({ source: 'npm:cc-safety-net', extensions: ['dist/pi/index.js'] }),
  ],
  ...(
    [
      ['a `-`-prefixed entry naming another path', ['-cc-safety-net']],
      ['the extension path beside an exclusion of another file', ['dist/pi/index.js', '!other.js']],
      ['the force-include Pi writes when the extension is enabled', ['+dist/pi/index.js']],
      ['a force-include with a `./` prefix', ['+./dist/pi/index.js']],
      ['a force-include that overrides a glob exclusion', ['!*.js', '+dist/pi/index.js']],
      ['an include of the file name', ['index.js']],
    ] as const
  ).map(
    ([description, extensions]) =>
      [description, settings({ source: 'npm:cc-safety-net', extensions })] as const,
  ),
])('reports the package configured for %s', async (_case, seed) => {
  expect(await detection(seed)).toEqual(
    status({
      platform: 'pi',
      status: 'configured',
      method: 'package config',
      configPath: SETTINGS_PATH,
    }),
  );
});

test.each([
  ['an empty filter', []],
  ['a `!` exclusion of the extension', ['!dist/pi/index.js']],
  ['a `!` exclusion of the file name', ['dist/pi/index.js', '!index.js']],
  ['a pattern that matches no extension path', ['cc-safety-net']],
  ['an include with a `./` prefix, which Pi matches literally', ['./dist/pi/index.js']],
  ['the force-exclude Pi writes when the extension is disabled', ['-dist/pi/index.js']],
  ['a force-exclude beside a force-include', ['+dist/pi/index.js', '-./dist/pi/index.js']],
  ['a glob exclusion doctor does not evaluate', ['dist/pi/index.js', '!dist/**']],
  ['an entry that is not a string', ['dist/pi/index.js', 1]],
])('reports the extension disabled for %s', async (_case, extensions) => {
  expect(await detection(settings({ source: 'npm:cc-safety-net', extensions }))).toEqual(
    status({
      platform: 'pi',
      status: 'disabled',
      method: 'package config',
      configPath: SETTINGS_PATH,
      errors: ['npm:cc-safety-net is installed but its extension is disabled in Pi settings'],
    }),
  );
});

test.each([
  ['a directory sits where the settings belong', null],
  ['the settings are not JSON', '{ packages: '],
])('refuses to guess when %s', async (_case, entry) => {
  expect(await detection({ [SETTINGS]: entry })).toEqual(
    status({ platform: 'pi', status: 'not-inspected' }),
  );
});

test.each([
  ['an absolute path', '<home>/pi-agent'],
  ['a path under ~', '~/pi-agent'],
])('reads the settings under PI_CODING_AGENT_DIR given as %s', async (_case, agentDir) => {
  expect(
    await detection(
      { 'pi-agent/settings.json': JSON.stringify({ packages: ['npm:cc-safety-net'] }) },
      { PI_CODING_AGENT_DIR: agentDir },
    ),
  ).toEqual(
    status({
      platform: 'pi',
      status: 'configured',
      method: 'package config',
      configPath: '<home>/pi-agent/settings.json',
    }),
  );
});

test('ignores ~/.pi/agent when PI_CODING_AGENT_DIR names another directory', async () => {
  expect(
    await detection(settings('npm:cc-safety-net'), { PI_CODING_AGENT_DIR: '<home>/pi-agent' }),
  ).toEqual(status({ platform: 'pi', status: 'n/a' }));
});
