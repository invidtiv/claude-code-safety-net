import { describe, expect, test } from 'bun:test';
import {
  findJsonArrayProperty,
  findMatchingBracket,
  getLineIndent,
  removeArrayRangeItem,
  stripJsonComments,
} from '@/core/io/jsonc';
import { describeOutcome } from '../../helpers/fixture-tree';
import { corpusStrings, seededRandom } from '../differential-inputs';

const ERRORS = { stringError: 'unterminated string', bracketError: 'unmatched bracket' };

function isSubsequence(part: string, whole: string): boolean {
  return (
    Array.from(whole).reduce((matched, char) => {
      return matched < part.length && part[matched] === char ? matched + 1 : matched;
    }, 0) === part.length
  );
}

describe('stripJsonComments', () => {
  const rows: readonly (readonly [string, string, string])[] = [
    [
      'drops a line comment and keeps the newline that ended it',
      '{"a": 1} // end\n',
      '{"a": 1} \n',
    ],
    ['drops a whole-line comment, keeping the newline it ended on', '// only a comment\n', '\n'],
    ['drops a line comment that runs to the end of the document', '{"a": 1} // end', '{"a": 1} '],
    ['drops a block comment', '/* only a block */', ''],
    ['drops a block comment sitting between two values', '[1, 2, /* gap */ 3, ]', '[1, 2,  3 ]'],
    [
      'keeps a comment opener that lives inside a string',
      '{"url": "http://example.com/path", "glob": "/* not a comment */"}',
      '{"url": "http://example.com/path", "glob": "/* not a comment */"}',
    ],
    [
      'keeps a comment opener after an escaped quote inside a string',
      '{"escaped": "a \\" // still in string", "next": true}',
      '{"escaped": "a \\" // still in string", "next": true}',
    ],
    [
      'keeps a comment opener inside a string that also carries an emoji',
      '{"emoji": "😀 // not a comment", "k": 1}',
      '{"emoji": "😀 // not a comment", "k": 1}',
    ],
    [
      'keeps a TOML-style hash, which is not a JSONC comment',
      '{"hash": "#no comment"}',
      '{"hash": "#no comment"}',
    ],
    [
      'ends a string on the quote that follows an escaped backslash',
      '{"a": "ends in a backslash \\\\"} // c',
      '{"a": "ends in a backslash \\\\"} ',
    ],
    ['drops a trailing comma before a closing brace', '{"a": 1,}', '{"a": 1}'],
    [
      'drops a trailing comma separated from its closer by blank lines',
      '{"trailing": [1,\n\n  ]\n}',
      '{"trailing": [1\n\n  ]\n}',
    ],
    [
      'drops a trailing comma at every nesting depth',
      '{"nested": {"deep": [ { "x": 1, }, ], }, }',
      '{"nested": {"deep": [ { "x": 1 } ] } }',
    ],
    [
      'keeps a comma that still separates two values',
      '{ "a" : 1 , "b" : 2 , }',
      '{ "a" : 1 , "b" : 2  }',
    ],
    [
      'strips the comments of a document that mixes both kinds',
      '{\n  // leading comment\n  "a": 1, // trailing comment\n  "b": [1, 2, 3,],\n}\n',
      '{\n  \n  "a": 1, \n  "b": [1, 2, 3]\n}\n',
    ],
    [
      'strips a comment ended by CRLF and the trailing comma it hid',
      '{\r\n  "crlf": true, // comment\r\n}\r\n',
      '{\r\n  "crlf": true \n}\r\n',
    ],
    [
      'strips a comment standing between a key and its value',
      '{"a":\n// between key and value\n[ "v" ]}',
      '{"a":\n\n[ "v" ]}',
    ],
    [
      'leaves an unterminated string, and everything in it, alone',
      '{"unterminated": "string // no end',
      '{"unterminated": "string // no end',
    ],
    ['leaves a lone slash alone', '{"a": 1} / x', '{"a": 1} / x'],
    ['leaves a document without comments byte for byte', '{"a":1}', '{"a":1}'],
    ['leaves an empty document empty', '', ''],
  ];

  for (const [name, document, expected] of rows) {
    test(name, () => {
      expect(stripJsonComments(document)).toBe(expected);
    });
  }

  test('keeps the document before an unterminated block comment and drops the comment body', () => {
    const stripped = stripJsonComments('{"a": 1} /* unterminated block');
    expect(stripped.startsWith('{"a": 1} ')).toBe(true);
    expect(stripped).not.toContain('unterminated');
  });
});

