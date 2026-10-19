import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { guiDocument } from '@/gui/assets';
import { en } from '@/gui/frontend/locales/en';
import { renderPolicyGuiHtml } from '@/gui/page';

const FRONTEND = join(import.meta.dir, '..', '..', 'src', 'gui', 'frontend');
const asset = (name: string) => readFileSync(join(FRONTEND, name), 'utf-8');

const TOKEN = Buffer.from('cc-safety-net gui page fixture').toString('base64url');

const dataPayload = (html: string) => {
  const match = html.match(/<script id="ccsn-data" type="application\/json">([^<]*)<\/script>/);
  return JSON.parse(match?.[1] ?? '') as unknown;
};

describe('the served GUI page', () => {
  test('is the packaged document with the session token and preferences folded in', () => {
    const data = { token: TOKEN, preferences: { language: 'ja', theme: 'dark' } } as const;
    const rendered = renderPolicyGuiHtml(data);

    expect(rendered.replace(JSON.stringify(data), '')).toBe(guiDocument);
    expect(dataPayload(rendered)).toStrictEqual(data);
  });

  test('a token that closes the data tag parses back to itself on both sides', () => {
    const hostile = `${Buffer.from('hostile').toString('base64url')}</script><script>alert(1)`;
    const page = renderPolicyGuiHtml({ token: hostile, preferences: {} });

    expect(page).not.toContain(`${hostile}</script>`);
    expect(dataPayload(page)).toStrictEqual({ token: hostile, preferences: {} });
  });

  test('carries the stylesheet, the icon and the logo inline and links nothing', () => {
    expect(guiDocument).toContain(`<style>\n${asset('custom.css')}\n  </style>`);
    expect(guiDocument).toContain('<link rel="icon" href="data:image/svg+xml,');
    expect(guiDocument).toContain(
      `<a class="brand-home" href="#overview" data-i18n-title="navOverview">${asset('logo.svg')}</a>`,
    );
    expect(guiDocument).not.toContain('<link rel="stylesheet"');
    expect(guiDocument).not.toContain('<script src=');
  });

  test('names only messages the English dictionary has as text', () => {
    const keys = [...asset('page.html').matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)].map(
      (match) => match[1] ?? '',
    );
    const messages: Record<string, unknown> = en;

    expect(keys.length).toBeGreaterThan(100);
    expect(keys.filter((key) => typeof messages[key] !== 'string')).toEqual([]);
  });
});
