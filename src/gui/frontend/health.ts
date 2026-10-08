import { dayCount, plural, repoUrl } from './format';
import type { IntegrationRow, UpdateStatus } from './types';

export const groupIntegrations = <T extends Pick<IntegrationRow, 'status' | 'version'>>(
  rows: T[],
) => ({
  installed: rows.filter((row) => row.status === 'active'),
  available: rows.filter((row) => row.status !== 'active' && row.version !== null),
  missing: rows.filter((row) => row.status !== 'active' && row.version === null),
});

export const attentionItems = (facts: {
  targets: Pick<IntegrationRow, 'label' | 'status'>[] | null;
  update: UpdateStatus | null;
  errors: number;
  suspects: number;
  days: number;
}) =>
  [
    facts.targets && !facts.targets.some((row) => row.status === 'active')
      ? {
          text: 'No coding agent has an active hook, so no command is being checked.',
          href: '#integrations',
        }
      : null,
    ...(facts.targets ?? [])
      .filter((row) => row.status === 'disabled')
      .map((row) => ({
        text: `${row.label} is detected but its hook is disabled.`,
        href: '#integrations',
      })),
    facts.suspects > 0
      ? {
          text: `${plural(facts.suspects, 'block')} in the last ${dayCount(facts.days)} ${facts.suspects === 1 ? 'looks' : 'look'} like a false positive.`,
          href: '#activity?decision=suspect',
        }
      : null,
    facts.errors > 0
      ? {
          text: `${plural(facts.errors, 'guard error')} in the last ${dayCount(facts.days)}: commands blocked because evaluation failed, not by policy.`,
          href: '#activity?decision=error',
        }
      : null,
    facts.update?.updateAvailable
      ? { text: `Version ${facts.update.latestVersion} is available.`, href: `${repoUrl}/releases` }
      : null,
  ].filter((item) => item !== null);