describe('findMatchingBracket', () => {
  const rows: readonly (readonly [string, string, number, number])[] = [
    ['closes a flat array', '[1, 2]', 0, 5],
    ['closes an object', '{ }', 0, 2],
    ['closes the outer array of a nested pair', '[[1], [2]]', 0, 9],
    ['closes the array a key holds', '{"a": [1]}', 6, 8],
    ['ignores a closing bracket inside a string', '[ "]" , 1 ]', 0, 10],
    ['ignores a closing bracket inside an escaped string', '[ "\\"]" , 1 ]', 0, 12],
  ];

  for (const [name, document, open, expected] of rows) {
    test(name, () => {
      expect(findMatchingBracket(document, open, ERRORS)).toBe(expected);
    });
  }

  test('reports the caller bracket message when nothing closes the opener', () => {
    expect(() => findMatchingBracket('[1, 2', 0, ERRORS)).toThrow(ERRORS.bracketError);
  });

  test('reports the caller string message when a string never ends', () => {
    expect(() => findMatchingBracket('[ "open ]', 0, ERRORS)).toThrow(ERRORS.stringError);
  });

  test('counts a bracket inside a comment when no comment skipper is supplied', () => {
    expect(findMatchingBracket('[ // ]\n 1 ]', 0, ERRORS)).toBe(5);
  });

  test('skips a bracket inside a comment the caller teaches it to recognise', () => {
    const document = '[ "a", # ]\n "b" ]';
    const skipHash = (content: string, index: number) =>
      content[index] === '#' ? content.indexOf('\n', index) + 1 : index;
    expect(findMatchingBracket(document, 0, { ...ERRORS, skipComment: skipHash })).toBe(16);
    expect(document[16]).toBe(']');
  });
});

describe('getLineIndent', () => {
  const rows: readonly (readonly [string, string, number, string])[] = [
    ['returns the spaces the line starts with', '  "a": 1', 3, '  '],
    ['returns the tab the line starts with', '{\n\t"a": 1\n}', 5, '\t'],
    ['returns the indent of the line the index falls on', 'x\n   y', 6, '   '],
    ['returns nothing for an unindented line', 'no indent', 0, ''],
    ['returns nothing at the start of an empty line', '\n', 0, ''],
  ];

  for (const [name, content, index, expected] of rows) {
    test(name, () => {
      expect(getLineIndent(content, index)).toBe(expected);
    });
  }
});

describe('removeArrayRangeItem', () => {
  const rows: readonly (readonly [string, string, number, number, string])[] = [
    ['takes the comma that followed the item', '[ "a", "b" ]', 2, 5, '[  "b" ]'],
    ['takes the comma that preceded the last item', '[ "a", "b" ]', 7, 10, '[ "a" ]'],
    [
      'takes the newline after the comma, so no blank line is left',
      '[\n  "a",\n  "b"\n]',
      4,
      7,
      '[\n    "b"\n]',
    ],
    ['takes the line the last item sat alone on', '[\n  "a",\n  "b"\n]', 11, 14, '[\n  "a"\n]'],
    ['takes only the item when it is the only one', '[ "only" ]', 2, 8, '[  ]'],
    ['takes only the item when nothing separates it', '[\n  "a"\n]', 4, 7, '[\n  \n]'],
    ['takes the comma of a middle item on a single line', '["a","b","c"]', 5, 8, '["a","c"]'],
  ];

  for (const [name, content, start, end, expected] of rows) {
    test(name, () => {
      expect(removeArrayRangeItem(content, { start, end })).toBe(expected);
    });
  }
});

