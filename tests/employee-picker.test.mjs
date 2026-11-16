import test from 'node:test';
import assert from 'node:assert/strict';
import { employeeSelectionLabel, selectedEmployeeIds } from '../scripts/employee-picker.mjs';

test('clock-in picker returns every checked employee while excluding unchecked and empty values', () => {
  const inputs = [
    { value: 'employee-a', checked: true },
    { value: 'employee-b', checked: false },
    { value: '', checked: true },
    { value: 'employee-c', checked: true }
  ];

  assert.deepEqual(selectedEmployeeIds(inputs), ['employee-a', 'employee-c']);
  assert.deepEqual(selectedEmployeeIds([]), []);
});

test('clock-in picker count clearly reports none, one, or multiple selected employees', () => {
  assert.equal(employeeSelectionLabel(0), '0 selected');
  assert.equal(employeeSelectionLabel(1), '1 selected');
  assert.equal(employeeSelectionLabel(3), '3 selected');
});
