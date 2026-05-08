import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { withLinkedWorktreeFixture, withTempDir } from './helpers.ts';

describe('test helpers', () => {
  test('withTempDir waits for async callbacks before cleanup', async () => {
    let tempDir = '';

    await withTempDir('safety-net-helper-', async (dir) => {
      tempDir = dir;
      await Promise.resolve();
      expect(existsSync(dir)).toBe(true);
    });

    expect(existsSync(tempDir)).toBe(false);
  });

  test('withLinkedWorktreeFixture waits for async callbacks before cleanup', async () => {
    let rootDir = '';

    await withLinkedWorktreeFixture(async (fixture) => {
      rootDir = fixture.rootDir;
      await Promise.resolve();
      expect(existsSync(fixture.rootDir)).toBe(true);
    });

    expect(existsSync(rootDir)).toBe(false);
  });
});
