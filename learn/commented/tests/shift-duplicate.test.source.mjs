// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import vm from 'node:vm';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { readFileSync } from 'node:fs';
// Original L5: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { actualShiftHours } from '../scripts/domain.mjs';
// Original L6: Blank line separates related setup or assertions for readability.

// Original L7: Initializes modelsSource for 'test setup', supplying the value that the following test logic will inspect or mutate.
const modelsSource = readFileSync(new URL('../scripts/models.js', import.meta.url), 'utf8');
// Original L8: Builds formatTime24, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
const formatTime24 = date => {
// Original L9: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
// Original L10: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
// Original L11: Closes the fixture, callback, loop, or test block for 'test setup'.
};
// Original L12: Blank line separates related setup or assertions for readability.

// Original L13: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function extractClass(source, className) {
// Original L14: Builds start, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const start = source.indexOf(`export class ${className} {`);
// Original L15: In the test 'test setup', this negative equality assertion requires the compared expressions to differ: assert.notEqual(start, -1, `could not find ${className} in models.js`);; this verifies independence or a deliberate change in behavior.
  assert.notEqual(start, -1, `could not find ${className} in models.js`);
// Original L16: Builds bodyStart, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const bodyStart = source.indexOf('{', start);
// Original L17: Initializes depth for 'test setup', supplying the value that the following test logic will inspect or mutate.
  let depth = 0;
// Original L18: Initializes quote for 'test setup', supplying the value that the following test logic will inspect or mutate.
  let quote = null;
// Original L19: Initializes escaped for 'test setup', supplying the value that the following test logic will inspect or mutate.
  let escaped = false;
// Original L20: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  for (let index = bodyStart; index < source.length; index += 1) {
// Original L21: Builds character, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
    const character = source[index];
// Original L22: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (quote) {
// Original L23: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
      if (escaped) escaped = false;
// Original L24: Checks whether checks that `character` (character) and "\\" have the same value and type; runs the following statement/block only when truthy, otherwise runs the else branch.
      else if (character === '\\') escaped = true;
// Original L25: Checks whether checks that `character` (character) and `quote` (quote) have the same value and type; runs the following statement/block only when truthy.
      else if (character === quote) quote = null;
// Original L26: Continues the surrounding JavaScript expression or argument list. This line contributes continue;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
      continue;
// Original L27: Closes the fixture, callback, loop, or test block for 'test setup'.
    }
// Original L28: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (character === '"' || character === "'" || character === '`') {
// Original L29: Sets `quote` (quote) to `character` (character).
      quote = character;
// Original L30: Continues the surrounding JavaScript expression or argument list. This line contributes continue;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
      continue;
// Original L31: Closes the fixture, callback, loop, or test block for 'test setup'.
    }
// Original L32: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (character === '{') depth += 1;
// Original L33: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (character === '}' && --depth === 0) return source.slice(start + 'export '.length, index + 1);
// Original L34: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L35: Throws constructs a new instance of `Error` with a text template that combines fixed text with computed values `className` (class name); normal execution stops until a matching catch handles it.
  throw new Error(`could not parse ${className} from models.js`);
// Original L36: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L37: Blank line separates related setup or assertions for readability.

// Original L38: Initializes uuid for 'test setup', supplying the value that the following test logic will inspect or mutate.
let uuid = 0;
// Original L39: Initializes WorkShift for 'test setup', supplying the value that the following test logic will inspect or mutate.
const WorkShift = vm.runInNewContext(
// Original L40: Calls `extractClass` with `modelsSource` (models source); "WorkShift".
  `${extractClass(modelsSource, 'WorkShift')}\nWorkShift`,
// Original L41: Continues the surrounding JavaScript expression or argument list. This line contributes {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  {
// Original L42: Sets the object field Date using Date. This field is read later through its property name.
    Date,
// Original L43: Sets the object field actualShiftHours using actualShiftHours. This field is read later through its property name.
    actualShiftHours,
// Original L44: Defines field crypto as an object with fields randomUUID: a callback taking no parameters that a text template that combines fixed text with computed values increases `uuid` (uuid) by 1.
    crypto: { randomUUID: () => `generated-shift-${++uuid}` },
// Original L45: Sets the object field formatTime24 using formatTime24. This field is read later through its property name.
    formatTime24
// Original L46: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L47: Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
);
// Original L48: Blank line separates related setup or assertions for readability.

