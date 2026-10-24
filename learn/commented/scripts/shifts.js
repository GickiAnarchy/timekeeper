// Original L1: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import {
// Original L2: Imports the shared store used to load and persist shift records.
  store,
// Original L3: Imports the helper that fills employee filters and form controls.
  populateEmployeeDropdowns,
// Original L4: Imports the helper that fills customer filters and form controls.
  populateCustomerDropdowns,
// Original L5: Imports the class used for new or duplicated work-shift records.
  WorkShift
// Original L6: Completes the named import list and tells the browser to resolve these shared helpers from ./models.js. Imported bindings refer to exports of that module.
} from './models.js';
// Original L7: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { resetShiftDialogViewport, syncShiftDialogViewport } from './shift-dialog-viewport.mjs';
// Original L8: Blank line separates related code sections for readability.

// Original L9: Defines `formatForDateTimeLocal` (format for date time local), a reusable function taking date. Its body runs when called, not when declared.
function formatForDateTimeLocal(date) {
// Original L10: Returns "" to the caller and exits this function.
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
// Original L11: Calls `date.getFullYear` with no arguments; stores the result in `year`. const prevents reassignment of this binding, not mutation inside its object/array.
  const year = date.getFullYear();
// Original L12: Adds padding "0" to the beginning of converts adds calls `date.getMonth` with no arguments and 1 (or joins them if a value is text) to text until it has length 2; stores the result in `month`. const prevents reassignment of this binding, not mutation inside its object/array.
  const month = String(date.getMonth() + 1).padStart(2, '0');
// Original L13: Adds padding "0" to the beginning of converts calls `date.getDate` with no arguments to text until it has length 2; stores the result in `day`. const prevents reassignment of this binding, not mutation inside its object/array.
  const day = String(date.getDate()).padStart(2, '0');
// Original L14: Adds padding "0" to the beginning of converts calls `date.getHours` with no arguments to text until it has length 2; stores the result in `hours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const hours = String(date.getHours()).padStart(2, '0');
// Original L15: Adds padding "0" to the beginning of converts calls `date.getMinutes` with no arguments to text until it has length 2; stores the result in `minutes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const minutes = String(date.getMinutes()).padStart(2, '0');
// Original L16: Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day), `hours` (hours), `minutes` (minutes) to the caller and exits this function.
  return `${year}-${month}-${day}T${hours}:${minutes}`;
// Original L17: Closes function formatForDateTimeLocal. Control continues after this block.
}
// Original L18: Blank line separates related code sections for readability.

// Original L19: Adds, removes, or selects CSS classes that control this element’s appearance/state.
function makeElement(tag, className, text) {
// Original L20: Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.
  const element = document.createElement(tag);
// Original L21: Adds, removes, or selects CSS classes that control this element’s appearance/state.
  if (className) element.className = className;
// Original L22: Writes user-visible text into the element; textContent avoids treating data as HTML.
  if (text !== undefined) element.textContent = text;
// Original L23: Returns `element` (element) to the caller and exits this function.
  return element;
// Original L24: Closes function makeElement. Control continues after this block.
}
// Original L25: Blank line separates related code sections for readability.

