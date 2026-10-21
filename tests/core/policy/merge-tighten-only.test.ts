import { describe, expect, test } from 'bun:test';
import { resolveEffectiveDestructiveCommandRules } from '@/core/policy/effective-rules';
import { ENV_FLAGS, getCCSafetyNetEnvModes, sessionSafetyLevel } from '@/core/policy/env';
import { mergeProjectPolicy, type ProjectPolicyProjection } from '@/core/policy/merge';
import { SAFETY_OVERRIDE_KEYS, type SafetyLevelCapability } from '@/core/policy/safety-level';
import {
  createDefaultGuiPolicy,
  normalizeSafety,
  resolveSecretDisabledRules,
} from '@/core/policy/store';
import type { GuiPolicy } from '@/core/policy/types';
import { DESTRUCTIVE_COMMAND_RULE_METADATA } from '@/core/rules/destructive';
import { SECRET_DEFAULT_OFF_RULE_ID_SET, SECRET_PROTECTION_RULE_ID_SET } from '@/core/rules/secret';

const LEVELS = ['standard', 'strict', 'paranoid'] as const;
const OPTIONAL_LEVELS = [undefined, ...LEVELS];
const BOOLEANS = [true, false];
const OPTIONAL_BOOLEANS = [undefined, true, false];
const RULE_OVERRIDES = [undefined, 'on', 'off'] as const;
const PATHS = ['~/a', '~/b'];
const PATH_LISTS = [[], ['~/a'], ['~/b'], ['~/a', '~/b']];
const OPTIONAL_PATH_LISTS = [undefined, ...PATH_LISTS];
const SESSION_LEVEL_ENVS = OPTIONAL_LEVELS.map(
  (level) => new Map(level ? [[ENV_FLAGS.level.name, level]] : []),
);
const NO_ENV = new Map<string, string>();

const DESTRUCTIVE_RULE_CLASSES = [
  ...new Map(
    DESTRUCTIVE_COMMAND_RULE_METADATA.map((rule) => [
      `${rule.catastrophic ?? false}/${rule.activationCapability}`,
      rule,
    ]),
  ).values(),
];
const SECRET_RULE_CLASSES = [
  [...SECRET_PROTECTION_RULE_ID_SET].find((id) => !SECRET_DEFAULT_OFF_RULE_ID_SET.has(id)) ?? '',
  [...SECRET_DEFAULT_OFF_RULE_ID_SET][0] ?? '',
];

function combinations<Axes extends Record<string, readonly unknown[]>>(
  axes: Axes,
): { [Axis in keyof Axes]: Axes[Axis][number] }[] {
  return Object.entries(axes).reduce<Record<string, unknown>[]>(
    (partials, [axis, values]) =>
      partials.flatMap((partial) => values.map((value) => ({ ...partial, [axis]: value }))),
    [{}],
  ) as { [Axis in keyof Axes]: Axes[Axis][number] }[];
}

function defined<T>(record: Record<string, T | undefined>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(record).filter((entry): entry is [string, T] => entry[1] !== undefined),
  );
}

const CAPABILITY_OVERRIDE_SETS = combinations({
  fail_closed: OPTIONAL_BOOLEANS,
  paranoid_rm: OPTIONAL_BOOLEANS,
  paranoid_interpreters: OPTIONAL_BOOLEANS,
}).map((overrides) => defined(overrides));

function userPolicy(change: (policy: GuiPolicy) => void): GuiPolicy {
  const policy = createDefaultGuiPolicy();
  change(policy);
  return policy;
}

const protectionsByPolicy = new Map<string, Set<string>>();

function protections(policy: GuiPolicy, env: ReadonlyMap<string, string>): Set<string> {
  const key = JSON.stringify([policy, [...env]]);
  const known = protectionsByPolicy.get(key);
  if (known) return known;
  const computed = computeProtections(policy, env);
  protectionsByPolicy.set(key, computed);
  return computed;
}