// Original L49: Defines the test fixture/helper employee; its returned mock data represents the application state needed to exercise 'test setup'.
const employee = (id, wage) => ({
// Original L50: Sets the object field id using id. This field is read later through its property name.
  id,
// Original L51: Sets the object field wage using wage. This field is read later through its property name.
  wage,
// Original L52: Defines field getPay as a callback taking hours that runs its enclosed statements.
  getPay(hours) {
// Original L53: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
    return Number((this.wage * hours).toFixed(2));
// Original L54: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L55: Closes the fixture, callback, loop, or test block for 'test setup'.
});
// Original L56: Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.
const customer = { id: 'customer-1', name: 'Oak Street' };
// Original L57: Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'test setup'.
const date = value => new Date(value);
// Original L58: Blank line separates related setup or assertions for readability.

// Original L59: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function completedShift(paidHours = null) {
// Original L60: Builds shift, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const shift = new WorkShift(employee('source-employee', 20), customer, 'source-shift', 'Front lawn', true, [
// Original L61: Continues the arguments for date. Each comma separates one argument that the function receives in this order.
    { start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }
// Original L62: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
  ], paidHours);
// Original L63: Sets `shift.clockInTime` (the clock in time property of shift) to calls `date` with "2026-10-08T22:00:00Z".
  shift.clockInTime = date('2026-10-08T22:00:00Z');
// Original L64: Sets `shift.clockOutTime` (the clock out time property of shift) to calls `date` with "2026-10-09T06:00:00Z".
  shift.clockOutTime = date('2026-10-09T06:00:00Z');
// Original L65: Sets `shift.ledgerEntryId` (the ledger entry id property of shift) to "ledger-source".
  shift.ledgerEntryId = 'ledger-source';
// Original L66: Sets `shift.invoiceId` (the invoice id property of shift) to "invoice-source".
  shift.invoiceId = 'invoice-source';
// Original L67: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return shift;
// Original L68: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L69: Blank line separates related setup or assertions for readability.

// Original L70: Starts an isolated test case whose title states the behavior being specified: duplicateFor rejects missing, same, incomplete, and invalid source employees or times.
test('duplicateFor rejects missing, same, incomplete, and invalid source employees or times', () => {
// Original L71: Initializes source for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', supplying the value that the following test logic will inspect or mutate.
  const source = completedShift();
// Original L72: In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(), /different employee/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => source.duplicateFor(), /different employee/);
// Original L73: In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(null), /different employee/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => source.duplicateFor(null), /different employee/);
// Original L74: In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(source.employee), /different employee/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => source.duplicateFor(source.employee), /different employee/);
// Original L75: In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(employee('source-employee', 30)), /different employee/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => source.duplicateFor(employee('source-employee', 30)), /different employee/);
// Original L76: Blank line separates related setup or assertions for readability.

// Original L77: Controls iteration/branching in the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test so each relevant fixture or environment condition is exercised.
  for (const configure of [
// Original L78: Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.
    shift => { shift.clockOutTime = null; },
// Original L79: Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.
    shift => { shift.clockInTime = date('invalid'); },
// Original L80: Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.
    shift => { shift.clockOutTime = date('2026-10-08T21:00:00Z'); },
// Original L81: Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.
    shift => { shift.clockInTime = '2026-10-08T22:00:00Z'; }
// Original L82: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
  ]) {
// Original L83: Initializes invalid for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', supplying the value that the following test logic will inspect or mutate.
    const invalid = completedShift();
// Original L84: Calls `configure` with `invalid` (invalid).
    configure(invalid);
// Original L85: In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => invalid.duplicateFor(employee('target-employee', 30)), /completed shift with valid start and end/);; invalid domain input must be rejected rather than accepted.
    assert.throws(() => invalid.duplicateFor(employee('target-employee', 30)), /completed shift with valid start and end/);
// Original L86: Closes the fixture, callback, loop, or test block for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times'.
  }
// Original L87: Closes the fixture, callback, loop, or test block for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times'.
});
// Original L88: Blank line separates related setup or assertions for readability.

