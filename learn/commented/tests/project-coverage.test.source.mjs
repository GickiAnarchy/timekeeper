// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { readdirSync, readFileSync } from 'node:fs';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { dirname, join, resolve } from 'node:path';
// Original L5: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { fileURLToPath } from 'node:url';
// Original L6: Blank line separates related setup or assertions for readability.

// Original L7: Initializes projectRoot for 'test setup', supplying the value that the following test logic will inspect or mutate.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Original L8: Initializes htmlDirectory for 'test setup', supplying the value that the following test logic will inspect or mutate.
const htmlDirectory = join(projectRoot, 'html');
// Original L9: Initializes embeddedPages for 'test setup', supplying the value that the following test logic will inspect or mutate.
const embeddedPages = readdirSync(htmlDirectory)
// Original L10: Calls `file.endsWith` with ".html".
  .filter(file => file.endsWith('.html'))
// Original L11: Continues the surrounding JavaScript expression or argument list. This line contributes .sort();; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  .sort();
// Original L12: Blank line separates related setup or assertions for readability.

// Original L13: Initializes readProjectFile for 'test setup', supplying the value that the following test logic will inspect or mutate.
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');
// Original L14: Blank line separates related setup or assertions for readability.

// Original L15: Starts an isolated test case whose title states the behavior being specified: every embedded project page loads the shared keyboard-visibility helper.
test('every embedded project page loads the shared keyboard-visibility helper', () => {
// Original L16: In the test 'every embedded project page loads the shared keyboard-visibility helper', this truthiness assertion requires the concrete condition to hold: assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');
// Original L17: Controls iteration/branching in the 'every embedded project page loads the shared keyboard-visibility helper' test so each relevant fixture or environment condition is exercised.
  for (const file of embeddedPages) {
// Original L18: Initializes markup for 'every embedded project page loads the shared keyboard-visibility helper', supplying the value that the following test logic will inspect or mutate.
    const markup = readProjectFile('html', file);
// Original L19: In the test 'every embedded project page loads the shared keyboard-visibility helper', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
    assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);
// Original L20: Closes the fixture, callback, loop, or test block for 'every embedded project page loads the shared keyboard-visibility helper'.
  }
// Original L21: Closes the fixture, callback, loop, or test block for 'every embedded project page loads the shared keyboard-visibility helper'.
});
// Original L22: Blank line separates related setup or assertions for readability.

// Original L23: Starts an isolated test case whose title states the behavior being specified: the parent shell monitors keyboard focus and viewport changes in its active iframe.
test('the parent shell monitors keyboard focus and viewport changes in its active iframe', () => {
// Original L24: Initializes script for 'the parent shell monitors keyboard focus and viewport changes in its active iframe', supplying the value that the following test logic will inspect or mutate.
  const script = readProjectFile('scripts', 'index.js');
// Original L25: In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);
// Original L26: In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /frameDocument\.addEventListener\('focusin'/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /frameDocument\.addEventListener\('focusin'/);
// Original L27: In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /visualViewport\?\.addEventListener\('resize'/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /visualViewport\?\.addEventListener\('resize'/);
// Original L28: Closes the fixture, callback, loop, or test block for 'the parent shell monitors keyboard focus and viewport changes in its active iframe'.
});
// Original L29: Blank line separates related setup or assertions for readability.

// Original L30: Starts an isolated test case whose title states the behavior being specified: the footer links to the GitHub profile and centers the Android download link.
test('the footer links to the GitHub profile and centers the Android download link', () => {
// Original L31: Initializes markup for 'the footer links to the GitHub profile and centers the Android download link', supplying the value that the following test logic will inspect or mutate.
  const markup = readProjectFile('index.html');
// Original L32: Initializes stylesheet for 'the footer links to the GitHub profile and centers the Android download link', supplying the value that the following test logic will inspect or mutate.
  const stylesheet = readProjectFile('styles', 'style.css');
// Original L33: In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);
// Original L34: In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<a class="site-footer-app-link" href="https:\/\/github\.com\/GickiAnarchy\/timekeeper\/releases\/download\/[^"]+"[^>]*><u>Get the app<\/u><\/a>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /<a class="site-footer-app-link" href="https:\/\/github\.com\/GickiAnarchy\/timekeeper\/releases\/download\/[^"]+"[^>]*><u>Get the app<\/u><\/a>/);
// Original L35: In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<div class="site-footer-meta">[\s\S]*?Timekeeping made simple[\s\S]*?version-badge/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /<div class="site-footer-meta">[\s\S]*?Timekeeping made simple[\s\S]*?version-badge/);
// Original L36: In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);
// Original L37: In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(stylesheet, /\.site-footer-app-link\s*\{[^}]*justify-self:\s*center;[^}]*\}/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(stylesheet, /\.site-footer-app-link\s*\{[^}]*justify-self:\s*center;[^}]*\}/);
// Original L38: Closes the fixture, callback, loop, or test block for 'the footer links to the GitHub profile and centers the Android download link'.
});
// Original L39: Blank line separates related setup or assertions for readability.

