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

test('the shell starts in guest mode and offers owner sign-in with a cancelable modal', () => {
  const markup = readFileSync(join(projectRoot, 'index.html'), 'utf8');
  const script = readFileSync(join(projectRoot, 'scripts', 'index.js'), 'utf8');
  const stylesheet = readFileSync(join(projectRoot, 'styles', 'style.css'), 'utf8');
  assert.match(markup, /id="app-shell" data-owner="false"/);
  assert.match(markup, /id="guest-access-badge"/);
  assert.match(markup, /id="sign-in-open-button"/);
  assert.match(markup, /id="owner-signin-dialog"/);
  assert.match(markup, /id="cancel-sign-in"/);
  assert.match(markup, /id="owner-access-badge"[^>]*role="status"[^>]*hidden/);
  assert.match(markup, /<span>OWNER ACCESS<\/span>/);
  assert.match(script, /ownerAccessBadge\.hidden = !isOwner/);
  assert.match(script, /signOutOwner\(\)/);
  assert.match(stylesheet, /\.app-shell\[data-owner="false"\]\s+\[data-owner-only\]/);
  assert.match(stylesheet, /\.permission-badge\[hidden\]\s*\{\s*display:\s*none;/);
});

test('the shared kiosk lets staff choose employees and the owner queue initializes auth before gating', () => {
  const clockMarkup = readFileSync(join(htmlDirectory, 'clock.html'), 'utf8');
  const requestsScript = readFileSync(join(projectRoot, 'scripts', 'requests.js'), 'utf8');
  assert.match(clockMarkup, /<select id="emp-select" multiple/);
  assert.doesNotMatch(clockMarkup, /(?:employee )?(?:pin|access code|passcode)/i);
  assert.match(requestsScript, /async function renderRequests\(\) \{\s*refreshButton\.disabled = true;[\s\S]*?await store\.init\(\);[\s\S]*?if \(!store\.isOwner\)/);
});

test('embedded private fields remain owner-only while guest people and shift actions are requestable', () => {
  const sharedStylesheet = readFileSync(join(projectRoot, 'styles', 'ui.css'), 'utf8');
  const modelScript = readFileSync(join(projectRoot, 'scripts', 'models.js'), 'utf8');
  const dataMarkup = readFileSync(join(htmlDirectory, 'basic-data.html'), 'utf8');
  const shiftMarkup = readFileSync(join(htmlDirectory, 'viewshifts.html'), 'utf8');
  const dataScript = readFileSync(join(projectRoot, 'scripts', 'data.js'), 'utf8');
  const shiftScript = readFileSync(join(projectRoot, 'scripts', 'shifts.js'), 'utf8');
  const clockScript = readFileSync(join(projectRoot, 'scripts', 'clock.js'), 'utf8');
  assert.match(sharedStylesheet, /body:not\(\[data-owner="true"\]\)\s+\[data-owner-only\]\s*\{\s*display:\s*none\s*!important;/);
  assert.match(modelScript, /this\.isOwner = Boolean\(owner\)/);
  assert.match(modelScript, /setAttribute\('data-owner', String\(this\.isOwner\)\)/);
  assert.match(modelScript, /collection\(db, this\.isOwner \? "employees" : "publicEmployees"\)/);
  assert.match(modelScript, /publicShiftData\(shift\)/);

  for (const file of embeddedPages) {
    const markup = readFileSync(join(htmlDirectory, file), 'utf8');
    assert.match(markup, /<body\b[^>]*data-owner="false"/i, `${file} should start in a fail-closed state`);
  }

  assert.doesNotMatch(dataMarkup, /id="add-emp-form"[^>]*data-owner-only/);
  assert.doesNotMatch(dataMarkup, /id="people-edit-modal"[^>]*data-owner-only/);
  assert.match(dataScript, /store\.isOwner \? `\$\{emp\.name\} - \$\$\{emp\.wage\}` : emp\.name/);
  assert.match(dataScript, /store\.isOwner \? String\(record\.wage\) : ''/);
  assert.match(shiftMarkup, /id="add-button">Add Shift/);
  assert.doesNotMatch(shiftMarkup, /id="add-button"[^>]*data-owner-only/);
  assert.match(shiftMarkup, /class="time-row" data-owner-only>[\s\S]*?for="paid-hours"/);
  assert.match(shiftMarkup, /id="shiftNote"/);
  assert.match(shiftMarkup, /class="paid-toggle"[^>]*data-owner-only/);

  const ownerOnlyMarkup = {
    'planned.html': /id="add-button"[^>]*data-owner-only/,
    'payledger.html': /class="form-container" data-owner-only/,
    'invoice.html': /class="invoice-actions" data-owner-only/,
    'settings.html': /class="settings-card" data-owner-only aria-labelledby="backup-title"/
  };
  for (const [file, pattern] of Object.entries(ownerOnlyMarkup)) {
    const markup = readFileSync(join(htmlDirectory, file), 'utf8');
    assert.match(markup, pattern, `${file} should mark write surfaces as owner-only`);
  }

  for (const [file, pattern] of [
    ['planned.js', /actions\.dataset\.ownerOnly = 'true'/],
    ['ledger.js', /actionCell\.dataset\.ownerOnly = 'true'/],
    ['invoice.js', /mark-paid-btn" data-owner-only/]
  ]) {
    const script = readFileSync(join(projectRoot, 'scripts', file), 'utf8');
    assert.match(script, pattern, `${file} should mark dynamically rendered write controls`);
  }
  assert.doesNotMatch(shiftScript, /actions\.dataset\.ownerOnly = 'true'/);
  assert.doesNotMatch(clockScript, /clockOutButton\.dataset\.ownerOnly = 'true'/);
  assert.match(modelScript, /Submitting this change request failed/);
  assert.match(modelScript, /Request \$\{requestId\} was sent to the owner/);
});