function computeProtections(policy: GuiPolicy, env: ReadonlyMap<string, string>): Set<string> {
  const modes = getCCSafetyNetEnvModes(
    { safety: normalizeSafety(policy.safety), worktreeMode: policy.workflow.worktree_mode },
    env,
  );
  const destructive = policy.destructive_command_protection;
  const rules = resolveEffectiveDestructiveCommandRules(
    {
      destructiveCommandProtectionEnabled: destructive.enabled,
      destructiveCommandRuleOverrides: destructive.overrides,
    },
    modes.capabilities,
  );
  const secret = policy.secret_protection;
  const disabledSecretRules = resolveSecretDisabledRules(secret.overrides);
  return new Set([
    ...SAFETY_OVERRIDE_KEYS.filter((key) => modes.capabilities[key].enabled),
    ...(modes.worktreeMode ? [] : ['no worktree relaxations']),
    ...Object.entries(rules).flatMap(([id, state]) => (state.enabled ? [`rule ${id}`] : [])),
    ...(destructive.enabled
      ? PATHS.filter((path) => !destructive.allow_paths.includes(path)).map(
          (path) => `recursive delete checked in ${path}`,
        )
      : []),
    ...(secret.enabled ? secret.deny_paths.map((path) => `secret deny ${path}`) : []),
    ...(secret.enabled
      ? SECRET_RULE_CLASSES.filter((id) => !disabledSecretRules.includes(id)).flatMap((id) =>
          PATHS.filter((path) => !secret.allow_paths.includes(path)).map(
            (path) => `secret rule ${id} in ${path}`,
          ),
        )
      : []),
  ]);
}

function lostProtections(
  cases: { user: GuiPolicy; project: ProjectPolicyProjection; env: Map<string, string> }[],
) {
  return cases
    .flatMap((pair) => {
      const merged = mergeProjectPolicy(
        pair.user,
        pair.project,
        true,
        sessionSafetyLevel(pair.user.safety.level, pair.env),
      ).policy;
      const kept = protections(merged, pair.env);
      const lost = [...protections(pair.user, pair.env)].filter(
        (protection) => !kept.has(protection),
      );
      return lost.length > 0
        ? [{ user: pair.user, project: pair.project, env: Object.fromEntries(pair.env), lost }]
        : [];
    })
    .slice(0, 3);
}

