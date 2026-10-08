import { findSuspectEntries, formatRelativeTime } from '@/audit/display';
import { SAFETY_LEVEL_CAPABILITIES } from '@/core/policy/safety-level';
import { dayCount, formatCount, plural, repoUrl } from '../format';
import { attentionItems } from '../health';
import type { ActivityFeed, UpdateStatus } from '../types';
import { agentLabels, errorText, escapeHtml, on, qs, requestJson, shared } from '../ui';
import { retentionDays } from './activity';
import { integrationTargets } from './integrations';

const OVERVIEW_DAYS = 7;

let feed: ActivityFeed | null = null;
let update: UpdateStatus | null = null;

const renderStatusCard = () => {
  const loaded = shared.policy;
  if (!loaded) return;
  const targets = integrationTargets();
  const active = (targets ?? []).filter((row) => row.status === 'active');
  const policy = loaded.policy;
  const off = [
    policy.destructive_command_protection.enabled ? null : 'Command protection is off',
    policy.secret_protection.enabled ? null : 'Secret protection is off',
  ].filter((text) => text !== null);
  const headline =
    loaded.errors.length > 0
      ? 'Your policy file needs repair'
      : targets && active.length === 0
        ? 'Not checking any agent yet'
        : off.length > 0
          ? 'Partly protected'
          : 'Protected';
  const customized =
    (loaded.preview?.counts.effectiveCustomizations ?? 0) > 0 ||
    Object.entries(policy.safety.overrides).some(
      ([key, value]) =>
        value !==
        SAFETY_LEVEL_CAPABILITIES[policy.safety.level][
          key as keyof typeof SAFETY_LEVEL_CAPABILITIES.standard
        ],
    );
  const level = policy.safety.level[0]?.toUpperCase() + policy.safety.level.slice(1);
  const facts = [
    `${level} preset${customized ? ', customized' : ''}`,
    ...(off.length > 0
      ? off
      : [
          loaded.preview ? `${loaded.preview.counts.enabled} command rules on` : null,
          'Secret protection on',
        ]),
    active.length > 0
      ? `Hook active in ${active.length <= 3 ? active.map((row) => row.label).join(', ') : plural(active.length, 'agent')}`
      : null,
  ].filter((text) => text !== null);
  const [actionHref, actionLabel] =
    headline === 'Not checking any agent yet'
      ? ['#integrations', 'Install a hook']
      : ['#policy', loaded.errors.length > 0 ? 'Repair' : 'Configure'];
  qs('status-card').innerHTML = `<div>
      <p class="status-headline">${escapeHtml(headline)}</p>
      <p class="status-facts">${facts.map(escapeHtml).join(' · ')}</p>
    </div>
    <a class="link-button" href="${actionHref}">${actionLabel}</a>`;
};

const renderAttention = () => {
  const items = attentionItems({
    targets: integrationTargets(),
    update,
    errors: feed?.counts.errors ?? 0,
    suspects: feed ? findSuspectEntries(feed.entries).size : 0,
    days: feed?.days ?? OVERVIEW_DAYS,
  });
  qs('attention').hidden = items.length === 0;
  qs('attention-list').innerHTML = items
    .map(
      (item) =>
        `<li><a class="list-row attention-row" href="${escapeHtml(item.href)}"${item.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}><span>${escapeHtml(item.text)}</span><span class="row-action">${item.href.startsWith('#activity') ? 'Review' : item.href.startsWith('#') ? 'Fix' : 'Release notes'}</span></a></li>`,
    )
    .join('');
};

const sparkline = (byDay: number[], noun: string) => {
  const max = Math.max(...byDay, 1);
  return `<div class="tile-spark" role="img" aria-label="${escapeHtml(`${noun} per day, oldest to newest: ${byDay.join(', ')}`)}">${byDay
    .map(
      (count) =>
        `<span class="spark-bar${count === 0 ? ' spark-zero' : ''}" style="height:${count === 0 ? 2 : Math.max(3, Math.round((count / max) * 36))}px" title="${formatCount(count)}"></span>`,
    )
    .join('')}</div>`;
};

const ruleHref = (ruleId: string) =>
  ruleId.startsWith('custom.')
    ? `#rules?focus=${encodeURIComponent(ruleId)}`
    : `#activity?rule=${encodeURIComponent(ruleId)}`;