// Original L40: Starts an isolated test case whose title states the behavior being specified: every native data table has accessible sortable controls for each sortable column.
test('every native data table has accessible sortable controls for each sortable column', () => {
// Original L41: Builds tablePages, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.
  const tablePages = ['invoice.html', 'payledger.html'];
// Original L42: Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.
  for (const file of tablePages) {
// Original L43: Initializes markup for 'every native data table has accessible sortable controls for each sortable column', supplying the value that the following test logic will inspect or mutate.
    const markup = readProjectFile('html', file);
// Original L44: Builds tables, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.
    const tables = [...markup.matchAll(/<table\b[\s\S]*?<\/table>/gi)];
// Original L45: In the test 'every native data table has accessible sortable controls for each sortable column', this truthiness assertion requires the concrete condition to hold: assert.ok(tables.length > 0, `${file} should contain a data table`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok(tables.length > 0, `${file} should contain a data table`);
// Original L46: Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.
    for (const [table] of tables) {
// Original L47: Builds sortableHeaders, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.
      const sortableHeaders = [...table.matchAll(/<th\b([^>]*)>([\s\S]*?)<\/th>/gi)]
// Original L48: Checks whether the regular expression the regular expression `/\bdata-sort-key=/` used to match text matches `attributes` (attributes).
        .filter(([, attributes]) => /\bdata-sort-key=/.test(attributes));
// Original L49: In the test 'every native data table has accessible sortable controls for each sortable column', this truthiness assertion requires the concrete condition to hold: assert.ok(sortableHeaders.length > 0, `${file} should declare sortable data columns`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
      assert.ok(sortableHeaders.length > 0, `${file} should declare sortable data columns`);
// Original L50: Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.
      for (const [, attributes, content] of sortableHeaders) {
// Original L51: In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(attributes, /\bscope="col"/i, `${file} sortable header should identify its column`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
        assert.match(attributes, /\bscope="col"/i, `${file} sortable header should identify its column`);
// Original L52: In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(attributes, /\bdata-sort-type="(?:text|date|number)"/i, `${file} sortable header should declare its sort type`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
        assert.match(attributes, /\bdata-sort-type="(?:text|date|number)"/i, `${file} sortable header should declare its sort type`);
// Original L53: In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i, `${file} sortable header should contain a button and visible direction indicator`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
        assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i,
// Original L54: In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i, `${file} sortable header should contain a button and visible direction indicator`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
          `${file} sortable header should contain a button and visible direction indicator`);
// Original L55: Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.
      }
// Original L56: Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.
    }
// Original L57: Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.
  }
// Original L58: Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.
});
// Original L59: Blank line separates related setup or assertions for readability.

// Original L60: Starts an isolated test case whose title states the behavior being specified: employee ledger footer includes a separate total-hours summary after the balance.
test('employee ledger footer includes a separate total-hours summary after the balance', () => {
// Original L61: Initializes markup for 'employee ledger footer includes a separate total-hours summary after the balance', supplying the value that the following test logic will inspect or mutate.
  const markup = readProjectFile('html', 'payledger.html');
// Original L62: Initializes script for 'employee ledger footer includes a separate total-hours summary after the balance', supplying the value that the following test logic will inspect or mutate.
  const script = readProjectFile('scripts', 'ledger.js');
// Original L63: In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="ledger-hours-total"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /id="ledger-hours-total"/);
// Original L64: In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);
// Original L65: In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /sumLedgerHours\(entries\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /sumLedgerHours\(entries\)/);
// Original L66: Closes the fixture, callback, loop, or test block for 'employee ledger footer includes a separate total-hours summary after the balance'.
});
// Original L67: Blank line separates related setup or assertions for readability.

