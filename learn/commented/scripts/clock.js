// Original L1: Blank line separates related code sections for readability.

// Original L2: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { 
// Original L3: Imports the shared store that holds employees, customers, and shifts.
  store, 
// Original L4: Imports the shift class used to create a new employee/customer time record.
  WorkShift, 
// Original L5: Rounds the clock-in timestamp to the app’s 15-minute billing/timekeeping grid.
  roundTo15Minutes,
// Original L6: Imports the helper that fills the employee selector from store data.
  populateEmployeeDropdowns, 
// Original L7: Imports the helper that fills the customer/job-site selector from store data.
  populateCustomerDropdowns 
// Original L8: Completes the named import list and tells the browser to resolve these shared helpers from ./models.js. Imported bindings refer to exports of that module.
} from './models.js';
// Original L9: Blank line separates related code sections for readability.

// Original L10: Defines formatBreakDuration, a helper that turns a break length in milliseconds into readable HH:MM:SS text. It runs when another part of the clock page calls it.
function formatBreakDuration(milliseconds) {
// Original L11: Divides milliseconds by 1,000 to get seconds, rounds down to discard a partial second, then uses Math.max(0, ...) to stop negative durations. The result is stored as totalSeconds.
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
// Original L12: Divides totalSeconds by 3,600 (seconds in one hour), then rounds down to count only complete hours.
  const hours = Math.floor(totalSeconds / 3600);
// Original L13: The % 3,600 remainder removes complete hours. Dividing that remainder by 60 and rounding down gives the remaining whole minutes, from 0 to 59.
  const minutes = Math.floor((totalSeconds % 3600) / 60);
// Original L14: The % 60 remainder removes all complete minutes, leaving the seconds part from 0 to 59.
  const seconds = totalSeconds % 60;
// Original L15: Builds [hours, minutes, seconds], converts each number to text with String, pads it to two digits with a leading 0, then joins the three parts with colons. For 3,661 seconds this returns 01:01:01.
  return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
// Original L16: Closes function formatBreakDuration. Control continues after this block.
}
// Original L17: Blank line separates related code sections for readability.

// Original L18: Adds, removes, or selects CSS classes that control this element’s appearance/state.
function makeElement(tag, className = '', text = undefined) {
// Original L19: Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.
  const element = document.createElement(tag);
// Original L20: Adds, removes, or selects CSS classes that control this element’s appearance/state.
  if (className) element.className = className;
// Original L21: Writes user-visible text into the element; textContent avoids treating data as HTML.
  if (text !== undefined) element.textContent = text;
// Original L22: Returns `element` (element) to the caller and exits this function.
  return element;
// Original L23: Closes function makeElement. Control continues after this block.
}
// Original L24: Blank line separates related code sections for readability.

// Original L25: Comment/documentation describing the following UI controller code.
// Original L26: Section title inside an author comment: DOM CONTROLLER. It organizes the source for readers and has no runtime effect.
// Original L27: Comment/documentation describing the following UI controller code.
/*
  DOM CONTROLLER
*/
// Original L28: Blank line separates related code sections for readability.

