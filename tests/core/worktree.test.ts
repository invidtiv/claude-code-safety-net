import { describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  getGitExecutionContext,
  hasGitContextEnvOverride,
  isLinkedWorktree,
} from '@/core/worktree';
import {
  createLinkedWorktreeFixture,
  createSubmoduleLikeGitFileFixture,
  withEnv,
} from '../helpers.ts';

describe('worktree git execution context', () => {
  test('handles missing and invalid cwd', () => {
    expect(getGitExecutionContext(['git', 'status'], undefined)).toEqual({
      gitCwd: null,
      hasExplicitGitContext: false,
    });
    expect(getGitExecutionContext(['git', 'status'], '/path/that/does/not/exist')).toEqual({
      gitCwd: null,
      hasExplicitGitContext: false,
    });
  });

  test('resolves separate and attached git -C options in order', () => {
    const fixture = createLinkedWorktreeFixture();
    try {
      expect(
        getGitExecutionContext(
          ['git', '-C', fixture.mainWorktree, '-C', '../linked', 'status'],
          fixture.rootDir,
        ),
      ).toEqual({
        gitCwd: fixture.linkedWorktree,
        hasExplicitGitContext: false,
      });

      expect(
        getGitExecutionContext(
          ['git', `-C${fixture.mainWorktree}`, '-C../linked', 'status'],
          fixture.rootDir,
        ),
      ).toEqual({
        gitCwd: fixture.linkedWorktree,
        hasExplicitGitContext: false,
      });
    } finally {
      fixture.cleanup();
    }
  });

  test('fails closed for missing or unresolved git -C targets', () => {
    const fixture = createLinkedWorktreeFixture();
    try {
      expect(getGitExecutionContext(['git', '-C'], fixture.rootDir).gitCwd).toBeNull();
      expect(
        getGitExecutionContext(['git', `-C${join(fixture.rootDir, 'missing')}`], fixture.rootDir)
          .gitCwd,
      ).toBeNull();
    } finally {
      fixture.cleanup();
    }
  });

  test('detects explicit git context overrides in arguments', () => {
    const fixture = createLinkedWorktreeFixture();
    try {
      expect(
        getGitExecutionContext(['git', '--git-dir', '.git', 'status'], fixture.linkedWorktree)
          .hasExplicitGitContext,
      ).toBe(true);
      expect(
        getGitExecutionContext(['git', '--work-tree=.', 'status'], fixture.linkedWorktree)
          .hasExplicitGitContext,
      ).toBe(true);
    } finally {
      fixture.cleanup();
    }
  });

  test('skips other git global options before the subcommand', () => {
    const fixture = createLinkedWorktreeFixture();
    try {
      expect(
        getGitExecutionContext(
          ['git', '-c', 'foo=bar', '--namespace', 'ns', '-cfoo=baz', '--no-pager', 'status'],
          fixture.linkedWorktree,
        ),
      ).toEqual({
        gitCwd: fixture.linkedWorktree,
        hasExplicitGitContext: false,
      });
    } finally {
      fixture.cleanup();
    }
  });
});

describe('worktree env context overrides', () => {
  test('detects command scoped and process scoped git env overrides', () => {
    expect(hasGitContextEnvOverride(new Map([['GIT_DIR', '.git']]))).toBe(true);
    expect(hasGitContextEnvOverride(new Map([['OTHER', '1']]))).toBe(false);

    withEnv({ GIT_WORK_TREE: '.' }, () => {
      expect(hasGitContextEnvOverride()).toBe(true);
    });
  });
});

describe('linked worktree detection', () => {
  test('detects linked worktrees and symlinked directories inside them', () => {
    const fixture = createLinkedWorktreeFixture();
    const nested = join(fixture.linkedWorktree, 'nested');
    const symlinkedCwd = join(fixture.rootDir, 'nested-link');
    mkdirSync(nested);
    symlinkSync(nested, symlinkedCwd, 'dir');
    try {
      expect(isLinkedWorktree(fixture.linkedWorktree)).toBe(true);
      expect(isLinkedWorktree(symlinkedCwd)).toBe(true);
    } finally {
      fixture.cleanup();
    }
  });

  test('rejects main worktrees, non-repos, and submodule-like git files', () => {
    const fixture = createLinkedWorktreeFixture();
    const fakeSubmodule = createSubmoduleLikeGitFileFixture();
    const tempDir = mkdtempSync(join(tmpdir(), 'safety-net-worktree-unit-'));
    try {
      expect(isLinkedWorktree(fixture.mainWorktree)).toBe(false);
      expect(isLinkedWorktree(tempDir)).toBe(false);
      expect(isLinkedWorktree(fakeSubmodule.cwd)).toBe(false);
      expect(isLinkedWorktree(join(tempDir, 'missing'))).toBe(false);
    } finally {
      fixture.cleanup();
      fakeSubmodule.cleanup();
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('rejects malformed git files', () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'safety-net-worktree-malformed-'));
    const badGitdir = join(tempDir, 'bad-gitdir');
    const emptyGitdir = join(tempDir, 'empty-gitdir');
    mkdirSync(badGitdir);
    mkdirSync(emptyGitdir);
    writeFileSync(join(badGitdir, '.git'), 'not a gitdir file\n');
    writeFileSync(join(emptyGitdir, '.git'), 'gitdir:\n');
    try {
      expect(isLinkedWorktree(badGitdir)).toBe(false);
      expect(isLinkedWorktree(emptyGitdir)).toBe(false);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