// Original L26: Waits until the page’s HTML exists before querying elements and wiring its controls.
document.addEventListener('DOMContentLoaded', async () => {
// Original L27: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
  await store.init();
// Original L28: Blank line separates related code sections for readability.

// Original L29: Finds the page element whose unique ID is "shiftList", or null if absent; stores the result in `shiftList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const shiftList = document.getElementById('shiftList');
// Original L30: Finds the page element whose unique ID is "emp-filter", or null if absent; stores the result in `empFilter`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empFilter = document.getElementById('emp-filter');
// Original L31: Finds the page element whose unique ID is "cust-filter", or null if absent; stores the result in `custFilter`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custFilter = document.getElementById('cust-filter');
// Original L32: Finds the page element whose unique ID is "paid-filter", or null if absent; stores the result in `paidCheckbox`. const prevents reassignment of this binding, not mutation inside its object/array.
  const paidCheckbox = document.getElementById('paid-filter');
// Original L33: Finds the page element whose unique ID is "add-button", or null if absent; stores the result in `addButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const addButton = document.getElementById('add-button');
// Original L34: Finds the page element whose unique ID is "viewShiftModal", or null if absent; stores the result in `modal`. const prevents reassignment of this binding, not mutation inside its object/array.
  const modal = document.getElementById('viewShiftModal');
// Original L35: Finds the page element whose unique ID is "shift-emp", or null if absent; stores the result in `empSelect`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empSelect = document.getElementById('shift-emp');
// Original L36: Finds the page element whose unique ID is "shift-cust", or null if absent; stores the result in `custSelect`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custSelect = document.getElementById('shift-cust');
// Original L37: Finds the page element whose unique ID is "shift-start", or null if absent; stores the result in `timeIn`. const prevents reassignment of this binding, not mutation inside its object/array.
  const timeIn = document.getElementById('shift-start');
// Original L38: Finds the page element whose unique ID is "shift-end", or null if absent; stores the result in `timeOut`. const prevents reassignment of this binding, not mutation inside its object/array.
  const timeOut = document.getElementById('shift-end');
// Original L39: Finds the page element whose unique ID is "total-hours", or null if absent; stores the result in `actualHours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const actualHours = document.getElementById('total-hours');
// Original L40: Finds the page element whose unique ID is "paid-hours", or null if absent; stores the result in `paidHours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const paidHours = document.getElementById('paid-hours');
// Original L41: Finds the page element whose unique ID is "note-view", or null if absent; stores the result in `noteView`. const prevents reassignment of this binding, not mutation inside its object/array.
  const noteView = document.getElementById('note-view');
// Original L42: Finds the page element whose unique ID is "paid-checkbox-view", or null if absent; stores the result in `paidBox`. const prevents reassignment of this binding, not mutation inside its object/array.
  const paidBox = document.getElementById('paid-checkbox-view');
// Original L43: Finds the page element whose unique ID is "breaks-list", or null if absent; stores the result in `breaksList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const breaksList = document.getElementById('breaks-list');
// Original L44: Finds the page element whose unique ID is "shift-form-error", or null if absent; stores the result in `formError`. const prevents reassignment of this binding, not mutation inside its object/array.
  const formError = document.getElementById('shift-form-error');
// Original L45: Finds the page element whose unique ID is "ok-btn", or null if absent; stores the result in `okBtn`. const prevents reassignment of this binding, not mutation inside its object/array.
  const okBtn = document.getElementById('ok-btn');
// Original L46: Finds the page element whose unique ID is "cancel-btn", or null if absent; stores the result in `cancelBtn`. const prevents reassignment of this binding, not mutation inside its object/array.
  const cancelBtn = document.getElementById('cancel-btn');
// Original L47: Finds the page element whose unique ID is "add-break-button", or null if absent; stores the result in `addBreakButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const addBreakButton = document.getElementById('add-break-button');
// Original L48: Null; stores the result in `activeShift`. let allows the binding to be reassigned.
  let activeShift = null;
// Original L49: False; stores the result in `isNewShift`. let allows the binding to be reassigned.
  let isNewShift = false;
// Original L50: Null; stores the result in `duplicateSource`. let allows the binding to be reassigned.
  let duplicateSource = null;
// Original L51: A callback taking no parameters that calls `syncShiftDialogViewport` with `modal` (modal); `window` (window); stores the result in `syncModalViewport`. const prevents reassignment of this binding, not mutation inside its object/array.
  const syncModalViewport = () => syncShiftDialogViewport(modal, window);
// Original L52: Blank line separates related code sections for readability.

// Original L53: Registers a handler so a user action or browser event triggers the page behavior described here.
  modal.addEventListener('focusin', syncModalViewport);
// Original L54: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.addEventListener('resize', syncModalViewport);
// Original L55: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.visualViewport?.addEventListener('resize', syncModalViewport);
// Original L56: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.visualViewport?.addEventListener('scroll', syncModalViewport);
// Original L57: Blank line separates related code sections for readability.

// Original L58: Calls `populateEmployeeDropdowns` with `empFilter` (emp filter).
  populateEmployeeDropdowns(empFilter);
// Original L59: Calls `populateCustomerDropdowns` with `custFilter` (cust filter).
  populateCustomerDropdowns(custFilter);
// Original L60: Assigns the result of "all" selected>All Employees</option>') to empFilter.insertAdjacentHTML('afterbegin', '<option value, updating this control or record for the next step.
  empFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Employees</option>');
// Original L61: Assigns the result of "all" selected>All Customers</option>') to custFilter.insertAdjacentHTML('afterbegin', '<option value, updating this control or record for the next step.
  custFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Customers</option>');
// Original L62: Calls `populateEmployeeDropdowns` with `empSelect` (emp select).
  populateEmployeeDropdowns(empSelect);
// Original L63: Calls `populateCustomerDropdowns` with `custSelect` (cust select).
  populateCustomerDropdowns(custSelect);
// Original L64: Blank line separates related code sections for readability.

// Original L65: Registers a handler so a user action or browser event triggers the page behavior described here.
  empFilter.addEventListener('change', renderList);
// Original L66: Registers a handler so a user action or browser event triggers the page behavior described here.
  custFilter.addEventListener('change', renderList);
// Original L67: Registers a handler so a user action or browser event triggers the page behavior described here.
  paidCheckbox.addEventListener('change', renderList);
// Original L68: Blank line separates related code sections for readability.

// Original L69: Registers a handler so a user action or browser event triggers the page behavior described here.
  addButton.addEventListener('click', () => {
// Original L70: `empFilter.value` (the value property of empFilter); stores the result in `employeeId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const employeeId = empFilter.value;
// Original L71: `custFilter.value` (the value property of custFilter); stores the result in `customerId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const customerId = custFilter.value;
// Original L72: Checks checks that `employeeId` (employee id) and "all" differ in value or type; if true chooses calls `store.employees.get` with `employeeId` (employee id), otherwise null; stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.
    const employee = employeeId !== 'all' ? store.employees.get(employeeId) : null;
// Original L73: Checks checks that `customerId` (customer id) and "all" differ in value or type; if true chooses calls `store.customers.get` with `customerId` (customer id), otherwise null; stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.
    const customer = customerId !== 'all' ? store.customers.get(customerId) : null;
// Original L74: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!employee || !customer) {
// Original L75: Shows a plain-language validation or failure message to the user.
      window.alert('Choose a specific employee and customer in the filters before adding a shift.');
// Original L76: Returns no value to the caller and exits this function.
      return;
// Original L77: Closes conditional branch. Control continues after this block.
    }
// Original L78: Creates a work-shift record connecting the selected employee and customer.
    showViewModal(new WorkShift(employee, customer));
// Original L79: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L80: Blank line separates related code sections for readability.

// Original L81: Defines `addBreakRow` (add break row), a reusable function taking breakItem = null. Its body runs when called, not when declared.
  function addBreakRow(breakItem = null) {
// Original L82: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `row`. const prevents reassignment of this binding, not mutation inside its object/array.
    const row = document.createElement('li');
// Original L83: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    row.className = 'break-row';
// Original L84: Blank line separates related code sections for readability.

// Original L85: Calls `makeElement` with "span"; "break-label"; a text template that combines fixed text with computed values adds `breaksList.children.length` (the length property of breaksList.children) and 1 (or joins them if a value is text); stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.
    const label = makeElement('span', 'break-label', `Break ${breaksList.children.length + 1}`);
// Original L86: Creates a detached HTML element with tag "label"; it is not visible until inserted in the page; stores the result in `startLabel`. const prevents reassignment of this binding, not mutation inside its object/array.
    const startLabel = document.createElement('label');
// Original L87: Writes user-visible text into the element; textContent avoids treating data as HTML.
    startLabel.textContent = 'From';
// Original L88: Creates a detached HTML element with tag "input"; it is not visible until inserted in the page; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
    const start = document.createElement('input');
// Original L89: Assigns the result of 'datetime-local' to start.type, updating this control or record for the next step.
    start.type = 'datetime-local';
// Original L90: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    start.className = 'break-start';
// Original L91: Assigns the result of formatForDateTimeLocal(breakItem?.start || null) to start.value, updating this control or record for the next step.
    start.value = formatForDateTimeLocal(breakItem?.start || null);
// Original L92: Sets accessibility metadata so assistive technology can understand the control and its current state.
    start.setAttribute('aria-label', 'Break start');
// Original L93: Registers a handler so a user action or browser event triggers the page behavior described here.
    start.addEventListener('input', updateActualHours);
// Original L94: Places the newly built child elements into the document so the user can see them.
    startLabel.appendChild(start);
// Original L95: Blank line separates related code sections for readability.

// Original L96: Creates a detached HTML element with tag "label"; it is not visible until inserted in the page; stores the result in `endLabel`. const prevents reassignment of this binding, not mutation inside its object/array.
    const endLabel = document.createElement('label');
// Original L97: Writes user-visible text into the element; textContent avoids treating data as HTML.
    endLabel.textContent = 'To';
// Original L98: Creates a detached HTML element with tag "input"; it is not visible until inserted in the page; stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.
    const end = document.createElement('input');
// Original L99: Assigns the result of 'datetime-local' to end.type, updating this control or record for the next step.
    end.type = 'datetime-local';
// Original L100: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    end.className = 'break-end';
// Original L101: Assigns the result of formatForDateTimeLocal(breakItem?.end || null) to end.value, updating this control or record for the next step.
    end.value = formatForDateTimeLocal(breakItem?.end || null);
// Original L102: Sets accessibility metadata so assistive technology can understand the control and its current state.
    end.setAttribute('aria-label', 'Break end');
// Original L103: Registers a handler so a user action or browser event triggers the page behavior described here.
    end.addEventListener('input', updateActualHours);
// Original L104: Places the newly built child elements into the document so the user can see them.
    endLabel.appendChild(end);
// Original L105: Blank line separates related code sections for readability.

// Original L106: Calls `makeElement` with "button"; "remove-break-button"; "Remove"; stores the result in `removeButton`. const prevents reassignment of this binding, not mutation inside its object/array.
    const removeButton = makeElement('button', 'remove-break-button', 'Remove');
// Original L107: Assigns the result of 'button' to removeButton.type, updating this control or record for the next step.
    removeButton.type = 'button';
// Original L108: Sets accessibility metadata so assistive technology can understand the control and its current state.
    removeButton.setAttribute('aria-label', `Remove break ${breaksList.children.length + 1}`);
// Original L109: Places the newly built child elements into the document so the user can see them.
    row.append(label, startLabel, endLabel, removeButton);
// Original L110: Places the newly built child elements into the document so the user can see them.
    breaksList.appendChild(row);
// Original L111: Closes function addBreakRow. Control continues after this block.
  }
// Original L112: Blank line separates related code sections for readability.

// Original L113: Defines `collectBreaks` (collect breaks), a reusable function taking no arguments. Its body runs when called, not when declared.
  function collectBreaks() {
// Original L114: An array containing ; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.
    const result = [];
// Original L115: Finds matching DOM elements used by this page’s navigation, list, or form UI.
    for (const [index, row] of [...breaksList.querySelectorAll('.break-row')].entries()) {
// Original L116: `row.querySelector('.break-start').value` (the value property of row.querySelector('.break-start')); stores the result in `startValue`. const prevents reassignment of this binding, not mutation inside its object/array.
      const startValue = row.querySelector('.break-start').value;
// Original L117: `row.querySelector('.break-end').value` (the value property of row.querySelector('.break-end')); stores the result in `endValue`. const prevents reassignment of this binding, not mutation inside its object/array.
      const endValue = row.querySelector('.break-end').value;
// Original L118: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!startValue && !endValue) continue;
// Original L119: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!startValue || !endValue) {
// Original L120: Stops this operation with a meaningful validation error that the caller can show to the user.
        throw new Error(`Break ${index + 1} needs both a start and end time.`);
// Original L121: Closes conditional branch. Control continues after this block.
      }
// Original L122: Converts the stored or entered date/time into a Date object for display or arithmetic.
      result.push({ start: new Date(startValue), end: new Date(endValue) });
// Original L123: Closes loop. Control continues after this block.
    }
// Original L124: Returns `result` (result) to the caller and exits this function.
    return result;
// Original L125: Closes function collectBreaks. Control continues after this block.
  }
// Original L126: Blank line separates related code sections for readability.

// Original L127: Defines `updateActualHours` (update actual hours), a reusable function taking no arguments. Its body runs when called, not when declared.
  function updateActualHours() {
// Original L128: Constructs a new instance of `Date` with `timeIn.value` (the value property of timeIn); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
    const start = new Date(timeIn.value);
// Original L129: Constructs a new instance of `Date` with `timeOut.value` (the value property of timeOut); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.
    const end = new Date(timeOut.value);
// Original L130: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!timeIn.value || !timeOut.value || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
// Original L131: Assigns the result of '0.00' to actualHours.value, updating this control or record for the next step.
      actualHours.value = '0.00';
// Original L132: Returns no value to the caller and exits this function.
      return;
// Original L133: Closes conditional branch. Control continues after this block.
    }
// Original L134: 0; stores the result in `breakMs`. let allows the binding to be reassigned.
    let breakMs = 0;
// Original L135: Finds matching DOM elements used by this page’s navigation, list, or form UI.
    for (const row of breaksList.querySelectorAll('.break-row')) {
// Original L136: `row.querySelector('.break-start').value` (the value property of row.querySelector('.break-start')); stores the result in `breakStartValue`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakStartValue = row.querySelector('.break-start').value;
// Original L137: `row.querySelector('.break-end').value` (the value property of row.querySelector('.break-end')); stores the result in `breakEndValue`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakEndValue = row.querySelector('.break-end').value;
// Original L138: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!breakStartValue || !breakEndValue) continue;
// Original L139: Constructs a new instance of `Date` with `breakStartValue` (break start value); stores the result in `breakStart`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakStart = new Date(breakStartValue);
// Original L140: Constructs a new instance of `Date` with `breakEndValue` (break end value); stores the result in `breakEnd`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakEnd = new Date(breakEndValue);
// Original L141: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!Number.isNaN(breakStart.getTime()) && !Number.isNaN(breakEnd.getTime()) && breakEnd > breakStart) {
// Original L142: Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.
        breakMs += breakEnd - breakStart;
// Original L143: Closes conditional branch. Control continues after this block.
      }
// Original L144: Closes loop. Control continues after this block.
    }
// Original L145: Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.
    actualHours.value = Math.max(0, (end - start - breakMs) / 3600000).toFixed(2);
// Original L146: Closes function updateActualHours. Control continues after this block.
  }
