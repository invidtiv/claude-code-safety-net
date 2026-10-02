import { createBudget } from '@/core/budget';
import type { Environment } from '@/core/environment';
import type { SecretProtectionConfig } from '@/core/policy/types';
import { createSemanticFacts } from '@/gate/guards/semantic-facts';
import { createToolInvocation } from '@/gate/invocation';
import { findSensitiveTargetInSemanticFacts } from '@/gate/secret/secret-protection';

export function pathTarget(
  targets: readonly string[],
  cwd: string,
  environment: Environment,
  config?: SecretProtectionConfig,
) {
  return findSensitiveTargetInSemanticFacts(
    createSemanticFacts(
      createToolInvocation(
        'Read',
        { paths: targets },
        { kind: 'path' },
        { executionCwd: cwd, configCwd: cwd },
        null,
      ),
    ),
    config,
    environment,
    createBudget(),
  );
}
