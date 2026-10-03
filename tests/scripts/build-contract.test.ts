import { describe, expect, test } from 'bun:test';
import { chmodSync, mkdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AMP_MANAGED_HEADER, buildAmpArtifactHeader } from '@/hosts/amp/artifact';
import {
  buildOpenClawArtifactHeader,
  buildOpenClawPluginManifests,
} from '@/hosts/openclaw/artifact';
import pkg from '../../package.json';
import { buildRuntimeBundles } from '../../scripts/build-runtime';
import {
  getRuntimeImportSpecifiers,
  unbundledRuntimeImports,
  verifyBuildArtifacts,
} from '../../scripts/verify-build';
import { withTempDir } from '../helpers';

function writeBuildFixture(directory: string) {
  mkdirSync(join(directory, 'dist', 'bin'), { recursive: true });
  mkdirSync(join(directory, 'dist', 'chunks'), { recursive: true });
  mkdirSync(join(directory, 'dist', 'pi'), { recursive: true });
  mkdirSync(join(directory, 'dist', 'deepseek-harness'), { recursive: true });
  mkdirSync(join(directory, 'dist', 'amp', 'cc-safety-net'), { recursive: true });
  mkdirSync(join(directory, 'dist', 'openclaw', 'cc-safety-net'), { recursive: true });
  writeFileSync(
    join(directory, 'dist', 'bin', 'cc-safety-net.js'),
    '#!/usr/bin/env node\nrequire("./hook.js");\n',
  );
  chmodSync(join(directory, 'dist', 'bin', 'cc-safety-net.js'), 0o755);
  writeFileSync(join(directory, 'dist', 'bin', 'hook.js'), 'import("../cli.js");\n');
  writeFileSync(join(directory, 'dist', 'bin', 'package.json'), '{"type":"commonjs"}\n');
  writeFileSync(join(directory, 'dist', 'cli.js'), 'import "./chunks/index-fixture.js";\n');
  writeFileSync(join(directory, 'dist', 'chunks', 'index-fixture.js'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'api.d.ts'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'api.js'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'index.d.ts'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'opencode-v2.d.ts'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'index.js'), 'import "./chunks/index-fixture.js";\n');
  writeFileSync(join(directory, 'dist', 'pi', 'index.js'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'deepseek-harness', 'index.js'), 'export {};\n');
  writeFileSync(join(directory, 'dist', 'deepseek-harness', 'cordis.patch.yml'), '[]\n');
  writeFileSync(
    join(directory, 'dist', 'amp', 'cc-safety-net', 'index.ts'),
    `${buildAmpArtifactHeader(pkg.version)}export {};\n`,
  );
  writeFileSync(
    join(directory, 'dist', 'openclaw', 'cc-safety-net', 'index.js'),
    `${buildOpenClawArtifactHeader(pkg.version)}export {};\n`,
  );
  buildOpenClawPluginManifests(pkg.version).forEach((file) => {
    writeFileSync(join(directory, 'dist', 'openclaw', 'cc-safety-net', file.name), file.content);
  });
}