describe('findJsonArrayProperty', () => {
  test('locates the array a root key holds', () => {
    const document = '{"plugin": ["a"]}';
    const array = findJsonArrayProperty(document, 'plugin', ERRORS);
    expect(array).toEqual({ start: 11, end: 15 });
  });

  test('walks past a nested key of the same name to the root one', () => {
    const document = '{"x": {"plugin": ["nested"]}, "plugin": ["real"]}';
    const array = findJsonArrayProperty(document, 'plugin', ERRORS);
    expect(document.slice(array?.start, (array?.end ?? 0) + 1)).toBe('["real"]');
  });

  test('matches a key written with an escape, because the key is parsed', () => {
    const document = '{"plu\\u0067in": ["escaped key"]}';
    const array = findJsonArrayProperty(document, 'plugin', ERRORS);
    expect(document.slice(array?.start, (array?.end ?? 0) + 1)).toBe('["escaped key"]');
  });

  test('reaches the array across comments between key, colon and bracket', () => {
    const document = '{ /* c */ "plugin" /* c */ : /* c */ ["v"] }';
    const array = findJsonArrayProperty(document, 'plugin', ERRORS);
    expect(document.slice(array?.start, (array?.end ?? 0) + 1)).toBe('["v"]');
  });

  test('returns undefined when the key holds something other than an array', () => {
    expect(findJsonArrayProperty('{"plugin": {"not": "array"}}', 'plugin', ERRORS)).toBeUndefined();
  });

  test('returns undefined when the key is absent', () => {
    expect(findJsonArrayProperty('{"other": ["x"]}', 'plugin', ERRORS)).toBeUndefined();
  });

  test('reports the caller string message for an unterminated string', () => {
    expect(() => findJsonArrayProperty('{"plugin": ["open', 'plugin', ERRORS)).toThrow(
      ERRORS.stringError,
    );
  });

  test('reports the caller bracket message for an unterminated array', () => {
    expect(() => findJsonArrayProperty('{"plugin": ["open"', 'plugin', ERRORS)).toThrow(
      ERRORS.bracketError,
    );
  });
});

const BRACKET_FRAGMENTS: readonly string[] = [
  '{',
  '}',
  '[',
  ']',
  '"',
  '\\',
  '\\"',
  '//',
  '/*',
  '*/',
  '#',
  ',',
  ':',
  '\n',
  ' ',
  '  ',
  'a',
  '1',
  'true',
  '"k"',
  '"v v"',
  '"]"',
  '"}"',
  '/',
  '*',
];

function fuzzDocuments(count: number, seed: number): readonly string[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () =>
    Array.from(
      { length: 1 + Math.floor(random() * 24) },
      () => BRACKET_FRAGMENTS[Math.floor(random() * BRACKET_FRAGMENTS.length)] ?? '',
    ).join(''),
  );
}

function fuzzValue(random: () => number, depth: number): unknown {
  const choice = Math.floor(random() * (depth > 2 ? 5 : 7));
  if (choice === 0) return null;
  if (choice === 1) return random() < 0.5;
  if (choice === 2) return Math.floor(random() * 2000) - 1000;
  if (choice === 3)
    return ['plain', 'has // slashes', 'has /* block */', 'has "quote"', '😀 ]'][
      Math.floor(random() * 5)
    ];
  if (choice === 4) return {};
  if (choice === 5) {
    return Array.from({ length: 1 + Math.floor(random() * 3) }, () => fuzzValue(random, depth + 1));
  }
  return Object.fromEntries(
    Array.from({ length: 1 + Math.floor(random() * 3) }, (_, index) => [
      `key ${index}`,
      fuzzValue(random, depth + 1),
    ]),
  );
}

