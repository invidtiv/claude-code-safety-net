import { SAFETY_LEVEL_CAPABILITIES, type SafetyLevelCapability } from '@/core/policy/safety-level';
import {
  clonePolicy,
  collectProjectProposal,
  overlayProjectProposal,
  type Policy,
  type ProjectProposal,
  projectMarkedFields,
  type RuleOverrides,
  type SafetyLevel,
  seedProjectDraft,
} from '../project-draft';
import {
  capabilityNames,
  commandRuleGroups,
  levelName,
  policyChanges,
  policyFiltersFromParams,
  policyHash,
  ruleNote,
  safetyLevels,
  tierForRule,
} from '../policy-summary';
import type { DestructiveRule, PolicyState, Preview, SecretRule } from '../types';
import {
  confirmDialog,
  copyText,
  emit,
  errorText,
  escapeHtml,
  icons,
  isWriteSuccess,
  notify,
  qs,
  requestJson,
  shared,
} from '../ui';
import { plural } from '../format';
import { isSearchShortcut } from '../shortcuts';

type Capability = SafetyLevelCapability;

const secretCategoryNames: Record<string, string> = {
  Basename: 'Sensitive file names',
  Pattern: 'Sensitive file name patterns',
  'Home path': 'Sensitive home folders',
  Variant: 'Key file name variants',
  Extension: 'Sensitive file extensions',
  'Extension pattern': 'Sensitive extension patterns',
  'Coding CLI credential': 'Coding agent credentials',
  'Coding CLI config': 'Coding agent settings',
};

type ProjectDraftState = {
  path: string;
  revision: number;
  canPickDirectory: boolean;
  baseline: Policy;
  snapshot: string;
};

let state: PolicyState | undefined;
let draftPolicy: Policy;
let preview: Preview | null = null;
let previewRequestId = 0;
let testerRequestId = 0;
let projectDraft: ProjectDraftState | null = null;
let markedFields = new Set<string>();
let busy = false;
let showChangedOnly = false;
const groupExpanded = new Map<string, boolean>();

const searchQuery = () => qs<HTMLInputElement>('policy-search').value.trim().toLowerCase();
const filtering = () => searchQuery() !== '' || showChangedOnly;
const currentFilters = () => ({
  query: qs<HTMLInputElement>('policy-search').value,
  changedOnly: showChangedOnly,
});
const syncHash = () => {
  if (document.body.dataset.view === 'policy')
    history.replaceState(null, '', `#${policyHash(currentFilters())}`);
};
const setChangedOnly = (changedOnly: boolean) => {
  showChangedOnly = changedOnly;
  document.querySelectorAll('[data-policy-show]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String((button.getAttribute('data-policy-show') === 'changed') === changedOnly),
    );
  });
};

const collectFormPolicy = () => ({
  version: 1,
  safety: {
    level: draftPolicy.safety.level,
    overrides: Object.fromEntries(
      Object.entries(draftPolicy.safety.overrides).filter(
        ([, value]) => typeof value === 'boolean',
      ),
    ),
  },
  workflow: draftPolicy.workflow,
  destructive_command_protection: draftPolicy.destructive_command_protection,
  secret_protection: {
    enabled: draftPolicy.secret_protection.enabled,
    overrides: draftPolicy.secret_protection.overrides,
    deny_paths: draftPolicy.secret_protection.deny_paths,
    allow_paths: draftPolicy.secret_protection.allow_paths,
  },
  audit: draftPolicy.audit,
});

const effectivePreviewPolicy = (policy: ReturnType<typeof collectFormPolicy>) => {
  const baseline = projectDraft?.baseline;
  if (!baseline) return policy;
  const union = (user: string[], project: string[]) => [...new Set([...user, ...project])];
  return {
    ...policy,
    destructive_command_protection: {
      ...policy.destructive_command_protection,
      allow_paths: union(
        baseline.destructive_command_protection.allow_paths,
        policy.destructive_command_protection.allow_paths,
      ),
    },
    secret_protection: {
      ...policy.secret_protection,
      deny_paths: union(baseline.secret_protection.deny_paths, policy.secret_protection.deny_paths),
      allow_paths: union(
        baseline.secret_protection.allow_paths,
        policy.secret_protection.allow_paths,
      ),
    },
  };
};
const requestPolicyPreview = (policy: unknown) =>
  requestJson('/api/policy/preview', { method: 'POST', body: JSON.stringify(policy) });

const projectFieldChip = (field: string) => {
  if (!projectDraft) return '';
  if (!markedFields.has(field)) return '<span class="project-chip inherited">Inherited</span>';
  return `<button type="button" class="project-chip" data-unmark-field="${escapeHtml(field)}" title="Set by this project. Click to stop setting it." aria-label="Set by project: ${escapeHtml(field)}. Activate to inherit again.">Project</button>`;
};
const projectChipSlots: [string, string][] = [
  ['destructive-enabled-chip', 'destructive_command_protection.enabled'],
  ['secret-enabled-chip', 'secret_protection.enabled'],
  ['allow-paths-chip', 'destructive_command_protection.allow_paths'],
  ['deny-paths-chip', 'secret_protection.deny_paths'],
  ['secret-allow-paths-chip', 'secret_protection.allow_paths'],
  ['safety-level-chip', 'safety.level'],
];
const syncProjectChips = () => {
  projectChipSlots.forEach(([id, field]) => {
    qs(id).innerHTML = projectFieldChip(field);
  });
};
const markProjectField = (field: string) => {
  if (!projectDraft || markedFields.has(field)) return;
  markedFields.add(field);
  syncProjectChips();
};
const unmarkProjectField = (field: string) => {
  if (!projectDraft || !markedFields.has(field)) return;
  markedFields.delete(field);
  draftPolicy = overlayProjectProposal(
    projectDraft.baseline,
    collectProjectProposal(markedFields, draftPolicy),
  );
  renderPolicySections();
  void refreshPolicyPreview();
};
const markProjectOverride = (section: string, ruleId: string) => {
  if (projectDraft) markedFields.add(`${section}.overrides.${ruleId}`);
};

const ruleLabels = () =>
  Object.fromEntries(
    [...(state?.destructiveCommandRules ?? []), ...(state?.secretPatterns ?? [])].map((rule) => [
      rule.id,
      rule.label,
    ]),
  );

