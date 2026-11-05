import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ledgerSource = readFileSync(new URL('../scripts/ledger.js', import.meta.url), 'utf8');
const labelSection = ledgerSource.match(/\/\/ LEDGER DISPLAY LABEL HELPER\n([\s\S]*?)\n\/\/ END LEDGER DISPLAY LABEL HELPER/);
assert.ok(labelSection, 'display label helper should stay in ledger.js');
const ledgerItemLabel = new Function(`${labelSection[1]}\nreturn ledgerItemLabel;`)();
const csvSection = ledgerSource.match(/\/\/ LEDGER CSV EXPORT HELPER\n([\s\S]*?)\n\/\/ END LEDGER CSV EXPORT HELPER/);
assert.ok(csvSection, 'CSV export helper should stay in ledger.js');
const formatLedgerCsv = new Function(`${csvSection[1]}\nreturn formatLedgerCsv;`)();

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

test('ledger CSV includes spreadsheet columns, readable entries, signed advances, and totals', () => {
  const csv = formatLedgerCsv({
    owner: 'Alex Example',
    total: 125.5,
    totalHours: 8.25,
    entries: [{
      itemLabel: 'Cash advance',
      date: '2026-11-03',
      type: 'advance',
      hours: 0,
      amount: 25,
      notes: 'Fuel, "reimbursement"'
    }]
  });
  assert.ok(csv.startsWith('\uFEFF"Employee","Date","Item","Type","Hours","Amount ($)","Notes"\r\n'));
  assert.match(csv, /"Alex Example","2026-11-03","Cash advance","Advance","0\.00","-25\.00","Fuel, ""reimbursement"""\r\n/);
  assert.match(csv, /"","","Balance","","","125\.50",""\r\n/);
  assert.match(csv, /"","","Total hours","","8\.25","",""\r\n/);
});

test('ledger CSV includes a zeroed summary when there are no unassigned legacy entries', () => {
  const csv = formatLedgerCsv({
    owner: 'Legacy entries without an employee assignment',
    total: 0,
    totalHours: 0,
    entries: []
  });
  assert.match(csv, /"","","Balance","","","0\.00",""\r\n/);
  assert.match(csv, /"","","Total hours","","0\.00","",""\r\n/);
});

test('CSV export escapes quotes, commas, newlines, and spreadsheet formulas in text cells', () => {
  const csv = formatLedgerCsv({
    owner: '=2+2',
    total: 0,
    totalHours: 0,
    entries: [{
      itemLabel: 'Repair, "front"',
      date: '2026-11-04',
      type: 'general',
      amount: 12,
      hours: 0,
      notes: '=HYPERLINK("https://example.test")\nsecond line'
    }]
  });
  assert.match(csv, /"'=2\+2","2026-11-04","Repair, ""front""","Other credit","0\.00","12\.00","'=HYPERLINK\(""https:\/\/example\.test""\)\nsecond line"/);
});

test('CSV repairs common mojibake and invisible controls while preserving genuine Unicode', () => {
  const csv = formatLedgerCsv({
    owner: 'JosÃ© ï»¿',
    total: 1,
    totalHours: 1,
    entries: [{
      itemLabel: 'Coffee break',
      date: '2026-11-04',
      type: 'general',
      amount: 1,
      hours: 1,
      notes: 'smokeÂ break “café”\u200B\u0001'
    }]
  });

  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('"José "'));
  assert.ok(csv.includes('"smoke break “café”"'));
  assert.ok(!csv.includes('JosÃ©'));
  assert.ok(!csv.includes('ï»¿'));
  assert.ok(!csv.includes('Â '));
  assert.ok(!csv.includes('\u200B'));
  assert.ok(!csv.includes('\u0001'));

  const bytes = new TextEncoder().encode(csv);
  assert.deepEqual(Array.from(bytes.slice(0, 3)), [0xEF, 0xBB, 0xBF]);
  assert.equal(new TextDecoder('utf-8').decode(bytes), csv.slice(1));
});

test('selected ledger exposes a Google Sheets-friendly CSV download', () => {
  const markup = readFileSync(new URL('../html/payledger.html', import.meta.url), 'utf8');

  assert.match(markup, /<button id="download-ledger-btn"[^>]*disabled>Download CSV<\/button>/);
  assert.match(markup, /Google Sheets or Excel/);
  assert.match(markup, /ledger\.js\?v=ledger-csv-2/);
  assert.match(ledgerSource, /downloadLedgerButton\.addEventListener\('click'/);
  assert.match(ledgerSource, /const entries = filteredEntries\(\)/);
  assert.match(ledgerSource, /new Blob\(\[new TextEncoder\(\)\.encode\(csv\)\], \{ type: 'text\/csv;charset=utf-8' \}\)/);
  assert.match(ledgerSource, /link\.download = ledgerDownloadFilename\(owner\)/);
  assert.match(ledgerSource, /\.csv`/);
  assert.match(ledgerSource, /downloadLedgerButton\.disabled = false/);
});