// Original L147: Blank line separates related code sections for readability.

// Original L148: Registers a handler so a user action or browser event triggers the page behavior described here.
  timeIn.addEventListener('input', updateActualHours);
// Original L149: Registers a handler so a user action or browser event triggers the page behavior described here.
  timeOut.addEventListener('input', updateActualHours);
// Original L150: Registers a handler so a user action or browser event triggers the page behavior described here.
  addBreakButton.addEventListener('click', () => addBreakRow());
// Original L151: Registers a handler so a user action or browser event triggers the page behavior described here.
  breaksList.addEventListener('click', event => {
// Original L152: Calls `event.target.closest` with ".remove-break-button"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
    const button = event.target.closest('.remove-break-button');
// Original L153: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L154: Calls `button.closest('.break-row').remove` with no arguments.
    button.closest('.break-row').remove();
// Original L155: Finds matching DOM elements used by this page’s navigation, list, or form UI.
    [...breaksList.querySelectorAll('.break-row')].forEach((row, index) => {
// Original L156: Finds matching DOM elements used by this page’s navigation, list, or form UI.
      row.querySelector('.break-label').textContent = `Break ${index + 1}`;
// Original L157: Finds matching DOM elements used by this page’s navigation, list, or form UI.
      row.querySelector('.remove-break-button').setAttribute('aria-label', `Remove break ${index + 1}`);
// Original L158: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L159: Calls `updateActualHours` with no arguments.
    updateActualHours();
// Original L160: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L161: Blank line separates related code sections for readability.

// Original L162: Defines `showViewModal` (show view modal), a reusable function taking shift, source = null. Its body runs when called, not when declared.
  function showViewModal(shift, source = null) {
// Original L163: Assigns the result of shift to activeShift, updating this control or record for the next step.
    activeShift = shift;
// Original L164: Assigns the result of source to duplicateSource, updating this control or record for the next step.
    duplicateSource = source;
// Original L165: Defines an inline callback that handles each item or event in the surrounding operation.
    isNewShift = !store.shifts.some(candidate => candidate.id === shift.id);
// Original L166: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('shift-modal-title').textContent = source ? 'Duplicate work shift for…' : 'Shift Details';
// Original L167: Finds the page element whose unique ID is "shift-duplicate-hint", or null if absent; stores the result in `duplicateHint`. const prevents reassignment of this binding, not mutation inside its object/array.
    const duplicateHint = document.getElementById('shift-duplicate-hint');
// Original L168: Assigns the result of !source to duplicateHint.hidden, updating this control or record for the next step.
    duplicateHint.hidden = !source;
// Original L169: Writes user-visible text into the element; textContent avoids treating data as HTML.
    duplicateHint.textContent = source
// Original L170: Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.
      ? `Copy of ${source.employee?.name || 'another employee'}’s shift. Choose the employee who worked the same shift, review the details, then save. The copy starts unpaid.`
// Original L171: Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.
      : '';
// Original L172: Iterates through the matching controls or records so each one receives the same UI/data treatment.
    for (const option of empSelect.options) {
// Original L173: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      option.disabled = Boolean(source && option.value === source.employee?.id);
// Original L174: Closes loop. Control continues after this block.
    }
// Original L175: Writes user-visible text into the element; textContent avoids treating data as HTML.
    formError.textContent = '';
// Original L176: Assigns the result of source ? '' : shift.employee?.id || '' to empSelect.value, updating this control or record for the next step.
    empSelect.value = source ? '' : shift.employee?.id || '';
// Original L177: Assigns the result of shift.customer?.id || '' to custSelect.value, updating this control or record for the next step.
    custSelect.value = shift.customer?.id || '';
// Original L178: Assigns the result of formatForDateTimeLocal(shift.clockInTime) to timeIn.value, updating this control or record for the next step.
    timeIn.value = formatForDateTimeLocal(shift.clockInTime);
// Original L179: Assigns the result of formatForDateTimeLocal(shift.clockOutTime) to timeOut.value, updating this control or record for the next step.
    timeOut.value = formatForDateTimeLocal(shift.clockOutTime);
// Original L180: Assigns the result of shift.note || '' to noteView.value, updating this control or record for the next step.
    noteView.value = shift.note || '';
// Original L181: Assigns the result of Boolean(shift.isPaid) to paidBox.checked, updating this control or record for the next step.
    paidBox.checked = Boolean(shift.isPaid);
// Original L182: Validates that the converted value is a real finite number before using it in calculations or saving.
    paidHours.value = Number.isFinite(shift.paidHours) ? String(shift.paidHours) : '';
// Original L183: Clears stale rendered children before drawing the current data set.
    breaksList.replaceChildren();
// Original L184: Defines an inline callback that handles each item or event in the surrounding operation.
    shift.breaks.forEach(breakItem => addBreakRow(breakItem));
// Original L185: Calls `updateActualHours` with no arguments.
    updateActualHours();
// Original L186: Calls `modal.showModal` with no arguments.
    modal.showModal();
// Original L187: Calls `syncModalViewport` with no arguments.
    syncModalViewport();
// Original L188: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (source) empSelect.focus();
// Original L189: Closes function showViewModal. Control continues after this block.
  }
// Original L190: Blank line separates related code sections for readability.

// Original L191: Registers a handler so a user action or browser event triggers the page behavior described here.
  okBtn.addEventListener('click', async () => {
// Original L192: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    if (!activeShift || okBtn.disabled) return;
// Original L193: Writes user-visible text into the element; textContent avoids treating data as HTML.
    formError.textContent = '';
// Original L194: Calls `store.employees.get` with `empSelect.value` (the value property of empSelect); stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.
    const employee = store.employees.get(empSelect.value);
// Original L195: Calls `store.customers.get` with `custSelect.value` (the value property of custSelect); stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.
    const customer = store.customers.get(custSelect.value);
// Original L196: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!employee || !customer) {
// Original L197: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Choose an employee and customer.';
// Original L198: Returns no value to the caller and exits this function.
      return;
// Original L199: Closes conditional branch. Control continues after this block.
    }
// Original L200: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (duplicateSource && employee.id === duplicateSource.employee?.id) {
// Original L201: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Choose a different employee for the duplicate shift.';
// Original L202: Returns no value to the caller and exits this function.
      return;
// Original L203: Closes conditional branch. Control continues after this block.
    }
// Original L204: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!timeIn.value || !timeOut.value) {
// Original L205: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Enter both the actual shift start and end times.';
// Original L206: Returns no value to the caller and exits this function.
      return;
// Original L207: Closes conditional branch. Control continues after this block.
    }
// Original L208: Constructs a new instance of `Date` with `timeIn.value` (the value property of timeIn); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
    const start = new Date(timeIn.value);
// Original L209: Constructs a new instance of `Date` with `timeOut.value` (the value property of timeOut); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.
    const end = new Date(timeOut.value);
// Original L210: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
// Original L211: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'The shift end must be after its start.';
// Original L212: Returns no value to the caller and exits this function.
      return;
// Original L213: Closes conditional branch. Control continues after this block.
    }
// Original L214: Blank line separates related code sections for readability.

// Original L215: Stores the value value used by this page’s rendering, validation, or event logic.
    let breaks;
// Original L216: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L217: Assigns the result of collectBreaks() to breaks, updating this control or record for the next step.
      breaks = collectBreaks();
// Original L218: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L219: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = error.message;
// Original L220: Returns no value to the caller and exits this function.
      return;
// Original L221: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L222: Sorts an array containing the expanded entries/properties from `breaks` (breaks) in place using comparison a callback taking a, b that subtracts `b.start` (the start property of b) from `a.start` (the start property of a); stores the result in `orderedBreaks`. const prevents reassignment of this binding, not mutation inside its object/array.
    const orderedBreaks = [...breaks].sort((a, b) => a.start - b.start);
// Original L223: Iterates through the matching controls or records so each one receives the same UI/data treatment.
    for (let index = 0; index < orderedBreaks.length; index += 1) {
// Original L224: The entry at index/key `index` (index) in `orderedBreaks` (ordered breaks); stores the result in `breakItem`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakItem = orderedBreaks[index];
// Original L225: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (breakItem.start < start || breakItem.end > end || breakItem.end <= breakItem.start) {
// Original L226: Writes user-visible text into the element; textContent avoids treating data as HTML.
        formError.textContent = `Break ${index + 1} must be valid and fall within the shift.`;
// Original L227: Returns no value to the caller and exits this function.
        return;
// Original L228: Closes conditional branch. Control continues after this block.
      }
// Original L229: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (index > 0 && breakItem.start < orderedBreaks[index - 1].end) {
// Original L230: Writes user-visible text into the element; textContent avoids treating data as HTML.
        formError.textContent = 'Break times cannot overlap.';
// Original L231: Returns no value to the caller and exits this function.
        return;
// Original L232: Closes conditional branch. Control continues after this block.
      }
// Original L233: Closes loop. Control continues after this block.
    }