const setBanner = () => {
  const saved = state;
  const notices = [
    saved && !saved.policy.destructive_command_protection.enabled
      ? 'Command protection is off: built-in destructive command rules are not enforced. Catastrophic and custom rules still apply.'
      : null,
    saved && !saved.policy.secret_protection.enabled
      ? 'Secret protection is off: sensitive files and deny paths are not blocked.'
      : null,
    saved?.configState && saved.configState.state !== 'ready'
      ? `A fallback configuration is being enforced: ${saved.configState.reason}`
      : null,
  ].filter((notice) => notice !== null);
  qs('protection-banner').innerHTML = notices
    .map((notice) => `<p>${escapeHtml(notice)}</p>`)
    .concat(
      notices.length > 0 && !location.hash.startsWith('#policy')
        ? ['<a href="#policy">Open Protections</a>']
        : [],
    )
    .join('');
  qs('protection-banner').hidden = notices.length === 0;
};

const savedComparisonPolicy = () =>
  projectDraft
    ? overlayProjectProposal(
        projectDraft.baseline,
        JSON.parse(projectDraft.snapshot) as ProjectProposal,
      )
    : (state?.policy as Policy);

const renderSavebar = () => {
  qs('policy-savebar').hidden = !shared.dirty;
  qs('save').textContent = projectDraft ? 'Review and apply' : 'Save';
  if (!shared.dirty || !state) return;
  const changes = policyChanges(savedComparisonPolicy(), draftPolicy, ruleLabels());
  qs('savebar-title').textContent =
    changes.length === 0 ? 'Unsaved changes' : plural(changes.length, 'unsaved change');
  qs('savebar-summary').textContent =
    changes.slice(0, 3).join('; ') + (changes.length > 3 ? `; and ${changes.length - 3} more` : '');
};

const syncRawFromForm = () => {
  if (state?.errors.length) return;
  qs<HTMLTextAreaElement>('raw').value = `${JSON.stringify(
    projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy(),
    null,
    2,
  )}\n`;
  qs('raw-source').textContent = projectDraft
    ? `Only the fields set by this project. Written to ${projectDraft.path}.`
    : 'Read-only. Mirrors the settings above.';
};

const updateDirtyStatus = () => {
  if (!state || state.errors.length) return;
  const wasDirty = shared.dirty;
  if (projectDraft) {
    shared.dirty =
      JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
  }
  if (!projectDraft) {
    const draftJson = JSON.stringify(collectFormPolicy());
    shared.dirty = draftJson !== JSON.stringify(state.policy);
    if (shared.dirty) sessionStorage.setItem('cc-safety-net-draft', draftJson);
    if (!shared.dirty) sessionStorage.removeItem('cc-safety-net-draft');
  }
  renderSavebar();
  updateActions();
  if (wasDirty !== shared.dirty) emit('dirty');
};

const afterEdit = (refreshPreview = true) => {
  syncRawFromForm();
  updateDirtyStatus();
  if (refreshPreview) void refreshPolicyPreview();
};

const updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs<HTMLButtonElement>('save').disabled = busy || !state || hasErrors;
  qs<HTMLButtonElement>('repair').disabled = busy || !hasErrors;
};
const runExclusive = async (pendingText: string, fn: () => Promise<void>) => {
  if (busy) return;
  busy = true;
  updateActions();
  notify(pendingText);
  await fn().finally(() => {
    busy = false;
    updateActions();
  });
};

const groupRules = <T extends { category: string }>(rules: T[]) =>
  [...new Set(rules.map((rule) => rule.category))].map((category) => ({
    category,
    rules: rules.filter((rule) => rule.category === category),
  }));

const matches = (query: string, fields: (string | undefined)[]) =>
  fields.join(' ').toLowerCase().includes(query);

const secretRuleIsActive = (rule: SecretRule, overrides: RuleOverrides) =>
  overrides[rule.id] ? overrides[rule.id] === 'on' : !rule.defaultOff;

const destructiveChanged = (rule: DestructiveRule) =>
  draftPolicy.destructive_command_protection.overrides[rule.id] !== undefined ||
  ['rule_override', 'capability_override', 'environment'].includes(
    preview?.rules[rule.id]?.source ?? '',
  );
const secretChanged = (rule: SecretRule) =>
  draftPolicy.secret_protection.overrides[rule.id] !== undefined;

