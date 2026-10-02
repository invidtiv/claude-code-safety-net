import { afterEach, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { listAuditLogFiles, readAuditLogEntries } from '@/audit/reader';
import { writeAuditFixture } from '../helpers/audit-fixture';

const NOW_MS = Date.parse('2026-05-17T12:34:56.789Z');
const TS = '2026-05-17T01:00:00.000Z';

const SCANNED_FILES = [
  'legacy-empty.jsonl',
  'legacy-expired.jsonl',
  'legacy-fresh-mtime.jsonl',
  'legacy-link.jsonl',
  'legacy-malformed.jsonl',
  'legacy-mixed.jsonl',
  'proj-a/2026-03/2026-03-02-sess.jsonl',
  'proj-b/2026-04/2026-04-16-link.jsonl',
  'proj-b/2026-04/2026-04-16-sess.jsonl',
  'proj-b/2026-04/2026-04-17-sess.jsonl',
  'proj-b/2026-04/2026-04-99-impossible.jsonl',
  'proj-b/2026-04/garbage.jsonl',
  'proj-b/2026-05/2026-03-02-wrong-month.jsonl',
  'proj-b/2026-05/2026-05-16-sess.jsonl',
  'proj-b/2026-06/2026-06-01-sess.jsonl',
  'proj-b/notamonth/2026-03-02-sess.jsonl',
  'proj-c/2026-03/nested/2026-03-02-deep.jsonl',
  'proj-d/2026-03/2026-03-02-dangling.jsonl',
];

const denied = (command: string) =>
  JSON.stringify({ ts: TS, command, segment: command, reason: 'blocked', sessionId: 'sess' });

const READ_CASES = [
  {
    name: 'valid records around blank lines',
    content: `${denied('first')}\n\n${denied('second')}\n\n`,
    commands: ['first', 'second'],
    skips: 0,
  },
  {
    name: 'lines that are not audit records',
    content: [denied('before'), '{ not json', 'null', '"a bare string"', denied('after')].join(
      '\n',
    ),
    commands: ['before', 'after'],
    skips: 3,
  },
  {
    name: 'records whose fields carry the wrong type',
    content: [
      JSON.stringify({ command: 'ts missing', segment: '', reason: 'blocked' }),
      JSON.stringify({ ts: TS, command: 42, segment: '', reason: 'blocked' }),
      JSON.stringify({ ts: TS, command: 'object session', sessionId: { id: 'sess' } }),
      JSON.stringify(['not', 'an', 'object']),
      denied('survivor'),
    ].join('\n'),
    commands: ['survivor'],
    skips: 4,
  },
  { name: 'an empty file', content: '', commands: [], skips: 0 },
  { name: 'a file that was never written', content: null, commands: [], skips: 1 },
];

const roots: string[] = [];

function makeRoot(): string {
  const root = mkdtempSync(
    join(process.env.CC_SAFETY_NET_TEST_TMPDIR ?? tmpdir(), 'cc-safety-net-next-audit-reader-'),
  );
  roots.push(root);
  return root;
}

function makeScanTree(): string {
  const logs = writeAuditFixture(makeRoot(), NOW_MS);
  mkdirSync(join(logs, 'proj-d', '2026-03'), { recursive: true });
  symlinkSync(
    join('..', '..', 'gone', '2026-03-02-sess.jsonl'),
    join(logs, 'proj-d', '2026-03', '2026-03-02-dangling.jsonl'),
  );
  return logs;
}

const listedUnder = (logs: string, list: typeof listAuditLogFiles, skips?: { count: number }) =>
  list(logs, skips)
    .map((file) => relative(logs, file).split('\\').join('/'))
    .sort();

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('audit reader listing parity', () => {
  test('walks one fixture tree to the same file list', () => {
    const nextSkips = { count: 0 };
    expect(listedUnder(makeScanTree(), listAuditLogFiles, nextSkips)).toStrictEqual(SCANNED_FILES);
    expect(nextSkips.count).toBe(0);
  });

  test('a file where a directory belongs counts as a skip, a missing directory does not', () => {
    const root = makeRoot();
    const notADirectory = join(root, 'logs.jsonl');
    writeFileSync(notADirectory, `${denied('ls')}\n`);
    const missing = join(root, 'never-created');

    for (const [logs, expected] of [
      [notADirectory, 1],
      [missing, 0],
    ] as const) {
      const nextSkips = { count: 0 };
      expect(listAuditLogFiles(logs, nextSkips)).toStrictEqual([]);
      expect(nextSkips.count).toBe(expected);
    }
  });
});

describe('audit reader record parity', () => {
  for (const readCase of READ_CASES) {
    test(`reads ${readCase.name} the same way`, () => {
      const file = join(makeRoot(), 'session.jsonl');
      if (readCase.content !== null) writeFileSync(file, readCase.content);
      const nextSkips = { count: 0 };

      expect(readAuditLogEntries(file, nextSkips)).toEqual(
        readCase.commands.map((command) => JSON.parse(denied(command))),
      );
      expect(nextSkips.count).toBe(readCase.skips);
    });
  }
});
