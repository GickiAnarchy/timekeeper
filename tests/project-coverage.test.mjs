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

test('the footer links to the GitHub profile and centers the Android download link', () => {
  const markup = readProjectFile('index.html');
  const stylesheet = readProjectFile('styles', 'style.css');
  assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);
  assert.match(markup, /<a class="site-footer-app-link" href="https:\/\/github\.com\/GickiAnarchy\/timekeeper\/releases\/download\/[^"]+"[^>]*><u>Get the app<\/u><\/a>/);
  assert.match(markup, /<div class="site-footer-meta">[\s\S]*?Timekeeping made simple[\s\S]*?version-badge/);
  assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);
  assert.match(stylesheet, /\.site-footer-app-link\s*\{[^}]*justify-self:\s*center;[^}]*\}/);
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

test('invoice labor rows group by employee but retain expandable shift details and reprice paid invoices', () => {
  const invoiceMarkup = readProjectFile('html', 'invoice.html');
  const invoiceScript = readProjectFile('scripts', 'invoice.js');
  const model = readProjectFile('scripts', 'models.js');
  assert.match(invoiceScript, /groupInvoiceItemsByType\(invoice\.items, store\.shifts, store\.employees\)/);
  assert.match(invoiceScript, /className = 'invoice-type-details'/);
  assert.match(invoiceScript, /className = 'invoice-shift-details'/);
  assert.match(invoiceScript, /querySelectorAll\('tr\[data-invoice-row\]'\)/);
  assert.match(readProjectFile('scripts', 'domain.mjs'), /groupInvoiceItemsByEmployee\(localItems, shifts, employees\)/);
  assert.match(invoiceMarkup, /one labor total per employee; expand the row to see every linked shift/i);
  const rateUpdate = model.slice(model.indexOf('async updateCustomerAndLinkedInvoices'), model.indexOf('async deleteCustomer', model.indexOf('async updateCustomerAndLinkedInvoices')));
  assert.match(rateUpdate, /repriceInvoiceShiftItems\(invoice, updates\.billingRate, this\.shifts\)/);
  assert.match(rateUpdate, /batch\.update\(doc\(db, "invoices", invoice\.id\), \{ items \}\)/);
  assert.doesNotMatch(rateUpdate, /invoice\.isPaid/);
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

test('inline add forms and shift-management sections use collapsed native disclosures', () => {
  const people = readProjectFile('html', 'basic-data.html');
  const ledger = readProjectFile('html', 'payledger.html');
  const invoice = readProjectFile('html', 'invoice.html');
  const sharedStyles = readProjectFile('styles', 'ui.css');

  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Employee<\/summary>\s*<form class="add-form" id="add-emp-form">/);
  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Customer<\/summary>\s*<form class="add-form" id="add-cust-form">/);
  assert.match(ledger, /<details class="form-container shift-ledger-container">\s*<summary[^>]*>Add a completed shift<\/summary>[\s\S]*?<form id="shift-ledger-form">/);
  assert.match(ledger, /<details class="form-container ledger-add-container">\s*<summary>Add ledger entry<\/summary>\s*<form id="ledger-form">/);
  assert.doesNotMatch(ledger, /<details\b[^>]*\bopen(?:\s|>)/i);
  assert.match(invoice, /<details class="shift-link-panel">\s*<summary[^>]*>[\s\S]*?Work shifts and labor[\s\S]*?<\/summary>[\s\S]*?id="shift-link-list"/);
  assert.match(sharedStyles, /summary:focus-visible/);
});

