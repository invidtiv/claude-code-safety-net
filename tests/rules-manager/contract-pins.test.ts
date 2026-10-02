import { afterEach, describe, expect, spyOn, test } from 'bun:test';
import { join } from 'node:path';
import { runRuleSyncMigration } from '@/cli/rule/sync-migrate';
import { GITHUB_FETCH_LIMITS } from '@/rules-manager/resolver';
import {
  isRuleSyncResourceLimitError,
  RULE_SYNC_RESOURCE_LIMITS,
} from '@/rules-manager/resource-limits';
import {
  createTempRoot,
  environmentFor,
  isolationEnv,
  removeTempRoots,
} from '../helpers/temp-home';

afterEach(removeTempRoots);

describe('the manager limits that outlive the differentials', () => {
  test('one operation may spend 131 requests and 64 MiB over 4 connections', () => {
    expect({ ...RULE_SYNC_RESOURCE_LIMITS }).toEqual({
      concurrency: 4,
      maxRequests: 131,
      maxResponseBytes: 67_108_864,
    });
  });

  test('one GitHub response may take 15 s and its kind of body has its own cap', () => {
    expect({ ...GITHUB_FETCH_LIMITS }).toEqual({
      timeoutMs: 15_000,
      metadataBytes: 524_288,
      commitBytes: 262_144,
      treeBytes: 16_777_216,
      rawBytes: 4_194_304,
    });
  });

  test('only the budget message classifies as a resource-limit failure', () => {
    expect(
      isRuleSyncResourceLimitError(
        new Error("Rule synchronization exceeds CC Safety Net's safe resource limits."),
      ),
    ).toBeTrue();
    expect(isRuleSyncResourceLimitError(new Error('fetch failed'))).toBeFalse();
    expect(
      isRuleSyncResourceLimitError(
        new Error("rule synchronization exceeds CC Safety Net's safe resource limits."),
      ),
    ).toBeFalse();
    expect(
      isRuleSyncResourceLimitError(
        "Rule synchronization exceeds CC Safety Net's safe resource limits.",
      ),
    ).toBeFalse();
  });
});

describe('the wording a deprecated command opens with', () => {
  test('`rule sync` says what it no longer does before it says what it did', () => {
    const root = createTempRoot('rule-sync-notice-');
    const home = join(root, 'home');
    const opening: string[] = [];
    const spy = spyOn(console, 'log').mockImplementation((...parts: unknown[]) => {
      opening.push(parts.map(String).join(' '));
    });
    try {
      runRuleSyncMigration(environmentFor(home, isolationEnv(home)), {
        cwd: join(root, 'project'),
      });
    } finally {
      spy.mockRestore();
    }
    expect(opening[0]).toBe(
      '`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.',
    );
  });
});
