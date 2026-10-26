import test from 'node:test';
import assert from 'node:assert/strict';
import { ledgerItemLabel } from '../scripts/ledger-display.mjs';

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
