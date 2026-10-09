import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';
import { buildPluginTree, verifyPluginTree } from '../../scripts/build-plugin-tree';
import { createTempRoot, isolatedSpawnEnv, removeTempRoots } from '../helpers/temp-home';

const MANIFESTS = [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  'kimi.plugin.json',
  'hooks/hooks.json',
  'hooks/codex.json',
  'hooks/cursor.json',
];

const claudeShapedPayload = (command: string, cwd: string) => ({
  hook_event_name: 'PreToolUse',
  session_id: 'plugin-tree',
  cwd,
  tool_name: 'Bash',
  tool_input: { command },
  tool_call_id: 'plugin-tree-tool-call',
});
const claudeShapedReason = (output: { hookSpecificOutput: Record<string, string> }) =>
  output.hookSpecificOutput.permissionDecision === 'deny'
    ? output.hookSpecificOutput.permissionDecisionReason
    : undefined;

const HOSTS = [
  ['--coding-cli', claudeShapedPayload, claudeShapedReason],
  ['--codex', claudeShapedPayload, claudeShapedReason],
  ['--kimi-code', claudeShapedPayload, claudeShapedReason],
  [
    '--cursor',
    (command: string, cwd: string) => ({
      conversation_id: 'plugin-tree',
      hook_event_name: 'preToolUse',
      cwd,
      workspace_roots: [cwd],
      tool_name: 'Shell',
      tool_input: { command },
    }),
    (output: { permission: string; user_message: string }) =>
      output.permission === 'deny' ? output.user_message : undefined,
  ],
] as const;

const listFiles = (directory: string) =>
  [...new Bun.Glob('**/*').scanSync({ cwd: directory, onlyFiles: true, dot: true })]
    .map((path) => path.replaceAll(sep, '/'))
    .sort();

function writeTree(files: Record<string, string>) {
  const tree = createTempRoot('cc-safety-net-plugin-tree-fixture-');
  Object.entries(files).forEach(([path, content]) => {
    mkdirSync(dirname(join(tree, path)), { recursive: true });
    writeFileSync(join(tree, path), content);
  });
  return tree;
}

afterAll(removeTempRoots);

describe('the plugin tree', () => {
  const tree = join(createTempRoot('cc-safety-net-plugin-tree-'), 'tree');

  beforeAll(async () => {
    await buildPluginTree(tree);
  }, 60_000);

  test('holds exactly the plugin manifests, the skill, the logo and the readable hook build', () => {
    expect(listFiles(tree)).toEqual([
      '.claude-plugin/plugin.json',
      '.codex-plugin/plugin.json',
      '.cursor-plugin/marketplace.json',
      '.cursor-plugin/plugin.json',
      'dist/bin/analyzer-core.js',
      'dist/bin/analyzer.js',
      'dist/bin/cc-safety-net.js',
      'dist/bin/core-shell.js',
      'dist/bin/core.js',
      'dist/bin/gate.js',
      'dist/bin/hook.js',
      'dist/bin/package.json',
      'hooks/codex.json',
      'hooks/cursor.json',
      'hooks/hooks.json',
      'kimi.plugin.json',
      'skills/cc-safety-net/SKILL.md',
      'skills/cc-safety-net/agents/openai.yaml',
      'src/gui/frontend/favicon.svg',
    ]);
  });

  test('copies every manifest verbatim and ships each path they reference', () => {
    MANIFESTS.forEach((path) =>
      expect(readFileSync(join(tree, path), 'utf8')).toBe(readFileSync(path, 'utf8')),
    );
    const codex = JSON.parse(readFileSync(join(tree, '.codex-plugin/plugin.json'), 'utf8'));
    const cursor = JSON.parse(readFileSync(join(tree, '.cursor-plugin/plugin.json'), 'utf8'));
    const kimi = JSON.parse(readFileSync(join(tree, 'kimi.plugin.json'), 'utf8'));
    const files = listFiles(tree);
    [
      codex.skills,
      codex.hooks,
      codex.interface.logo,
      codex.interface.composerIcon,
      cursor.logo,
      cursor.hooks,
      kimi.skills,
    ]
      .map((path: string) => path.replace(/^\.\//, ''))
      .forEach((path) => expect(files.some((file) => file.startsWith(path))).toBeTrue());
  });

  test('lists itself as the only plugin of a Cursor marketplace at the tree root', () => {
    expect(JSON.parse(readFileSync(join(tree, '.cursor-plugin/marketplace.json'), 'utf8'))).toEqual(
      {
        name: 'cc-safety-net',
        owner: { name: 'J Liew', email: 'jliew@420024lab.com' },
        plugins: [
          {
            name: 'cc-safety-net',
            source: './',
            description: 'Block destructive commands and secret access',
          },
        ],
      },
    );
  });

  test('stays within the plugin directory limits', () => {
    expect(verifyPluginTree(tree)).toEqual([]);
  });

  test.each(HOSTS)('the hook %s blocks git reset --hard from the tree', (flag, payload, reason) => {
    const home = createTempRoot('cc-safety-net-plugin-tree-home-');
    const proc = Bun.spawnSync(
      ['node', join(tree, 'dist', 'bin', 'cc-safety-net.js'), 'hook', flag],
      {
        cwd: home,
        stdin: Buffer.from(JSON.stringify(payload('git reset --hard', home))),
        stdout: 'pipe',
        stderr: 'pipe',
        env: isolatedSpawnEnv(home),
      },
    );

    expect(proc.stderr.toString()).toBe('');
    expect(proc.exitCode).toBe(0);
    expect(reason(JSON.parse(proc.stdout.toString()))).toContain('git.reset-hard');
  });
});

describe('the plugin tree verifier', () => {
  const kibLines = (count: number) => `${'x'.repeat(1023)}\n`.repeat(count);

  test.each([
    ['a file just under 256 KiB', { 'dist/bin/hook.js': kibLines(256).slice(1) }, []],
    [
      'a file of 256 KiB',
      { 'dist/bin/hook.js': kibLines(256) },
      ['dist/bin/hook.js is 262144 bytes; the limit is under 262144'],
    ],
    [
      '513 files',
      Object.fromEntries(Array.from({ length: 513 }, (_, index) => [`f/${index}.md`, ''])),
      ['the tree has 513 files; the limit is 512'],
    ],
    ['512 files', Object.fromEntries(Array.from({ length: 512 }, (_, i) => [`f/${i}.md`, ''])), []],
    [
      'a package.json beside a lockfile at the root',
      { 'package.json': '{}', 'bun.lock': '{}' },
      ['package.json sits beside bun.lock at the tree root'],
    ],
    ['a package.json below the root', { 'dist/bin/package.json': '{}', 'bun.lock': '{}' }, []],
  ] as const)('judges %s', (_name, files, problems) => {
    expect(verifyPluginTree(writeTree(files))).toEqual([...problems]);
  });

  test('rejects minified hook output and accepts a long readable line', () => {
    const tree = writeTree({ 'dist/bin/gate.js': `const x = ${'1 + '.repeat(500)}1;\n` });
    expect(verifyPluginTree(tree)).toEqual([]);

    writeFileSync(
      join(tree, 'dist/bin/hook.js'),
      readFileSync('dist/bin/hook.js', 'utf8').slice(0, 128 * 1024),
    );
    expect(verifyPluginTree(tree)).toEqual([
      expect.stringMatching(/^dist\/bin\/hook\.js has a \d+-character line; minified output/),
    ]);
  });
});