// Original L68: Starts an isolated test case whose title states the behavior being specified: employee ledger can add completed shifts and offer adjustments to the new entry.
test('employee ledger can add completed shifts and offer adjustments to the new entry', () => {
// Original L69: Initializes markup for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.
  const markup = readProjectFile('html', 'payledger.html');
// Original L70: Initializes script for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.
  const script = readProjectFile('scripts', 'ledger.js');
// Original L71: Initializes model for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.
  const model = readProjectFile('scripts', 'models.js');
// Original L72: Initializes domain for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.
  const domain = readProjectFile('scripts', 'domain.mjs');
// Original L73: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="shift-ledger-form"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /id="shift-ledger-form"/);
// Original L74: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="ledger-shift-select"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /id="ledger-shift-select"/);
// Original L75: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /Would you like to adjust this ledger entry\?/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /Would you like to adjust this ledger entry\?/);
// Original L76: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /openEditDialog\(entry/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(script, /openEditDialog\(entry/);
// Original L77: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShiftToLedger\(shiftId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /async saveShiftToLedger\(shiftId\)/);
// Original L78: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /already been added to the ledger/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /already been added to the ledger/);
// Original L79: In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(domain, /sourceShiftId: String\(shiftId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(domain, /sourceShiftId: String\(shiftId\)/);
// Original L80: Closes the fixture, callback, loop, or test block for 'employee ledger can add completed shifts and offer adjustments to the new entry'.
});
// Original L81: Blank line separates related setup or assertions for readability.

// Original L82: Starts an isolated test case whose title states the behavior being specified: settled employee ledgers are archived and browsable without losing backup coverage.
test('settled employee ledgers are archived and browsable without losing backup coverage', () => {
// Original L83: Initializes shell for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const shell = readProjectFile('index.html');
// Original L84: Initializes archiveMarkup for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const archiveMarkup = readProjectFile('html', 'ledger-archive.html');
// Original L85: Initializes archiveScript for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const archiveScript = readProjectFile('scripts', 'ledger-archive.js');
// Original L86: Initializes model for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const model = readProjectFile('scripts', 'models.js');
// Original L87: Initializes domain for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const domain = readProjectFile('scripts', 'domain.mjs');
// Original L88: Initializes settings for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.
  const settings = readProjectFile('html', 'settings.html');
// Original L89: Blank line separates related setup or assertions for readability.

// Original L90: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(shell, /data-page="html\/ledger-archive\.html" data-title="Ledger archive"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(shell, /data-page="html\/ledger-archive\.html" data-title="Ledger archive"/);
// Original L91: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(archiveMarkup, /id="archive-employee-filter"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(archiveMarkup, /id="archive-employee-filter"/);
// Original L92: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(archiveScript, /store\.ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(archiveScript, /store\.ledgerArchiveRows/);
// Original L93: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(domain, /export function ledgerBalanceCents/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(domain, /export function ledgerBalanceCents/);
// Original L94: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async archiveSettledLedger\(employeeId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /async archiveSettledLedger\(employeeId\)/);
// Original L95: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchives/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /ledgerArchives/);
// Original L96: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /ledgerArchiveRows/);
// Original L97: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /resumePendingLedgerArchives/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /resumePendingLedgerArchives/);
// Original L98: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchiveRows: this\.ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /ledgerArchiveRows: this\.ledgerArchiveRows/);
// Original L99: In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(settings, /archived ledger history/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(settings, /archived ledger history/);
// Original L100: Closes the fixture, callback, loop, or test block for 'settled employee ledgers are archived and browsable without losing backup coverage'.
});
// Original L101: Blank line separates related setup or assertions for readability.

