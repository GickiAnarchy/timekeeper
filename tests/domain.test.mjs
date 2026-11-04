import test from 'node:test';
import assert from 'node:assert/strict';
import {
  actualShiftHours,
  roundDown15Minutes,
  roundTo15Minutes,
  roundUp15Minutes
} from '../scripts/domain.mjs';

const date = value => new Date(value);

test('quarter-hour rounding preserves nearest, down, and up behavior at boundaries', () => {
  assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');
  assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');
  assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');
  assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');
});

test('actual shift hours support overnight shifts and breaks across midnight', () => {
  assert.equal(actualShiftHours(
    '2026-10-08T22:00:00Z',
    '2026-10-09T06:00:00Z',
    [{ start: '2026-10-09T01:00:00Z', end: '2026-10-09T01:30:00Z' }]
  ), 7.5);
});

test('breaks are clipped to the shift and overlapping intervals are subtracted once', () => {
  assert.equal(actualShiftHours(
    '2026-10-09T09:00:00Z',
    '2026-10-09T11:00:00Z',
    [
      { start: '2026-10-09T08:30:00Z', end: '2026-10-09T09:45:00Z' },
      { start: '2026-10-09T09:30:00Z', end: '2026-10-09T10:00:00Z' }
    ]
  ), 1);
});

test('invalid or incomplete shift times produce zero completed hours', () => {
  assert.equal(actualShiftHours('not-a-date', '2026-10-09T11:00:00Z'), 0);
  assert.equal(actualShiftHours('2026-10-09T09:00:00Z', null), 0);
  assert.equal(actualShiftHours('2026-10-09T11:00:00Z', '2026-10-09T09:00:00Z'), 0);
});
