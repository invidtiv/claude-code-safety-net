import { groupIntegrations } from '../health';
import type { IntegrationRow } from '../types';
import { emit, errorText, escapeHtml, notify, qs, requestJson, runRefresh } from '../ui';

let targets: IntegrationRow[] | null = null;
const busy = new Set<string>();

export const integrationTargets = () => targets;

const statusText = (row: IntegrationRow) =>
  ({
    active: 'Hook installed',
    disabled: 'Hook disabled',
    'not-installed': '',
    'not-inspected': 'Status unknown: its settings file could not be read',
  })[row.status];

const rowHtml = (row: IntegrationRow) => {
  const uninstall = row.status === 'active';
  const action =
    row.version === null
      ? ''
      : `<button type="button" data-integration-action="${uninstall ? 'uninstall' : 'install'}" data-integration-target="${escapeHtml(row.target)}"${busy.has(row.target) ? ' disabled' : ''}>${
          busy.has(row.target)
            ? uninstall
              ? 'Uninstalling…'
              : 'Installing…'
            : uninstall
              ? 'Uninstall'
              : row.status === 'disabled'
                ? 'Enable'
                : 'Install'
        }</button>`;
  return `<li class="setting-row agent-row">
    <span class="agent-name">${escapeHtml(row.label)}</span>
    <span class="agent-version"${row.version === null ? '' : ` title="v${escapeHtml(row.version)}"`}>${row.version === null ? 'Not detected' : `v${escapeHtml(row.version)}`}</span>
    <span class="agent-status ${row.status}">${statusText(row)}</span>
    <span class="agent-action">${action}</span>
    ${row.note ? `<p class="notice ${row.note.kind}">${escapeHtml(row.note.text)}</p>` : ''}
  </li>`;
};

const groupHtml = (title: string, rows: IntegrationRow[], sub = '') =>
  rows.length === 0
    ? ''
    : `<section class="section"><div class="section-head"><div><h3 class="section-title">${title} <span class="count">${rows.length}</span></h3>${sub ? `<p class="section-sub">${sub}</p>` : ''}</div></div><ul class="card rows">${rows.map(rowHtml).join('')}</ul></section>`;

const render = () => {
  if (!targets) return;
  const groups = groupIntegrations(targets);
  qs('integrations-list').innerHTML =
    groupHtml('Installed', groups.installed) +
    groupHtml(
      'Detected on this machine',
      groups.available,
      groups.installed.length === 0
        ? 'No agent has the hook yet. Install it for each agent you use; until then its commands are not checked.'
        : '',
    ) +
    (groups.missing.length === 0
      ? ''
      : `<details class="section missing-agents"><summary>Not detected on this machine <span class="count">${groups.missing.length}</span></summary><ul class="card rows">${groups.missing.map(rowHtml).join('')}</ul></details>`);
};

export const loadIntegrations = async () => {
  const result = await requestJson('/api/integrations');
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs('integrations-list').innerHTML =
      `<p class="empty">Could not check agents: ${escapeHtml(errorText(result))}</p>`;
    return;
  }
  targets = result.data.targets;
  qs('integrations-node-version').textContent = result.data.system.nodeVersion ?? 'unknown';
  qs('integrations-platform').textContent = result.data.system.platform;
  render();
  emit('integrations');
};

const runAction = async (button: HTMLElement) => {
  const target = button.dataset.integrationTarget;
  const action = button.dataset.integrationAction;
  if (!target || busy.has(target)) return;
  busy.add(target);
  render();
  const result = await requestJson(`/api/${action}`, {
    method: 'POST',
    body: JSON.stringify({ target }),
  });
  busy.delete(target);
  const row = targets?.find((entry) => entry.target === target);
  if (!row) return;
  const ok = result.ok && result.data.ok === true;
  if (ok) row.status = action === 'install' ? 'active' : 'not-installed';
  row.note = {
    kind: ok ? 'ok' : 'error',
    text: ok ? result.data.output : result.data?.output || errorText(result),
  };
  if (!ok) notify(action === 'install' ? 'Install failed' : 'Uninstall failed', 'error');
  render();
  emit('integrations');
};

export const initIntegrations = () => {
  qs('integrations-refresh').addEventListener('click', (event) => {
    void runRefresh(event.currentTarget as HTMLButtonElement, loadIntegrations);
  });
  qs('integrations-list').addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-integration-action]');
    if (button) void runAction(button);
  });
};