// Original L102: Starts an isolated test case whose title states the behavior being specified: the workspace opens directly to Home without authentication UI or owner-only gates.
test('the workspace opens directly to Home without authentication UI or owner-only gates', () => {
// Original L103: Initializes markup for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.
  const markup = readProjectFile('index.html');
// Original L104: Initializes shellScript for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.
  const shellScript = readProjectFile('scripts', 'index.js');
// Original L105: Initializes sharedStylesheet for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.
  const sharedStylesheet = readProjectFile('styles', 'style.css');
// Original L106: Initializes embeddedStylesheet for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.
  const embeddedStylesheet = readProjectFile('styles', 'ui.css');
// Original L107: Blank line separates related setup or assertions for readability.

// Original L108: In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<iframe[^>]*src="html\/home\.html"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(markup, /<iframe[^>]*src="html\/home\.html"/);
// Original L109: In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(markup, /sign.?in|sign.?out|password|guest-access-badge|owner-access-badge/i);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(markup, /sign.?in|sign.?out|password|guest-access-badge|owner-access-badge/i);
// Original L110: In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(shellScript, /firebase\.js|AuthState|signIn|signOut|isOwner|data-owner-only/i);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(shellScript, /firebase\.js|AuthState|signIn|signOut|isOwner|data-owner-only/i);
// Original L111: In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(sharedStylesheet + embeddedStylesheet, /data-owner-only|data-owner=/i);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(sharedStylesheet + embeddedStylesheet, /data-owner-only|data-owner=/i);
// Original L112: Blank line separates related setup or assertions for readability.

// Original L113: Controls iteration/branching in the 'the workspace opens directly to Home without authentication UI or owner-only gates' test so each relevant fixture or environment condition is exercised.
  for (const file of embeddedPages) {
// Original L114: Initializes page for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.
    const page = readProjectFile('html', file);
// Original L115: In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(page, /data-owner-only|data-owner=/i, `${file} should have no role-gated controls`);; it proves the removed authentication/role/UI path is absent.
    assert.doesNotMatch(page, /data-owner-only|data-owner=/i, `${file} should have no role-gated controls`);
// Original L116: Closes the fixture, callback, loop, or test block for 'the workspace opens directly to Home without authentication UI or owner-only gates'.
  }
// Original L117: Closes the fixture, callback, loop, or test block for 'the workspace opens directly to Home without authentication UI or owner-only gates'.
});
// Original L118: Blank line separates related setup or assertions for readability.

// Original L119: Starts an isolated test case whose title states the behavior being specified: the app writes directly to its canonical Firestore collections without request or projection layers.
test('the app writes directly to its canonical Firestore collections without request or projection layers', () => {
// Original L120: Initializes model for 'the app writes directly to its canonical Firestore collections without request or projection layers', supplying the value that the following test logic will inspect or mutate.
  const model = readProjectFile('scripts', 'models.js');
// Original L121: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "employees"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "employees"\)/);
// Original L122: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "customers"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "customers"\)/);
// Original L123: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "shifts"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "shifts"\)/);
// Original L124: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "invoices"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "invoices"\)/);
// Original L125: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "payments"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "payments"\)/);
// Original L126: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "ledgerRows"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "ledgerRows"\)/);
// Original L127: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "planned"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /collection\(db, "planned"\)/);
// Original L128: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /setDoc\(doc\(db, "shifts", shift\.id\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /setDoc\(doc\(db, "shifts", shift\.id\)/);
// Original L129: In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(model, /publicEmployees|publicCustomers|publicShifts|changeRequests|getCurrentOwner|requireRecentOwnerReauthentication/);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(model, /publicEmployees|publicCustomers|publicShifts|changeRequests|getCurrentOwner|requireRecentOwnerReauthentication/);
// Original L130: Closes the fixture, callback, loop, or test block for 'the app writes directly to its canonical Firestore collections without request or projection layers'.
});
// Original L131: Blank line separates related setup or assertions for readability.

// Original L132: Starts an isolated test case whose title states the behavior being specified: the no-login clock screen retains multi-employee selection and clock actions.
test('the no-login clock screen retains multi-employee selection and clock actions', () => {
// Original L133: Initializes clockMarkup for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.
  const clockMarkup = readProjectFile('html', 'clock.html');
// Original L134: Initializes clockScript for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.
  const clockScript = readProjectFile('scripts', 'clock.js');
// Original L135: Initializes model for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.
  const model = readProjectFile('scripts', 'models.js');
// Original L136: In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockMarkup, /<select id="emp-select" multiple/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(clockMarkup, /<select id="emp-select" multiple/);
// Original L137: In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockMarkup, /id="clock-in-button"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(clockMarkup, /id="clock-in-button"/);
// Original L138: In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockScript, /saveShifts\(shifts\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(clockScript, /saveShifts\(shifts\)/);
// Original L139: In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShifts\(shifts\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /async saveShifts\(shifts\)/);
// Original L140: In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShift\(shift\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(model, /async saveShift\(shift\)/);
// Original L141: Closes the fixture, callback, loop, or test block for 'the no-login clock screen retains multi-employee selection and clock actions'.
});
// Original L142: Blank line separates related setup or assertions for readability.

