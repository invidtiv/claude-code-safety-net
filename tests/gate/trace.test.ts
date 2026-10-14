import { describe, expect, test } from 'bun:test';
import {
  type CommandTraceEvent,
  createCommandTraceContext as createPortedContext,
  createCommandTraceRecorder as createPortedRecorder,
  type TraceStep,
} from '@/gate/trace';

const PORTED = { recorder: createPortedRecorder, context: createPortedContext };

const SECRETS = [
  'hunter2',
  'derived-value-9',
  'ghp_abcdefghijklmnopqrstuvwxyz012345',
  'AKIAIOSFODNN7EXAMPLE',
  'Bearer top-secret',
  'admin:swordfish',
  'eyJhbGciOiJIUzI1NiJ9.c2lnbmVk.c2lnbmVk',
];

const globalEvent = (step: TraceStep): CommandTraceEvent => ({
  scope: 'global',
  step,
});

const segmentEvent = (segmentIndex: number, step: TraceStep): CommandTraceEvent => ({
  scope: 'segment',
  segmentIndex,
  step,
});

function cyclicEvent(): CommandTraceEvent {
  const step: Record<string, unknown> = { type: 'error', message: 'AWS_KEY=derived-value-9' };
  step.self = step;
  step.nested = { deeper: { deepest: ['derived-value-9', 'AKIAIOSFODNN7EXAMPLE'] } };
  return globalEvent(step as unknown as TraceStep);
}

const EVENTS: readonly CommandTraceEvent[] = [
  globalEvent({
    type: 'parse',
    input:
      'AWS_KEY=derived-value-9 PASSWORD=hunter2 curl -u admin:swordfish https://api.example.com',
    segments: [['derived-value-9'], ['ghp_abcdefghijklmnopqrstuvwxyz012345'], ['echo', 'ok']],
  }),
  globalEvent({
    type: 'env-strip',
    input: ['PASSWORD=hunter2', 'git', 'status'],
    envVars: ['PASSWORD'],
    output: ['git', 'status'],
  }),
  globalEvent({
    type: 'leading-tokens-stripped',
    input: ['sudo', '-u', 'root', '--', 'rm', '-rf', '/'],
    removed: ['sudo', '-u', 'root', '--'],
    output: ['rm', '-rf', '/'],
  }),
  globalEvent({ type: 'shell-wrapper', wrapper: 'bash', innerCommand: 'rm -rf /tmp/x' }),
  globalEvent({
    type: 'interpreter',
    interpreter: 'python3',
    codeArg: 'import os; os.environ["TOKEN"]="hunter2"',
    paranoidBlocked: true,
  }),
  globalEvent({ type: 'busybox', subcommand: 'rm' }),
  globalEvent({ type: 'transparent-wrapper', wrapper: 'env', output: ['rm', '-rf', '.'] }),
  globalEvent({ type: 'recurse', reason: 'shell-wrapper', innerCommand: 'rm -rf /', depth: 1 }),
  globalEvent({ type: 'recurse', reason: 'heredoc-file', innerCommand: 'cat <<EOF', depth: 4 }),
  globalEvent({ type: 'tmpdir-check', tmpdirValue: '/home/agent/not-temp', allowTmpdirVar: false }),
  globalEvent({
    type: 'strict-unparseable',
    rawCommand: 'echo "unclosed',
    reason: 'unclosed quote',
  }),
  segmentEvent(0, { type: 'rule-check', rule: 'rm-rf-root', matched: true, reason: 'Blocked' }),
  segmentEvent(0, { type: 'rule-check', rule: 'git-clean', matched: false }),
  segmentEvent(1, { type: 'worktree-relaxation', originalReason: 'discard', gitCwd: '/work/repo' }),
  segmentEvent(1, {
    type: 'fallback-scan',
    tokensScanned: ['Authorization: Bearer top-secret', 'eyJhbGciOiJIUzI1NiJ9.c2lnbmVk.c2lnbmVk'],
    embeddedCommandFound: 'rm -rf /',
  }),
  segmentEvent(2, { type: 'custom-rules-check', rulesChecked: true, matched: true, reason: 'r' }),
  segmentEvent(2, { type: 'custom-rules-check', rulesChecked: false, matched: false }),
  segmentEvent(2, { type: 'cwd-change', segment: 'cd /tmp', effectiveCwdNowUnknown: true }),
  segmentEvent(3, { type: 'dangerous-text', token: 'AKIAIOSFODNN7EXAMPLE', matched: false }),
  segmentEvent(3, { type: 'segment-skipped', index: 3, reason: 'prior-segment-blocked' }),
  segmentEvent(4, { type: 'error', message: 'boom', partial: true }),
  cyclicEvent(),
];

