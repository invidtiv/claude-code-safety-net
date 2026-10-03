import { describe, expect, test } from 'bun:test';
import type { RulesConfig } from '@/core/policy/rules-config';
import { getRemoveMatches, getSelectedUpdateSpecs } from '@/rules-manager/sources';

const CONFIGURED = [
  'local-a',
  'acme/repo#main/x',
  'acme/repo#v2/x',
  'acme/repo#main/y',
  'other/repo#main/z',
];

const CONFIG: RulesConfig = {
  version: 1,
  rules: CONFIGURED,
  overrides: {},
  transparent_wrappers: [],
};

const removeMatches = (match: string) => getRemoveMatches(CONFIGURED, match);

describe('a remove match selects what the shipped module selects', () => {
  test('a name carried by two specs is ambiguous', () => {
    expect(removeMatches('x')).toEqual({
      ok: false,
      result: {
        ok: false,
        errors: ['Ambiguous rulebook match x: acme/repo#main/x, acme/repo#v2/x'],
        entries: [],
      },
    });
  });

  test('an unconfigured match names no rulebook, whatever its syntax', () => {
    expect(removeMatches('nope')).toEqual({
      ok: false,
      result: { ok: false, errors: ['No configured rulebook matches nope'], entries: [] },
    });
    expect(removeMatches('acme/repo#main/absent')).toEqual({
      ok: false,
      result: {
        ok: false,
        errors: ['No configured rulebook matches acme/repo#main/absent'],
        entries: [],
      },
    });
  });
});

describe('an update selection matches what the shipped module selects', () => {
  const noMatch = (match: string) =>
    ({
      ok: false as const,
      result: {
        ok: false as const,
        errors: [`No configured rulebook matches ${match}`],
        entries: [],
      },
    }) as const;

  test.each([
    ['acme/repo#main/x', { ok: true, specs: ['acme/repo#main/x'] }],
    ['local-a', { ok: true, specs: ['local-a'] }],
    ['z', { ok: true, specs: ['other/repo#main/z'] }],
    [
      'x',
      {
        ok: false,
        result: {
          ok: false,
          errors: ['Ambiguous rulebook match x: acme/repo#main/x, acme/repo#v2/x'],
          entries: [],
        },
      },
    ],
    ['other/repo', noMatch('other/repo')],
    ['acme/repo', noMatch('acme/repo')],
    ['acme/repo#main', noMatch('acme/repo#main')],
    ['nope', noMatch('nope')],
    ['acme/repo#main/absent', noMatch('acme/repo#main/absent')],
  ] as const)('resolves %s', (match, expected) => {
    expect(getSelectedUpdateSpecs(CONFIG, match)).toEqual(expected as never);
  });
});
