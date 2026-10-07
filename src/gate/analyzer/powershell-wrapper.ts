import { destructiveCommandMatch } from '@/core/rules/destructive';
import type { DestructiveCommandRuleMatch } from '@/core/rules/types';
import type { CommandWord } from '@/core/shell/model';
import { analysisWordText, isLiteralExecutionSourceWord } from './command-words';
import { dynamicShellSourceMatch } from './reasons';

const REASON_NESTED_RECURSIVE_DELETE_UNREAD =
  'Recursive delete handed to powershell or pwsh in a form CC Safety Net does not read is blocked: pass the script as a single -Command with literal paths, after only -NoProfile, -NonInteractive, -NoLogo, or -ExecutionPolicy.';

const READ_SWITCH = /^-(?:noprofile|nop|noninteractive|noni|nologo)$/i;
const READ_EXECUTION_POLICY = /^-(?:executionpolicy|ep)$/i;
const READ_COMMAND = /^-(?:command|c)$/i;
const PARAMETER_NAME = /^(?:--?|[/\u2013\u2014\u2015])(\w+)$/;
const ENCODED_COMMAND = 'encodedcommand';
const DELETE_VERB = /(?<![\w-])(?:remove-item|ri|rm|rmdir|rd|del|erase)(?![\w-])/i;
const RECURSIVE_FLAG = /(?<![\w-])(?:[-\u2013\u2014\u2015]{1,2}r\w*|\/s(?!\w))/i;

export function analyzePowerShellWrapperMatch(
  words: readonly CommandWord[],
  analyzeNested: (script: string) => DestructiveCommandRuleMatch | null,
): DestructiveCommandRuleMatch | null {
  const texts = words.map(analysisWordText);
  const commandIndex = texts.every(
    (text, index) => index === 0 || isLiteralExecutionSourceWord(words[index], text),
  )
    ? readCommandIndex(texts, 1)
    : undefined;
  const script = commandIndex === undefined ? [] : texts.slice(commandIndex + 1);
  if (script.length > 0) {
    return analyzeNested(script.join(' '));
  }
  if (texts.some(isEncodedCommandParameter)) return dynamicShellSourceMatch();
  const text = texts.join(' ');
  return DELETE_VERB.test(text) && RECURSIVE_FLAG.test(text)
    ? destructiveCommandMatch(
        'powershell.nested-recursive-delete-unread',
        REASON_NESTED_RECURSIVE_DELETE_UNREAD,
      )
    : null;
}

function readCommandIndex(texts: readonly string[], index: number): number | undefined {
  const text = texts[index] ?? '';
  if (READ_COMMAND.test(text)) return index;
  if (READ_SWITCH.test(text)) return readCommandIndex(texts, index + 1);
  return READ_EXECUTION_POLICY.test(text) ? readCommandIndex(texts, index + 2) : undefined;
}

function isEncodedCommandParameter(text: string): boolean {
  const name = PARAMETER_NAME.exec(text)?.[1]?.toLowerCase();
  return name !== undefined && (name === 'ec' || ENCODED_COMMAND.startsWith(name));
}
