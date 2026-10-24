export function asValidDate(value) {
  if (value === null || value === undefined || value === '') return null;
  const source = typeof value?.toDate === 'function' ? value.toDate() : value;
  const date = source instanceof Date ? new Date(source) : new Date(source);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function sortLedgerEntriesByDate(entries = []) {
  const dateValue = value => asValidDate(value)?.getTime() ?? Number.NEGATIVE_INFINITY;
  return [...entries].sort((a, b) => {
    const dateDifference = dateValue(b?.date) - dateValue(a?.date);
    if (dateDifference) return dateDifference;
    const indexDifference = Number(b?.index || 0) - Number(a?.index || 0);
    if (indexDifference) return indexDifference;
    return String(a?.id || '').localeCompare(String(b?.id || ''));
  });
}

export function sumLedgerHours(entries = []) {
  return (Array.isArray(entries) ? entries : []).reduce((sum, entry) => {
    if (String(entry?.type || '').toLowerCase() === 'advance') return sum;
    const hours = Number(entry?.hours || 0);
    return Number.isFinite(hours) ? sum + hours : sum;
  }, 0);
}

export function ledgerBalanceCents(entries = []) {
  return (Array.isArray(entries) ? entries : []).reduce((balance, entry) => {
    const amount = Number(entry?.amount || 0);
    if (!Number.isFinite(amount)) return balance;
    const cents = Math.round(amount * 100);
    const type = String(entry?.type || '').toLowerCase();
    return balance + (type === 'advance' ? -cents : cents);
  }, 0);
}

export function sortTableRows(rows = [], { key, direction = 'ascending', type = 'text', getValue = row => row?.[key] } = {}) {
  const source = Array.isArray(rows) ? rows : [];
  if (!key || !['ascending', 'descending'].includes(direction)) return [...source];

  const normalizedType = ['number', 'date'].includes(type) ? type : 'text';
  const comparable = value => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return null;
    if (normalizedType === 'number') {
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    }
    if (normalizedType === 'date') return asValidDate(value)?.getTime() ?? null;
    return String(value).trim();
  };

  return source.map((row, index) => ({ row, index, value: comparable(getValue(row, key)) }))
    .sort((a, b) => {
      if (a.value === null || b.value === null) {
        if (a.value === null && b.value === null) return a.index - b.index;
        return a.value === null ? 1 : -1;
      }
      const comparison = normalizedType === 'text'
        ? a.value.localeCompare(b.value, undefined, { numeric: true, sensitivity: 'base' })
        : a.value - b.value;
      return comparison === 0 ? a.index - b.index : direction === 'descending' ? -comparison : comparison;
    })
    .map(item => item.row);
}

export function roundTo15Minutes(date = new Date()) {
  const source = asValidDate(date);
  if (!source) throw new TypeError('A valid date is required.');
  const interval = 15 * 60 * 1000;
  return new Date(Math.round(source.getTime() / interval) * interval);
}

export function roundDown15Minutes(date = new Date()) {
  const source = asValidDate(date);
  if (!source) throw new TypeError('A valid date is required.');
  const interval = 15 * 60 * 1000;
  return new Date(Math.floor(source.getTime() / interval) * interval);
}

export function roundUp15Minutes(date = new Date()) {
  const source = asValidDate(date);
  if (!source) throw new TypeError('A valid date is required.');
  const interval = 15 * 60 * 1000;
  return new Date(Math.ceil(source.getTime() / interval) * interval);
}

export function actualShiftHours(clockInTime, clockOutTime, breaks = []) {
  const start = asValidDate(clockInTime);
  const end = asValidDate(clockOutTime);
  if (!start || !end || end <= start) return 0;

  const intervals = (Array.isArray(breaks) ? breaks : [])
    .map(item => ({ start: asValidDate(item?.start), end: asValidDate(item?.end) }))
    .filter(item => item.start && item.end && item.end > item.start)
    .map(item => ({
      start: Math.max(start.getTime(), item.start.getTime()),
      end: Math.min(end.getTime(), item.end.getTime())
    }))
    .filter(item => item.end > item.start)
    .sort((a, b) => a.start - b.start);

  let breakMs = 0;
  let current = null;
  for (const interval of intervals) {
    if (!current || interval.start > current.end) {
      if (current) breakMs += current.end - current.start;
      current = { ...interval };
    } else {
      current.end = Math.max(current.end, interval.end);
    }
  }
  if (current) breakMs += current.end - current.start;

  return Number((Math.max(0, end.getTime() - start.getTime() - breakMs) / 3_600_000).toFixed(2));
}

export function plannedDateStatus(scheduledDate, today = new Date()) {
  const date = asValidDate(scheduledDate);
  if (!date) return 'tbd';
  const todayDate = asValidDate(today) || new Date();
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
  const difference = dayNumber(date) - dayNumber(todayDate);
  if (difference < 0) return 'overdue';
  if (difference === 0) return 'due-today';
  if (difference === 1) return 'tomorrow';
  return 'upcoming';
}