const renderActivity = () => {
  if (!feed) return;
  const loaded = feed;
  qs('overview-tiles').innerHTML = [
    [loaded.counts.blocked, 'Blocked', loaded.counts.blockedByDay],
    [loaded.totalInWindow, 'Commands checked', loaded.counts.analyzedByDay],
  ]
    .map(
      ([value, label, byDay]) =>
        `<div class="tile"><div><strong>${formatCount(value as number)}</strong><span>${label} · last ${dayCount(loaded.days)}</span></div>${sparkline(byDay as number[], label as string)}</div>`,
    )
    .join('');
  const blocks = loaded.entries.filter((entry) => entry.decision !== 'allow').slice(0, 8);
  qs('recent-blocks').innerHTML =
    blocks.length === 0
      ? `<p class="empty">Nothing was blocked in the last ${dayCount(loaded.days)}.</p>`
      : `<ul class="card list">${blocks
          .map(
            (
              entry,
            ) => `<li><a class="list-row compact-row" href="${entry.ruleId ? ruleHref(entry.ruleId) : '#activity'}">
              <time datetime="${escapeHtml(entry.ts)}">${escapeHtml(formatRelativeTime(entry.ts))}</time>
              <span class="feed-agent">${escapeHtml(entry.agent && entry.agent !== 'unknown' ? (agentLabels[entry.agent] ?? entry.agent) : '')}</span>
              <code class="feed-command">${escapeHtml(entry.segment || entry.command || '(no command recorded)')}</code>
              <span class="feed-rule">${escapeHtml(entry.failureStage ? 'guard error' : (entry.ruleId ?? ''))}</span>
            </a></li>`,
          )
          .join('')}</ul>`;
  const top = Object.entries(loaded.counts.rules)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  qs('top-rules-title').textContent = `Most-triggered rules · last ${dayCount(loaded.days)}`;
  qs('top-rules').innerHTML =
    top.length === 0
      ? '<p class="empty">No rule has blocked anything yet.</p>'
      : `<ul class="card list">${top
          .map(
            ([ruleId, count]) => `<li><a class="list-row rule-count-row" href="${ruleHref(ruleId)}">
              <code class="rule-label">${escapeHtml(ruleId)}</code>
              <span class="count">${plural(count, 'block')}</span>
            </a></li>`,
          )
          .join('')}</ul>`;
};

export const loadOverview = async () => {
  const result = await requestJson(
    `/api/activity?days=${Math.min(OVERVIEW_DAYS, retentionDays())}`,
  );
  if (!result.ok || !result.data) {
    qs('recent-blocks').innerHTML =
      `<p class="empty">Could not load activity: ${escapeHtml(errorText(result))}</p>`;
    return;
  }
  feed = result.data as ActivityFeed;
  renderActivity();
  renderAttention();
};

export const loadHealth = async () => {
  const result = await requestJson('/api/health');
  update = result.ok ? (result.data?.update ?? null) : null;
  renderAttention();
};

type StarContext = { starred: boolean | null; starCount: number | null; blockedTotal: number };
const starIcons = {
  outline:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled:
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
};
let starContext: StarContext = { starred: null, starCount: null, blockedTotal: 0 };

const starCountHtml = (count: number | null) =>
  typeof count === 'number'
    ? `<span class="star-count">${count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k` : count}</span>`
    : '';
const renderStarPitch = (starred: boolean) => {
  const evidence =
    starContext.blockedTotal > 0
      ? `CC Safety Net has blocked <strong>${formatCount(starContext.blockedTotal)}</strong> risky ${starContext.blockedTotal === 1 ? 'command' : 'commands'} on this machine in the last ${escapeHtml(dayCount(retentionDays()))}.`
      : '';
  qs('star-pitch-text').innerHTML = starred
    ? evidence
    : evidence
      ? `${evidence} If it saved your work, star it on GitHub.`
      : 'If CC Safety Net is useful to you, star it on GitHub.';
};
const renderStarLink = (href: string) => {
  qs('star-slot').innerHTML =
    `<a class="star-cta" href="${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)"><span class="star-icon" aria-hidden="true">${starIcons.outline}</span><span class="star-label">Star on GitHub</span>${starCountHtml(starContext.starCount)}</a>`;
  qs('star-row').hidden = false;
};
export const loadStarContext = async () => {
  const result = await requestJson('/api/star/context');
  starContext =
    result.ok && result.data ? result.data : { starred: null, starCount: null, blockedTotal: 0 };
  if (starContext.starred === true) return;
  renderStarPitch(false);
  qs('star-mechanism').hidden = starContext.starred !== false;
  if (starContext.starred === null) {
    renderStarLink(repoUrl);
    return;
  }
  qs('star-slot').innerHTML =
    `<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub. One click via your GitHub CLI."><span class="star-icon" aria-hidden="true">${starIcons.outline}</span><span class="star-label">Star on GitHub</span>${starCountHtml(starContext.starCount)}</button>`;
  qs('star-row').hidden = false;
};
const starRepo = async (button: HTMLButtonElement) => {
  button.disabled = true;
  qs('star-mechanism').hidden = true;
  const result = await requestJson('/api/star', { method: 'POST' });
  if (!(result.ok && result.data?.ok === true)) {
    renderStarLink(result.data?.fallbackUrl ?? repoUrl);
    return;
  }
  (button.querySelector('.star-icon') as HTMLElement).innerHTML = starIcons.filled;
  (button.querySelector('.star-label') as HTMLElement).textContent = 'Starred. Thank you.';
  button.setAttribute('aria-label', 'CC Safety Net starred on GitHub');
  button.classList.add('starred');
  renderStarPitch(true);
};

export const initOverview = () => {
  on('policy', renderStatusCard);
  on('integrations', () => {
    renderStatusCard();
    renderAttention();
  });
  qs('star-slot').addEventListener('click', (event) => {
    const button = (event.target as Element).closest('.star-cta');
    if (button instanceof HTMLButtonElement) void starRepo(button);
  });
};
