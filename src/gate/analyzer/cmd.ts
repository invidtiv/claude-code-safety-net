import { filterDestructiveCommandMatch } from '@/core/policy/effective-rules';
import type { DestructiveCommandRuleMatch } from '@/core/rules/types';
import type { CommandWord } from '@/core/shell/model';
import { REASON_GIT_METADATA_PROTECTION } from '@/gate/guards/git-metadata-protection';
import { analysisWordText } from './command-words';
import { powerShellTargetForPolicy } from './powershell/remove-item';
import { dynamicShellSourceMatch } from './reasons';
import {
  classifyRecursiveDeleteTarget,
  createRecursiveDeleteTargetContext,
  matchRecursiveDeleteClassification,
  type RecursiveDeleteRuleTable,
  type RecursiveDeleteTargetContext,
} from './recursive-delete-targets';
import type { AnalyzeRmOptions } from './rm';

const REASON_CMD_DELETE_OUTSIDE_CWD =
  'cmd rmdir /s or del /s outside cwd is blocked. Retry deleting only explicit paths inside the current directory; escalate for anything outside it.';
const REASON_CMD_DELETE_POLICY =
  'cmd rmdir /s or del /s for non-temporary paths is blocked by the active safety policy. Retry deleting only explicit paths inside the current directory; escalate for anything outside it.';
const REASON_CMD_DELETE_DYNAMIC_TARGET =
  'cmd rmdir /s or del /s target contains wildcards or variables that cannot be verified safely. Use literal paths within cwd.';
const REASON_CMD_DELETE_ROOT_HOME =
  'cmd rmdir /s or del /s targeting root or home directory is extremely dangerous and always blocked.';
const REASON_CMD_DELETE_HOME_CWD =
  'cmd rmdir /s or del /s in home directory is dangerous. Change to a project directory first.';

const CMD_DELETE_RULES: RecursiveDeleteRuleTable = {
  root_or_home_target: {
    id: 'cmd.recursive-delete-root-or-home',
    reason: REASON_CMD_DELETE_ROOT_HOME,
  },
  git_metadata_target: {
    id: 'cmd.recursive-delete-git-metadata',
    reason: REASON_GIT_METADATA_PROTECTION,
  },
  dynamic_target: {
    id: 'cmd.recursive-delete-dynamic-target',
    reason: REASON_CMD_DELETE_DYNAMIC_TARGET,
  },
  home_cwd_target: { id: 'cmd.recursive-delete-home-cwd', reason: REASON_CMD_DELETE_HOME_CWD },
  cwd_self_target: { id: 'cmd.recursive-delete-cwd-self', reason: REASON_CMD_DELETE_OUTSIDE_CWD },
  within_anchored_cwd: { id: 'cmd.recursive-delete-paranoid', reason: REASON_CMD_DELETE_POLICY },
  outside_anchored_cwd: {
    id: 'cmd.recursive-delete-outside-cwd',
    reason: REASON_CMD_DELETE_OUTSIDE_CWD,
  },
};

const CMD_BODY_SWITCH = /^\/\/?[ck]$/i;
const CMD_CONNECTORS = /[&|]+/;
const CMD_TOKEN = /(?:"[^"]*"|[^\s"])+/g;
const CMD_ESCAPE_OR_EXPANSION = /[\^%!]/;
const ESCAPED_QUOTE_INSIDE_WORD = /\\"./s;
const WINDOWS_NAMESPACE_PREFIX = /^"?[\\/]+[?.][\\/]/;
const CMD_DELETE_COMMANDS = new Set(['rmdir', 'rd', 'del', 'erase']);
const CMD_DIRECTORY_COMMANDS = new Set(['cd', 'chdir', 'pushd', 'popd']);

interface AnalyzeCmdOptions extends AnalyzeRmOptions {
  powerShellRawWords: readonly string[];
  analyzeNested: (command: string) => DestructiveCommandRuleMatch | null;
}

export function analyzeCmdMatch(
  words: readonly CommandWord[],
  options: AnalyzeCmdOptions,
): DestructiveCommandRuleMatch | null {
  const texts = words.map(analysisWordText);
  const bodyIndex = texts.findIndex((text) => CMD_BODY_SWITCH.test(text));
  if (bodyIndex === -1) return null;
  const joined = texts.slice(bodyIndex + 1).join(' ');
  const body = /^".*"$/s.test(joined) ? joined.slice(1, -1) : joined;
  const commands = body.split(CMD_CONNECTORS).map((piece) => {
    const tokens = piece.match(CMD_TOKEN) ?? [];
    return {
      piece,
      tokens,
      recursiveDelete:
        CMD_DELETE_COMMANDS.has(tokens[0]?.toLowerCase() ?? '') &&
        tokens
          .slice(1)
          .some((token) => token.startsWith('/') && token.toLowerCase().split('/').includes('s')),
    };
  });
  const recursiveDeletes = commands.filter((command) => command.recursiveDelete);
  if (
    recursiveDeletes.length > 0 &&
    (body.includes('\\"') ||
      options.powerShellRawWords.some((raw) => ESCAPED_QUOTE_INSIDE_WORD.test(raw)) ||
      CMD_ESCAPE_OR_EXPANSION.test(body) ||
      commands.some((command) =>
        CMD_DIRECTORY_COMMANDS.has(command.tokens[0]?.toLowerCase() ?? ''),
      ) ||
      recursiveDeletes.some((command) =>
        command.tokens.some((token) => WINDOWS_NAMESPACE_PREFIX.test(token)),
      ))
  ) {
    return dynamicShellSourceMatch();
  }

  const ctx = createRecursiveDeleteTargetContext({
    ...options,
    allowPaths: options.policy?.destructiveCommandAllowPaths,
  });
  return commands.reduce<DestructiveCommandRuleMatch | null>(
    (match, command) =>
      match ??
      (command.recursiveDelete
        ? recursiveDeleteTargetMatch(command.tokens, ctx, options.policy)
        : options.analyzeNested(command.piece)),
    null,
  );
}

function recursiveDeleteTargetMatch(
  tokens: readonly string[],
  ctx: RecursiveDeleteTargetContext,
  policy: AnalyzeCmdOptions['policy'],
): DestructiveCommandRuleMatch | null {
  return tokens
    .slice(1)
    .filter((token) => !token.startsWith('/'))
    .reduce<DestructiveCommandRuleMatch | null>(
      (match, token) =>
        match ??
        filterDestructiveCommandMatch(
          matchRecursiveDeleteClassification(
            classifyRecursiveDeleteTarget(
              powerShellTargetForPolicy(token.replaceAll('"', '')),
              ctx,
            ),
            ctx,
            policy,
            CMD_DELETE_RULES,
          ),
          policy,
        ),
      null,
    );
}