function fuzzJsonc(count: number, seed: number): readonly { document: string; value: unknown }[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => {
    const value = fuzzValue(random, 0);
    const lines = JSON.stringify(value, null, 2).split('\n');
    const decorated = lines.flatMap((line, index) => {
      const next = lines[index + 1]?.trim() ?? '';
      const closes = next.startsWith('}') || next.startsWith(']');
      const comma = closes && !/[,[{]$/.test(line) && next !== '' ? ',' : '';
      const comment = random() < 0.4 ? ' // trailing } ] , " comment' : '';
      const block = random() < 0.2 ? ['/* leading } ] , " block */'] : [];
      return [...block, `${line}${comma}${comment}`];
    });
    return { document: decorated.join('\n'), value };
  });
}

describe('invariants over generated documents', () => {
  const hostile = [...corpusStrings(), ...fuzzDocuments(1_500, 0x5afe_0001)];

  test('stripping a decorated document yields the JSON it was built from', () => {
    const wrong = fuzzJsonc(400, 0x5afe_0004).filter(
      (row) =>
        JSON.stringify(
          describeOutcome(() => JSON.parse(stripJsonComments(row.document)) as unknown),
        ) !== JSON.stringify({ ok: true, value: row.value }),
    );
    expect(wrong.map((row) => row.document)).toEqual([]);
  });

  test('stripping a well-formed document twice changes nothing the second time', () => {
    const unstable = fuzzJsonc(400, 0x5afe_0005)
      .map((row) => stripJsonComments(row.document))
      .filter((stripped) => stripJsonComments(stripped) !== stripped);
    expect(unstable).toEqual([]);
  });

  test('stripping only ever deletes bytes, whatever the document', () => {
    const invented = hostile.filter(
      (document) => !isSubsequence(stripJsonComments(document), document),
    );
    expect(invented).toEqual([]);
  });

  test('bracket matching either lands on the closer or raises a caller message', () => {
    const wrong = hostile.flatMap((document) => {
      const open = document.search(/[[{]/);
      if (open === -1) return [];
      const outcome = describeOutcome(() => findMatchingBracket(document, open, ERRORS));
      if (!outcome.ok) {
        return [ERRORS.stringError, ERRORS.bracketError].includes(outcome.error.message)
          ? []
          : [`${document} -> ${outcome.error.message}`];
      }
      const closer = document[open] === '[' ? ']' : '}';
      return outcome.value > open && document[outcome.value] === closer
        ? []
        : [`${document} -> ${outcome.value}`];
    });
    expect(wrong).toEqual([]);
  });

  test('the indent reported is the whitespace that line really starts with', () => {
    const random = seededRandom(0x5afe_0002);
    const wrong = hostile.filter((document) => {
      const index = Math.floor(random() * (document.length + 1));
      const indent = getLineIndent(document, index);
      const lineStart = document.lastIndexOf('\n', index) + 1;
      return (
        !/^[ \t]*$/.test(indent) ||
        !document.startsWith(indent, lineStart) ||
        [' ', '\t'].includes(document[lineStart + indent.length] ?? '')
      );
    });
    expect(wrong).toEqual([]);
  });

  test('item removal deletes one run of bytes that covers the item, and never adds any', () => {
    const random = seededRandom(0x5afe_0003);
    const wrong = hostile.filter((document) => {
      const start = Math.floor(random() * (document.length + 1));
      const end = start + Math.floor(random() * (document.length - start + 1));
      const removed = removeArrayRangeItem(document, { start, end });
      const prefix = Array.from(removed).findIndex((char, index) => char !== document[index]);
      const kept = prefix === -1 ? removed.length : prefix;
      return (
        removed.length > document.length - (end - start) ||
        !document.slice(end).endsWith(removed.slice(start)) ||
        removed !==
          document.slice(0, kept) + document.slice(document.length - (removed.length - kept))
      );
    });
    expect(wrong).toEqual([]);
  });
});