// Original L29: Waits until the page’s HTML exists before querying elements and wiring its controls.
document.addEventListener('DOMContentLoaded', async () => {
// Original L30: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
  await store.init();
// Original L31: Blank line separates related code sections for readability.
  
// Original L32: Finds the page element whose unique ID is "emp-select", or null if absent; stores the result in `eDd`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eDd = document.getElementById('emp-select');
// Original L33: Finds the page element whose unique ID is "cust-select", or null if absent; stores the result in `cDd`. const prevents reassignment of this binding, not mutation inside its object/array.
  const cDd = document.getElementById('cust-select');
// Original L34: Finds the page element whose unique ID is "clock-in-button", or null if absent; stores the result in `clockInButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const clockInButton = document.getElementById('clock-in-button');
// Original L35: Finds the page element whose unique ID is "activeShiftsList", or null if absent; stores the result in `activeShiftsList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeShiftsList = document.getElementById('activeShiftsList');
// Original L36: Finds the page element whose unique ID is "shift-error", or null if absent; stores the result in `shiftError`. const prevents reassignment of this binding, not mutation inside its object/array.
  const shiftError = document.getElementById('shift-error');
// Original L37: Blank line separates related code sections for readability.

// Original L38: Defines `updateBreakTimers` (update break timers), a reusable function taking no arguments. Its body runs when called, not when declared.
  function updateBreakTimers() {
// Original L39: Stores the current time used for live elapsed durations.
    const now = Date.now();
// Original L40: Finds matching DOM elements used by this page’s navigation, list, or form UI.
    activeShiftsList.querySelectorAll('.break-timer').forEach(timer => {
// Original L41: Converts `timer.dataset.startedAt` (the started at property of timer.dataset) to a number (invalid numeric text becomes NaN); stores the result in `startedAt`. const prevents reassignment of this binding, not mutation inside its object/array.
      const startedAt = Number(timer.dataset.startedAt);
// Original L42: Validates that the converted value is a real finite number before using it in calculations or saving.
      if (!Number.isFinite(startedAt)) return;
// Original L43: Writes user-visible text into the element; textContent avoids treating data as HTML.
      timer.textContent = `Break ${formatBreakDuration(now - startedAt)}`;
// Original L44: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L45: Closes function updateBreakTimers. Control continues after this block.
  }
// Original L46: Blank line separates related code sections for readability.

// Original L47: Defines `renderActiveShifts` (render active shifts), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderActiveShifts() {
// Original L48: Returns no value to the caller and exits this function.
    if (!activeShiftsList) return;
// Original L49: Stores unfinished shifts currently shown on the clock page.
    const activeShifts = store.shifts.filter(s => !s.isComplete);
// Original L50: Blank line separates related code sections for readability.

// Original L51: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (activeShifts.length === 0) {
// Original L52: Clears stale rendered children before drawing the current data set.
      activeShiftsList.replaceChildren(makeElement('li', 'empty-msg', 'No active shifts right now.'));
// Original L53: Returns no value to the caller and exits this function.
      return;
// Original L54: Closes conditional branch. Control continues after this block.
    }
// Original L55: Clears stale rendered children before drawing the current data set.
    activeShiftsList.replaceChildren();
// Original L56: Blank line separates related code sections for readability.

// Original L57: Defines an inline callback that handles each item or event in the surrounding operation.
    activeShifts.forEach((shift) => {
// Original L58: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `li`. const prevents reassignment of this binding, not mutation inside its object/array.
      const li = document.createElement('li');
// Original L59: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      li.className = 'shift-card';
// Original L60: Checks `shift.clockInTime` (the clock in time property of shift); if true chooses calls `shift.clockInTime.toLocaleTimeString` with an array containing ; an object with fields hour: "2-digit"; minute: "2-digit", otherwise "Unknown"; stores the result in `timeStr`. const prevents reassignment of this binding, not mutation inside its object/array.
      const timeStr = shift.clockInTime ? shift.clockInTime.toLocaleTimeString([], {
// Original L61: Sets the date/time formatter option hour, controlling which part of a displayed date or time is shown.
        hour: '2-digit',
// Original L62: Sets the date/time formatter option minute, controlling which part of a displayed date or time is shown.
        minute: '2-digit'
// Original L63: Closes the preceding callback/expression. The remainder of this line selects or returns the fallback value shown after the closing punctuation.
      }) : 'Unknown';
// Original L64: Returns the first item of `shift.breaks` (the breaks property of shift) matching a callback taking breakItem that uses negates the truthiness of `breakItem.end` (the end property of breakItem) only if `breakItem.start` (the start property of breakItem) is truthy; otherwise keeps the falsy first value, or undefined; stores the result in `activeBreak`. const prevents reassignment of this binding, not mutation inside its object/array.
      const activeBreak = shift.breaks.find(breakItem => breakItem.start && !breakItem.end);
// Original L65: Checks `activeBreak` (active break); if true chooses gets constructs a new instance of `Date` with `activeBreak.start` (the start property of activeBreak) as milliseconds since 1970-01-01 UTC, otherwise `NaN` (na n); stores the result in `breakStartedAt`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakStartedAt = activeBreak ? new Date(activeBreak.start).getTime() : NaN;
// Original L66: Calls `makeElement` with "div"; "active-card"; stores the result in `card`. const prevents reassignment of this binding, not mutation inside its object/array.
      const card = makeElement('div', 'active-card');
// Original L67: Calls `makeElement` with "div"; "active-info"; stores the result in `info`. const prevents reassignment of this binding, not mutation inside its object/array.
      const info = makeElement('div', 'active-info');
// Original L68: Places the newly built child elements into the document so the user can see them.
      info.append(
// Original L69: Supplies this argument/value (makeElement('strong', '', shift.employee?.name || 'Unknown')) to the surrounding constructor or DOM call.
        makeElement('strong', '', shift.employee?.name || 'Unknown'),
// Original L70: Supplies this argument/value (makeElement('span', '', ` @ ${shift.customer?.name || 'Unknown'}`)) to the surrounding constructor or DOM call.
        makeElement('span', '', ` @ ${shift.customer?.name || 'Unknown'}`),
// Original L71: Creates a DOM element in memory so the script can build this piece of the rendered interface.
        document.createElement('br'),
// Original L72: Calls `makeElement` with "small"; ""; a text template that combines fixed text with computed values `timeStr` (time str).
        makeElement('small', '', `Started: ${timeStr}`)
// Original L73: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
      );
// Original L74: Places the newly built child elements into the document so the user can see them.
      card.appendChild(info);
// Original L75: Validates that the converted value is a real finite number before using it in calculations or saving.
      if (shift.isOnBreak && Number.isFinite(breakStartedAt)) {
// Original L76: Calls `makeElement` with "span"; "break-timer"; a text template that combines fixed text with computed values calls `formatBreakDuration` with subtracts `breakStartedAt` (break started at) from reads the current time as milliseconds since 1970-01-01 UTC; stores the result in `breakTimer`. const prevents reassignment of this binding, not mutation inside its object/array.
        const breakTimer = makeElement('span', 'break-timer', `Break ${formatBreakDuration(Date.now() - breakStartedAt)}`);
// Original L77: Sets accessibility metadata so assistive technology can understand the control and its current state.
        breakTimer.setAttribute('role', 'timer');
// Original L78: Sets accessibility metadata so assistive technology can understand the control and its current state.
        breakTimer.setAttribute('aria-label', 'Break duration');
// Original L79: Stores an identifier/state in a data attribute so a later click handler can find the related record.
        breakTimer.dataset.startedAt = String(breakStartedAt);
// Original L80: Places the newly built child elements into the document so the user can see them.
        card.appendChild(breakTimer);
// Original L81: Closes conditional branch. Control continues after this block.
      }
// Original L82: Calls `makeElement` with "div"; "break-buttons"; stores the result in `breakButtons`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakButtons = makeElement('div', 'break-buttons');
// Original L83: Calls `makeElement` with "button"; "start-break-btn"; "Start Break"; stores the result in `breakInBtn`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakInBtn = makeElement('button', 'start-break-btn', 'Start Break');
// Original L84: Assigns the result of 'button' to breakInBtn.type, updating this control or record for the next step.
      breakInBtn.type = 'button';
// Original L85: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      breakInBtn.dataset.id = shift.id;
// Original L86: Calls `makeElement` with "button"; "stop-break-btn"; "Stop Break"; stores the result in `breakOutBtn`. const prevents reassignment of this binding, not mutation inside its object/array.
      const breakOutBtn = makeElement('button', 'stop-break-btn', 'Stop Break');
// Original L87: Assigns the result of 'button' to breakOutBtn.type, updating this control or record for the next step.
      breakOutBtn.type = 'button';
// Original L88: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      breakOutBtn.dataset.id = shift.id;
// Original L89: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      breakOutBtn.disabled = true;
// Original L90: Places the newly built child elements into the document so the user can see them.
      breakButtons.append(breakInBtn, breakOutBtn);
// Original L91: Calls `makeElement` with "button"; "stop-btn"; "Clock Out"; stores the result in `clockOutButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const clockOutButton = makeElement('button', 'stop-btn', 'Clock Out');
// Original L92: Assigns the result of 'button' to clockOutButton.type, updating this control or record for the next step.
      clockOutButton.type = 'button';
// Original L93: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      clockOutButton.dataset.id = shift.id;
// Original L94: Places the newly built child elements into the document so the user can see them.
      card.append(breakButtons, clockOutButton);
// Original L95: Places the newly built child elements into the document so the user can see them.
      li.appendChild(card);
// Original L96: Blank line separates related code sections for readability.
      
// Original L97: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (shift.isOnBreak) {
// Original L98: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        breakInBtn.disabled = true;
// Original L99: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        breakOutBtn.disabled = false;
// Original L100: Adds, removes, or selects CSS classes that control this element’s appearance/state.
        li.classList.add('on-break');
// Original L101: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
      } else {
// Original L102: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        breakInBtn.disabled = false;
// Original L103: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        breakOutBtn.disabled = true;
// Original L104: Adds, removes, or selects CSS classes that control this element’s appearance/state.
        li.classList.remove('on-break');
// Original L105: Closes conditional branch. Control continues after this block.
      }
// Original L106: Places the newly built child elements into the document so the user can see them.
      activeShiftsList.appendChild(li);
// Original L107: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L108: Closes function renderActiveShifts. Control continues after this block.
  }
// Original L109: Blank line separates related code sections for readability.
  
// Original L110: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (eDd || cDd) {
// Original L111: Calls `populateEmployeeDropdowns` with `eDd` (e dd).
    populateEmployeeDropdowns(eDd);
// Original L112: Calls `populateCustomerDropdowns` with `cDd` (c dd).
    populateCustomerDropdowns(cDd);
// Original L113: Closes conditional branch. Control continues after this block.
  }
// Original L114: Blank line separates related code sections for readability.
  
// Original L115: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (clockInButton) {
// Original L116: Registers a handler so a user action or browser event triggers the page behavior described here.
    clockInButton.addEventListener('click', async () => {
// Original L117: Keeps only items of transforms each item of calls `Array.from` with `eDd.selectedOptions` (the selected options property of eDd) using a callback taking option that `option.value` (the value property of option) and returns a new array for which `Boolean` (boolean) returns truthy; stores the result in `empIds`. const prevents reassignment of this binding, not mutation inside its object/array.
      const empIds = Array.from(eDd.selectedOptions)
// Original L118: Transforms each selected value into the representation needed by the next UI or data operation.
        .map(option => option.value)
// Original L119: Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.
        .filter(Boolean);
// Original L120: `cDd.value` (the value property of cDd); stores the result in `custId`. const prevents reassignment of this binding, not mutation inside its object/array.
      const custId = cDd.value;
// Original L121: Blank line separates related code sections for readability.
      
// Original L122: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (empIds.length === 0 || !custId) {
// Original L123: Writes user-visible text into the element; textContent avoids treating data as HTML.
        shiftError.textContent = 'Please select at least one employee and a job site.';
// Original L124: Returns no value to the caller and exits this function.
        return;
// Original L125: Closes conditional branch. Control continues after this block.
      }
// Original L126: Blank line separates related code sections for readability.
      
// Original L127: Stores selected employee records resolved from their IDs.
      const employees = empIds.map(empId => store.employees.get(empId)).filter(Boolean);
// Original L128: Keeps only items of `employees` (employees) for which a callback taking emp that checks whether any item of `store.shifts` (the shifts property of store) passes a callback taking s that uses `!s.isComplete` only if `s.employee && s.employee.id === emp.id` is truthy; otherwise keeps the falsy first value returns truthy; stores the result in `alreadyClockedIn`. const prevents reassignment of this binding, not mutation inside its object/array.
      const alreadyClockedIn = employees.filter(emp =>
// Original L129: Defines an inline callback that handles each item or event in the surrounding operation.
        store.shifts.some(s => s.employee && s.employee.id === emp.id && !s.isComplete)
// Original L130: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
      );
// Original L131: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (alreadyClockedIn.length > 0) {
// Original L132: Joins the items of transforms each item of `alreadyClockedIn` (already clocked in) using a callback taking emp that `emp.name` (the name property of emp) and returns a new array into text separated by ", "; stores the result in `names`. const prevents reassignment of this binding, not mutation inside its object/array.
        const names = alreadyClockedIn.map(emp => emp.name).join(', ');
// Original L133: Writes user-visible text into the element; textContent avoids treating data as HTML.
        shiftError.textContent = `${names} ${alreadyClockedIn.length === 1 ? 'is' : 'are'} already clocked in!`;
// Original L134: Returns no value to the caller and exits this function.
        return;
// Original L135: Closes conditional branch. Control continues after this block.
      }
// Original L136: Blank line separates related code sections for readability.
      
// Original L137: Stores the selected customer record.
      const cust = store.customers.get(custId);
// Original L138: Blank line separates related code sections for readability.

// Original L139: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      clockInButton.disabled = true;
// Original L140: Writes user-visible text into the element; textContent avoids treating data as HTML.
      shiftError.textContent = '';
// Original L141: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L142: Calls `roundTo15Minutes` with no arguments; stores the result in `clockInTime`. const prevents reassignment of this binding, not mutation inside its object/array.
        const clockInTime = roundTo15Minutes();
// Original L143: Transforms each item of `employees` (employees) using a callback taking emp that runs its enclosed statements and returns a new array; stores the result in `shifts`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shifts = employees.map(emp => {
// Original L144: Constructs a new instance of `WorkShift` with `emp` (emp); `cust` (cust); stores the result in `shift`. const prevents reassignment of this binding, not mutation inside its object/array.
          const shift = new WorkShift(emp, cust);
// Original L145: Calls `shift.startShift` with `clockInTime` (clock in time).
          shift.startShift(clockInTime);
// Original L146: Returns `shift` (shift) to the caller and exits this function.
          return shift;
// Original L147: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
        });
