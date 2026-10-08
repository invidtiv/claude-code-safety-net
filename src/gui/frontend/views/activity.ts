import { findSuspectEntries, formatRelativeTime } from '@/audit/display';
import { DEFAULT_AUDIT_RETENTION_DAYS } from '@/core/policy/audit-retention-days';
import {
  activityFiltersFromParams,
  activityHash,
  type Decision,
  initialActivityFilters,
  visibleEntries,
} from '../activity-filter';
import { dayCount, formatCount, plural } from '../format';
import { buildReportRequest, scrubReportPaths } from '../report';
import type { ActivityFeed, FeedEntry } from '../types';
import {
  agentLabels,
  copyText,
  errorText,
  escapeHtml,
  icons,
  notify,
  on,
  qs,
  requestJson,
  runRefresh,
  shared,
  showPath,
} from '../ui';

const filters = initialActivityFilters();
let activity: ActivityFeed | null = null;
let suspects = new Set<FeedEntry>();
let renderedEntries: FeedEntry[] = [];
let queryTimer: number | undefined;

const syncHash = () => {
  if (document.body.dataset.view === 'activity')
    history.replaceState(null, '', `#${activityHash(filters)}`);
};

export const retentionDays = () =>
  shared.policy?.policy.audit.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;

const knownRuleIds = () =>
  new Set(
    [
      ...(shared.policy?.destructiveCommandRules ?? []),
      ...(shared.policy?.secretPatterns ?? []),
    ].map((rule) => rule.id),
  );

const decisionLabel = (entry: FeedEntry) =>
  entry.failureStage ? 'Error' : entry.decision === 'allow' ? 'Allowed' : 'Blocked';

