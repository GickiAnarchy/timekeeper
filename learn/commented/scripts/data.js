// Original L1: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { store } from './models.js';
// Original L2: Blank line separates related code sections for readability.

// Original L3: Waits until the page’s HTML exists before querying elements and wiring its controls.
document.addEventListener('DOMContentLoaded', async () => {
// Original L4: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
  await store.init();
// Original L5: Blank line separates related code sections for readability.

// Original L6: Finds the page element whose unique ID is "emp-list", or null if absent; stores the result in `empList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empList = document.getElementById('emp-list');
// Original L7: Finds the page element whose unique ID is "add-emp-form", or null if absent; stores the result in `empForm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empForm = document.getElementById('add-emp-form');
// Original L8: Finds the page element whose unique ID is "emp-name", or null if absent; stores the result in `empName`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empName = document.getElementById('emp-name');
// Original L9: Finds the page element whose unique ID is "emp-wage", or null if absent; stores the result in `empWage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const empWage = document.getElementById('emp-wage');
// Original L10: Blank line separates related code sections for readability.

// Original L11: Finds the page element whose unique ID is "cust-list", or null if absent; stores the result in `custList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custList = document.getElementById('cust-list');
// Original L12: Finds the page element whose unique ID is "add-cust-form", or null if absent; stores the result in `custForm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custForm = document.getElementById('add-cust-form');
// Original L13: Finds the page element whose unique ID is "cust-name", or null if absent; stores the result in `custName`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custName = document.getElementById('cust-name');
// Original L14: Finds the page element whose unique ID is "cust-loc", or null if absent; stores the result in `custLoc`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custLoc = document.getElementById('cust-loc');
// Original L15: Finds the page element whose unique ID is "cust-note", or null if absent; stores the result in `custNote`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custNote = document.getElementById('cust-note');
// Original L16: Finds the page element whose unique ID is "cust-billing-rate", or null if absent; stores the result in `custBillingRate`. const prevents reassignment of this binding, not mutation inside its object/array.
  const custBillingRate = document.getElementById('cust-billing-rate');
// Original L17: Blank line separates related code sections for readability.

// Original L18: Finds the page element whose unique ID is "people-edit-modal", or null if absent; stores the result in `editModal`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editModal = document.getElementById('people-edit-modal');
// Original L19: Finds the page element whose unique ID is "people-edit-form", or null if absent; stores the result in `editForm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editForm = document.getElementById('people-edit-form');
// Original L20: Finds the page element whose unique ID is "people-edit-eyebrow", or null if absent; stores the result in `editEyebrow`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editEyebrow = document.getElementById('people-edit-eyebrow');
// Original L21: Finds the page element whose unique ID is "people-edit-title", or null if absent; stores the result in `editTitle`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editTitle = document.getElementById('people-edit-title');
// Original L22: Finds the page element whose unique ID is "people-edit-help", or null if absent; stores the result in `editHelp`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editHelp = document.getElementById('people-edit-help');
// Original L23: Finds the page element whose unique ID is "people-edit-error", or null if absent; stores the result in `editError`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editError = document.getElementById('people-edit-error');
// Original L24: Finds the page element whose unique ID is "people-edit-save", or null if absent; stores the result in `editSave`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editSave = document.getElementById('people-edit-save');
// Original L25: Finds the page element whose unique ID is "people-edit-cancel", or null if absent; stores the result in `editCancel`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editCancel = document.getElementById('people-edit-cancel');
// Original L26: Finds the page element whose unique ID is "employee-edit-fields", or null if absent; stores the result in `employeeFields`. const prevents reassignment of this binding, not mutation inside its object/array.
  const employeeFields = document.getElementById('employee-edit-fields');
// Original L27: Finds the page element whose unique ID is "customer-edit-fields", or null if absent; stores the result in `customerFields`. const prevents reassignment of this binding, not mutation inside its object/array.
  const customerFields = document.getElementById('customer-edit-fields');
// Original L28: Finds the page element whose unique ID is "edit-emp-name", or null if absent; stores the result in `editEmpName`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editEmpName = document.getElementById('edit-emp-name');
// Original L29: Finds the page element whose unique ID is "edit-emp-wage", or null if absent; stores the result in `editEmpWage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editEmpWage = document.getElementById('edit-emp-wage');
// Original L30: Finds the page element whose unique ID is "edit-cust-name", or null if absent; stores the result in `editCustName`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editCustName = document.getElementById('edit-cust-name');
// Original L31: Finds the page element whose unique ID is "edit-cust-location", or null if absent; stores the result in `editCustLocation`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editCustLocation = document.getElementById('edit-cust-location');
// Original L32: Finds the page element whose unique ID is "edit-cust-billing-rate", or null if absent; stores the result in `editCustBillingRate`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editCustBillingRate = document.getElementById('edit-cust-billing-rate');
// Original L33: Finds the page element whose unique ID is "edit-cust-note", or null if absent; stores the result in `editCustNote`. const prevents reassignment of this binding, not mutation inside its object/array.
  const editCustNote = document.getElementById('edit-cust-note');
// Original L34: Blank line separates related code sections for readability.

// Original L35: Null; stores the result in `editingType`. let allows the binding to be reassigned.
  let editingType = null;
// Original L36: Null; stores the result in `editingId`. let allows the binding to be reassigned.
  let editingId = null;
// Original L37: Null; stores the result in `editTrigger`. let allows the binding to be reassigned.
  let editTrigger = null;
// Original L38: Blank line separates related code sections for readability.

// Original L39: Defines `renderEmpList` (render emp list), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderEmpList() {
// Original L40: Returns no value to the caller and exits this function.
    if (!empList) return;
// Original L41: Blank line separates related code sections for readability.

// Original L42: Clears stale rendered children before drawing the current data set.
    empList.replaceChildren();
// Original L43: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (store.employees.size === 0) {
// Original L44: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.
      const empty = document.createElement('li');
// Original L45: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      empty.className = 'empty-list emp-item';
// Original L46: Writes user-visible text into the element; textContent avoids treating data as HTML.
      empty.textContent = 'No Employees';
// Original L47: Places the newly built child elements into the document so the user can see them.
      empList.appendChild(empty);
// Original L48: Returns no value to the caller and exits this function.
      return;
// Original L49: Closes conditional branch. Control continues after this block.
    }
// Original L50: Blank line separates related code sections for readability.

// Original L51: Defines an inline callback that handles each item or event in the surrounding operation.
    store.employees.forEach((emp) => {
// Original L52: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `li`. const prevents reassignment of this binding, not mutation inside its object/array.
      const li = document.createElement('li');
// Original L53: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      li.className = 'emp-item';
// Original L54: Creates a detached HTML element with tag "p"; it is not visible until inserted in the page; stores the result in `summary`. const prevents reassignment of this binding, not mutation inside its object/array.
      const summary = document.createElement('p');
// Original L55: Writes user-visible text into the element; textContent avoids treating data as HTML.
      summary.textContent = `${emp.name} - $${emp.wage}`;
// Original L56: Blank line separates related code sections for readability.

// Original L57: Creates a detached HTML element with tag "div"; it is not visible until inserted in the page; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.
      const actions = document.createElement('div');
// Original L58: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      actions.className = 'item-actions';
// Original L59: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const editButton = document.createElement('button');
// Original L60: Assigns the result of 'button' to editButton.type, updating this control or record for the next step.
      editButton.type = 'button';
// Original L61: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      editButton.className = 'edit-btn';
// Original L62: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      editButton.dataset.id = emp.id;
// Original L63: Sets accessibility metadata so assistive technology can understand the control and its current state.
      editButton.setAttribute('aria-label', `Edit ${emp.name}`);
// Original L64: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editButton.textContent = 'Edit';
// Original L65: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const deleteButton = document.createElement('button');
// Original L66: Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.
      deleteButton.type = 'button';
// Original L67: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      deleteButton.className = 'del-btn';
// Original L68: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      deleteButton.dataset.id = emp.id;
// Original L69: Sets accessibility metadata so assistive technology can understand the control and its current state.
      deleteButton.setAttribute('aria-label', `Delete ${emp.name}`);
// Original L70: Writes user-visible text into the element; textContent avoids treating data as HTML.
      deleteButton.textContent = 'Delete';
// Original L71: Places the newly built child elements into the document so the user can see them.
      actions.append(editButton, deleteButton);
// Original L72: Places the newly built child elements into the document so the user can see them.
      li.append(summary, actions);
// Original L73: Places the newly built child elements into the document so the user can see them.
      empList.appendChild(li);
// Original L74: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L75: Closes function renderEmpList. Control continues after this block.
  }
// Original L76: Blank line separates related code sections for readability.

// Original L77: Defines `renderCustList` (render cust list), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderCustList() {
// Original L78: Returns no value to the caller and exits this function.
    if (!custList) return;
// Original L79: Blank line separates related code sections for readability.

// Original L80: Clears stale rendered children before drawing the current data set.
    custList.replaceChildren();
// Original L81: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (store.customers.size === 0) {
// Original L82: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.
      const empty = document.createElement('li');
// Original L83: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      empty.className = 'empty-list cust-item';
// Original L84: Writes user-visible text into the element; textContent avoids treating data as HTML.
      empty.textContent = 'No Customers';
// Original L85: Places the newly built child elements into the document so the user can see them.
      custList.appendChild(empty);
// Original L86: Returns no value to the caller and exits this function.
      return;
// Original L87: Closes conditional branch. Control continues after this block.
    }
// Original L88: Blank line separates related code sections for readability.

// Original L89: Defines an inline callback that handles each item or event in the surrounding operation.
    store.customers.forEach((cust) => {
// Original L90: Creates a detached HTML element with tag "li"; it is not visible until inserted in the page; stores the result in `li`. const prevents reassignment of this binding, not mutation inside its object/array.
      const li = document.createElement('li');
// Original L91: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      li.className = 'cust-item';
// Original L92: Creates a detached HTML element with tag "div"; it is not visible until inserted in the page; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.
      const copy = document.createElement('div');
// Original L93: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      copy.className = 'cust-copy';
// Original L94: Creates a detached HTML element with tag "p"; it is not visible until inserted in the page; stores the result in `name`. const prevents reassignment of this binding, not mutation inside its object/array.
      const name = document.createElement('p');
// Original L95: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      name.className = 'customer-name';
// Original L96: Writes user-visible text into the element; textContent avoids treating data as HTML.
      name.textContent = `${cust.name}${cust.location ? ` · ${cust.location}` : ''}`;
// Original L97: Places the newly built child elements into the document so the user can see them.
      copy.appendChild(name);
// Original L98: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (cust.note) {
// Original L99: Creates a detached HTML element with tag "p"; it is not visible until inserted in the page; stores the result in `note`. const prevents reassignment of this binding, not mutation inside its object/array.
        const note = document.createElement('p');
// Original L100: Adds, removes, or selects CSS classes that control this element’s appearance/state.
        note.className = 'customer-note';
// Original L101: Writes user-visible text into the element; textContent avoids treating data as HTML.
        note.textContent = cust.note;
// Original L102: Places the newly built child elements into the document so the user can see them.
        copy.appendChild(note);
// Original L103: Closes conditional branch. Control continues after this block.
      }
// Original L104: Blank line separates related code sections for readability.

// Original L105: Creates a detached HTML element with tag "div"; it is not visible until inserted in the page; stores the result in `actions`. const prevents reassignment of this binding, not mutation inside its object/array.
      const actions = document.createElement('div');
// Original L106: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      actions.className = 'item-actions';
// Original L107: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `editButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const editButton = document.createElement('button');
// Original L108: Assigns the result of 'button' to editButton.type, updating this control or record for the next step.
      editButton.type = 'button';
// Original L109: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      editButton.className = 'edit-btn';
// Original L110: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      editButton.dataset.id = cust.id;
// Original L111: Sets accessibility metadata so assistive technology can understand the control and its current state.
      editButton.setAttribute('aria-label', `Edit ${cust.name}`);
// Original L112: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editButton.textContent = 'Edit';
// Original L113: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `deleteButton`. const prevents reassignment of this binding, not mutation inside its object/array.
      const deleteButton = document.createElement('button');
// Original L114: Assigns the result of 'button' to deleteButton.type, updating this control or record for the next step.
      deleteButton.type = 'button';
// Original L115: Adds, removes, or selects CSS classes that control this element’s appearance/state.
      deleteButton.className = 'del-btn';
// Original L116: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      deleteButton.dataset.id = cust.id;
// Original L117: Sets accessibility metadata so assistive technology can understand the control and its current state.
      deleteButton.setAttribute('aria-label', `Delete ${cust.name}`);
// Original L118: Writes user-visible text into the element; textContent avoids treating data as HTML.
      deleteButton.textContent = 'Delete';
// Original L119: Places the newly built child elements into the document so the user can see them.
      actions.append(editButton, deleteButton);
// Original L120: Places the newly built child elements into the document so the user can see them.
      li.append(copy, actions);
// Original L121: Places the newly built child elements into the document so the user can see them.
      custList.appendChild(li);
// Original L122: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L123: Closes function renderCustList. Control continues after this block.
  }
// Original L124: Blank line separates related code sections for readability.

// Original L125: Defines `openEditModal` (open edit modal), a reusable function taking type, id, trigger. Its body runs when called, not when declared.
  function openEditModal(type, id, trigger) {
// Original L126: Checks that `type` (type) and "employee" have the same value and type; stores the result in `isEmployee`. const prevents reassignment of this binding, not mutation inside its object/array.
    const isEmployee = type === 'employee';
// Original L127: Checks `isEmployee` (is employee); if true chooses calls `store.employees.get` with `id` (id), otherwise calls `store.customers.get` with `id` (id); stores the result in `record`. const prevents reassignment of this binding, not mutation inside its object/array.
    const record = isEmployee ? store.employees.get(id) : store.customers.get(id);
// Original L128: Returns no value to the caller and exits this function.
    if (!record || !editModal) return;
// Original L129: Blank line separates related code sections for readability.

// Original L130: Assigns the result of type to editingType, updating this control or record for the next step.
    editingType = type;
// Original L131: Assigns the result of id to editingId, updating this control or record for the next step.
    editingId = id;
// Original L132: Assigns the result of trigger to editTrigger, updating this control or record for the next step.
    editTrigger = trigger;
// Original L133: Writes user-visible text into the element; textContent avoids treating data as HTML.
    editError.textContent = '';
// Original L134: Calls `editForm.reset` with no arguments.
    editForm.reset();
// Original L135: Blank line separates related code sections for readability.

// Original L136: Assigns the result of !isEmployee to employeeFields.hidden, updating this control or record for the next step.
    employeeFields.hidden = !isEmployee;
// Original L137: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    employeeFields.disabled = !isEmployee;
// Original L138: Assigns the result of isEmployee to customerFields.hidden, updating this control or record for the next step.
    customerFields.hidden = isEmployee;
// Original L139: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    customerFields.disabled = isEmployee;
// Original L140: Blank line separates related code sections for readability.

// Original L141: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (isEmployee) {
// Original L142: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editEyebrow.textContent = 'EMPLOYEE PROFILE';
// Original L143: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editTitle.textContent = 'Edit employee';
// Original L144: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editHelp.textContent = 'Update this team member’s name and wage. Changes are saved to shared records.';
// Original L145: Assigns the result of record.name to editEmpName.value, updating this control or record for the next step.
      editEmpName.value = record.name;
// Original L146: Assigns the result of String(record.wage) to editEmpWage.value, updating this control or record for the next step.
      editEmpWage.value = String(record.wage);
// Original L147: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
    } else {
// Original L148: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editEyebrow.textContent = 'CUSTOMER PROFILE';
// Original L149: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editTitle.textContent = 'Edit customer';
// Original L150: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editHelp.textContent = 'Update this customer’s details and billing information. Changes are saved to shared records.';
// Original L151: Assigns the result of record.name to editCustName.value, updating this control or record for the next step.
      editCustName.value = record.name;
// Original L152: Assigns the result of record.location || '' to editCustLocation.value, updating this control or record for the next step.
      editCustLocation.value = record.location || '';
// Original L153: Assigns the result of record.billingRate === null || record.billingRate === undefined to editCustBillingRate.value, updating this control or record for the next step.
      editCustBillingRate.value = record.billingRate === null || record.billingRate === undefined
// Original L154: Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.
        ? ''
// Original L155: Converts `record.billingRate` (the billing rate property of record) to text.
        : String(record.billingRate);
// Original L156: Assigns the result of record.note || '' to editCustNote.value, updating this control or record for the next step.
      editCustNote.value = record.note || '';
// Original L157: Closes conditional branch. Control continues after this block.
    }
// Original L158: Blank line separates related code sections for readability.

// Original L159: Calls `editModal.showModal` with no arguments.
    editModal.showModal();
// Original L160: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
    (isEmployee ? editEmpName : editCustName).focus();
// Original L161: Closes function openEditModal. Control continues after this block.
  }
