import {
  store,
  populateEmployeeDropdowns,
  compareByFirstName
} from './models.js';
import { sortLedgerEntriesByDate, sumLedgerHours } from './domain.mjs';
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';

// This display rule has only one consumer, so keep it with the ledger renderer.
// LEDGER DISPLAY LABEL HELPER
function ledgerItemLabel(entry, shifts = []) {
  const note = String(entry?.notes || '').trim();
  const sourceShiftId = String(entry?.sourceShiftId || '');

  if (sourceShiftId) {
    const shift = shifts.find(candidate => String(candidate.id) === sourceShiftId);
    const customer = String(shift?.customer?.name || shift?.customerName || '').trim();
    if (customer) return `Shift · ${customer}`;
    const savedCustomer = note.match(/^shift\s*[·-]\s*([^—]+)/i)?.[1]?.trim();
    if (savedCustomer) return `Shift · ${savedCustomer}`;
    return 'Completed shift';
  }

  switch (String(entry?.type || '').toLowerCase()) {
    case 'normal': return 'Hourly pay';
    case 'advance': return 'Cash advance';
    case 'general': return 'Other credit';
    default: return 'Ledger adjustment';
  }
}
// END LEDGER DISPLAY LABEL HELPER

// LEDGER CSV EXPORT HELPER
const WINDOWS_1252_TO_BYTE = new Map([
  ['€', 0x80], ['‚', 0x82], ['ƒ', 0x83], ['„', 0x84], ['…', 0x85], ['†', 0x86], ['‡', 0x87],
  ['ˆ', 0x88], ['‰', 0x89], ['Š', 0x8A], ['‹', 0x8B], ['Œ', 0x8C], ['Ž', 0x8E], ['‘', 0x91],
  ['’', 0x92], ['“', 0x93], ['”', 0x94], ['•', 0x95], ['–', 0x96], ['—', 0x97], ['˜', 0x98],
  ['™', 0x99], ['š', 0x9A], ['›', 0x9B], ['œ', 0x9C], ['ž', 0x9E], ['Ÿ', 0x9F]
]);

function hasMojibakeMarker(text) {
  return /(?:[ÃÂÐÑ][\u0080-\u00BF]|â(?:[\u0080-\u00BF]|[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ])|ï»¿|ð[\u0080-\u00BF])/.test(text);
}

const MOJIBAKE_SEQUENCE = /(?:[ÃÂÐÑ][\u0080-\u00BF]|â[\u0080-\u00BF€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]{1,2}|ï»¿|ð[\u0080-\u00BF])/g;

function repairMojibake(text) {
  if (!hasMojibakeMarker(text)) return text;
  // Decode matching byte-like runs separately so real Unicode elsewhere stays untouched.
  return text.replace(MOJIBAKE_SEQUENCE, sequence => {
    try {
      const bytes = [];
      for (const character of sequence) {
        const codePoint = character.codePointAt(0);
        const byte = codePoint <= 0xFF ? codePoint : WINDOWS_1252_TO_BYTE.get(character);
        if (byte === undefined) return sequence;
        bytes.push(byte);
      }
      const repaired = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
      return hasMojibakeMarker(repaired) ? sequence : repaired;
    } catch {
      // Keep an incomplete or otherwise non-reversible sequence unchanged.
      return sequence;
    }
  });
}

function normalizeCsvText(value) {
  return repairMojibake(String(value ?? ''))
    // Remove stray embedded BOMs and invisible spacing/format controls from saved text.
    .replace(/[\uFEFF\u200B-\u200F\u202A-\u202E\u2060-\u2069]/g, '')
    .replace(/\u00A0/g, ' ')
    // Spreadsheet cells should not contain C0/C1 control bytes (newlines and tabs remain valid).
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
}

function csvCell(value, protectFormula = false) {
  const text = normalizeCsvText(value);
  // Prevent spreadsheet apps from treating user-entered text as a formula.
  const safeText = protectFormula && /^[\u0000-\u0020]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replaceAll('"', '""')}"`;
}

