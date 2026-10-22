# scripts/invoice.js

[Exact copy](../../original/scripts/invoice.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import {
```

Loads the named module so its side effects or exports are available to this page.

### Line 2

```text
  store,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 3

```text
  populateCustomerDropdowns,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 4

```text
  Invoice
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 5

```text
} from './models.js';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 6

```text
import {
```

Loads the named module so its side effects or exports are available to this page.

### Line 7

```text
  invoiceShiftIds as getInvoiceShiftIds,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 8

```text
  makeShiftInvoiceLine,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 9

```text
  shiftInvoiceLineStatus,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 10

```text
  shiftIsAttachedElsewhere
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 11

```text
} from './domain.mjs';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 12

```text
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';
```

Imports initializeTableSorting, sortTableRows from ./table-sort.mjs; these helpers provide the UI utility this module uses.

### Line 13

```text

```

Blank line separates related statements and has no runtime effect.

### Line 14

```text

```

Blank line separates related statements and has no runtime effect.

### Line 15

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.

### Line 16

```text
  await store.init();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 17

```text

```

Blank line separates related statements and has no runtime effect.

### Line 18

```text
  const custSelect = document.getElementById('cust-select');
```

Stores custSelect, DOM reference to the custSelect control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 19

```text
  const invList = document.getElementById('inv-select');
```

Stores invList, DOM reference to the invList control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 20

```text
  const addItemBtn = document.getElementById('add-item-btn');
```

Stores addItemBtn, DOM reference to the addItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 21

```text
  const editItemBtn = document.getElementById('edit-item-btn');
```

Stores editItemBtn, DOM reference to the editItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 22

```text
  const removeItemBtn = document.getElementById('remove-item-btn');
```

Stores removeItemBtn, DOM reference to the removeItemBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 23

```text
  const addInvBtn = document.getElementById('add-inv-btn');
```

Stores addInvBtn, DOM reference to the addInvBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 24

```text
  const deleteInvBtn = document.getElementById('delete-inv-btn');
```

Stores deleteInvBtn, DOM reference to the deleteInvBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 25

```text
  const invoiceBody = document.getElementById('invoice-table-body');
```

Stores invoiceBody, DOM reference to the invoiceBody control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 26

```text
  const paidLabel = document.getElementById('paid-notice');
```

Stores paidLabel, DOM reference to the paidLabel control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 27

```text
  const openDiv = document.getElementById('open-div');
```

Stores openDiv, DOM reference to the openDiv control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 28

```text
  const invoiceDateInput = document.getElementById('invoice-date');
```

Stores invoiceDateInput, DOM reference to the invoiceDateInput control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 29

```text
  const shiftLinkList = document.getElementById('shift-link-list');
```

Stores shiftLinkList, DOM reference to the shiftLinkList control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 30

```text
  const shiftLinkError = document.getElementById('shift-link-error');
```

Stores shiftLinkError, DOM reference to the shiftLinkError control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 31

```text
  const saveShiftLinksBtn = document.getElementById('save-shift-links-btn');
```

Stores saveShiftLinksBtn, DOM reference to the saveShiftLinksBtn control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 32

```text
  const invoiceTable = document.getElementById('inv-table');
```

Stores invoiceTable, DOM reference to the invoiceTable control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 33

```text

```

Blank line separates related statements and has no runtime effect.

### Line 34

```text
  if (!custSelect || !invList || !addItemBtn || !editItemBtn || !removeItemBtn ||
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 35

```text
      !addInvBtn || !deleteInvBtn || !invoiceBody || !invoiceDateInput || !openDiv ||
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 36

```text
      !shiftLinkList || !shiftLinkError || !saveShiftLinksBtn) return;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 37

```text

```

Blank line separates related statements and has no runtime effect.

### Line 38

```text
  let selectedItemIndex = null;
```

Creates mutable selectedItemIndex state for this workflow; it changes as the user selects, edits, or loads records.

### Line 39

```text
  let invoiceSort = null;
```

Creates mutable invoiceSort state for this workflow; it changes as the user selects, edits, or loads records.

### Line 40

```text

```

Blank line separates related statements and has no runtime effect.

### Line 41

```text
  initializeTableSorting(invoiceTable, {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 42

```text
    onSort: sort => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 43

```text
      invoiceSort = sort;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 44

```text
      sortInvoiceRows();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 45

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 46

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 47

```text

```

Blank line separates related statements and has no runtime effect.

### Line 48

```text
  // Populate customers dropdown
```

This comment documents the design intent here: Populate customers dropdown.

### Line 49

```text
  populateCustomerDropdowns(custSelect);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 50

```text

```

Blank line separates related statements and has no runtime effect.

### Line 51

```text
  custSelect.addEventListener('change', () => renderInvoiceList());
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 52

```text
  invList.addEventListener('change', renderSelectedInvoice);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 53

```text
  invoiceBody.addEventListener('click', selectItemRow);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 54

```text
  openDiv.addEventListener('click', event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 55

```text
    const button = event.target.closest('button[data-invoice-id]');
```

Stores button, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 56

```text
    if (!button) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 57

```text
    const invoice = store.invoices.find(candidate => String(candidate.id) === button.dataset.invoiceId);
```

Stores invoice, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 58

```text
    if (!invoice?.customer?.id) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 59

```text
    custSelect.value = String(invoice.customer.id);
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 60

```text
    renderInvoiceList(invoice.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 61

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 62

```text
  saveShiftLinksBtn.addEventListener('click', saveShiftLinks);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 63

```text
  invoiceDateInput.addEventListener('change', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 64

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 65

```text
    if (!invoice) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 66

```text

```

Blank line separates related statements and has no runtime effect.

### Line 67

```text
    const previousDate = invoice.date;
```

Stores previousDate, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 68

```text
    invoice.date = invoiceDateInput.value || null;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 69

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 70

```text
      await store.saveInvoice(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 71

```text
      renderInvoiceList(invoice.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 72

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 73

```text
      invoice.date = previousDate;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 74

```text
      invoiceDateInput.value = previousDate || '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 75

```text
      console.error('Error saving invoice date:', error);
```

Sets the console.error('Error saving invoice date property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 76

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 77

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 78

```text

```

Blank line separates related statements and has no runtime effect.

### Line 79

```text
  addInvBtn.addEventListener('click', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 80

```text
    const custId = custSelect.value;
```

Stores custId, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 81

```text
    let customer = null;
```

Creates mutable customer state for this workflow; it changes as the user selects, edits, or loads records.

### Line 82

```text

```

Blank line separates related statements and has no runtime effect.

### Line 83

```text
    if (store.customers instanceof Map) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 84

```text
      customer = store.customers.get(custId) || store.customers.get(Number(custId));
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 85

```text
    } else if (typeof store.customers === 'object' && store.customers !== null) {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 86

```text
      customer = store.customers[custId];
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 87

```text
    } else if (Array.isArray(store.customers)) {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 88

```text
      customer = store.customers.find(c => String(c.id) === String(custId));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 89

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 90

```text

```

Blank line separates related statements and has no runtime effect.

### Line 91

```text
    if (!customer) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 92

```text

```

Blank line separates related statements and has no runtime effect.

### Line 93

```text
    const newInvoice = new Invoice(customer);
```

Stores newInvoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 94

```text
    await store.saveInvoice(newInvoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 95

```text
    if (Array.isArray(store.invoices)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 96

```text
      store.invoices.push(newInvoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 97

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 98

```text
    renderInvoiceList(newInvoice.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 99

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 100

```text

```

Blank line separates related statements and has no runtime effect.

### Line 101

```text
  deleteInvBtn.addEventListener('click', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 102

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 103

```text
    if (!invoice) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 104

```text

```

Blank line separates related statements and has no runtime effect.

### Line 105

```text
    const invoiceLabel = shortInvoiceId(invoice.id);
```

Stores invoiceLabel, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 106

```text
    if (!window.confirm(`Delete invoice #${invoiceLabel}? This cannot be undone.`)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 107

```text

```

Blank line separates related statements and has no runtime effect.

### Line 108

```text
    await store.deleteInvoice(invoice.id);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 109

```text
    selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 110

```text
    renderInvoiceList();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 111

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 112

```text

```

Blank line separates related statements and has no runtime effect.

### Line 113

```text
  addItemBtn.addEventListener('click', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 114

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 115

```text
    if (invoice) openItemModal(invoice);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 116

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 117

```text

```

Blank line separates related statements and has no runtime effect.

### Line 118

```text
  editItemBtn.addEventListener('click', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 119

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 120

```text
    const item = invoice?.items?.[selectedItemIndex];
```

Stores item, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 121

```text
    if (invoice && item) openItemModal(invoice, selectedItemIndex);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 122

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 123

```text

```

Blank line separates related statements and has no runtime effect.

### Line 124

```text
  removeItemBtn.addEventListener('click', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 125

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 126

```text
    if (!invoice || selectedItemIndex === null) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 127

```text

```

Blank line separates related statements and has no runtime effect.

### Line 128

```text
    const item = invoice.items[selectedItemIndex];
```

Stores item, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 129

```text
    if (!item) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 130

```text
    if (item.shiftId) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 131

```text

```

Blank line separates related statements and has no runtime effect.

### Line 132

```text
    if (!window.confirm(`Remove “${item.name}” from this invoice?`)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 133

```text

```

Blank line separates related statements and has no runtime effect.

### Line 134

```text
    invoice.items.splice(selectedItemIndex, 1);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 135

```text
    await store.saveInvoice(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 136

```text
    selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 137

```text
    populateInvoiceDetails(invoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 138

```text
    renderOpenInvoices();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 139

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 140

```text

```

Blank line separates related statements and has no runtime effect.

### Line 141

```text
  renderInvoiceList();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 142

```text

```

Blank line separates related statements and has no runtime effect.

### Line 143

```text
  function getSelectedInvoice() {
```

Defines the private helper getSelectedInvoice for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 144

```text
    if (!Array.isArray(store.invoices)) return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 145

```text
    return store.invoices.find(invoice => String(invoice.id) === String(invList.value)) || null;
```

Returns uses returns the first item of `store.invoices` (the invoices property of store) matching a callback taking invoice that checks that converts `invoice.id` to text and converts `invList.value` to text have the same value and type, or undefined when it is truthy, otherwise falls back to null to the caller and exits this function.

### Line 146

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 147

```text

```

Blank line separates related statements and has no runtime effect.

### Line 148

```text
  function sortInvoiceRows() {
```

Defines the private helper sortInvoiceRows for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 149

```text
    const rows = [...invoiceBody.querySelectorAll('tr[data-item-index]')];
```

Stores rows, DOM query used to find the rows elements; later code reuses this result so the invoice.js workflow stays consistent.

### Line 150

```text
    const sortedRows = invoiceSort
```

Stores sortedRows, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 151

```text
      ? sortTableRows(rows, {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 152

```text
          ...invoiceSort,
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 153

```text
          getValue: (row, key) => key === 'item' ? row.dataset.sortItem : row.dataset.sortValue
```

Sets the getValue property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 154

```text
        })
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 155

```text
      : rows.sort((a, b) => Number(a.dataset.itemIndex) - Number(b.dataset.itemIndex));
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 156

```text
    sortedRows.forEach(row => invoiceBody.appendChild(row));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 157

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 158

```text

```

Blank line separates related statements and has no runtime effect.

### Line 159

```text
  function shortInvoiceId(id) {
```

Defines the private helper shortInvoiceId for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 160

```text
    return String(id).slice(-6);
```

Returns copies a portion of converts `id` (id) to text, from changes the numeric sign of 6 to the end to the caller and exits this function.

### Line 161

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 162

```text

```

Blank line separates related statements and has no runtime effect.

### Line 163

```text
  function formatCurrency(value) {
```

Defines the private helper formatCurrency for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 164

```text
    const amount = Number(value);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 165

```text
    if (!Number.isFinite(amount)) return '$0.00';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 166

```text
    return amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`;
```

Returns checks checks whether `amount` (amount) is less than 0; if true chooses a text template that combines fixed text with computed values formats gets the nonnegative magnitude of `amount` (amount) as text with 2 digits after the decimal point, otherwise a text template that combines fixed text with computed values formats `amount` (amount) as text with 2 digits after the decimal point to the caller and exits this function.

### Line 167

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 168

```text

```

Blank line separates related statements and has no runtime effect.

### Line 169

```text
  function formatInvoiceDate(date) {
```

Defines the private helper formatInvoiceDate for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 170

```text
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Date not set';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 171

```text
    const [year, month, day] = date.split('-').map(Number);
```

Stores destructured values, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 172

```text
    const parsed = new Date(year, month - 1, day);
```

Stores parsed, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the invoice.js workflow stays consistent.

### Line 173

```text
    if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return 'Date not set';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 174

```text
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
```

Returns calls `parsed.toLocaleDateString` with `undefined` (undefined); an object with fields year: "numeric"; month: "short"; day: "numeric" to the caller and exits this function.

### Line 175

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 176

```text

```

Blank line separates related statements and has no runtime effect.

### Line 177

```text
  function makeElement(tag, className = '', text = undefined) {
```

Defines the private helper makeElement for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 178

```text
    const element = document.createElement(tag);
```

Stores element, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 179

```text
    if (className) element.className = className;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 180

```text
    if (text !== undefined) element.textContent = text;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 181

```text
    return element;
```

Returns `element` (element) to the caller and exits this function.

### Line 182

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 183

```text

```

Blank line separates related statements and has no runtime effect.

### Line 184

```text
  function renderOpenInvoices() {
```

Defines the private helper renderOpenInvoices for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 185

```text
    openDiv.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 186

```text
    const openInvoices = (store.invoices || []).filter(invoice => !invoice.isPaid);
```

Stores openInvoices, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 187

```text
    const heading = makeElement('p', '', `${openInvoices.length} open ${openInvoices.length === 1 ? 'invoice' : 'invoices'}`);
```

Stores heading, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 188

```text
    openDiv.appendChild(heading);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 189

```text
    if (openInvoices.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 190

```text
      openDiv.appendChild(makeElement('p', 'muted-copy', 'No open invoices.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 191

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 192

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 193

```text

```

Blank line separates related statements and has no runtime effect.

### Line 194

```text
    openInvoices.sort((a, b) => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 195

```text
      const dateA = /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') ? a.date : '9999-99-99';
```

Stores dateA, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.

### Line 196

```text
      const dateB = /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : '9999-99-99';
```

Stores dateB, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.

### Line 197

```text
      return dateA.localeCompare(dateB) || String(a.customer?.name || '').localeCompare(String(b.customer?.name || ''));
```

Returns uses calls `dateA.localeCompare` with `dateB` (date b) when it is truthy, otherwise falls back to calls `String(a.customer?.name || '').localeCompare` with converts uses `b.customer?.name`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to text to the caller and exits this function.

### Line 198

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 199

```text
    const list = makeElement('ul', 'open-invoice-list');
```

Stores list, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 200

```text
    openInvoices.forEach(invoice => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 201

```text
      const item = document.createElement('li');
```

Stores item, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 202

```text
      const total = formatCurrency(invoice.totalBill());
```

Stores total, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 203

```text
      const button = makeElement('button', 'open-invoice-button',
```

Stores button, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 204

```text
        `#${shortInvoiceId(invoice.id)} · ${invoice.customer?.name || 'Customer'} · ${formatInvoiceDate(invoice.date)} · ${total}`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 205

```text
      button.type = 'button';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 206

```text
      button.dataset.invoiceId = invoice.id;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 207

```text
      button.setAttribute('aria-label', `Open invoice ${shortInvoiceId(invoice.id)} for ${invoice.customer?.name || 'customer'}, dated ${formatInvoiceDate(invoice.date)}, total ${total}`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 208

```text
      if (String(getSelectedInvoice()?.id) === String(invoice.id)) button.setAttribute('aria-current', 'true');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 209

```text
      item.appendChild(button);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 210

```text
      list.appendChild(item);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 211

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 212

```text
    openDiv.appendChild(list);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 213

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 214

```text

```

Blank line separates related statements and has no runtime effect.

### Line 215

```text
  function invoiceShiftIds(invoice) {
```

Defines the private helper invoiceShiftIds for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 216

```text
    return getInvoiceShiftIds(invoice);
```

Returns calls `getInvoiceShiftIds` with `invoice` (invoice) to the caller and exits this function.

### Line 217

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 218

```text

```

Blank line separates related statements and has no runtime effect.

### Line 219

```text
  function shiftIsLinkedElsewhere(shiftId, invoiceId) {
```

Defines the private helper shiftIsLinkedElsewhere for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 220

```text
    return shiftIsAttachedElsewhere(store.invoices, shiftId, invoiceId);
```

Returns calls `shiftIsAttachedElsewhere` with `store.invoices` (the invoices property of store); `shiftId` (shift id); `invoiceId` (invoice id) to the caller and exits this function.

### Line 221

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 222

```text

```

Blank line separates related statements and has no runtime effect.

### Line 223

```text
  function updateShiftLinkSaveState(invoice) {
```

Defines the private helper updateShiftLinkSaveState for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 224

```text
    const currentIds = invoiceShiftIds(invoice);
```

Stores currentIds, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 225

```text
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
```

Stores selectedIds, DOM query used to find the selectedIds elements; later code reuses this result so the invoice.js workflow stays consistent.

### Line 226

```text
    const changed = currentIds.size !== selectedIds.size || [...currentIds].some(id => !selectedIds.has(id));
```

Stores changed, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 227

```text
    saveShiftLinksBtn.disabled = !invoice || invoice.isPaid || !changed;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 228

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 229

```text

```

Blank line separates related statements and has no runtime effect.

### Line 230

```text
  function renderShiftLinks(invoice) {
```

Defines the private helper renderShiftLinks for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 231

```text
    shiftLinkList.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 232

```text
    shiftLinkError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 233

```text
    if (!invoice) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 234

```text
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Select an invoice to view eligible shifts.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 235

```text
      saveShiftLinksBtn.disabled = true;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 236

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 237

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 238

```text
    if (!invoice.customer?.id) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 239

```text
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice has no customer attached.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 240

```text
      saveShiftLinksBtn.disabled = true;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 241

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 242

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 243

```text

```

Blank line separates related statements and has no runtime effect.

### Line 244

```text
    const linkedIds = invoiceShiftIds(invoice);
```

Stores linkedIds, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 245

```text
    const customerId = String(invoice.customer.id);
```

Stores customerId, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 246

```text
    const candidates = store.shifts.filter(shift =>
```

Stores candidates, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 247

```text
      shift.isComplete && String(shift.customer?.id) === customerId &&
```

Converts `shift.customer?.id` (the id property of shift.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to text.

### Line 248

```text
      (linkedIds.has(String(shift.id)) || !shiftIsLinkedElsewhere(shift.id, invoice.id))
```

Calls `linkedIds.has` with converts `shift.id` (the id property of shift) to text.

### Line 249

```text
    ).sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 250

```text
    const visibleIds = new Set();
```

Stores visibleIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the invoice.js workflow stays consistent.

### Line 251

```text
    const rateIsSet = invoice.customer.billingRate !== null && invoice.customer.billingRate !== undefined &&
```

Stores rateIsSet, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 252

```text
      Number.isFinite(Number(invoice.customer.billingRate)) && Number(invoice.customer.billingRate) >= 0;
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 253

```text
    if (!rateIsSet) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 254

```text
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Set this customer’s hourly billing rate in People Data before attaching new shifts.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 255

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 256

```text

```

Blank line separates related statements and has no runtime effect.

### Line 257

```text
    candidates.forEach(shift => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 258

```text
      const shiftId = String(shift.id);
```

Stores shiftId, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 259

```text
      visibleIds.add(shiftId);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 260

```text
      const hours = Number(shift.getHoursWorked());
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 261

```text
      const rate = rateIsSet ? Number(invoice.customer.billingRate) : null;
```

Stores rate, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 262

```text
      const amountText = rate === null ? 'rate not set' : `$${(rate * hours).toFixed(2)} at $${rate.toFixed(2)}/h`;
```

Stores amountText, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the invoice.js workflow stays consistent.

### Line 263

```text
      const workDate = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
```

Stores workDate, a date value used for local-day or period calculations; later code reuses this result so the invoice.js workflow stays consistent.

### Line 264

```text
        ? shift.clockInTime.toLocaleDateString()
```

Calls `shift.clockInTime.toLocaleDateString` with no arguments.

### Line 265

```text
        : 'Date not set';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 266

```text
      const label = makeElement('label', 'shift-link-option');
```

Stores label, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 267

```text
      const checkbox = document.createElement('input');
```

Stores checkbox, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 268

```text
      checkbox.type = 'checkbox';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 269

```text
      checkbox.dataset.shiftId = shiftId;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 270

```text
      checkbox.checked = linkedIds.has(shiftId);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 271

```text
      checkbox.disabled = Boolean(invoice.isPaid);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 272

```text
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 273

```text
      const description = makeElement('span', '',
```

Stores description, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 274

```text
        `${workDate} · ${shift.employee?.name || 'Employee'} · ${hours.toFixed(2)} actual h · ${amountText}`);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 275

```text
      label.append(checkbox, description);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 276

```text
      shiftLinkList.appendChild(label);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 277

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 278

```text

```

Blank line separates related statements and has no runtime effect.

### Line 279

```text
    linkedIds.forEach(shiftId => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 280

```text
      if (visibleIds.has(shiftId)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 281

```text
      const label = makeElement('label', 'shift-link-option');
```

Stores label, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 282

```text
      const checkbox = document.createElement('input');
```

Stores checkbox, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 283

```text
      checkbox.type = 'checkbox';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 284

```text
      checkbox.dataset.shiftId = shiftId;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 285

```text
      checkbox.checked = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 286

```text
      checkbox.disabled = Boolean(invoice.isPaid);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 287

```text
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 288

```text
      label.append(checkbox, makeElement('span', '', `Previously linked shift not found · ${shiftId}`));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 289

```text
      shiftLinkList.appendChild(label);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 290

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 291

```text

```

Blank line separates related statements and has no runtime effect.

### Line 292

```text
    if (candidates.length === 0 && linkedIds.size === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 293

```text
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'No unbilled completed shifts are available for this customer.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 294

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 295

```text
    if (invoice.isPaid) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 296

```text
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice is paid; linked shifts are read-only.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 297

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 298

```text
    updateShiftLinkSaveState(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 299

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 300

```text

```

Blank line separates related statements and has no runtime effect.

### Line 301

```text
  async function saveShiftLinks() {
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 302

```text
    const invoice = getSelectedInvoice();
```

Stores invoice, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 303

```text
    if (!invoice || invoice.isPaid) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 304

```text
    shiftLinkError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 305

```text
    const previousItems = invoice.items;
```

Stores previousItems, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 306

```text
    const previousShiftIds = invoice.shiftIds;
```

Stores previousShiftIds, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 307

```text
    const existingIds = invoiceShiftIds(invoice);
```

Stores existingIds, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 308

```text
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
```

Stores selectedIds, DOM query used to find the selectedIds elements; later code reuses this result so the invoice.js workflow stays consistent.

### Line 309

```text
    const additions = [...selectedIds].filter(id => !existingIds.has(id));
```

Stores additions, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 310

```text
    const rate = invoice.customer?.billingRate;
```

Stores rate, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 311

```text

```

Blank line separates related statements and has no runtime effect.

### Line 312

```text
    if (additions.length && (rate === null || rate === undefined || !Number.isFinite(Number(rate)) || Number(rate) < 0)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 313

```text
      shiftLinkError.textContent = 'Set a valid customer hourly billing rate before adding shifts.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 314

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 315

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 316

```text

```

Blank line separates related statements and has no runtime effect.

### Line 317

```text
    const newLaborItems = [];
```

Stores newLaborItems, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 318

```text
    for (const shiftId of additions) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 319

```text
      const shift = store.shifts.find(candidate => String(candidate.id) === shiftId);
```

Stores shift, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 320

```text
      if (!shift || !shift.isComplete || String(shift.customer?.id) !== String(invoice.customer?.id) ||
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 321

```text
          shiftIsLinkedElsewhere(shiftId, invoice.id)) {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 322

```text
        shiftLinkError.textContent = 'One of the selected shifts is no longer available. Refresh the invoice and try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 323

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 324

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 325

```text
      const hours = Number(shift.getHoursWorked());
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 326

```text
      if (!Number.isFinite(hours) || hours < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 327

```text
        shiftLinkError.textContent = 'A selected shift has invalid actual hours and cannot be billed.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 328

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 329

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 330

```text
      const hourlyRate = Number(rate);
```

Stores hourlyRate, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 331

```text
      const dateLabel = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
```

Stores dateLabel, a date value used for local-day or period calculations; later code reuses this result so the invoice.js workflow stays consistent.

### Line 332

```text
        ? shift.clockInTime.toLocaleDateString()
```

Calls `shift.clockInTime.toLocaleDateString` with no arguments.

### Line 333

```text
        : 'date not set';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 334

```text
      let line;
```

Creates mutable line state for this workflow; it changes as the user selects, edits, or loads records.

### Line 335

```text
      try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 336

```text
        line = makeShiftInvoiceLine(shift, hourlyRate);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 337

```text
      } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 338

```text
        shiftLinkError.textContent = error.message || 'This shift cannot be attached to the invoice.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 339

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 340

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 341

```text
      line.name = `Labor · ${dateLabel} · ${shift.employee?.name || 'Employee'} (${line.billedHours.toFixed(2)} h × $${line.billingRate.toFixed(2)}/h)`;
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 342

```text
      newLaborItems.push(line);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 343

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 344

```text

```

Blank line separates related statements and has no runtime effect.

### Line 345

```text
    saveShiftLinksBtn.disabled = true;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 346

```text
    saveShiftLinksBtn.textContent = 'Saving…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 347

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 348

```text
      invoice.items = previousItems.filter(item => !item.shiftId || selectedIds.has(String(item.shiftId))).concat(newLaborItems);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 349

```text
      invoice.shiftIds = [...selectedIds];
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 350

```text
      await store.saveInvoice(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 351

```text
      renderInvoiceList(invoice.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 352

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 353

```text
      invoice.items = previousItems;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 354

```text
      invoice.shiftIds = previousShiftIds;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 355

```text
      console.error('Unable to save linked shifts:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 356

```text
      shiftLinkError.textContent = 'Unable to update linked shifts. Please try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 357

```text
      updateShiftLinkSaveState(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 358

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 359

```text
      saveShiftLinksBtn.textContent = 'Update linked shifts';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 360

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 361

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 362

```text

```

Blank line separates related statements and has no runtime effect.

### Line 363

```text
  function renderInvoiceList(preferredInvoiceId = null) {
```

Defines the private helper renderInvoiceList for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 364

```text
    const customerId = custSelect.value;
```

Stores customerId, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 365

```text
    const customerInvoices = (store.invoices || []).filter(
```

Stores customerInvoices, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 366

```text
      invoice => invoice.customer && String(invoice.customer.id) === String(customerId)
```

Converts `invoice.customer.id` (the id property of invoice.customer) to text.

### Line 367

```text
    );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 368

```text

```

Blank line separates related statements and has no runtime effect.

### Line 369

```text
    invList.innerHTML = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 370

```text
    selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 371

```text

```

Blank line separates related statements and has no runtime effect.

### Line 372

```text
    if (!customerId || customerInvoices.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 373

```text
      invList.innerHTML = '<option value="">No invoices found</option>';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 374

```text
      populateInvoiceDetails(null);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 375

```text
      renderOpenInvoices();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 376

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 377

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 378

```text

```

Blank line separates related statements and has no runtime effect.

### Line 379

```text
    customerInvoices.forEach(invoice => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 380

```text
      const option = document.createElement('option');
```

Stores option, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 381

```text
      option.value = invoice.id;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 382

```text
      option.textContent = `Invoice #${shortInvoiceId(invoice.id)} - ${invoice.customer.name || 'Customer'} · ${formatInvoiceDate(invoice.date)}`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 383

```text
      invList.appendChild(option);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 384

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 385

```text

```

Blank line separates related statements and has no runtime effect.

### Line 386

```text
    const selectedInvoice = customerInvoices.find(invoice => String(invoice.id) === String(preferredInvoiceId)) || customerInvoices[0];
```

Stores selectedInvoice, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 387

```text
    invList.value = selectedInvoice.id;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 388

```text
    populateInvoiceDetails(selectedInvoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 389

```text
    renderOpenInvoices();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 390

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 391

```text

```

Blank line separates related statements and has no runtime effect.

### Line 392

```text
  function renderSelectedInvoice() {
```

Defines the private helper renderSelectedInvoice for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 393

```text
    selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 394

```text
    populateInvoiceDetails(getSelectedInvoice());
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 395

```text
    renderOpenInvoices();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 396

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 397

```text

```

Blank line separates related statements and has no runtime effect.

### Line 398

```text
  function selectItemRow(event) {
```

Defines the private helper selectItemRow for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 399

```text
    const row = event.target.closest('tr[data-item-index]');
```

Stores row, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 400

```text
    if (!row) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 401

```text

```

Blank line separates related statements and has no runtime effect.

### Line 402

```text
    invoiceBody.querySelectorAll('tr.selected-item').forEach(selectedRow => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 403

```text
      selectedRow.classList.remove('selected-item');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 404

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 405

```text
    row.classList.add('selected-item');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 406

```text
    selectedItemIndex = Number(row.dataset.itemIndex);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 407

```text
    updateItemActionButtons();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 408

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 409

```text

```

Blank line separates related statements and has no runtime effect.

### Line 410

```text
  function updateItemActionButtons() {
```

Defines the private helper updateItemActionButtons for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 411

```text
    const selectedItem = getSelectedInvoice()?.items?.[selectedItemIndex];
```

Stores selectedItem, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 412

```text
    const hasSelectedItem = Boolean(selectedItem && !selectedItem.shiftId);
```

Stores hasSelectedItem, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 413

```text
    editItemBtn.disabled = !hasSelectedItem;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 414

```text
    removeItemBtn.disabled = !hasSelectedItem;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 415

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 416

```text

```

Blank line separates related statements and has no runtime effect.

### Line 417

```text
  function populateInvoiceDetails(invoice) {
```

Defines the private helper populateInvoiceDetails for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 418

```text
      renderShiftLinks(invoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 419

```text
      try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 420

```text
        const totalCell = document.querySelector('tfoot strong');
```

Stores totalCell, DOM query used to find the totalCell elements; later code reuses this result so the invoice.js workflow stays consistent.

### Line 421

```text
        const invTable = document.getElementById('inv-table');
```

Stores invTable, DOM reference to the invTable control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 422

```text
        invoiceBody.innerHTML = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 423

```text
        selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 424

```text
        updateItemActionButtons();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 425

```text
        invoiceDateInput.value = invoice ? invoice.date || '' : '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 426

```text
        invoiceDateInput.disabled = !invoice;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 427

```text
    
```

Blank line separates related statements and has no runtime effect.

### Line 428

```text
        if (!invoice) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 429

```text
          invoiceBody.innerHTML = '<tr><td colspan="3">No invoice selected</td></tr>';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 430

```text
          if (totalCell) totalCell.textContent = 'Total: $0.00';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 431

```text
          if (paidLabel) paidLabel.innerHTML = '';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 432

```text
          return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 433

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 434

```text
        
```

Blank line separates related statements and has no runtime effect.

### Line 435

```text
        if (totalCell) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 436

```text
          totalCell.textContent = `Total: ${formatCurrency(invoice.totalBill())}`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 437

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 438

```text
    
```

Blank line separates related statements and has no runtime effect.

### Line 439

```text
        if (paidLabel) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 440

```text
          if (invoice.isPaid) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 441

```text
            paidLabel.innerHTML = `<td colspan="3">PAID</td>`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 442

```text
            if (invTable) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 443

```text
              document.getElementById('inv-table').classList.add('is-paid');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 444

```text
            }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 445

```text
          } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 446

```text
            paidLabel.innerHTML = `
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 447

```text
              <td colspan="3">
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 448

```text
                <button id="mark-paid-btn" type="button">Mark Paid</button>
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 449

```text
              </td>
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 450

```text
            `;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 451

```text
            const markPaidBtn = paidLabel.querySelector('#mark-paid-btn');
```

Stores markPaidBtn, DOM query used to find the markPaidBtn elements; later code reuses this result so the invoice.js workflow stays consistent.

### Line 452

```text
            if (markPaidBtn) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 453

```text
              markPaidBtn.addEventListener('click', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 454

```text
                invoice.isPaid = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 455

```text
                await store.saveInvoice(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 456

```text
                renderInvoiceList(invoice.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 457

```text
              }, { once: true });
```

Sets the }, { once property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 458

```text
            }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 459

```text
            if (invTable) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 460

```text
              invTable.classList.remove('is-paid');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 461

```text
            }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 462

```text
          }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 463

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 464

```text
      } catch (e) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 465

```text
        console.log(`${e}`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 466

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 467

```text

```

Blank line separates related statements and has no runtime effect.

### Line 468

```text
    if (!invoice.items || invoice.items.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 469

```text
      invoiceBody.innerHTML = '<tr><td colspan="3">No items in this invoice</td></tr>';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 470

```text
    } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 471

```text
      invoice.items.forEach((item, index) => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 472

```text
        const row = document.createElement('tr');
```

Stores row, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 473

```text
        row.dataset.itemIndex = index;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 474

```text
        row.dataset.sortItem = item.name || '';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 475

```text
        row.dataset.sortValue = String(Number(item.value || 0));
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 476

```text
        row.title = item.shiftId
```

Sets `row.title` (the title property of row) to checks `item.shiftId` (the shift id property of item); if true chooses "This labor line is generated from a linked work shift; edit it in the Work shifts and labor section.", otherwise "Click to select this item for editing or removal".

### Line 477

```text
          ? 'This labor line is generated from a linked work shift; edit it in the Work shifts and labor section.'
```

Continues the surrounding invoice.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 478

```text
          : 'Click to select this item for editing or removal';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 479

```text
        const nameCell = document.createElement('td');
```

Stores nameCell, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 480

```text
        nameCell.colSpan = 2;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 481

```text
        nameCell.textContent = item.name || '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 482

```text
        if (item.shiftId) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 483

```text
          const sourceShift = store.shifts.find(shift => String(shift.id) === String(item.shiftId));
```

Stores sourceShift, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 484

```text
          const status = shiftInvoiceLineStatus(item, sourceShift);
```

Stores status, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 485

```text
          if (status !== 'current') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 486

```text
            const warning = document.createElement('small');
```

Stores warning, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 487

```text
            warning.className = `invoice-line-warning is-${status}`;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 488

```text
            warning.textContent = status === 'changed'
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 489

```text
              ? `Source shift changed after billing. Saved snapshot remains ${Number(item.billedHours ?? item.actualHours ?? 0).toFixed(2)} h × $${Number(item.billingRate ?? 0).toFixed(2)}/h.`
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 490

```text
              : status === 'missing'
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 491

```text
                ? `Source shift ${item.shiftId} is missing. Saved billed hours and rate are retained.`
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 492

```text
                : 'This older labor line has no shift snapshot, so source changes cannot be verified.';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 493

```text
            nameCell.appendChild(document.createElement('br'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 494

```text
            nameCell.appendChild(warning);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 495

```text
          }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 496

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 497

```text
        const valueCell = document.createElement('td');
```

Stores valueCell, a browser object used to build or update this page; later code reuses this result so the invoice.js workflow stays consistent.

### Line 498

```text
        valueCell.textContent = formatCurrency(item.value || 0);
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 499

```text
        row.append(nameCell, valueCell);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 500

```text
        invoiceBody.appendChild(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 501

```text
      });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 502

```text
      sortInvoiceRows();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 503

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 504

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 505

```text

```

Blank line separates related statements and has no runtime effect.

### Line 506

```text
  function openItemModal(invoice, itemIndex = null) {
```

Defines the private helper openItemModal for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 507

```text
    const modal = document.getElementById('item-modal');
```

Stores modal, DOM reference to the modal control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 508

```text
    const nameInput = document.getElementById('name-input');
```

Stores nameInput, DOM reference to the nameInput control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 509

```text
    const valueInput = document.getElementById('value-input');
```

Stores valueInput, DOM reference to the valueInput control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 510

```text
    const itemForm = document.getElementById('add-item-form');
```

Stores itemForm, DOM reference to the itemForm control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 511

```text
    const modalTitle = document.getElementById('item-modal-title');
```

Stores modalTitle, DOM reference to the modalTitle control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 512

```text
    const formError = document.getElementById('item-form-error');
```

Stores formError, DOM reference to the formError control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 513

```text
    const submitButton = document.getElementById('submit-btn');
```

Stores submitButton, DOM reference to the submitButton control; later code reuses this result so the invoice.js workflow stays consistent.

### Line 514

```text

```

Blank line separates related statements and has no runtime effect.

### Line 515

```text
    if (!modal || !nameInput || !valueInput || !itemForm || !modalTitle || !formError || !submitButton) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 516

```text

```

Blank line separates related statements and has no runtime effect.

### Line 517

```text
    const isEditing = Number.isInteger(itemIndex);
```

Stores isEditing, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 518

```text
    const originalItem = isEditing ? invoice.items[itemIndex] : null;
```

Stores originalItem, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 519

```text
    if (isEditing && (!originalItem || originalItem.shiftId)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 520

```text
    const originalItemSnapshot = originalItem ? { name: originalItem.name, value: originalItem.value } : null;
```

Stores originalItemSnapshot, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 521

```text
    modalTitle.textContent = isEditing ? 'Edit invoice item' : 'Add invoice item';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 522

```text
    submitButton.textContent = isEditing ? 'Save changes' : 'Add';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 523

```text
    nameInput.value = originalItem?.name || '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 524

```text
    valueInput.value = originalItem ? Number(originalItem.value || 0) : '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 525

```text
    formError.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 526

```text
    formError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 527

```text
    modal.showModal();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 528

```text

```

Blank line separates related statements and has no runtime effect.

### Line 529

```text
    const closeModal = () => {
```

Stores closeModal, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 530

```text
      itemForm.onreset = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 531

```text
      itemForm.reset();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 532

```text
      itemForm.onreset = handleReset;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 533

```text
      formError.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 534

```text
      formError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 535

```text
      if (modal.open) modal.close();
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 536

```text
    };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 537

```text

```

Blank line separates related statements and has no runtime effect.

### Line 538

```text
    const handleReset = event => {
```

Stores handleReset, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the invoice.js workflow stays consistent.

### Line 539

```text
      event.preventDefault();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 540

```text
      closeModal();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 541

```text
    };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 542

```text

```

Blank line separates related statements and has no runtime effect.

### Line 543

```text
    itemForm.onsubmit = async event => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 544

```text
      event.preventDefault();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 545

```text

```

Blank line separates related statements and has no runtime effect.

### Line 546

```text
      const name = nameInput.value.trim();
```

Stores name, value; later code reuses this result so the invoice.js workflow stays consistent.

### Line 547

```text
      const value = Number(valueInput.value);
```

Stores value, a numeric value validated for payroll math; later code reuses this result so the invoice.js workflow stays consistent.

### Line 548

```text
      if (!name || !Number.isFinite(value)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 549

```text
        formError.textContent = 'Enter an item name and a valid amount.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 550

```text
        formError.hidden = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 551

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 552

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 553

```text

```

Blank line separates related statements and has no runtime effect.

### Line 554

```text
      let addedItem = null;
```

Creates mutable addedItem state for this workflow; it changes as the user selects, edits, or loads records.

### Line 555

```text
      try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 556

```text
        if (isEditing) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 557

```text
          originalItem.name = name;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 558

```text
          originalItem.value = value;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 559

```text
        } else if (typeof invoice.addItem === 'function') {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 560

```text
          invoice.addItem(name, value);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 561

```text
          addedItem = invoice.items[invoice.items.length - 1];
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 562

```text
        } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 563

```text
          if (!invoice.items) invoice.items = [];
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 564

```text
          addedItem = { name, value };
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 565

```text
          invoice.items.push(addedItem);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 566

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 567

```text

```

Blank line separates related statements and has no runtime effect.

### Line 568

```text
        await store.saveInvoice(invoice);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 569

```text
        closeModal();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 570

```text
        selectedItemIndex = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 571

```text
        populateInvoiceDetails(invoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 572

```text
        renderOpenInvoices();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 573

```text
      } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 574

```text
        if (isEditing) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 575

```text
          originalItem.name = originalItemSnapshot.name;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 576

```text
          originalItem.value = originalItemSnapshot.value;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 577

```text
        } else if (addedItem) {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 578

```text
          invoice.items = invoice.items.filter(item => item !== addedItem);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 579

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 580

```text
        console.error('Error saving invoice item:', error);
```

Sets the console.error('Error saving invoice item property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 581

```text
        formError.textContent = 'Unable to save this item. Please try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 582

```text
        formError.hidden = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 583

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 584

```text
    };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 585

```text

```

Blank line separates related statements and has no runtime effect.

### Line 586

```text
    itemForm.onreset = handleReset;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 587

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 588

```text
});
```

Completes this application statement, applying the shown value or operation to the current page state/data record.
