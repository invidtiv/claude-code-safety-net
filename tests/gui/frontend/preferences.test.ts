import { describe, expect, test } from 'bun:test';
import { resolveLocale } from '@/gui/frontend/preferences';

describe('the GUI language', () => {
  test('is the saved choice whatever the browser prefers', () => {
    expect(resolveLocale('en', ['ja-JP', 'zh-CN'])).toBe('en');
    expect(resolveLocale('zh-CN', [])).toBe('zh-CN');
  });

  test('otherwise follows the first browser language it has a translation for', () => {
    expect(resolveLocale(undefined, ['zh-TW', 'en'])).toBe('zh-CN');
    expect(resolveLocale(undefined, ['zh-Hans-SG'])).toBe('zh-CN');
    expect(resolveLocale(undefined, ['fr', 'ja'])).toBe('ja');
    expect(resolveLocale(undefined, ['JA-jp'])).toBe('ja');
    expect(resolveLocale(undefined, ['en-GB', 'ja'])).toBe('en');
  });

  test('falls back to English when no browser language has a translation', () => {
    expect(resolveLocale(undefined, ['fr'])).toBe('en');
    expect(resolveLocale(undefined, ['jv', 'zu'])).toBe('en');
    expect(resolveLocale(undefined, [])).toBe('en');
  });
});