// Original L148: Blank line separates related code sections for readability.

// Original L149: Persists the changed shift through the store before updating the visible in-memory list.
        await store.saveShifts(shifts);
// Original L150: Appends the expanded entries/properties from `shifts` (shifts) to `store.shifts` (the shifts property of store).
        store.shifts.push(...shifts);
// Original L151: Calls `renderActiveShifts` with no arguments.
        renderActiveShifts();
// Original L152: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L153: Calls `console.error` with "Unable to clock in employees:"; `error` (error).
        console.error('Unable to clock in employees:', error);
// Original L154: Writes user-visible text into the element; textContent avoids treating data as HTML.
        shiftError.textContent = 'Unable to clock in the selected employees. Please try again.';
// Original L155: Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.
      } finally {
// Original L156: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
        clockInButton.disabled = false;
// Original L157: Closes try/catch error-handling construct. Control continues after this block.
      }
// Original L158: Closes the surrounding event handler or conditional block.
    }); //clock in button listener
// Original L159: Closes the surrounding event handler or conditional block.
  } // clock in button if statement
// Original L160: Blank line separates related code sections for readability.

// Original L161: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (activeShiftsList) {
// Original L162: Registers a handler so a user action or browser event triggers the page behavior described here.
    activeShiftsList.addEventListener('click', async (e) => {
// Original L163: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      if (e.target.classList.contains('stop-btn')) {
// Original L164: Calls `e.target.getAttribute` with "data-id"; stores the result in `shiftId`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftId = e.target.getAttribute('data-id');
// Original L165: Returns the first item of `store.shifts` (the shifts property of store) matching a callback taking s that checks that `s.id` (the id property of s) and `shiftId` (shift id) have the same value and type, or undefined; stores the result in `shiftToStop`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftToStop = store.shifts.find(s => s.id === shiftId);
// Original L166: Blank line separates related code sections for readability.
        
// Original L167: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
        if (shiftToStop) {
// Original L168: Asks the user to confirm this destructive or irreversible action before continuing.
          if (confirm("Are you sure you want to clock out?")) {
// Original L169: `shiftToStop.clockOutTime` (the clock out time property of shiftToStop); stores the result in `previousClockOut`. const prevents reassignment of this binding, not mutation inside its object/array.
            const previousClockOut = shiftToStop.clockOutTime;
// Original L170: Transforms each item of `shiftToStop.breaks` (the breaks property of shiftToStop) using a callback taking item that an object with fields copied from `item` (item) and returns a new array; stores the result in `previousBreaks`. const prevents reassignment of this binding, not mutation inside its object/array.
            const previousBreaks = shiftToStop.breaks.map(item => ({ ...item }));
// Original L171: Calls `shiftToStop.stopShift` with no arguments.
            shiftToStop.stopShift();
// Original L172: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
            try {
// Original L173: Persists the changed shift through the store before updating the visible in-memory list.
              await store.saveShift(shiftToStop, { routine: true, action: 'clockOut' });
// Original L174: Calls `renderActiveShifts` with no arguments.
              renderActiveShifts();
// Original L175: Writes user-visible text into the element; textContent avoids treating data as HTML.
              shiftError.textContent = '';
// Original L176: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
            } catch (error) {
// Original L177: Assigns the result of previousClockOut to shiftToStop.clockOutTime, updating this control or record for the next step.
              shiftToStop.clockOutTime = previousClockOut;
// Original L178: Assigns the result of previousBreaks to shiftToStop.breaks, updating this control or record for the next step.
              shiftToStop.breaks = previousBreaks;
// Original L179: Writes user-visible text into the element; textContent avoids treating data as HTML.
              shiftError.textContent = error.message || 'Unable to clock out. Please try again.';
// Original L180: Calls `renderActiveShifts` with no arguments.
              renderActiveShifts();
// Original L181: Closes error handler and try/catch error-handling construct. Control continues after this block.
            }
// Original L182: Closes conditional branch. Control continues after this block.
          }
// Original L183: Blank line separates related code sections for readability.
            
// Original L184: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
        } // shicttostop if statement
// Original L185: Closes conditional branch. Control continues after this block.
      }
// Original L186: Blank line separates related code sections for readability.
      
// Original L187: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      if (e.target.classList.contains('start-break-btn')) {
// Original L188: Calls `e.target.getAttribute` with "data-id"; stores the result in `shiftId`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftId = e.target.getAttribute('data-id');
// Original L189: Returns the first item of `store.shifts` (the shifts property of store) matching a callback taking s that checks that `s.id` (the id property of s) and `shiftId` (shift id) have the same value and type, or undefined; stores the result in `shiftToBreak`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftToBreak = store.shifts.find(s => s.id === shiftId);
// Original L190: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
        if (shiftToBreak) {
// Original L191: Transforms each item of `shiftToBreak.breaks` (the breaks property of shiftToBreak) using a callback taking item that an object with fields copied from `item` (item) and returns a new array; stores the result in `previousBreaks`. const prevents reassignment of this binding, not mutation inside its object/array.
          const previousBreaks = shiftToBreak.breaks.map(item => ({ ...item }));
// Original L192: Calls `shiftToBreak.startBreak` with no arguments.
          shiftToBreak.startBreak();
// Original L193: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
          try {
// Original L194: Persists the changed shift through the store before updating the visible in-memory list.
            await store.saveShift(shiftToBreak, { routine: true });
// Original L195: Calls `renderActiveShifts` with no arguments.
            renderActiveShifts();
// Original L196: Writes user-visible text into the element; textContent avoids treating data as HTML.
            shiftError.textContent = '';
// Original L197: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
          } catch (error) {
// Original L198: Assigns the result of previousBreaks to shiftToBreak.breaks, updating this control or record for the next step.
            shiftToBreak.breaks = previousBreaks;
// Original L199: Writes user-visible text into the element; textContent avoids treating data as HTML.
            shiftError.textContent = error.message || 'Unable to submit the break request.';
// Original L200: Calls `renderActiveShifts` with no arguments.
            renderActiveShifts();
// Original L201: Closes error handler and try/catch error-handling construct. Control continues after this block.
          }
// Original L202: Closes conditional branch. Control continues after this block.
        }
// Original L203: Closes conditional branch. Control continues after this block.
      }