const timeLabel = (ts: string) =>
  new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const dayLabel = (ts: string) => {
  const date = new Date(ts).toDateString();
  if (date === new Date().toDateString()) return 'Today';
  if (date === new Date(Date.now() - 86400000).toDateString()) return 'Yesterday';
  return new Date(ts).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const ruleLink = (ruleId: string) =>
  ruleId.startsWith('custom.')
    ? `<a class="rule-id" href="#rules?focus=${encodeURIComponent(ruleId)}" title="Show this custom rule">${escapeHtml(ruleId)}</a>`
    : knownRuleIds().has(ruleId)
      ? `<a class="rule-id" href="#policy?q=${encodeURIComponent(ruleId)}" title="Show this protection">${escapeHtml(ruleId)}</a>`
      : `<code class="rule-id">${escapeHtml(ruleId)}</code>`;

const entryCommand = (entry: FeedEntry) => entry.segment || entry.command || '';

const feedRowHtml = (entry: FeedEntry, index: number) => {
  const blocked = entry.decision !== 'allow';
  const command = entryCommand(entry);
  const agent =
    entry.agent && entry.agent !== 'unknown' ? (agentLabels[entry.agent] ?? entry.agent) : '';
  const detailRows = [
    entry.command && entry.command !== command
      ? ['Full command', `<code class="block">${escapeHtml(entry.command)}</code>`]
      : null,
    entry.reason && entry.reason !== 'allowed' ? ['Reason', escapeHtml(entry.reason)] : null,
    entry.ruleId ? ['Rule', ruleLink(entry.ruleId)] : null,
    entry.cwd ? ['Folder', `<code>${escapeHtml(entry.cwd)}</code>`] : null,
    [
      'Time',
      `${escapeHtml(new Date(entry.ts).toLocaleString('en-US'))} (${formatRelativeTime(entry.ts)})`,
    ],
  ].filter((row): row is string[] => row !== null);
  return `<li class="feed-row">
    <button type="button" class="feed-summary" aria-expanded="false" aria-controls="feed-detail-${index}">
      <time datetime="${escapeHtml(entry.ts)}">${escapeHtml(timeLabel(entry.ts))}</time>
      <span class="decision ${entry.failureStage ? 'error' : blocked ? 'deny' : 'allow'}">${decisionLabel(entry)}</span>
      <span class="feed-agent">${escapeHtml(agent)}</span>
      <code class="feed-command">${escapeHtml(command || '(no command recorded)')}</code>
      <span class="feed-rule">${escapeHtml(entry.ruleId ?? '')}</span>
    </button>
    <div class="feed-detail" id="feed-detail-${index}" hidden>
      <code class="block detail-command">${escapeHtml(command || '(no command recorded)')}</code>
      <dl class="detail-rows">${detailRows.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl>
      <div class="detail-actions">
        <button type="button" data-log-copy="${index}">${icons.copy}<span>Copy log entry</span></button>
        ${blocked ? `<button type="button" data-report-fp="${index}">Report false positive</button>` : `<button type="button" data-block-future="${index}">Block this in future</button>`}
      </div>
    </div>
  </li>`;
};

const renderControls = () => {
  if (!activity) return;
  const loaded = activity;
  const segment = (value: Decision, label: string, count: number) =>
    `<button type="button" data-activity-decision="${value}" aria-pressed="${filters.decision === value}">${label} <span class="count">${formatCount(count)}</span></button>`;
  qs('activity-decision').innerHTML = [
    segment('deny', 'Blocked', loaded.counts.blocked),
    segment('allow', 'Allowed', loaded.counts.allowed),
    ...(loaded.counts.errors > 0 ? [segment('error', 'Errors', loaded.counts.errors)] : []),
    ...(suspects.size > 0 ? [segment('suspect', 'Likely false positive', suspects.size)] : []),
    segment('all', 'All', loaded.totalInWindow),
  ].join('');
  const agentNames = Object.keys(loaded.counts.agents)
    .filter((name) => name !== 'unknown')
    .sort();
  qs<HTMLSelectElement>('activity-agent').innerHTML = [
    '<option value="all">All agents</option>',
    ...agentNames.map(
      (name) =>
        `<option value="${escapeHtml(name)}">${escapeHtml(agentLabels[name] ?? name)} (${formatCount(loaded.counts.agents[name] ?? 0)})</option>`,
    ),
  ].join('');
  qs<HTMLSelectElement>('activity-agent').value = filters.agent;
  qs('activity-agent').parentElement?.toggleAttribute('hidden', agentNames.length < 2);
  const retained = retentionDays();
  qs('activity-days').innerHTML = [
    ...[7, 30, 90, 180, 365].filter((days) => days < retained),
    retained,
  ]
    .map((days) => `<option value="${days}">Last ${dayCount(days)}</option>`)
    .join('');
  qs<HTMLSelectElement>('activity-days').value = String(loaded.days);
  qs('activity-command-filter').hidden = !filters.command;
  qs('activity-command-filter').innerHTML = filters.command
    ? `Showing blocks of <code>${escapeHtml(filters.command)}</code> <button type="button" class="quiet" data-clear-command>Show all blocks</button>`
    : '';
};

const emptyMessage = () => {
  if (filters.query || filters.command || filters.agent !== 'all')
    return 'Nothing matches these filters.';
  if (filters.decision === 'deny')
    return `Nothing was blocked in the last ${dayCount(activity?.days ?? filters.days)}. <button type="button" class="quiet" data-activity-decision="all">Show all activity</button>`;
  return 'No audit log entries match.';
};

const renderFeed = () => {
  if (!activity) return;
  const entries = visibleEntries(activity.entries, filters, suspects);
  renderedEntries = entries;
  qs('activity-feed').innerHTML =
    entries.length === 0
      ? `<p class="empty">${emptyMessage()}</p>`
      : entries
          .map((entry, index) => {
            const label = dayLabel(entry.ts);
            const previous = entries[index - 1];
            const heading =
              previous && dayLabel(previous.ts) === label
                ? ''
                : `${index === 0 ? '' : '</ul>'}<h4 class="day-heading">${escapeHtml(label)}</h4><ul class="feed-list">`;
            return heading + feedRowHtml(entry, index);
          })
          .join('') + '</ul>';
  qs('activity-count').textContent = [
    `Showing ${formatCount(entries.length)} of ${plural(activity.totalInWindow, 'entry', 'entries')} from the last ${dayCount(activity.days)}.`,
    activity.truncated
      ? 'Only the newest 500 entries of each decision are loaded; narrow the time window to see older ones.'
      : '',
    activity.unreadable > 0
      ? `${plural(activity.unreadable, 'log file')} could not be read, so this list is incomplete.`
      : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const loadActivity = async () => {
  const result = await requestJson(`/api/activity?days=${filters.days}`);
  if (!result.ok || !result.data) {
    qs('activity-feed').innerHTML =
      `<p class="empty">Could not load activity: ${escapeHtml(errorText(result))}</p>`;
    qs('activity-count').textContent = '';
    return;
  }
  activity = result.data as ActivityFeed;
  suspects = findSuspectEntries(activity.entries);
  showPath('logs-path', activity.logsDir ?? '', activity.logsDir ? '' : 'Not available');
  if (filters.agent !== 'all' && !(filters.agent in activity.counts.agents)) filters.agent = 'all';
  if (filters.decision === 'error' && activity.counts.errors === 0) filters.decision = 'deny';
  if (filters.decision === 'suspect' && suspects.size === 0) filters.decision = 'deny';
  renderControls();
  renderFeed();
  syncHash();
};

export const limitActivityDays = (days: number) => {
  filters.days = Math.min(filters.days, days);
};

const rerender = () => {
  renderControls();
  renderFeed();
  syncHash();
};

export const showActivity = (params: URLSearchParams) => {
  const next = activityFiltersFromParams(params);
  next.days = Math.min(next.days, retentionDays());
  if (activityHash(next) === activityHash(filters)) return;
  const reload = next.days !== filters.days;
  Object.assign(filters, next);
  qs<HTMLInputElement>('activity-search').value = filters.query;
  if (reload && activity) {
    void loadActivity();
    return;
  }
  rerender();
};

const openReportDialog = (entry: FeedEntry) => {
  const scrub = (text: string) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs<HTMLTextAreaElement>('report-command').value = scrub(entry.command || entry.segment || '');
  qs<HTMLTextAreaElement>('report-entry').value = JSON.stringify(
    entry,
    (_key, value) => (typeof value === 'string' ? scrub(value) : value),
    2,
  );
  qs<HTMLDialogElement>('report-dialog').returnValue = 'cancel';
  qs<HTMLDialogElement>('report-dialog').showModal();
};

const openFalsePositiveForm = async () => {
  const fields: Record<string, string> = {
    command: qs<HTMLTextAreaElement>('report-command').value,
    entry: qs<HTMLTextAreaElement>('report-entry').value,
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length
    ? navigator.clipboard
        .writeText(request.dropped.map((field) => `### ${field}\n${fields[field]}`).join('\n\n'))
        .then(
          () => true,
          () => false,
        )
    : null;
  window.open(request.url, '_blank', 'noopener');
  if (!copying) return;
  const names = request.dropped.join(' and ');
  notify(
    'Report too long to prefill',
    'error',
    (await copying)
      ? `The ${names} was copied to your clipboard. Paste it into the form on GitHub.`
      : `The ${names} was left out. Copy the log entry from Activity and paste it into the form on GitHub.`,
  );
};

export const initActivity = () => {
  on('policy', () => {
    if (activity) rerender();
  });
  qs('activity-search').addEventListener('input', (event) => {
    filters.query = (event.target as HTMLInputElement).value;
    if (filters.command) {
      filters.command = '';
      renderControls();
    }
    clearTimeout(queryTimer);
    queryTimer = setTimeout(() => {
      renderFeed();
      syncHash();
    }, 120);
  });
  qs('activity-agent').addEventListener('change', (event) => {
    filters.agent = (event.target as HTMLSelectElement).value;
    renderFeed();
    syncHash();
  });
  qs('activity-days').addEventListener('change', (event) => {
    filters.days = Number((event.target as HTMLSelectElement).value);
    void loadActivity();
  });
  qs('activity-refresh').addEventListener('click', (event) => {
    void runRefresh(event.currentTarget as HTMLButtonElement, loadActivity);
  });
  qs<HTMLDialogElement>('report-dialog').addEventListener('close', () => {
    if (qs<HTMLDialogElement>('report-dialog').returnValue === 'report')
      void openFalsePositiveForm();
  });
  qs('activity-command-filter').addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-clear-command]')) return;
    filters.command = '';
    rerender();
  });
  qs('activity-decision').addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-activity-decision]');
    if (!button) return;
    filters.decision = button.dataset.activityDecision as Decision;
    filters.command = '';
    rerender();
  });
  qs('activity-feed').addEventListener('click', (event) => {
    const target = event.target as Element;
    const showAll = target.closest<HTMLElement>('[data-activity-decision]');
    if (showAll) {
      filters.decision = showAll.dataset.activityDecision as Decision;
      rerender();
      return;
    }
    const summary = target.closest<HTMLElement>('.feed-summary');
    if (summary) {
      const expanded = summary.getAttribute('aria-expanded') !== 'true';
      summary.setAttribute('aria-expanded', String(expanded));
      const detail = qs(summary.getAttribute('aria-controls') ?? '');
      const summaryCommand = summary.querySelector('.feed-command') as HTMLElement;
      (detail.querySelector('.detail-command') as HTMLElement).hidden =
        summaryCommand.scrollWidth <= summaryCommand.clientWidth;
      detail.hidden = !expanded;
      return;
    }
    const copy = target.closest<HTMLElement>('[data-log-copy]');
    const copyEntry = renderedEntries[Number(copy?.dataset.logCopy)];
    if (copy && copyEntry) {
      void copyText(copy, JSON.stringify(copyEntry, null, 2));
      return;
    }
    const report =
      renderedEntries[Number(target.closest<HTMLElement>('[data-report-fp]')?.dataset.reportFp)];
    if (report) {
      openReportDialog(report);
      return;
    }
    const block =
      renderedEntries[
        Number(target.closest<HTMLElement>('[data-block-future]')?.dataset.blockFuture)
      ];
    if (block) location.hash = `rules?compose=${encodeURIComponent(entryCommand(block))}`;
  });
};
