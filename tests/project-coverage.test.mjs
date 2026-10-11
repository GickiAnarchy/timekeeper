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

test('every native data table has accessible sortable controls for each sortable column', () => {
  const tablePages = ['invoice.html', 'payledger.html'];
  for (const file of tablePages) {
    const markup = readFileSync(join(htmlDirectory, file), 'utf8');
    const tables = [...markup.matchAll(/<table\b[\s\S]*?<\/table>/gi)];
    assert.ok(tables.length > 0, `${file} should contain a data table`);
    for (const [table] of tables) {
      const sortableHeaders = [...table.matchAll(/<th\b([^>]*)>([\s\S]*?)<\/th>/gi)]
        .filter(([, attributes]) => /\bdata-sort-key=/.test(attributes));
      assert.ok(sortableHeaders.length > 0, `${file} should declare sortable data columns`);
      for (const [, attributes, content] of sortableHeaders) {
        assert.match(attributes, /\bscope="col"/i, `${file} sortable header should identify its column`);
        assert.match(attributes, /\bdata-sort-type="(?:text|date|number)"/i, `${file} sortable header should declare its sort type`);
        assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i,
          `${file} sortable header should contain a button and visible direction indicator`);
      }
    }
  }
});

test('employee ledger footer includes a separate total-hours summary after the balance', () => {
  const markup = readFileSync(join(htmlDirectory, 'payledger.html'), 'utf8');
  const script = readFileSync(join(projectRoot, 'scripts', 'ledger.js'), 'utf8');
  assert.match(markup, /id="ledger-hours-total"/);
  assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);
  assert.match(script, /sumLedgerHours\(entries\)/);
});
