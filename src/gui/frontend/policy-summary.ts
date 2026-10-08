import type { SafetyLevelCapability } from '@/core/policy/safety-level';
import { viewHash } from './format';
import type { Policy, RuleOverrides, SafetyLevel } from './project-draft';
import type { CapabilitySources, DestructiveRule, RuleState } from './types';

export const safetyLevels: Record<SafetyLevel, [string, string]> = {
  standard: [
    'Standard',
    'Blocks recognizable destructive commands and reading sensitive files. Recommended for normal coding.',
  ],
  strict: [
    'Strict',
    'Also blocks commands it cannot fully parse and listing sensitive paths. Occasional false positives on advanced shell.',
  ],
  paranoid: [
    'Paranoid',
    'Also blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos.',
  ],
};
export const capabilityNames: Record<SafetyLevelCapability, [string, string]> = {
  fail_closed: ['Fail closed', 'Block commands the parser cannot fully understand.'],
  paranoid_rm: ['Paranoid rm -rf checks', 'Block rm -rf inside the project, except temp paths.'],
  paranoid_interpreters: [
    'Paranoid interpreters',
    'Block interpreter one-liners such as python -c.',
  ],
};

export const levelName = (level: SafetyLevel) => safetyLevels[level][0];
export const tierForRule = (rule: Pick<DestructiveRule, 'activationCapability'>) =>
  !rule.activationCapability
    ? 'normal'
    : rule.activationCapability === 'fail_closed'
      ? 'strict'
      : 'paranoid';

export const commandRuleGroups = <T extends { category: string; catastrophic?: boolean }>(
  rules: T[],
) => {
  const alwaysOn = rules.filter((rule) => rule.catastrophic);
  const configurable = rules.filter((rule) => !rule.catastrophic);
  return [
    ...(alwaysOn.length > 0 ? [{ key: 'always-on', title: 'Always on', rules: alwaysOn }] : []),
    ...[...new Set(configurable.map((rule) => rule.category))].map((category) => ({
      key: category,
      title: category,
      rules: configurable.filter((rule) => rule.category === category),
    })),
  ];
};

export const policyFiltersFromParams = (params: URLSearchParams) => ({
  query: params.get('q') ?? '',
  changedOnly: params.get('show') === 'changed',
});

export const policyHash = (filters: ReturnType<typeof policyFiltersFromParams>) =>
  viewHash('policy', [
    ['q', filters.query, ''],
    ['show', filters.changedOnly ? 'changed' : 'all', 'all'],
  ]);

export const ruleNote = (
  rule: Pick<DestructiveRule, 'activationCapability'>,
  effective: RuleState,
  capabilities: CapabilitySources,
) => {
  const capability = rule.activationCapability;
  if (effective.source === 'rule_override') return 'Changed by you';
  if (effective.source === 'capability_override' && capability)
    return `${capabilityNames[capability][0]} forced ${effective.enabled ? 'on' : 'off'} in Advanced`;
  if (effective.source === 'environment') {
    const source = [...(capability ? (capabilities[capability]?.sources ?? []) : [])]
      .reverse()
      .find((item) => item.startsWith('env '));
    return source ? `Set by environment: ${source.slice(4)}` : 'Set by environment';
  }
  if (effective.enabled || effective.source === 'master_disabled') return null;
  return `Needs the ${tierForRule(rule) === 'strict' ? 'Strict' : 'Paranoid'} preset`;
};

export const policyChanges = (saved: Policy, draft: Policy, labels: Record<string, string>) => {
  const onOff = (value: boolean) => (value ? 'on' : 'off');
  const overrideChanges = (before: RuleOverrides, after: RuleOverrides) =>
    [...new Set([...Object.keys(before), ...Object.keys(after)])]
      .filter((id) => before[id] !== after[id])
      .map((id) => `${labels[id] ?? id}: ${after[id] ?? 'default'}`);
  const pathChanges = (name: string, before: string[], after: string[]) => {
    const added = after.filter((path) => !before.includes(path)).length;
    const removed = before.filter((path) => !after.includes(path)).length;
    if (added === 0 && removed === 0) return null;
    return `${name}: ${[added ? `${added} added` : '', removed ? `${removed} removed` : ''].filter(Boolean).join(', ')}`;
  };
  return [
    saved.safety.level === draft.safety.level
      ? null
      : `Preset: ${levelName(saved.safety.level)} → ${levelName(draft.safety.level)}`,
    ...(Object.keys(capabilityNames) as SafetyLevelCapability[])
      .filter((key) => saved.safety.overrides[key] !== draft.safety.overrides[key])
      .map((key) => {
        const value = draft.safety.overrides[key];
        return `${capabilityNames[key][0]}: ${value === undefined ? 'from preset' : value ? 'forced on' : 'forced off'}`;
      }),
    saved.workflow.worktree_mode === draft.workflow.worktree_mode
      ? null
      : `Discarding changes in linked worktrees: ${draft.workflow.worktree_mode ? 'allowed' : 'blocked'}`,
    saved.destructive_command_protection.enabled === draft.destructive_command_protection.enabled
      ? null
      : `Command protection: ${onOff(draft.destructive_command_protection.enabled)}`,
    saved.secret_protection.enabled === draft.secret_protection.enabled
      ? null
      : `Secret protection: ${onOff(draft.secret_protection.enabled)}`,
    ...overrideChanges(
      saved.destructive_command_protection.overrides,
      draft.destructive_command_protection.overrides,
    ),
    ...overrideChanges(saved.secret_protection.overrides, draft.secret_protection.overrides),
    pathChanges(
      'Allowed delete paths',
      saved.destructive_command_protection.allow_paths,
      draft.destructive_command_protection.allow_paths,
    ),
    pathChanges(
      'Always-blocked paths',
      saved.secret_protection.deny_paths,
      draft.secret_protection.deny_paths,
    ),
    pathChanges(
      'Secret pattern exemptions',
      saved.secret_protection.allow_paths,
      draft.secret_protection.allow_paths,
    ),
  ].filter((change) => change !== null);
};