// Original L234: Checks checks that `paidHours.value` (the value property of paidHours) and "" have the same value and type; if true chooses null, otherwise converts `paidHours.value` (the value property of paidHours) to a number (invalid numeric text becomes NaN); stores the result in `paidHoursValue`. const prevents reassignment of this binding, not mutation inside its object/array.
    const paidHoursValue = paidHours.value === '' ? null : Number(paidHours.value);
// Original L235: Validates that the converted value is a real finite number before using it in calculations or saving.
    if (paidHoursValue !== null && (!Number.isFinite(paidHoursValue) || paidHoursValue < 0)) {
// Original L236: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Paid hours must be a non-negative number, or left blank to use actual hours.';
// Original L237: Returns no value to the caller and exits this function.
      return;
// Original L238: Closes conditional branch. Control continues after this block.
    }
// Original L239: Blank line separates related code sections for readability.

// Original L240: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    okBtn.disabled = true;
// Original L241: Writes user-visible text into the element; textContent avoids treating data as HTML.
    okBtn.textContent = 'Saving…';
// Original L242: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L243: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (isNewShift) {
// Original L244: Assigns the result of employee to activeShift.employee, updating this control or record for the next step.
        activeShift.employee = employee;
// Original L245: Assigns the result of customer to activeShift.customer, updating this control or record for the next step.
        activeShift.customer = customer;
