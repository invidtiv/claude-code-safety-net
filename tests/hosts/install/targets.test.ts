import { describe, expect, test } from 'bun:test';
import {
  type InstallTarget,
  orderInstallTargets,
  runInstallTargetsInOrder,
} from '@/hosts/install/targets';

const SELECTION: readonly InstallTarget[] = ['pi', 'cursor', 'amp', 'cursor'];

describe('install targets', () => {
  test('deduplicates the selection and waits for each target before starting the next', async () => {
    const first = Promise.withResolvers<void>();
    const visited: InstallTarget[] = [];
    const running = runInstallTargetsInOrder(orderInstallTargets(SELECTION), async (target) => {
      visited.push(target);
      if (target === 'amp') await first.promise;
    });
    expect(visited).toEqual(['amp']);
    first.resolve();
    await running;
    expect(visited).toEqual(['amp', 'cursor', 'pi']);
  });
});