// Original L204: Blank line separates related code sections for readability.
      
// Original L205: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      if (e.target.classList.contains('stop-break-btn')) {
// Original L206: Calls `e.target.getAttribute` with "data-id"; stores the result in `shiftId`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftId = e.target.getAttribute('data-id');
// Original L207: Returns the first item of `store.shifts` (the shifts property of store) matching a callback taking s that checks that `s.id` (the id property of s) and `shiftId` (shift id) have the same value and type, or undefined; stores the result in `shiftToBreak`. const prevents reassignment of this binding, not mutation inside its object/array.
        const shiftToBreak = store.shifts.find(s => s.id === shiftId);
// Original L208: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
        if (shiftToBreak) {
// Original L209: Transforms each item of `shiftToBreak.breaks` (the breaks property of shiftToBreak) using a callback taking item that an object with fields copied from `item` (item) and returns a new array; stores the result in `previousBreaks`. const prevents reassignment of this binding, not mutation inside its object/array.
          const previousBreaks = shiftToBreak.breaks.map(item => ({ ...item }));
// Original L210: Calls `shiftToBreak.stopBreak` with no arguments.
          shiftToBreak.stopBreak();
// Original L211: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
          try {
// Original L212: Persists the changed shift through the store before updating the visible in-memory list.
            await store.saveShift(shiftToBreak, { routine: true });
// Original L213: Calls `renderActiveShifts` with no arguments.
            renderActiveShifts();
// Original L214: Writes user-visible text into the element; textContent avoids treating data as HTML.
            shiftError.textContent = '';
// Original L215: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
          } catch (error) {
// Original L216: Assigns the result of previousBreaks to shiftToBreak.breaks, updating this control or record for the next step.
            shiftToBreak.breaks = previousBreaks;
// Original L217: Writes user-visible text into the element; textContent avoids treating data as HTML.
            shiftError.textContent = error.message || 'Unable to submit the break request.';
// Original L218: Calls `renderActiveShifts` with no arguments.
            renderActiveShifts();
// Original L219: Closes error handler and try/catch error-handling construct. Control continues after this block.
          }
// Original L220: Closes conditional branch. Control continues after this block.
        }
// Original L221: Closes conditional branch. Control continues after this block.
      }
// Original L222: Blank line separates related code sections for readability.
      
// Original L223: Closes the surrounding event handler or conditional block.
    }); //active shift list slistener
// Original L224: Blank line separates related code sections for readability.
    
// Original L225: Calls `renderActiveShifts` with no arguments.
    renderActiveShifts();
// Original L226: Schedules repeated refreshes so live timers, quotes, or dashboard totals stay current.
    window.setInterval(updateBreakTimers, 1000);
// Original L227: Closes the surrounding event handler or conditional block.
  } // active shifts list if statement
// Original L228: Blank line separates related code sections for readability.

// Original L229: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
