import { rulePromptText } from '../rule-prompt';
import { plural } from '../format';
import { errorText, escapeHtml, notify, qs, requestJson, runRefresh } from '../ui';

type CustomRule = {
  name: string;
  command: string;
  subcommand?: string;
  block_args: string[];
  reason: string;
};
type RulesData = {
  projectPath: string;
  canPickDirectory: boolean;
  rulebooks: { name: string; version: string; spec: string; source: string; rules: CustomRule[] }[];
  errors: string[];
  warnings: string[];
};

let rulesData: RulesData | null = null;
let requested = false;
let scope = 'project';
let pendingFocus: string | null = null;
let directoryPickerFailed = false;

const showPathEnd = () => {
  const input = qs<HTMLInputElement>('rules-project-path');
  input.title = input.value;
  if (document.activeElement !== input) input.scrollLeft = input.scrollWidth;
};

const render = () => {
  const loaded = rulesData;
  if (!loaded) return;
  const pathInput = qs<HTMLInputElement>('rules-project-path');
  if (!pathInput.value) pathInput.value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  pathInput.readOnly = canPick;
  qs('rules-choose-directory').hidden = !canPick;
  showPathEnd();
  qs('rules-list').innerHTML =
    loaded.rulebooks.length === 0
      ? loaded.errors.length > 0
        ? '<p class="empty">Every rulebook was skipped because of errors, so no custom rule is enforced. See Problems above.</p>'
        : '<p class="empty">No custom rules yet. Use <strong>Create a rule</strong> below, or run <code>npx -y cc-safety-net rule init</code>.</p>'
      : loaded.rulebooks
          .map(
            (rulebook) => `<section class="rulebook">
    <div class="rulebook-head">
      <strong>${escapeHtml(rulebook.name)}</strong>
      <span class="count">v${escapeHtml(rulebook.version)}</span>
      <span>${rulebook.source === 'user' ? 'All projects' : 'This project'}</span>
      <span>${plural(rulebook.rules.length, 'rule')}</span>
      ${rulebook.spec === rulebook.name ? '' : `<code>${escapeHtml(rulebook.spec)}</code>`}
    </div>
    <ul class="card rows">${rulebook.rules
      .map(
        (
          rule,
        ) => `<li class="setting-row rulebook-rule${pendingFocus === rule.name ? ' focused' : ''}">
      <div class="rulebook-rule-head"><code class="command">${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(' '))}</code><code class="rule-id">custom.${escapeHtml(rule.name)}</code></div>
      <p>${escapeHtml(rule.reason)}</p>
      <p class="muted">Blocks when any of these arguments is present: ${rule.block_args.map((arg) => `<code>${escapeHtml(arg)}</code>`).join(' ')}</p>
    </li>`,
      )
      .join('')}</ul>
  </section>`,
          )
          .join('');
  const diagnostics = [
    ...loaded.errors.map((text) => `<p class="notice error">${escapeHtml(text)}</p>`),
    ...loaded.warnings.map((text) => `<p class="notice warn">${escapeHtml(text)}</p>`),
  ];
  qs('rules-diagnostics').innerHTML = diagnostics.join('');
  qs('rules-diagnostics-panel').hidden = diagnostics.length === 0;
  if (!pendingFocus) return;
  const focused = qs('rules-list').querySelector('.focused');
  if (focused) focused.scrollIntoView({ block: 'center' });
  if (!focused) notify(`custom.${pendingFocus} is not in any rulebook`, 'error');
  pendingFocus = null;
};

const loadRules = async () => {
  requested = true;
  const result = await requestJson('/api/rules');
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs('rules-list').innerHTML =
      `<p class="empty">Could not load rules: ${escapeHtml(errorText(result))}</p>`;
    rulesData = null;
    requested = false;
    qs('rules-diagnostics-panel').hidden = true;
    return;
  }
  rulesData = result.data;
  render();
};

export const showRules = (params: URLSearchParams) => {
  const focus = params.get('focus');
  const compose = params.get('compose');
  if (focus) pendingFocus = focus.replace(/^custom\./, '');
  if (compose) {
    qs<HTMLTextAreaElement>('rules-composer-input').value = compose;
    qs('rules-composer-panel').scrollIntoView({ block: 'start' });
    qs('rules-composer-input').focus();
  }
  showPathEnd();
  if (!requested) {
    void loadRules();
    return;
  }
  if (focus) render();
};

const setScope = (next: string) => {
  scope = next;
  document.querySelectorAll<HTMLElement>('[data-rules-scope]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.rulesScope === next));
  });
  qs('rules-project-path-field').hidden = next !== 'project';
  showPathEnd();
};

const chooseProjectDirectory = async (button: HTMLButtonElement) => {
  if (button.disabled) return;
  button.disabled = true;
  const result = await requestJson('/api/rules/choose-directory', { method: 'POST' });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs<HTMLInputElement>('rules-project-path').value = result.data.path;
    showPathEnd();
    return;
  }
  if (result.ok && result.data.cancelled) return;
  directoryPickerFailed = true;
  qs<HTMLInputElement>('rules-project-path').readOnly = false;
  button.hidden = true;
  notify(
    'The folder picker is not available',
    'error',
    `${result.ok ? result.data.error : errorText(result)}. Type the project folder instead.`,
  );
};

const copyRulePrompt = async (button: HTMLButtonElement) => {
  const request = qs<HTMLTextAreaElement>('rules-composer-input').value;
  const projectPath = qs<HTMLInputElement>('rules-project-path').value;
  if (!rulesData) {
    notify('Rules have not loaded yet', 'error', 'Click Refresh and try again.');
    return;
  }
  if (!request.trim()) {
    notify('Describe what should be blocked first', 'error');
    return;
  }
  if (scope === 'project' && !projectPath.trim()) {
    notify('Enter the project folder the rule belongs to', 'error');
    return;
  }
  button.disabled = true;
  const copied = await navigator.clipboard
    .writeText(rulePromptText({ rulesData, rulesScope: scope, projectPath, request }))
    .then(
      () => true,
      () => false,
    );
  button.disabled = false;
  if (!copied) {
    notify('Copy failed', 'error');
    return;
  }
  qs<HTMLTextAreaElement>('rules-composer-input').value = '';
  notify('Prompt copied', 'ok', 'Paste it into your coding agent.');
};

export const initRules = () => {
  qs('rules-refresh').addEventListener('click', (event) => {
    void runRefresh(event.currentTarget as HTMLButtonElement, loadRules);
  });
  qs('rules-project-path').addEventListener('blur', showPathEnd);
  qs('rules-choose-directory').addEventListener('click', (event) => {
    void chooseProjectDirectory(event.currentTarget as HTMLButtonElement);
  });
  qs('rules-copy-prompt').addEventListener('click', (event) => {
    void copyRulePrompt(event.currentTarget as HTMLButtonElement);
  });
  qs('rules-composer-panel').addEventListener('click', (event) => {
    const target = event.target as Element;
    const scopeButton = target.closest<HTMLElement>('[data-rules-scope]');
    if (scopeButton) {
      setScope(scopeButton.dataset.rulesScope ?? 'project');
      return;
    }
    const example = target.closest<HTMLElement>('[data-rules-example]');
    if (example)
      qs<HTMLTextAreaElement>('rules-composer-input').value = example.dataset.rulesExample ?? '';
  });
};
