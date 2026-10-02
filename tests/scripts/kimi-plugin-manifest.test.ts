import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import pkg from '../../package.json';

const MANIFEST_PATH = 'kimi.plugin.json';

function readManifest() {
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as {
    name: string;
    version: string;
    hooks: Array<{ event: string; command: string; timeout: number }>;
  };
}

function gitIncludes(path: string) {
  const result = Bun.spawnSync(['git', 'ls-files', '--cached', path], {
    stdout: 'pipe',
    stderr: 'pipe',
  });
  return result.stdout.toString().trim().split('\n').filter(Boolean);
}

describe('Kimi Code plugin manifest', () => {
  test('ships at the repository root and is visible to git', () => {
    expect(existsSync(MANIFEST_PATH)).toBeTrue();
    expect(gitIncludes(MANIFEST_PATH)).toEqual([MANIFEST_PATH]);
    expect(readManifest().name).toBe('cc-safety-net');
  });

  test('declares the package version', () => {
    expect(readManifest().version).toBe(pkg.version);
  });

  test('declares one blocking hook that runs the packaged Kimi adapter for every tool', () => {
    const hooks = readManifest().hooks;
    expect(hooks).toHaveLength(1);
    expect(hooks[0]?.event).toBe('PreToolUse');
    expect(Object.hasOwn(hooks[0] ?? {}, 'matcher')).toBeFalse();
    expect(hooks[0]?.command).toBe('node ./dist/bin/cc-safety-net.js hook --kimi-code');
    expect(hooks[0]?.timeout).toBe(30);
  });
});
