import { describe, expect, test } from 'bun:test';
import * as next from '@/core/redaction';

const PRIVATE_KEY =
  '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AYc5\n-----END RSA PRIVATE KEY-----';

describe('redaction', () => {
  test('a quoted escape inside command substitution does not expose the assignment tail', () => {
    expect(next.sanitizeDiagnosticText('TOKEN=$(printf "a\\" secret") echo done')).toBe(
      'TOKEN=<redacted> echo done',
    );
  });

  test('an unterminated command substitution is redacted through the end of input', () => {
    expect(next.sanitizeDiagnosticText('TOKEN=$(printf "secret tail"')).toBe('TOKEN=<redacted>');
  });

  test.each(['"', "'"])('diagnostics redact the entire unterminated %s assignment', (quote) => {
    expect(next.sanitizeDiagnosticText(`PASSWORD=${quote}first secret tail`)).toBe(
      'PASSWORD=<redacted>',
    );
  });

  test('assignment values are read and redacted whole, in every quoting form', () => {
    const rows: readonly {
      readonly text: string;
      readonly values: readonly string[];
      readonly redacted: string;
    }[] = [
      {
        text: 'TOKEN="part\\" two" NEXT=\'three four\'',
        values: ['"part\\" two"', "'three four'"],
        redacted: 'TOKEN=<redacted> NEXT=<redacted>',
      },
      {
        text: 'TOKEN=$(printf \'%s\' "$(get-secret)") SAFE=value',
        values: ['$(printf \'%s\' "$(get-secret)")', 'value'],
        redacted: 'TOKEN=<redacted> SAFE=<redacted>',
      },
      { text: 'prefixTOKEN=value', values: ['value'], redacted: 'prefixTOKEN=<redacted>' },
      { text: 'prefix-TOKEN=value', values: [], redacted: 'prefix-TOKEN=value' },
      { text: 'git reset --hard', values: [], redacted: 'git reset --hard' },
      {
        text: 'TOKEN=ghp_abcdefghijklmnopqrstuvwxyz0123',
        values: ['ghp_abcdefghijklmnopqrstuvwxyz0123'],
        redacted: 'TOKEN=<redacted>',
      },
    ];
    for (const row of rows) {
      expect(next.getEnvAssignmentValues(row.text), row.text).toStrictEqual([...row.values]);
      expect(next.redactEnvAssignmentValues(row.text), row.text).toBe(row.redacted);
    }
    for (const row of [
      { text: 'TOKEN=abc', might: true },
      { text: 'prefix-TOKEN=value', might: true },
      { text: 'git reset --hard', might: false },
      { text: 'rm -rf /tmp/x', might: false },
      { text: '', might: false },
    ]) {
      expect(next.mightContainEnvAssignment(row.text), row.text).toBe(row.might);
    }
  });

  test('secrets in command text are replaced wherever they are spelled', () => {
    const rows: readonly { readonly text: string; readonly redacted: string }[] = [
      { text: 'git reset --hard', redacted: 'git reset --hard' },
      { text: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', redacted: '<redacted>' },
      { text: 'TOKEN=secret123 git reset --hard', redacted: 'TOKEN=<redacted> git reset --hard' },
      {
        text: 'X-Amz-Signature=bare-aws sig=bare-short https://example.com/object?X-Goog-Signature=url-google&signature=url-long&name=report.pdf',
        redacted:
          'X-Amz-Signature=<redacted> sig=<redacted> https://example.com/object?X-Goog-Signature=<redacted>&signature=<redacted>&name=report.pdf',
      },
      {
        text: "curl 'https://example.com/object?sig=url-secret'; sig=bare-secret;next",
        redacted: "curl 'https://example.com/object?sig=<redacted>'; sig=<redacted>;next",
      },
      {
        text: 'echo ok;sig=secret producer|signature=secret',
        redacted: 'echo ok;sig=<redacted> producer|signature=<redacted>',
      },
      {
        text: 'sig="double secret" signature=\'single secret\'',
        redacted: 'sig=<redacted> signature=<redacted>',
      },
      {
        text: 'https://user:password@example.com',
        redacted: 'https://<redacted>:<redacted>@example.com',
      },
      {
        text: 'git://token123@example.com/repo https://token456@example.com',
        redacted: 'git://<redacted>@example.com/repo https://<redacted>@example.com',
      },
      {
        text: 'curl -H "Authorization: Bearer abc123" https://example.com',
        redacted: 'curl -H "Authorization: <redacted>" https://example.com',
      },
      {
        text: 'curl -H "Cookie: session=secret123" -H "X-API-Key: key123" https://example.com',
        redacted: 'curl -H "Cookie: <redacted>" -H "X-API-Key: <redacted>" https://example.com',
      },
      { text: PRIVATE_KEY, redacted: '<redacted>' },
      { text: 'TOKEN=abc123 npm publish', redacted: 'TOKEN=<redacted> npm publish' },
      {
        text: 'export GITHUB_TOKEN="ghp_abcdefghijklmnopqrstuvwxyz0123" gh auth status',
        redacted: 'export GITHUB_TOKEN=<redacted> gh auth status',
      },
      {
        text: "AWS_SECRET_ACCESS_KEY='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' aws s3 ls",
        redacted: 'AWS_SECRET_ACCESS_KEY=<redacted> aws s3 ls',
      },
      {
        text: 'DATABASE_URL=postgres://user:pw@db.internal:5432/app prisma migrate',
        redacted: 'DATABASE_URL=<redacted> prisma migrate',
      },
      {
        text: 'DATABASE_DSN=host=db user=app password=hunter2 sslmode=require psql',
        redacted: 'DATABASE_DSN=<redacted> psql',
      },
      {
        text: 'CONNECTION_STRING="Server=db;User Id=app;Password=hunter2" dotnet run',
        redacted: 'CONNECTION_STRING=<redacted> dotnet run',
      },
      {
        text: 'REDIS_URI=redis://:pw@cache:6379/0 node worker.js',
        redacted: 'REDIS_URI=<redacted> node worker.js',
      },
      { text: "PASS='single quoted value' ./login", redacted: 'PASS=<redacted> ./login' },
      { text: 'prefixTOKEN=value', redacted: 'prefixTOKEN=<redacted>' },
      { text: 'prefix-TOKEN=value', redacted: 'prefix-TOKEN=<redacted>' },
      {
        text: 'lower_case_token=abc mixed_Case=def',
        redacted: 'lower_case_token=<redacted> mixed_Case=def',
      },
      {
        text: 'FOO=bar\nSECRET_KEY=baz\nBAR=qux',
        redacted: 'FOO=bar\nSECRET_KEY=<redacted>\nBAR=qux',
      },
      {
        text: 'echo TOKEN=not-at-start-but-preceded-by-space',
        redacted: 'echo TOKEN=<redacted>',
      },
      {
        text: '1TOKEN=digit-first _TOKEN=underscore-first',
        redacted: '1TOKEN=<redacted> _TOKEN=<redacted>',
      },
      {
        text: 'authorization: Basic dXNlcjpwYXNzd29yZA==',
        redacted: 'authorization: <redacted>',
      },
      {
        text: '{"authorization":"Bearer abc","cookie":"session=xyz; other=1"}',
        redacted: '{"authorization":"<redacted>","cookie":"<redacted>"}',
      },
      {
        text: "{'api-key': 'value with spaces', 'x-api-key': \"v2\"}",
        redacted: "{'api-key': '<redacted>', 'x-api-key': \"<redacted>\"}",
      },
      { text: 'Cookie: a=b; c=d', redacted: 'Cookie: <redacted>' },
      {
        text: 'token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
        redacted: 'token <redacted>',
      },
      {
        text: 'git clone https://user:s3cr3t@github.com/org/repo.git',
        redacted: 'git clone https://<redacted>:<redacted>@github.com/org/repo.git',
      },
      {
        text: 'curl ftp://anonymous:me@ftp.example.com/file',
        redacted: 'curl ftp://<redacted>:<redacted>@ftp.example.com/file',
      },
      {
        text: 'wget "https://bucket.s3.amazonaws.com/key?X-Amz-Signature=abcdef0123456789&X-Amz-Date=1"',
        redacted:
          'wget "https://bucket.s3.amazonaws.com/key?X-Amz-Signature=<redacted>&X-Amz-Date=1"',
      },
      {
        text: 'curl "https://storage.googleapis.com/o?x-goog-signature=abc123"',
        redacted: 'curl "https://storage.googleapis.com/o?x-goog-signature=<redacted>"',
      },
      {
        text: 'curl "https://cdn.example.com/f?sig=abc%2Fdef&sv=2024"',
        redacted: 'curl "https://cdn.example.com/f?sig=<redacted>&sv=2024"',
      },
      {
        text: 'curl -u admin:password https://example.com',
        redacted: 'curl -u <redacted>:<redacted> https://example.com',
      },
      {
        text: 'curl --user=admin:password https://example.com',
        redacted: 'curl --user=<redacted>:<redacted> https://example.com',
      },
      {
        text: 'curl --user admin:password https://example.com',
        redacted: 'curl --user <redacted>:<redacted> https://example.com',
      },
      {
        text: 'mongodb+srv://app:pw@cluster0.example.net/db',
        redacted: 'mongodb+srv://<redacted>:<redacted>@cluster0.example.net/db',
      },
      { text: `echo "${PRIVATE_KEY}" > key.pem`, redacted: 'echo "<redacted>" > key.pem' },
      {
        text: `cat <<EOF > id_rsa\n${PRIVATE_KEY}\nEOF`,
        redacted: 'cat <<EOF > id_rsa\n<redacted>\nEOF',
      },
      {
        text: '-----BEGIN OPENSSH PRIVATE KEY-----\nabc\n-----END OPENSSH PRIVATE KEY-----',
        redacted: '<redacted>',
      },
      {
        text: 'echo password=hunter2 | tee creds.txt',
        redacted: 'echo password=<redacted> | tee creds.txt',
      },
      {
        text: 'docker run -e POSTGRES_PASSWORD=pw -e DB_URL=postgres://a:b@c/d image',
        redacted: 'docker run -e POSTGRES_PASSWORD=<redacted> -e DB_URL=<redacted> image',
      },
    ];
    for (const row of rows) {
      expect(next.redactSecrets(row.text), row.text).toBe(row.redacted);
    }
    for (const token of [
      ['xoxb', '123456789012', '123456789012', 'abcdefghijklmnopqrstuvwx'].join('-'),
      'npm_abcdefghijklmnopqrstuvwxyz1234567890',
      ['sk', 'live', 'abcdefghijklmnopqrstuvwx'].join('_'),
      'pypi-AgEIcHlwaS5vcmcCJDAwMDAwMDAw',
      'AKIAIOSFODNN7EXAMPLE',
      'ASIAIOSFODNN7EXAMPLE',
      'gho_abcdefghijklmnopqrstuvwxyz0123',
      'github_pat_11ABCDEFG0123456789abcdef',
      'glpat-abcdefghijklmnopqrstuv',
      ['rk', 'test', 'abcdefghijklmnopqrstuv'].join('_'),
      'sk-proj-abcdefghijklmnopqrstuvwxyz',
      'sk_abcdefghijklmnopqrstuvwxyz',
      `gsk_${'a'.repeat(52)}`,
      `xai-${'b'.repeat(80)}`,
      `pplx-${'c'.repeat(20)}`,
      `bastn_${'d'.repeat(16)}`,
      `tgp_v1_${'e'.repeat(43)}`,
      `flp_${'f'.repeat(10)}`,
      `wfr_${'g'.repeat(20)}`,
      `fw_${'h'.repeat(20)}`,
      `fwp_${'i'.repeat(20)}`,
      `tp-${'j'.repeat(20)}`,
      `psk-${'k'.repeat(8)}-${'l'.repeat(8)}`,
      `${'0'.repeat(32)}.${'A'.repeat(16)}`,
    ]) {
      expect(next.redactSecrets(token), token).toBe('<redacted>');
    }
    for (const text of [
      '',
      'git status',
      'ls -la ~/projects',
      'echo hello world',
      'rm -rf ./build && npm run build',
      'the word token appears but no assignment',
      'https://example.com/path?query=1#frag',
      'echo 😀 é 日本語',
      'a=1',
      'x'.repeat(300),
      'ghp_short xoxb-short sk-short',
      'curl --user admin https://example.com',
      'CREDENTIALS= empty-then-space',
      'KEY=',
      'A=B=C D==E =F G= H',
      'X=1 Y="two words" Z=$(echo three) W=`four`',
      'api-key: "<redacted>" cookie: \'<redacted>\'',
    ]) {
      expect(next.redactSecrets(text), text).toBe(text);
    }
  });

  test('diagnostics redact every assignment value as well as non-assignment credentials', () => {
    for (const [text, expected] of [
      [
        'TOKEN=ghp_abcdefghijklmnopqrstuvwxyz0123 curl -H "Authorization: Bearer abc123" https://example.com',
        'TOKEN=<redacted> curl -H "Authorization: <redacted>" https://example.com',
      ],
      ['git reset --hard', 'git reset --hard'],
      ['https://user:password@example.com', 'https://<redacted>:<redacted>@example.com'],
      [PRIVATE_KEY, '<redacted>'],
      ['FOO=bar SECRET_KEY=baz BAR=qux', 'FOO=<redacted> SECRET_KEY=<redacted> BAR=<redacted>'],
      ['A=B=C D==E =F G= H', 'A=<redacted> D=<redacted> =F G=<redacted> H'],
      ['MY_API_KEY=$(cat ~/.secret) ./run', 'MY_API_KEY=<redacted> ./run'],
      [
        'X=1 Y="two words" Z=$(echo three) W=`four`',
        'X=<redacted> Y=<redacted> Z=<redacted> W=<redacted>',
      ],
    ] as const) {
      expect(next.sanitizeDiagnosticText(text), text).toBe(expected);
    }
    expect(next.redactEnvAssignmentValues('curl -H "Authorization: Bearer abc123"')).toBe(
      'curl -H "Authorization: Bearer abc123"',
    );
  });
});
