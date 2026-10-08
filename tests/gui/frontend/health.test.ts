import { describe, expect, test } from 'bun:test';
import { attentionItems, groupIntegrations } from '@/gui/frontend/health';

const row = (
  label: string,
  version: string | null,
  status: 'active' | 'disabled' | 'not-installed' | 'not-inspected',
) => ({ target: label.toLowerCase(), label, version, status });

describe('the agents list', () => {
  test('puts installed agents first, then detected ones, then the ones not on this machine', () => {
    const groups = groupIntegrations([
      row('Amp', '1.0', 'not-installed'),
      row('Claude', '2.1', 'active'),
      row('Hermes', null, 'not-installed'),
      row('Cursor', '3.2', 'disabled'),
    ]);

    expect(groups.installed.map((item) => item.label)).toEqual(['Claude']);
    expect(groups.available.map((item) => item.label)).toEqual(['Amp', 'Cursor']);
    expect(groups.missing.map((item) => item.label)).toEqual(['Hermes']);
  });
});

const target = (label: string, status: 'active' | 'disabled' | 'not-installed') => ({
  target: label.toLowerCase(),
  label,
  version: '1.0',
  status,
});

describe('the overview attention list', () => {
  test('is empty when a hook is active and nothing went wrong', () => {
    expect(
      attentionItems({
        targets: [target('Claude Code', 'active')],
        update: null,
        errors: 0,
        suspects: 0,
        days: 7,
      }),
    ).toEqual([]);
  });

  test('leaves a missing hook to the status card above it', () => {
    expect(
      attentionItems({
        targets: [target('Codex', 'not-installed')],
        update: null,
        errors: 0,
        suspects: 0,
        days: 7,
      }),
    ).toEqual([]);
  });

  test('links each problem to the place that fixes it', () => {
    expect(
      attentionItems({
        targets: [target('Claude Code', 'disabled'), target('Codex', 'not-installed')],
        update: { latestVersion: '9.9.9', updateAvailable: true },
        errors: 2,
        suspects: 1,
        days: 7,
      }),
    ).toEqual([
      { text: 'Claude Code is detected but its hook is disabled.', href: '#integrations' },
      {
        text: '1 block in the last 7 days looks like a false positive.',
        href: '#activity?decision=suspect',
      },
      {
        text: '2 guard errors in the last 7 days: commands blocked because evaluation failed, not by policy.',
        href: '#activity?decision=error',
      },
      {
        text: 'Version 9.9.9 is available.',
        href: 'https://github.com/kenryu42/cc-safety-net/releases',
      },
    ]);
  });
});
