import { 
  store, 
  populateEmployeeDropdowns, 
  populateCustomerDropdowns
} from './models.js';

function formatForDateTimeLocal(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  
  const shiftList = document.getElementById('shiftList');
  
  function showViewModal(shift) {
    const modal = document.getElementById('viewShiftModal');
    const empSelect = document.getElementById('shift-emp');
    const custSelect = document.getElementById('shift-cust');
    const timeIn = document.getElementById('shift-start');
    const timeOut = document.getElementById('shift-end');
    const totalHours = document.getElementById('total-hours');
    const noteView = document.getElementById('note-view');
    const okBtn = document.getElementById('ok-btn');
    const paidBox = document.getElementById('paid-checkbox-view');
    
    // Populate dropdown options
    populateEmployeeDropdowns(empSelect);
    populateCustomerDropdowns(custSelect);

    // Set active values using IDs
    if (shift.employee) empSelect.value = shift.employee.id;
    if (shift.customer) custSelect.value = shift.customer.id;

    timeIn.value = formatForDateTimeLocal(shift.clockInTime);
    timeOut.value = formatForDateTimeLocal(shift.clockOutTime);
    totalHours.value = shift.getHoursWorked();
    noteView.value = shift.note || '';
    paidBox.checked = shift.isPaid;
    
    // Ensure clean event binding
    const newOkBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);

    const handleOk = async () => {
      const employee = store.employees.get(empSelect.value);
      const customer = store.customers.get(custSelect.value);

      newOkBtn.disabled = true;
      try {
        await store.updateShift(
          shift.id,
          employee,
          customer,
          new Date(timeIn.value),
          new Date(timeOut.value),
          noteView.value,
          paidBox.checked
        );
        modal.close();
        renderList();
      } catch (error) {
        console.error('Unable to update shift:', error);
        alert(error.message || 'Unable to update shift.');
        newOkBtn.disabled = false;
      }
    };

    newOkBtn.addEventListener('click', handleOk, { once: true });

    modal.showModal();
  }
  
  function renderList() {
    if (!shiftList) return;

    const completeShifts = store.shifts.filter(s => s.isComplete);
    
    if (completeShifts.length === 0) {
      shiftList.innerHTML = '<li class="empty-list shift-card">No Shift History - none</li>';
      return;
    }
    
    completeShifts.sort((a,b) => {
      const timeA = a.clockInTime ? a.clockInTime.getTime() : 0;
      const timeB = b.clockInTime ? b.clockInTime.getTime() : 0;
      return timeB - timeA;
    });
    
    shiftList.innerHTML = '';
    
    completeShifts.forEach((shift) => {
      const li = document.createElement('li');
      li.className = 'shift-card';
      const timeInStr = shift.clockInTime ? shift.clockInTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Unknown';
      const timeOutStr = shift.clockOutTime ? shift.clockOutTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Unknown';

      li.innerHTML = `
      <div>
        <strong>${shift.employee ? shift.employee.name : 'Unknown'}</strong> @ ${shift.customer ? shift.customer.name : 'Unknown'}<br>
        <small>In: ${timeInStr}   Out: ${timeOutStr}</small>
      </div>
      <button type="button" class="view-btn" data-id="${shift.id}">View</button>
      <button type="button" class="delete-btn" data-id="${shift.id}">Delete</button>
      `;
      shiftList.appendChild(li);
    });
  }

  // Event listener registered once outside renderList to avoid duplicates
  shiftList?.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-id');
    if (!id) return;
    
    if (e.target.classList.contains('view-btn')) {
      const shiftToView = store.shifts.find(s => s.id === id);
      if (shiftToView) {
        showViewModal(shiftToView);
      }
    }
    
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Are you sure you want to delete this payment shift?')) {
        await store.deleteShift(id);
      }
      renderList();
    }
    
  });
  renderList();
});