const categoryHtml = (options: {
  key: string;
  title: string;
  counts: string;
  bulkSwitch: string;
  rowsHtml: string;
}) => {
  const expanded = groupExpanded.get(options.key) ?? filtering();
  const contentId = `group-${options.key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return `<section class="rule-group">
    <div class="rule-group-head">
      <button type="button" class="group-toggle" data-group-toggle="${escapeHtml(options.key)}" aria-expanded="${expanded}" aria-controls="${contentId}">
        <span class="chevron" aria-hidden="true"></span>
        <span class="group-title">${escapeHtml(options.title)}</span>
        <span class="group-counts">${options.counts}</span>
      </button>
      ${options.bulkSwitch}
    </div>
    <ul class="rule-list" id="${contentId}" ${expanded ? '' : 'hidden'}>${options.rowsHtml}</ul>
  </section>`;
};

const ruleRowHtml = (row: {
  id: string;
  control: string;
  heading: string;
  note: string | null;
  noteTone: string;
  actions: string;
  description: string;
  info: string;
  disabled: boolean;
}) =>
  `<li class="rule-row${row.disabled ? ' row-disabled' : ''}" data-rule-row="${escapeHtml(row.id)}">
    ${row.control}
    <div class="rule-body">
      <div class="rule-line">${row.heading}${row.note ? `<span class="rule-note ${row.noteTone}">${escapeHtml(row.note)}</span>` : ''}${row.actions}</div>
      ${row.description ? `<p class="rule-description">${escapeHtml(row.description)}</p>` : ''}
    </div>
    ${row.info}
  </li>`;

const offCount = (off: number) => (off > 0 ? ` · <span class="off-count">${off} off</span>` : '');

const renderDestructiveCommands = () => {
  if (!state || !preview) return;
  const effectiveState = preview;
  const query = searchQuery();
  const disabled = !draftPolicy.destructive_command_protection.enabled;
  const catastrophicCount = state.destructiveCommandRules.filter(
    (rule) => rule.catastrophic,
  ).length;
  qs('destructive-command-summary').textContent = disabled
    ? 'Off. Built-in rules are not enforced; catastrophic and custom rules still apply. Your rule settings are kept.'
    : `${preview.counts.enabled} on · ${preview.counts.disabled} off · ${catastrophicCount} always on`;
  qs('destructive-panel').classList.toggle('is-off', disabled);
  const visible = state.destructiveCommandRules.filter(
    (rule) =>
      matches(query, [rule.category, rule.label, rule.id, rule.description]) &&
      (!showChangedOnly || destructiveChanged(rule)),
  );
  const rowHtml = (rule: DestructiveRule) => {
    const info = `<button type="button" class="info-button" data-rule-example="${escapeHtml(rule.id)}" aria-label="${escapeHtml(`About ${rule.label}`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">${icons.info}</button>`;
    const heading = `<span class="rule-name">${escapeHtml(rule.label)}</span><code class="rule-id">${escapeHtml(rule.id)}</code>${tierForRule(rule) === 'normal' ? '' : `<span class="tier-badge ${tierForRule(rule)}">${tierForRule(rule) === 'strict' ? 'Strict' : 'Paranoid'}</span>`}`;
    if (rule.catastrophic)
      return ruleRowHtml({
        id: rule.id,
        control: `<span class="lock" title="Always on">${icons.lock}</span>`,
        heading,
        note: null,
        noteTone: '',
        actions: '',
        description: rule.description,
        info,
        disabled: false,
      });
    const effective = effectiveState.rules[rule.id];
    if (!effective) return '';
    const override = draftPolicy.destructive_command_protection.overrides[rule.id] !== undefined;
    return ruleRowHtml({
      id: rule.id,
      control: `<input type="checkbox" class="switch" data-destructive-command-active="${escapeHtml(rule.id)}" ${effective.enabled ? 'checked' : ''} ${disabled ? 'disabled' : ''} aria-label="${escapeHtml(rule.label)}">`,
      heading,
      note: ruleNote(rule, effective, effectiveState.capabilities),
      noteTone:
        effective.source === 'rule_override'
          ? 'changed'
          : effective.source === 'capability_override' || effective.source === 'environment'
            ? ''
            : tierForRule(rule),
      actions: `${override ? `<button type="button" class="quiet small" data-use-inherited="${escapeHtml(rule.id)}">Reset</button>` : ''}${projectFieldChip(`destructive_command_protection.overrides.${rule.id}`)}`,
      description: rule.description,
      info,
      disabled,
    });
  };
  qs('destructive-command-rules').innerHTML =
    visible.length === 0
      ? '<p class="empty">No command protections match.</p>'
      : commandRuleGroups(visible)
          .map((group) => {
            const all =
              commandRuleGroups(state?.destructiveCommandRules ?? []).find(
                (entry) => entry.key === group.key,
              )?.rules ?? [];
            const off = all.filter(
              (rule) => effectiveState.rules[rule.id]?.enabled === false,
            ).length;
            return categoryHtml({
              key: `destructive:${group.key}`,
              title: group.title,
              counts:
                group.key === 'always-on'
                  ? `${plural(all.length, 'rule')} · can't be turned off`
                  : `${plural(all.length, 'rule')}${offCount(off)}`,
              bulkSwitch: '',
              rowsHtml: group.rules.map(rowHtml).join(''),
            });
          })
          .join('');
};

const renderSecretPatterns = () => {
  if (!state) return;
  const loaded = state;
  const query = searchQuery();
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const offTotal = loaded.secretPatterns.filter(
    (rule) => !secretRuleIsActive(rule, overrides),
  ).length;
  qs('secret-summary').textContent = disabled
    ? 'Off. Sensitive files and deny paths are not blocked. Your rule settings and paths are kept.'
    : `${loaded.secretPatterns.length - offTotal} on · ${offTotal} off`;
  qs('secret-panel').classList.toggle('is-off', disabled);
  const visible = loaded.secretPatterns.filter(
    (rule) =>
      matches(query, [
        rule.category,
        secretCategoryNames[rule.category],
        rule.label,
        rule.id,
        rule.description,
        ...(rule.paths ?? []),
      ]) &&
      (!showChangedOnly || secretChanged(rule)),
  );
  const rowHtml = (rule: SecretRule) => {
    const active = secretRuleIsActive(rule, overrides);
    const override = overrides[rule.id] !== undefined;
    return ruleRowHtml({
      id: rule.id,
      control: `<input type="checkbox" class="switch" data-secret-active="${escapeHtml(rule.id)}" ${active ? 'checked' : ''} ${disabled ? 'disabled' : ''} aria-label="${escapeHtml(rule.label)}">`,
      heading: `<span class="rule-name">${escapeHtml(rule.label)}</span>`,
      note: override ? 'Changed by you' : rule.defaultOff ? 'Off by default' : null,
      noteTone: override ? 'changed' : '',
      actions: `${override ? `<button type="button" class="quiet small" data-secret-reset="${escapeHtml(rule.id)}">Reset</button>` : ''}${projectFieldChip(`secret_protection.overrides.${rule.id}`)}`,
      description: rule.description ?? (rule.paths ? plural(rule.paths.length, 'path') : ''),
      info: rule.paths
        ? `<button type="button" class="info-button" data-secret-paths="${escapeHtml(rule.id)}" aria-label="${escapeHtml(`Protected paths for ${rule.label}`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">${icons.info}</button>`
        : '<span class="info-spacer"></span>',
      disabled,
    });
  };
  qs('secret-patterns').innerHTML =
    visible.length === 0
      ? '<p class="empty">No secret protections match.</p>'
      : groupRules(visible)
          .map((group) => {
            const all = loaded.secretPatterns.filter((rule) => rule.category === group.category);
            const on = all.filter((rule) => secretRuleIsActive(rule, overrides)).length;
            const title = secretCategoryNames[group.category] ?? group.category;
            return categoryHtml({
              key: `secret:${group.category}`,
              title,
              counts: `${plural(all.length, 'rule')}${offCount(on === 0 ? 0 : all.length - on)}`,
              bulkSwitch: `<input type="checkbox" class="switch" data-secret-group-active="${escapeHtml(group.category)}" ${on > 0 ? 'checked' : ''} ${disabled ? 'disabled' : ''} aria-label="${escapeHtml(`Turn all ${title} on or off`)}" title="Turn all on or off">`,
              rowsHtml: group.rules.map(rowHtml).join(''),
            });
          })
          .join('');
};

const renderChangedCount = () => {
  if (!state) return;
  const changed =
    state.destructiveCommandRules.filter((rule) => !rule.catastrophic && destructiveChanged(rule))
      .length + state.secretPatterns.filter(secretChanged).length;
  qs('changed-count').textContent = changed > 0 ? String(changed) : '';
};