// Original L89: Starts an isolated test case whose title states the behavior being specified: duplicateFor creates an independent completed shift for the target employee.
test('duplicateFor creates an independent completed shift for the target employee', () => {
// Original L90: Initializes source for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.
  const source = completedShift();
// Original L91: Initializes target for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.
  const target = employee('target-employee', 30);
// Original L92: Initializes duplicate for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.
  const duplicate = source.duplicateFor(target);
// Original L93: Blank line separates related setup or assertions for readability.

// Original L94: In the test 'duplicateFor creates an independent completed shift for the target employee', this truthiness assertion requires the concrete condition to hold: assert.ok(duplicate instanceof WorkShift);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(duplicate instanceof WorkShift);
// Original L95: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate, source);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate, source);
// Original L96: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.id, 'generated-shift-1');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.id, 'generated-shift-1');
// Original L97: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notEqual(duplicate.id, source.id);; this verifies independence or a deliberate change in behavior.
  assert.notEqual(duplicate.id, source.id);
// Original L98: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.strictEqual(duplicate.employee, target);; the fixture therefore checks the concrete boundary/result contract.
  assert.strictEqual(duplicate.employee, target);
// Original L99: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.strictEqual(duplicate.customer, source.customer);; the fixture therefore checks the concrete boundary/result contract.
  assert.strictEqual(duplicate.customer, source.customer);
// Original L100: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.note, source.note);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.note, source.note);
// Original L101: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.isPaid, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.isPaid, false);
// Original L102: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.ledgerEntryId, undefined);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.ledgerEntryId, undefined);
// Original L103: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.invoiceId, undefined);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.invoiceId, undefined);
// Original L104: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.clockInTime, source.clockInTime);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.clockInTime, source.clockInTime);
// Original L105: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.clockOutTime, source.clockOutTime);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.clockOutTime, source.clockOutTime);
// Original L106: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.clockInTime.toISOString(), source.clockInTime.toISOString());; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.clockInTime.toISOString(), source.clockInTime.toISOString());
// Original L107: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.clockOutTime.toISOString(), source.clockOutTime.toISOString());; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(duplicate.clockOutTime.toISOString(), source.clockOutTime.toISOString());
// Original L108: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks, source.breaks);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.breaks, source.breaks);
// Original L109: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0], source.breaks[0]);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.breaks[0], source.breaks[0]);
// Original L110: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0].start, source.breaks[0].start);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.breaks[0].start, source.breaks[0].start);
// Original L111: In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0].end, source.breaks[0].end);; this verifies independence or a deliberate change in behavior.
  assert.notStrictEqual(duplicate.breaks[0].end, source.breaks[0].end);
// Original L112: Blank line separates related setup or assertions for readability.

// Original L113: Calls `duplicate.clockInTime.setUTCFullYear` with 2030.
  duplicate.clockInTime.setUTCFullYear(2030);
// Original L114: Calls `duplicate.clockOutTime.setUTCHours` with 7.
  duplicate.clockOutTime.setUTCHours(7);
// Original L115: Calls `duplicate.breaks[0].start.setUTCMinutes` with 45.
  duplicate.breaks[0].start.setUTCMinutes(45);
// Original L116: Appends an object with fields start: calls `date` with "2026-10-09T03:00:00Z"; end: calls `date` with "2026-10-09T03:15:00Z" to `duplicate.breaks` (the breaks property of duplicate).
  duplicate.breaks.push({ start: date('2026-10-09T03:00:00Z'), end: date('2026-10-09T03:15:00Z') });
// Original L117: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.clockInTime.toISOString(), '2026-10-08T22:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(source.clockInTime.toISOString(), '2026-10-08T22:00:00.000Z');
// Original L118: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.clockOutTime.toISOString(), '2026-10-09T06:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(source.clockOutTime.toISOString(), '2026-10-09T06:00:00.000Z');
// Original L119: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.breaks.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(source.breaks.length, 1);
// Original L120: In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.breaks[0].start.toISOString(), '2026-10-09T01:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(source.breaks[0].start.toISOString(), '2026-10-09T01:00:00.000Z');
// Original L121: Closes the fixture, callback, loop, or test block for 'duplicateFor creates an independent completed shift for the target employee'.
});
// Original L122: Blank line separates related setup or assertions for readability.

// Original L123: Starts an isolated test case whose title states the behavior being specified: duplicateFor preserves null and zero paidHours while using the target wage and actual hours.
test('duplicateFor preserves null and zero paidHours while using the target wage and actual hours', () => {
// Original L124: Controls iteration/branching in the 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours' test so each relevant fixture or environment condition is exercised.
  for (const paidHours of [null, 0]) {
// Original L125: Initializes source for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', supplying the value that the following test logic will inspect or mutate.
    const source = completedShift(paidHours);
// Original L126: Builds target, the concrete fixture collection/object used as input for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'; its fields model the relevant domain records or DOM state.
    const target = employee(`target-${paidHours ?? 'null'}`, 30);
// Original L127: Initializes duplicate for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', supplying the value that the following test logic will inspect or mutate.
    const duplicate = source.duplicateFor(target);
// Original L128: Blank line separates related setup or assertions for readability.

// Original L129: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.paidHours, paidHours);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(duplicate.paidHours, paidHours);
// Original L130: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(duplicate.getHoursWorked(), actualShiftHours(
// Original L131: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.
      date('2026-10-08T22:00:00Z'),
// Original L132: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.
      date('2026-10-09T06:00:00Z'),
// Original L133: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.
      [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }]
// Original L134: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.
    ));
// Original L135: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), 7.5);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(duplicate.getHoursWorked(), 7.5);
// Original L136: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getShiftPay(), paidHours === null ? 225 : 0);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(duplicate.getShiftPay(), paidHours === null ? 225 : 0);
// Original L137: In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.getShiftPay(), source.isPaid ? 0 : 0);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(source.getShiftPay(), source.isPaid ? 0 : 0);
// Original L138: Closes the fixture, callback, loop, or test block for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'.
  }
// Original L139: Closes the fixture, callback, loop, or test block for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'.
});
