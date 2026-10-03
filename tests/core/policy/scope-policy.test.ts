import { afterEach, describe, expect, test } from 'bun:test';
import { join } from 'node:path';
import { bindPolicyFilesystemScope } from '@/core/io/safe-read';
import { getRulesConfigRuntimeErrorsForConfig } from '@/core/policy/scope-policy';
import { type TreeSpec, writeTree } from '../../helpers/fixture-tree';
import { rulesConfig, v1Rulebook } from '../../helpers/rulebook-seeds';
import {
  createTempRoot,
  normalize,
  removeTempRoots,
  WINDOWS_SEPARATOR_FOLDS,
} from '../../helpers/temp-home';

const TREE: TreeSpec = {
  'unknown-override/.cc-safety-net/rules/rule.json': rulesConfig(['project-rules'], {
    overrides: { 'project-rules/gone': 'off' },
  }),
  'unknown-override/.cc-safety-net/rules/project-rules/rulebook.json': v1Rulebook('project-rules'),
  'missing-rulebook/.cc-safety-net/rules/rule.json': rulesConfig(['absent-book']),
};

const UNKNOWN_OVERRIDE_WARNING =
  'unknown override key "project-rules/gone" in <root>/unknown-override/.cc-safety-net/rules/rule.json; only that override is ignored and other overrides and rules keep their configured state; correct or remove it in that file';

const MISSING_RULEBOOK_ERROR =
  'missing rulebook file <root>/missing-rulebook/.cc-safety-net/rules/absent-book/rulebook.json for absent-book; create that file or remove that source from the rules config';

const SCOPES: readonly {
  readonly scope: string;
  readonly behavior: string;
  readonly reports: readonly string[];
}[] = [
  {
    scope: 'unknown-override',
    behavior: 'an override naming no loaded rule reports how to repair the ignored override',
    reports: [UNKNOWN_OVERRIDE_WARNING],
  },
  {
    scope: 'missing-rulebook',
    behavior: 'a dropped source reports the missing rulebook and how to repair it',
    reports: [MISSING_RULEBOOK_ERROR],
  },
];

afterEach(removeTempRoots);

function configPath(root: string, scope: string) {
  return join(root, scope, '.cc-safety-net', 'rules', 'rule.json');
}

function reportsFor(scope: string, bound: boolean) {
  const root = createTempRoot('scope-policy-');
  writeTree(root, TREE);
  const scopeBinding = bound ? bindPolicyFilesystemScope(root, 'project policy') : undefined;
  return normalize(getRulesConfigRuntimeErrorsForConfig(configPath(root, scope), scopeBinding), [
    [root, '<root>'],
    ...WINDOWS_SEPARATOR_FOLDS,
  ]);
}

describe('a scope reload reports what the gate would find', () => {
  test.each(SCOPES.map((row) => [row.behavior, row.scope, row.reports] as const))(
    '%s',
    (_behavior, scope, reports) => {
      expect(reportsFor(scope, false)).toEqual([...reports]);
    },
  );

  test.each(SCOPES.map((row) => [row.scope, row.reports] as const))(
    'an explicit filesystem binding changes nothing about the %s scope',
    (scope, reports) => {
      expect(reportsFor(scope, true)).toEqual([...reports]);
    },
  );
});