const renderRules = () => {
  renderDestructiveCommands();
  renderSecretPatterns();
  renderChangedCount();
};

const renderSafety = () => {
  const environmentSources = preview
    ? [
        ...new Set(
          Object.values(preview.capabilities)
            .filter((capability) => capability.source === 'environment')
            .flatMap((capability) =>
              capability.sources.filter((source) => source.startsWith('env ')),
            ),
        ),
      ]
    : [];
  qs('environment-overrides').hidden = environmentSources.length === 0;
  qs('environment-overrides').textContent = environmentSources.length
    ? `An environment variable raises protection beyond these settings: ${environmentSources.map((source) => source.slice(4)).join(', ')}`
    : '';
  qs('safety-level').innerHTML = (Object.entries(safetyLevels) as [SafetyLevel, [string, string]][])
    .map(
      ([level, meta]) =>
        `<label class="preset-card preset-${level}"><input type="radio" name="safety-level" value="${level}" ${draftPolicy.safety.level === level ? 'checked' : ''}><span class="preset-name">${meta[0]}</span><span class="preset-description">${meta[1]}</span></label>`,
    )
    .join('');
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs('safety-overrides').innerHTML = (
    Object.entries(capabilityNames) as [Capability, [string, string]][]
  )
    .map(([key, meta]) => {
      const value = draftPolicy.safety.overrides[key];
      return `<div class="setting-row"><label class="setting-text" for="override-${key}"><strong>${meta[0]}</strong><small>${meta[1]}</small></label>${projectFieldChip(`safety.overrides.${key}`)}<select id="override-${key}" data-safety-override="${key}">
      <option value="inherit" ${value === undefined ? 'selected' : ''}>From preset (${inherited[key] ? 'on' : 'off'})</option>
      <option value="true" ${value === true ? 'selected' : ''}>Always on</option>
      <option value="false" ${value === false ? 'selected' : ''}>Always off</option>
    </select></div>`;
    })
    .join('');
  qs('workflow').innerHTML =
    `<div class="setting-row"><label class="setting-text" for="workflow-worktree"><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes the discard checks inside linked worktrees.</small></label>${projectFieldChip('workflow.worktree_mode')}<input type="checkbox" class="switch" id="workflow-worktree" data-workflow-worktree ${draftPolicy.workflow.worktree_mode ? 'checked' : ''}></div>`;
  const customized =
    (preview?.counts.effectiveCustomizations ?? 0) > 0 ||
    Object.entries(draftPolicy.safety.overrides).some(
      ([key, value]) =>
        value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key as Capability],
    );
  qs('safety-preset-status').textContent = customized
    ? `${levelName(draftPolicy.safety.level)}, customized`
    : '';
};

const showRulePopover = (
  button: HTMLElement,
  options: { label: string; title: string; description: string; body: string },
) => {
  const popover = qs('rule-example-popover');
  qs('rule-example-label').textContent = options.label;
  qs('rule-example-title').textContent = options.title;
  qs('rule-example-description').textContent = options.description;
  qs('rule-example-description').hidden = options.description === '';
  qs('rule-example-command').textContent = options.body;
  if (!popover.matches(':popover-open')) popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const below = buttonRect.bottom + 8;
  popover.style.top = `${below + popoverRect.height <= window.innerHeight - 12 ? below : Math.max(12, buttonRect.top - 8 - popoverRect.height)}px`;
  popover.style.left = `${Math.min(window.innerWidth - popoverRect.width - 12, Math.max(12, buttonRect.right - popoverRect.width))}px`;
};

const validatePathAdditions = async (
  patch: (candidate: ReturnType<typeof collectFormPolicy>) => void,
) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  return result.ok && result.data?.preview ? null : errorText(result);
};

const createPathList = (
  prefix: string,
  config: {
    field: string;
    getPaths: () => string[];
    setPaths: (paths: string[]) => void;
    isDisabled: () => boolean;
    patch: (candidate: ReturnType<typeof collectFormPolicy>, paths: string[]) => void;
  },
) => {
  const setHint = (text: string) => {
    qs(`${prefix}-hint`).textContent = text;
    qs(`${prefix}-hint`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(`${prefix}-count`).textContent = paths.length > 0 ? String(paths.length) : '';
    qs<HTMLInputElement>(`${prefix}-input`).disabled = disabled;
    qs<HTMLButtonElement>(`${prefix}-add-button`).disabled = disabled;
    qs(`${prefix}-list`).innerHTML = paths
      .map(
        (path, index) => `<li class="path-item${disabled ? ' row-disabled' : ''}">
          <code>${escapeHtml(path)}</code>
          <button type="button" class="quiet icon-only" data-path-list="${prefix}" data-path-remove="${index}" ${disabled ? 'disabled' : ''} aria-label="Remove ${escapeHtml(path)}">${icons.remove}</button>
        </li>`,
      )
      .join('');
  };
  const claimForProject = () => {
    if (!projectDraft || markedFields.has(config.field)) return;
    markedFields.add(config.field);
    config.setPaths([]);
    syncProjectChips();
  };
  let adding = false;
  const add = async (value: string) => {
    if (adding) return;
    const entries = [
      ...new Set(
        value
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
      ),
    ];
    if (entries.length === 0) return;
    const scope = projectDraft;
    const claimed = projectDraft !== null && !markedFields.has(config.field);
    const previousPaths = config.getPaths();
    claimForProject();
    const submitted = qs<HTMLInputElement>(`${prefix}-input`).value;
    const additions = entries.filter((entry) => !config.getPaths().includes(entry));
    if (additions.length) {
      adding = true;
      const error = await validatePathAdditions((candidate) =>
        config.patch(candidate, [...config.getPaths(), ...additions]),
      ).finally(() => {
        adding = false;
      });
      if (projectDraft !== scope) return;
      if (error) {
        setHint(`Not added: ${additions.join(', ')}. ${error}`);
        if (claimed) {
          markedFields.delete(config.field);
          config.setPaths(previousPaths);
          syncProjectChips();
        }
        return;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs<HTMLInputElement>(`${prefix}-input`).value === submitted)
      qs<HTMLInputElement>(`${prefix}-input`).value = '';
    setHint(duplicates.length ? `Already listed: ${duplicates.join(', ')}` : '');
    render();
    afterEdit(false);
    qs(`${prefix}-input`).focus();
  };
  const remove = (index: number) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint('');
    render();
    afterEdit(false);
  };
  return { render, add, remove };
};

const pathLists = {
  'allow-paths': createPathList('allow-paths', {
    field: 'destructive_command_protection.allow_paths',
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    patch: (candidate, paths) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths,
      };
    },
  }),
  'deny-paths': createPathList('deny-paths', {
    field: 'secret_protection.deny_paths',
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    patch: (candidate, paths) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    },
  }),
  'secret-allow-paths': createPathList('secret-allow-paths', {
    field: 'secret_protection.allow_paths',
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    patch: (candidate, paths) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    },
  }),
};
const pathListFor = (name: string | undefined) =>
  name === 'deny-paths' || name === 'allow-paths' || name === 'secret-allow-paths'
    ? pathLists[name]
    : null;
