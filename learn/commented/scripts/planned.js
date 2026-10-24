// Original L1: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import {
// Original L2: Imports the shared collections and persistence methods for planned jobs.
  store,
// Original L3: Imports the planned-job model used when the user adds a schedule item.
  PlannedJob,
// Original L4: Imports the helper that fills the planned-job customer selector.
  populateCustomerDropdowns
// Original L5: Completes the named import list and tells the browser to resolve these shared helpers from ./models.js. Imported bindings refer to exports of that module.
} from './models.js';
// Original L6: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { asValidDate, plannedDateStatus } from './domain.mjs';
// Original L7: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { plannedJobUrgency, updatePlannedAlert, watchPlannedDayChange } from './planned-urgency.mjs';
// Original L8: Blank line separates related code sections for readability.

// Original L9: Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "long"; month: "long"; day: "numeric"; year: "numeric"; stores the result in `formatJobDate`. const prevents reassignment of this binding, not mutation inside its object/array.
const formatJobDate = new Intl.DateTimeFormat(undefined, {
// Original L10: Supplies this argument/value (weekday: 'long') to the surrounding constructor or DOM call.
  weekday: 'long',
// Original L11: Sets the date/time formatter option month, controlling which part of a displayed date or time is shown.
  month: 'long',
// Original L12: Sets the date/time formatter option day, controlling which part of a displayed date or time is shown.
  day: 'numeric',
// Original L13: Sets the date/time formatter option year, controlling which part of a displayed date or time is shown.
  year: 'numeric'
// Original L14: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
// Original L15: Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields month: "short"; stores the result in `formatMonth`. const prevents reassignment of this binding, not mutation inside its object/array.
const formatMonth = new Intl.DateTimeFormat(undefined, { month: 'short' });
// Original L16: Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "short"; stores the result in `formatWeekday`. const prevents reassignment of this binding, not mutation inside its object/array.
const formatWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
// Original L17: Blank line separates related code sections for readability.

// Original L18: Defines `asDate` (as date), a reusable function taking value. Its body runs when called, not when declared.
function asDate(value) {
// Original L19: Returns calls `asValidDate` with `value` (value) to the caller and exits this function.
  return asValidDate(value);
// Original L20: Closes function asDate. Control continues after this block.
}
// Original L21: Blank line separates related code sections for readability.

// Original L22: Defines `dateInputValue` (date input value), a reusable function taking date. Its body runs when called, not when declared.
function dateInputValue(date) {
// Original L23: Returns a text template that combines fixed text with computed values calls `date.getFullYear` with no arguments, adds padding "0" to the beginning of converts adds calls `date.getMonth` with no arguments and 1 (or joins them if a value is text) to text until it has length 2, adds padding "0" to the beginning of converts calls `date.getDate` with no arguments to text until it has length 2 to the caller and exits this function.
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
// Original L24: Closes function dateInputValue. Control continues after this block.
}
// Original L25: Blank line separates related code sections for readability.

// Original L26: Adds, removes, or selects CSS classes that control this element’s appearance/state.
function makeElement(tag, className, text) {
// Original L27: Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.
  const element = document.createElement(tag);
// Original L28: Adds, removes, or selects CSS classes that control this element’s appearance/state.
  if (className) element.className = className;
// Original L29: Writes user-visible text into the element; textContent avoids treating data as HTML.
  if (text !== undefined) element.textContent = text;
// Original L30: Returns `element` (element) to the caller and exits this function.
  return element;
// Original L31: Closes function makeElement. Control continues after this block.
}
// Original L32: Blank line separates related code sections for readability.

// Original L33: Waits until the page’s HTML exists before querying elements and wiring its controls.
document.addEventListener('DOMContentLoaded', async () => {
// Original L34: Finds the page element whose unique ID is "planned-list", or null if absent; stores the result in `plannedList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const plannedList = document.getElementById('planned-list');
// Original L35: Finds the page element whose unique ID is "add-button", or null if absent; stores the result in `addButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const addButton = document.getElementById('add-button');
// Original L36: Finds the page element whose unique ID is "add-modal", or null if absent; stores the result in `modal`. const prevents reassignment of this binding, not mutation inside its object/array.
  const modal = document.getElementById('add-modal');
// Original L37: Finds the page element whose unique ID is "add-form", or null if absent; stores the result in `form`. const prevents reassignment of this binding, not mutation inside its object/array.
  const form = document.getElementById('add-form');
// Original L38: Finds the page element whose unique ID is "planned-cust", or null if absent; stores the result in `customerSelect`. const prevents reassignment of this binding, not mutation inside its object/array.
  const customerSelect = document.getElementById('planned-cust');
// Original L39: Finds the page element whose unique ID is "planned-date", or null if absent; stores the result in `dateInput`. const prevents reassignment of this binding, not mutation inside its object/array.
  const dateInput = document.getElementById('planned-date');
// Original L40: Finds the page element whose unique ID is "planned-date-tbd", or null if absent; stores the result in `dateTbdCheckbox`. const prevents reassignment of this binding, not mutation inside its object/array.
  const dateTbdCheckbox = document.getElementById('planned-date-tbd');
// Original L41: Finds the page element whose unique ID is "planned-description", or null if absent; stores the result in `descriptionInput`. const prevents reassignment of this binding, not mutation inside its object/array.
  const descriptionInput = document.getElementById('planned-description');
// Original L42: Finds the page element whose unique ID is "planned-form-error", or null if absent; stores the result in `formError`. const prevents reassignment of this binding, not mutation inside its object/array.
  const formError = document.getElementById('planned-form-error');
// Original L43: Finds the page element whose unique ID is "customer-help", or null if absent; stores the result in `customerHelp`. const prevents reassignment of this binding, not mutation inside its object/array.
  const customerHelp = document.getElementById('customer-help');
// Original L44: Finds the page element whose unique ID is "modal-add-button", or null if absent; stores the result in `submitButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const submitButton = document.getElementById('modal-add-button');
// Original L45: Finds the page element whose unique ID is "add-job-title", or null if absent; stores the result in `modalTitle`. const prevents reassignment of this binding, not mutation inside its object/array.
  const modalTitle = document.getElementById('add-job-title');
// Original L46: Finds the first descendant of `modal` (modal) matching CSS selector ".eyebrow"; stores the result in `modalEyebrow`. const prevents reassignment of this binding, not mutation inside its object/array.
  const modalEyebrow = modal.querySelector('.eyebrow');
// Original L47: Finds the page element whose unique ID is "job-count", or null if absent; stores the result in `jobCount`. const prevents reassignment of this binding, not mutation inside its object/array.
  const jobCount = document.getElementById('job-count');
// Original L48: An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector ".filter-button"; stores the result in `filterButtons`. const prevents reassignment of this binding, not mutation inside its object/array.
  const filterButtons = [...document.querySelectorAll('.filter-button')];
// Original L49: "open"; stores the result in `activeFilter`. let allows the binding to be reassigned.
  let activeFilter = 'open';
// Original L50: Null; stores the result in `editingJobId`. let allows the binding to be reassigned.
  let editingJobId = null;
// Original L51: Blank line separates related code sections for readability.

// Original L52: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
  await store.init();
// Original L53: Calls `populateCustomerDropdowns` with `customerSelect` (customer select).
  populateCustomerDropdowns(customerSelect);
// Original L54: Blank line separates related code sections for readability.

// Original L55: Defines `sortedJobs` (sorted jobs), a reusable function taking no arguments. Its body runs when called, not when declared.
  function sortedJobs() {
// Original L56: Returns sorts an array containing the expanded entries/properties from `store.plannedJobs` (the planned jobs property of store) in place using comparison a callback taking a, b that runs its enclosed statements to the caller and exits this function.
    return [...store.plannedJobs].sort((a, b) => {
// Original L57: Returns subtracts converts `b.isComplete` (the is complete property of b) to a number (invalid numeric text becomes NaN) from converts `a.isComplete` (the is complete property of a) to a number (invalid numeric text becomes NaN) to the caller and exits this function.
      if (a.isComplete !== b.isComplete) return Number(a.isComplete) - Number(b.isComplete);
// Original L58: Uses gets calls `asDate` with `a.scheduledDate` (the scheduled date property of a) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateA`. const prevents reassignment of this binding, not mutation inside its object/array.
      const dateA = asDate(a.scheduledDate)?.getTime() ?? null;
// Original L59: Uses gets calls `asDate` with `b.scheduledDate` (the scheduled date property of b) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateB`. const prevents reassignment of this binding, not mutation inside its object/array.
      const dateB = asDate(b.scheduledDate)?.getTime() ?? null;
// Original L60: Returns 1 to the caller and exits this function.
      if (dateA === null && dateB !== null) return 1;
// Original L61: Returns changes the numeric sign of 1 to the caller and exits this function.
      if (dateA !== null && dateB === null) return -1;
// Original L62: Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.
      return (dateA ?? 0) - (dateB ?? 0);
// Original L63: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L64: Closes function sortedJobs. Control continues after this block.
  }
// Original L65: Blank line separates related code sections for readability.

// Original L66: Defines `updateSummary` (update summary), a reusable function taking no arguments. Its body runs when called, not when declared.
  function updateSummary() {
// Original L67: Keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that negates the truthiness of `job.isComplete` (the is complete property of job) returns truthy; stores the result in `openJobs`. const prevents reassignment of this binding, not mutation inside its object/array.
    const openJobs = store.plannedJobs.filter(job => !job.isComplete);
// Original L68: Keeps only items of `openJobs` (open jobs) for which a callback taking job that checks that calls `plannedDateStatus` with `job.scheduledDate` (the scheduled date property of job) and "due-today" have the same value and type returns truthy; stores the result in `dueToday`. const prevents reassignment of this binding, not mutation inside its object/array.
    const dueToday = openJobs.filter(job => plannedDateStatus(job.scheduledDate) === 'due-today');
// Original L69: Keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that `job.isComplete` (the is complete property of job) returns truthy; stores the result in `completedJobs`. const prevents reassignment of this binding, not mutation inside its object/array.
    const completedJobs = store.plannedJobs.filter(job => job.isComplete);
// Original L70: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('open-count').textContent = openJobs.length;
// Original L71: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('today-count').textContent = dueToday.length;
// Original L72: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('completed-count').textContent = completedJobs.length;
// Original L73: Sends the edited record fields to the store so the saved data matches the form.
    updatePlannedAlert(document.getElementById('planned-overdue-alert'), store.plannedJobs);
// Original L74: Closes function updateSummary. Control continues after this block.
  }
// Original L75: Blank line separates related code sections for readability.

// Original L76: Defines `createJobCard` (create job card), a reusable function taking job. Its body runs when called, not when declared.
  function createJobCard(job) {
// Original L77: Calls `plannedJobUrgency` with `job` (job); stores the result in `urgency`. const prevents reassignment of this binding, not mutation inside its object/array.
    const urgency = plannedJobUrgency(job);
// Original L78: Calls `makeElement` with "li"; a text template that combines fixed text with computed values `urgency.level` (the level property of urgency), checks `job.isComplete` (the is complete property of job); if true chooses " is-complete", otherwise ""; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.
    const item = makeElement('li', `job-card urgency-${urgency.level}${job.isComplete ? ' is-complete' : ''}`);
// Original L79: Calls `asDate` with `job.scheduledDate` (the scheduled date property of job); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.
    const date = asDate(job.scheduledDate);
// Original L80: Blank line separates related code sections for readability.

// Original L81: Calls `makeElement` with "div"; "date-tile"; stores the result in `dateTile`. const prevents reassignment of this binding, not mutation inside its object/array.
    const dateTile = makeElement('div', 'date-tile');
// Original L82: Places the newly built child elements into the document so the user can see them.
    dateTile.append(
// Original L83: Supplies this argument/value (makeElement('span', 'date-weekday', date ? formatWeekday.format(date) : '')) to the surrounding constructor or DOM call.
      makeElement('span', 'date-weekday', date ? formatWeekday.format(date) : ''),
// Original L84: Supplies this argument/value (makeElement('strong', 'date-day', date ? String(date.getDate()) : 'TBD')) to the surrounding constructor or DOM call.
      makeElement('strong', 'date-day', date ? String(date.getDate()) : 'TBD'),
// Original L85: Calls `makeElement` with "span"; "date-month"; checks `date` (date); if true chooses calls `formatMonth.format` with `date` (date), otherwise "".
      makeElement('span', 'date-month', date ? formatMonth.format(date) : '')
// Original L86: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
    );
// Original L87: Blank line separates related code sections for readability.

// Original L88: Calls `makeElement` with "div"; "job-content"; stores the result in `content`. const prevents reassignment of this binding, not mutation inside its object/array.
    const content = makeElement('div', 'job-content');
// Original L89: Calls `makeElement` with "div"; "job-title-row"; stores the result in `titleRow`. const prevents reassignment of this binding, not mutation inside its object/array.
    const titleRow = makeElement('div', 'job-title-row');
// Original L90: Places the newly built child elements into the document so the user can see them.
    titleRow.appendChild(makeElement('h3', 'job-description', job.description || 'Scheduled job'));
// Original L91: Blank line separates related code sections for readability.

// Original L92: Places the newly built child elements into the document so the user can see them.
    titleRow.appendChild(makeElement('span', 'status-pill urgency-label', urgency.label));
// Original L93: Blank line separates related code sections for readability.

// Original L94: Places the newly built child elements into the document so the user can see them.
    content.append(
// Original L95: Includes the named value titleRow in the surrounding import list or collection, making that app dependency available here.
      titleRow,
// Original L96: Supplies this argument/value (makeElement('p', 'job-customer', job.customer?.name || 'Customer not available')) to the surrounding constructor or DOM call.
      makeElement('p', 'job-customer', job.customer?.name || 'Customer not available'),
// Original L97: Calls `makeElement` with "p"; "job-date"; checks `date` (date); if true chooses calls `formatJobDate.format` with `date` (date), otherwise "Date TBD".
      makeElement('p', 'job-date', date ? formatJobDate.format(date) : 'Date TBD')
// Original L98: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
    );
// Original L99: Blank line separates related code sections for readability.

// Original L100: Calls `makeElement` with "div"; "job-actions"; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.
    const actions = makeElement('div', 'job-actions');
// Original L101: Calls `makeElement` with "button"; "button button-small button-secondary"; "Edit"; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.
    const editButton = makeElement('button', 'button button-small button-secondary', 'Edit');
// Original L102: Assigns the result of 'button' to editButton.type, updating this control or record for the next step.
    editButton.type = 'button';
// Original L103: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    editButton.dataset.action = 'edit';
// Original L104: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    editButton.dataset.id = job.id;
// Original L105: Sets accessibility metadata so assistive technology can understand the control and its current state.
    editButton.setAttribute('aria-label', `Edit ${job.description || 'scheduled job'}`);
// Original L106: Blank line separates related code sections for readability.

// Original L107: Calls `makeElement` with "button"; "button button-small button-primary"; checks `job.isComplete` (the is complete property of job); if true chooses "Reopen", otherwise "Complete"; stores the result in `completeButton`. const prevents reassignment of this binding, not mutation inside its object/array.
    const completeButton = makeElement('button', 'button button-small button-primary', job.isComplete ? 'Reopen' : 'Complete');
// Original L108: Assigns the result of 'button' to completeButton.type, updating this control or record for the next step.
    completeButton.type = 'button';
// Original L109: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    completeButton.dataset.action = 'toggle-complete';
// Original L110: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    completeButton.dataset.id = job.id;
// Original L111: Sets accessibility metadata so assistive technology can understand the control and its current state.
    completeButton.setAttribute('aria-label', `${job.isComplete ? 'Reopen' : 'Complete'} ${job.description || 'scheduled job'}`);
// Original L112: Blank line separates related code sections for readability.

// Original L113: Calls `makeElement` with "button"; "button button-small button-quiet"; "Remove"; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.
    const deleteButton = makeElement('button', 'button button-small button-quiet', 'Remove');
// Original L114: Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.
    deleteButton.type = 'button';
// Original L115: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    deleteButton.dataset.action = 'delete';
// Original L116: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    deleteButton.dataset.id = job.id;
// Original L117: Sets accessibility metadata so assistive technology can understand the control and its current state.
    deleteButton.setAttribute('aria-label', `Remove ${job.description || 'scheduled job'}`);
// Original L118: Places the newly built child elements into the document so the user can see them.
    actions.append(editButton, completeButton, deleteButton);
// Original L119: Places the newly built child elements into the document so the user can see them.
    item.append(dateTile, content, actions);
// Original L120: Returns `item` (item) to the caller and exits this function.
    return item;
// Original L121: Closes function createJobCard. Control continues after this block.
  }
// Original L122: Blank line separates related code sections for readability.

// Original L123: Defines `renderJobs` (render jobs), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderJobs() {
// Original L124: Comment: List updates must not strand keyboard users on the page body.
    // List updates must not strand keyboard users on the page body.
// Original L125: Checks calls `plannedList.contains` with `document.activeElement` (the active element property of document); if true chooses `document.activeElement` (the active element property of document), otherwise null; stores the result in `focusedButton`. const prevents reassignment of this binding, not mutation inside its object/array.
    const focusedButton = plannedList.contains(document.activeElement) ? document.activeElement : null;
// Original L126: `focusedButton?.dataset.id` (the id property of focusedButton?.dataset); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `focusedId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const focusedId = focusedButton?.dataset.id;
// Original L127: `focusedButton?.dataset.action` (the action property of focusedButton?.dataset); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `focusedAction`. const prevents reassignment of this binding, not mutation inside its object/array.
    const focusedAction = focusedButton?.dataset.action;
// Original L128: Calls `updateSummary` with no arguments.
    updateSummary();
// Original L129: Keeps only items of calls `sortedJobs` with no arguments for which a callback taking job that runs its enclosed statements returns truthy; stores the result in `visibleJobs`. const prevents reassignment of this binding, not mutation inside its object/array.
    const visibleJobs = sortedJobs().filter(job => {
// Original L130: Returns negates the truthiness of `job.isComplete` (the is complete property of job) to the caller and exits this function.
      if (activeFilter === 'open') return !job.isComplete;
// Original L131: Returns `job.isComplete` (the is complete property of job) to the caller and exits this function.
      if (activeFilter === 'completed') return job.isComplete;
// Original L132: Returns true to the caller and exits this function.
      return true;
// Original L133: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L134: Blank line separates related code sections for readability.

// Original L135: Clears stale rendered children before drawing the current data set.
    plannedList.replaceChildren();
// Original L136: Writes user-visible text into the element; textContent avoids treating data as HTML.
    jobCount.textContent = `${visibleJobs.length} ${visibleJobs.length === 1 ? 'job' : 'jobs'}`;
// Original L137: Blank line separates related code sections for readability.

// Original L138: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (visibleJobs.length === 0) {
// Original L139: Calls `makeElement` with "li"; "empty-state"; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.
      const empty = makeElement('li', 'empty-state');
// Original L140: Calls `makeElement` with "span"; "empty-state-icon"; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "✓", otherwise "＋"; stores the result in `icon`. const prevents reassignment of this binding, not mutation inside its object/array.
      const icon = makeElement('span', 'empty-state-icon', activeFilter === 'completed' ? '✓' : '＋');
// Original L141: Sets accessibility metadata so assistive technology can understand the control and its current state.
      icon.setAttribute('aria-hidden', 'true');
// Original L142: Calls `makeElement` with "h3"; ""; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "Nothing completed yet", otherwise "Your schedule is clear"; stores the result in `heading`. const prevents reassignment of this binding, not mutation inside its object/array.
      const heading = makeElement('h3', '', activeFilter === 'completed' ? 'Nothing completed yet' : 'Your schedule is clear');
// Original L143: Calls `makeElement` with "p"; ""; checks checks that `activeFilter` (active filter) and "completed" have the same value and type; if true chooses "Jobs you complete will show up here.", otherwise "Add a planned job to keep upcoming work in view."; stores the result in `message`. const prevents reassignment of this binding, not mutation inside its object/array.
      const message = makeElement('p', '', activeFilter === 'completed'
// Original L144: Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.
        ? 'Jobs you complete will show up here.'
// Original L145: Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.
        : 'Add a planned job to keep upcoming work in view.');
// Original L146: Places the newly built child elements into the document so the user can see them.
      empty.append(icon, heading, message);
// Original L147: Places the newly built child elements into the document so the user can see them.
      plannedList.appendChild(empty);
// Original L148: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      if (focusedId) filterButtons.find(button => button.dataset.filter === activeFilter)?.focus({ preventScroll: true });
// Original L149: Returns no value to the caller and exits this function.
      return;
// Original L150: Closes conditional branch. Control continues after this block.
    }
// Original L151: Blank line separates related code sections for readability.

// Original L152: Places the newly built child elements into the document so the user can see them.
    visibleJobs.forEach(job => plannedList.appendChild(createJobCard(job)));
// Original L153: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (focusedId) {
// Original L154: Returns the first item of an array containing the expanded entries/properties from finds all descendants of `plannedList` (planned list) matching CSS selector "button[data-action]" matching a callback taking button that uses checks that `button.dataset.action` (the action property of button.dataset) and `focusedAction` (focused action) have the same value and type only if checks that `button.dataset.id` (the id property of button.dataset) and `focusedId` (focused id) have the same value and type is truthy; otherwise keeps the falsy first value, or undefined; stores the result in `replacement`. const prevents reassignment of this binding, not mutation inside its object/array.
      const replacement = [...plannedList.querySelectorAll('button[data-action]')]
// Original L155: Stores an identifier/state in a data attribute so a later click handler can find the related record.
        .find(button => button.dataset.id === focusedId && button.dataset.action === focusedAction);
// Original L156: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      (replacement || filterButtons.find(button => button.dataset.filter === activeFilter))?.focus({ preventScroll: true });
// Original L157: Closes conditional branch. Control continues after this block.
    }
// Original L158: Closes function renderJobs. Control continues after this block.
  }
// Original L159: Blank line separates related code sections for readability.

// Original L160: Defines `setActiveFilter` (set active filter), a reusable function taking filter. Its body runs when called, not when declared.
  function setActiveFilter(filter) {
// Original L161: Assigns the result of filter to activeFilter, updating this control or record for the next step.
    activeFilter = filter;
// Original L162: Defines an inline callback that handles each item or event in the surrounding operation.
    filterButtons.forEach(button => {
// Original L163: Checks that `button.dataset.filter` (the filter property of button.dataset) and `activeFilter` (active filter) have the same value and type; stores the result in `selected`. const prevents reassignment of this binding, not mutation inside its object/array.
      const selected = button.dataset.filter === activeFilter;
// Original L164: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      button.classList.toggle('is-active', selected);
// Original L165: Sets accessibility metadata so assistive technology can understand the control and its current state.
      button.setAttribute('aria-pressed', String(selected));
// Original L166: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L167: Closes function setActiveFilter. Control continues after this block.
  }
// Original L168: Blank line separates related code sections for readability.

// Original L169: Defines an inline callback that handles each item or event in the surrounding operation.
  filterButtons.forEach(button => {
// Original L170: Registers a handler so a user action or browser event triggers the page behavior described here.
    button.addEventListener('click', () => {
// Original L171: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      setActiveFilter(button.dataset.filter);
// Original L172: Calls `renderJobs` with no arguments.
      renderJobs();
// Original L173: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L174: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L175: Blank line separates related code sections for readability.

// Original L176: Defines `openJobModal` (open job modal), a reusable function taking job = null. Its body runs when called, not when declared.
  function openJobModal(job = null) {
// Original L177: Calls `form.reset` with no arguments.
    form.reset();
// Original L178: Writes user-visible text into the element; textContent avoids treating data as HTML.
    formError.textContent = '';
// Original L179: Assigns the result of job?.id || null to editingJobId, updating this control or record for the next step.
    editingJobId = job?.id || null;
// Original L180: Constructs a new instance of `Date` with no arguments; stores the result in `today`. const prevents reassignment of this binding, not mutation inside its object/array.
    const today = new Date();
// Original L181: Assigns the result of Boolean(job && !asDate(job.scheduledDate)) to dateTbdCheckbox.checked, updating this control or record for the next step.
    dateTbdCheckbox.checked = Boolean(job && !asDate(job.scheduledDate));
// Original L182: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    dateInput.disabled = dateTbdCheckbox.checked;
// Original L183: Assigns the result of !dateTbdCheckbox.checked to dateInput.required, updating this control or record for the next step.
    dateInput.required = !dateTbdCheckbox.checked;
// Original L184: Assigns the result of job ? (asDate(job.scheduledDate) ? dateInputValue(asDate(job.scheduledDate)) : '') : dateInputValue(today) to dateInput.value, updating this control or record for the next step.
    dateInput.value = job ? (asDate(job.scheduledDate) ? dateInputValue(asDate(job.scheduledDate)) : '') : dateInputValue(today);
// Original L185: Assigns the result of job?.customer?.id || '' to customerSelect.value, updating this control or record for the next step.
    customerSelect.value = job?.customer?.id || '';
// Original L186: Assigns the result of job?.description || '' to descriptionInput.value, updating this control or record for the next step.
    descriptionInput.value = job?.description || '';
// Original L187: Writes user-visible text into the element; textContent avoids treating data as HTML.
    modalTitle.textContent = job ? 'Edit planned job' : 'Plan a job';
// Original L188: Writes user-visible text into the element; textContent avoids treating data as HTML.
    modalEyebrow.textContent = job ? 'UPDATE SCHEDULE ITEM' : 'NEW SCHEDULE ITEM';
// Original L189: Writes user-visible text into the element; textContent avoids treating data as HTML.
    submitButton.textContent = job ? 'Save changes' : 'Save job';
// Original L190: Checks whether `store.customers.size` (the size property of store.customers) is greater than 0; stores the result in `hasCustomers`. const prevents reassignment of this binding, not mutation inside its object/array.
    const hasCustomers = store.customers.size > 0;
// Original L191: Writes user-visible text into the element; textContent avoids treating data as HTML.
    customerHelp.textContent = hasCustomers ? '' : 'Add a customer in People Data before planning a job.';
// Original L192: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    submitButton.disabled = !hasCustomers;
// Original L193: Calls `modal.showModal` with no arguments.
    modal.showModal();
// Original L194: Closes function openJobModal. Control continues after this block.
  }
// Original L195: Blank line separates related code sections for readability.

// Original L196: Registers a handler so a user action or browser event triggers the page behavior described here.
  addButton.addEventListener('click', () => openJobModal());
// Original L197: Blank line separates related code sections for readability.

// Original L198: Registers a handler so a user action or browser event triggers the page behavior described here.
  dateTbdCheckbox.addEventListener('change', () => {
// Original L199: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    dateInput.disabled = dateTbdCheckbox.checked;
// Original L200: Assigns the result of !dateTbdCheckbox.checked to dateInput.required, updating this control or record for the next step.
    dateInput.required = !dateTbdCheckbox.checked;
// Original L201: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (dateTbdCheckbox.checked) dateInput.value = '';
// Original L202: Handles the alternative branch when the preceding condition is false.
    else if (!dateInput.value) dateInput.value = dateInputValue(new Date());
// Original L203: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L204: Blank line separates related code sections for readability.

// Original L205: Registers a handler so a user action or browser event triggers the page behavior described here.
  form.addEventListener('submit', async event => {
// Original L206: Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.
    event.preventDefault();
// Original L207: Writes user-visible text into the element; textContent avoids treating data as HTML.
    formError.textContent = '';
// Original L208: Calls `store.customers.get` with `customerSelect.value` (the value property of customerSelect); stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.
    const customer = store.customers.get(customerSelect.value);
// Original L209: Removes leading and trailing whitespace from `descriptionInput.value` (the value property of descriptionInput); stores the result in `description`. const prevents reassignment of this binding, not mutation inside its object/array.
    const description = descriptionInput.value.trim();
// Original L210: `dateInput.value` (the value property of dateInput); stores the result in `dateValue`. const prevents reassignment of this binding, not mutation inside its object/array.
    const dateValue = dateInput.value;
// Original L211: Blank line separates related code sections for readability.

// Original L212: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!customer) {
// Original L213: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Choose a customer before saving this job.';
// Original L214: Returns no value to the caller and exits this function.
      return;
// Original L215: Closes conditional branch. Control continues after this block.
    }
// Original L216: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if ((!dateValue && !dateTbdCheckbox.checked) || !description) {
// Original L217: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = 'Choose a planned date or mark it TBD, and add a job description.';
// Original L218: Returns no value to the caller and exits this function.
      return;
// Original L219: Closes conditional branch. Control continues after this block.
    }
// Original L220: Blank line separates related code sections for readability.

// Original L221: Stores the noon-local calendar date saved for a planned job.
    let scheduledDate = null;
// Original L222: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (dateValue && !dateTbdCheckbox.checked) {
// Original L223: Transforms each selected value into the representation needed by the next UI or data operation.
      const [year, month, day] = dateValue.split('-').map(Number);
// Original L224: Converts the stored or entered date/time into a Date object for display or arithmetic.
      scheduledDate = new Date(year, month - 1, day, 12, 0, 0, 0);
// Original L225: Closes conditional branch. Control continues after this block.
    }
// Original L226: Converts `editingJobId` (editing job id) to true or false according to truthiness; stores the result in `wasEditing`. const prevents reassignment of this binding, not mutation inside its object/array.
    const wasEditing = Boolean(editingJobId);
// Original L227: `editingJobId` (editing job id); stores the result in `targetJobId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const targetJobId = editingJobId;
// Original L228: Blank line separates related code sections for readability.

// Original L229: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    submitButton.disabled = true;
// Original L230: Writes user-visible text into the element; textContent avoids treating data as HTML.
    submitButton.textContent = 'Saving…';
// Original L231: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L232: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (wasEditing) {
// Original L233: Sends the edited record fields to the store so the saved data matches the form.
        await store.updatePlanned(targetJobId, description, scheduledDate, customer);
// Original L234: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
      } else {
// Original L235: Constructs a new instance of `PlannedJob` with `description` (description); `scheduledDate` (scheduled date); `customer` (customer); stores the result in `newJob`. const prevents reassignment of this binding, not mutation inside its object/array.
        const newJob = new PlannedJob(description, scheduledDate, customer);
// Original L236: Persists the newly planned job through the shared store.
        await store.savePlanned(newJob);
// Original L237: Appends `newJob` (new job) to `store.plannedJobs` (the planned jobs property of store).
        store.plannedJobs.push(newJob);
// Original L238: Calls `setActiveFilter` with "open".
        setActiveFilter('open');
// Original L239: Closes conditional branch. Control continues after this block.
      }
// Original L240: Calls `modal.close` with no arguments.
      modal.close();
// Original L241: Assigns the result of null to editingJobId, updating this control or record for the next step.
      editingJobId = null;
// Original L242: Calls `renderJobs` with no arguments.
      renderJobs();
// Original L243: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L244: Calls `console.error` with "Unable to save planned job:"; `error` (error).
      console.error('Unable to save planned job:', error);
// Original L245: Writes user-visible text into the element; textContent avoids treating data as HTML.
      formError.textContent = error.message || 'This job could not be saved. Check your connection and try again.';
// Original L246: Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.
    } finally {
// Original L247: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      submitButton.disabled = false;
// Original L248: Writes user-visible text into the element; textContent avoids treating data as HTML.
      submitButton.textContent = editingJobId ? 'Save changes' : 'Save job';
// Original L249: Closes try/catch error-handling construct. Control continues after this block.
    }
// Original L250: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L251: Blank line separates related code sections for readability.

// Original L252: Defines `closeModal` (close modal), a reusable function taking no arguments. Its body runs when called, not when declared.
  function closeModal() {
// Original L253: Assigns the result of null to editingJobId, updating this control or record for the next step.
    editingJobId = null;
// Original L254: Calls `form.reset` with no arguments.
    form.reset();
// Original L255: Writes user-visible text into the element; textContent avoids treating data as HTML.
    formError.textContent = '';
// Original L256: Calls `modal.close` with no arguments.
    modal.close();
// Original L257: Closes function closeModal. Control continues after this block.
  }
// Original L258: Blank line separates related code sections for readability.

// Original L259: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
  document.getElementById('modal-cancel-button').addEventListener('click', closeModal);
// Original L260: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
  document.getElementById('modal-cancel-action').addEventListener('click', closeModal);
// Original L261: Registers a handler so a user action or browser event triggers the page behavior described here.
  modal.addEventListener('click', event => {
// Original L262: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (event.target === modal) closeModal();
// Original L263: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L264: Blank line separates related code sections for readability.

// Original L265: Registers a handler so a user action or browser event triggers the page behavior described here.
  plannedList.addEventListener('click', async event => {
// Original L266: Calls `event.target.closest` with "button[data-action]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
    const button = event.target.closest('button[data-action]');
// Original L267: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L268: Returns the first item of `store.plannedJobs` (the planned jobs property of store) matching a callback taking candidate that checks that `candidate.id` (the id property of candidate) and `button.dataset.id` (the id property of button.dataset) have the same value and type, or undefined; stores the result in `job`. const prevents reassignment of this binding, not mutation inside its object/array.
    const job = store.plannedJobs.find(candidate => candidate.id === button.dataset.id);
// Original L269: Returns no value to the caller and exits this function.
    if (!job) return;
// Original L270: Blank line separates related code sections for readability.

// Original L271: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    if (button.dataset.action === 'edit') {
// Original L272: Calls `openJobModal` with `job` (job).
      openJobModal(job);
// Original L273: Returns no value to the caller and exits this function.
      return;
// Original L274: Closes conditional branch. Control continues after this block.
    }
// Original L275: Blank line separates related code sections for readability.

// Original L276: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    if (button.dataset.action === 'toggle-complete') {
// Original L277: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      button.disabled = true;
// Original L278: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L279: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
        await store.setPlannedComplete(job.id, !job.isComplete);
// Original L280: Calls `renderJobs` with no arguments.
        renderJobs();
// Original L281: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L282: Calls `console.error` with "Unable to update planned job:"; `error` (error).
        console.error('Unable to update planned job:', error);
// Original L283: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        button.disabled = false;
// Original L284: Shows a plain-language validation or failure message to the user.
        window.alert('This job could not be updated. Please try again.');
// Original L285: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L286: Closes conditional branch. Control continues after this block.
    }
// Original L287: Blank line separates related code sections for readability.

// Original L288: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    if (button.dataset.action === 'delete') {
// Original L289: Uses `job.description` (the description property of job) when it is truthy, otherwise falls back to "this planned job"; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.
      const label = job.description || 'this planned job';
// Original L290: Asks the user to confirm this destructive or irreversible action before continuing.
      if (!window.confirm(`Remove “${label}” from the schedule?`)) return;
// Original L291: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      button.disabled = true;
// Original L292: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L293: Requests deletion from the shared store, then the caller redraws the relevant list.
        await store.deletePlanned(job.id);
// Original L294: Calls `renderJobs` with no arguments.
        renderJobs();
// Original L295: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L296: Calls `console.error` with "Unable to remove planned job:"; `error` (error).
        console.error('Unable to remove planned job:', error);
// Original L297: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        button.disabled = false;
// Original L298: Shows a plain-language validation or failure message to the user.
        window.alert('This job could not be removed. Please try again.');
// Original L299: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L300: Closes conditional branch. Control continues after this block.
    }
// Original L301: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L302: Blank line separates related code sections for readability.

// Original L303: Calls `renderJobs` with no arguments.
  renderJobs();
// Original L304: Calls `watchPlannedDayChange` with `renderJobs` (render jobs).
  watchPlannedDayChange(renderJobs);
// Original L305: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
