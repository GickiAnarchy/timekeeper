# scripts/shifts.js

[Exact copy](../../original/scripts/shifts.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import {
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 2

```text
  store,
```

Imports the shared store used to load and persist shift records.

### Line 3

```text
  populateEmployeeDropdowns,
```

Imports the helper that fills employee filters and form controls.

### Line 4

```text
  populateCustomerDropdowns,
```

Imports the helper that fills customer filters and form controls.

### Line 5

```text
  WorkShift
```

Imports the class used for new or duplicated work-shift records.

### Line 6

```text
} from './models.js';
```

Completes the named import list and tells the browser to resolve these shared helpers from ./models.js. Imported bindings refer to exports of that module.

### Line 7

```text
import { resetShiftDialogViewport, syncShiftDialogViewport } from './shift-dialog-viewport.mjs';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 8

```text

```

Blank line separates related code sections for readability.

### Line 9

```text
function formatForDateTimeLocal(date) {
```

Defines `formatForDateTimeLocal` (format for date time local), a reusable function taking date. Its body runs when called, not when declared.

### Line 10

```text
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
```

Returns "" to the caller and exits this function.

### Line 11

```text
  const year = date.getFullYear();
```

Calls `date.getFullYear` with no arguments; stores the result in `year`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 12

```text
  const month = String(date.getMonth() + 1).padStart(2, '0');
```

Adds padding "0" to the beginning of converts adds calls `date.getMonth` with no arguments and 1 (or joins them if a value is text) to text until it has length 2; stores the result in `month`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 13

```text
  const day = String(date.getDate()).padStart(2, '0');
```

Adds padding "0" to the beginning of converts calls `date.getDate` with no arguments to text until it has length 2; stores the result in `day`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 14

```text
  const hours = String(date.getHours()).padStart(2, '0');
```

Adds padding "0" to the beginning of converts calls `date.getHours` with no arguments to text until it has length 2; stores the result in `hours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 15

```text
  const minutes = String(date.getMinutes()).padStart(2, '0');
```

Adds padding "0" to the beginning of converts calls `date.getMinutes` with no arguments to text until it has length 2; stores the result in `minutes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 16

```text
  return `${year}-${month}-${day}T${hours}:${minutes}`;
```

Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day), `hours` (hours), `minutes` (minutes) to the caller and exits this function.

### Line 17

```text
}
```

Closes function formatForDateTimeLocal. Control continues after this block.

### Line 18

```text

```

Blank line separates related code sections for readability.

### Line 19

```text
function makeElement(tag, className, text) {
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 20

```text
  const element = document.createElement(tag);
```

Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 21

```text
  if (className) element.className = className;
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 22

```text
  if (text !== undefined) element.textContent = text;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 23

```text
  return element;
```

Returns `element` (element) to the caller and exits this function.

### Line 24

```text
}
```

Closes function makeElement. Control continues after this block.

### Line 25

```text

```

Blank line separates related code sections for readability.

### Line 26

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page’s HTML exists before querying elements and wiring its controls.

### Line 27

```text
  await store.init();
```

Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.

### Line 28

```text

```

Blank line separates related code sections for readability.

### Line 29

```text
  const shiftList = document.getElementById('shiftList');
```

Finds the page element whose unique ID is "shiftList", or null if absent; stores the result in `shiftList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 30

```text
  const empFilter = document.getElementById('emp-filter');
```

Finds the page element whose unique ID is "emp-filter", or null if absent; stores the result in `empFilter`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 31

```text
  const custFilter = document.getElementById('cust-filter');
```

Finds the page element whose unique ID is "cust-filter", or null if absent; stores the result in `custFilter`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 32

```text
  const paidCheckbox = document.getElementById('paid-filter');
```

Finds the page element whose unique ID is "paid-filter", or null if absent; stores the result in `paidCheckbox`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 33

```text
  const addButton = document.getElementById('add-button');
```

Finds the page element whose unique ID is "add-button", or null if absent; stores the result in `addButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 34

```text
  const modal = document.getElementById('viewShiftModal');
```

Finds the page element whose unique ID is "viewShiftModal", or null if absent; stores the result in `modal`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
  const empSelect = document.getElementById('shift-emp');
```

Finds the page element whose unique ID is "shift-emp", or null if absent; stores the result in `empSelect`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 36

```text
  const custSelect = document.getElementById('shift-cust');
```

Finds the page element whose unique ID is "shift-cust", or null if absent; stores the result in `custSelect`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 37

```text
  const timeIn = document.getElementById('shift-start');
```

Finds the page element whose unique ID is "shift-start", or null if absent; stores the result in `timeIn`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 38

```text
  const timeOut = document.getElementById('shift-end');
```

Finds the page element whose unique ID is "shift-end", or null if absent; stores the result in `timeOut`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 39

```text
  const actualHours = document.getElementById('total-hours');
```

Finds the page element whose unique ID is "total-hours", or null if absent; stores the result in `actualHours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 40

```text
  const paidHours = document.getElementById('paid-hours');
```

Finds the page element whose unique ID is "paid-hours", or null if absent; stores the result in `paidHours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  const noteView = document.getElementById('note-view');
```

Finds the page element whose unique ID is "note-view", or null if absent; stores the result in `noteView`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
  const paidBox = document.getElementById('paid-checkbox-view');
```

Finds the page element whose unique ID is "paid-checkbox-view", or null if absent; stores the result in `paidBox`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 43

```text
  const breaksList = document.getElementById('breaks-list');
```

Finds the page element whose unique ID is "breaks-list", or null if absent; stores the result in `breaksList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 44

```text
  const formError = document.getElementById('shift-form-error');
```

Finds the page element whose unique ID is "shift-form-error", or null if absent; stores the result in `formError`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 45

```text
  const okBtn = document.getElementById('ok-btn');
```

Finds the page element whose unique ID is "ok-btn", or null if absent; stores the result in `okBtn`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 46

```text
  const cancelBtn = document.getElementById('cancel-btn');
```

Finds the page element whose unique ID is "cancel-btn", or null if absent; stores the result in `cancelBtn`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 47

```text
  const addBreakButton = document.getElementById('add-break-button');
```

Finds the page element whose unique ID is "add-break-button", or null if absent; stores the result in `addBreakButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 48

```text
  let activeShift = null;
```

Null; stores the result in `activeShift`. let allows the binding to be reassigned.

### Line 49

```text
  let isNewShift = false;
```

False; stores the result in `isNewShift`. let allows the binding to be reassigned.

### Line 50

```text
  let duplicateSource = null;
```

Null; stores the result in `duplicateSource`. let allows the binding to be reassigned.

### Line 51

```text
  const syncModalViewport = () => syncShiftDialogViewport(modal, window);
```

A callback taking no parameters that calls `syncShiftDialogViewport` with `modal` (modal); `window` (window); stores the result in `syncModalViewport`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 52

```text

```

Blank line separates related code sections for readability.

### Line 53

```text
  modal.addEventListener('focusin', syncModalViewport);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 54

```text
  window.addEventListener('resize', syncModalViewport);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 55

```text
  window.visualViewport?.addEventListener('resize', syncModalViewport);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 56

```text
  window.visualViewport?.addEventListener('scroll', syncModalViewport);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 57

```text

```

Blank line separates related code sections for readability.

### Line 58

```text
  populateEmployeeDropdowns(empFilter);
```

Calls `populateEmployeeDropdowns` with `empFilter` (emp filter).

### Line 59

```text
  populateCustomerDropdowns(custFilter);
```

Calls `populateCustomerDropdowns` with `custFilter` (cust filter).

### Line 60

```text
  empFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Employees</option>');
```

Assigns the result of "all" selected>All Employees</option>') to empFilter.insertAdjacentHTML('afterbegin', '<option value, updating this control or record for the next step.

### Line 61

```text
  custFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Customers</option>');
```

Assigns the result of "all" selected>All Customers</option>') to custFilter.insertAdjacentHTML('afterbegin', '<option value, updating this control or record for the next step.

### Line 62

```text
  populateEmployeeDropdowns(empSelect);
```

Calls `populateEmployeeDropdowns` with `empSelect` (emp select).

### Line 63

```text
  populateCustomerDropdowns(custSelect);
```

Calls `populateCustomerDropdowns` with `custSelect` (cust select).

### Line 64

```text

```

Blank line separates related code sections for readability.

### Line 65

```text
  empFilter.addEventListener('change', renderList);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 66

```text
  custFilter.addEventListener('change', renderList);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 67

```text
  paidCheckbox.addEventListener('change', renderList);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 68

```text

```

Blank line separates related code sections for readability.

### Line 69

```text
  addButton.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 70

```text
    const employeeId = empFilter.value;
```

`empFilter.value` (the value property of empFilter); stores the result in `employeeId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 71

```text
    const customerId = custFilter.value;
```

`custFilter.value` (the value property of custFilter); stores the result in `customerId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 72

```text
    const employee = employeeId !== 'all' ? store.employees.get(employeeId) : null;
```

Checks checks that `employeeId` (employee id) and "all" differ in value or type; if true chooses calls `store.employees.get` with `employeeId` (employee id), otherwise null; stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 73

```text
    const customer = customerId !== 'all' ? store.customers.get(customerId) : null;
```

Checks checks that `customerId` (customer id) and "all" differ in value or type; if true chooses calls `store.customers.get` with `customerId` (customer id), otherwise null; stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 74

```text
    if (!employee || !customer) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 75

```text
      window.alert('Choose a specific employee and customer in the filters before adding a shift.');
```

Shows a plain-language validation or failure message to the user.

### Line 76

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 77

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 78

```text
    showViewModal(new WorkShift(employee, customer));
```

Creates a work-shift record connecting the selected employee and customer.

### Line 79

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 80

```text

```

Blank line separates related code sections for readability.

### Line 81

```text
  function addBreakRow(breakItem = null) {
```

Defines `addBreakRow` (add break row), a reusable function taking breakItem = null. Its body runs when called, not when declared.

### Line 82

```text
    const row = document.createElement('li');
```

Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `row`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 83

```text
    row.className = 'break-row';
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 84

```text

```

Blank line separates related code sections for readability.

### Line 85

```text
    const label = makeElement('span', 'break-label', `Break ${breaksList.children.length + 1}`);
```

Calls `makeElement` with "span"; "break-label"; a text template that combines fixed text with computed values adds `breaksList.children.length` (the length property of breaksList.children) and 1 (or joins them if a value is text); stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 86

```text
    const startLabel = document.createElement('label');
```

Creates a detached HTML element with tag "label"; it is not visible until inserted in the page; stores the result in `startLabel`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 87

```text
    startLabel.textContent = 'From';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 88

```text
    const start = document.createElement('input');
```

Creates a detached HTML element with tag "input"; it is not visible until inserted in the page; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 89

```text
    start.type = 'datetime-local';
```

Assigns the result of 'datetime-local' to start.type, updating this control or record for the next step.

### Line 90

```text
    start.className = 'break-start';
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 91

```text
    start.value = formatForDateTimeLocal(breakItem?.start || null);
```

Assigns the result of formatForDateTimeLocal(breakItem?.start || null) to start.value, updating this control or record for the next step.

### Line 92

```text
    start.setAttribute('aria-label', 'Break start');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 93

```text
    start.addEventListener('input', updateActualHours);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 94

```text
    startLabel.appendChild(start);
```

Places the newly built child elements into the document so the user can see them.

### Line 95

```text

```

Blank line separates related code sections for readability.

### Line 96

```text
    const endLabel = document.createElement('label');
```

Creates a detached HTML element with tag "label"; it is not visible until inserted in the page; stores the result in `endLabel`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 97

```text
    endLabel.textContent = 'To';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 98

```text
    const end = document.createElement('input');
```

Creates a detached HTML element with tag "input"; it is not visible until inserted in the page; stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 99

```text
    end.type = 'datetime-local';
```

Assigns the result of 'datetime-local' to end.type, updating this control or record for the next step.

### Line 100

```text
    end.className = 'break-end';
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 101

```text
    end.value = formatForDateTimeLocal(breakItem?.end || null);
```

Assigns the result of formatForDateTimeLocal(breakItem?.end || null) to end.value, updating this control or record for the next step.

### Line 102

```text
    end.setAttribute('aria-label', 'Break end');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 103

```text
    end.addEventListener('input', updateActualHours);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 104

```text
    endLabel.appendChild(end);
```

Places the newly built child elements into the document so the user can see them.

### Line 105

```text

```

Blank line separates related code sections for readability.

### Line 106

```text
    const removeButton = makeElement('button', 'remove-break-button', 'Remove');
```

Calls `makeElement` with "button"; "remove-break-button"; "Remove"; stores the result in `removeButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 107

```text
    removeButton.type = 'button';
```

Assigns the result of 'button' to removeButton.type, updating this control or record for the next step.

### Line 108

```text
    removeButton.setAttribute('aria-label', `Remove break ${breaksList.children.length + 1}`);
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 109

```text
    row.append(label, startLabel, endLabel, removeButton);
```

Places the newly built child elements into the document so the user can see them.

### Line 110

```text
    breaksList.appendChild(row);
```

Places the newly built child elements into the document so the user can see them.

### Line 111

```text
  }
```

Closes function addBreakRow. Control continues after this block.

### Line 112

```text

```

Blank line separates related code sections for readability.

### Line 113

```text
  function collectBreaks() {
```

Defines `collectBreaks` (collect breaks), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 114

```text
    const result = [];
```

An array containing ; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 115

```text
    for (const [index, row] of [...breaksList.querySelectorAll('.break-row')].entries()) {
```

Finds matching DOM elements used by this page’s navigation, list, or form UI.

### Line 116

```text
      const startValue = row.querySelector('.break-start').value;
```

`row.querySelector('.break-start').value` (the value property of row.querySelector('.break-start')); stores the result in `startValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 117

```text
      const endValue = row.querySelector('.break-end').value;
```

`row.querySelector('.break-end').value` (the value property of row.querySelector('.break-end')); stores the result in `endValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 118

```text
      if (!startValue && !endValue) continue;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 119

```text
      if (!startValue || !endValue) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 120

```text
        throw new Error(`Break ${index + 1} needs both a start and end time.`);
```

Stops this operation with a meaningful validation error that the caller can show to the user.

### Line 121

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 122

```text
      result.push({ start: new Date(startValue), end: new Date(endValue) });
```

Converts the stored or entered date/time into a Date object for display or arithmetic.

### Line 123

```text
    }
```

Closes loop. Control continues after this block.

### Line 124

```text
    return result;
```

Returns `result` (result) to the caller and exits this function.

### Line 125

```text
  }
```

Closes function collectBreaks. Control continues after this block.

### Line 126

```text

```

Blank line separates related code sections for readability.

### Line 127

```text
  function updateActualHours() {
```

Defines `updateActualHours` (update actual hours), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 128

```text
    const start = new Date(timeIn.value);
```

Constructs a new instance of `Date` with `timeIn.value` (the value property of timeIn); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 129

```text
    const end = new Date(timeOut.value);
```

Constructs a new instance of `Date` with `timeOut.value` (the value property of timeOut); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 130

```text
    if (!timeIn.value || !timeOut.value || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 131

```text
      actualHours.value = '0.00';
```

Assigns the result of '0.00' to actualHours.value, updating this control or record for the next step.

### Line 132

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 133

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 134

```text
    let breakMs = 0;
```

0; stores the result in `breakMs`. let allows the binding to be reassigned.

### Line 135

```text
    for (const row of breaksList.querySelectorAll('.break-row')) {
```

Finds matching DOM elements used by this page’s navigation, list, or form UI.

### Line 136

```text
      const breakStartValue = row.querySelector('.break-start').value;
```

`row.querySelector('.break-start').value` (the value property of row.querySelector('.break-start')); stores the result in `breakStartValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 137

```text
      const breakEndValue = row.querySelector('.break-end').value;
```

`row.querySelector('.break-end').value` (the value property of row.querySelector('.break-end')); stores the result in `breakEndValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 138

```text
      if (!breakStartValue || !breakEndValue) continue;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 139

```text
      const breakStart = new Date(breakStartValue);
```

Constructs a new instance of `Date` with `breakStartValue` (break start value); stores the result in `breakStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 140

```text
      const breakEnd = new Date(breakEndValue);
```

Constructs a new instance of `Date` with `breakEndValue` (break end value); stores the result in `breakEnd`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 141

```text
      if (!Number.isNaN(breakStart.getTime()) && !Number.isNaN(breakEnd.getTime()) && breakEnd > breakStart) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 142

```text
        breakMs += breakEnd - breakStart;
```

Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.

### Line 143

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 144

```text
    }
```

Closes loop. Control continues after this block.

### Line 145

```text
    actualHours.value = Math.max(0, (end - start - breakMs) / 3600000).toFixed(2);
```

Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.

### Line 146

```text
  }
```

Closes function updateActualHours. Control continues after this block.

### Line 147

```text

```

Blank line separates related code sections for readability.

### Line 148

```text
  timeIn.addEventListener('input', updateActualHours);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 149

```text
  timeOut.addEventListener('input', updateActualHours);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 150

```text
  addBreakButton.addEventListener('click', () => addBreakRow());
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 151

```text
  breaksList.addEventListener('click', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 152

```text
    const button = event.target.closest('.remove-break-button');
```

Calls `event.target.closest` with ".remove-break-button"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 153

```text
    if (!button) return;
```

Returns no value to the caller and exits this function.

### Line 154

```text
    button.closest('.break-row').remove();
```

Calls `button.closest('.break-row').remove` with no arguments.

### Line 155

```text
    [...breaksList.querySelectorAll('.break-row')].forEach((row, index) => {
```

Finds matching DOM elements used by this page’s navigation, list, or form UI.

### Line 156

```text
      row.querySelector('.break-label').textContent = `Break ${index + 1}`;
```

Finds matching DOM elements used by this page’s navigation, list, or form UI.

### Line 157

```text
      row.querySelector('.remove-break-button').setAttribute('aria-label', `Remove break ${index + 1}`);
```

Finds matching DOM elements used by this page’s navigation, list, or form UI.

### Line 158

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 159

```text
    updateActualHours();
```

Calls `updateActualHours` with no arguments.

### Line 160

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 161

```text

```

Blank line separates related code sections for readability.

### Line 162

```text
  function showViewModal(shift, source = null) {
```

Defines `showViewModal` (show view modal), a reusable function taking shift, source = null. Its body runs when called, not when declared.

### Line 163

```text
    activeShift = shift;
```

Assigns the result of shift to activeShift, updating this control or record for the next step.

### Line 164

```text
    duplicateSource = source;
```

Assigns the result of source to duplicateSource, updating this control or record for the next step.

### Line 165

```text
    isNewShift = !store.shifts.some(candidate => candidate.id === shift.id);
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 166

```text
    document.getElementById('shift-modal-title').textContent = source ? 'Duplicate work shift for…' : 'Shift Details';
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 167

```text
    const duplicateHint = document.getElementById('shift-duplicate-hint');
```

Finds the page element whose unique ID is "shift-duplicate-hint", or null if absent; stores the result in `duplicateHint`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 168

```text
    duplicateHint.hidden = !source;
```

Assigns the result of !source to duplicateHint.hidden, updating this control or record for the next step.

### Line 169

```text
    duplicateHint.textContent = source
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 170

```text
      ? `Copy of ${source.employee?.name || 'another employee'}’s shift. Choose the employee who worked the same shift, review the details, then save. The copy starts unpaid.`
```

Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.

### Line 171

```text
      : '';
```

Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.

### Line 172

```text
    for (const option of empSelect.options) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 173

```text
      option.disabled = Boolean(source && option.value === source.employee?.id);
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 174

```text
    }
```

Closes loop. Control continues after this block.

### Line 175

```text
    formError.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 176

```text
    empSelect.value = source ? '' : shift.employee?.id || '';
```

Assigns the result of source ? '' : shift.employee?.id || '' to empSelect.value, updating this control or record for the next step.

### Line 177

```text
    custSelect.value = shift.customer?.id || '';
```

Assigns the result of shift.customer?.id || '' to custSelect.value, updating this control or record for the next step.

### Line 178

```text
    timeIn.value = formatForDateTimeLocal(shift.clockInTime);
```

Assigns the result of formatForDateTimeLocal(shift.clockInTime) to timeIn.value, updating this control or record for the next step.

### Line 179

```text
    timeOut.value = formatForDateTimeLocal(shift.clockOutTime);
```

Assigns the result of formatForDateTimeLocal(shift.clockOutTime) to timeOut.value, updating this control or record for the next step.

### Line 180

```text
    noteView.value = shift.note || '';
```

Assigns the result of shift.note || '' to noteView.value, updating this control or record for the next step.

### Line 181

```text
    paidBox.checked = Boolean(shift.isPaid);
```

Assigns the result of Boolean(shift.isPaid) to paidBox.checked, updating this control or record for the next step.

### Line 182

```text
    paidHours.value = Number.isFinite(shift.paidHours) ? String(shift.paidHours) : '';
```

Validates that the converted value is a real finite number before using it in calculations or saving.

### Line 183

```text
    breaksList.replaceChildren();
```

Clears stale rendered children before drawing the current data set.

### Line 184

```text
    shift.breaks.forEach(breakItem => addBreakRow(breakItem));
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 185

```text
    updateActualHours();
```

Calls `updateActualHours` with no arguments.

### Line 186

```text
    modal.showModal();
```

Calls `modal.showModal` with no arguments.

### Line 187

```text
    syncModalViewport();
```

Calls `syncModalViewport` with no arguments.

### Line 188

```text
    if (source) empSelect.focus();
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 189

```text
  }
```

Closes function showViewModal. Control continues after this block.

### Line 190

```text

```

Blank line separates related code sections for readability.

### Line 191

```text
  okBtn.addEventListener('click', async () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 192

```text
    if (!activeShift || okBtn.disabled) return;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 193

```text
    formError.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 194

```text
    const employee = store.employees.get(empSelect.value);
```

Calls `store.employees.get` with `empSelect.value` (the value property of empSelect); stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 195

```text
    const customer = store.customers.get(custSelect.value);
```

Calls `store.customers.get` with `custSelect.value` (the value property of custSelect); stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 196

```text
    if (!employee || !customer) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 197

```text
      formError.textContent = 'Choose an employee and customer.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 198

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 199

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 200

```text
    if (duplicateSource && employee.id === duplicateSource.employee?.id) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 201

```text
      formError.textContent = 'Choose a different employee for the duplicate shift.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 202

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 203

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 204

```text
    if (!timeIn.value || !timeOut.value) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 205

```text
      formError.textContent = 'Enter both the actual shift start and end times.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 206

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 207

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 208

```text
    const start = new Date(timeIn.value);
```

Constructs a new instance of `Date` with `timeIn.value` (the value property of timeIn); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 209

```text
    const end = new Date(timeOut.value);
```

Constructs a new instance of `Date` with `timeOut.value` (the value property of timeOut); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 210

```text
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 211

```text
      formError.textContent = 'The shift end must be after its start.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 212

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 213

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 214

```text

```

Blank line separates related code sections for readability.

### Line 215

```text
    let breaks;
```

Stores the value value used by this page’s rendering, validation, or event logic.

### Line 216

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 217

```text
      breaks = collectBreaks();
```

Assigns the result of collectBreaks() to breaks, updating this control or record for the next step.

### Line 218

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 219

```text
      formError.textContent = error.message;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 220

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 221

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 222

```text
    const orderedBreaks = [...breaks].sort((a, b) => a.start - b.start);
```

Sorts an array containing the expanded entries/properties from `breaks` (breaks) in place using comparison a callback taking a, b that subtracts `b.start` (the start property of b) from `a.start` (the start property of a); stores the result in `orderedBreaks`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 223

```text
    for (let index = 0; index < orderedBreaks.length; index += 1) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 224

```text
      const breakItem = orderedBreaks[index];
```

The entry at index/key `index` (index) in `orderedBreaks` (ordered breaks); stores the result in `breakItem`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 225

```text
      if (breakItem.start < start || breakItem.end > end || breakItem.end <= breakItem.start) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 226

```text
        formError.textContent = `Break ${index + 1} must be valid and fall within the shift.`;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 227

```text
        return;
```

Returns no value to the caller and exits this function.

### Line 228

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 229

```text
      if (index > 0 && breakItem.start < orderedBreaks[index - 1].end) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 230

```text
        formError.textContent = 'Break times cannot overlap.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 231

```text
        return;
```

Returns no value to the caller and exits this function.

### Line 232

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 233

```text
    }
```

Closes loop. Control continues after this block.

### Line 234

```text
    const paidHoursValue = paidHours.value === '' ? null : Number(paidHours.value);
```

Checks checks that `paidHours.value` (the value property of paidHours) and "" have the same value and type; if true chooses null, otherwise converts `paidHours.value` (the value property of paidHours) to a number (invalid numeric text becomes NaN); stores the result in `paidHoursValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 235

```text
    if (paidHoursValue !== null && (!Number.isFinite(paidHoursValue) || paidHoursValue < 0)) {
```

Validates that the converted value is a real finite number before using it in calculations or saving.

### Line 236

```text
      formError.textContent = 'Paid hours must be a non-negative number, or left blank to use actual hours.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 237

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 238

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 239

```text

```

Blank line separates related code sections for readability.

### Line 240

```text
    okBtn.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 241

```text
    okBtn.textContent = 'Saving…';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 242

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 243

```text
      if (isNewShift) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 244

```text
        activeShift.employee = employee;
```

Assigns the result of employee to activeShift.employee, updating this control or record for the next step.

### Line 245

```text
        activeShift.customer = customer;
```

Assigns the result of customer to activeShift.customer, updating this control or record for the next step.

### Line 246

```text
        activeShift.clockInTime = start;
```

Assigns the result of start to activeShift.clockInTime, updating this control or record for the next step.

### Line 247

```text
        activeShift.clockOutTime = end;
```

Assigns the result of end to activeShift.clockOutTime, updating this control or record for the next step.

### Line 248

```text
        activeShift.note = noteView.value.trim() || null;
```

Assigns the result of noteView.value.trim() || null to activeShift.note, updating this control or record for the next step.

### Line 249

```text
        activeShift.isPaid = paidBox.checked;
```

Assigns the result of paidBox.checked to activeShift.isPaid, updating this control or record for the next step.

### Line 250

```text
        activeShift.breaks = breaks;
```

Assigns the result of breaks to activeShift.breaks, updating this control or record for the next step.

### Line 251

```text
        activeShift.paidHours = paidHoursValue;
```

Assigns the result of paidHoursValue to activeShift.paidHours, updating this control or record for the next step.

### Line 252

```text
        await store.saveShift(activeShift);
```

Persists the changed shift through the store before updating the visible in-memory list.

### Line 253

```text
        store.shifts.push(activeShift);
```

Appends `activeShift` (active shift) to `store.shifts` (the shifts property of store).

### Line 254

```text
      } else {
```

Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.

### Line 255

```text
        await store.updateShift(
```

Sends the edited record fields to the store so the saved data matches the form.

### Line 256

```text
          activeShift.id,
```

Supplies this argument/value (activeShift.id) to the surrounding constructor or DOM call.

### Line 257

```text
          employee,
```

Includes the named value employee in the surrounding import list or collection, making that app dependency available here.

### Line 258

```text
          customer,
```

Includes the named value customer in the surrounding import list or collection, making that app dependency available here.

### Line 259

```text
          start,
```

Includes the named value start in the surrounding import list or collection, making that app dependency available here.

### Line 260

```text
          end,
```

Includes the named value end in the surrounding import list or collection, making that app dependency available here.

### Line 261

```text
          noteView.value,
```

Supplies this argument/value (noteView.value) to the surrounding constructor or DOM call.

### Line 262

```text
          paidBox.checked,
```

Supplies this argument/value (paidBox.checked) to the surrounding constructor or DOM call.

### Line 263

```text
          breaks,
```

Includes the named value breaks in the surrounding import list or collection, making that app dependency available here.

### Line 264

```text
          paidHoursValue
```

Includes the named value paidHoursValue in the surrounding import list or collection, making that app dependency available here.

### Line 265

```text
        );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 266

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 267

```text
      // Keep the new employee’s shift visible even when the source was filtered.
```

Comment: Keep the new employee’s shift visible even when the source was filtered.

### Line 268

```text
      if (duplicateSource) empFilter.value = employee.id;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 269

```text
      modal.close();
```

Calls `modal.close` with no arguments.

### Line 270

```text
      activeShift = null;
```

Assigns the result of null to activeShift, updating this control or record for the next step.

### Line 271

```text
      renderList();
```

Calls `renderList` with no arguments.

### Line 272

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 273

```text
      console.error('Unable to save shift:', error);
```

Calls `console.error` with "Unable to save shift:"; `error` (error).

### Line 274

```text
      formError.textContent = error.message || 'Unable to save this shift. Please try again.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 275

```text
    } finally {
```

Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.

### Line 276

```text
      okBtn.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 277

```text
      okBtn.textContent = 'Save changes';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 278

```text
    }
```

Closes try/catch error-handling construct. Control continues after this block.

### Line 279

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 280

```text

```

Blank line separates related code sections for readability.

### Line 281

```text
  cancelBtn.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 282

```text
    activeShift = null;
```

Assigns the result of null to activeShift, updating this control or record for the next step.

### Line 283

```text
    modal.close();
```

Calls `modal.close` with no arguments.

### Line 284

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 285

```text
  modal.addEventListener('close', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 286

```text
    resetShiftDialogViewport(modal);
```

Calls `resetShiftDialogViewport` with `modal` (modal).

### Line 287

```text
    activeShift = null;
```

Assigns the result of null to activeShift, updating this control or record for the next step.

### Line 288

```text
    duplicateSource = null;
```

Assigns the result of null to duplicateSource, updating this control or record for the next step.

### Line 289

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 290

```text

```

Blank line separates related code sections for readability.

### Line 291

```text
  function renderList() {
```

Defines `renderList` (render list), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 292

```text
    if (!shiftList) return;
```

Returns no value to the caller and exits this function.

### Line 293

```text
    const employeeSelection = empFilter.value;
```

`empFilter.value` (the value property of empFilter); stores the result in `employeeSelection`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 294

```text
    const customerSelection = custFilter.value;
```

`custFilter.value` (the value property of custFilter); stores the result in `customerSelection`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 295

```text
    let completeShifts = store.shifts.filter(shift => shift.isComplete);
```

Keeps only items of `store.shifts` (the shifts property of store) for which a callback taking shift that `shift.isComplete` (the is complete property of shift) returns truthy; stores the result in `completeShifts`. let allows the binding to be reassigned.

### Line 296

```text

```

Blank line separates related code sections for readability.

### Line 297

```text
    if (employeeSelection && employeeSelection !== 'all') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 298

```text
      completeShifts = completeShifts.filter(shift => shift.employee?.id === employeeSelection);
```

Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.

### Line 299

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 300

```text
    if (customerSelection && customerSelection !== 'all') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 301

```text
      completeShifts = completeShifts.filter(shift => shift.customer?.id === customerSelection);
```

Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.

### Line 302

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 303

```text
    if (paidCheckbox.checked) completeShifts = completeShifts.filter(shift => !shift.isPaid);
```

Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.

### Line 304

```text

```

Blank line separates related code sections for readability.

### Line 305

```text
    completeShifts.sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
```

Orders records for predictable display, usually by completion status, date, or most-recent shift.

### Line 306

```text
    shiftList.replaceChildren();
```

Clears stale rendered children before drawing the current data set.

### Line 307

```text
    if (completeShifts.length === 0) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 308

```text
      shiftList.appendChild(makeElement('li', 'empty-list shift-card', 'No completed shifts match these filters.'));
```

Places the newly built child elements into the document so the user can see them.

### Line 309

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 310

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 311

```text

```

Blank line separates related code sections for readability.

### Line 312

```text
    completeShifts.forEach(shift => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 313

```text
      const item = makeElement('li', `shift-card${shift.isPaid ? ' is-paid' : ''}`);
```

Calls `makeElement` with "li"; a text template that combines fixed text with computed values checks `shift.isPaid` (the is paid property of shift); if true chooses " is-paid", otherwise ""; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 314

```text
      const date = makeElement('div', 'date-div');
```

Calls `makeElement` with "div"; "date-div"; stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 315

```text
      date.appendChild(makeElement('p', '', shift.clockInTime?.toLocaleDateString() || 'Unknown date'));
```

Places the newly built child elements into the document so the user can see them.

### Line 316

```text
      const summary = makeElement('div', 'emp-cust-div');
```

Calls `makeElement` with "div"; "emp-cust-div"; stores the result in `summary`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 317

```text
      const employeeName = makeElement('strong', '', shift.employee?.name || 'Unknown employee');
```

Calls `makeElement` with "strong"; ""; uses `shift.employee?.name` (the name property of shift.employee); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown employee"; stores the result in `employeeName`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 318

```text
      const details = makeElement('div', '', ` @ ${shift.customer?.name || 'Unknown customer'}`);
```

Calls `makeElement` with "div"; ""; a text template that combines fixed text with computed values uses `shift.customer?.name` (the name property of shift.customer); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown customer"; stores the result in `details`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 319

```text
      const timeLine = makeElement('small', 'time-small',
```

Calls `makeElement` with "small"; "time-small"; a text template that combines fixed text with computed values uses calls `shift.clockInTime?.toLocaleTimeString` with `[]`; `{ hour: '2-digit', minute: '2-digit' }`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown", uses calls `shift.clockOutTime?.toLocaleTimeString` with `[]`; `{ hour: '2-digit', minute: '2-digit' }`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown"; stores the result in `timeLine`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 320

```text
        `In: ${shift.clockInTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}  ·  Out: ${shift.clockOutTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}`);
```

Defines field hour as "2-digit".

### Line 321

```text
      const workedLine = makeElement('small', 'time-small',
```

Calls `makeElement` with "small"; "time-small"; a text template that combines fixed text with computed values formats calls `shift.getHoursWorked` with no arguments as text with 2 digits after the decimal point, formats calls `shift.getPaidHours` with no arguments as text with 2 digits after the decimal point; stores the result in `workedLine`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 322

```text
        `Worked ${shift.getHoursWorked().toFixed(2)} h  ·  Paid ${shift.getPaidHours().toFixed(2)} h`);
```

Calculates actual worked hours for display, using the shift span minus recorded breaks.

### Line 323

```text
      summary.append(employeeName, details, document.createElement('br'), timeLine, document.createElement('br'), workedLine);
```

Creates a DOM element in memory so the script can build this piece of the rendered interface.

### Line 324

```text

```

Blank line separates related code sections for readability.

### Line 325

```text
      const actions = makeElement('div', 'list-item-buttons');
```

Calls `makeElement` with "div"; "list-item-buttons"; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 326

```text
      const editButton = makeElement('button', 'view-btn', 'Edit');
```

Calls `makeElement` with "button"; "view-btn"; "Edit"; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 327

```text
      editButton.type = 'button';
```

Assigns the result of 'button' to editButton.type, updating this control or record for the next step.

### Line 328

```text
      editButton.dataset.id = shift.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 329

```text
      const duplicateButton = makeElement('button', 'duplicate-btn', 'Duplicate work shift for…');
```

Calls `makeElement` with "button"; "duplicate-btn"; "Duplicate work shift for…"; stores the result in `duplicateButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 330

```text
      duplicateButton.type = 'button';
```

Assigns the result of 'button' to duplicateButton.type, updating this control or record for the next step.

### Line 331

```text
      duplicateButton.dataset.id = shift.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 332

```text
      const deleteButton = makeElement('button', 'delete-btn', 'Delete');
```

Calls `makeElement` with "button"; "delete-btn"; "Delete"; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 333

```text
      deleteButton.type = 'button';
```

Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.

### Line 334

```text
      deleteButton.dataset.id = shift.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 335

```text
      actions.append(editButton, duplicateButton, deleteButton);
```

Places the newly built child elements into the document so the user can see them.

### Line 336

```text
      item.append(date, summary, actions);
```

Places the newly built child elements into the document so the user can see them.

### Line 337

```text
      shiftList.appendChild(item);
```

Places the newly built child elements into the document so the user can see them.

### Line 338

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 339

```text
  }
```

Closes function renderList. Control continues after this block.

### Line 340

```text

```

Blank line separates related code sections for readability.

### Line 341

```text
  shiftList.addEventListener('click', async event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 342

```text
    const button = event.target.closest('button[data-id]');
```

Calls `event.target.closest` with "button[data-id]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 343

```text
    if (!button) return;
```

Returns no value to the caller and exits this function.

### Line 344

```text
    const shift = store.shifts.find(candidate => candidate.id === button.dataset.id);
```

Returns the first item of `store.shifts` (the shifts property of store) matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `button.dataset.id` (the id property of button.dataset) have the same value and type, or undefined; stores the result in `shift`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 345

```text
    if (!shift) return;
```

Returns no value to the caller and exits this function.

### Line 346

```text

```

Blank line separates related code sections for readability.

### Line 347

```text
    if (button.classList.contains('view-btn')) {
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 348

```text
      showViewModal(shift);
```

Calls `showViewModal` with `shift` (shift).

### Line 349

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 350

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 351

```text
    if (button.classList.contains('duplicate-btn')) {
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 352

```text
      const employee = [...store.employees.values()].find(candidate => candidate.id !== shift.employee?.id);
```

Returns the first item of an array containing the expanded entries/properties from calls `store.employees.values` with no arguments matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `shift.employee?.id` (the id property of shift.employee); optional chaining stops with undefined if a guarded receiver is null or undefined differ in value or type, or undefined; stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 353

```text
      if (!employee) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 354

```text
        window.alert('Add another employee before duplicating this shift.');
```

Shows a plain-language validation or failure message to the user.

### Line 355

```text
        return;
```

Returns no value to the caller and exits this function.

### Line 356

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 357

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 358

```text
        showViewModal(shift.duplicateFor(employee), shift);
```

Calls `showViewModal` with calls `shift.duplicateFor` with `employee` (employee); `shift` (shift).

### Line 359

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 360

```text
        window.alert(error.message || 'This shift could not be duplicated.');
```

Shows a plain-language validation or failure message to the user.

### Line 361

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 362

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 363

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 364

```text
    if (button.classList.contains('delete-btn') && window.confirm('Are you sure you want to delete this shift?')) {
```

Asks the user to confirm this destructive or irreversible action before continuing.

### Line 365

```text
      button.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 366

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 367

```text
        await store.deleteShift(shift.id);
```

Requests deletion from the shared store, then the caller redraws the relevant list.

### Line 368

```text
        renderList();
```

Calls `renderList` with no arguments.

### Line 369

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 370

```text
        console.error('Unable to delete shift:', error);
```

Calls `console.error` with "Unable to delete shift:"; `error` (error).

### Line 371

```text
        button.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 372

```text
        window.alert('This shift could not be deleted. Please try again.');
```

Shows a plain-language validation or failure message to the user.

### Line 373

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 374

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 375

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 376

```text

```

Blank line separates related code sections for readability.

### Line 377

```text
  renderList();
```

Calls `renderList` with no arguments.

### Line 378

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
