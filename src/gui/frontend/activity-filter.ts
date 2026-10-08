import { commandSignature } from '@/audit/display';
import type { FeedEntry } from './types';

export type Decision = 'all' | 'deny' | 'allow' | 'error' | 'suspect';
export const initialActivityFilters = () => ({
  days: 7,
  decision: 'deny' as Decision,
  agent: 'all',
  query: '',
  command: '',
});
type ActivityFilters = ReturnType<typeof initialActivityFilters>;

export const visibleEntries = <T extends FeedEntry>(
  entries: T[],
  filters: ActivityFilters,
  suspects: Set<T>,
) =>
  entries.filter((entry) => {
    const decisionMatches = {
      all: true,
      deny: entry.decision !== 'allow',
      allow: entry.decision === 'allow',
      error: Boolean(entry.failureStage),
      suspect: suspects.has(entry),
    }[filters.decision];
    if (!decisionMatches) return false;
    if (filters.agent !== 'all' && (entry.agent || 'unknown') !== filters.agent) return false;
    if (filters.command)
      return commandSignature(entry.segment || entry.command) === filters.command;
    return [entry.ruleId, entry.segment || entry.command]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(filters.query);
  });
