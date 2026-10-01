import { afterEach, expect, test } from 'bun:test';
import { detect as detectDeepSeekHarness } from '@/hosts/deepseek-harness/detect';
import type { HookDetection } from '@/hosts/detect/context';
import type { TreeSpec } from '../../helpers/fixture-tree';
import { detectionRunner } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const WEB = '.dsh/profiles/web/package.json';
const DESKTOP = '.dsh/profiles/desktop/package.json';

const manifest = (options: { installed: boolean; bundles: readonly string[] }) =>
  JSON.stringify({
    name: 'dsh-profile',
    private: true,
    dependencies: options.installed ? { 'cc-safety-net': '^2.4.15' } : {},
    dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', ...options.bundles] } },
  });
const enabled = manifest({ installed: true, bundles: ['cc-safety-net'] });
const deselected = manifest({ installed: true, bundles: [] });
const absent = manifest({ installed: false, bundles: [] });

const detection = detectionRunner((environment) =>
  detectDeepSeekHarness({ environment, cwd: environment.home }),
);

const status = (value: HookDetection) => ({ kind: 'returned' as const, value });

afterEach(removeTempRoots);

test.each([
  ['DeepSeek Harness never ran', {} as TreeSpec],
  [
    'a profile has no cc-safety-net dependency',
    { [WEB]: absent, '.dsh/profiles/node_modules': null },
  ],
  ['a profile directory has no manifest yet', { '.dsh/profiles/web': null }],
])('reports DeepSeek Harness absent when %s', async (_case, seed) => {
  expect(await detection(seed)).toEqual(status({ platform: 'deepseek-harness', status: 'n/a' }));
});

test('reports each profile whose bundle list selects cc-safety-net', async () => {
  expect(await detection({ [WEB]: enabled, [DESKTOP]: absent })).toEqual(
    status({
      platform: 'deepseek-harness',
      status: 'configured',
      method: 'dsh bundle',
      configPaths: [`<home>/${WEB}`],
    }),
  );
});

test('warns about a profile that keeps the package but deselected its bundle', async () => {
  expect(await detection({ [WEB]: enabled, [DESKTOP]: deselected })).toEqual(
    status({
      platform: 'deepseek-harness',
      status: 'configured',
      method: 'dsh bundle',
      configPaths: [`<home>/${WEB}`],
      errors: ['cc-safety-net is installed in the desktop profile but its bundle is disabled'],
    }),
  );
});

test('reports a deselected bundle as disabled when no profile enables it', async () => {
  expect(await detection({ [DESKTOP]: deselected })).toEqual(
    status({
      platform: 'deepseek-harness',
      status: 'disabled',
      method: 'dsh bundle',
      configPaths: [`<home>/${DESKTOP}`],
      errors: ['cc-safety-net is installed in the desktop profile but its bundle is disabled'],
    }),
  );
});

test('refuses to guess when a profile manifest is not JSON and none enables the bundle', async () => {
  expect(await detection({ [WEB]: '{ dependencies: ', [DESKTOP]: absent })).toEqual(
    status({ platform: 'deepseek-harness', status: 'not-inspected' }),
  );
});

test.each([
  ['an absolute path', '<home>/dsh-home'],
  ['a path under ~', '~/dsh-home'],
])('reads the profiles under DSH_HOME given as %s', async (_case, dshHome) => {
  expect(
    await detection(
      { 'dsh-home/profiles/web/package.json': enabled, [WEB]: deselected },
      { DSH_HOME: dshHome },
    ),
  ).toEqual(
    status({
      platform: 'deepseek-harness',
      status: 'configured',
      method: 'dsh bundle',
      configPaths: ['<home>/dsh-home/profiles/web/package.json'],
    }),
  );
});
