import { initConfirmDialog, notify, on, qs, shared } from './ui';
import {
  initActivity,
  loadActivity,
  limitActivityDays,
  retentionDays,
  showActivity,
} from './views/activity';
import { initIntegrations, loadIntegrations } from './views/integrations';
import { initOverview, loadHealth, loadOverview, loadStarContext } from './views/overview';
import { initPolicy, loadPolicy, showPolicy } from './views/policy';
import { initRules, showRules } from './views/rules';
import { initSettings } from './views/settings';

const views = {
  overview: ['Overview', () => undefined],
  activity: ['Activity', showActivity],
  policy: ['Protections', showPolicy],
  rules: ['Custom rules', showRules],
  integrations: ['Agents', () => undefined],
  settings: ['Settings', () => undefined],
} satisfies Record<string, [string, (params: URLSearchParams) => void]>;
type ViewName = keyof typeof views;

const applyView = () => {
  const [hashName = '', query = ''] = location.hash.slice(1).split('?');
  const view: ViewName = hashName in views ? (hashName as ViewName) : 'overview';
  document.body.dataset.view = view;
  document.title = `${views[view][0]} · CC Safety Net`;
  document.querySelectorAll<HTMLElement>('[data-view]').forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((link) => {
    link.removeAttribute('aria-current');
    if (link.dataset.nav === view) link.setAttribute('aria-current', 'page');
  });
  window.scrollTo({ top: 0 });
  views[view][1](new URLSearchParams(query));
};

initConfirmDialog();
initOverview();
initActivity();
initPolicy();
initRules();
initIntegrations();
initSettings();
qs('toast-close').addEventListener('click', () => notify(''));
on('dirty', () => {
  qs('nav-dirty').hidden = !shared.dirty;
});
window.addEventListener('hashchange', applyView);
applyView();
void Promise.all([loadIntegrations(), loadHealth()]);
void loadPolicy().then((loaded) => {
  if (location.hash.startsWith('#policy?')) applyView();
  if (loaded) void loadStarContext();
  limitActivityDays(retentionDays());
  void loadOverview();
  void loadActivity();
});