test('ledger add controls stay collapsed above a compact, readable table', () => {
  const ledger = readProjectFile('html', 'payledger.html');
  const styles = readProjectFile('styles', 'ledger.css');
  const actionsStart = ledger.indexOf('<section class="ledger-add-actions"');
  const tableStart = ledger.indexOf('<div class="table-div">');
  assert.ok(actionsStart >= 0 && actionsStart < tableStart, 'add controls should precede the table');

  const actionSection = ledger.slice(actionsStart, tableStart);
  assert.match(actionSection, /<details class="form-container shift-ledger-container">/);
  assert.match(actionSection, /<details class="form-container ledger-add-container">/);
  assert.doesNotMatch(actionSection, /<details\b[^>]*\bopen(?:\s|>)/i);
  assert.match(styles, /th, td \{ padding: 6px 10px;[^}]*font-size: 12px/);
  assert.match(styles, /@media \(max-width: 480px\)[\s\S]*?#ledger-table th, #ledger-table td \{[^}]*font-size: 13px/);
  assert.match(styles, /\.ledger-row-actions \{[^}]*flex-wrap: nowrap/);
  assert.match(styles, /\.edit-ledger-btn, \.delete-btn \{ min-height: 32px/);
});

test('Home is a task-oriented launchpad for shifts, jobs due soon, and ledger work', () => {
  const home = readProjectFile('html', 'home.html');
  const script = readProjectFile('scripts', 'home.js');
  const ledger = readProjectFile('scripts', 'ledger.js');
  assert.match(home, /href="clock\.html" target="main-content"/);
  assert.match(home, /href="planned\.html" target="main-content"/);
  assert.match(home, /id="ledger-work-list"/);
  assert.match(home, /href="payledger\.html" target="main-content"/);
  assert.match(script, /await store\.loadLedger\(\)/);
  assert.match(script, /plannedJobUrgency\(job\)\.daysAway/);
  assert.match(script, /daysAway <= 7/);
  assert.match(script, /ledgerBalanceCents\(entries\)/);
  assert.match(script, /payledger\.html\?employee=/);
  assert.match(ledger, /requestedEmployeeId/);
});

test('Shift History keeps filters and its Add action together near the top', () => {
  const markup = readProjectFile('html', 'viewshifts.html');
  const styles = readProjectFile('styles', 'shifts.css');
  const toolbarStart = markup.indexOf('<div class="shift-toolbar">');
  const toolbarEnd = markup.indexOf('</div>\n      <hr>', toolbarStart);
  assert.ok(toolbarStart >= 0 && toolbarEnd > toolbarStart);
  const toolbar = markup.slice(toolbarStart, toolbarEnd);
  assert.match(toolbar, /id="emp-filter"/);
  assert.match(toolbar, /id="cust-filter"/);
  assert.match(toolbar, /id="paid-filter"/);
  assert.match(toolbar, /id="add-button"/);
  assert.match(styles, /\.shift-toolbar \{ display: grid/);
  assert.match(styles, /@media \(max-width: 680px\)[\s\S]*?\.button-div button \{ width: 100%; min-height: 44px/);
});

test('dense mobile records use expandable cards instead of horizontal scrolling', () => {
  const ledgerMarkup = readProjectFile('html', 'payledger.html');
  const ledgerScript = readProjectFile('scripts', 'ledger.js');
  const ledgerStyles = readProjectFile('styles', 'ledger.css');
  const reviewMarkup = readProjectFile('html', 'pay-period-review.html');
  const reviewScript = readProjectFile('scripts', 'pay-period-review.js');
  const reviewStyles = readProjectFile('styles', 'pay-period-review.css');
  const invoiceScript = readProjectFile('scripts', 'invoice.js');
  const invoiceStyles = readProjectFile('styles', 'invoices.css');

  assert.match(ledgerMarkup, /id="ledger-mobile-list"/);
  assert.match(ledgerScript, /className = 'ledger-mobile-card'/);
  assert.match(ledgerScript, /mobileList\.addEventListener\('click', handleLedgerAction\)/);
  assert.match(ledgerStyles, /@media \(max-width: 700px\)[\s\S]*?\.table-div \{ display: none/);
  assert.match(ledgerStyles, /\.ledger-mobile-card > summary[^}]*min-height: 54px/);

  assert.match(reviewMarkup, /id="review-people-mobile"/);
  assert.match(reviewMarkup, /id="review-shifts-mobile"/);
  assert.match(reviewScript, /function reviewCard\(/);
  assert.match(reviewStyles, /@media \(max-width: 760px\)[\s\S]*?\.review-table-wrap \{ display: none/);
  assert.match(reviewStyles, /\.review-mobile-card > summary[^}]*min-height: 52px/);

  assert.match(invoiceScript, /className = 'invoice-type-details'/);
  assert.match(invoiceStyles, /\.table-box \{ overflow: visible/);
  assert.match(invoiceStyles, /#inv-table, #inv-table thead, #inv-table tbody, #inv-table tfoot \{ display: block; width: 100%; min-width: 0/);
  assert.match(invoiceStyles, /\.invoice-type-details > summary \{ min-height: 52px/);
});