describe('with CC_SAFETY_NET_PROJECT_TIGHTEN_ONLY set, no project policy removes a protection the user policy gives', () => {
  test('safety level and capabilities, under every session level', () => {
    const cases = combinations({
      env: SESSION_LEVEL_ENVS,
      userLevel: LEVELS,
      userOverrides: CAPABILITY_OVERRIDE_SETS,
      projectLevel: OPTIONAL_LEVELS,
      projectOverrides: CAPABILITY_OVERRIDE_SETS,
    }).map((axes) => ({
      env: axes.env,
      user: userPolicy((policy) => {
        policy.safety = { level: axes.userLevel, overrides: axes.userOverrides };
      }),
      project: {
        safety: defined({ level: axes.projectLevel, overrides: axes.projectOverrides }),
      } as ProjectPolicyProjection,
    }));
    expect(lostProtections(cases)).toEqual([]);
  });

  test.each(DESTRUCTIVE_RULE_CLASSES.map((rule) => [rule.id, rule]))(
    'destructive rule %s, with its capability and the protection switch',
    (_, rule) => {
      const capability: SafetyLevelCapability | undefined = rule.activationCapability;
      const capabilityAt = (value: boolean | undefined) =>
        capability ? defined({ [capability]: value }) : {};
      const cases = combinations({
        env: SESSION_LEVEL_ENVS,
        userLevel: LEVELS,
        userCapability: OPTIONAL_BOOLEANS,
        userEnabled: BOOLEANS,
        userRule: RULE_OVERRIDES,
        projectLevel: OPTIONAL_LEVELS,
        projectCapability: OPTIONAL_BOOLEANS,
        projectEnabled: OPTIONAL_BOOLEANS,
        projectRule: RULE_OVERRIDES,
      }).map((axes) => ({
        env: axes.env,
        user: userPolicy((policy) => {
          policy.safety = { level: axes.userLevel, overrides: capabilityAt(axes.userCapability) };
          policy.destructive_command_protection.enabled = axes.userEnabled;
          policy.destructive_command_protection.overrides = defined({ [rule.id]: axes.userRule });
        }),
        project: {
          safety: defined({
            level: axes.projectLevel,
            overrides: capabilityAt(axes.projectCapability),
          }),
          destructive_command_protection: defined({
            enabled: axes.projectEnabled,
            overrides: defined({ [rule.id]: axes.projectRule }),
          }),
        } as ProjectPolicyProjection,
      }));
      expect(lostProtections(cases)).toEqual([]);
    },
  );

  test('recursive delete allow paths, with the protection switch', () => {
    const cases = combinations({
      userEnabled: BOOLEANS,
      userAllow: PATH_LISTS,
      projectEnabled: OPTIONAL_BOOLEANS,
      projectAllow: OPTIONAL_PATH_LISTS,
    }).map((axes) => ({
      env: NO_ENV,
      user: userPolicy((policy) => {
        policy.destructive_command_protection.enabled = axes.userEnabled;
        policy.destructive_command_protection.allow_paths = axes.userAllow;
      }),
      project: {
        destructive_command_protection: defined({
          enabled: axes.projectEnabled,
          allow_paths: axes.projectAllow,
        }),
      } as ProjectPolicyProjection,
    }));
    expect(lostProtections(cases)).toEqual([]);
  });

  test('secret rules, deny paths, and allow paths, with the protection switch', () => {
    const [defaultOn = '', defaultOff = ''] = SECRET_RULE_CLASSES;
    const cases = combinations({
      userEnabled: BOOLEANS,
      userDefaultOn: RULE_OVERRIDES,
      userDefaultOff: RULE_OVERRIDES,
      userDeny: PATH_LISTS,
      userAllow: PATH_LISTS,
      projectEnabled: OPTIONAL_BOOLEANS,
      projectDefaultOn: RULE_OVERRIDES,
      projectDefaultOff: RULE_OVERRIDES,
      projectDeny: OPTIONAL_PATH_LISTS,
      projectAllow: OPTIONAL_PATH_LISTS,
    }).map((axes) => ({
      env: NO_ENV,
      user: userPolicy((policy) => {
        policy.secret_protection = {
          enabled: axes.userEnabled,
          overrides: defined({
            [defaultOn]: axes.userDefaultOn,
            [defaultOff]: axes.userDefaultOff,
          }),
          deny_paths: axes.userDeny,
          allow_paths: axes.userAllow,
        };
      }),
      project: {
        secret_protection: defined({
          enabled: axes.projectEnabled,
          overrides: defined({
            [defaultOn]: axes.projectDefaultOn,
            [defaultOff]: axes.projectDefaultOff,
          }),
          deny_paths: axes.projectDeny,
          allow_paths: axes.projectAllow,
        }),
      } as ProjectPolicyProjection,
    }));
    expect(lostProtections(cases)).toEqual([]);
  });

  test('worktree mode relaxations', () => {
    const cases = combinations({
      userWorktree: BOOLEANS,
      projectWorktree: OPTIONAL_BOOLEANS,
    }).map((axes) => ({
      env: NO_ENV,
      user: userPolicy((policy) => {
        policy.workflow.worktree_mode = axes.userWorktree;
      }),
      project: {
        workflow: defined({ worktree_mode: axes.projectWorktree }),
      } as ProjectPolicyProjection,
    }));
    expect(lostProtections(cases)).toEqual([]);
  });
});
