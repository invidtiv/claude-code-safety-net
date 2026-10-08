import { describe, expect, test } from 'bun:test';
import { initialActivityFilters, visibleEntries } from '@/gui/frontend/activity-filter';

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

  test('shows every decision when asked for all of them', () => {
    expect(commands({ ...initialActivityFilters(), decision: 'all' })).toHaveLength(4);
    expect(commands({ ...initialActivityFilters(), decision: 'error' })).toEqual(['echo $(']);
  });
});
