# scripts/planned.js

[Exact copy](../../original/scripts/planned.js)

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

Imports the shared collections and persistence methods for planned jobs.

### Line 3

```text
  PlannedJob,
```

Imports the planned-job model used when the user adds a schedule item.

### Line 4

```text
  populateCustomerDropdowns
```

Imports the helper that fills the planned-job customer selector.

### Line 5

```text
} from './models.js';
```

Completes the named import list and tells the browser to resolve these shared helpers from ./models.js. Imported bindings refer to exports of that module.

### Line 6

```text
import { asValidDate, plannedDateStatus } from './domain.mjs';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 7

```text
import { plannedJobUrgency, updatePlannedAlert, watchPlannedDayChange } from './planned-urgency.mjs';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 8

```text

```

Blank line separates related code sections for readability.

### Line 9

```text
const formatJobDate = new Intl.DateTimeFormat(undefined, {
```

Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "long"; month: "long"; day: "numeric"; year: "numeric"; stores the result in `formatJobDate`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
  weekday: 'long',
```

Supplies this argument/value (weekday: 'long') to the surrounding constructor or DOM call.

### Line 11

```text
  month: 'long',
```

Sets the date/time formatter option month, controlling which part of a displayed date or time is shown.

### Line 12

```text
  day: 'numeric',
```

Sets the date/time formatter option day, controlling which part of a displayed date or time is shown.

### Line 13

```text
  year: 'numeric'
```

Sets the date/time formatter option year, controlling which part of a displayed date or time is shown.

### Line 14

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 15

```text
const formatMonth = new Intl.DateTimeFormat(undefined, { month: 'short' });
```

Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields month: "short"; stores the result in `formatMonth`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 16

```text
const formatWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
```

Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "short"; stores the result in `formatWeekday`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 17

```text

```

Blank line separates related code sections for readability.

### Line 18

```text
function asDate(value) {
```

Defines `asDate` (as date), a reusable function taking value. Its body runs when called, not when declared.

### Line 19

```text
  return asValidDate(value);
```

Returns calls `asValidDate` with `value` (value) to the caller and exits this function.

### Line 20

```text
}
```

Closes function asDate. Control continues after this block.

### Line 21

```text

```

Blank line separates related code sections for readability.

### Line 22

```text
function dateInputValue(date) {
```

Defines `dateInputValue` (date input value), a reusable function taking date. Its body runs when called, not when declared.

### Line 23

```text
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
```

Returns a text template that combines fixed text with computed values calls `date.getFullYear` with no arguments, adds padding "0" to the beginning of converts adds calls `date.getMonth` with no arguments and 1 (or joins them if a value is text) to text until it has length 2, adds padding "0" to the beginning of converts calls `date.getDate` with no arguments to text until it has length 2 to the caller and exits this function.

### Line 24

```text
}
```

Closes function dateInputValue. Control continues after this block.

### Line 25

```text

