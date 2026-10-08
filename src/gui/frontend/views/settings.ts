import {
  MAX_AUDIT_RETENTION_DAYS,
  MIN_AUDIT_RETENTION_DAYS,
} from '@/core/policy/audit-retention-days';
import { dayCount } from '../format';
import { clonePolicy } from '../project-draft';
import {
  confirmDialog,
  copyText,
  errorText,
  icons,
  isWriteSuccess,
  notify,
  on,
  qs,
  requestJson,
  shared,
} from '../ui';
import { limitActivityDays, loadActivity } from './activity';
import { loadOverview } from './overview';
import { loadPolicy } from './policy';

const themes = ['auto', 'light', 'dark'] as const;
type Theme = (typeof themes)[number];

const applyTheme = (theme: Theme) => {
  document.documentElement.style.colorScheme = theme === 'auto' ? 'light dark' : theme;
  document.querySelectorAll<HTMLElement>('[data-theme-choice]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
};

const renderRetention = () => {
  const days = shared.policy?.policy.audit.retention_days;
  if (days === undefined) return;
  qs<HTMLInputElement>('retention-days').value = String(days);
  qs('retention-unit').textContent = days === 1 ? 'day' : 'days';
};

const blockedBy = () =>
  shared.drafting
    ? 'Apply or leave your project policy draft first.'
    : shared.dirty
      ? 'Save or discard your unsaved Protections changes first.'
      : null;

const saveRetentionDays = async (days: number) => {
  const saved = shared.policy;
  if (!saved) return;
  const current = saved.policy.audit.retention_days;
  const problem =
    !Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS
      ? `Enter a whole number of days from ${MIN_AUDIT_RETENTION_DAYS} to ${MAX_AUDIT_RETENTION_DAYS}.`
      : blockedBy();
  if (problem) {
    renderRetention();
    notify('Retention unchanged', 'error', problem);
    return;
  }
  if (days === current) return;
  if (
    days < current &&
    !(await confirmDialog({
      title: `Keep logs for only ${dayCount(days)}?`,
      body: `Log entries older than ${dayCount(days)} are deleted on the next cleanup and cannot be recovered.`,
      detail: qs('logs-path').textContent ?? '',
      confirmLabel: 'Shorten retention',
    }))
  ) {
    renderRetention();
    return;
  }
  const policy = clonePolicy(saved.policy);
  policy.audit.retention_days = days;
  const result = await requestJson('/api/policy', { method: 'POST', body: JSON.stringify(policy) });
  if (!isWriteSuccess(result)) {
    renderRetention();
    notify('Save failed', 'error', errorText(result));
    return;
  }
  if (!(await loadPolicy())) return;
  limitActivityDays(days);
  await Promise.all([loadOverview(), loadActivity()]);
  notify(`Logs are now kept for ${dayCount(days)}`, 'ok');
};

const resetPolicy = async () => {
  const saved = shared.policy;
  if (!saved) return;
  if (shared.drafting) {
    notify('Reset unavailable', 'error', 'Apply or leave your project policy draft first.');
    return;
  }
  if (
    !(await confirmDialog({
      title: 'Reset your policy?',
      body: 'Your policy file is replaced with the defaults. Every customization is lost.',
      detail: saved.path,
      confirmLabel: 'Reset policy',
    }))
  )
    return;
  const result = await requestJson('/api/reset', { method: 'POST', body: '{}' });
  if (!isWriteSuccess(result)) {
    notify('Reset failed', 'error', errorText(result));
    return;
  }
  sessionStorage.removeItem('cc-safety-net-draft');
  if (await loadPolicy()) notify('Policy reset to the defaults', 'ok', result.data.path);
};

export const initSettings = () => {
  document.querySelectorAll<HTMLElement>('[data-copy-path]').forEach((button) => {
    button.innerHTML = `${icons.copy}<span>Copy</span>`;
    button.addEventListener('click', () => {
      void copyText(button, qs(button.dataset.copyPath ?? '').dataset.path ?? '');
    });
  });
  const stored = localStorage.getItem('cc-safety-net-theme') as Theme;
  applyTheme(themes.includes(stored) ? stored : 'auto');
  qs('settings-theme').addEventListener('click', (event) => {
    const theme = (event.target as Element).closest<HTMLElement>('[data-theme-choice]')?.dataset
      .themeChoice as Theme | undefined;
    if (!theme) return;
    if (theme === 'auto') localStorage.removeItem('cc-safety-net-theme');
    if (theme !== 'auto') localStorage.setItem('cc-safety-net-theme', theme);
    applyTheme(theme);
  });
  qs('retention-days').addEventListener('change', (event) => {
    void saveRetentionDays(Number((event.target as HTMLInputElement).value));
  });
  qs('reset').addEventListener('click', () => {
    void resetPolicy();
  });
  on('policy', renderRetention);
};