// Original L246: Assigns the result of start to activeShift.clockInTime, updating this control or record for the next step.
        activeShift.clockInTime = start;
// Original L247: Assigns the result of end to activeShift.clockOutTime, updating this control or record for the next step.
        activeShift.clockOutTime = end;
// Original L248: Assigns the result of noteView.value.trim() || null to activeShift.note, updating this control or record for the next step.
        activeShift.note = noteView.value.trim() || null;
// Original L249: Assigns the result of paidBox.checked to activeShift.isPaid, updating this control or record for the next step.
        activeShift.isPaid = paidBox.checked;
// Original L250: Assigns the result of breaks to activeShift.breaks, updating this control or record for the next step.
        activeShift.breaks = breaks;
// Original L251: Assigns the result of paidHoursValue to activeShift.paidHours, updating this control or record for the next step.
        activeShift.paidHours = paidHoursValue;
// Original L252: Persists the changed shift through the store before updating the visible in-memory list.
        await store.saveShift(activeShift);
// Original L253: Appends `activeShift` (active shift) to `store.shifts` (the shifts property of store).
        store.shifts.push(activeShift);
// Original L254: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
      } else {
// Original L255: Sends the edited record fields to the store so the saved data matches the form.
        await store.updateShift(
// Original L256: Supplies this argument/value (activeShift.id) to the surrounding constructor or DOM call.
          activeShift.id,
// Original L257: Includes the named value employee in the surrounding import list or collection, making that app dependency available here.
          employee,
// Original L258: Includes the named value customer in the surrounding import list or collection, making that app dependency available here.
          customer,
// Original L259: Includes the named value start in the surrounding import list or collection, making that app dependency available here.
          start,
// Original L260: Includes the named value end in the surrounding import list or collection, making that app dependency available here.
          end,
// Original L261: Supplies this argument/value (noteView.value) to the surrounding constructor or DOM call.
          noteView.value,
// Original L262: Supplies this argument/value (paidBox.checked) to the surrounding constructor or DOM call.
          paidBox.checked,
// Original L263: Includes the named value breaks in the surrounding import list or collection, making that app dependency available here.
          breaks,
// Original L264: Includes the named value paidHoursValue in the surrounding import list or collection, making that app dependency available here.
          paidHoursValue
// Original L265: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
        );
// Original L266: Closes conditional branch. Control continues after this block.
      }