// One rectangular, typed representation keeps CSV and XLSX exports in lockstep.
function buildLedgerRows({ owner, entries, total, totalHours }) {
  const rows = [{ values: ['Employee', 'Date', 'Item', 'Type', 'Hours', 'Amount ($)', 'Notes'], types: ['text', 'text', 'text', 'text', 'text', 'text', 'text'] }];
  for (const entry of entries) {
    const type = String(entry.type || '').toLowerCase();
    let typeLabel = 'Unspecified';
    if (entry.sourceShiftId && type === 'normal') typeLabel = 'Shift pay';
    else if (type === 'normal') typeLabel = 'Normal pay';
    else if (type === 'advance') typeLabel = 'Advance';
    else if (type === 'general') typeLabel = 'Other credit';
    else if (type) typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    const amount = Number(entry.amount || 0);
    const signedAmount = type === 'advance' ? -Math.abs(amount) : amount;
    rows.push({
      values: [owner, entry.date || '', entry.itemLabel || 'Ledger item', typeLabel, Number(entry.hours || 0), signedAmount, String(entry.notes || '').trim()],
      types: ['text', 'text', 'text', 'text', 'number', 'number', 'text']
    });
  }
  rows.push({ values: ['', '', 'Balance', '', '', total, ''], types: ['text', 'text', 'text', 'text', 'text', 'number', 'text'] });
  rows.push({ values: ['', '', 'Total hours', '', totalHours, '', ''], types: ['text', 'text', 'text', 'text', 'number', 'text', 'text'] });
  return rows;
}

function formatLedgerCsv(data) {
  const rows = buildLedgerRows(data);
  // Keep a single rectangular table so it opens cleanly in Sheets and Excel.
  const csvRows = rows.map(row => row.values.map((cell, index) => {
    const value = row.types[index] === 'number' ? Number(cell).toFixed(2) : cell;
    return csvCell(value, index !== 4 && index !== 5);
  }).join(','));
  return `\uFEFF${csvRows.join('\r\n')}\r\n`;
}

function createLedgerCsvBlob(csv) {
  // Keep encoding at the byte boundary so the actual downloadable Blob is testable as UTF-8.
  const bytes = new TextEncoder().encode(csv);
  return new Blob([bytes], { type: 'text/csv;charset=utf-8' });
}

