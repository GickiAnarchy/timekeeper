export function ledgerItemLabel(entry, shifts = []) {
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
