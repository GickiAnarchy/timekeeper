import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlDirectory = join(projectRoot, 'html');
const embeddedPages = readdirSync(htmlDirectory)
  .filter(file => file.endsWith('.html'))
  .sort();

test('every embedded project page loads the shared keyboard-visibility helper', () => {
  assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');
  for (const file of embeddedPages) {
    const markup = readFileSync(join(htmlDirectory, file), 'utf8');
    assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);
  }
});

test('the parent shell monitors keyboard focus and viewport changes in its active iframe', () => {
  const script = readFileSync(join(projectRoot, 'scripts', 'index.js'), 'utf8');
  assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);
  assert.match(script, /frameDocument\.addEventListener\('focusin'/);
  assert.match(script, /visualViewport\?\.addEventListener\('resize'/);
});

test('the footer copyright line links to the requested GitHub profile and preserves footer styling', () => {
  const markup = readFileSync(join(projectRoot, 'index.html'), 'utf8');
  const stylesheet = readFileSync(join(projectRoot, 'styles', 'style.css'), 'utf8');
  assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);
  assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);
});