// Original L143: Starts an isolated test case whose title states the behavior being specified: Firestore rules intentionally grant public read/write access recursively.
test('Firestore rules intentionally grant public read/write access recursively', () => {
// Original L144: Initializes rules for 'Firestore rules intentionally grant public read/write access recursively', supplying the value that the following test logic will inspect or mutate.
  const rules = readProjectFile('firestore.rules');
// Original L145: In the test 'Firestore rules intentionally grant public read/write access recursively', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(rules, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if true;\s*\}/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(rules, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if true;\s*\}/);
// Original L146: In the test 'Firestore rules intentionally grant public read/write access recursively', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(rules, /request\.auth|isOwner|isGuest|hasRecentOwnerAuthentication/);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(rules, /request\.auth|isOwner|isGuest|hasRecentOwnerAuthentication/);
// Original L147: Closes the fixture, callback, loop, or test block for 'Firestore rules intentionally grant public read/write access recursively'.
});
// Original L148: Blank line separates related setup or assertions for readability.

// Original L149: Starts an isolated test case whose title states the behavior being specified: inline add forms and shift-management sections use collapsed native disclosures.
test('inline add forms and shift-management sections use collapsed native disclosures', () => {
// Original L150: Initializes people for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.
  const people = readProjectFile('html', 'basic-data.html');
// Original L151: Initializes ledger for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.
  const ledger = readProjectFile('html', 'payledger.html');
// Original L152: Initializes invoice for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.
  const invoice = readProjectFile('html', 'invoice.html');
// Original L153: Initializes sharedStyles for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.
  const sharedStyles = readProjectFile('styles', 'ui.css');
// Original L154: Blank line separates related setup or assertions for readability.

// Original L155: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Employee<\/summary>\s*<form class="add-form" id="add-emp-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Employee<\/summary>\s*<form class="add-form" id="add-emp-form">/);
// Original L156: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Customer<\/summary>\s*<form class="add-form" id="add-cust-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Customer<\/summary>\s*<form class="add-form" id="add-cust-form">/);
// Original L157: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(ledger, /<details class="form-container shift-ledger-container">\s*<summary[^>]*>Add a completed shift<\/summary>[\s\S]*?<form id="shift-ledger-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(ledger, /<details class="form-container shift-ledger-container">\s*<summary[^>]*>Add a completed shift<\/summary>[\s\S]*?<form id="shift-ledger-form">/);
// Original L158: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(ledger, /<details class="form-container ledger-add-container">\s*<summary>Add ledger entry<\/summary>\s*<form id="ledger-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(ledger, /<details class="form-container ledger-add-container">\s*<summary>Add ledger entry<\/summary>\s*<form id="ledger-form">/);
// Original L159: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(ledger, /<details\b[^>]*\bopen(?:\s|>)/i);; it proves the removed authentication/role/UI path is absent.
  assert.doesNotMatch(ledger, /<details\b[^>]*\bopen(?:\s|>)/i);
// Original L160: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(invoice, /<details class="shift-link-panel">\s*<summary[^>]*>[\s\S]*?Work shifts and labor[\s\S]*?<\/summary>[\s\S]*?id="shift-link-list"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(invoice, /<details class="shift-link-panel">\s*<summary[^>]*>[\s\S]*?Work shifts and labor[\s\S]*?<\/summary>[\s\S]*?id="shift-link-list"/);
// Original L161: In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(sharedStyles, /summary:focus-visible/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(sharedStyles, /summary:focus-visible/);
// Original L162: Closes the fixture, callback, loop, or test block for 'inline add forms and shift-management sections use collapsed native disclosures'.
});