describe('generated artifact contract', () => {
  test('built runtime bundles enforce custom rules without node_modules', async () => {
    await withTempDir('cc-safety-net-build-standalone-', async (directory) => {
      const result = await buildRuntimeBundles(join(directory, 'dist'));
      expect(result.success).toBeTrue();
      writeFileSync(join(directory, 'package.json'), '{"type":"module"}\n');
      const home = join(directory, 'home');
      const rules = join(home, '.cc-safety-net', 'rules');
      mkdirSync(join(rules, 'user-rules'), { recursive: true });
      const rulebook = JSON.stringify({
        rulebook_version: 1,
        name: 'user-rules',
        version: '1.0.0',
        allowed_commands: ['docker'],
        rules: [
          {
            name: 'block-docker-system-prune',
            command: 'docker',
            subcommand: 'system',
            block_args: ['prune'],
            reason: 'Use targeted cleanup instead.',
          },
        ],
      });
      writeFileSync(join(rules, 'user-rules', 'rulebook.json'), rulebook);
      writeFileSync(
        join(rules, 'rule.json'),
        JSON.stringify({ version: 1, rules: ['user-rules'] }),
      );
      const proc = Bun.spawnSync(
        ['node', join(directory, 'dist', 'bin', 'cc-safety-net.js'), 'hook', '--coding-cli'],
        {
          cwd: directory,
          stdin: Buffer.from(
            JSON.stringify({
              hook_event_name: 'PreToolUse',
              tool_name: 'Bash',
              tool_input: { command: 'docker system prune' },
            }),
          ),
          stdout: 'pipe',
          stderr: 'pipe',
          env: {
            ...process.env,
            HOME: home,
            USERPROFILE: home,
            CC_SAFETY_NET_HOME: join(home, '.cc-safety-net'),
            CC_SAFETY_NET_AUDIT_HOME: home,
            NODE_PATH: '',
          },
        },
      );

      expect(proc.stderr.toString()).toBe('');
      expect(proc.exitCode).toBe(0);
      expect(proc.stdout.toString()).toContain('custom.user-rules/block-docker-system-prune');
    });
  });

  test('only matches real import, dynamic-import, and require positions', () => {
    expect(getRuntimeImportSpecifiers('import{x}from"node:fs";').sort()).toEqual(['node:fs']);
    expect(getRuntimeImportSpecifiers('const z=require("zod")')).toEqual(['zod']);
    expect(getRuntimeImportSpecifiers('await import("./chunks/a.js")')).toEqual(['./chunks/a.js']);
    expect(getRuntimeImportSpecifiers('const flags=["--import","--loader"]')).toEqual([]);
    expect(getRuntimeImportSpecifiers('const flags=["-files0-from","-print"]')).toEqual([]);
  });

  test('flags any non-builtin specifier as an unbundled runtime import', () => {
    expect(unbundledRuntimeImports('import"node:path";import{z}from"crypto"')).toEqual([]);
    expect(unbundledRuntimeImports('const z=require("zod")')).toEqual(['zod']);
    expect(unbundledRuntimeImports('import x from"@/core/foo"')).toEqual(['@/core/foo']);
  });

  test('rejects managed artifacts missing their header, version, or self-containment', async () => {
    await withTempDir('cc-safety-net-build-amp-', async (directory) => {
      writeBuildFixture(directory);
      const originalCwd = process.cwd();
      process.chdir(directory);
      try {
        writeFileSync('dist/amp/cc-safety-net/index.ts', 'export {};\n');
        await expect(verifyBuildArtifacts()).rejects.toThrow('managed-file header');

        writeFileSync('dist/amp/cc-safety-net/index.ts', `${AMP_MANAGED_HEADER}\nexport {};\n`);
        await expect(verifyBuildArtifacts()).rejects.toThrow('package version');

        writeFileSync(
          'dist/amp/cc-safety-net/index.ts',
          `${buildAmpArtifactHeader(pkg.version)}export {};\n`,
        );
        writeFileSync(
          'dist/openclaw/cc-safety-net/index.js',
          `${buildOpenClawArtifactHeader(pkg.version)}import z from "zod";\n`,
        );
        await expect(verifyBuildArtifacts()).rejects.toThrow('unresolved runtime imports');
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  test('rejects unexpected files, orphaned or missing chunks, and a non-executable bin or wrong shebang', async () => {
    await withTempDir('cc-safety-net-build-contract-', async (directory) => {
      writeBuildFixture(directory);
      const originalCwd = process.cwd();
      process.chdir(directory);
      try {
        writeFileSync('dist/unexpected.js', 'export {};\n');
        await expect(verifyBuildArtifacts()).rejects.toThrow('Unexpected build artifacts');

        unlinkSync('dist/unexpected.js');
        writeFileSync('dist/chunks/index-orphan.js', 'export {};\n');
        await expect(verifyBuildArtifacts()).rejects.toThrow('orphaned shared chunks');

        unlinkSync('dist/chunks/index-orphan.js');
        unlinkSync('dist/chunks/index-fixture.js');
        await expect(verifyBuildArtifacts()).rejects.toThrow('missing shared chunks');

        writeFileSync('dist/chunks/index-fixture.js', 'export {};\n');
        if (process.platform !== 'win32') {
          chmodSync('dist/bin/cc-safety-net.js', 0o644);
          await expect(verifyBuildArtifacts()).rejects.toThrow('must have mode 0755');
          chmodSync('dist/bin/cc-safety-net.js', 0o755);
        }

        writeFileSync('dist/bin/cc-safety-net.js', 'export {};\n');
        await expect(verifyBuildArtifacts()).rejects.toThrow('wrong shebang');
      } finally {
        process.chdir(originalCwd);
      }
    });
  });
});