```

Blank line separates related code sections for readability.

### Line 26

```text
function makeElement(tag, className, text) {
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 27

```text
  const element = document.createElement(tag);
```

Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 28

```text
  if (className) element.className = className;
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 29

```text
  if (text !== undefined) element.textContent = text;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 30

```text
  return element;
```

Returns `element` (element) to the caller and exits this function.

### Line 31

```text
}
```

Closes function makeElement. Control continues after this block.

### Line 32

```text

```

Blank line separates related code sections for readability.

### Line 33

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page’s HTML exists before querying elements and wiring its controls.

### Line 34

```text
  const plannedList = document.getElementById('planned-list');
```

Finds the page element whose unique ID is "planned-list", or null if absent; stores the result in `plannedList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
  const addButton = document.getElementById('add-button');
```

Finds the page element whose unique ID is "add-button", or null if absent; stores the result in `addButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 36

```text
  const modal = document.getElementById('add-modal');
```

Finds the page element whose unique ID is "add-modal", or null if absent; stores the result in `modal`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 37

```text
  const form = document.getElementById('add-form');
```

Finds the page element whose unique ID is "add-form", or null if absent; stores the result in `form`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 38

```text
  const customerSelect = document.getElementById('planned-cust');
```

Finds the page element whose unique ID is "planned-cust", or null if absent; stores the result in `customerSelect`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 39

```text
  const dateInput = document.getElementById('planned-date');
```

Finds the page element whose unique ID is "planned-date", or null if absent; stores the result in `dateInput`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 40

```text
  const dateTbdCheckbox = document.getElementById('planned-date-tbd');
```

Finds the page element whose unique ID is "planned-date-tbd", or null if absent; stores the result in `dateTbdCheckbox`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  const descriptionInput = document.getElementById('planned-description');
```

Finds the page element whose unique ID is "planned-description", or null if absent; stores the result in `descriptionInput`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
  const formError = document.getElementById('planned-form-error');
```

Finds the page element whose unique ID is "planned-form-error", or null if absent; stores the result in `formError`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 43

```text
  const customerHelp = document.getElementById('customer-help');
```

Finds the page element whose unique ID is "customer-help", or null if absent; stores the result in `customerHelp`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 44

```text
  const submitButton = document.getElementById('modal-add-button');
```

Finds the page element whose unique ID is "modal-add-button", or null if absent; stores the result in `submitButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 45

```text
  const modalTitle = document.getElementById('add-job-title');
```

Finds the page element whose unique ID is "add-job-title", or null if absent; stores the result in `modalTitle`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 46

```text
  const modalEyebrow = modal.querySelector('.eyebrow');
```

Finds the first descendant of `modal` (modal) matching CSS selector ".eyebrow"; stores the result in `modalEyebrow`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 47

```text
  const jobCount = document.getElementById('job-count');
```

Finds the page element whose unique ID is "job-count", or null if absent; stores the result in `jobCount`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 48

```text
  const filterButtons = [...document.querySelectorAll('.filter-button')];
```

An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector ".filter-button"; stores the result in `filterButtons`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 49

```text
  let activeFilter = 'open';
```

"open"; stores the result in `activeFilter`. let allows the binding to be reassigned.

### Line 50

```text
  let editingJobId = null;
```

Null; stores the result in `editingJobId`. let allows the binding to be reassigned.

### Line 51

```text

```

Blank line separates related code sections for readability.

### Line 52

```text
  await store.init();
```

Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.

### Line 53

```text
  populateCustomerDropdowns(customerSelect);
```

Calls `populateCustomerDropdowns` with `customerSelect` (customer select).

### Line 54

```text

```

Blank line separates related code sections for readability.

### Line 55

```text
  function sortedJobs() {
```

Defines `sortedJobs` (sorted jobs), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 56

```text
    return [...store.plannedJobs].sort((a, b) => {
```

Returns sorts an array containing the expanded entries/properties from `store.plannedJobs` (the planned jobs property of store) in place using comparison a callback taking a, b that runs its enclosed statements to the caller and exits this function.

### Line 57

```text
      if (a.isComplete !== b.isComplete) return Number(a.isComplete) - Number(b.isComplete);
```

Returns subtracts converts `b.isComplete` (the is complete property of b) to a number (invalid numeric text becomes NaN) from converts `a.isComplete` (the is complete property of a) to a number (invalid numeric text becomes NaN) to the caller and exits this function.

### Line 58

```text
      const dateA = asDate(a.scheduledDate)?.getTime() ?? null;
```

Uses gets calls `asDate` with `a.scheduledDate` (the scheduled date property of a) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateA`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 59

```text
      const dateB = asDate(b.scheduledDate)?.getTime() ?? null;
```

Uses gets calls `asDate` with `b.scheduledDate` (the scheduled date property of b) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateB`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 60

```text
      if (dateA === null && dateB !== null) return 1;
```

Returns 1 to the caller and exits this function.

### Line 61

```text
      if (dateA !== null && dateB === null) return -1;
```

Returns changes the numeric sign of 1 to the caller and exits this function.

### Line 62

```text
      return (dateA ?? 0) - (dateB ?? 0);
```

Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.

### Line 63

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 64

```text
  }
```

Closes function sortedJobs. Control continues after this block.

### Line 65

```text

```

Blank line separates related code sections for readability.

### Line 66

```text
  function updateSummary() {
```

Defines `updateSummary` (update summary), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 67

```text
    const openJobs = store.plannedJobs.filter(job => !job.isComplete);
```

Keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that negates the truthiness of `job.isComplete` (the is complete property of job) returns truthy; stores the result in `openJobs`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 68

```text
    const dueToday = openJobs.filter(job => plannedDateStatus(job.scheduledDate) === 'due-today');
```

Keeps only items of `openJobs` (open jobs) for which a callback taking job that checks that calls `plannedDateStatus` with `job.scheduledDate` (the scheduled date property of job) and "due-today" have the same value and type returns truthy; stores the result in `dueToday`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 69

```text
    const completedJobs = store.plannedJobs.filter(job => job.isComplete);
```

Keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that `job.isComplete` (the is complete property of job) returns truthy; stores the result in `completedJobs`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 70

```text
    document.getElementById('open-count').textContent = openJobs.length;
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 71

```text
    document.getElementById('today-count').textContent = dueToday.length;
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 72

```text
    document.getElementById('completed-count').textContent = completedJobs.length;
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 73

```text
    updatePlannedAlert(document.getElementById('planned-overdue-alert'), store.plannedJobs);
```

Sends the edited record fields to the store so the saved data matches the form.

### Line 74

```text
  }
