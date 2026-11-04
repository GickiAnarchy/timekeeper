import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ledgerSource = readFileSync(new URL('../scripts/ledger.js', import.meta.url), 'utf8');
const labelSection = ledgerSource.match(/\/\/ LEDGER DISPLAY LABEL HELPER\n([\s\S]*?)\n\/\/ END LEDGER DISPLAY LABEL HELPER/);
assert.ok(labelSection, 'display label helper should stay in ledger.js');
const ledgerItemLabel = new Function(`${labelSection[1]}\nreturn ledgerItemLabel;`)();
const reportSection = ledgerSource.match(/\/\/ LEDGER DOWNLOAD REPORT HELPER\n([\s\S]*?)\n\/\/ END LEDGER DOWNLOAD REPORT HELPER/);
assert.ok(reportSection, 'download report helper should stay in ledger.js');
const formatLedgerReport = new Function(`${reportSection[1]}\nreturn formatLedgerReport;`)();

test('shift-linked ledger items use the customer identity instead of repeating the full note', () => {
  assert.equal(ledgerItemLabel({
    sourceShiftId: 'shift-1',
    notes: 'Shift · Oak Street — Front lawn'
  }), 'Shift · Oak Street');
});

test('shift-linked ledger items use the customer name from the source shift', () => {
  assert.equal(ledgerItemLabel({ sourceShiftId: 'shift-2' }, [{
    id: 'shift-2',
    customer: { name: 'Maple House' },
    note: 'Fence repair'
  }]), 'Shift · Maple House');
});

test('manual item labels distinguish entry types without repeating the Notes field', () => {
  assert.equal(ledgerItemLabel({ type: 'advance', notes: 'Fuel reimbursement' }), 'Cash advance');
  assert.equal(ledgerItemLabel({ type: 'normal', notes: 'Weekly wages' }), 'Hourly pay');
  assert.equal(ledgerItemLabel({ type: 'normal' }), 'Hourly pay');
  assert.equal(ledgerItemLabel({ type: 'advance' }), 'Cash advance');
  assert.equal(ledgerItemLabel({ type: 'general' }), 'Other credit');
  assert.equal(ledgerItemLabel({ type: 'unexpected' }), 'Ledger adjustment');
});

test('linked shift without available detail is still identified as a completed shift', () => {
  assert.equal(ledgerItemLabel({ sourceShiftId: 'missing-shift' }), 'Completed shift');
});

test('ledger download report includes readable entries and existing totals', () => {
  const report = formatLedgerReport({
    owner: 'Ledger for Alex Example',
    generatedOn: '11/4/2026, 4:31 PM',
    total: 125.5,
    totalHours: 8.25,
    entries: [{
      itemLabel: 'Cash advance',
      date: '2026-11-03',
      type: 'advance',
      hours: 0,
      amount: 25,
      notes: 'Fuel'
    }]
  });
  assert.match(report, /Ledger: Ledger for Alex Example/);
  assert.match(report, /Balance: \$125\.50/);
  assert.match(report, /Total hours: 8\.25/);
  assert.match(report, /1\. Cash advance[\s\S]*Amount: -\$25\.00[\s\S]*Notes: Fuel/);
});

test('ledger download report handles an empty unassigned legacy ledger', () => {
  const report = formatLedgerReport({
    owner: 'Legacy entries without an employee assignment',
    generatedOn: '11/4/2026',
    total: 0,
    totalHours: 0,
    entries: []
  });
  assert.match(report, /Ledger: Legacy entries without an employee assignment/);
  assert.match(report, /No entries\./);
});

test('selected ledger exposes a download button wired to a plain-text file', () => {
  const markup = readFileSync(new URL('../html/payledger.html', import.meta.url), 'utf8');

  assert.match(markup, /<button id="download-ledger-btn"[^>]*disabled>Download Ledger<\/button>/);
  assert.match(ledgerSource, /downloadLedgerButton\.addEventListener\('click'/);
  assert.match(ledgerSource, /const entries = filteredEntries\(\)/);
  assert.match(ledgerSource, /new Blob\(\[report\], \{ type: 'text\/plain;charset=utf-8' \}\)/);
  assert.match(ledgerSource, /link\.download = ledgerDownloadFilename\(owner\)/);
  assert.match(ledgerSource, /downloadLedgerButton\.disabled = false/);
});
