# tests/project-coverage.test.mjs

[Exact copy](../../original/tests/project-coverage.test.source.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import test from 'node:test';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 2

```text
import assert from 'node:assert/strict';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 3

```text
import { readdirSync, readFileSync } from 'node:fs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
import { dirname, join, resolve } from 'node:path';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 5

```text
import { fileURLToPath } from 'node:url';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 6

```text

```

Blank line separates related setup or assertions for readability.

### Line 7

```text
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
```

Initializes projectRoot for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 8

```text
const htmlDirectory = join(projectRoot, 'html');
```

Initializes htmlDirectory for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 9

```text
const embeddedPages = readdirSync(htmlDirectory)
```

Initializes embeddedPages for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 10

```text
  .filter(file => file.endsWith('.html'))
```

Calls `file.endsWith` with ".html".

### Line 11

```text
  .sort();
```

Continues the surrounding JavaScript expression or argument list. This line contributes .sort();; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 12

```text

```

Blank line separates related setup or assertions for readability.

### Line 13

```text
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');
```

Initializes readProjectFile for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 14

```text

```

Blank line separates related setup or assertions for readability.

### Line 15

```text
test('every embedded project page loads the shared keyboard-visibility helper', () => {
```

Starts an isolated test case whose title states the behavior being specified: every embedded project page loads the shared keyboard-visibility helper.

### Line 16

```text
  assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');
```

In the test 'every embedded project page loads the shared keyboard-visibility helper', this truthiness assertion requires the concrete condition to hold: assert.ok(embeddedPages.length > 0, 'expected embedded HTML pages');; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 17

```text
  for (const file of embeddedPages) {
```

Controls iteration/branching in the 'every embedded project page loads the shared keyboard-visibility helper' test so each relevant fixture or environment condition is exercised.

### Line 18

```text
    const markup = readProjectFile('html', file);
```

Initializes markup for 'every embedded project page loads the shared keyboard-visibility helper', supplying the value that the following test logic will inspect or mutate.

### Line 19

```text
    assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);
```

In the test 'every embedded project page loads the shared keyboard-visibility helper', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 20

```text
  }
```

Closes the fixture, callback, loop, or test block for 'every embedded project page loads the shared keyboard-visibility helper'.

### Line 21

```text
});
```

Closes the fixture, callback, loop, or test block for 'every embedded project page loads the shared keyboard-visibility helper'.

### Line 22

```text

```

Blank line separates related setup or assertions for readability.

### Line 23

```text
test('the parent shell monitors keyboard focus and viewport changes in its active iframe', () => {
```

Starts an isolated test case whose title states the behavior being specified: the parent shell monitors keyboard focus and viewport changes in its active iframe.

### Line 24

```text
  const script = readProjectFile('scripts', 'index.js');
```

Initializes script for 'the parent shell monitors keyboard focus and viewport changes in its active iframe', supplying the value that the following test logic will inspect or mutate.

### Line 25

```text
  assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);
```

In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 26

```text
  assert.match(script, /frameDocument\.addEventListener\('focusin'/);
```

In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /frameDocument\.addEventListener\('focusin'/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 27

```text
  assert.match(script, /visualViewport\?\.addEventListener\('resize'/);
```

In the test 'the parent shell monitors keyboard focus and viewport changes in its active iframe', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /visualViewport\?\.addEventListener\('resize'/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 28

```text
});
```

Closes the fixture, callback, loop, or test block for 'the parent shell monitors keyboard focus and viewport changes in its active iframe'.

### Line 29

```text

```

Blank line separates related setup or assertions for readability.

### Line 30

```text
test('the footer links to the GitHub profile and centers the Android download link', () => {
```

Starts an isolated test case whose title states the behavior being specified: the footer links to the GitHub profile and centers the Android download link.

### Line 31

```text
  const markup = readProjectFile('index.html');
```

Initializes markup for 'the footer links to the GitHub profile and centers the Android download link', supplying the value that the following test logic will inspect or mutate.

### Line 32

```text
  const stylesheet = readProjectFile('styles', 'style.css');
```

Initializes stylesheet for 'the footer links to the GitHub profile and centers the Android download link', supplying the value that the following test logic will inspect or mutate.

### Line 33

```text
  assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);
```

In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<a class="site-footer-link" href="https:\/\/github\.com\/GickiAnarchy"[^>]*>© 2026 GickiStudios<\/a>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 34

```text
  assert.match(markup, /<a class="site-footer-app-link" href="https:\/\/github\.com\/GickiAnarchy\/timekeeper\/releases\/download\/[^"]+"[^>]*><u>Get the app<\/u><\/a>/);
```

In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<a class="site-footer-app-link" href="https:\/\/github\.com\/GickiAnarchy\/timekeeper\/releases\/download\/[^"]+"[^>]*><u>Get the app<\/u><\/a>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 35

```text
  assert.match(markup, /<div class="site-footer-meta">[\s\S]*?Timekeeping made simple[\s\S]*?version-badge/);
```

In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<div class="site-footer-meta">[\s\S]*?Timekeeping made simple[\s\S]*?version-badge/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 36

```text
  assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);
```

In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(stylesheet, /\.site-footer-link\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 37

```text
  assert.match(stylesheet, /\.site-footer-app-link\s*\{[^}]*justify-self:\s*center;[^}]*\}/);