```

Closes function updateSummary. Control continues after this block.

### Line 75

```text

```

Blank line separates related code sections for readability.

### Line 76

```text
  function createJobCard(job) {
```

Defines `createJobCard` (create job card), a reusable function taking job. Its body runs when called, not when declared.

### Line 77

```text
    const urgency = plannedJobUrgency(job);
```

Calls `plannedJobUrgency` with `job` (job); stores the result in `urgency`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 78

```text
    const item = makeElement('li', `job-card urgency-${urgency.level}${job.isComplete ? ' is-complete' : ''}`);
```

Calls `makeElement` with "li"; a text template that combines fixed text with computed values `urgency.level` (the level property of urgency), checks `job.isComplete` (the is complete property of job); if true chooses " is-complete", otherwise ""; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 79

```text
    const date = asDate(job.scheduledDate);
```

Calls `asDate` with `job.scheduledDate` (the scheduled date property of job); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 80

```text

```

Blank line separates related code sections for readability.

### Line 81

```text
    const dateTile = makeElement('div', 'date-tile');
```

Calls `makeElement` with "div"; "date-tile"; stores the result in `dateTile`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 82

```text
    dateTile.append(
```

Places the newly built child elements into the document so the user can see them.

### Line 83

```text
      makeElement('span', 'date-weekday', date ? formatWeekday.format(date) : ''),
```

Supplies this argument/value (makeElement('span', 'date-weekday', date ? formatWeekday.format(date) : '')) to the surrounding constructor or DOM call.

### Line 84

```text
      makeElement('strong', 'date-day', date ? String(date.getDate()) : 'TBD'),
```

Supplies this argument/value (makeElement('strong', 'date-day', date ? String(date.getDate()) : 'TBD')) to the surrounding constructor or DOM call.

### Line 85

```text
      makeElement('span', 'date-month', date ? formatMonth.format(date) : '')
```

Calls `makeElement` with "span"; "date-month"; checks `date` (date); if true chooses calls `formatMonth.format` with `date` (date), otherwise "".

### Line 86

```text
    );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 87

```text

```

Blank line separates related code sections for readability.

### Line 88

```text
    const content = makeElement('div', 'job-content');
```

Calls `makeElement` with "div"; "job-content"; stores the result in `content`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 89

```text
    const titleRow = makeElement('div', 'job-title-row');
```

Calls `makeElement` with "div"; "job-title-row"; stores the result in `titleRow`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 90

```text
    titleRow.appendChild(makeElement('h3', 'job-description', job.description || 'Scheduled job'));
```

Places the newly built child elements into the document so the user can see them.

### Line 91

```text

```

Blank line separates related code sections for readability.

### Line 92

```text
    titleRow.appendChild(makeElement('span', 'status-pill urgency-label', urgency.label));
```

Places the newly built child elements into the document so the user can see them.

### Line 93

```text

```

Blank line separates related code sections for readability.

### Line 94

```text
    content.append(
```

Places the newly built child elements into the document so the user can see them.

### Line 95

```text
      titleRow,
```

Includes the named value titleRow in the surrounding import list or collection, making that app dependency available here.

### Line 96

```text
      makeElement('p', 'job-customer', job.customer?.name || 'Customer not available'),
```

Supplies this argument/value (makeElement('p', 'job-customer', job.customer?.name || 'Customer not available')) to the surrounding constructor or DOM call.

### Line 97

```text
      makeElement('p', 'job-date', date ? formatJobDate.format(date) : 'Date TBD')
```

Calls `makeElement` with "p"; "job-date"; checks `date` (date); if true chooses calls `formatJobDate.format` with `date` (date), otherwise "Date TBD".

### Line 98

```text
    );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 99

```text

```

Blank line separates related code sections for readability.

### Line 100

```text
    const actions = makeElement('div', 'job-actions');
```

Calls `makeElement` with "div"; "job-actions"; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 101

```text
    const editButton = makeElement('button', 'button button-small button-secondary', 'Edit');
```

Calls `makeElement` with "button"; "button button-small button-secondary"; "Edit"; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 102

```text
    editButton.type = 'button';
```

Assigns the result of 'button' to editButton.type, updating this control or record for the next step.

### Line 103

```text
    editButton.dataset.action = 'edit';
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 104

```text
    editButton.dataset.id = job.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 105

```text
    editButton.setAttribute('aria-label', `Edit ${job.description || 'scheduled job'}`);
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 106

```text

```

Blank line separates related code sections for readability.

### Line 107

```text
    const completeButton = makeElement('button', 'button button-small button-primary', job.isComplete ? 'Reopen' : 'Complete');
```

Calls `makeElement` with "button"; "button button-small button-primary"; checks `job.isComplete` (the is complete property of job); if true chooses "Reopen", otherwise "Complete"; stores the result in `completeButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 108

```text
    completeButton.type = 'button';
```

Assigns the result of 'button' to completeButton.type, updating this control or record for the next step.

### Line 109

```text
    completeButton.dataset.action = 'toggle-complete';
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 110

```text
    completeButton.dataset.id = job.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 111

```text
    completeButton.setAttribute('aria-label', `${job.isComplete ? 'Reopen' : 'Complete'} ${job.description || 'scheduled job'}`);
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 112

```text

```

Blank line separates related code sections for readability.

### Line 113

```text
    const deleteButton = makeElement('button', 'button button-small button-quiet', 'Remove');
```

Calls `makeElement` with "button"; "button button-small button-quiet"; "Remove"; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 114

```text
    deleteButton.type = 'button';
```

Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.

### Line 115

```text
    deleteButton.dataset.action = 'delete';
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 116

```text
    deleteButton.dataset.id = job.id;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 117

```text
    deleteButton.setAttribute('aria-label', `Remove ${job.description || 'scheduled job'}`);
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 118

```text
    actions.append(editButton, completeButton, deleteButton);
```

Places the newly built child elements into the document so the user can see them.

### Line 119

```text
    item.append(dateTile, content, actions);
```

Places the newly built child elements into the document so the user can see them.

### Line 120

```text
    return item;
```

Returns `item` (item) to the caller and exits this function.

### Line 121

```text
  }
