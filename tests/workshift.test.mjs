import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const workshiftSource = await readFile(new URL('../www/scripts/models/workshift.js', import.meta.url), 'utf8');

function loadWorkshift(now) {
  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [now]));
    }
  }

  const context = {
    Date: FixedDate,
    Intl,
    crypto: { randomUUID: () => 'generated-workshift-id' },
    console: { log() {} }
  };
  runInNewContext(`${workshiftSource}\nglobalThis.WorkshiftForTest = Workshift;`, context);
  return context.WorkshiftForTest;
}

test('start rounds up and stop rounds down to quarter-hour boundaries', () => {
  const Workshift = loadWorkshift('2026-11-24T09:07:00Z');
  const shift = new Workshift('shift-1', 'employee-1', 'customer-1', new Date('2026-11-24T08:00:00Z'));

  shift.startShift();
  assert.equal(shift.startTime.toISOString(), '2026-11-24T09:15:00.000Z');

  const WorkshiftAtStop = loadWorkshift('2026-11-24T12:08:00Z');
  const stoppedShift = new WorkshiftAtStop('shift-2', 'employee-1', 'customer-1', new Date('2026-11-24T09:15:00Z'));
  stoppedShift.stopShift();
  assert.equal(stoppedShift.endTime.toISOString(), '2026-11-24T12:00:00.000Z');
  assert.equal(stoppedShift.getDuration(), 2.75);
});

test('clock-in and clock-out values already on quarter-hour boundaries remain unchanged', () => {
  const StartWorkshift = loadWorkshift('2026-11-24T09:15:00Z');
  const started = new StartWorkshift('shift-start', 'employee-1', 'customer-1');
  started.startShift();
  assert.equal(started.startTime.toISOString(), '2026-11-24T09:15:00.000Z');

  const StopWorkshift = loadWorkshift('2026-11-24T12:15:00Z');
  const stopped = new StopWorkshift('shift-stop', 'employee-1', 'customer-1', new Date('2026-11-24T09:15:00Z'));
  stopped.stopShift();
  assert.equal(stopped.endTime.toISOString(), '2026-11-24T12:15:00.000Z');
});

test('quarter-hour breaks reduce duration and numeric total pay without changing the numeric API', () => {
  const Workshift = loadWorkshift('2026-11-24T12:00:00Z');
  const shift = new Workshift(
    'shift-pay', 'employee-1', 'customer-1',
    new Date('2026-11-24T09:00:00Z'), new Date('2026-11-24T12:00:00Z'), 15
  );

  assert.equal(shift.getDuration(), 2.75);
  assert.equal(shift.getTotalPay(20), 55);
  assert.equal(shift.setBreakDuration(30), 30);
  assert.equal(shift.getDuration(), 2.5);
  assert.equal(shift.getTotalPay(20), 50);
});

test('break durations must be non-negative quarter-hour multiples', () => {
  const Workshift = loadWorkshift('2026-11-24T12:00:00Z');
  assert.throws(() => new Workshift('invalid-break', 'employee-1', 'customer-1', null, null, 10), /multiple of 15 minutes/);

  const shift = new Workshift('valid-break', 'employee-1', 'customer-1');
  for (const invalidMinutes of [-15, 7.5, 20, '15']) {
    assert.throws(() => shift.setBreakDuration(invalidMinutes), /multiple of 15 minutes/);
  }
  assert.equal(shift.breakDurationMinutes, 0);
});

test('breaks longer than the shift and incomplete shifts do not produce negative or fabricated pay', () => {
  const Workshift = loadWorkshift('2026-11-24T12:00:00Z');
  const incomplete = new Workshift('incomplete', 'employee-1', 'customer-1', new Date('2026-11-24T09:00:00Z'));
  assert.equal(incomplete.getDuration(), null);
  assert.equal(incomplete.getTotalPay(20), null);

  const tooMuchBreak = new Workshift(
    'too-much-break', 'employee-1', 'customer-1',
    new Date('2026-11-24T09:00:00Z'), new Date('2026-11-24T09:15:00Z'), 30
  );
  assert.equal(tooMuchBreak.getDuration(), null);
  assert.equal(tooMuchBreak.getTotalPay(20), null);
});

test('formatted total pay uses currency formatting while the existing total stays numeric', () => {
  const Workshift = loadWorkshift('2026-11-24T12:00:00Z');
  const shift = new Workshift(
    'shift-format', 'employee-1', 'customer-1',
    new Date('2026-11-24T09:00:00Z'), new Date('2026-11-24T12:00:00Z'), 15
  );

  assert.equal(shift.getTotalPay(20), 55);
  assert.equal(shift.getFormattedTotalPay(20, 'USD', 'en-US'), '$55.00');
  assert.equal(shift.getFormattedTotalPay(20, 'CAD', 'en-CA'), new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(55));
  assert.equal(shift.getFormattedTotalPay(20), new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(55));
});