// Original L162: Blank line separates related code sections for readability.

// Original L163: Registers a handler so a user action or browser event triggers the page behavior described here.
  editModal?.addEventListener('close', () => {
// Original L164: `editingType` (editing type); stores the result in `type`. const prevents reassignment of this binding, not mutation inside its object/array.
    const type = editingType;
// Original L165: `editingId` (editing id); stores the result in `id`. const prevents reassignment of this binding, not mutation inside its object/array.
    const id = editingId;
// Original L166: `editTrigger` (edit trigger); stores the result in `trigger`. const prevents reassignment of this binding, not mutation inside its object/array.
    const trigger = editTrigger;
// Original L167: Assigns the result of null to editingType, updating this control or record for the next step.
    editingType = null;
// Original L168: Assigns the result of null to editingId, updating this control or record for the next step.
    editingId = null;
// Original L169: Assigns the result of null to editTrigger, updating this control or record for the next step.
    editTrigger = null;
// Original L170: Blank line separates related code sections for readability.

// Original L171: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (trigger?.isConnected) {
// Original L172: Calls `trigger.focus` with no arguments.
      trigger.focus();
// Original L173: Returns no value to the caller and exits this function.
      return;
// Original L174: Closes conditional branch. Control continues after this block.
    }
// Original L175: Checks checks that `type` (type) and "employee" have the same value and type; if true chooses `empList` (emp list), otherwise `custList` (cust list); stores the result in `list`. const prevents reassignment of this binding, not mutation inside its object/array.
    const list = type === 'employee' ? empList : custList;
// Original L176: Returns the first item of an array containing the expanded entries/properties from uses `list?.querySelectorAll('.edit-btn')`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to an array containing  matching a callback taking button that checks that `button.dataset.id` (the id property of button.dataset) and `id` (id) have the same value and type, or undefined; stores the result in `replacement`. const prevents reassignment of this binding, not mutation inside its object/array.
    const replacement = [...(list?.querySelectorAll('.edit-btn') || [])]
// Original L177: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      .find(button => button.dataset.id === id);
// Original L178: Calls `replacement?.focus` with no arguments; optional chaining stops with undefined if a guarded receiver is null or undefined.
    replacement?.focus();
// Original L179: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L180: Blank line separates related code sections for readability.

// Original L181: Registers a handler so a user action or browser event triggers the page behavior described here.
  editCancel?.addEventListener('click', () => editModal.close());
// Original L182: Blank line separates related code sections for readability.

// Original L183: Registers a handler so a user action or browser event triggers the page behavior described here.
  editForm?.addEventListener('submit', async (event) => {
// Original L184: Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.
    event.preventDefault();
// Original L185: Writes user-visible text into the element; textContent avoids treating data as HTML.
    editError.textContent = '';
// Original L186: Lets the browser validate required/formatted fields and stops saving when a field is invalid.
    if (!editForm.reportValidity()) return;
// Original L187: Blank line separates related code sections for readability.

// Original L188: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    editSave.disabled = true;
// Original L189: Writes user-visible text into the element; textContent avoids treating data as HTML.
    editSave.textContent = 'Saving…';
// Original L190: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L191: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (editingType === 'employee') {
// Original L192: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
        await store.updateEmployee(editingId, editEmpName.value, editEmpWage.value);
// Original L193: Calls `renderEmpList` with no arguments.
        renderEmpList();
// Original L194: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      } else if (editingType === 'customer') {
// Original L195: Checks checks that `editCustBillingRate.value` (the value property of editCustBillingRate) and "" have the same value and type; if true chooses null, otherwise converts `editCustBillingRate.value` (the value property of editCustBillingRate) to a number (invalid numeric text becomes NaN); stores the result in `billingRate`. const prevents reassignment of this binding, not mutation inside its object/array.
        const billingRate = editCustBillingRate.value === '' ? null : Number(editCustBillingRate.value);
// Original L196: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
        await store.updateCustomer(
// Original L197: Includes the named value editingId in the surrounding import list or collection, making that app dependency available here.
          editingId,
// Original L198: Supplies this argument/value (editCustName.value) to the surrounding constructor or DOM call.
          editCustName.value,
// Original L199: Supplies this argument/value (editCustLocation.value) to the surrounding constructor or DOM call.
          editCustLocation.value,
// Original L200: Supplies this argument/value (editCustNote.value) to the surrounding constructor or DOM call.
          editCustNote.value,
// Original L201: Includes the named value billingRate in the surrounding import list or collection, making that app dependency available here.
          billingRate
// Original L202: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
        );
// Original L203: Calls `renderCustList` with no arguments.
        renderCustList();
// Original L204: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
      } else {
// Original L205: Returns no value to the caller and exits this function.
        return;
// Original L206: Closes conditional branch. Control continues after this block.
      }
// Original L207: Calls `editModal.close` with no arguments.
      editModal.close();
// Original L208: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L209: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
// Original L210: Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.
    } finally {
// Original L211: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      editSave.disabled = false;
// Original L212: Writes user-visible text into the element; textContent avoids treating data as HTML.
      editSave.textContent = 'Save changes';
// Original L213: Closes try/catch error-handling construct. Control continues after this block.
    }
// Original L214: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L215: Blank line separates related code sections for readability.

// Original L216: Registers a handler so a user action or browser event triggers the page behavior described here.
  empForm?.addEventListener('submit', async (event) => {
// Original L217: Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.
    event.preventDefault();
// Original L218: Removes leading and trailing whitespace from `empName.value` (the value property of empName); stores the result in `name`. const prevents reassignment of this binding, not mutation inside its object/array.
    const name = empName.value.trim();
// Original L219: Converts `empWage.value` (the value property of empWage) to a number (invalid numeric text becomes NaN); stores the result in `wage`. const prevents reassignment of this binding, not mutation inside its object/array.
    const wage = Number(empWage.value);
// Original L220: Validates that the converted value is a real finite number before using it in calculations or saving.
    if (!name || !Number.isFinite(wage) || wage < 0) {
// Original L221: Shows a plain-language validation or failure message to the user.
      alert('Please enter a valid name and non-negative wage.');
// Original L222: Returns no value to the caller and exits this function.
      return;
// Original L223: Closes conditional branch. Control continues after this block.
    }
// Original L224: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (name === 'Export') {
// Original L225: Calls `empForm.reset` with no arguments.
      empForm.reset();
// Original L226: Returns no value to the caller and exits this function.
      return;
// Original L227: Closes conditional branch. Control continues after this block.
    }
// Original L228: Blank line separates related code sections for readability.

// Original L229: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L230: Waits for calls `store.addEmployee` with `name` (name); `wage` (wage) to finish before continuing; rejection throws into surrounding error handling; stores the result in `employee`. const prevents reassignment of this binding, not mutation inside its object/array.
      const employee = await store.addEmployee(name, wage);
// Original L231: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!employee) {
// Original L232: Shows a plain-language validation or failure message to the user.
        alert('An employee with that name already exists.');
// Original L233: Returns no value to the caller and exits this function.
        return;
// Original L234: Closes conditional branch. Control continues after this block.
      }
// Original L235: Calls `empForm.reset` with no arguments.
      empForm.reset();
// Original L236: Calls `renderEmpList` with no arguments.
      renderEmpList();
// Original L237: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L238: Shows a plain-language validation or failure message to the user.
      alert(error.message || 'Unable to add this employee. Please try again.');
// Original L239: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L240: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L241: Blank line separates related code sections for readability.

// Original L242: Registers a handler so a user action or browser event triggers the page behavior described here.
  empList?.addEventListener('click', async (event) => {
// Original L243: Calls `event.target.closest` with "button[data-id]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
    const button = event.target.closest('button[data-id]');
// Original L244: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L245: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    if (button.classList.contains('edit-btn')) {
// Original L246: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      openEditModal('employee', button.dataset.id, button);
// Original L247: Returns no value to the caller and exits this function.
      return;
// Original L248: Closes conditional branch. Control continues after this block.
    }
// Original L249: Asks the user to confirm this destructive or irreversible action before continuing.
    if (button.classList.contains('del-btn') && confirm('Are you sure you want to delete this employee?')) {
// Original L250: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L251: Requests deletion from the shared store, then the caller redraws the relevant list.
        await store.deleteEmployee(button.dataset.id);
// Original L252: Calls `renderEmpList` with no arguments.
        renderEmpList();
// Original L253: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L254: Shows a plain-language validation or failure message to the user.
        alert(error.message || 'Unable to delete this employee. Please try again.');
// Original L255: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L256: Closes conditional branch. Control continues after this block.
    }
// Original L257: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L258: Blank line separates related code sections for readability.

// Original L259: Registers a handler so a user action or browser event triggers the page behavior described here.
  custForm?.addEventListener('submit', async (event) => {
// Original L260: Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.
    event.preventDefault();
// Original L261: Removes leading and trailing whitespace from `custName.value` (the value property of custName); stores the result in `name`. const prevents reassignment of this binding, not mutation inside its object/array.
    const name = custName.value.trim();
// Original L262: Removes leading and trailing whitespace from `custLoc.value` (the value property of custLoc); stores the result in `location`. const prevents reassignment of this binding, not mutation inside its object/array.
    const location = custLoc.value.trim();
// Original L263: Checks `custNote` (cust note); if true chooses `custNote.value` (the value property of custNote), otherwise ""; stores the result in `note`. const prevents reassignment of this binding, not mutation inside its object/array.
    const note = custNote ? custNote.value : '';
// Original L264: Checks checks that `custBillingRate?.value` (the value property of custBillingRate); optional chaining stops with undefined if a guarded receiver is null or undefined and "" have the same value and type; if true chooses null, otherwise converts `custBillingRate?.value` (the value property of custBillingRate); optional chaining stops with undefined if a guarded receiver is null or undefined to a number (invalid numeric text becomes NaN); stores the result in `billingRate`. const prevents reassignment of this binding, not mutation inside its object/array.
    const billingRate = custBillingRate?.value === '' ? null : Number(custBillingRate?.value);
// Original L265: Validates that the converted value is a real finite number before using it in calculations or saving.
    if (!name || !location || (billingRate !== null && (!Number.isFinite(billingRate) || billingRate < 0))) {
// Original L266: Shows a plain-language validation or failure message to the user.
      alert('Please enter a valid name, location, and non-negative hourly billing rate.');
// Original L267: Returns no value to the caller and exits this function.
      return;
// Original L268: Closes conditional branch. Control continues after this block.
    }
// Original L269: Blank line separates related code sections for readability.

// Original L270: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L271: Waits for calls `store.addCustomer` with `name` (name); `location` (location); `note` (note); `billingRate` (billing rate) to finish before continuing; rejection throws into surrounding error handling; stores the result in `customer`. const prevents reassignment of this binding, not mutation inside its object/array.
      const customer = await store.addCustomer(name, location, note, billingRate);
// Original L272: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (!customer) {
// Original L273: Shows a plain-language validation or failure message to the user.
        alert('A customer with that name and location already exists.');
// Original L274: Returns no value to the caller and exits this function.
        return;
// Original L275: Closes conditional branch. Control continues after this block.
      }
// Original L276: Calls `custForm.reset` with no arguments.
      custForm.reset();
// Original L277: Calls `renderCustList` with no arguments.
      renderCustList();
// Original L278: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L279: Shows a plain-language validation or failure message to the user.
      alert(error.message || 'Unable to save this customer. Please try again.');
// Original L280: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L281: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L282: Blank line separates related code sections for readability.

// Original L283: Registers a handler so a user action or browser event triggers the page behavior described here.
  custList?.addEventListener('click', async (event) => {
// Original L284: Calls `event.target.closest` with "button[data-id]"; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
    const button = event.target.closest('button[data-id]');
// Original L285: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L286: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    if (button.classList.contains('edit-btn')) {
// Original L287: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      openEditModal('customer', button.dataset.id, button);
// Original L288: Returns no value to the caller and exits this function.
      return;
// Original L289: Closes conditional branch. Control continues after this block.
    }
// Original L290: Asks the user to confirm this destructive or irreversible action before continuing.
    if (button.classList.contains('del-btn') && confirm('Are you sure you want to delete this customer?')) {
// Original L291: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L292: Requests deletion from the shared store, then the caller redraws the relevant list.
        await store.deleteCustomer(button.dataset.id);
// Original L293: Calls `renderCustList` with no arguments.
        renderCustList();
// Original L294: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L295: Shows a plain-language validation or failure message to the user.
        alert(error.message || 'Unable to delete this customer. Please try again.');
// Original L296: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L297: Closes conditional branch. Control continues after this block.
    }
// Original L298: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L299: Blank line separates related code sections for readability.

// Original L300: Calls `renderEmpList` with no arguments.
  renderEmpList();
// Original L301: Calls `renderCustList` with no arguments.
  renderCustList();
// Original L302: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
