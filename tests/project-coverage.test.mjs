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

const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');

test('every embedded project page loads the shared keyboard-visibility helper', () => {
  assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');
  for (const file of embeddedPages) {
    const markup = readProjectFile('html', file);
    assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);
  }
});

test('the parent shell monitors keyboard focus and viewport changes in its active iframe', () => {
  const script = readProjectFile('scripts', 'index.js');
  assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);
  assert.match(script, /frameDocument\.addEventListener\('focusin'/);
  assert.match(script, /visualViewport\?\.addEventListener\('resize'/);
});

test('the footer copyright line links to the requested GitHub profile and preserves footer styling', () => {
  const markup = readProjectFile('index.html');
  const stylesheet = readProjectFile('styles', 'style.css');
  assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);
  assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);
});

test('every native data table has accessible sortable controls for each sortable column', () => {
  const tablePages = ['invoice.html', 'payledger.html'];
  for (const file of tablePages) {
    const markup = readProjectFile('html', file);
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
  const markup = readProjectFile('html', 'payledger.html');
  const script = readProjectFile('scripts', 'ledger.js');
  assert.match(markup, /id="ledger-hours-total"/);
  assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);
  assert.match(script, /sumLedgerHours\(entries\)/);
});

test('employee ledger can add completed shifts and offer adjustments to the new entry', () => {
  const markup = readProjectFile('html', 'payledger.html');
  const script = readProjectFile('scripts', 'ledger.js');
  const model = readProjectFile('scripts', 'models.js');
  const domain = readProjectFile('scripts', 'domain.mjs');
  assert.match(markup, /id="shift-ledger-form"/);
  assert.match(markup, /id="ledger-shift-select"/);
  assert.match(script, /Would you like to adjust this ledger entry\?/);
  assert.match(script, /openEditDialog\(entry/);
  assert.match(model, /async saveShiftToLedger\(shiftId\)/);
  assert.match(model, /already been added to the ledger/);
  assert.match(domain, /sourceShiftId: String\(shiftId\)/);
});

test('settled employee ledgers are archived and browsable without losing backup coverage', () => {
  const shell = readProjectFile('index.html');
  const archiveMarkup = readProjectFile('html', 'ledger-archive.html');
  const archiveScript = readProjectFile('scripts', 'ledger-archive.js');
  const model = readProjectFile('scripts', 'models.js');
  const domain = readProjectFile('scripts', 'domain.mjs');
  const settings = readProjectFile('html', 'settings.html');

  assert.match(shell, /data-page="html\/ledger-archive\.html" data-title="Ledger archive"/);
  assert.match(archiveMarkup, /id="archive-employee-filter"/);
  assert.match(archiveScript, /store\.ledgerArchiveRows/);
  assert.match(domain, /export function ledgerBalanceCents/);
  assert.match(model, /async archiveSettledLedger\(employeeId\)/);
  assert.match(model, /ledgerArchives/);
  assert.match(model, /ledgerArchiveRows/);
  assert.match(model, /resumePendingLedgerArchives/);
  assert.match(model, /ledgerArchiveRows: this\.ledgerArchiveRows/);
  assert.match(settings, /archived ledger history/);
});

test('the workspace opens directly to Home without authentication UI or owner-only gates', () => {
  const markup = readProjectFile('index.html');
  const shellScript = readProjectFile('scripts', 'index.js');
  const sharedStylesheet = readProjectFile('styles', 'style.css');
  const embeddedStylesheet = readProjectFile('styles', 'ui.css');

  assert.match(markup, /<iframe[^>]*src="html\/home\.html"/);
  assert.doesNotMatch(markup, /sign.?in|sign.?out|password|guest-access-badge|owner-access-badge/i);
  assert.doesNotMatch(shellScript, /firebase\.js|AuthState|signIn|signOut|isOwner|data-owner-only/i);
  assert.doesNotMatch(sharedStylesheet + embeddedStylesheet, /data-owner-only|data-owner=/i);

  for (const file of embeddedPages) {
    const page = readProjectFile('html', file);
    assert.doesNotMatch(page, /data-owner-only|data-owner=/i, `${file} should have no role-gated controls`);
  }
});

test('the app writes directly to its canonical Firestore collections without request or projection layers', () => {
  const model = readProjectFile('scripts', 'models.js');
  assert.match(model, /collection\(db, "employees"\)/);
  assert.match(model, /collection\(db, "customers"\)/);
  assert.match(model, /collection\(db, "shifts"\)/);
  assert.match(model, /collection\(db, "invoices"\)/);
  assert.match(model, /collection\(db, "payments"\)/);
  assert.match(model, /collection\(db, "ledgerRows"\)/);
  assert.match(model, /collection\(db, "planned"\)/);
  assert.match(model, /setDoc\(doc\(db, "shifts", shift\.id\)/);
  assert.doesNotMatch(model, /publicEmployees|publicCustomers|publicShifts|changeRequests|getCurrentOwner|requireRecentOwnerReauthentication/);
});

test('the no-login clock screen retains multi-employee selection and clock actions', () => {
  const clockMarkup = readProjectFile('html', 'clock.html');
  const clockScript = readProjectFile('scripts', 'clock.js');
  const model = readProjectFile('scripts', 'models.js');
  assert.match(clockMarkup, /<select id="emp-select" multiple/);
  assert.match(clockMarkup, /id="clock-in-button"/);
  assert.match(clockScript, /saveShifts\(shifts\)/);
  assert.match(model, /async saveShifts\(shifts\)/);
  assert.match(model, /async saveShift\(shift\)/);
});

test('Firestore rules intentionally grant public read/write access recursively', () => {
  const rules = readProjectFile('firestore.rules');
  assert.match(rules, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if true;\s*\}/);
  assert.doesNotMatch(rules, /request\.auth|isOwner|isGuest|hasRecentOwnerAuthentication/);
});
