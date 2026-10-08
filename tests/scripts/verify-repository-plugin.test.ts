import { describe, expect, test } from 'bun:test';
import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { verifyRepositoryPlugin } from '../../scripts/verify-repository-plugin';
import { withTempDir } from '../helpers';

const PLUGIN_FILES = [
  'package.json',
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  'hooks/hooks.json',
  'hooks/codex.json',
  'hooks/cursor.json',
];

describe('repository plugin verification', () => {
  test.each([
    ['drops failClosed', { failClosed: undefined }],
    ['adds a matcher', { matcher: 'Shell' }],
    ['changes the timeout', { timeout: 5 }],
  ])('rejects a Cursor hook that %s', async (_name, change) => {
    await withTempDir('cc-safety-net-verify-plugin-', (directory) => {
      PLUGIN_FILES.forEach((path) => cpSync(path, join(directory, path), { recursive: true }));
      const cursorHooksPath = join(directory, 'hooks', 'cursor.json');
      const cursorHooks = JSON.parse(readFileSync(cursorHooksPath, 'utf8'));
      cursorHooks.hooks.preToolUse[0] = { ...cursorHooks.hooks.preToolUse[0], ...change };
      writeFileSync(cursorHooksPath, JSON.stringify(cursorHooks));
      const repository = process.cwd();
      process.chdir(directory);
      try {
        expect(() => verifyRepositoryPlugin()).toThrow('Cursor plugin hook config drifted');
      } finally {
        process.chdir(repository);
      }
    });
  });
});