```

In the test 'the footer links to the GitHub profile and centers the Android download link', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(stylesheet, /\.site-footer-app-link\s*\{[^}]*justify-self:\s*center;[^}]*\}/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 38

```text
});
```

Closes the fixture, callback, loop, or test block for 'the footer links to the GitHub profile and centers the Android download link'.

### Line 39

```text

```

Blank line separates related setup or assertions for readability.

### Line 40

```text
test('every native data table has accessible sortable controls for each sortable column', () => {
```

Starts an isolated test case whose title states the behavior being specified: every native data table has accessible sortable controls for each sortable column.

### Line 41

```text
  const tablePages = ['invoice.html', 'payledger.html'];
```

Builds tablePages, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.

### Line 42

```text
  for (const file of tablePages) {
```

Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.

### Line 43

```text
    const markup = readProjectFile('html', file);
```

Initializes markup for 'every native data table has accessible sortable controls for each sortable column', supplying the value that the following test logic will inspect or mutate.

### Line 44

```text
    const tables = [...markup.matchAll(/<table\b[\s\S]*?<\/table>/gi)];
```

Builds tables, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.

### Line 45

```text
    assert.ok(tables.length > 0, `${file} should contain a data table`);
```

In the test 'every native data table has accessible sortable controls for each sortable column', this truthiness assertion requires the concrete condition to hold: assert.ok(tables.length > 0, `${file} should contain a data table`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 46

```text
    for (const [table] of tables) {
```

Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.

### Line 47

```text
      const sortableHeaders = [...table.matchAll(/<th\b([^>]*)>([\s\S]*?)<\/th>/gi)]
```

Builds sortableHeaders, the concrete fixture collection/object used as input for 'every native data table has accessible sortable controls for each sortable column'; its fields model the relevant domain records or DOM state.

### Line 48

```text
        .filter(([, attributes]) => /\bdata-sort-key=/.test(attributes));
```

Checks whether the regular expression the regular expression `/\bdata-sort-key=/` used to match text matches `attributes` (attributes).

### Line 49

```text
      assert.ok(sortableHeaders.length > 0, `${file} should declare sortable data columns`);
```

In the test 'every native data table has accessible sortable controls for each sortable column', this truthiness assertion requires the concrete condition to hold: assert.ok(sortableHeaders.length > 0, `${file} should declare sortable data columns`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 50

```text
      for (const [, attributes, content] of sortableHeaders) {
```

Controls iteration/branching in the 'every native data table has accessible sortable controls for each sortable column' test so each relevant fixture or environment condition is exercised.

### Line 51

```text
        assert.match(attributes, /\bscope="col"/i, `${file} sortable header should identify its column`);
```

In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(attributes, /\bscope="col"/i, `${file} sortable header should identify its column`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 52

```text
        assert.match(attributes, /\bdata-sort-type="(?:text|date|number)"/i, `${file} sortable header should declare its sort type`);
```

In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(attributes, /\bdata-sort-type="(?:text|date|number)"/i, `${file} sortable header should declare its sort type`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 53

```text
        assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i,
```

In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i, `${file} sortable header should contain a button and visible direction indicator`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 54

```text
          `${file} sortable header should contain a button and visible direction indicator`);
```

In the test 'every native data table has accessible sortable controls for each sortable column', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(content, /<button\b[^>]*class="[^"]*table-sort-button[^"]*"[^>]*>[\s\S]*?table-sort-indicator[\s\S]*?<\/button>/i, `${file} sortable header should contain a button and visible direction indicator`);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 55

```text
      }
```

Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.

### Line 56

```text
    }
```

Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.

### Line 57

```text
  }
```

Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.

### Line 58

```text
});
```

Closes the fixture, callback, loop, or test block for 'every native data table has accessible sortable controls for each sortable column'.

### Line 59

```text