export function invoiceShiftIds(invoice) {
  const ids = new Set((Array.isArray(invoice?.shiftIds) ? invoice.shiftIds : []).filter(Boolean).map(String));
  (Array.isArray(invoice?.items) ? invoice.items : []).forEach(item => {
    if (item?.shiftId) ids.add(String(item.shiftId));
  });
  return ids;
}

export function shiftIsAttachedElsewhere(invoices, shiftId, invoiceId) {
  const targetShiftId = String(shiftId);
  return (Array.isArray(invoices) ? invoices : []).some(invoice =>
    String(invoice?.id) !== String(invoiceId) && invoiceShiftIds(invoice).has(targetShiftId)
  );
}

export function shiftSnapshot(shift) {
  const asIso = value => asValidDate(value)?.toISOString() || null;
  const breaks = (Array.isArray(shift?.breaks) ? shift.breaks : [])
    .map(item => ({ start: asIso(item?.start), end: asIso(item?.end) }))
    .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')) || String(a.end || '').localeCompare(String(b.end || '')));
  return {
    employeeId: shift?.employee?.id == null ? null : String(shift.employee.id),
    customerId: shift?.customer?.id == null ? null : String(shift.customer.id),
    clockInTime: asIso(shift?.clockInTime),
    clockOutTime: asIso(shift?.clockOutTime),
    breaks,
    billedHours: actualShiftHours(shift?.clockInTime, shift?.clockOutTime, shift?.breaks)
  };
}

export function makeShiftInvoiceLine(shift, billingRate) {
  const rate = Number(billingRate);
  if (!Number.isFinite(rate) || rate < 0) throw new TypeError('A valid non-negative customer billing rate is required.');
  const snapshot = shiftSnapshot(shift);
  if (!snapshot.clockInTime || !snapshot.clockOutTime || !Number.isFinite(snapshot.billedHours) || snapshot.billedHours < 0) {
    throw new TypeError('A completed shift with valid break-adjusted hours is required.');
  }
  return {
    name: '',
    value: Number((snapshot.billedHours * rate).toFixed(2)),
    shiftId: String(shift.id),
    actualHours: snapshot.billedHours,
    billedHours: snapshot.billedHours,
    billingRate: rate,
    shiftSnapshot: snapshot
  };
}

export function makeShiftLedgerEntryData(shift) {
  const start = asValidDate(shift?.clockInTime);
  const end = asValidDate(shift?.clockOutTime);
  const employeeId = shift?.employee?.id;
  const shiftId = shift?.id;
  const hours = Number(typeof shift?.getPaidHours === 'function'
    ? shift.getPaidHours()
    : Number.isFinite(shift?.paidHours)
      ? shift.paidHours
      : actualShiftHours(start, end, shift?.breaks));
  const wage = Number(shift?.employee?.wage);

  if (!start || !end || end <= start || !employeeId || !shiftId) {
    throw new TypeError('A completed shift with an employee is required.');
  }
  if (!Number.isFinite(hours) || hours < 0 || !Number.isFinite(wage) || wage < 0) {
    throw new TypeError('The shift must have valid non-negative paid hours and an employee wage.');
  }

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  const customerName = String(shift.customer?.name || '').trim();
  const shiftNote = String(shift.note || '').trim();
  const notes = [customerName ? `Shift · ${customerName}` : 'Shift pay', shiftNote]
    .filter(Boolean)
    .join(' — ');
  const amount = Number((wage * hours).toFixed(2));
  if (!Number.isFinite(amount)) throw new TypeError('The shift pay amount is not valid.');

  return {
    employeeId: String(employeeId),
    date: `${year}-${month}-${day}`,
    type: 'normal',
    hours,
    amount,
    notes,
    sourceShiftId: String(shiftId)
  };
}

export function shiftInvoiceLineStatus(line, currentShift) {
  if (!currentShift) return 'missing';
  const recorded = line?.shiftSnapshot;
  if (!recorded || typeof recorded !== 'object') return 'unverified';
  const current = shiftSnapshot(currentShift);
  const sameBreaks = Array.isArray(recorded.breaks) && recorded.breaks.length === current.breaks.length &&
    recorded.breaks.every((item, index) => item?.start === current.breaks[index].start && item?.end === current.breaks[index].end);
  const same = String(recorded.employeeId ?? '') === String(current.employeeId ?? '') &&
    String(recorded.customerId ?? '') === String(current.customerId ?? '') &&
    recorded.clockInTime === current.clockInTime && recorded.clockOutTime === current.clockOutTime &&
    Number(recorded.billedHours) === current.billedHours && sameBreaks;
  return same ? 'current' : 'changed';
}
