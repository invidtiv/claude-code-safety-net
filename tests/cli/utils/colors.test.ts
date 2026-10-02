import { describe, expect, test } from 'bun:test';
import { colorizeToken, colors } from '@/cli/utils/colors';
import { withStdoutTTY } from '../../helpers/fake-tty';
import { withProcessEnv } from '../../helpers/temp-home';

const NAMES = ['red', 'green', 'dim', 'bold', 'yellow'] as const;

const renderSample = () => ({
  named: NAMES.map((name) => colors[name]('x')),
  tokens: Array.from({ length: 8 }, (_value, index) => colorizeToken('tok', index, 3)),
});

const PLAIN = {
  named: ['x', 'x', 'x', 'x', 'x'],
  tokens: ['"tok"', '"tok"', '"tok"', '"tok"', '"tok"', '"tok"', '"tok"', '"tok"'],
};

describe('cli/utils/colors', () => {
  test('a TTY colors named text and tokens with the seeded palette', () => {
    withStdoutTTY(true, () =>
      withProcessEnv({ NO_COLOR: undefined }, () => {
        expect(renderSample()).toEqual({
          named: [
            '\x1b[31mx\x1b[0m',
            '\x1b[32mx\x1b[0m',
            '\x1b[2mx\x1b[0m',
            '\x1b[1mx\x1b[0m',
            '\x1b[33mx\x1b[0m',
          ],
          tokens: [
            '\x1b[38;5;202m"tok"\x1b[0m',
            '\x1b[38;5;63m"tok"\x1b[0m',
            '\x1b[38;5;51m"tok"\x1b[0m',
            '\x1b[38;5;208m"tok"\x1b[0m',
            '\x1b[38;5;200m"tok"\x1b[0m',
            '\x1b[38;5;49m"tok"\x1b[0m',
            '\x1b[38;5;123m"tok"\x1b[0m',
            '\x1b[38;5;190m"tok"\x1b[0m',
          ],
        });
      }),
    );
  });

  for (const terminal of [
    { label: 'NO_COLOR wins over the TTY', isTTY: true, noColor: '1' },
    { label: 'a pipe stays plain', isTTY: false, noColor: undefined },
  ]) {
    test(terminal.label, () => {
      withStdoutTTY(terminal.isTTY, () =>
        withProcessEnv({ NO_COLOR: terminal.noColor }, () => {
          expect(renderSample()).toEqual(PLAIN);
        }),
      );
    });
  }
});