function xmlText(value) {
  // XML 1.0 excludes only these C0 controls plus noncharacters FFFE/FFFF; retain C1, bidi, NBSP, ZWJ, and genuine Unicode.
  return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function zipStored(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of files) {
    const nameBytes = encoder.encode(name);
    const data = typeof content === 'string' ? encoder.encode(content) : content;
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(local.buffer);
    // Store entries without compression so the browser and spreadsheet apps can consume this dependency-free OOXML ZIP.
    view.setUint32(0, 0x04034B50, true); view.setUint16(4, 20, true); view.setUint16(6, 0x0800, true);
    // Use a deterministic DOS timestamp (1980-01-01) and the full 32-bit CRC in both ZIP headers.
    view.setUint16(10, 0x21, true); view.setUint16(12, 0x21, true); view.setUint32(14, crc, true); view.setUint32(18, data.length, true); view.setUint32(22, data.length, true);
    view.setUint16(26, nameBytes.length, true); local.set(nameBytes, 30);
    chunks.push(local, data);
    const entry = new Uint8Array(46 + nameBytes.length); const entryView = new DataView(entry.buffer);
    entryView.setUint32(0, 0x02014B50, true); entryView.setUint16(4, 20, true); entryView.setUint16(6, 20, true); entryView.setUint16(8, 0x0800, true);
    entryView.setUint16(10, 0, true); entryView.setUint16(12, 0x21, true); entryView.setUint16(14, 0x21, true); entryView.setUint32(16, crc, true); entryView.setUint32(20, data.length, true); entryView.setUint32(24, data.length, true);
    entryView.setUint16(28, nameBytes.length, true); entryView.setUint32(42, offset, true); entry.set(nameBytes, 46); central.push(entry);
    offset += local.length + data.length;
  }
  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const end = new Uint8Array(22); const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054B50, true); endView.setUint16(8, files.length, true); endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true); endView.setUint32(16, offset, true);
  return new Blob([...chunks, ...central, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function createLedgerWorkbookBlob(data) {
  const rows = buildLedgerRows(data);
  const sheetRows = rows.map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.values.map((value, colIndex) => {
    const ref = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
    if (row.types[colIndex] === 'number') return `<c r="${ref}" s="1"><v>${Number(value).toFixed(2)}</v></c>`;
    const style = rowIndex === 0 ? ' s="2"' : '';
    return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${xmlText(value)}</t></is></c>`;
  }).join('')}</row>`).join('');
  const files = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Employee Ledger" sheetId="1" r:id="rId1"/></sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    // OOXML needs a Normal base style plus explicit cell XFs; alignment here makes headers and long notes readable in Sheets/Excel.
    ['xl/styles.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="0.00"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="164" fontId="0" fillId="0" borderId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'],
    ['xl/worksheets/sheet1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0" tabSelected="1"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="1" width="24" customWidth="1"/><col min="2" max="2" width="13" customWidth="1"/><col min="3" max="4" width="18" customWidth="1"/><col min="5" max="6" width="14" customWidth="1"/><col min="7" max="7" width="48" customWidth="1"/></cols><sheetData>${sheetRows}</sheetData></worksheet>`]
  ];
  return zipStored(files);
}
// END LEDGER CSV EXPORT HELPER

function ledgerDownloadFilename(owner, format = 'xlsx', date = new Date()) {
  const safeOwner = String(owner || 'ledger')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'ledger';
  const suffix = format === 'csv' ? '-utf8.csv' : '.xlsx';
  return `ledger-${safeOwner}-${localDateInputValue(date)}${suffix}`;
}

function localDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text ?? '';
  return cell;
}

function makeElement(tag, className = '', text = undefined) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeAdminControlGroup(className, label) {
  const group = makeElement('fieldset', className);
  group.dataset.adminOnly = '';
  group.appendChild(makeElement('legend', 'sr-only', label));
  return group;
}

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const form = document.getElementById('ledger-form');
  const dateInput = document.getElementById('date');
  const typeSelect = document.getElementById('type');
  const hoursInput = document.getElementById('hours');
  const amountInput = document.getElementById('amount');
  const employeeSelect = document.getElementById('employee-select');
  const ledgerFilter = document.getElementById('ledger-employee-filter');
  const shiftLedgerForm = document.getElementById('shift-ledger-form');
  const shiftSelect = document.getElementById('ledger-shift-select');
  const shiftLedgerStatus = document.getElementById('shift-ledger-status');
  const addShiftButton = document.getElementById('add-shift-to-ledger');
  const ledgerEntryStatus = document.getElementById('ledger-entry-status');
  const ledgerOwner = document.getElementById('ledger-owner');
  const tableBody = document.getElementById('ledger-body');
  const mobileList = document.getElementById('ledger-mobile-list');
  const mobileSummary = document.getElementById('ledger-mobile-summary');
  const mobileBalance = document.getElementById('ledger-mobile-balance');
  const mobileHours = document.getElementById('ledger-mobile-hours');
  const totalRow = document.getElementById('ledger-total');
  const hoursTotal = document.getElementById('ledger-hours-total');
  const downloadLedgerButton = document.getElementById('download-ledger-btn');
  const downloadFormat = document.getElementById('ledger-download-format');
  const ledgerTable = document.getElementById('ledger-table');
  const editDialog = document.getElementById('ledger-edit-modal');
  const editForm = document.getElementById('ledger-edit-form');
  const editTitle = document.getElementById('ledger-edit-title');
  const editError = document.getElementById('ledger-edit-error');
  const editSave = document.getElementById('ledger-edit-save');
  const editCancel = document.getElementById('ledger-edit-cancel');
  const editDate = document.getElementById('edit-ledger-date');
  const editType = document.getElementById('edit-ledger-type');
  const editHours = document.getElementById('edit-ledger-hours');
  const editAmount = document.getElementById('edit-ledger-amount');
  const editNotes = document.getElementById('edit-ledger-notes');
  let editingEntryId = null;
  let editingEntryEmployeeId = null;
  let editTrigger = null;
  let ledgerSort = { key: 'date', direction: 'descending', type: 'date' };

  initializeTableSorting(ledgerTable, {
    initialSort: ledgerSort,
    onSort: sort => {
      ledgerSort = sort;
      renderLedger();
    }
  });

  populateEmployeeDropdowns(employeeSelect);
  ledgerFilter.replaceChildren(new Option('Choose an employee', ''));
  for (const employee of [...store.employees.values()].sort(compareByFirstName)) {
    ledgerFilter.add(new Option(employee.name, employee.id));
  }
  const hasUnassignedEntries = store.ledger.entries.some(entry => !entry.employeeId);
  if (hasUnassignedEntries) ledgerFilter.add(new Option('Unassigned legacy entries', 'unassigned'));
  const requestedEmployeeId = new URLSearchParams(window.location.search).get('employee');
  if ([...ledgerFilter.options].some(option => option.value === requestedEmployeeId)) {
    ledgerFilter.value = requestedEmployeeId;
    if (store.employees.has(requestedEmployeeId)) employeeSelect.value = requestedEmployeeId;
  }

  dateInput.value = localDateInputValue();

  function updateTypeInputs() {
    const isHourlyPay = typeSelect.value === 'normal';
    hoursInput.disabled = !isHourlyPay;
    amountInput.disabled = isHourlyPay;
    if (isHourlyPay) amountInput.value = '0';
    else hoursInput.value = '0';
  }
  typeSelect.addEventListener('change', updateTypeInputs);

  function selectedEmployeeId() {
    return ledgerFilter.value === 'unassigned' ? null : ledgerFilter.value;
  }

  function filteredEntries() {
    if (!ledgerFilter.value) return [];
    const employeeId = selectedEmployeeId();
    const entries = store.ledger.entries
      .filter(entry => employeeId ? entry.employeeId === employeeId : !entry.employeeId);
    if (ledgerSort.key === 'date' && ledgerSort.direction === 'descending') {
      return sortLedgerEntriesByDate(entries);
    }
    return sortTableRows(entries, {
      ...ledgerSort,
      getValue: (entry, key) => {
        switch (key) {
          case 'item': return ledgerItemLabel(entry, store.shifts);
          case 'date': return entry.date;
          case 'type': return entry.type;
          case 'hours': return entry.hours;
          case 'amount': {
            const amount = Number(entry.amount || 0);
            return String(entry.type || '').toLowerCase() === 'advance' ? -Math.abs(amount) : amount;
          }
          case 'notes': return entry.notes;
          default: return '';
        }
      }
    });
  }

  function updateEditTypeInputs() {
    const isHourlyPay = editType.value === 'normal';
    editHours.disabled = !isHourlyPay;
    editAmount.disabled = isHourlyPay;
  }

  function renderShiftOptions(preserveStatus = false) {
    const employeeId = ledgerFilter.value;
    const employee = store.employees.get(employeeId);
    const ledgeredShiftIds = new Set(store.ledger.entries
      .map(entry => String(entry.sourceShiftId || ''))
      .filter(Boolean));
    const availableShifts = employee
      ? store.shifts
        .filter(shift => shift.isComplete && shift.employee?.id === employeeId && !ledgeredShiftIds.has(String(shift.id)))
        .sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0))
      : [];

    shiftSelect.replaceChildren(new Option('Choose a completed shift', ''));
    for (const shift of availableShifts) {
      const date = shift.clockInTime?.toLocaleDateString() || 'Unknown date';
      const customer = shift.customer?.name || 'Unknown customer';
      const hours = Number(shift.getPaidHours());
      const hoursLabel = Number.isFinite(hours) ? hours.toFixed(2) : '0.00';
      shiftSelect.add(new Option(`${date} · ${customer} · ${hoursLabel} paid hours`, shift.id));
    }

    shiftSelect.disabled = !employee || availableShifts.length === 0;
    addShiftButton.disabled = shiftSelect.disabled;
    if (!preserveStatus) {
      shiftLedgerStatus.textContent = !employee
        ? 'Choose an employee above to find completed shifts.'
        : availableShifts.length
          ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' : 's'} available to add.`
          : 'No completed shifts are available to add for this employee.';
    }
  }

  function renderLedger() {
    renderShiftOptions();
    tableBody.replaceChildren();
    mobileList.replaceChildren();
    const filterValue = ledgerFilter.value;
    if (!filterValue) {
      downloadLedgerButton.disabled = true;
      mobileSummary.hidden = true;
      const row = document.createElement('tr');
      const message = makeCell('Choose an employee to view their ledger.');
      message.colSpan = 7;
      row.appendChild(message);
      tableBody.appendChild(row);
      ledgerOwner.textContent = 'Choose an employee to view their ledger.';
      totalRow.innerHTML = '<strong>Total: $0.00</strong>';
      hoursTotal.innerHTML = '<strong>0.00</strong>';
      mobileList.appendChild(makeElement('p', 'ledger-mobile-empty', 'Choose an employee to view their ledger.'));
      return;
    }

    mobileSummary.hidden = false;
    const employee = store.employees.get(filterValue);
    ledgerOwner.textContent = filterValue === 'unassigned'
      ? 'Legacy entries without an employee assignment'
      : `Ledger for ${employee?.name || 'this employee'}`;

    const entries = filteredEntries();
    downloadLedgerButton.disabled = false;
    if (entries.length === 0) {
      const row = document.createElement('tr');
      const message = makeCell('No entries for this employee yet.');
      message.colSpan = 7;
      row.appendChild(message);
      tableBody.appendChild(row);
      mobileList.appendChild(makeElement('p', 'ledger-mobile-empty', 'No entries for this employee yet.'));
    } else {
      entries.forEach(entry => {
        const row = document.createElement('tr');
        const type = String(entry.type || '').toLowerCase();
        const amount = Number(entry.amount || 0);
        const typeLabel = entry.sourceShiftId && type === 'normal'
          ? 'Shift pay'
          : type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
        const itemLabel = ledgerItemLabel(entry, store.shifts);
        const itemActionLabel = `${itemLabel}${entry.date ? `, ${entry.date}` : ''}`;
        const amountText = type === 'advance'
          ? `-$${Math.abs(amount).toFixed(2)}`
          : `$${amount.toFixed(2)}`;
        const amountCell = makeCell(amountText);
        if (type === 'advance') amountCell.classList.add('advance-amount');
        const itemCell = makeCell(itemLabel);
        itemCell.classList.add('ledger-item-cell');
        row.append(
          itemCell,
          makeCell(entry.date || ''),
          makeCell(typeLabel),
          makeCell(Number(entry.hours || 0).toFixed(2)),
          amountCell,
          makeCell(entry.notes || '')
        );
        const actionCell = document.createElement('td');
        const rowActions = makeAdminControlGroup('ledger-row-actions ledger-admin-control-group', 'Ledger entry actions');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'edit-ledger-btn';
        editButton.dataset.id = entry.id;
        editButton.setAttribute('aria-label', `Edit ${itemActionLabel}`);
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.dataset.id = entry.id;
        deleteButton.setAttribute('aria-label', `Delete ${itemActionLabel}`);
        deleteButton.textContent = 'Delete';
        rowActions.append(editButton, deleteButton);
        actionCell.appendChild(rowActions);
        row.appendChild(actionCell);
        tableBody.appendChild(row);

        const card = document.createElement('details');
        card.className = 'ledger-mobile-card';
        const summary = document.createElement('summary');
        summary.append(
          makeElement('span', 'ledger-card-entry-label', itemLabel),
          makeElement('span', 'ledger-card-date', entry.date || 'Undated'),
          makeElement('strong', 'ledger-card-amount', amountText)
        );
        const fields = makeElement('dl', 'ledger-mobile-fields');
        const addField = (label, value) => {
          const field = document.createElement('div');
          field.append(makeElement('dt', '', label), makeElement('dd', '', value || '—'));
          fields.appendChild(field);
        };
        addField('Type', typeLabel);
        addField('Hours', Number(entry.hours || 0).toFixed(2));
        addField('Amount', amountText);
        addField('Notes', entry.notes || '—');
        const mobileActions = makeAdminControlGroup('ledger-mobile-actions ledger-admin-control-group', 'Ledger entry actions');
        const mobileEdit = makeElement('button', 'edit-ledger-btn', 'Edit');
        mobileEdit.type = 'button';
        mobileEdit.dataset.id = entry.id;
        mobileEdit.setAttribute('aria-label', `Edit ${itemActionLabel}`);
        const mobileDelete = makeElement('button', 'delete-btn', 'Delete');
        mobileDelete.type = 'button';
        mobileDelete.dataset.id = entry.id;
        mobileDelete.setAttribute('aria-label', `Delete ${itemActionLabel}`);
        mobileActions.append(mobileEdit, mobileDelete);
        card.append(summary, fields, mobileActions);
        mobileList.appendChild(card);
      });
    }

    const total = entries.reduce((sum, entry) => {
      const amount = Number(entry.amount || 0);
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
    }, 0);
    const balanceText = `$${total.toFixed(2)}`;
    totalRow.innerHTML = `<strong>Balance: ${balanceText}</strong>`;
    mobileBalance.textContent = balanceText;
    const totalHours = sumLedgerHours(entries);
    hoursTotal.innerHTML = `<strong>${totalHours.toFixed(2)}</strong>`;
    mobileHours.textContent = `${totalHours.toFixed(2)} h`;
  }

  function updateDownloadButton() {
    if (downloadLedgerButton) downloadLedgerButton.textContent = downloadFormat?.value === 'csv' ? 'Download CSV' : 'Download spreadsheet';
  }

  downloadFormat?.addEventListener('change', updateDownloadButton);
  updateDownloadButton();

  downloadLedgerButton.addEventListener('click', () => {
    if (!ledgerFilter.value) return;
    const entries = filteredEntries();
    const total = entries.reduce((sum, entry) => {
      const amount = Number(entry.amount || 0);
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
    }, 0);
    const totalHours = sumLedgerHours(entries);
    const owner = store.employees.get(ledgerFilter.value)?.name
      || (ledgerFilter.value === 'unassigned' ? 'Unassigned legacy entries' : ledgerOwner.textContent || 'Selected ledger');
    const exportData = {
      owner,
      entries: entries.map(entry => ({ ...entry, itemLabel: ledgerItemLabel(entry, store.shifts) })),
      total,
      totalHours
    };
    const format = downloadFormat?.value === 'csv' ? 'csv' : 'xlsx';
    const blob = format === 'csv'
      ? createLedgerCsvBlob(formatLedgerCsv(exportData))
      : createLedgerWorkbookBlob(exportData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = ledgerDownloadFilename(owner, format);
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  ledgerFilter.addEventListener('change', () => {
    if (store.employees.has(ledgerFilter.value)) employeeSelect.value = ledgerFilter.value;
    renderLedger();
  });

  if (store.recentlyArchivedLedgerIds.length) {
    ledgerEntryStatus.textContent = 'A zero-balance ledger was archived. View archived ledger history to review it.';
  }

  shiftLedgerForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!shiftLedgerForm.reportValidity()) return;

    const shiftId = shiftSelect.value;
    ledgerEntryStatus.textContent = '';
    addShiftButton.disabled = true;
    addShiftButton.textContent = 'Adding…';
    shiftLedgerStatus.textContent = 'Adding the shift to the ledger…';
    let entryWasSaved = false;
    try {
      const entry = await store.saveShiftToLedger(shiftId);
      entryWasSaved = true;
      if (ledgerFilter.value !== entry.employeeId) ledgerFilter.value = entry.employeeId;
      employeeSelect.value = entry.employeeId;
      renderLedger();
      shiftLedgerForm.reset();
      shiftLedgerStatus.textContent = 'Shift added to the ledger.';
      if (window.confirm('Shift added to the ledger. Would you like to adjust this ledger entry?')) {
        const trigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
          .find(button => button.dataset.id === entry.id);
        openEditDialog(entry, trigger);
      } else {
        const archive = await store.archiveSettledLedger(entry.employeeId);
        if (archive) {
          renderLedger();
          shiftLedgerStatus.textContent = 'The balance is $0.00. Ledger history was archived.';
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. View archived ledger history to review it.';
        }
      }
    } catch (error) {
      console.error('Unable to add shift to ledger:', error);
      entryWasSaved ||= Boolean(error.entrySaved);
      if (entryWasSaved) {
        shiftLedgerForm.reset();
        renderLedger();
        shiftLedgerStatus.textContent = `Shift was added, but its settled ledger could not be fully archived. ${error.message || ''}`.trim();
      } else {
        shiftLedgerStatus.textContent = error.message || 'Unable to add this shift to the ledger. Please try again.';
      }
    } finally {
      addShiftButton.textContent = 'Add shift to ledger';
      renderShiftOptions(true);
    }
  });

  renderLedger();
  updateTypeInputs();

  function openEditDialog(entry, trigger) {
    if (!editDialog || !editForm || !entry) return;
    editingEntryId = entry.id;
    editingEntryEmployeeId = entry.employeeId;
    editTrigger = trigger;
    editError.textContent = '';
    editTitle.textContent = `Edit ${ledgerItemLabel(entry, store.shifts)}`;
    editDate.value = entry.date || '';
    editType.value = String(entry.type || 'normal').toLowerCase();
    editHours.value = String(Number(entry.hours || 0));
    editAmount.value = String(Math.abs(Number(entry.amount || 0)));
    editNotes.value = entry.notes || '';
    updateEditTypeInputs();
    editDialog.showModal();
    editDate.focus();
  }

  editType.addEventListener('change', updateEditTypeInputs);
  editCancel.addEventListener('click', () => editDialog.close());
  editDialog.addEventListener('close', async () => {
    const entryId = editingEntryId;
    const employeeId = editingEntryEmployeeId;
    const trigger = editTrigger;
    editingEntryId = null;
    editingEntryEmployeeId = null;
    editTrigger = null;
    if (employeeId && store.pendingLedgerSettlements.has(String(employeeId))) {
      try {
        const archive = await store.archiveSettledLedger(employeeId);
        if (archive) {
          renderLedger();
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
        }
      } catch (error) {
        console.error('Unable to archive the settled ledger:', error);
        ledgerEntryStatus.textContent = error.message || 'The ledger is settled, but archiving is pending. Retry from Ledger archive.';
      }
    }
    if (trigger?.isConnected) {
      trigger.focus();
      return;
    }
    const editTriggers = [
      ...mobileList.querySelectorAll('.edit-ledger-btn[data-id]'),
      ...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')
    ].filter(button => button.dataset.id === entryId);
    const replacementTrigger = editTriggers.find(button => button.getClientRects?.().length > 0) || editTriggers[0];
    (replacementTrigger || ledgerFilter).focus();
  });

  editForm.addEventListener('submit', async event => {
    event.preventDefault();
    editError.textContent = '';
    if (!editForm.reportValidity() || !editingEntryId) return;

    const entry = store.ledger.getEntry(editingEntryId);
    if (!entry) {
      editError.textContent = 'This ledger entry could not be found. Close the dialog and try again.';
      return;
    }

    const type = editType.value;
    const updates = {
      date: editDate.value,
      type,
      notes: editNotes.value.trim()
    };
    if (type === 'normal') {
      const hours = Number(editHours.value);
      if (!Number.isFinite(hours) || hours < 0) {
        editError.textContent = 'Hours must be a valid number of zero or more.';
        editHours.focus();
        return;
      }
      updates.hours = hours;
      const employee = entry.employeeId ? store.employees.get(entry.employeeId) : null;
      updates.amount = employee ? employee.getPay(hours) : Number(entry.amount || 0);
    } else {
      const amount = Number(editAmount.value);
      if (!Number.isFinite(amount) || amount < 0) {
        editError.textContent = 'Amount must be a valid number of zero or more.';
        editAmount.focus();
        return;
      }
      updates.amount = amount;
      if (String(entry.type || '').toLowerCase() === 'normal') updates.hours = 0;
    }

    editSave.disabled = true;
    editSave.textContent = 'Saving…';
    try {
      const updatedEntry = await store.updateLedgerEntry(editingEntryId, updates);
      renderLedger();
      if (updatedEntry.archivedOnZero) {
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
      }
      editDialog.close();
    } catch (error) {
      console.error('Unable to update ledger entry:', error);
      if (error.entrySaved) {
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        editDialog.close();
        return;
      }
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
    } finally {
      editSave.disabled = false;
      editSave.textContent = 'Save changes';
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    ledgerEntryStatus.textContent = '';
    const employeeId = employeeSelect.value;
    const employee = store.employees.get(employeeId);
    if (!employee) {
      window.alert('Choose an employee before adding a ledger entry.');
      return;
    }

    const type = typeSelect.value;
    const notes = document.getElementById('notes').value.trim();
    let hours = 0;
    let amount = 0;
    if (type === 'normal') {
      hours = Number(hoursInput.value);
      if (!Number.isFinite(hours) || hours < 0) {
        window.alert('Hours must be a valid number of zero or more.');
        return;
      }
      amount = employee.getPay(hours);
    } else {
      amount = Number(amountInput.value);
      if (!Number.isFinite(amount) || amount < 0) {
        window.alert('Amount must be a valid number of zero or more.');
        return;
      }
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
      const entry = await store.saveLedgerEntry({
        employeeId,
        date: dateInput.value,
        type,
        hours,
        amount,
        notes
      });
      if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
      renderLedger();
      form.reset();
      dateInput.value = localDateInputValue();
      typeSelect.value = 'normal';
      updateTypeInputs();
      employeeSelect.value = employeeId;
      ledgerEntryStatus.textContent = entry.archivedOnZero
        ? 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.'
        : '';
    } catch (error) {
      console.error('Unable to save ledger entry:', error);
      if (error.entrySaved) {
        form.reset();
        dateInput.value = localDateInputValue();
        typeSelect.value = 'normal';
        updateTypeInputs();
        employeeSelect.value = employeeId;
        if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        return;
      }
      window.alert(error.message || 'Unable to save this ledger entry. Please try again.');
    } finally {
      submitButton.disabled = false;
    }
  });

  async function handleLedgerAction(event) {
    const editButton = event.target.closest('.edit-ledger-btn[data-id]');
    if (editButton) {
      const entry = store.ledger.getEntry(editButton.dataset.id);
      openEditDialog(entry, editButton);
      return;
    }
    const button = event.target.closest('.delete-btn[data-id]');
    if (!button) return;
    button.disabled = true;
    const previousArchiveCount = store.recentlyArchivedLedgerIds.length;
    try {
      await store.deleteLedgerEntry(button.dataset.id);
      renderLedger();
      if (store.recentlyArchivedLedgerIds.length > previousArchiveCount) {
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
      }
    } catch (error) {
      console.error('Unable to delete ledger entry:', error);
      if (error.entrySaved) {
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        return;
      }
      button.disabled = false;
      window.alert('This ledger entry could not be deleted. Please try again.');
    }
  }

  tableBody.addEventListener('click', handleLedgerAction);
  mobileList.addEventListener('click', handleLedgerAction);
});
