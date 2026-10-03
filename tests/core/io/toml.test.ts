import { describe, expect, test } from 'bun:test';
import {
  findTopLevelTomlArray,
  removeTomlArrayItem,
  removeTomlTableBlocks,
  removeTopLevelEmptyTomlArray,
} from '@/core/io/toml';

const COMMAND = 'npx -y cc-safety-net hook --kimi-code';
const INLINE_ITEM = `{ event = "PreToolUse", command = "${COMMAND}" }`;
const TABLE_BLOCK = `[[hooks]]\nevent = "PreToolUse"\ncommand = "${COMMAND}"`;
const ERRORS = {
  stringError: 'Unterminated string in Kimi Code config',
  bracketError: 'Unmatched hooks array in Kimi Code config',
};

const OTHER_ITEM = '{ event = "Stop", command = ".kimi/hooks/check.sh" }';

describe('the top-level array locator', () => {
  test('ignores a hooks array that belongs to a table', () => {
    expect(findTopLevelTomlArray('[t]\nhooks = [ ]\n', 'hooks', ERRORS)).toBeUndefined();
  });

  test('finds the array after other top-level keys', () => {
    expect(findTopLevelTomlArray('other = [1]\nhooks = [ ]\n', 'hooks', ERRORS)).toEqual({
      start: 20,
      end: 22,
    });
  });

  test('closes on the real bracket, not one written inside a comment', () => {
    const content = `hooks = [\n  ${OTHER_ITEM} # ] not a close\n]\n`;
    const array = findTopLevelTomlArray(content, 'hooks', ERRORS);
    expect(array?.start).toBe(content.indexOf('['));
    expect(array?.end).toBe(content.lastIndexOf(']'));
  });
});

describe('the empty-array and table-block removers', () => {
  test('drops only the top-level empty array, leaving a table one in place', () => {
    expect(removeTopLevelEmptyTomlArray('a = 1\nhooks = []\n[t]\nhooks = []\n', 'hooks')).toBe(
      'a = 1\n[t]\nhooks = []\n',
    );
  });

  test('keeps an empty array that still holds an item', () => {
    expect(removeTopLevelEmptyTomlArray(`hooks = [ ${OTHER_ITEM} ]\n`, 'hooks')).toBe(
      `hooks = [ ${OTHER_ITEM} ]\n`,
    );
  });

  test('drops only the block carrying the marker, keeping the others and trimming the tail', () => {
    expect(
      removeTomlTableBlocks(
        `[[hooks]]\ncommand = "keep"\n\n[[hooks]]\ncommand = "${COMMAND}"\n\n[after]\nx = 1\n`,
        'hooks',
        COMMAND,
      ),
    ).toBe('[[hooks]]\ncommand = "keep"\n\n\n[after]\nx = 1');
  });

  test('empties a file whose only block carried the marker', () => {
    expect(removeTomlTableBlocks(`${TABLE_BLOCK}\n`, 'hooks', COMMAND)).toBe('');
  });

  test('leaves the content alone when the item to remove is not in the array', () => {
    expect(removeTomlArrayItem('hooks = [ { a = 1 } ]', { start: 8, end: 20 }, INLINE_ITEM)).toBe(
      'hooks = [ { a = 1 } ]',
    );
  });
});
