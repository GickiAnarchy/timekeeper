import {
  store,
  populateEmployeeDropdowns,
  populateCustomerDropdowns,
  enableAutoScrollOnFocus,
  WorkShift
} from './models.js';

function formatForDateTimeLocal(date) {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  enableAutoScrollOnFocus();

  const shiftList = document.getElementById('shiftList');
  const empFilter = document.getElementById('emp-filter');
  const custFilter = document.getElementById('cust-filter');
  const paidCheckbox = document.getElementById('paid-filter');
  const addButton = document.getElementById('add-button');
  const modal = document.getElementById('viewShiftModal');
  const empSelect = document.getElementById('shift-emp');
  const custSelect = document.getElementById('shift-cust');
  const timeIn = document.getElementById('shift-start');
  const timeOut = document.getElementById('shift-end');
  const actualHours = document.getElementById('total-hours');
  const paidHours = document.getElementById('paid-hours');
  const noteView = document.getElementById('note-view');
  const paidBox = document.getElementById('paid-checkbox-view');
  const breaksList = document.getElementById('breaks-list');
  const formError = document.getElementById('shift-form-error');
  const okBtn = document.getElementById('ok-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const addBreakButton = document.getElementById('add-break-button');
  let activeShift = null;
  let isNewShift = false;

  populateEmployeeDropdowns(empFilter);
  populateCustomerDropdowns(custFilter);
  empFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Employees</option>');
  custFilter.insertAdjacentHTML('afterbegin', '<option value="all" selected>All Customers</option>');
  populateEmployeeDropdowns(empSelect);
  populateCustomerDropdowns(custSelect);

  empFilter.addEventListener('change', renderList);
  custFilter.addEventListener('change', renderList);
  paidCheckbox.addEventListener('change', renderList);

  addButton.addEventListener('click', () => {
    const employeeId = empFilter.value;
    const customerId = custFilter.value;
    const employee = employeeId !== 'all' ? store.employees.get(employeeId) : null;
    const customer = customerId !== 'all' ? store.customers.get(customerId) : null;
    if (!employee || !customer) {
      window.alert('Choose a specific employee and customer in the filters before adding a shift.');
      return;
    }
    showViewModal(new WorkShift(employee, customer));
  });

  function addBreakRow(breakItem = null) {
    const row = document.createElement('li');
    row.className = 'break-row';

    const label = makeElement('span', 'break-label', `Break ${breaksList.children.length + 1}`);
    const startLabel = document.createElement('label');
    startLabel.textContent = 'From';
    const start = document.createElement('input');
    start.type = 'datetime-local';
    start.className = 'break-start';
    start.value = formatForDateTimeLocal(breakItem?.start || null);
    start.setAttribute('aria-label', 'Break start');
    start.addEventListener('input', updateActualHours);
    startLabel.appendChild(start);

    const endLabel = document.createElement('label');
    endLabel.textContent = 'To';
    const end = document.createElement('input');
    end.type = 'datetime-local';
    end.className = 'break-end';
    end.value = formatForDateTimeLocal(breakItem?.end || null);
    end.setAttribute('aria-label', 'Break end');
    end.addEventListener('input', updateActualHours);
    endLabel.appendChild(end);

    const removeButton = makeElement('button', 'remove-break-button', 'Remove');
    removeButton.type = 'button';
    removeButton.setAttribute('aria-label', `Remove break ${breaksList.children.length + 1}`);
    row.append(label, startLabel, endLabel, removeButton);
    breaksList.appendChild(row);
  }

  function collectBreaks() {
    const result = [];
    for (const [index, row] of [...breaksList.querySelectorAll('.break-row')].entries()) {
      const startValue = row.querySelector('.break-start').value;
      const endValue = row.querySelector('.break-end').value;
      if (!startValue && !endValue) continue;
      if (!startValue || !endValue) {
        throw new Error(`Break ${index + 1} needs both a start and end time.`);
      }
      result.push({ start: new Date(startValue), end: new Date(endValue) });
    }
    return result;
  }

  function updateActualHours() {
    const start = new Date(timeIn.value);
    const end = new Date(timeOut.value);
    if (!timeIn.value || !timeOut.value || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      actualHours.value = '0.00';
      return;
    }
    let breakMs = 0;
    for (const row of breaksList.querySelectorAll('.break-row')) {
      const breakStartValue = row.querySelector('.break-start').value;
      const breakEndValue = row.querySelector('.break-end').value;
      if (!breakStartValue || !breakEndValue) continue;
      const breakStart = new Date(breakStartValue);
      const breakEnd = new Date(breakEndValue);
      if (!Number.isNaN(breakStart.getTime()) && !Number.isNaN(breakEnd.getTime()) && breakEnd > breakStart) {
        breakMs += breakEnd - breakStart;
      }
    }
    actualHours.value = Math.max(0, (end - start - breakMs) / 3600000).toFixed(2);
  }

  timeIn.addEventListener('input', updateActualHours);
  timeOut.addEventListener('input', updateActualHours);
  addBreakButton.addEventListener('click', () => addBreakRow());
  breaksList.addEventListener('click', event => {
    const button = event.target.closest('.remove-break-button');
    if (!button) return;
    button.closest('.break-row').remove();
    [...breaksList.querySelectorAll('.break-row')].forEach((row, index) => {
      row.querySelector('.break-label').textContent = `Break ${index + 1}`;
      row.querySelector('.remove-break-button').setAttribute('aria-label', `Remove break ${index + 1}`);
    });
    updateActualHours();
  });

  function showViewModal(shift) {
    activeShift = shift;
    isNewShift = !store.shifts.some(candidate => candidate.id === shift.id);
    formError.textContent = '';
    empSelect.value = shift.employee?.id || '';
    custSelect.value = shift.customer?.id || '';
    timeIn.value = formatForDateTimeLocal(shift.clockInTime);
    timeOut.value = formatForDateTimeLocal(shift.clockOutTime);
    noteView.value = shift.note || '';
    paidBox.checked = Boolean(shift.isPaid);
    paidHours.value = Number.isFinite(shift.paidHours) ? String(shift.paidHours) : '';
    breaksList.replaceChildren();
    shift.breaks.forEach(breakItem => addBreakRow(breakItem));
    updateActualHours();
    modal.showModal();
  }

  okBtn.addEventListener('click', async () => {
    if (!activeShift) return;
    formError.textContent = '';
    const employee = store.employees.get(empSelect.value);
    const customer = store.customers.get(custSelect.value);
    if (!employee || !customer) {
      formError.textContent = 'Choose an employee and customer.';
      return;
    }
    if (!timeIn.value || !timeOut.value) {
      formError.textContent = 'Enter both the actual shift start and end times.';
      return;
    }
    const start = new Date(timeIn.value);
    const end = new Date(timeOut.value);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      formError.textContent = 'The shift end must be after its start.';
      return;
    }

    let breaks;
    try {
      breaks = collectBreaks();
    } catch (error) {
      formError.textContent = error.message;
      return;
    }
    const orderedBreaks = [...breaks].sort((a, b) => a.start - b.start);
    for (let index = 0; index < orderedBreaks.length; index += 1) {
      const breakItem = orderedBreaks[index];
      if (breakItem.start < start || breakItem.end > end || breakItem.end <= breakItem.start) {
        formError.textContent = `Break ${index + 1} must be valid and fall within the shift.`;
        return;
      }
      if (index > 0 && breakItem.start < orderedBreaks[index - 1].end) {
        formError.textContent = 'Break times cannot overlap.';
        return;
      }
    }
    const paidHoursValue = paidHours.value === '' ? null : Number(paidHours.value);
    if (paidHoursValue !== null && (!Number.isFinite(paidHoursValue) || paidHoursValue < 0)) {
      formError.textContent = 'Paid hours must be a non-negative number, or left blank to use actual hours.';
      return;
    }

    okBtn.disabled = true;
    okBtn.textContent = 'Saving…';
    try {
      if (isNewShift) {
        activeShift.employee = employee;
        activeShift.customer = customer;
        activeShift.clockInTime = start;
        activeShift.clockOutTime = end;
        activeShift.note = noteView.value.trim() || null;
        activeShift.isPaid = paidBox.checked;
        activeShift.breaks = breaks;
        activeShift.paidHours = paidHoursValue;
        await store.saveShift(activeShift);
        store.shifts.push(activeShift);
      } else {
        await store.updateShift(
          activeShift.id,
          employee,
          customer,
          start,
          end,
          noteView.value,
          paidBox.checked,
          breaks,
          paidHoursValue
        );
      }
      modal.close();
      activeShift = null;
      renderList();
    } catch (error) {
      console.error('Unable to save shift:', error);
      formError.textContent = error.message || 'Unable to save this shift. Please try again.';
    } finally {
      okBtn.disabled = false;
      okBtn.textContent = 'Save changes';
    }
  });

  cancelBtn.addEventListener('click', () => {
    activeShift = null;
    modal.close();
  });
  modal.addEventListener('close', () => { activeShift = null; });

  function renderList() {
    if (!shiftList) return;
    const employeeSelection = empFilter.value;
    const customerSelection = custFilter.value;
    let completeShifts = store.shifts.filter(shift => shift.isComplete);

    if (employeeSelection && employeeSelection !== 'all') {
      completeShifts = completeShifts.filter(shift => shift.employee?.id === employeeSelection);
    }
    if (customerSelection && customerSelection !== 'all') {
      completeShifts = completeShifts.filter(shift => shift.customer?.id === customerSelection);
    }
    if (paidCheckbox.checked) completeShifts = completeShifts.filter(shift => !shift.isPaid);

    completeShifts.sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
    shiftList.replaceChildren();
    if (completeShifts.length === 0) {
      shiftList.appendChild(makeElement('li', 'empty-list shift-card', 'No completed shifts match these filters.'));
      return;
    }

    completeShifts.forEach(shift => {
      const item = makeElement('li', `shift-card${shift.isPaid ? ' is-paid' : ''}`);
      const date = makeElement('div', 'date-div');
      date.appendChild(makeElement('p', '', shift.clockInTime?.toLocaleDateString() || 'Unknown date'));
      const summary = makeElement('div', 'emp-cust-div');
      const employeeName = makeElement('strong', '', shift.employee?.name || 'Unknown employee');
      const details = makeElement('div', '', ` @ ${shift.customer?.name || 'Unknown customer'}`);
      const timeLine = makeElement('small', 'time-small',
        `In: ${shift.clockInTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}  ·  Out: ${shift.clockOutTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Unknown'}`);
      const workedLine = makeElement('small', 'time-small',
        `Worked ${shift.getHoursWorked().toFixed(2)} h  ·  Paid ${shift.getPaidHours().toFixed(2)} h`);
      summary.append(employeeName, details, document.createElement('br'), timeLine, document.createElement('br'), workedLine);

      const actions = makeElement('div', 'list-item-buttons');
      const editButton = makeElement('button', 'view-btn', 'Edit');
      editButton.type = 'button';
      editButton.dataset.id = shift.id;
      const deleteButton = makeElement('button', 'delete-btn', 'Delete');
      deleteButton.type = 'button';
      deleteButton.dataset.id = shift.id;
      actions.append(editButton, deleteButton);
      item.append(date, summary, actions);
      shiftList.appendChild(item);
    });
  }

  shiftList.addEventListener('click', async event => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;
    const shift = store.shifts.find(candidate => candidate.id === button.dataset.id);
    if (!shift) return;

    if (button.classList.contains('view-btn')) {
      showViewModal(shift);
      return;
    }
    if (button.classList.contains('delete-btn') && window.confirm('Are you sure you want to delete this shift?')) {
      button.disabled = true;
      try {
        await store.deleteShift(shift.id);
        renderList();
      } catch (error) {
        console.error('Unable to delete shift:', error);
        button.disabled = false;
        window.alert('This shift could not be deleted. Please try again.');
      }
    }
  });

  renderList();
});
