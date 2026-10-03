import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { registerBuiltinCommands as portedRegister } from '@/hosts/pi/builtin-commands/commands';

const DEFAULT_REQUEST = 'Help me with CC Safety Net.';

type RecordedPi = { commands: unknown[][]; messages: unknown[][] };

async function recordPiCommand(
  register: typeof portedRegister,
  args: string,
  isIdle: boolean,
): Promise<RecordedPi> {
  const recorded: RecordedPi = { commands: [], messages: [] };
  let handler: ((text: string, ctx: { isIdle: () => boolean }) => Promise<void>) | undefined;
  register({
    registerCommand: (name, command) => {
      recorded.commands.push([name, command.description]);
      handler = command.handler;
    },
    sendUserMessage: (...parts: unknown[]) => recorded.messages.push(parts),
  });
  await handler?.(args, { isIdle: () => isIdle });
  return recorded;
}

test.each([
  { isIdle: true, args: '', request: DEFAULT_REQUEST },
  { isIdle: false, args: 'explain rm', request: 'explain rm' },
])('the registered Pi command delivers the request with isIdle $isIdle', async (row) => {
  const ported = await recordPiCommand(portedRegister, row.args, row.isIdle);

  expect(ported.commands).toStrictEqual([
    ['cc-safety-net', 'Operate CC Safety Net: explain blocks, rules, integrations, diagnostics'],
  ]);
  expect(ported.messages).toHaveLength(1);
  expect(ported.messages[0]?.[0]).toStartWith('# CC Safety Net');
  expect(ported.messages[0]?.[0]).toEndWith(`## User request\n\n${row.request}`);
  expect(ported.messages[0]?.[1]).toStrictEqual(row.isIdle ? undefined : { deliverAs: 'followUp' });
});

test('the skill document the template is built from keeps its expected shape', () => {
  const skill = readFileSync(join(import.meta.dir, '../../skills/cc-safety-net/SKILL.md'), 'utf-8');

  expect(skill).toContain('disable-model-invocation: true');
  expect(skill).toContain('npx -y cc-safety-net rule doc');
  expect(skill).not.toContain('**STRICT**');
});