```

Blank line separates related setup or assertions for readability.

### Line 60

```text
test('employee ledger footer includes a separate total-hours summary after the balance', () => {
```

Starts an isolated test case whose title states the behavior being specified: employee ledger footer includes a separate total-hours summary after the balance.

### Line 61

```text
  const markup = readProjectFile('html', 'payledger.html');
```

Initializes markup for 'employee ledger footer includes a separate total-hours summary after the balance', supplying the value that the following test logic will inspect or mutate.

### Line 62

```text
  const script = readProjectFile('scripts', 'ledger.js');
```

Initializes script for 'employee ledger footer includes a separate total-hours summary after the balance', supplying the value that the following test logic will inspect or mutate.

### Line 63

```text
  assert.match(markup, /id="ledger-hours-total"/);
```

In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="ledger-hours-total"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 64

```text
  assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);
```

In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<strong>Total hours<\/strong>[\s\S]*?id="ledger-hours-total"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 65

```text
  assert.match(script, /sumLedgerHours\(entries\)/);
```

In the test 'employee ledger footer includes a separate total-hours summary after the balance', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /sumLedgerHours\(entries\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 66

```text
});
```

Closes the fixture, callback, loop, or test block for 'employee ledger footer includes a separate total-hours summary after the balance'.

### Line 67

```text