function recordAll(events: readonly CommandTraceEvent[] = EVENTS) {
  const recorder = createPortedRecorder();
  events.forEach((event) => {
    recorder.record(event);
  });
  return recorder.finish();
}

function walkContext(module: typeof PORTED) {
  const recorder = module.recorder();
  const context = module.context(recorder);
  const beforeAnySegment = context.getNextSegmentIndex();
  context.recordSegment({ type: 'busybox', subcommand: 'dropped-without-current-segment' });
  const first = context.allocateSegment();
  context.currentSegmentIndex = first;
  context.recordSegment({ type: 'rule-check', rule: 'first', matched: false });
  const second = context.allocateSegment();
  context.recordSegment({ type: 'rule-check', rule: 'explicit', matched: true }, second);
  context.recordGlobal({ type: 'parse', input: 'PASSWORD=hunter2 id', segments: [['id']] });
  return {
    beforeAnySegment,
    first,
    second,
    afterAllocation: context.getNextSegmentIndex(),
    trace: recorder.finish(),
  };
}

const STEP_TYPES: TraceStep['type'][] = [
  'parse',
  'env-strip',
  'leading-tokens-stripped',
  'shell-wrapper',
  'interpreter',
  'busybox',
  'transparent-wrapper',
  'recurse',
  'recurse',
  'tmpdir-check',
  'strict-unparseable',
  'rule-check',
  'rule-check',
  'worktree-relaxation',
  'fallback-scan',
  'custom-rules-check',
  'custom-rules-check',
  'cwd-change',
  'dangerous-text',
  'segment-skipped',
  'error',
  'error',
];

const busybox = (subcommand: string) => globalEvent({ type: 'busybox', subcommand });

describe('the command trace recorder', () => {
  test('keeps every event in the order recorded', () => {
    expect(recordAll().events.map((event) => event.step.type)).toEqual(STEP_TYPES);
  });

  test('stops at 512 events and keeps nothing past it', () => {
    const events = Array.from({ length: 600 }, (_, index) => busybox(`ls${index}`));

    expect(recordAll(events).events.map((event) => event.step)).toEqual(
      events.slice(0, 512).map((event) => event.step),
    );
  });

  test('bounds the text, the lists and the properties of a step', () => {
    const step = recordAll([
      globalEvent({
        type: 'parse',
        input: 'x'.repeat(3_000),
        segments: Array.from({ length: 200 }, () => ['a']),
      }),
      globalEvent(
        Object.fromEntries(
          Array.from({ length: 200 }, (_, index) => [`k${index}`, index]),
        ) as unknown as TraceStep,
      ),
    ]).events;

    expect(step[0]?.step).toEqual({
      type: 'parse',
      input: 'x'.repeat(2_048),
      segments: Array.from({ length: 128 }, () => ['a']),
    });
    expect(Object.keys(step[1]?.step ?? {})).toHaveLength(128);
  });

  test('cuts a step off at the depth bound and never follows a cycle', () => {
    expect(recordAll([cyclicEvent()]).events[0]?.step).toEqual({
      type: 'error',
      message: 'AWS_KEY=<redacted>',
      nested: { deeper: { deepest: ['<redacted>', '<redacted>'] } },
    } as never);
  });

  test('redacts assignment, derived and provider secrets out of every recorded step', () => {
    const trace = recordAll();

    expect(SECRETS.filter((secret) => JSON.stringify(trace).includes(secret))).toEqual([]);
    expect(trace.events[0]).toEqual({
      scope: 'global',
      step: {
        type: 'parse',
        input:
          'AWS_KEY=<redacted> PASSWORD=<redacted> curl -u <redacted>:<redacted> https://api.example.com',
        segments: [['<redacted>'], ['<redacted>'], ['echo', 'ok']],
      },
    });
  });

  test('allocates segments in order and routes each step to one', () => {
    expect(walkContext(PORTED)).toEqual({
      beforeAnySegment: 0,
      first: 0,
      second: 1,
      afterAllocation: 2,
      trace: {
        events: [
          {
            scope: 'segment',
            segmentIndex: 0,
            step: { type: 'rule-check', rule: 'first', matched: false },
          },
          {
            scope: 'segment',
            segmentIndex: 1,
            step: { type: 'rule-check', rule: 'explicit', matched: true },
          },
          {
            scope: 'global',
            step: { type: 'parse', input: 'PASSWORD=<redacted> id', segments: [['id']] },
          },
        ],
      },
    });
  });
});
