import test from 'node:test';
import assert from 'node:assert/strict';
import {
  guestSafeLocation,
  publicCustomerData,
  publicEmployeeData,
  publicShiftData
} from '../scripts/guest-data.mjs';

test('guest employee projection includes only the employee name', () => {
  assert.deepEqual(publicEmployeeData({ name: 'Riley', wage: 31.5, privateNote: 'private' }), { name: 'Riley' });
});

test('guest customer projection keeps general locations and removes numbered street addresses', () => {
  assert.deepEqual(publicCustomerData({
    name: 'Oak Park Client', location: '  Oak Park  ', note: 'private', billingRate: 90
  }), { name: 'Oak Park Client', location: 'Oak Park' });
  assert.equal(guestSafeLocation('123 Main Street'), null);
  assert.equal(guestSafeLocation('42B North Road'), null);
  assert.equal(guestSafeLocation('Springfield'), 'Springfield');
});

test('guest shift projection contains only operational clock fields', () => {
  const projection = publicShiftData({
    employeeId: 'e1', custId: 'c1', clockInTime: new Date('2026-10-11T09:00:00Z'),
    clockOutTime: null, breaks: [{ start: null, end: null }],
    note: 'private', isPaid: true, paidHours: 8, wage: 50, billingRate: 100
  });
  assert.deepEqual(Object.keys(projection).sort(), ['breaks', 'clockInTime', 'clockOutTime', 'custId', 'employeeId']);
  assert.equal(projection.clockInTime, '2026-10-11T09:00:00.000Z');
  assert.equal('note' in projection, false);
  assert.equal('isPaid' in projection, false);
  assert.equal('paidHours' in projection, false);
});