```

Blank line separates related setup or assertions for readability.

### Line 68

```text
test('employee ledger can add completed shifts and offer adjustments to the new entry', () => {
```

Starts an isolated test case whose title states the behavior being specified: employee ledger can add completed shifts and offer adjustments to the new entry.

### Line 69

```text
  const markup = readProjectFile('html', 'payledger.html');
```

Initializes markup for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.

### Line 70

```text
  const script = readProjectFile('scripts', 'ledger.js');
```

Initializes script for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.

### Line 71

```text
  const model = readProjectFile('scripts', 'models.js');
```

Initializes model for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.

### Line 72

```text
  const domain = readProjectFile('scripts', 'domain.mjs');
```

Initializes domain for 'employee ledger can add completed shifts and offer adjustments to the new entry', supplying the value that the following test logic will inspect or mutate.

### Line 73

```text
  assert.match(markup, /id="shift-ledger-form"/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="shift-ledger-form"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 74

```text
  assert.match(markup, /id="ledger-shift-select"/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /id="ledger-shift-select"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 75

```text
  assert.match(script, /Would you like to adjust this ledger entry\?/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /Would you like to adjust this ledger entry\?/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 76

```text
  assert.match(script, /openEditDialog\(entry/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(script, /openEditDialog\(entry/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 77

```text
  assert.match(model, /async saveShiftToLedger\(shiftId\)/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShiftToLedger\(shiftId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 78

```text
  assert.match(model, /already been added to the ledger/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /already been added to the ledger/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 79

```text
  assert.match(domain, /sourceShiftId: String\(shiftId\)/);
```

In the test 'employee ledger can add completed shifts and offer adjustments to the new entry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(domain, /sourceShiftId: String\(shiftId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 80

```text
});
```

Closes the fixture, callback, loop, or test block for 'employee ledger can add completed shifts and offer adjustments to the new entry'.

### Line 81

```text

```

Blank line separates related setup or assertions for readability.

### Line 82

```text
test('settled employee ledgers are archived and browsable without losing backup coverage', () => {
```

Starts an isolated test case whose title states the behavior being specified: settled employee ledgers are archived and browsable without losing backup coverage.

### Line 83

```text
  const shell = readProjectFile('index.html');
```

Initializes shell for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 84

```text
  const archiveMarkup = readProjectFile('html', 'ledger-archive.html');
```

Initializes archiveMarkup for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 85

```text
  const archiveScript = readProjectFile('scripts', 'ledger-archive.js');
```

Initializes archiveScript for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 86

```text
  const model = readProjectFile('scripts', 'models.js');
```

Initializes model for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 87

```text
  const domain = readProjectFile('scripts', 'domain.mjs');
```

Initializes domain for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 88

```text
  const settings = readProjectFile('html', 'settings.html');
```

Initializes settings for 'settled employee ledgers are archived and browsable without losing backup coverage', supplying the value that the following test logic will inspect or mutate.

### Line 89

```text

```

Blank line separates related setup or assertions for readability.

### Line 90

```text
  assert.match(shell, /data-page="html\/ledger-archive\.html" data-title="Ledger archive"/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(shell, /data-page="html\/ledger-archive\.html" data-title="Ledger archive"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 91

```text
  assert.match(archiveMarkup, /id="archive-employee-filter"/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(archiveMarkup, /id="archive-employee-filter"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 92

```text
  assert.match(archiveScript, /store\.ledgerArchiveRows/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(archiveScript, /store\.ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 93

```text
  assert.match(domain, /export function ledgerBalanceCents/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(domain, /export function ledgerBalanceCents/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 94

```text
  assert.match(model, /async archiveSettledLedger\(employeeId\)/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async archiveSettledLedger\(employeeId\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 95

```text
  assert.match(model, /ledgerArchives/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchives/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 96

```text
  assert.match(model, /ledgerArchiveRows/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 97

```text
  assert.match(model, /resumePendingLedgerArchives/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /resumePendingLedgerArchives/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 98

```text
  assert.match(model, /ledgerArchiveRows: this\.ledgerArchiveRows/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /ledgerArchiveRows: this\.ledgerArchiveRows/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 99

```text
  assert.match(settings, /archived ledger history/);
```

In the test 'settled employee ledgers are archived and browsable without losing backup coverage', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(settings, /archived ledger history/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 100

```text
});
```

Closes the fixture, callback, loop, or test block for 'settled employee ledgers are archived and browsable without losing backup coverage'.

### Line 101

```text

```

Blank line separates related setup or assertions for readability.

### Line 102

```text
test('the workspace opens directly to Home without authentication UI or owner-only gates', () => {
```

Starts an isolated test case whose title states the behavior being specified: the workspace opens directly to Home without authentication UI or owner-only gates.

### Line 103

```text
  const markup = readProjectFile('index.html');
```

Initializes markup for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.

### Line 104

```text
  const shellScript = readProjectFile('scripts', 'index.js');
```

Initializes shellScript for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.

### Line 105

```text
  const sharedStylesheet = readProjectFile('styles', 'style.css');
```

Initializes sharedStylesheet for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.

### Line 106

```text
  const embeddedStylesheet = readProjectFile('styles', 'ui.css');
```

Initializes embeddedStylesheet for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.

### Line 107

```text

```

Blank line separates related setup or assertions for readability.

### Line 108

```text
  assert.match(markup, /<iframe[^>]*src="html\/home\.html"/);
```

In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(markup, /<iframe[^>]*src="html\/home\.html"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 109

```text
  assert.doesNotMatch(markup, /sign.?in|sign.?out|password|guest-access-badge|owner-access-badge/i);
```

In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(markup, /sign.?in|sign.?out|password|guest-access-badge|owner-access-badge/i);; it proves the removed authentication/role/UI path is absent.

### Line 110

```text
  assert.doesNotMatch(shellScript, /firebase\.js|AuthState|signIn|signOut|isOwner|data-owner-only/i);
```

In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(shellScript, /firebase\.js|AuthState|signIn|signOut|isOwner|data-owner-only/i);; it proves the removed authentication/role/UI path is absent.

### Line 111

```text
  assert.doesNotMatch(sharedStylesheet + embeddedStylesheet, /data-owner-only|data-owner=/i);
```

In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(sharedStylesheet + embeddedStylesheet, /data-owner-only|data-owner=/i);; it proves the removed authentication/role/UI path is absent.

### Line 112

```text

```

Blank line separates related setup or assertions for readability.

### Line 113

```text
  for (const file of embeddedPages) {
```

Controls iteration/branching in the 'the workspace opens directly to Home without authentication UI or owner-only gates' test so each relevant fixture or environment condition is exercised.

### Line 114

```text
    const page = readProjectFile('html', file);
```

Initializes page for 'the workspace opens directly to Home without authentication UI or owner-only gates', supplying the value that the following test logic will inspect or mutate.

### Line 115

```text
    assert.doesNotMatch(page, /data-owner-only|data-owner=/i, `${file} should have no role-gated controls`);
```

In the test 'the workspace opens directly to Home without authentication UI or owner-only gates', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(page, /data-owner-only|data-owner=/i, `${file} should have no role-gated controls`);; it proves the removed authentication/role/UI path is absent.

### Line 116

```text
  }
```

Closes the fixture, callback, loop, or test block for 'the workspace opens directly to Home without authentication UI or owner-only gates'.

### Line 117

```text
});
```

Closes the fixture, callback, loop, or test block for 'the workspace opens directly to Home without authentication UI or owner-only gates'.

### Line 118

```text

```

Blank line separates related setup or assertions for readability.

### Line 119

```text
test('the app writes directly to its canonical Firestore collections without request or projection layers', () => {
```

Starts an isolated test case whose title states the behavior being specified: the app writes directly to its canonical Firestore collections without request or projection layers.

### Line 120

```text
  const model = readProjectFile('scripts', 'models.js');
```

Initializes model for 'the app writes directly to its canonical Firestore collections without request or projection layers', supplying the value that the following test logic will inspect or mutate.

### Line 121

```text
  assert.match(model, /collection\(db, "employees"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "employees"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 122

```text
  assert.match(model, /collection\(db, "customers"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "customers"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 123

```text
  assert.match(model, /collection\(db, "shifts"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "shifts"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 124

```text
  assert.match(model, /collection\(db, "invoices"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "invoices"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 125

```text
  assert.match(model, /collection\(db, "payments"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "payments"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 126

```text
  assert.match(model, /collection\(db, "ledgerRows"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "ledgerRows"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 127

```text
  assert.match(model, /collection\(db, "planned"\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /collection\(db, "planned"\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 128

```text
  assert.match(model, /setDoc\(doc\(db, "shifts", shift\.id\)/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /setDoc\(doc\(db, "shifts", shift\.id\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 129

```text
  assert.doesNotMatch(model, /publicEmployees|publicCustomers|publicShifts|changeRequests|getCurrentOwner|requireRecentOwnerReauthentication/);
```

In the test 'the app writes directly to its canonical Firestore collections without request or projection layers', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(model, /publicEmployees|publicCustomers|publicShifts|changeRequests|getCurrentOwner|requireRecentOwnerReauthentication/);; it proves the removed authentication/role/UI path is absent.

### Line 130

```text
});
```

Closes the fixture, callback, loop, or test block for 'the app writes directly to its canonical Firestore collections without request or projection layers'.

### Line 131

```text

```

Blank line separates related setup or assertions for readability.

### Line 132

```text
test('the no-login clock screen retains multi-employee selection and clock actions', () => {
```

Starts an isolated test case whose title states the behavior being specified: the no-login clock screen retains multi-employee selection and clock actions.

### Line 133

```text
  const clockMarkup = readProjectFile('html', 'clock.html');
```

Initializes clockMarkup for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.

### Line 134

```text
  const clockScript = readProjectFile('scripts', 'clock.js');
```

Initializes clockScript for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.

### Line 135

```text
  const model = readProjectFile('scripts', 'models.js');
```

Initializes model for 'the no-login clock screen retains multi-employee selection and clock actions', supplying the value that the following test logic will inspect or mutate.

### Line 136

```text
  assert.match(clockMarkup, /<select id="emp-select" multiple/);
```

In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockMarkup, /<select id="emp-select" multiple/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 137

```text
  assert.match(clockMarkup, /id="clock-in-button"/);
```

In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockMarkup, /id="clock-in-button"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 138

```text
  assert.match(clockScript, /saveShifts\(shifts\)/);
```

In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(clockScript, /saveShifts\(shifts\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 139

```text
  assert.match(model, /async saveShifts\(shifts\)/);
```

In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShifts\(shifts\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 140

```text
  assert.match(model, /async saveShift\(shift\)/);
```

In the test 'the no-login clock screen retains multi-employee selection and clock actions', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(model, /async saveShift\(shift\)/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 141

```text
});
```

Closes the fixture, callback, loop, or test block for 'the no-login clock screen retains multi-employee selection and clock actions'.

### Line 142

```text

```

Blank line separates related setup or assertions for readability.

### Line 143

```text
test('Firestore rules intentionally grant public read/write access recursively', () => {
```

Starts an isolated test case whose title states the behavior being specified: Firestore rules intentionally grant public read/write access recursively.

### Line 144

```text
  const rules = readProjectFile('firestore.rules');
```

Initializes rules for 'Firestore rules intentionally grant public read/write access recursively', supplying the value that the following test logic will inspect or mutate.

### Line 145

```text
  assert.match(rules, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if true;\s*\}/);
```

In the test 'Firestore rules intentionally grant public read/write access recursively', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(rules, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if true;\s*\}/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 146

```text
  assert.doesNotMatch(rules, /request\.auth|isOwner|isGuest|hasRecentOwnerAuthentication/);
```

In the test 'Firestore rules intentionally grant public read/write access recursively', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(rules, /request\.auth|isOwner|isGuest|hasRecentOwnerAuthentication/);; it proves the removed authentication/role/UI path is absent.

### Line 147

```text
});
```

Closes the fixture, callback, loop, or test block for 'Firestore rules intentionally grant public read/write access recursively'.

### Line 148

```text

```

Blank line separates related setup or assertions for readability.

### Line 149

```text
test('inline add forms and shift-management sections use collapsed native disclosures', () => {
```

Starts an isolated test case whose title states the behavior being specified: inline add forms and shift-management sections use collapsed native disclosures.

### Line 150

```text
  const people = readProjectFile('html', 'basic-data.html');
```

Initializes people for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.

### Line 151

```text
  const ledger = readProjectFile('html', 'payledger.html');
```

Initializes ledger for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.

### Line 152

```text
  const invoice = readProjectFile('html', 'invoice.html');
```

Initializes invoice for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.

### Line 153

```text
  const sharedStyles = readProjectFile('styles', 'ui.css');
```

Initializes sharedStyles for 'inline add forms and shift-management sections use collapsed native disclosures', supplying the value that the following test logic will inspect or mutate.

### Line 154

```text

```

Blank line separates related setup or assertions for readability.

### Line 155

```text
  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Employee<\/summary>\s*<form class="add-form" id="add-emp-form">/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Employee<\/summary>\s*<form class="add-form" id="add-emp-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 156

```text
  assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Customer<\/summary>\s*<form class="add-form" id="add-cust-form">/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(people, /<details class="form-container add-form-disclosure">\s*<summary>Add Customer<\/summary>\s*<form class="add-form" id="add-cust-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 157

```text
  assert.match(ledger, /<details class="form-container shift-ledger-container">\s*<summary[^>]*>Add a completed shift<\/summary>[\s\S]*?<form id="shift-ledger-form">/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(ledger, /<details class="form-container shift-ledger-container">\s*<summary[^>]*>Add a completed shift<\/summary>[\s\S]*?<form id="shift-ledger-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 158

```text
  assert.match(ledger, /<details class="form-container ledger-add-container">\s*<summary>Add ledger entry<\/summary>\s*<form id="ledger-form">/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(ledger, /<details class="form-container ledger-add-container">\s*<summary>Add ledger entry<\/summary>\s*<form id="ledger-form">/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 159

```text
  assert.doesNotMatch(ledger, /<details\b[^>]*\bopen(?:\s|>)/i);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this negative regex assertion requires the actual source/text not to match the forbidden pattern: assert.doesNotMatch(ledger, /<details\b[^>]*\bopen(?:\s|>)/i);; it proves the removed authentication/role/UI path is absent.

### Line 160

```text
  assert.match(invoice, /<details class="shift-link-panel">\s*<summary[^>]*>[\s\S]*?Work shifts and labor[\s\S]*?<\/summary>[\s\S]*?id="shift-link-list"/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(invoice, /<details class="shift-link-panel">\s*<summary[^>]*>[\s\S]*?Work shifts and labor[\s\S]*?<\/summary>[\s\S]*?id="shift-link-list"/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 161

```text
  assert.match(sharedStyles, /summary:focus-visible/);
```

In the test 'inline add forms and shift-management sections use collapsed native disclosures', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(sharedStyles, /summary:focus-visible/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 162

```text
});
```

Closes the fixture, callback, loop, or test block for 'inline add forms and shift-management sections use collapsed native disclosures'.
