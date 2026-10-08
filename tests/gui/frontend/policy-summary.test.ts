import { describe, expect, test } from 'bun:test';
import { clonePolicy, type Policy } from '@/gui/frontend/project-draft';
import { commandRuleGroups, policyChanges, ruleNote } from '@/gui/frontend/policy-summary';

describe('commandRuleGroups', () => {
  const command = (id: string, category: string, catastrophic?: boolean) => ({
    id,
    category,
    catastrophic,
  });

  test('always-on rules form their own first group and leave their categories', () => {
    const groups = commandRuleGroups([
      command('git.reset-hard', 'Git'),
      command('rm.root', 'Filesystem', true),
      command('rm.cwd', 'Filesystem'),
      command('rm.git-metadata', 'Filesystem', true),
    ]);
    expect(
      groups.map((group) => [group.key, group.title, group.rules.map((rule) => rule.id)]),
    ).toEqual([
      ['always-on', 'Always on', ['rm.root', 'rm.git-metadata']],
      ['Git', 'Git', ['git.reset-hard']],
      ['Filesystem', 'Filesystem', ['rm.cwd']],
    ]);
  });

  test('a category with only always-on rules gets no group of its own', () => {
    expect(
      commandRuleGroups([command('rm.root', 'Filesystem', true)]).map((group) => group.key),
    ).toEqual(['always-on']);
    expect(commandRuleGroups([command('git.reset-hard', 'Git')]).map((group) => group.key)).toEqual(
      ['Git'],
    );
  });
});

const rule = (activationCapability?: 'fail_closed' | 'paranoid_rm' | 'paranoid_interpreters') => ({
  id: 'fs.rule',
  label: 'Some rule',
  description: '',
  category: 'Filesystem',
  example: '',
  activationCapability,
});
const effective = (enabled: boolean, source: string) => ({
  enabled,
  inheritedEnabled: enabled,
  source,
  changesInherited: false,
});

describe('a built-in rule note', () => {
  test('says nothing when the rule is on by default', () => {
    expect(ruleNote(rule(), effective(true, 'built_in_default'), {})).toBeNull();
    expect(ruleNote(rule('fail_closed'), effective(true, 'preset'), {})).toBeNull();
  });

  test('names the preset a stricter rule needs', () => {
    expect(ruleNote(rule('fail_closed'), effective(false, 'preset'), {})).toBe(
      'Needs the Strict preset',
    );
    expect(ruleNote(rule('paranoid_rm'), effective(false, 'preset'), {})).toBe(
      'Needs the Paranoid preset',
    );
  });

  test('names what changed the rule', () => {
    expect(ruleNote(rule(), effective(false, 'rule_override'), {})).toBe('Changed by you');
    expect(ruleNote(rule('fail_closed'), effective(true, 'capability_override'), {})).toBe(
      'Fail closed forced on in Advanced',
    );
    expect(
      ruleNote(rule('fail_closed'), effective(true, 'environment'), {
        fail_closed: { source: 'environment', sources: ['env CC_SAFETY_NET_STRICT=1'] },
      }),
    ).toBe('Set by environment: CC_SAFETY_NET_STRICT=1');
  });
});

const saved: Policy = {
  version: 1,
  safety: { level: 'standard', overrides: {} as Policy['safety']['overrides'] },
  workflow: { worktree_mode: false },
  destructive_command_protection: { enabled: true, overrides: {}, allow_paths: ['/tmp/a'] },
  secret_protection: { enabled: true, overrides: {}, deny_paths: [], allow_paths: [] },
  audit: { retention_days: 30 },
};

describe('the unsaved change summary', () => {
  test('is empty for an untouched policy', () => {
    expect(policyChanges(saved, clonePolicy(saved), {})).toEqual([]);
  });

  test('lists each changed setting in plain words', () => {
    const draft = clonePolicy(saved);
    draft.safety.level = 'strict';
    draft.safety.overrides.paranoid_rm = true;
    draft.secret_protection.enabled = false;
    draft.destructive_command_protection.overrides['git.push-force'] = 'off';
    draft.destructive_command_protection.allow_paths = ['/tmp/b', '/tmp/c'];

    expect(policyChanges(saved, draft, { 'git.push-force': 'Git push force' })).toEqual([
      'Preset: Standard → Strict',
      'Paranoid rm -rf checks: forced on',
      'Secret protection: off',
      'Git push force: off',
      'Allowed delete paths: 2 added, 1 removed',
    ]);
  });
});
