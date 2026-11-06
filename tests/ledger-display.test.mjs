import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ledgerSource = readFileSync(new URL('../scripts/ledger.js', import.meta.url), 'utf8');
const labelSection = ledgerSource.match(/\/\/ LEDGER DISPLAY LABEL HELPER\n([\s\S]*?)\n\/\/ END LEDGER DISPLAY LABEL HELPER/);
assert.ok(labelSection, 'display label helper should stay in ledger.js');
const ledgerItemLabel = new Function(`${labelSection[1]}\nreturn ledgerItemLabel;`)();
const csvSection = ledgerSource.match(/\/\/ LEDGER CSV EXPORT HELPER\n([\s\S]*?)\n\/\/ END LEDGER CSV EXPORT HELPER/);
assert.ok(csvSection, 'CSV export helper should stay in ledger.js');
const { formatLedgerCsv, createLedgerCsvBlob, createLedgerWorkbookBlob } = new Function(`${csvSection[1]}\nreturn { formatLedgerCsv, createLedgerCsvBlob, createLedgerWorkbookBlob };`)();


function crc32ForTest(bytes) {
  let crc = 0xFFFFFFFF;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function readStoredZip(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const decoder = new TextDecoder();
  const files = new Map();
  const localCrcs = new Map();
  let offset = 0;
  while (offset + 4 <= bytes.length && view.getUint32(offset, true) === 0x04034B50) {
    const nameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const compressedSize = view.getUint32(offset + 18, true);
    const localCrc = view.getUint32(offset + 14, true);
    const name = decoder.decode(bytes.slice(offset + 30, offset + 30 + nameLength));
    const dataStart = offset + 30 + nameLength + extraLength;
    const data = bytes.slice(dataStart, dataStart + compressedSize);
    assert.equal(localCrc, crc32ForTest(data), `local CRC should match ${name}`);
    assert.equal(view.getUint16(offset + 12, true), 0x21, `local DOS date should be 1980-01-01 for ${name}`);
    localCrcs.set(name, localCrc);
    files.set(name, data);
    offset = dataStart + compressedSize;
  }
  assert.equal(view.getUint32(offset, true), 0x02014B50, 'ZIP should have a central directory');
  for (let central = offset; central + 46 <= bytes.length && view.getUint32(central, true) === 0x02014B50;) {
    const nameLength = view.getUint16(central + 28, true);
    const name = decoder.decode(bytes.slice(central + 46, central + 46 + nameLength));
    const data = files.get(name);
    assert.ok(data, `central directory should reference ${name}`);
    const centralCrc = view.getUint32(central + 16, true);
    assert.equal(crc32ForTest(data), centralCrc, `CRC should match ${name}`);
    assert.equal(view.getUint16(central + 14, true), 0x21, `central DOS date should be 1980-01-01 for ${name}`);
    assert.equal(view.getUint32(central + 16, true), localCrcs.get(name), `local and central CRC should match ${name}`);
    central += 46 + nameLength + view.getUint16(central + 30, true) + view.getUint16(central + 32, true);
  }
  return files;
}

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

test('CSV repairs common mojibake and invisible controls while preserving genuine Unicode in the actual UTF-8 Blob', async () => {
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

  const blob = createLedgerCsvBlob(csv);
  const bytes = new Uint8Array(await blob.arrayBuffer());
  assert.equal(blob.type, 'text/csv;charset=utf-8');
  assert.deepEqual(Array.from(bytes.slice(0, 3)), [0xEF, 0xBB, 0xBF]);
  assert.deepEqual(bytes, new TextEncoder().encode(csv));
  assert.equal(new TextDecoder('utf-8', { fatal: true }).decode(bytes), csv.slice(1));
});


test('XLSX is a real UTF-8 OOXML ZIP with typed values, safe text, and exact Unicode', async () => {
  const blob = createLedgerWorkbookBlob({
    owner: 'José 👩‍🔧 שלום', total: 125.5, totalHours: 8.25,
    entries: [{ itemLabel: '=2+2 & <repair>', date: '2026-11-03', type: 'advance', hours: 1.2, amount: 25, notes: 'café 😀\u0001 RTL שלום' }]
  });
  assert.equal(blob.type, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  assert.deepEqual(Array.from(bytes.slice(0, 4)), [0x50, 0x4B, 0x03, 0x04], 'XLSX must begin with ZIP signature, without a BOM');
  const files = readStoredZip(bytes);
  for (const name of ['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/worksheets/sheet1.xml', 'xl/styles.xml']) assert.ok(files.has(name), name);
  const sheet = new TextDecoder().decode(files.get('xl/worksheets/sheet1.xml'));
  assert.match(new TextDecoder().decode(files.get('xl/workbook.xml')), /Employee Ledger/);
  assert.match(sheet, /José 👩‍🔧 שלום/);
  assert.match(sheet, /=2\+2 &amp; &lt;repair&gt;/);
  assert.match(sheet, /café 😀 RTL שלום/);
  assert.match(sheet, /<c r="E2" s="1"><v>1\.20<\/v><\/c>/);
  assert.match(sheet, /<c r="F2" s="1"><v>-25\.00<\/v><\/c>/);
  assert.match(sheet, /<c r="F3" s="1"><v>125\.50<\/v><\/c>/);
  assert.match(sheet, /<c r="E4" s="1"><v>8\.25<\/v><\/c>/);
  assert.match(sheet, /<c r="A1" s="2"/);
  assert.match(sheet, /<c r="G1" s="2"/);
  assert.doesNotMatch(sheet, /\u0001/);
  assert.doesNotMatch(sheet, /<f[ >]/, 'XLSX text must never create formula elements');
  assert.match(sheet, /t="inlineStr"/);
});

test('XLSX preserves Unicode that resembles mojibake instead of repairing genuine text', async () => {
  const collisionText = 'Â Ã â ï»¿ Â\u00A0';
  const blob = createLedgerWorkbookBlob({
    owner: collisionText,
    total: 0,
    totalHours: 0,
    entries: [{ itemLabel: collisionText, date: '2026-11-04', type: 'general', hours: 0, amount: 0, notes: collisionText }]
  });
  const files = readStoredZip(new Uint8Array(await blob.arrayBuffer()));
  const sheet = new TextDecoder().decode(files.get('xl/worksheets/sheet1.xml'));
  assert.match(sheet, new RegExp(collisionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(sheet, /Â\u00A0/);
});

test('ledger export wiring preserves XLSX by default and cannot break startup without controls', () => {
  assert.match(ledgerSource, /function createLedgerWorkbookBlob/);
  assert.match(ledgerSource, /function formatLedgerCsv/);
  assert.match(ledgerSource, /downloadLedgerButton\?\.addEventListener\('click'/);
  assert.match(ledgerSource, /downloadFormat\?\.addEventListener/);
  assert.match(ledgerSource, /const format = downloadFormat\?\.value === 'csv' \? 'csv' : 'xlsx'/);
  assert.match(ledgerSource, /createLedgerWorkbookBlob\(exportData\)/);
  assert.match(ledgerSource, /createLedgerCsvBlob\(formatLedgerCsv\(exportData\)\)/);
  assert.match(ledgerSource, /downloadLedgerButton && \(downloadLedgerButton\.disabled = true\)/);
});
