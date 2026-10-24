// Original L1: Loads the named module so its side effects or exports are available to this page.
import {
// Original L2: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  store,
// Original L3: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  populateCustomerDropdowns,
// Original L4: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  Invoice
// Original L5: Completes this application statement, applying the shown value or operation to the current page state/data record.
} from './models.js';
// Original L6: Loads the named module so its side effects or exports are available to this page.
import {
// Original L7: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  invoiceShiftIds as getInvoiceShiftIds,
// Original L8: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  makeShiftInvoiceLine,
// Original L9: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  shiftInvoiceLineStatus,
// Original L10: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  shiftIsAttachedElsewhere
// Original L11: Completes this application statement, applying the shown value or operation to the current page state/data record.
} from './domain.mjs';
// Original L12: Imports initializeTableSorting, sortTableRows from ./table-sort.mjs; these helpers provide the UI utility this module uses.
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';
// Original L13: Blank line separates related statements and has no runtime effect.

// Original L14: Blank line separates related statements and has no runtime effect.

// Original L15: Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.
document.addEventListener('DOMContentLoaded', async () => {
// Original L16: Completes this application statement, applying the shown value or operation to the current page state/data record.
  await store.init();
// Original L17: Blank line separates related statements and has no runtime effect.

// Original L18: Stores custSelect, DOM reference to the custSelect control; later code reuses this result so the invoice.js workflow stays consistent.
  const custSelect = document.getElementById('cust-select');
// Original L19: Stores invList, DOM reference to the invList control; later code reuses this result so the invoice.js workflow stays consistent.
  const invList = document.getElementById('inv-select');
// Original L20: Stores addItemBtn, DOM reference to the addItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const addItemBtn = document.getElementById('add-item-btn');
// Original L21: Stores editItemBtn, DOM reference to the editItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const editItemBtn = document.getElementById('edit-item-btn');
// Original L22: Stores removeItemBtn, DOM reference to the removeItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const removeItemBtn = document.getElementById('remove-item-btn');
// Original L23: Stores addInvBtn, DOM reference to the addInvBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const addInvBtn = document.getElementById('add-inv-btn');
// Original L24: Stores deleteInvBtn, DOM reference to the deleteInvBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const deleteInvBtn = document.getElementById('delete-inv-btn');
// Original L25: Stores invoiceBody, DOM reference to the invoiceBody control; later code reuses this result so the invoice.js workflow stays consistent.
  const invoiceBody = document.getElementById('invoice-table-body');
// Original L26: Stores paidLabel, DOM reference to the paidLabel control; later code reuses this result so the invoice.js workflow stays consistent.
  const paidLabel = document.getElementById('paid-notice');
// Original L27: Stores openDiv, DOM reference to the openDiv control; later code reuses this result so the invoice.js workflow stays consistent.
  const openDiv = document.getElementById('open-div');
// Original L28: Stores invoiceDateInput, DOM reference to the invoiceDateInput control; later code reuses this result so the invoice.js workflow stays consistent.
  const invoiceDateInput = document.getElementById('invoice-date');
// Original L29: Stores shiftLinkList, DOM reference to the shiftLinkList control; later code reuses this result so the invoice.js workflow stays consistent.
  const shiftLinkList = document.getElementById('shift-link-list');
// Original L30: Stores shiftLinkError, DOM reference to the shiftLinkError control; later code reuses this result so the invoice.js workflow stays consistent.
  const shiftLinkError = document.getElementById('shift-link-error');
// Original L31: Stores saveShiftLinksBtn, DOM reference to the saveShiftLinksBtn control; later code reuses this result so the invoice.js workflow stays consistent.
  const saveShiftLinksBtn = document.getElementById('save-shift-links-btn');
// Original L32: Stores invoiceTable, DOM reference to the invoiceTable control; later code reuses this result so the invoice.js workflow stays consistent.
  const invoiceTable = document.getElementById('inv-table');
// Original L33: Blank line separates related statements and has no runtime effect.

// Original L34: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!custSelect || !invList || !addItemBtn || !editItemBtn || !removeItemBtn ||
// Original L35: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      !addInvBtn || !deleteInvBtn || !invoiceBody || !invoiceDateInput || !openDiv ||
// Original L36: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      !shiftLinkList || !shiftLinkError || !saveShiftLinksBtn) return;
// Original L37: Blank line separates related statements and has no runtime effect.

// Original L38: Creates mutable selectedItemIndex state for this workflow; it changes as the user selects, edits, or loads records.
  let selectedItemIndex = null;
// Original L39: Creates mutable invoiceSort state for this workflow; it changes as the user selects, edits, or loads records.
  let invoiceSort = null;
// Original L40: Blank line separates related statements and has no runtime effect.

// Original L41: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  initializeTableSorting(invoiceTable, {
// Original L42: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    onSort: sort => {
// Original L43: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoiceSort = sort;
// Original L44: Completes this application statement, applying the shown value or operation to the current page state/data record.
      sortInvoiceRows();
// Original L45: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L46: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L47: Blank line separates related statements and has no runtime effect.

// Original L48: This comment documents the design intent here: Populate customers dropdown.
  // Populate customers dropdown
// Original L49: Completes this application statement, applying the shown value or operation to the current page state/data record.
  populateCustomerDropdowns(custSelect);
// Original L50: Blank line separates related statements and has no runtime effect.

// Original L51: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  custSelect.addEventListener('change', () => renderInvoiceList());
// Original L52: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  invList.addEventListener('change', renderSelectedInvoice);
// Original L53: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  invoiceBody.addEventListener('click', selectItemRow);
// Original L54: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  openDiv.addEventListener('click', event => {
// Original L55: Stores button, value; later code reuses this result so the invoice.js workflow stays consistent.
    const button = event.target.closest('button[data-invoice-id]');
// Original L56: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!button) return;
// Original L57: Stores invoice, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = store.invoices.find(candidate => String(candidate.id) === button.dataset.invoiceId);
// Original L58: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice?.customer?.id) return;
// Original L59: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    custSelect.value = String(invoice.customer.id);
// Original L60: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderInvoiceList(invoice.id);
// Original L61: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L62: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  saveShiftLinksBtn.addEventListener('click', saveShiftLinks);
// Original L63: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  invoiceDateInput.addEventListener('change', async () => {
// Original L64: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L65: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice) return;
// Original L66: Blank line separates related statements and has no runtime effect.

// Original L67: Stores previousDate, value; later code reuses this result so the invoice.js workflow stays consistent.
    const previousDate = invoice.date;
// Original L68: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    invoice.date = invoiceDateInput.value || null;
// Original L69: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L70: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      await store.saveInvoice(invoice);
// Original L71: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderInvoiceList(invoice.id);
// Original L72: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L73: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoice.date = previousDate;
// Original L74: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      invoiceDateInput.value = previousDate || '';
// Original L75: Sets the console.error('Error saving invoice date property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      console.error('Error saving invoice date:', error);
// Original L76: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L77: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L78: Blank line separates related statements and has no runtime effect.

// Original L79: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  addInvBtn.addEventListener('click', async () => {
// Original L80: Stores custId, value; later code reuses this result so the invoice.js workflow stays consistent.
    const custId = custSelect.value;
// Original L81: Creates mutable customer state for this workflow; it changes as the user selects, edits, or loads records.
    let customer = null;
// Original L82: Blank line separates related statements and has no runtime effect.

// Original L83: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (store.customers instanceof Map) {
// Original L84: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      customer = store.customers.get(custId) || store.customers.get(Number(custId));
// Original L85: Provides the alternate branch when the preceding condition is not satisfied.
    } else if (typeof store.customers === 'object' && store.customers !== null) {
// Original L86: Completes this application statement, applying the shown value or operation to the current page state/data record.
      customer = store.customers[custId];
// Original L87: Provides the alternate branch when the preceding condition is not satisfied.
    } else if (Array.isArray(store.customers)) {
// Original L88: Completes this application statement, applying the shown value or operation to the current page state/data record.
      customer = store.customers.find(c => String(c.id) === String(custId));
// Original L89: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L90: Blank line separates related statements and has no runtime effect.

// Original L91: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!customer) return;
// Original L92: Blank line separates related statements and has no runtime effect.

// Original L93: Stores newInvoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const newInvoice = new Invoice(customer);
// Original L94: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    await store.saveInvoice(newInvoice);
// Original L95: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (Array.isArray(store.invoices)) {
// Original L96: Completes this application statement, applying the shown value or operation to the current page state/data record.
      store.invoices.push(newInvoice);
// Original L97: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L98: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderInvoiceList(newInvoice.id);
// Original L99: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L100: Blank line separates related statements and has no runtime effect.

// Original L101: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  deleteInvBtn.addEventListener('click', async () => {
// Original L102: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L103: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice) return;
// Original L104: Blank line separates related statements and has no runtime effect.

// Original L105: Stores invoiceLabel, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoiceLabel = shortInvoiceId(invoice.id);
// Original L106: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!window.confirm(`Delete invoice #${invoiceLabel}? This cannot be undone.`)) return;
// Original L107: Blank line separates related statements and has no runtime effect.

// Original L108: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    await store.deleteInvoice(invoice.id);
// Original L109: Completes this application statement, applying the shown value or operation to the current page state/data record.
    selectedItemIndex = null;
// Original L110: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderInvoiceList();
// Original L111: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L112: Blank line separates related statements and has no runtime effect.

// Original L113: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  addItemBtn.addEventListener('click', () => {
// Original L114: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L115: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (invoice) openItemModal(invoice);
// Original L116: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L117: Blank line separates related statements and has no runtime effect.

// Original L118: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  editItemBtn.addEventListener('click', () => {
// Original L119: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L120: Stores item, value; later code reuses this result so the invoice.js workflow stays consistent.
    const item = invoice?.items?.[selectedItemIndex];
// Original L121: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (invoice && item) openItemModal(invoice, selectedItemIndex);
// Original L122: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L123: Blank line separates related statements and has no runtime effect.

// Original L124: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  removeItemBtn.addEventListener('click', async () => {
// Original L125: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L126: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice || selectedItemIndex === null) return;
// Original L127: Blank line separates related statements and has no runtime effect.

// Original L128: Stores item, value; later code reuses this result so the invoice.js workflow stays consistent.
    const item = invoice.items[selectedItemIndex];
// Original L129: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!item) return;
// Original L130: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (item.shiftId) return;
// Original L131: Blank line separates related statements and has no runtime effect.

// Original L132: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!window.confirm(`Remove “${item.name}” from this invoice?`)) return;
// Original L133: Blank line separates related statements and has no runtime effect.

// Original L134: Completes this application statement, applying the shown value or operation to the current page state/data record.
    invoice.items.splice(selectedItemIndex, 1);
// Original L135: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    await store.saveInvoice(invoice);
// Original L136: Completes this application statement, applying the shown value or operation to the current page state/data record.
    selectedItemIndex = null;
// Original L137: Completes this application statement, applying the shown value or operation to the current page state/data record.
    populateInvoiceDetails(invoice);
// Original L138: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderOpenInvoices();
// Original L139: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L140: Blank line separates related statements and has no runtime effect.

// Original L141: Completes this application statement, applying the shown value or operation to the current page state/data record.
  renderInvoiceList();
// Original L142: Blank line separates related statements and has no runtime effect.

// Original L143: Defines the private helper getSelectedInvoice for this page; keeping it local prevents unrelated pages from depending on UI details.
  function getSelectedInvoice() {
// Original L144: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!Array.isArray(store.invoices)) return null;
// Original L145: Returns uses returns the first item of `store.invoices` (the invoices property of store) matching a callback taking invoice that checks that converts `invoice.id` to text and converts `invList.value` to text have the same value and type, or undefined when it is truthy, otherwise falls back to null to the caller and exits this function.
    return store.invoices.find(invoice => String(invoice.id) === String(invList.value)) || null;
// Original L146: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L147: Blank line separates related statements and has no runtime effect.

// Original L148: Defines the private helper sortInvoiceRows for this page; keeping it local prevents unrelated pages from depending on UI details.
  function sortInvoiceRows() {
// Original L149: Stores rows, DOM query used to find the rows elements; later code reuses this result so the invoice.js workflow stays consistent.
    const rows = [...invoiceBody.querySelectorAll('tr[data-item-index]')];
// Original L150: Stores sortedRows, value; later code reuses this result so the invoice.js workflow stays consistent.
    const sortedRows = invoiceSort
// Original L151: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      ? sortTableRows(rows, {
// Original L152: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
          ...invoiceSort,
// Original L153: Sets the getValue property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
          getValue: (row, key) => key === 'item' ? row.dataset.sortItem : row.dataset.sortValue
// Original L154: Closes the surrounding block or callback; no additional operation occurs on this line.
        })
// Original L155: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      : rows.sort((a, b) => Number(a.dataset.itemIndex) - Number(b.dataset.itemIndex));
// Original L156: Builds the page structure from DOM nodes and replaces stale results with the current records.
    sortedRows.forEach(row => invoiceBody.appendChild(row));
// Original L157: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L158: Blank line separates related statements and has no runtime effect.

// Original L159: Defines the private helper shortInvoiceId for this page; keeping it local prevents unrelated pages from depending on UI details.
  function shortInvoiceId(id) {
// Original L160: Returns copies a portion of converts `id` (id) to text, from changes the numeric sign of 6 to the end to the caller and exits this function.
    return String(id).slice(-6);
// Original L161: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L162: Blank line separates related statements and has no runtime effect.

// Original L163: Defines the private helper formatCurrency for this page; keeping it local prevents unrelated pages from depending on UI details.
  function formatCurrency(value) {
// Original L164: Stores amount, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
    const amount = Number(value);
// Original L165: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!Number.isFinite(amount)) return '$0.00';
// Original L166: Returns checks checks whether `amount` (amount) is less than 0; if true chooses a text template that combines fixed text with computed values formats gets the nonnegative magnitude of `amount` (amount) as text with 2 digits after the decimal point, otherwise a text template that combines fixed text with computed values formats `amount` (amount) as text with 2 digits after the decimal point to the caller and exits this function.
    return amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`;
// Original L167: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L168: Blank line separates related statements and has no runtime effect.

// Original L169: Defines the private helper formatInvoiceDate for this page; keeping it local prevents unrelated pages from depending on UI details.
  function formatInvoiceDate(date) {
// Original L170: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Date not set';
// Original L171: Stores destructured values, value; later code reuses this result so the invoice.js workflow stays consistent.
    const [year, month, day] = date.split('-').map(Number);
// Original L172: Stores parsed, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the invoice.js workflow stays consistent.
    const parsed = new Date(year, month - 1, day);
// Original L173: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return 'Date not set';
// Original L174: Returns calls `parsed.toLocaleDateString` with `undefined` (undefined); an object with fields year: "numeric"; month: "short"; day: "numeric" to the caller and exits this function.
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
// Original L175: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L176: Blank line separates related statements and has no runtime effect.

// Original L177: Defines the private helper makeElement for this page; keeping it local prevents unrelated pages from depending on UI details.
  function makeElement(tag, className = '', text = undefined) {
// Original L178: Stores element, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
    const element = document.createElement(tag);
// Original L179: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (className) element.className = className;
// Original L180: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (text !== undefined) element.textContent = text;
// Original L181: Returns `element` (element) to the caller and exits this function.
    return element;
// Original L182: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L183: Blank line separates related statements and has no runtime effect.

// Original L184: Defines the private helper renderOpenInvoices for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderOpenInvoices() {
// Original L185: Builds the page structure from DOM nodes and replaces stale results with the current records.
    openDiv.replaceChildren();
// Original L186: Stores openInvoices, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const openInvoices = (store.invoices || []).filter(invoice => !invoice.isPaid);
// Original L187: Stores heading, value; later code reuses this result so the invoice.js workflow stays consistent.
    const heading = makeElement('p', '', `${openInvoices.length} open ${openInvoices.length === 1 ? 'invoice' : 'invoices'}`);
// Original L188: Builds the page structure from DOM nodes and replaces stale results with the current records.
    openDiv.appendChild(heading);
// Original L189: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (openInvoices.length === 0) {
// Original L190: Builds the page structure from DOM nodes and replaces stale results with the current records.
      openDiv.appendChild(makeElement('p', 'muted-copy', 'No open invoices.'));
// Original L191: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L192: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L193: Blank line separates related statements and has no runtime effect.

// Original L194: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    openInvoices.sort((a, b) => {
// Original L195: Stores dateA, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.
      const dateA = /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') ? a.date : '9999-99-99';
// Original L196: Stores dateB, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.
      const dateB = /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : '9999-99-99';
// Original L197: Returns uses calls `dateA.localeCompare` with `dateB` (date b) when it is truthy, otherwise falls back to calls `String(a.customer?.name || '').localeCompare` with converts uses `b.customer?.name`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to text to the caller and exits this function.
      return dateA.localeCompare(dateB) || String(a.customer?.name || '').localeCompare(String(b.customer?.name || ''));
// Original L198: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L199: Stores list, value; later code reuses this result so the invoice.js workflow stays consistent.
    const list = makeElement('ul', 'open-invoice-list');
// Original L200: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    openInvoices.forEach(invoice => {
// Original L201: Stores item, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
      const item = document.createElement('li');
// Original L202: Stores total, value; later code reuses this result so the invoice.js workflow stays consistent.
      const total = formatCurrency(invoice.totalBill());
// Original L203: Stores button, value; later code reuses this result so the invoice.js workflow stays consistent.
      const button = makeElement('button', 'open-invoice-button',
// Original L204: Completes this application statement, applying the shown value or operation to the current page state/data record.
        `#${shortInvoiceId(invoice.id)} · ${invoice.customer?.name || 'Customer'} · ${formatInvoiceDate(invoice.date)} · ${total}`);
// Original L205: Completes this application statement, applying the shown value or operation to the current page state/data record.
      button.type = 'button';
// Original L206: Completes this application statement, applying the shown value or operation to the current page state/data record.
      button.dataset.invoiceId = invoice.id;
// Original L207: Completes this application statement, applying the shown value or operation to the current page state/data record.
      button.setAttribute('aria-label', `Open invoice ${shortInvoiceId(invoice.id)} for ${invoice.customer?.name || 'customer'}, dated ${formatInvoiceDate(invoice.date)}, total ${total}`);
// Original L208: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (String(getSelectedInvoice()?.id) === String(invoice.id)) button.setAttribute('aria-current', 'true');
// Original L209: Builds the page structure from DOM nodes and replaces stale results with the current records.
      item.appendChild(button);
// Original L210: Builds the page structure from DOM nodes and replaces stale results with the current records.
      list.appendChild(item);
// Original L211: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L212: Builds the page structure from DOM nodes and replaces stale results with the current records.
    openDiv.appendChild(list);
// Original L213: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L214: Blank line separates related statements and has no runtime effect.

// Original L215: Defines the private helper invoiceShiftIds for this page; keeping it local prevents unrelated pages from depending on UI details.
  function invoiceShiftIds(invoice) {
// Original L216: Returns calls `getInvoiceShiftIds` with `invoice` (invoice) to the caller and exits this function.
    return getInvoiceShiftIds(invoice);
// Original L217: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L218: Blank line separates related statements and has no runtime effect.

// Original L219: Defines the private helper shiftIsLinkedElsewhere for this page; keeping it local prevents unrelated pages from depending on UI details.
  function shiftIsLinkedElsewhere(shiftId, invoiceId) {
// Original L220: Returns calls `shiftIsAttachedElsewhere` with `store.invoices` (the invoices property of store); `shiftId` (shift id); `invoiceId` (invoice id) to the caller and exits this function.
    return shiftIsAttachedElsewhere(store.invoices, shiftId, invoiceId);
// Original L221: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L222: Blank line separates related statements and has no runtime effect.

// Original L223: Defines the private helper updateShiftLinkSaveState for this page; keeping it local prevents unrelated pages from depending on UI details.
  function updateShiftLinkSaveState(invoice) {
// Original L224: Stores currentIds, value; later code reuses this result so the invoice.js workflow stays consistent.
    const currentIds = invoiceShiftIds(invoice);
// Original L225: Stores selectedIds, DOM query used to find the selectedIds elements; later code reuses this result so the invoice.js workflow stays consistent.
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
// Original L226: Stores changed, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const changed = currentIds.size !== selectedIds.size || [...currentIds].some(id => !selectedIds.has(id));
// Original L227: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    saveShiftLinksBtn.disabled = !invoice || invoice.isPaid || !changed;
// Original L228: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L229: Blank line separates related statements and has no runtime effect.

// Original L230: Defines the private helper renderShiftLinks for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderShiftLinks(invoice) {
// Original L231: Builds the page structure from DOM nodes and replaces stale results with the current records.
    shiftLinkList.replaceChildren();
// Original L232: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    shiftLinkError.textContent = '';
// Original L233: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice) {
// Original L234: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Select an invoice to view eligible shifts.'));
// Original L235: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      saveShiftLinksBtn.disabled = true;
// Original L236: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L237: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L238: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice.customer?.id) {
// Original L239: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice has no customer attached.'));
// Original L240: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      saveShiftLinksBtn.disabled = true;
// Original L241: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L242: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L243: Blank line separates related statements and has no runtime effect.

// Original L244: Stores linkedIds, value; later code reuses this result so the invoice.js workflow stays consistent.
    const linkedIds = invoiceShiftIds(invoice);
// Original L245: Stores customerId, value; later code reuses this result so the invoice.js workflow stays consistent.
    const customerId = String(invoice.customer.id);
// Original L246: Stores candidates, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const candidates = store.shifts.filter(shift =>
// Original L247: Converts `shift.customer?.id` (the id property of shift.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to text.
      shift.isComplete && String(shift.customer?.id) === customerId &&
// Original L248: Calls `linkedIds.has` with converts `shift.id` (the id property of shift) to text.
      (linkedIds.has(String(shift.id)) || !shiftIsLinkedElsewhere(shift.id, invoice.id))
// Original L249: Completes this application statement, applying the shown value or operation to the current page state/data record.
    ).sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
// Original L250: Stores visibleIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the invoice.js workflow stays consistent.
    const visibleIds = new Set();
// Original L251: Stores rateIsSet, value; later code reuses this result so the invoice.js workflow stays consistent.
    const rateIsSet = invoice.customer.billingRate !== null && invoice.customer.billingRate !== undefined &&
// Original L252: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      Number.isFinite(Number(invoice.customer.billingRate)) && Number(invoice.customer.billingRate) >= 0;
// Original L253: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!rateIsSet) {
// Original L254: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Set this customer’s hourly billing rate in People Data before attaching new shifts.'));
// Original L255: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L256: Blank line separates related statements and has no runtime effect.

// Original L257: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    candidates.forEach(shift => {
// Original L258: Stores shiftId, value; later code reuses this result so the invoice.js workflow stays consistent.
      const shiftId = String(shift.id);
// Original L259: Completes this application statement, applying the shown value or operation to the current page state/data record.
      visibleIds.add(shiftId);
// Original L260: Stores hours, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
      const hours = Number(shift.getHoursWorked());
// Original L261: Stores rate, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
      const rate = rateIsSet ? Number(invoice.customer.billingRate) : null;
// Original L262: Stores amountText, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.
      const amountText = rate === null ? 'rate not set' : `$${(rate * hours).toFixed(2)} at $${rate.toFixed(2)}/h`;
// Original L263: Stores workDate, a date value used for local-day or period calculations; later code reuses this result so the invoice.js workflow stays consistent.
      const workDate = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
// Original L264: Calls `shift.clockInTime.toLocaleDateString` with no arguments.
        ? shift.clockInTime.toLocaleDateString()
// Original L265: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : 'Date not set';
// Original L266: Stores label, value; later code reuses this result so the invoice.js workflow stays consistent.
      const label = makeElement('label', 'shift-link-option');
// Original L267: Stores checkbox, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
      const checkbox = document.createElement('input');
// Original L268: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.type = 'checkbox';
// Original L269: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.dataset.shiftId = shiftId;
// Original L270: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.checked = linkedIds.has(shiftId);
// Original L271: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.disabled = Boolean(invoice.isPaid);
// Original L272: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
// Original L273: Stores description, value; later code reuses this result so the invoice.js workflow stays consistent.
      const description = makeElement('span', '',
// Original L274: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
        `${workDate} · ${shift.employee?.name || 'Employee'} · ${hours.toFixed(2)} actual h · ${amountText}`);
// Original L275: Builds the page structure from DOM nodes and replaces stale results with the current records.
      label.append(checkbox, description);
// Original L276: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(label);
// Original L277: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L278: Blank line separates related statements and has no runtime effect.

// Original L279: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    linkedIds.forEach(shiftId => {
// Original L280: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (visibleIds.has(shiftId)) return;
// Original L281: Stores label, value; later code reuses this result so the invoice.js workflow stays consistent.
      const label = makeElement('label', 'shift-link-option');
// Original L282: Stores checkbox, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
      const checkbox = document.createElement('input');
// Original L283: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.type = 'checkbox';
// Original L284: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.dataset.shiftId = shiftId;
// Original L285: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.checked = true;
// Original L286: Completes this application statement, applying the shown value or operation to the current page state/data record.
      checkbox.disabled = Boolean(invoice.isPaid);
// Original L287: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
// Original L288: Builds the page structure from DOM nodes and replaces stale results with the current records.
      label.append(checkbox, makeElement('span', '', `Previously linked shift not found · ${shiftId}`));
// Original L289: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(label);
// Original L290: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L291: Blank line separates related statements and has no runtime effect.

// Original L292: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (candidates.length === 0 && linkedIds.size === 0) {
// Original L293: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'No unbilled completed shifts are available for this customer.'));
// Original L294: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L295: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (invoice.isPaid) {
// Original L296: Builds the page structure from DOM nodes and replaces stale results with the current records.
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice is paid; linked shifts are read-only.'));
// Original L297: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L298: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    updateShiftLinkSaveState(invoice);
// Original L299: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L300: Blank line separates related statements and has no runtime effect.

// Original L301: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
  async function saveShiftLinks() {
// Original L302: Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.
    const invoice = getSelectedInvoice();
// Original L303: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice || invoice.isPaid) return;
// Original L304: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    shiftLinkError.textContent = '';
// Original L305: Stores previousItems, value; later code reuses this result so the invoice.js workflow stays consistent.
    const previousItems = invoice.items;
// Original L306: Stores previousShiftIds, value; later code reuses this result so the invoice.js workflow stays consistent.
    const previousShiftIds = invoice.shiftIds;
// Original L307: Stores existingIds, value; later code reuses this result so the invoice.js workflow stays consistent.
    const existingIds = invoiceShiftIds(invoice);
// Original L308: Stores selectedIds, DOM query used to find the selectedIds elements; later code reuses this result so the invoice.js workflow stays consistent.
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
// Original L309: Stores additions, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const additions = [...selectedIds].filter(id => !existingIds.has(id));
// Original L310: Stores rate, value; later code reuses this result so the invoice.js workflow stays consistent.
    const rate = invoice.customer?.billingRate;
// Original L311: Blank line separates related statements and has no runtime effect.

// Original L312: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (additions.length && (rate === null || rate === undefined || !Number.isFinite(Number(rate)) || Number(rate) < 0)) {
// Original L313: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      shiftLinkError.textContent = 'Set a valid customer hourly billing rate before adding shifts.';
// Original L314: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L315: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L316: Blank line separates related statements and has no runtime effect.

// Original L317: Stores newLaborItems, value; later code reuses this result so the invoice.js workflow stays consistent.
    const newLaborItems = [];
// Original L318: Iterates through each matching record so the page can aggregate or render every item.
    for (const shiftId of additions) {
// Original L319: Stores shift, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
      const shift = store.shifts.find(candidate => String(candidate.id) === shiftId);
// Original L320: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!shift || !shift.isComplete || String(shift.customer?.id) !== String(invoice.customer?.id) ||
// Original L321: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
          shiftIsLinkedElsewhere(shiftId, invoice.id)) {
// Original L322: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        shiftLinkError.textContent = 'One of the selected shifts is no longer available. Refresh the invoice and try again.';
// Original L323: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L324: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L325: Stores hours, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
      const hours = Number(shift.getHoursWorked());
// Original L326: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!Number.isFinite(hours) || hours < 0) {
// Original L327: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        shiftLinkError.textContent = 'A selected shift has invalid actual hours and cannot be billed.';
// Original L328: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L329: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L330: Stores hourlyRate, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
      const hourlyRate = Number(rate);
// Original L331: Stores dateLabel, a date value used for local-day or period calculations; later code reuses this result so the invoice.js workflow stays consistent.
      const dateLabel = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
// Original L332: Calls `shift.clockInTime.toLocaleDateString` with no arguments.
        ? shift.clockInTime.toLocaleDateString()
// Original L333: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : 'date not set';
// Original L334: Creates mutable line state for this workflow; it changes as the user selects, edits, or loads records.
      let line;
// Original L335: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      try {
// Original L336: Completes this application statement, applying the shown value or operation to the current page state/data record.
        line = makeShiftInvoiceLine(shift, hourlyRate);
// Original L337: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
      } catch (error) {
// Original L338: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        shiftLinkError.textContent = error.message || 'This shift cannot be attached to the invoice.';
// Original L339: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L340: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L341: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      line.name = `Labor · ${dateLabel} · ${shift.employee?.name || 'Employee'} (${line.billedHours.toFixed(2)} h × $${line.billingRate.toFixed(2)}/h)`;
// Original L342: Completes this application statement, applying the shown value or operation to the current page state/data record.
      newLaborItems.push(line);
// Original L343: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L344: Blank line separates related statements and has no runtime effect.

// Original L345: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    saveShiftLinksBtn.disabled = true;
// Original L346: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    saveShiftLinksBtn.textContent = 'Saving…';
// Original L347: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L348: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoice.items = previousItems.filter(item => !item.shiftId || selectedIds.has(String(item.shiftId))).concat(newLaborItems);
// Original L349: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoice.shiftIds = [...selectedIds];
// Original L350: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      await store.saveInvoice(invoice);
// Original L351: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderInvoiceList(invoice.id);
// Original L352: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L353: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoice.items = previousItems;
// Original L354: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoice.shiftIds = previousShiftIds;
// Original L355: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      console.error('Unable to save linked shifts:', error);
// Original L356: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      shiftLinkError.textContent = 'Unable to update linked shifts. Please try again.';
// Original L357: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      updateShiftLinkSaveState(invoice);
// Original L358: Runs cleanup regardless of success, such as restoring button text or re-enabling controls.
    } finally {
// Original L359: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      saveShiftLinksBtn.textContent = 'Update linked shifts';
// Original L360: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L361: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L362: Blank line separates related statements and has no runtime effect.

// Original L363: Defines the private helper renderInvoiceList for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderInvoiceList(preferredInvoiceId = null) {
// Original L364: Stores customerId, value; later code reuses this result so the invoice.js workflow stays consistent.
    const customerId = custSelect.value;
// Original L365: Stores customerInvoices, value; later code reuses this result so the invoice.js workflow stays consistent.
    const customerInvoices = (store.invoices || []).filter(
// Original L366: Converts `invoice.customer.id` (the id property of invoice.customer) to text.
      invoice => invoice.customer && String(invoice.customer.id) === String(customerId)
// Original L367: Closes the surrounding block or callback; no additional operation occurs on this line.
    );
// Original L368: Blank line separates related statements and has no runtime effect.

// Original L369: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    invList.innerHTML = '';
// Original L370: Completes this application statement, applying the shown value or operation to the current page state/data record.
    selectedItemIndex = null;
// Original L371: Blank line separates related statements and has no runtime effect.

// Original L372: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!customerId || customerInvoices.length === 0) {
// Original L373: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      invList.innerHTML = '<option value="">No invoices found</option>';
// Original L374: Completes this application statement, applying the shown value or operation to the current page state/data record.
      populateInvoiceDetails(null);
// Original L375: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderOpenInvoices();
// Original L376: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L377: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L378: Blank line separates related statements and has no runtime effect.

// Original L379: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    customerInvoices.forEach(invoice => {
// Original L380: Stores option, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
      const option = document.createElement('option');
// Original L381: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      option.value = invoice.id;
// Original L382: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      option.textContent = `Invoice #${shortInvoiceId(invoice.id)} - ${invoice.customer.name || 'Customer'} · ${formatInvoiceDate(invoice.date)}`;
// Original L383: Builds the page structure from DOM nodes and replaces stale results with the current records.
      invList.appendChild(option);
// Original L384: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L385: Blank line separates related statements and has no runtime effect.

// Original L386: Stores selectedInvoice, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const selectedInvoice = customerInvoices.find(invoice => String(invoice.id) === String(preferredInvoiceId)) || customerInvoices[0];
// Original L387: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    invList.value = selectedInvoice.id;
// Original L388: Completes this application statement, applying the shown value or operation to the current page state/data record.
    populateInvoiceDetails(selectedInvoice);
// Original L389: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderOpenInvoices();
// Original L390: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L391: Blank line separates related statements and has no runtime effect.

// Original L392: Defines the private helper renderSelectedInvoice for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderSelectedInvoice() {
// Original L393: Completes this application statement, applying the shown value or operation to the current page state/data record.
    selectedItemIndex = null;
// Original L394: Completes this application statement, applying the shown value or operation to the current page state/data record.
    populateInvoiceDetails(getSelectedInvoice());
// Original L395: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderOpenInvoices();
// Original L396: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L397: Blank line separates related statements and has no runtime effect.

// Original L398: Defines the private helper selectItemRow for this page; keeping it local prevents unrelated pages from depending on UI details.
  function selectItemRow(event) {
// Original L399: Stores row, value; later code reuses this result so the invoice.js workflow stays consistent.
    const row = event.target.closest('tr[data-item-index]');
// Original L400: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!row) return;
// Original L401: Blank line separates related statements and has no runtime effect.

// Original L402: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    invoiceBody.querySelectorAll('tr.selected-item').forEach(selectedRow => {
// Original L403: Completes this application statement, applying the shown value or operation to the current page state/data record.
      selectedRow.classList.remove('selected-item');
// Original L404: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L405: Completes this application statement, applying the shown value or operation to the current page state/data record.
    row.classList.add('selected-item');
// Original L406: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
    selectedItemIndex = Number(row.dataset.itemIndex);
// Original L407: Completes this application statement, applying the shown value or operation to the current page state/data record.
    updateItemActionButtons();
// Original L408: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L409: Blank line separates related statements and has no runtime effect.

// Original L410: Defines the private helper updateItemActionButtons for this page; keeping it local prevents unrelated pages from depending on UI details.
  function updateItemActionButtons() {
// Original L411: Stores selectedItem, value; later code reuses this result so the invoice.js workflow stays consistent.
    const selectedItem = getSelectedInvoice()?.items?.[selectedItemIndex];
// Original L412: Stores hasSelectedItem, value; later code reuses this result so the invoice.js workflow stays consistent.
    const hasSelectedItem = Boolean(selectedItem && !selectedItem.shiftId);
// Original L413: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editItemBtn.disabled = !hasSelectedItem;
// Original L414: Completes this application statement, applying the shown value or operation to the current page state/data record.
    removeItemBtn.disabled = !hasSelectedItem;
// Original L415: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L416: Blank line separates related statements and has no runtime effect.

// Original L417: Defines the private helper populateInvoiceDetails for this page; keeping it local prevents unrelated pages from depending on UI details.
  function populateInvoiceDetails(invoice) {
// Original L418: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderShiftLinks(invoice);
// Original L419: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      try {
// Original L420: Stores totalCell, DOM query used to find the totalCell elements; later code reuses this result so the invoice.js workflow stays consistent.
        const totalCell = document.querySelector('tfoot strong');
// Original L421: Stores invTable, DOM reference to the invTable control; later code reuses this result so the invoice.js workflow stays consistent.
        const invTable = document.getElementById('inv-table');
// Original L422: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        invoiceBody.innerHTML = '';
// Original L423: Completes this application statement, applying the shown value or operation to the current page state/data record.
        selectedItemIndex = null;
// Original L424: Completes this application statement, applying the shown value or operation to the current page state/data record.
        updateItemActionButtons();
// Original L425: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
        invoiceDateInput.value = invoice ? invoice.date || '' : '';
// Original L426: Completes this application statement, applying the shown value or operation to the current page state/data record.
        invoiceDateInput.disabled = !invoice;
// Original L427: Blank line separates related statements and has no runtime effect.
    
// Original L428: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (!invoice) {
// Original L429: Writes user-visible status/markup into the page, reflecting the current data or validation result.
          invoiceBody.innerHTML = '<tr><td colspan="3">No invoice selected</td></tr>';
// Original L430: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (totalCell) totalCell.textContent = 'Total: $0.00';
// Original L431: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (paidLabel) paidLabel.innerHTML = '';
// Original L432: Completes this application statement, applying the shown value or operation to the current page state/data record.
          return;
// Original L433: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L434: Blank line separates related statements and has no runtime effect.
        
// Original L435: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (totalCell) {
// Original L436: Writes user-visible status/markup into the page, reflecting the current data or validation result.
          totalCell.textContent = `Total: ${formatCurrency(invoice.totalBill())}`;
// Original L437: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L438: Blank line separates related statements and has no runtime effect.
    
// Original L439: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (paidLabel) {
// Original L440: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (invoice.isPaid) {
// Original L441: Writes user-visible status/markup into the page, reflecting the current data or validation result.
            paidLabel.innerHTML = `<td colspan="3">PAID</td>`;
// Original L442: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
            if (invTable) {
// Original L443: Completes this application statement, applying the shown value or operation to the current page state/data record.
              document.getElementById('inv-table').classList.add('is-paid');
// Original L444: Closes the surrounding block or callback; no additional operation occurs on this line.
            }
// Original L445: Provides the alternate branch when the preceding condition is not satisfied.
          } else {
// Original L446: Writes user-visible status/markup into the page, reflecting the current data or validation result.
// Original L447: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
// Original L448: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
// Original L449: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
// Original L450: Completes this application statement, applying the shown value or operation to the current page state/data record.
            paidLabel.innerHTML = `
              <td colspan="3">
                <button id="mark-paid-btn" type="button">Mark Paid</button>
              </td>
            `;
// Original L451: Stores markPaidBtn, DOM query used to find the markPaidBtn elements; later code reuses this result so the invoice.js workflow stays consistent.
            const markPaidBtn = paidLabel.querySelector('#mark-paid-btn');
// Original L452: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
            if (markPaidBtn) {
// Original L453: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
              markPaidBtn.addEventListener('click', async () => {
// Original L454: Completes this application statement, applying the shown value or operation to the current page state/data record.
                invoice.isPaid = true;
// Original L455: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
                await store.saveInvoice(invoice);
// Original L456: Completes this application statement, applying the shown value or operation to the current page state/data record.
                renderInvoiceList(invoice.id);
// Original L457: Sets the }, { once property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
              }, { once: true });
// Original L458: Closes the surrounding block or callback; no additional operation occurs on this line.
            }
// Original L459: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
            if (invTable) {
// Original L460: Completes this application statement, applying the shown value or operation to the current page state/data record.
              invTable.classList.remove('is-paid');
// Original L461: Closes the surrounding block or callback; no additional operation occurs on this line.
            }
// Original L462: Closes the surrounding block or callback; no additional operation occurs on this line.
          }
// Original L463: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L464: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
      } catch (e) {
// Original L465: Completes this application statement, applying the shown value or operation to the current page state/data record.
        console.log(`${e}`);
// Original L466: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L467: Blank line separates related statements and has no runtime effect.

// Original L468: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!invoice.items || invoice.items.length === 0) {
// Original L469: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      invoiceBody.innerHTML = '<tr><td colspan="3">No items in this invoice</td></tr>';
// Original L470: Provides the alternate branch when the preceding condition is not satisfied.
    } else {
// Original L471: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      invoice.items.forEach((item, index) => {
// Original L472: Stores row, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
        const row = document.createElement('tr');
// Original L473: Completes this application statement, applying the shown value or operation to the current page state/data record.
        row.dataset.itemIndex = index;
// Original L474: Completes this application statement, applying the shown value or operation to the current page state/data record.
        row.dataset.sortItem = item.name || '';
// Original L475: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
        row.dataset.sortValue = String(Number(item.value || 0));
// Original L476: Sets `row.title` (the title property of row) to checks `item.shiftId` (the shift id property of item); if true chooses "This labor line is generated from a linked work shift; edit it in the Work shifts and labor section.", otherwise "Click to select this item for editing or removal".
        row.title = item.shiftId
// Original L477: Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
          ? 'This labor line is generated from a linked work shift; edit it in the Work shifts and labor section.'
// Original L478: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
          : 'Click to select this item for editing or removal';
// Original L479: Stores nameCell, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
        const nameCell = document.createElement('td');
// Original L480: Completes this application statement, applying the shown value or operation to the current page state/data record.
        nameCell.colSpan = 2;
// Original L481: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        nameCell.textContent = item.name || '';
// Original L482: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (item.shiftId) {
// Original L483: Stores sourceShift, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
          const sourceShift = store.shifts.find(shift => String(shift.id) === String(item.shiftId));
// Original L484: Stores status, value; later code reuses this result so the invoice.js workflow stays consistent.
          const status = shiftInvoiceLineStatus(item, sourceShift);
// Original L485: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (status !== 'current') {
// Original L486: Stores warning, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
            const warning = document.createElement('small');
// Original L487: Completes this application statement, applying the shown value or operation to the current page state/data record.
            warning.className = `invoice-line-warning is-${status}`;
// Original L488: Writes user-visible status/markup into the page, reflecting the current data or validation result.
            warning.textContent = status === 'changed'
// Original L489: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
              ? `Source shift changed after billing. Saved snapshot remains ${Number(item.billedHours ?? item.actualHours ?? 0).toFixed(2)} h × $${Number(item.billingRate ?? 0).toFixed(2)}/h.`
// Original L490: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
              : status === 'missing'
// Original L491: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
                ? `Source shift ${item.shiftId} is missing. Saved billed hours and rate are retained.`
// Original L492: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
                : 'This older labor line has no shift snapshot, so source changes cannot be verified.';
// Original L493: Builds the page structure from DOM nodes and replaces stale results with the current records.
            nameCell.appendChild(document.createElement('br'));
// Original L494: Builds the page structure from DOM nodes and replaces stale results with the current records.
            nameCell.appendChild(warning);
// Original L495: Closes the surrounding block or callback; no additional operation occurs on this line.
          }
// Original L496: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L497: Stores valueCell, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.
        const valueCell = document.createElement('td');
// Original L498: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        valueCell.textContent = formatCurrency(item.value || 0);
// Original L499: Builds the page structure from DOM nodes and replaces stale results with the current records.
        row.append(nameCell, valueCell);
// Original L500: Builds the page structure from DOM nodes and replaces stale results with the current records.
        invoiceBody.appendChild(row);
// Original L501: Completes this application statement, applying the shown value or operation to the current page state/data record.
      });
// Original L502: Completes this application statement, applying the shown value or operation to the current page state/data record.
      sortInvoiceRows();
// Original L503: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L504: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L505: Blank line separates related statements and has no runtime effect.

// Original L506: Defines the private helper openItemModal for this page; keeping it local prevents unrelated pages from depending on UI details.
  function openItemModal(invoice, itemIndex = null) {
// Original L507: Stores modal, DOM reference to the modal control; later code reuses this result so the invoice.js workflow stays consistent.
    const modal = document.getElementById('item-modal');
// Original L508: Stores nameInput, DOM reference to the nameInput control; later code reuses this result so the invoice.js workflow stays consistent.
    const nameInput = document.getElementById('name-input');
// Original L509: Stores valueInput, DOM reference to the valueInput control; later code reuses this result so the invoice.js workflow stays consistent.
    const valueInput = document.getElementById('value-input');
// Original L510: Stores itemForm, DOM reference to the itemForm control; later code reuses this result so the invoice.js workflow stays consistent.
    const itemForm = document.getElementById('add-item-form');
// Original L511: Stores modalTitle, DOM reference to the modalTitle control; later code reuses this result so the invoice.js workflow stays consistent.
    const modalTitle = document.getElementById('item-modal-title');
// Original L512: Stores formError, DOM reference to the formError control; later code reuses this result so the invoice.js workflow stays consistent.
    const formError = document.getElementById('item-form-error');
// Original L513: Stores submitButton, DOM reference to the submitButton control; later code reuses this result so the invoice.js workflow stays consistent.
    const submitButton = document.getElementById('submit-btn');
// Original L514: Blank line separates related statements and has no runtime effect.

// Original L515: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!modal || !nameInput || !valueInput || !itemForm || !modalTitle || !formError || !submitButton) return;
// Original L516: Blank line separates related statements and has no runtime effect.

// Original L517: Stores isEditing, value; later code reuses this result so the invoice.js workflow stays consistent.
    const isEditing = Number.isInteger(itemIndex);
// Original L518: Stores originalItem, value; later code reuses this result so the invoice.js workflow stays consistent.
    const originalItem = isEditing ? invoice.items[itemIndex] : null;
// Original L519: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (isEditing && (!originalItem || originalItem.shiftId)) return;
// Original L520: Stores originalItemSnapshot, value; later code reuses this result so the invoice.js workflow stays consistent.
    const originalItemSnapshot = originalItem ? { name: originalItem.name, value: originalItem.value } : null;
// Original L521: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    modalTitle.textContent = isEditing ? 'Edit invoice item' : 'Add invoice item';
// Original L522: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    submitButton.textContent = isEditing ? 'Save changes' : 'Add';
// Original L523: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    nameInput.value = originalItem?.name || '';
// Original L524: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    valueInput.value = originalItem ? Number(originalItem.value || 0) : '';
// Original L525: Completes this application statement, applying the shown value or operation to the current page state/data record.
    formError.hidden = true;
// Original L526: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    formError.textContent = '';
// Original L527: Completes this application statement, applying the shown value or operation to the current page state/data record.
    modal.showModal();
// Original L528: Blank line separates related statements and has no runtime effect.

// Original L529: Stores closeModal, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const closeModal = () => {
// Original L530: Completes this application statement, applying the shown value or operation to the current page state/data record.
      itemForm.onreset = null;
// Original L531: Completes this application statement, applying the shown value or operation to the current page state/data record.
      itemForm.reset();
// Original L532: Completes this application statement, applying the shown value or operation to the current page state/data record.
      itemForm.onreset = handleReset;
// Original L533: Completes this application statement, applying the shown value or operation to the current page state/data record.
      formError.hidden = true;
// Original L534: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      formError.textContent = '';
// Original L535: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (modal.open) modal.close();
// Original L536: Closes the surrounding block or callback; no additional operation occurs on this line.
    };
// Original L537: Blank line separates related statements and has no runtime effect.

// Original L538: Stores handleReset, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.
    const handleReset = event => {
// Original L539: Completes this application statement, applying the shown value or operation to the current page state/data record.
      event.preventDefault();
// Original L540: Completes this application statement, applying the shown value or operation to the current page state/data record.
      closeModal();
// Original L541: Closes the surrounding block or callback; no additional operation occurs on this line.
    };
// Original L542: Blank line separates related statements and has no runtime effect.

// Original L543: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    itemForm.onsubmit = async event => {
// Original L544: Completes this application statement, applying the shown value or operation to the current page state/data record.
      event.preventDefault();
// Original L545: Blank line separates related statements and has no runtime effect.

// Original L546: Stores name, value; later code reuses this result so the invoice.js workflow stays consistent.
      const name = nameInput.value.trim();
// Original L547: Stores value, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.
      const value = Number(valueInput.value);
// Original L548: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!name || !Number.isFinite(value)) {
// Original L549: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        formError.textContent = 'Enter an item name and a valid amount.';
// Original L550: Completes this application statement, applying the shown value or operation to the current page state/data record.
        formError.hidden = false;
// Original L551: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L552: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L553: Blank line separates related statements and has no runtime effect.

// Original L554: Creates mutable addedItem state for this workflow; it changes as the user selects, edits, or loads records.
      let addedItem = null;
// Original L555: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      try {
// Original L556: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (isEditing) {
// Original L557: Completes this application statement, applying the shown value or operation to the current page state/data record.
          originalItem.name = name;
// Original L558: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
          originalItem.value = value;
// Original L559: Provides the alternate branch when the preceding condition is not satisfied.
        } else if (typeof invoice.addItem === 'function') {
// Original L560: Completes this application statement, applying the shown value or operation to the current page state/data record.
          invoice.addItem(name, value);
// Original L561: Completes this application statement, applying the shown value or operation to the current page state/data record.
          addedItem = invoice.items[invoice.items.length - 1];
// Original L562: Provides the alternate branch when the preceding condition is not satisfied.
        } else {
// Original L563: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (!invoice.items) invoice.items = [];
// Original L564: Completes this application statement, applying the shown value or operation to the current page state/data record.
          addedItem = { name, value };
// Original L565: Completes this application statement, applying the shown value or operation to the current page state/data record.
          invoice.items.push(addedItem);
// Original L566: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L567: Blank line separates related statements and has no runtime effect.

// Original L568: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        await store.saveInvoice(invoice);
// Original L569: Completes this application statement, applying the shown value or operation to the current page state/data record.
        closeModal();
// Original L570: Completes this application statement, applying the shown value or operation to the current page state/data record.
        selectedItemIndex = null;
// Original L571: Completes this application statement, applying the shown value or operation to the current page state/data record.
        populateInvoiceDetails(invoice);
// Original L572: Completes this application statement, applying the shown value or operation to the current page state/data record.
        renderOpenInvoices();
// Original L573: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
      } catch (error) {
// Original L574: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (isEditing) {
// Original L575: Completes this application statement, applying the shown value or operation to the current page state/data record.
          originalItem.name = originalItemSnapshot.name;
// Original L576: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
          originalItem.value = originalItemSnapshot.value;
// Original L577: Provides the alternate branch when the preceding condition is not satisfied.
        } else if (addedItem) {
// Original L578: Completes this application statement, applying the shown value or operation to the current page state/data record.
          invoice.items = invoice.items.filter(item => item !== addedItem);
// Original L579: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L580: Sets the console.error('Error saving invoice item property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        console.error('Error saving invoice item:', error);
// Original L581: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        formError.textContent = 'Unable to save this item. Please try again.';
// Original L582: Completes this application statement, applying the shown value or operation to the current page state/data record.
        formError.hidden = false;
// Original L583: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L584: Closes the surrounding block or callback; no additional operation occurs on this line.
    };
// Original L585: Blank line separates related statements and has no runtime effect.

// Original L586: Completes this application statement, applying the shown value or operation to the current page state/data record.
    itemForm.onreset = handleReset;
// Original L587: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L588: Completes this application statement, applying the shown value or operation to the current page state/data record.
});
