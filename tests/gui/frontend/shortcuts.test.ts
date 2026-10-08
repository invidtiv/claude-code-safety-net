import { describe, expect, test } from 'bun:test';
import { isSearchShortcut } from '@/gui/frontend/shortcuts';

const press = (
  key: string,
  modifiers: Partial<Record<'ctrlKey' | 'metaKey' | 'altKey', boolean>> = {},
) => ({
  key,
  ctrlKey: false,
  metaKey: false,
  altKey: false,
  ...modifiers,
});
const page = { tagName: 'BODY', isContentEditable: false };

describe('isSearchShortcut', () => {
  test('a plain slash outside a text field focuses search', () => {
    expect(isSearchShortcut(press('/'), page)).toBe(true);
    expect(isSearchShortcut(press('/'), { tagName: 'BUTTON', isContentEditable: false })).toBe(
      true,
    );
  });

  test('other keys and modified slashes are left alone', () => {
    expect(isSearchShortcut(press('?'), page)).toBe(false);
    expect(isSearchShortcut(press('/', { metaKey: true }), page)).toBe(false);
    expect(isSearchShortcut(press('/', { ctrlKey: true }), page)).toBe(false);
    expect(isSearchShortcut(press('/', { altKey: true }), page)).toBe(false);
  });

  test('typing a slash into a field types it', () => {
    for (const tagName of ['INPUT', 'TEXTAREA', 'SELECT']) {
      expect(isSearchShortcut(press('/'), { tagName, isContentEditable: false })).toBe(false);
    }
    expect(isSearchShortcut(press('/'), { tagName: 'DIV', isContentEditable: true })).toBe(false);
  });
});