// Original L267: Comment: Keep the new employee’s shift visible even when the source was filtered.
      // Keep the new employee’s shift visible even when the source was filtered.
// Original L268: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (duplicateSource) empFilter.value = employee.id;
// Original L269: Calls `modal.close` with no arguments.
      modal.close();
// Original L270: Assigns the result of null to activeShift, updating this control or record for the next step.
      activeShift = null;
// Original L271: Calls `renderList` with no arguments.
      renderList();
// Original L272: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L273: Calls `console.error` with "Unable to save shift:"; `error` (error).
      console.error('Unable to save shift:', error);
// Original L274: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = error.message || 'Unable to save this shift. Please try again.';
// Original L275: Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.
    } finally {
// Original L276: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      okBtn.disabled = false;
// Original L277: Writes user-visible text into the element; textContent avoids treating data as HTML.
      okBtn.textContent = 'Save changes';
// Original L278: Closes try/catch error-handling construct. Control continues after this block.
    }
// Original L279: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L280: Blank line separates related code sections for readability.

// Original L281: Registers a handler so a user action or browser event triggers the page behavior described here.
  cancelBtn.addEventListener('click', () => {
// Original L282: Assigns the result of null to activeShift, updating this control or record for the next step.
    activeShift = null;
// Original L283: Calls `modal.close` with no arguments.
    modal.close();
// Original L284: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L285: Registers a handler so a user action or browser event triggers the page behavior described here.
  modal.addEventListener('close', () => {
// Original L286: Calls `resetShiftDialogViewport` with `modal` (modal).
    resetShiftDialogViewport(modal);
// Original L287: Assigns the result of null to activeShift, updating this control or record for the next step.
    activeShift = null;
// Original L288: Assigns the result of null to duplicateSource, updating this control or record for the next step.
    duplicateSource = null;
// Original L289: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L290: Blank line separates related code sections for readability.

// Original L291: Defines `renderList` (render list), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderList() {
// Original L292: Returns no value to the caller and exits this function.
    if (!shiftList) return;
// Original L293: `empFilter.value` (the value property of empFilter); stores the result in `employeeSelection`. const prevents reassignment of this binding, not mutation inside its object/array.
    const employeeSelection = empFilter.value;
// Original L294: `custFilter.value` (the value property of custFilter); stores the result in `customerSelection`. const prevents reassignment of this binding, not mutation inside its object/array.
    const customerSelection = custFilter.value;
// Original L295: Keeps only items of `store.shifts` (the shifts property of store) for which a callback taking shift that `shift.isComplete` (the is complete property of shift) returns truthy; stores the result in `completeShifts`. let allows the binding to be reassigned.
    let completeShifts = store.shifts.filter(shift => shift.isComplete);
// Original L296: Blank line separates related code sections for readability.

// Original L297: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (employeeSelection && employeeSelection !== 'all') {
// Original L298: Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.
      completeShifts = completeShifts.filter(shift => shift.employee?.id === employeeSelection);
// Original L299: Closes conditional branch. Control continues after this block.
    }
// Original L300: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (customerSelection && customerSelection !== 'all') {
// Original L301: Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.
      completeShifts = completeShifts.filter(shift => shift.customer?.id === customerSelection);
// Original L302: Closes conditional branch. Control continues after this block.
    }
// Original L303: Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.
    if (paidCheckbox.checked) completeShifts = completeShifts.filter(shift => !shift.isPaid);
// Original L304: Blank line separates related code sections for readability.

// Original L305: Orders records for predictable display, usually by completion status, date, or most-recent shift.
    completeShifts.sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
// Original L306: Clears stale rendered children before drawing the current data set.
    shiftList.replaceChildren();
// Original L307: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (completeShifts.length === 0) {
// Original L308: Places the newly built child elements into the document so the user can see them.
      shiftList.appendChild(makeElement('li', 'empty-list shift-card', 'No completed shifts match these filters.'));
// Original L309: Returns no value to the caller and exits this function.
      return;
// Original L310: Closes conditional branch. Control continues after this block.
    }
// Original L311: Blank line separates related code sections for readability.

// Original L312: Defines an inline callback that handles each item or event in the surrounding operation.
    completeShifts.forEach(shift => {
// Original L313: Calls `makeElement` with "li"; a text template that combines fixed text with computed values checks `shift.isPaid` (the is paid property of shift); if true chooses " is-paid", otherwise ""; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.
      const item = makeElement('li', `shift-card${shift.isPaid ? ' is-paid' : ''}`);
// Original L314: Calls `makeElement` with "div"; "date-div"; stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.
      const date = makeElement('div', 'date-div');
// Original L315: Places the newly built child elements into the document so the user can see them.
      date.appendChild(makeElement('p', '', shift.clockInTime?.toLocaleDateString() || 'Unknown date'));
// Original L316: Calls `makeElement` with "div"; "emp-cust-div"; stores the result in `summary`. const prevents reassignment of this binding, not mutation inside its object/array.
      const summary = makeElement('div', 'emp-cust-div');
// Original L317: Calls `makeElement` with "strong"; ""; uses `shift.employee?.name` (the name property of shift.employee); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown employee"; stores the result in `employeeName`. const prevents reassignment of this binding, not mutation inside its object/array.
      const employeeName = makeElement('strong', '', shift.employee?.name || 'Unknown employee');
// Original L318: Calls `makeElement` with "div"; ""; a text template that combines fixed text with computed values uses `shift.customer?.name` (the name property of shift.customer); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown customer"; stores the result in `details`. const prevents reassignment of this binding, not mutation inside its object/array.
      const details = makeElement('div', '', ` @ ${shift.customer?.name || 'Unknown customer'}`);
// Original L319: Calls `makeElement` with "small"; "time-small"; a text template that combines fixed text with computed values uses calls `shift.clockInTime?.toLocaleTimeString` with `[]`; `{ hour: '2-digit', minute: '2-digit' }`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown", uses calls `shift.clockOutTime?.toLocaleTimeString` with `[]`; `{ hour: '2-digit', minute: '2-digit' }`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown"; stores the result in `timeLine`. const prevents reassignment of this binding, not mutation inside its object/array.
      const timeLine = makeElement('small', 'time-small',
// Original L320: Defines field hour as "2-digit".
        `In: ${shift.clockInTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}  ·  Out: ${shift.clockOutTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}`);
// Original L321: Calls `makeElement` with "small"; "time-small"; a text template that combines fixed text with computed values formats calls `shift.getHoursWorked` with no arguments as text with 2 digits after the decimal point, formats calls `shift.getPaidHours` with no arguments as text with 2 digits after the decimal point; stores the result in `workedLine`. const prevents reassignment of this binding, not mutation inside its object/array.
      const workedLine = makeElement('small', 'time-small',
// Original L322: Calculates actual worked hours for display, using the shift span minus recorded breaks.
        `Worked ${shift.getHoursWorked().toFixed(2)} h  ·  Paid ${shift.getPaidHours().toFixed(2)} h`);
// Original L323: Creates a DOM element in memory so the script can build this piece of the rendered interface.
      summary.append(employeeName, details, document.createElement('br'), timeLine, document.createElement('br'), workedLine);
// Original L324: Blank line separates related code sections for readability.

// Original L325: Calls `makeElement` with "div"; "list-item-buttons"; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.
      const actions = makeElement('div', 'list-item-buttons');
// Original L326: Calls `makeElement` with "button"; "view-btn"; "Edit"; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const editButton = makeElement('button', 'view-btn', 'Edit');
// Original L327: Assigns the result of 'button' to editButton.type, updating this control or record for the next step.
      editButton.type = 'button';
// Original L328: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      editButton.dataset.id = shift.id;
// Original L329: Calls `makeElement` with "button"; "duplicate-btn"; "Duplicate work shift for…"; stores the result in `duplicateButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const duplicateButton = makeElement('button', 'duplicate-btn', 'Duplicate work shift for…');
// Original L330: Assigns the result of 'button' to duplicateButton.type, updating this control or record for the next step.
      duplicateButton.type = 'button';
// Original L331: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      duplicateButton.dataset.id = shift.id;
// Original L332: Calls `makeElement` with "button"; "delete-btn"; "Delete"; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const deleteButton = makeElement('button', 'delete-btn', 'Delete');
// Original L333: Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.
      deleteButton.type = 'button';
// Original L334: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      deleteButton.dataset.id = shift.id;
// Original L335: Places the newly built child elements into the document so the user can see them.
      actions.append(editButton, duplicateButton, deleteButton);
// Original L336: Places the newly built child elements into the document so the user can see them.
      item.append(date, summary, actions);
// Original L337: Places the newly built child elements into the document so the user can see them.
      shiftList.appendChild(item);
// Original L338: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L339: Closes function renderList. Control continues after this block.
  }
// Original L340: Blank line separates related code sections for readability.

// Original L341: Registers a handler so a user action or browser event triggers the page behavior described here.
  shiftList.addEventListener('click', async event => {
// Original L342: Calls `event.target.closest` with "button[data-id]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
    const button = event.target.closest('button[data-id]');
// Original L343: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L344: Returns the first item of `store.shifts` (the shifts property of store) matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `button.dataset.id` (the id property of button.dataset) have the same value and type, or undefined; stores the result in `shift`. const prevents reassignment of this binding, not mutation inside its object/array.
    const shift = store.shifts.find(candidate => candidate.id === button.dataset.id);
// Original L345: Returns no value to the caller and exits this function.
    if (!shift) return;
// Original L346: Blank line separates related code sections for readability.

// Original L347: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    if (button.classList.contains('view-btn')) {
// Original L348: Calls `showViewModal` with `shift` (shift).
      showViewModal(shift);
// Original L349: Returns no value to the caller and exits this function.
      return;
// Original L350: Closes conditional branch. Control continues after this block.
    }
// Original L351: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    if (button.classList.contains('duplicate-btn')) {
// Original L352: Returns the first item of an array containing the expanded entries/properties from calls `store.employees.values` with no arguments matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `shift.employee?.id` (the id property of shift.employee); optional chaining stops with undefined if a guarded receiver is null or undefined differ in value or type, or undefined; stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.
      const employee = [...store.employees.values()].find(candidate => candidate.id !== shift.employee?.id);
// Original L353: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!employee) {
// Original L354: Shows a plain-language validation or failure message to the user.
        window.alert('Add another employee before duplicating this shift.');
// Original L355: Returns no value to the caller and exits this function.
        return;
// Original L356: Closes conditional branch. Control continues after this block.
      }
// Original L357: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L358: Calls `showViewModal` with calls `shift.duplicateFor` with `employee` (employee); `shift` (shift).
        showViewModal(shift.duplicateFor(employee), shift);
// Original L359: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L360: Shows a plain-language validation or failure message to the user.
        window.alert(error.message || 'This shift could not be duplicated.');
// Original L361: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L362: Returns no value to the caller and exits this function.
      return;
// Original L363: Closes conditional branch. Control continues after this block.
    }
// Original L364: Asks the user to confirm this destructive or irreversible action before continuing.
    if (button.classList.contains('delete-btn') && window.confirm('Are you sure you want to delete this shift?')) {
// Original L365: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      button.disabled = true;
// Original L366: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L367: Requests deletion from the shared store, then the caller redraws the relevant list.
        await store.deleteShift(shift.id);
// Original L368: Calls `renderList` with no arguments.
        renderList();
// Original L369: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L370: Calls `console.error` with "Unable to delete shift:"; `error` (error).
        console.error('Unable to delete shift:', error);
// Original L371: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        button.disabled = false;
// Original L372: Shows a plain-language validation or failure message to the user.
        window.alert('This shift could not be deleted. Please try again.');
// Original L373: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L374: Closes conditional branch. Control continues after this block.
    }
// Original L375: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L376: Blank line separates related code sections for readability.

// Original L377: Calls `renderList` with no arguments.
  renderList();
// Original L378: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