```

Closes function createJobCard. Control continues after this block.

### Line 122

```text

```

Blank line separates related code sections for readability.

### Line 123

```text
  function renderJobs() {
```

Defines `renderJobs` (render jobs), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 124

```text
    // List updates must not strand keyboard users on the page body.
```

Comment: List updates must not strand keyboard users on the page body.

### Line 125

```text
    const focusedButton = plannedList.contains(document.activeElement) ? document.activeElement : null;
```

Checks calls `plannedList.contains` with `document.activeElement` (the active element property of document); if true chooses `document.activeElement` (the active element property of document), otherwise null; stores the result in `focusedButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 126

```text
    const focusedId = focusedButton?.dataset.id;
```

`focusedButton?.dataset.id` (the id property of focusedButton?.dataset); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `focusedId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 127

```text
    const focusedAction = focusedButton?.dataset.action;
```

`focusedButton?.dataset.action` (the action property of focusedButton?.dataset); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `focusedAction`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 128

```text
    updateSummary();
```

Calls `updateSummary` with no arguments.

### Line 129

```text
    const visibleJobs = sortedJobs().filter(job => {
```

Keeps only items of calls `sortedJobs` with no arguments for which a callback taking job that runs its enclosed statements returns truthy; stores the result in `visibleJobs`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 130

```text
      if (activeFilter === 'open') return !job.isComplete;
```

Returns negates the truthiness of `job.isComplete` (the is complete property of job) to the caller and exits this function.

### Line 131

```text
      if (activeFilter === 'completed') return job.isComplete;
```

Returns `job.isComplete` (the is complete property of job) to the caller and exits this function.

### Line 132

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 133

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 134

```text

```

Blank line separates related code sections for readability.

### Line 135

```text
    plannedList.replaceChildren();
```

Clears stale rendered children before drawing the current data set.

### Line 136

```text
    jobCount.textContent = `${visibleJobs.length} ${visibleJobs.length === 1 ? 'job' : 'jobs'}`;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 137

```text

```

Blank line separates related code sections for readability.

### Line 138

```text
    if (visibleJobs.length === 0) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 139

```text
      const empty = makeElement('li', 'empty-state');
```

Calls `makeElement` with "li"; "empty-state"; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 140

```text
      const icon = makeElement('span', 'empty-state-icon', activeFilter === 'completed' ? '✓' : '＋');
```

Calls `makeElement` with "span"; "empty-state-icon"; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "✓", otherwise "＋"; stores the result in `icon`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 141

```text
      icon.setAttribute('aria-hidden', 'true');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 142

```text
      const heading = makeElement('h3', '', activeFilter === 'completed' ? 'Nothing completed yet' : 'Your schedule is clear');
```

Calls `makeElement` with "h3"; ""; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "Nothing completed yet", otherwise "Your schedule is clear"; stores the result in `heading`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 143

```text
      const message = makeElement('p', '', activeFilter === 'completed'
```

Calls `makeElement` with "p"; ""; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "Jobs you complete will show up here.", otherwise "Add a planned job to keep upcoming work in view."; stores the result in `message`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 144

```text
        ? 'Jobs you complete will show up here.'
```

Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.

### Line 145

```text
        : 'Add a planned job to keep upcoming work in view.');
```

Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.

### Line 146

```text
      empty.append(icon, heading, message);
```

Places the newly built child elements into the document so the user can see them.

### Line 147

```text
      plannedList.appendChild(empty);
```

Places the newly built child elements into the document so the user can see them.

### Line 148

```text
      if (focusedId) filterButtons.find(button => button.dataset.filter === activeFilter)?.focus({ preventScroll: true });
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 149

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 150

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 151

```text

```

Blank line separates related code sections for readability.

### Line 152

```text
    visibleJobs.forEach(job => plannedList.appendChild(createJobCard(job)));
```

Places the newly built child elements into the document so the user can see them.

### Line 153

```text
    if (focusedId) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 154

```text
      const replacement = [...plannedList.querySelectorAll('button[data-action]')]
```

Returns the first item of an array containing the expanded entries/properties from finds all descendants of `plannedList` (planned list) matching CSS selector "button[data-action]" matching a callback taking button that uses checks that `button.dataset.action` (the action property of button.dataset) and `focusedAction` (focused action) have the same value and type only if checks that `button.dataset.id` (the id property of button.dataset) and `focusedId` (focused id) have the same value and type is truthy; otherwise keeps the falsy first value, or undefined; stores the result in `replacement`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 155

```text
        .find(button => button.dataset.id === focusedId && button.dataset.action === focusedAction);
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 156

```text
      (replacement || filterButtons.find(button => button.dataset.filter === activeFilter))?.focus({ preventScroll: true });
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 157

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 158

```text
  }
```

Closes function renderJobs. Control continues after this block.

### Line 159

```text

```

Blank line separates related code sections for readability.

### Line 160

```text
  function setActiveFilter(filter) {
```

Defines `setActiveFilter` (set active filter), a reusable function taking filter. Its body runs when called, not when declared.

### Line 161

```text
    activeFilter = filter;
```

Assigns the result of filter to activeFilter, updating this control or record for the next step.

### Line 162

```text
    filterButtons.forEach(button => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 163

```text
      const selected = button.dataset.filter === activeFilter;
```

Checks that `button.dataset.filter` (the filter property of button.dataset) and `activeFilter` (active filter) have the same value and type; stores the result in `selected`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 164

```text
      button.classList.toggle('is-active', selected);
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 165

```text
      button.setAttribute('aria-pressed', String(selected));
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 166

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 167

```text
  }
```

Closes function setActiveFilter. Control continues after this block.

### Line 168

```text

```

Blank line separates related code sections for readability.

### Line 169

```text
  filterButtons.forEach(button => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 170

```text
    button.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 171

```text
      setActiveFilter(button.dataset.filter);
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 172

```text
      renderJobs();
```

Calls `renderJobs` with no arguments.

### Line 173

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 174

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 175

```text

```

Blank line separates related code sections for readability.

### Line 176

```text
  function openJobModal(job = null) {
```

Defines `openJobModal` (open job modal), a reusable function taking job = null. Its body runs when called, not when declared.

### Line 177

```text
    form.reset();
```

Calls `form.reset` with no arguments.

### Line 178

```text
    formError.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 179

```text
    editingJobId = job?.id || null;
```

Assigns the result of job?.id || null to editingJobId, updating this control or record for the next step.

### Line 180

```text
    const today = new Date();
```

Constructs a new instance of `Date` with no arguments; stores the result in `today`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 181

```text
    dateTbdCheckbox.checked = Boolean(job && !asDate(job.scheduledDate));
```

Assigns the result of Boolean(job && !asDate(job.scheduledDate)) to dateTbdCheckbox.checked, updating this control or record for the next step.

### Line 182

```text
    dateInput.disabled = dateTbdCheckbox.checked;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 183

```text
    dateInput.required = !dateTbdCheckbox.checked;
```

Assigns the result of !dateTbdCheckbox.checked to dateInput.required, updating this control or record for the next step.

### Line 184

```text
    dateInput.value = job ? (asDate(job.scheduledDate) ? dateInputValue(asDate(job.scheduledDate)) : '') : dateInputValue(today);
```

Assigns the result of job ? (asDate(job.scheduledDate) ? dateInputValue(asDate(job.scheduledDate)) : '') : dateInputValue(today) to dateInput.value, updating this control or record for the next step.

### Line 185

```text
    customerSelect.value = job?.customer?.id || '';
```

Assigns the result of job?.customer?.id || '' to customerSelect.value, updating this control or record for the next step.

### Line 186

```text
    descriptionInput.value = job?.description || '';
```

Assigns the result of job?.description || '' to descriptionInput.value, updating this control or record for the next step.

### Line 187

```text
    modalTitle.textContent = job ? 'Edit planned job' : 'Plan a job';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 188

```text
    modalEyebrow.textContent = job ? 'UPDATE SCHEDULE ITEM' : 'NEW SCHEDULE ITEM';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 189

```text
    submitButton.textContent = job ? 'Save changes' : 'Save job';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 190

```text
    const hasCustomers = store.customers.size > 0;
```

Checks whether `store.customers.size` (the size property of store.customers) is greater than 0; stores the result in `hasCustomers`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 191

```text
    customerHelp.textContent = hasCustomers ? '' : 'Add a customer in People Data before planning a job.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 192

```text
    submitButton.disabled = !hasCustomers;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 193

```text
    modal.showModal();
```

Calls `modal.showModal` with no arguments.

### Line 194

```text
  }
```

Closes function openJobModal. Control continues after this block.

### Line 195

```text

```

Blank line separates related code sections for readability.

### Line 196

```text
  addButton.addEventListener('click', () => openJobModal());
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 197

```text

```

Blank line separates related code sections for readability.

### Line 198

```text
  dateTbdCheckbox.addEventListener('change', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 199

```text
    dateInput.disabled = dateTbdCheckbox.checked;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 200

```text
    dateInput.required = !dateTbdCheckbox.checked;
```

Assigns the result of !dateTbdCheckbox.checked to dateInput.required, updating this control or record for the next step.

### Line 201

```text
    if (dateTbdCheckbox.checked) dateInput.value = '';
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 202

```text
    else if (!dateInput.value) dateInput.value = dateInputValue(new Date());
```

Handles the alternative branch when the preceding condition is false.

### Line 203

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 204

```text

```

Blank line separates related code sections for readability.

### Line 205

```text
  form.addEventListener('submit', async event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 206

```text
    event.preventDefault();
```

Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.

### Line 207

```text
    formError.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 208

```text
    const customer = store.customers.get(customerSelect.value);
```

Calls `store.customers.get` with `customerSelect.value` (the value property of customerSelect); stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 209

```text
    const description = descriptionInput.value.trim();
```

Removes leading and trailing whitespace from `descriptionInput.value` (the value property of descriptionInput); stores the result in `description`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 210

```text
    const dateValue = dateInput.value;
```

`dateInput.value` (the value property of dateInput); stores the result in `dateValue`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 211

```text

```

Blank line separates related code sections for readability.

### Line 212

```text
    if (!customer) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 213

```text
      formError.textContent = 'Choose a customer before saving this job.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 214

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 215

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 216

```text
    if ((!dateValue && !dateTbdCheckbox.checked) || !description) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 217

```text
      formError.textContent = 'Choose a planned date or mark it TBD, and add a job description.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 218

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 219

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 220

```text

```

Blank line separates related code sections for readability.

### Line 221

```text
    let scheduledDate = null;
```

Stores the noon-local calendar date saved for a planned job.

### Line 222

```text
    if (dateValue && !dateTbdCheckbox.checked) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 223

```text
      const [year, month, day] = dateValue.split('-').map(Number);
```

Transforms each selected value into the representation needed by the next UI or data operation.

### Line 224

```text
      scheduledDate = new Date(year, month - 1, day, 12, 0, 0, 0);
```

Converts the stored or entered date/time into a Date object for display or arithmetic.

### Line 225

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 226

```text
    const wasEditing = Boolean(editingJobId);
```

Converts `editingJobId` (editing job id) to true or false according to truthiness; stores the result in `wasEditing`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 227

```text
    const targetJobId = editingJobId;
```

`editingJobId` (editing job id); stores the result in `targetJobId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 228

```text

```

Blank line separates related code sections for readability.

### Line 229

```text
    submitButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 230

```text
    submitButton.textContent = 'Saving…';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 231

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 232

```text
      if (wasEditing) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 233

```text
        await store.updatePlanned(targetJobId, description, scheduledDate, customer);
```

Sends the edited record fields to the store so the saved data matches the form.

### Line 234

```text
      } else {
```

Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.

### Line 235

```text
        const newJob = new PlannedJob(description, scheduledDate, customer);
```

Constructs a new instance of `PlannedJob` with `description` (description); `scheduledDate` (scheduled date); `customer` (customer); stores the result in `newJob`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 236

```text
        await store.savePlanned(newJob);
```

Persists the newly planned job through the shared store.

### Line 237

```text
        store.plannedJobs.push(newJob);
```

Appends `newJob` (new job) to `store.plannedJobs` (the planned jobs property of store).

### Line 238

```text
        setActiveFilter('open');
```

Calls `setActiveFilter` with "open".

### Line 239

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 240

```text
      modal.close();
```

Calls `modal.close` with no arguments.

### Line 241

```text
      editingJobId = null;
```

Assigns the result of null to editingJobId, updating this control or record for the next step.

### Line 242

```text
      renderJobs();
```

Calls `renderJobs` with no arguments.

### Line 243

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 244

```text
      console.error('Unable to save planned job:', error);
```

Calls `console.error` with "Unable to save planned job:"; `error` (error).

### Line 245

```text
      formError.textContent = error.message || 'This job could not be saved. Check your connection and try again.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 246

```text
    } finally {
```

Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.

### Line 247

```text
      submitButton.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 248

```text
      submitButton.textContent = editingJobId ? 'Save changes' : 'Save job';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 249

```text
    }
```

Closes try/catch error-handling construct. Control continues after this block.

### Line 250

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 251

```text

```

Blank line separates related code sections for readability.

### Line 252

```text
  function closeModal() {
```

Defines `closeModal` (close modal), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 253

```text
    editingJobId = null;
```

Assigns the result of null to editingJobId, updating this control or record for the next step.

### Line 254

```text
    form.reset();
```

Calls `form.reset` with no arguments.

### Line 255

```text
    formError.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 256

```text
    modal.close();
```

Calls `modal.close` with no arguments.

### Line 257

```text
  }
```

Closes function closeModal. Control continues after this block.

### Line 258

```text

```

Blank line separates related code sections for readability.

### Line 259

```text
  document.getElementById('modal-cancel-button').addEventListener('click', closeModal);
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 260

```text
  document.getElementById('modal-cancel-action').addEventListener('click', closeModal);
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 261

```text
  modal.addEventListener('click', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 262

```text
    if (event.target === modal) closeModal();
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 263

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 264

```text

```

Blank line separates related code sections for readability.

### Line 265

```text
  plannedList.addEventListener('click', async event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 266

```text
    const button = event.target.closest('button[data-action]');
```

Calls `event.target.closest` with "button[data-action]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 267

```text
    if (!button) return;
```

Returns no value to the caller and exits this function.

### Line 268

```text
    const job = store.plannedJobs.find(candidate => candidate.id === button.dataset.id);
```

Returns the first item of `store.plannedJobs` (the planned jobs property of store) matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `button.dataset.id` (the id property of button.dataset) have the same value and type, or undefined; stores the result in `job`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 269

```text
    if (!job) return;
```

Returns no value to the caller and exits this function.

### Line 270

```text

```

Blank line separates related code sections for readability.

### Line 271

```text
    if (button.dataset.action === 'edit') {
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 272

```text
      openJobModal(job);
```

Calls `openJobModal` with `job` (job).

### Line 273

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 274

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 275

```text

```

Blank line separates related code sections for readability.

### Line 276

```text
    if (button.dataset.action === 'toggle-complete') {
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 277

```text
      button.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 278

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 279

```text
        await store.setPlannedComplete(job.id, !job.isComplete);
```

Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.

### Line 280

```text
        renderJobs();
```

Calls `renderJobs` with no arguments.

### Line 281

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 282

```text
        console.error('Unable to update planned job:', error);
```

Calls `console.error` with "Unable to update planned job:"; `error` (error).

### Line 283

```text
        button.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 284

```text
        window.alert('This job could not be updated. Please try again.');
```

Shows a plain-language validation or failure message to the user.

### Line 285

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 286

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 287

```text

```

Blank line separates related code sections for readability.

### Line 288

```text
    if (button.dataset.action === 'delete') {
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 289

```text
      const label = job.description || 'this planned job';
```

Uses `job.description` (the description property of job) when it is truthy, otherwise falls back to "this planned job"; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 290

```text
      if (!window.confirm(`Remove “${label}” from the schedule?`)) return;
```

Asks the user to confirm this destructive or irreversible action before continuing.

### Line 291

```text
      button.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 292

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 293

```text
        await store.deletePlanned(job.id);
```

Requests deletion from the shared store, then the caller redraws the relevant list.

### Line 294

```text
        renderJobs();
```

Calls `renderJobs` with no arguments.

### Line 295

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 296

```text
        console.error('Unable to remove planned job:', error);
```

Calls `console.error` with "Unable to remove planned job:"; `error` (error).

### Line 297

```text
        button.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 298

```text
        window.alert('This job could not be removed. Please try again.');
```

Shows a plain-language validation or failure message to the user.

### Line 299

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 300

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 301

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 302

```text

```

Blank line separates related code sections for readability.

### Line 303

```text
  renderJobs();
```

Calls `renderJobs` with no arguments.

### Line 304

```text
  watchPlannedDayChange(renderJobs);
```

Calls `watchPlannedDayChange` with `renderJobs` (render jobs).

### Line 305

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
