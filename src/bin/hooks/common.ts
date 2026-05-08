import { analyzeCommand, loadConfig } from '@/core/analyze';
import { writeAuditLog } from '@/core/audit';
import { envTruthy } from '@/core/env';

export async function readHookInput<T>(outputDeny: (reason: string) => void): Promise<T | null> {
  const chunks: Buffer[] = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk as Buffer);
  }

  const inputText = Buffer.concat(chunks).toString('utf-8').trim();

  if (!inputText) {
    return null;
  }

  return parseHookJson<T>(inputText, outputDeny, 'Failed to parse hook input JSON (strict mode)');
}

export function parseHookJson<T>(
  inputText: string,
  outputDeny: (reason: string) => void,
  strictReason: string,
): T | null {
  try {
    return JSON.parse(inputText) as T;
  } catch {
    if (envTruthy('SAFETY_NET_STRICT')) outputDeny(strictReason);
    return null;
  }
}

function analyzeHookCommand(command: string, cwd: string) {
  const paranoidAll = envTruthy('SAFETY_NET_PARANOID');
  return analyzeCommand(command, {
    cwd,
    config: loadConfig(cwd),
    strict: envTruthy('SAFETY_NET_STRICT'),
    paranoidRm: paranoidAll || envTruthy('SAFETY_NET_PARANOID_RM'),
    paranoidInterpreters: paranoidAll || envTruthy('SAFETY_NET_PARANOID_INTERPRETERS'),
    worktreeMode: envTruthy('SAFETY_NET_WORKTREE'),
  });
}

export function handleBlockedHookCommand(
  command: string,
  cwd: string,
  sessionId: string | undefined,
  outputDeny: (reason: string, command?: string, segment?: string) => void,
): void {
  const result = analyzeHookCommand(command, cwd);
  if (!result) {
    return;
  }

  if (sessionId) {
    writeAuditLog(sessionId, command, result.segment, result.reason, cwd);
  }
  outputDeny(result.reason, command, result.segment);
}
