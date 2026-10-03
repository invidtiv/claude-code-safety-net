import { describe, expect, test } from 'bun:test';
import * as ported from '@/rules-manager/resource-limits';
import { describeOutcome } from '../helpers/fixture-tree';

function reserveBytes(side: typeof ported, chunks: readonly number[]) {
  const budget = side.createRuleSyncResourceBudget();
  return {
    outcomes: chunks.map((bytes) =>
      describeOutcome(() => side.reserveGitHubResponseBytes(budget, bytes)),
    ),
    responseBytes: budget.responseBytes,
  };
}

const LIMIT_ERROR = {
  ok: false,
  error: {
    name: 'Error',
    message: "Rule synchronization exceeds CC Safety Net's safe resource limits.",
  },
} as const;

describe('the response-byte counter', () => {
  test('accepts exactly the cap across chunks and refuses the byte after it', () => {
    const cap = ported.RULE_SYNC_RESOURCE_LIMITS.maxResponseBytes;
    const result = reserveBytes(ported, [cap - 1, 1, 1]);
    expect(result.outcomes.map((outcome) => outcome.ok)).toEqual([true, true, false]);
    expect(result.outcomes[2]).toEqual(LIMIT_ERROR);
    expect(result.responseBytes).toBe(cap + 1);
  });

  test('a single chunk over the cap is refused whole', () => {
    const cap = ported.RULE_SYNC_RESOURCE_LIMITS.maxResponseBytes;
    const result = reserveBytes(ported, [cap + 1]);
    expect(result.outcomes[0]).toEqual(LIMIT_ERROR);
    expect(result.responseBytes).toBe(cap + 1);
  });
});

describe('an operation', () => {
  test('carries a fresh budget, an unaborted signal and the url mapping', () => {
    const toLoopback = (url: string) => url.replace('https://api.github.com', 'http://127.0.0.1:1');
    const operation = ported.createRuleSyncOperation(toLoopback);
    expect({
      budget: operation.budget,
      aborted: operation.controller.signal.aborted,
      resolved: operation.resolveUrl?.('https://api.github.com/repos/acme/repo'),
    }).toEqual({
      budget: {
        requests: 0,
        responseBytes: 0,
        maxRequests: 131,
        maxResponseBytes: 67_108_864,
      },
      aborted: false,
      resolved: 'http://127.0.0.1:1/repos/acme/repo',
    });
  });
});
