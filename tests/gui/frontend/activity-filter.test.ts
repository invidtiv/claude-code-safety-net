import { describe, expect, test } from 'bun:test';
import {
  activityFiltersFromParams,
  activityHash,
  initialActivityFilters,
  visibleEntries,
} from '@/gui/frontend/activity-filter';

const ts = '2026-10-06T09:00:00.000Z';
const entries = [
  { ts, decision: 'allow', agent: 'claude-code', command: 'ls -la' },
  { ts, decision: 'deny', agent: 'codex', ruleId: 'git.reset-hard', command: 'git reset --hard' },
  {
    ts,
    decision: 'deny',
    agent: 'claude-code',
    ruleId: 'rm.recursive-force',
    command: 'rm -rf ~/x',
  },
  { ts, decision: 'deny', agent: 'codex', failureStage: 'parse', command: 'echo $(' },
];
const commands = (filters: ReturnType<typeof initialActivityFilters>) =>
  visibleEntries(entries, filters, new Set()).map((entry) => entry.command);

describe('the activity list', () => {
  test('opens on blocked commands, leaving allowed ones out', () => {
    expect(commands(initialActivityFilters())).toEqual([
      'git reset --hard',
      'rm -rf ~/x',
      'echo $(',
    ]);
  });

  test('narrows blocked commands by agent and by a rule or command search', () => {
    expect(commands({ ...initialActivityFilters(), agent: 'codex' })).toEqual([
      'git reset --hard',
      'echo $(',
    ]);
    expect(commands({ ...initialActivityFilters(), query: 'rm.recursive' })).toEqual([
      'rm -rf ~/x',
    ]);
  });

  test('matches a search as typed, ignoring case and outer spaces', () => {
    expect(commands({ ...initialActivityFilters(), query: ' RM.Recursive ' })).toEqual([
      'rm -rf ~/x',
    ]);
  });

  test('shows every decision when asked for all of them', () => {
    expect(commands({ ...initialActivityFilters(), decision: 'all' })).toHaveLength(4);
    expect(commands({ ...initialActivityFilters(), decision: 'error' })).toEqual(['echo $(']);
  });
});

describe('the activity address', () => {
  test('is the bare view for the default filters', () => {
    expect(activityHash(initialActivityFilters())).toBe('activity');
  });

  test('records every filter that differs from the default and reads it back', () => {
    const filters = {
      days: 30,
      decision: 'all' as const,
      agent: 'codex',
      query: 'Git.Reset',
      command: 'git reset',
    };
    const hash = activityHash(filters);
    expect(hash).toBe('activity?days=30&decision=all&agent=codex&q=Git.Reset&command=git+reset');
    expect(activityFiltersFromParams(new URLSearchParams(hash.split('?')[1]))).toEqual(filters);
  });

  test('falls back to the defaults for missing or unknown values', () => {
    expect(activityFiltersFromParams(new URLSearchParams(''))).toEqual(initialActivityFilters());
    expect(activityFiltersFromParams(new URLSearchParams('decision=nope&days=abc'))).toEqual(
      initialActivityFilters(),
    );
  });
});