const renderPathLists = () => {
  Object.values(pathLists).forEach((list) => {
    list.render();
  });
};

const syncMasterSwitches = () => {
  qs<HTMLInputElement>('destructive-enabled').checked =
    draftPolicy.destructive_command_protection.enabled;
  qs<HTMLInputElement>('secret-enabled').checked = draftPolicy.secret_protection.enabled;
};

function renderPolicySections() {
  syncMasterSwitches();
  renderSafety();
  renderRules();
  renderPathLists();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}

const refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy()));
  if (requestId !== previewRequestId) return;
  if (!result.ok || !result.data?.preview) {
    notify('Preview failed', 'error', errorText(result));
    return;
  }
  preview = result.data.preview;
  renderSafety();
  renderRules();
  void runCommandTest();
};

const runCommandTest = async () => {
  const command = qs<HTMLInputElement>('tester-input').value.trim();
  if (!command) {
    qs('tester-result').hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson('/api/policy/explain', {
    method: 'POST',
    body: JSON.stringify({ command, policy: effectivePreviewPolicy(collectFormPolicy()) }),
  });
  if (requestId !== testerRequestId) return;
  const el = qs('tester-result');
  el.hidden = false;
  if (!result.ok) {
    el.className = 'notice error';
    el.textContent = `Could not test this command: ${errorText(result)}`;
    return;
  }
  if (result.data.result === 'allowed') {
    el.className = 'notice ok';
    el.innerHTML = `<strong>Allowed.</strong> No rule blocks this command. <a href="#rules?compose=${encodeURIComponent(command)}">Create a rule to block it</a>`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleHtml = !ruleId
    ? ''
    : result.data.customRule
      ? ` by <a class="rule-id" href="#rules?focus=${encodeURIComponent(ruleId)}">${escapeHtml(ruleId)}</a>`
      : ` by <a class="rule-id" href="#policy?q=${encodeURIComponent(ruleId)}">${escapeHtml(ruleId)}</a>`;
  el.className = 'notice error';
  el.innerHTML = `<strong>Blocked</strong>${ruleHtml}. ${escapeHtml(result.data.reason || '')}${
    result.data.segment && result.data.segment !== command
      ? `<div class="tester-segment">Blocked part: <code>${escapeHtml(result.data.segment)}</code></div>`
      : ''
  }`;
};

const render = () => {
  if (!state) return;
  const loaded = state;
  draftPolicy = clonePolicy(loaded.policy);
  preview = loaded.preview;
  shared.dirty = false;
  qs('policy-savebar').hidden = true;
  qs('policy-path').textContent = loaded.path + (loaded.exists ? '' : ' (not created yet)');
  const projectPolicy = loaded.projectPolicy;
  qs('project-policy-row').hidden = !projectPolicy;
  qs('project-policy-path').textContent = projectPolicy?.path ?? '';
  qs('project-policy-notice').hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs('project-policy-notice').textContent = projectPolicy
    ? ['The project policy changes these settings:', ...projectPolicy.weakenings].join('\n')
    : '';
  qs('app-version').textContent = loaded.version;
  qs<HTMLTextAreaElement>('raw').value = loaded.errors.length
    ? loaded.raw
    : `${JSON.stringify(draftPolicy, null, 2)}\n`;
  qs('recovery').hidden = loaded.errors.length === 0;
  qs('policy-errors').textContent = loaded.errors.join('\n');
  syncMasterSwitches();
  renderSafety();
  renderRules();
  renderPathLists();
  syncProjectChips();
  syncRawFromForm();
  if (loaded.errors.length) qs('raw-source').textContent = 'The file as it is on disk.';
  updateActions();
  setBanner();
  emit('dirty');
  emit('policy');
  if (loaded.errors.length && !location.hash.startsWith('#policy')) location.hash = 'policy';
};

const restoreDraft = () => {
  if (!state || state.errors.length) return;
  const stored = sessionStorage.getItem('cc-safety-net-draft');
  if (!stored) return;
  const parsed = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();
  const isRecordField = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);
  const isOptionalPathList = (value: unknown) =>
    value === undefined ||
    (Array.isArray(value) && value.every((item) => typeof item === 'string'));
  const isPolicyShape =
    isRecordField(parsed) &&
    isRecordField(parsed.safety) &&
    typeof parsed.safety.level === 'string' &&
    Object.hasOwn(safetyLevels, parsed.safety.level) &&
    isRecordField(parsed.safety.overrides) &&
    isRecordField(parsed.workflow) &&
    isRecordField(parsed.destructive_command_protection) &&
    isRecordField(parsed.destructive_command_protection.overrides) &&
    isOptionalPathList(parsed.destructive_command_protection.allow_paths) &&
    isRecordField(parsed.secret_protection) &&
    isRecordField(parsed.secret_protection.overrides) &&
    isOptionalPathList(parsed.secret_protection.deny_paths) &&
    isOptionalPathList(parsed.secret_protection.allow_paths) &&
    isRecordField(parsed.audit);
  if (!isPolicyShape || stored === JSON.stringify(state.policy)) {
    sessionStorage.removeItem('cc-safety-net-draft');
    return;
  }
  const draft = parsed as Policy;
  draft.destructive_command_protection.allow_paths ??= [];
  draft.secret_protection.deny_paths ??= [];
  draft.secret_protection.allow_paths ??= [];
  draftPolicy = draft;
  renderPolicySections();
  void refreshPolicyPreview();
  notify('Restored your unsaved changes', 'ok');
};

export const loadPolicy = async () => {
  const result = await requestJson('/api/policy');
  if (!result.ok || !result.data) {
    notify('Could not load your policy', 'error', errorText(result));
    return false;
  }
  state = result.data as PolicyState;
  shared.policy = state;
  render();
  restoreDraft();
  if (state.errors.length) notify('Your policy file needs repair', 'error');
  return true;
};

const writePolicy = async (path: string, body: string, failureTitle: string) => {
  const result = await requestJson(path, { method: 'POST', body });
  if (isWriteSuccess(result)) return result;
  notify(failureTitle, 'error', errorText(result));
  return null;
};
const reloadAfterWrite = async () => {
  sessionStorage.removeItem('cc-safety-net-draft');
  return loadPolicy();
};

const renderProjectDraftBar = () => {
  shared.drafting = projectDraft !== null;
  qs('scope-user').setAttribute('aria-pressed', String(projectDraft === null));
  qs('project-draft-enter').setAttribute('aria-pressed', String(projectDraft !== null));
  qs('project-draft-bar').hidden = projectDraft === null;
  qs('save').textContent = projectDraft ? 'Review and apply' : 'Save';
  if (!projectDraft) return;
  qs('project-draft-path').textContent = projectDraft.path;
  qs('project-draft-change').hidden = !projectDraft.canPickDirectory;
};
const setProjectDraftDiagnostics = (messages: string[]) => {
  qs('project-draft-diagnostics').textContent = messages.join('\n');
  qs('project-draft-diagnostics').hidden = messages.length === 0;
};
const exitProjectDraft = () => {
  projectDraft = null;
  markedFields = new Set();
  setProjectDraftDiagnostics([]);
  if (state) draftPolicy = clonePolicy(state.policy);
  renderProjectDraftBar();
  renderPolicySections();
};
const ingestProjectState = async (okStatus: string) => {
  const result = await requestJson('/api/policy/project');
  if (!result.ok || !result.data) {
    notify('Project policy unavailable', 'error', errorText(result));
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await loadPolicy();
    notify(
      'Repair your policy first',
      'error',
      [
        'Your own policy file must be repaired before you can edit a project policy.',
        ...(Array.isArray(result.data.userPolicyDiagnostics)
          ? (result.data.userPolicyDiagnostics as string[])
          : []),
      ].join('\n'),
    );
    return false;
  }
  projectDraft = {
    path: result.data.path,
    revision: result.data.revision,
    canPickDirectory: result.data.canPickDirectory === true,
    baseline: seeded.baseline,
    snapshot: seeded.snapshot,
  };
  markedFields = seeded.marked;
  draftPolicy = seeded.policy;
  setProjectDraftDiagnostics(
    Array.isArray(result.data.projectionDiagnostics) ? result.data.projectionDiagnostics : [],
  );
  renderProjectDraftBar();
  renderPolicySections();
  void refreshPolicyPreview();
  notify(okStatus, 'ok');
  return true;
};
const enterProjectDraft = async () => {
  if (projectDraft) return;
  if (!state) {
    notify('Your policy has not loaded yet', 'error', 'Reload the page.');
    return;
  }
  if (state.errors.length) {
    notify('Repair your policy first', 'error');
    return;
  }
  if (shared.dirty) {
    if (
      !(await confirmDialog({
        title: 'Discard unsaved changes?',
        body: 'A project policy starts from your saved policy. Save your changes first, or discard them here.',
        confirmLabel: 'Discard changes',
        confirmClass: '',
      }))
    )
      return;
    sessionStorage.removeItem('cc-safety-net-draft');
    if (!(await loadPolicy())) return;
  }
  await ingestProjectState('Editing the project policy');
};
const confirmDiscardProjectDraft = async (body: string) =>
  !shared.dirty ||
  (await confirmDialog({
    title: 'Discard this project draft?',
    body,
    confirmLabel: 'Discard draft',
    confirmClass: '',
  }));
const changeProjectDirectory = async () => {
  if (!(await confirmDiscardProjectDraft('Switching folders discards this draft.'))) return;
  const result = await requestJson('/api/policy/project/choose-directory', { method: 'POST' });
  if (!result.ok) {
    notify('Could not open the folder picker', 'error', errorText(result));
    return;
  }
  if (result.data.error) {
    notify(result.data.error, 'error');
    return;
  }
  if (result.data.cancelled) return;
  await ingestProjectState('Editing the project policy');
};
const leaveProjectDraft = async () => {
  if (!projectDraft) return;
  if (
    !(await confirmDiscardProjectDraft('Your project changes have not been written anywhere yet.'))
  )
    return;
  exitProjectDraft();
  if (await loadPolicy()) notify('Back to your own policy', 'ok');
};
const discardProjectDraft = async (draft: ProjectDraftState) => {
  if (
    !(await confirmDialog({
      title: 'Discard changes to this draft?',
      body: 'The draft goes back to the settings this project already has.',
      confirmLabel: 'Discard changes',
      confirmClass: '',
    }))
  )
    return;
  const snapshot = JSON.parse(draft.snapshot) as ProjectProposal;
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  void refreshPolicyPreview();
  notify('Changes discarded', 'ok');
};
const handleStaleProjectDraft = async () => {
  if (!(await ingestProjectState('Project draft reloaded'))) return;
  notify(
    'The project folder changed',
    'error',
    'The draft was reloaded for the new folder. Review it again before applying.',
  );
};
const projectDiffHtml = (data: {
  rows?: { field: string; before?: string; after?: string }[];
  weakenings?: string[];
  existingFileDiagnostics?: string[];
}) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...(data.existingFileDiagnostics?.length
      ? ['The existing project policy file is invalid and will be replaced.']
      : []),
    ...(data.weakenings ?? []),
  ];
  return (
    (rows.length === 0
      ? '<p class="empty">No change to the effective policy.</p>'
      : `<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>${rows
          .map(
            (row) =>
              `<tr><td><code>${escapeHtml(row.field)}</code></td><td class="diff-before">${escapeHtml(row.before ?? '(unset)')}</td><td class="diff-after">${escapeHtml(row.after ?? '(unset)')}</td></tr>`,
          )
          .join('')}</tbody></table>`) +
    warnings.map((text) => `<p class="notice warn">${escapeHtml(text)}</p>`).join('')
  );
};
const reviewProjectDraft = async (draft: ProjectDraftState) => {
  const proposal = collectProjectProposal(markedFields, draftPolicy);
  const serialized = JSON.stringify(proposal);
  const body = JSON.stringify({ revision: draft.revision, proposal });
  const diff = await requestJson('/api/policy/project/diff', { method: 'POST', body });
  if (projectDraft !== draft) return;
  if (diff.status === 409) {
    await handleStaleProjectDraft();
    return;
  }
  if (!diff.ok) {
    notify('Review failed', 'error', errorText(diff));
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    notify('Review again', 'error', 'The draft changed while the review was loading.');
    return;
  }
  if (
    !(await confirmDialog({
      title: 'Apply this project policy?',
      body: 'Everyone who works in this project gets these settings on top of their own policy.',
      detail: draft.path,
      rowsHtml: projectDiffHtml(diff.data),
      confirmLabel: 'Apply project policy',
      confirmClass: 'primary',
    }))
  )
    return;
  await runExclusive('Applying…', async () => {
    const applied = await requestJson('/api/policy/project/apply', { method: 'POST', body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      notify('Apply failed', 'error', errorText(applied));
      return;
    }
    exitProjectDraft();
    if (await loadPolicy()) notify('Project policy applied', 'ok', applied.data.path);
  });
};

const save = () => {
  if (!state) {
    notify('Your policy has not loaded yet', 'error', 'Reload the page.');
    return;
  }
  if (state.errors.length) {
    notify('Repair your policy before saving', 'error');
    return;
  }
  if (projectDraft) {
    void reviewProjectDraft(projectDraft);
    return;
  }
  if (!shared.dirty) return;
  const policy = collectFormPolicy();
  void runExclusive('Saving…', async () => {
    const result = await writePolicy('/api/policy', JSON.stringify(policy), 'Save failed');
    if (result && (await reloadAfterWrite())) notify('Policy saved', 'ok', result.data.path);
  });
};

const discard = async () => {
  if (projectDraft) {
    await discardProjectDraft(projectDraft);
    return;
  }
  if (
    !(await confirmDialog({
      title: 'Discard unsaved changes?',
      body: 'Every change since your last save will be undone.',
      confirmLabel: 'Discard changes',
      confirmClass: '',
    }))
  )
    return;
  await runExclusive('Discarding…', async () => {
    sessionStorage.removeItem('cc-safety-net-draft');
    if (await loadPolicy()) notify('Changes discarded', 'ok');
  });
};

const repair = async () => {
  if (!state?.errors.length) return;
  if (
    !(await confirmDialog({
      title: 'Repair your policy file?',
      body: 'Valid settings are kept and invalid ones are dropped. If the JSON cannot be read at all, defaults are restored.',
      detail: state.path,
      confirmLabel: 'Repair',
      confirmClass: 'primary',
    }))
  )
    return;
  await runExclusive('Repairing…', async () => {
    const result = await writePolicy('/api/repair', '{}', 'Repair failed');
    if (result && (await reloadAfterWrite())) notify('Policy repaired', 'ok', result.data.path);
  });
};

const resetOverrides = async (section: 'destructive_command_protection' | 'secret_protection') => {
  if (Object.keys(draftPolicy[section].overrides).length === 0) {
    notify('Nothing to reset: every rule already uses its default', 'ok');
    return;
  }
  if (
    !(await confirmDialog({
      title: 'Reset every rule to its default?',
      body: `All ${section === 'secret_protection' ? 'secret' : 'command'} rules go back to the setting their preset gives them. You can still discard before saving.`,
      confirmLabel: 'Reset rules',
    }))
  )
    return;
  markedFields = new Set(
    [...markedFields].filter((field) => !field.startsWith(`${section}.overrides.`)),
  );
  if (projectDraft) {
    draftPolicy = overlayProjectProposal(
      projectDraft.baseline,
      collectProjectProposal(markedFields, draftPolicy),
    );
    renderPolicySections();
    void refreshPolicyPreview();
    return;
  }
  draftPolicy[section].overrides = {};
  renderRules();
  afterEdit();
};

const setDestructiveOverride = (ruleId: string, active: boolean) => {
  if (!projectDraft && active === preview?.rules[ruleId]?.inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? 'on' : 'off';
  markProjectOverride('destructive_command_protection', ruleId);
};
const setSecretOverride = (rule: SecretRule, active: boolean) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? 'on' : 'off';
  markProjectOverride('secret_protection', rule.id);
};

const toggleProtection = async (input: HTMLInputElement) => {
  const secret = input.id === 'secret-enabled';
  if (
    !input.checked &&
    !(await confirmDialog({
      title: secret ? 'Turn off secret protection?' : 'Turn off command protection?',
      body: secret
        ? 'Sensitive files, coding agent credentials, and deny paths stop being blocked until you turn this back on.'
        : 'Built-in destructive git, filesystem, and execution rules stop blocking commands until you turn this back on.',
      detail: secret ? undefined : 'Catastrophic and custom rules still apply.',
      confirmLabel: 'Turn off',
    }))
  ) {
    input.checked = true;
    return;
  }
  if (secret) draftPolicy.secret_protection.enabled = input.checked;
  if (!secret) draftPolicy.destructive_command_protection.enabled = input.checked;
  markProjectField(secret ? 'secret_protection.enabled' : 'destructive_command_protection.enabled');
  renderRules();
  renderPathLists();
  afterEdit(!secret);
};

const handleChange = (control: HTMLInputElement | HTMLSelectElement) => {
  if (control.name === 'safety-level') {
    draftPolicy.safety.level = control.value as SafetyLevel;
    markProjectField('safety.level');
    renderSafety();
    afterEdit();
    return;
  }
  if (control.dataset.safetyOverride) {
    const capability = control.dataset.safetyOverride as Capability;
    if (control.value === 'inherit' && !projectDraft)
      delete draftPolicy.safety.overrides[capability];
    if (control.value !== 'inherit')
      draftPolicy.safety.overrides[capability] = control.value === 'true';
    if (control.value === 'inherit') unmarkProjectField(`safety.overrides.${capability}`);
    if (control.value !== 'inherit') markProjectField(`safety.overrides.${capability}`);
    afterEdit();
    return;
  }
  if (!(control instanceof HTMLInputElement)) return;
  if ('workflowWorktree' in control.dataset) {
    draftPolicy.workflow.worktree_mode = control.checked;
    markProjectField('workflow.worktree_mode');
    afterEdit(false);
    return;
  }
  if (control.id === 'destructive-enabled' || control.id === 'secret-enabled') {
    void toggleProtection(control);
    return;
  }
  const destructiveId = control.dataset.destructiveCommandActive;
  if (destructiveId) {
    setDestructiveOverride(destructiveId, control.checked);
    afterEdit();
    return;
  }
  const secretGroup = control.dataset.secretGroupActive;
  if (secretGroup) {
    state?.secretPatterns
      .filter((rule) => rule.category === secretGroup)
      .forEach((rule) => {
        setSecretOverride(rule, control.checked);
      });
    renderRules();
    afterEdit(false);
    return;
  }
  const secretRule = state?.secretPatterns.find((rule) => rule.id === control.dataset.secretActive);
  if (secretRule) {
    setSecretOverride(secretRule, control.checked);
    renderRules();
    afterEdit(false);
  }
};

const handleClick = (target: Element) => {
  const unmark = target.closest<HTMLElement>('[data-unmark-field]');
  if (unmark) {
    unmarkProjectField(unmark.dataset.unmarkField ?? '');
    return;
  }
  const groupToggle = target.closest<HTMLElement>('[data-group-toggle]');
  if (groupToggle) {
    groupExpanded.set(
      groupToggle.dataset.groupToggle ?? '',
      groupToggle.getAttribute('aria-expanded') !== 'true',
    );
    renderRules();
    return;
  }
  const show = target.closest<HTMLElement>('[data-policy-show]');
  if (show) {
    setChangedOnly(show.dataset.policyShow === 'changed');
    groupExpanded.clear();
    renderRules();
    syncHash();
    return;
  }
  const example = state?.destructiveCommandRules.find(
    (rule) => rule.id === target.closest<HTMLElement>('[data-rule-example]')?.dataset.ruleExample,
  );
  if (example) {
    showRulePopover(target.closest('[data-rule-example]') as HTMLElement, {
      label: example.catastrophic ? 'Always on' : example.category,
      title: example.label,
      description: example.description,
      body: example.example,
    });
    return;
  }
  const secretPaths = state?.secretPatterns.find(
    (rule) => rule.id === target.closest<HTMLElement>('[data-secret-paths]')?.dataset.secretPaths,
  );
  if (secretPaths?.paths) {
    showRulePopover(target.closest('[data-secret-paths]') as HTMLElement, {
      label: 'Protected paths',
      title: secretPaths.label,
      description: '',
      body: secretPaths.paths.join('\n'),
    });
    return;
  }
  const inherited = target.closest<HTMLElement>('[data-use-inherited]');
  if (inherited) {
    const ruleId = inherited.dataset.useInherited ?? '';
    if (projectDraft) {
      unmarkProjectField(`destructive_command_protection.overrides.${ruleId}`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    afterEdit();
    return;
  }
  const secretReset = target.closest<HTMLElement>('[data-secret-reset]');
  if (secretReset) {
    const ruleId = secretReset.dataset.secretReset ?? '';
    if (projectDraft) {
      unmarkProjectField(`secret_protection.overrides.${ruleId}`);
      return;
    }
    delete draftPolicy.secret_protection.overrides[ruleId];
    renderRules();
    afterEdit(false);
    return;
  }
  const addButton = target.closest<HTMLElement>('[data-path-add]');
  if (addButton) {
    void pathListFor(addButton.dataset.pathAdd)?.add(
      qs<HTMLInputElement>(`${addButton.dataset.pathAdd}-input`).value,
    );
    return;
  }
  const removeButton = target.closest<HTMLElement>('[data-path-remove]');
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
};

export const showPolicy = (params: URLSearchParams) => {
  const next = policyFiltersFromParams(params);
  if (policyHash(next) !== policyHash(currentFilters())) {
    qs<HTMLInputElement>('policy-search').value = next.query;
    setChangedOnly(next.changedOnly);
    groupExpanded.clear();
    renderRules();
  }
  if (!next.query) return;
  document
    .querySelector(`[data-rule-row="${CSS.escape(next.query)}"]`)
    ?.scrollIntoView({ block: 'center' });
};

const setRawCopyLabel = () => {
  qs('raw-copy').innerHTML = `${icons.copy}<span>Copy</span>`;
};

export const initPolicy = () => {
  setRawCopyLabel();
  const view = qs('policy-search').closest('[data-view]') as HTMLElement;
  view.addEventListener('change', (event) => {
    const control = event.target;
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement)
      handleChange(control);
  });
  view.addEventListener('click', (event) => {
    if (event.target instanceof Element) handleClick(event.target);
  });
  document.addEventListener('keydown', (event) => {
    if (view.hidden || document.querySelector('dialog[open]')) return;
    if (!(event.target instanceof HTMLElement) || !isSearchShortcut(event, event.target)) return;
    event.preventDefault();
    qs('policy-search').focus();
  });
  qs('policy-search').addEventListener('input', () => {
    groupExpanded.clear();
    renderRules();
    syncHash();
  });
  view.addEventListener('keydown', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || event.key !== 'Enter') return;
    const list = pathListFor(input.dataset.pathInput);
    if (!list) return;
    event.preventDefault();
    void list.add(input.value);
  });
  view.addEventListener('paste', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const list = pathListFor(input.dataset.pathInput);
    const text = event.clipboardData?.getData('text') ?? '';
    if (!list || !text.includes('\n')) return;
    event.preventDefault();
    void list.add(`${input.value}\n${text}`);
  });
  const testerDialog = qs<HTMLDialogElement>('tester-dialog');
  qs('tester-open').addEventListener('click', () => {
    testerDialog.showModal();
    qs<HTMLInputElement>('tester-input').select();
    void runCommandTest();
  });
  qs('tester-form').addEventListener('submit', (event) => {
    event.preventDefault();
    void runCommandTest();
  });
  qs('tester-close').addEventListener('click', () => testerDialog.close());
  qs('tester-result').addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) testerDialog.close();
  });
  qs('scope-user').addEventListener('click', () => {
    void leaveProjectDraft();
  });
  qs('project-draft-enter').addEventListener('click', () => {
    void enterProjectDraft();
  });
  qs('project-draft-change').addEventListener('click', () => {
    void changeProjectDirectory();
  });
  qs('reset-rule-customizations').addEventListener('click', () => {
    void resetOverrides('destructive_command_protection');
  });
  qs('reset-secret-customizations').addEventListener('click', () => {
    void resetOverrides('secret_protection');
  });
  qs('save').addEventListener('click', save);
  qs('discard-changes').addEventListener('click', () => {
    void discard();
  });
  qs('repair').addEventListener('click', () => {
    void repair();
  });
  qs('raw-copy').addEventListener('click', (event) => {
    void copyText(event.currentTarget as HTMLElement, qs<HTMLTextAreaElement>('raw').value);
  });
  window.addEventListener('hashchange', setBanner);
  window.addEventListener('beforeunload', (event) => {
    if (!shared.dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });
};
