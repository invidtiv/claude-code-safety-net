import { describe, expect, test } from 'bun:test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { publishPluginBranch } from '../../scripts/publish-plugin-branch';
import { withTempDir } from '../helpers';

function git(cwd: string, ...args: string[]) {
  const result = Bun.spawnSync(['git', ...args], { cwd, stdout: 'pipe', stderr: 'pipe' });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

function writeTree(tree: string, files: Record<string, string>) {
  Object.entries(files).forEach(([path, content]) => {
    mkdirSync(dirname(join(tree, path)), { recursive: true });
    writeFileSync(join(tree, path), content);
  });
}

function createRepository(root: string) {
  const remote = join(root, 'remote.git');
  const repo = join(root, 'repo');
  git(root, 'init', '--bare', '-b', 'main', remote);
  git(
    root,
    'clone',
    '-c',
    'commit.gpgsign=false',
    '-c',
    'user.name=Publish Test',
    '-c',
    'user.email=publish@example.com',
    remote,
    repo,
  );
  writeTree(repo, { 'README.md': 'source\n', 'src/index.ts': 'export {};\n' });
  git(repo, 'add', '.');
  git(repo, 'commit', '-m', 'source');
  git(repo, 'push', 'origin', 'HEAD:refs/heads/main');
  return { remote, repo };
}

const PLUGIN_FILES = {
  '.claude-plugin/plugin.json': '{"name":"cc-safety-net","version":"2.7.0"}\n',
  'dist/bin/hook.js': 'module.exports = {};\n',
};

const remoteTip = (remote: string) => git(remote, 'rev-parse', 'refs/heads/plugin');
const remoteParents = (remote: string) =>
  git(remote, 'rev-list', '--parents', '-n', '1', 'refs/heads/plugin').split(' ').slice(1);

function withPublishedTree(fn: (fixture: ReturnType<typeof publishFixture>) => void) {
  return withTempDir('ccsn-publish-plugin-', (root) => fn(publishFixture(root)));
}

function publishFixture(root: string) {
  const repository = createRepository(root);
  const tree = join(root, 'tree');
  writeTree(tree, PLUGIN_FILES);
  const publish = (message: string) =>
    publishPluginBranch({ repository: repository.repo, tree, branch: 'plugin', message });
  return { ...repository, tree, publish, first: publish('v2.7.0 from abc') };
}

describe('publishPluginBranch', () => {
  test('first publish pushes a parentless commit holding only the tree files', async () => {
    await withPublishedTree((fixture) => {
      expect(fixture.first).toEqual({ commit: remoteTip(fixture.remote), pushed: true });
      expect(remoteParents(fixture.remote)).toEqual([]);
      expect(
        git(fixture.remote, 'ls-tree', '-r', '--name-only', 'refs/heads/plugin').split('\n'),
      ).toEqual(Object.keys(PLUGIN_FILES));
      expect(git(fixture.remote, 'log', '-1', '--format=%B', 'refs/heads/plugin')).toBe(
        'v2.7.0 from abc',
      );
      expect(git(fixture.repo, 'status', '--porcelain')).toBe('');
    });
  });

  test('a changed tree appends a child of the current tip', async () => {
    await withPublishedTree((fixture) => {
      writeTree(fixture.tree, { 'dist/bin/hook.js': 'module.exports = { changed: true };\n' });

      fixture.publish('v2.7.1');

      expect(remoteParents(fixture.remote)).toEqual([fixture.first.commit]);
      expect(git(fixture.remote, 'show', 'refs/heads/plugin:dist/bin/hook.js')).toBe(
        'module.exports = { changed: true };',
      );
    });
  });

  test('an older release leaves the newer tip in place', async () => {
    await withPublishedTree((fixture) => {
      writeTree(fixture.tree, {
        '.claude-plugin/plugin.json': '{"name":"cc-safety-net","version":"2.6.9"}\n',
        'dist/bin/hook.js': 'module.exports = { older: true };\n',
      });

      expect(fixture.publish('v2.6.9')).toEqual({ commit: fixture.first.commit, pushed: false });
      expect(remoteTip(fixture.remote)).toBe(fixture.first.commit);
    });
  });

  test('an unchanged tree adds no commit', async () => {
    await withPublishedTree((fixture) => {
      expect(fixture.publish('v2.7.1')).toEqual({ commit: fixture.first.commit, pushed: false });
      expect(remoteTip(fixture.remote)).toBe(fixture.first.commit);
    });
  });
});
