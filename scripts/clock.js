
import { 
  store, 
  WorkShift, 
  populateEmployeeDropdowns, 
  populateCustomerDropdowns 
} from './models.js';


/*
  DOM CONTROLLER
*/

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  
  const eDd = document.getElementById('emp-select');
  const cDd = document.getElementById('cust-select');
  const clockInButton = document.getElementById('clock-in-button');
  const activeShiftsList = document.getElementById('activeShiftsList');
  const shiftError = document.getElementById('shift-error');
  
  function renderActiveShifts() {
    if (!activeShiftsList) return;
    const activeShifts = store.shifts.filter(s => !s.isComplete);

    if (activeShifts.length === 0) {
      activeShiftsList.innerHTML = '<li class="empty-msg">No active shifts right now.</li>';
      return;
    }
    activeShiftsList.innerHTML = '';

    activeShifts.forEach((shift) => {
      const li = document.createElement('li');
      li.className = 'shift-card';
      const timeStr = shift.clockInTime ? shift.clockInTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Unknown';

      li.innerHTML = `
      <div class="active-card">
        <strong>${shift.employee ? shift.employee.name : 'Unknown'}</strong> @ ${shift.customer ? shift.customer.name : 'Unknown'}<br>
        <small>Started: ${timeStr}</small>
      </div>
      <button type="button" class="stop-btn" data-id="${shift.id}">Clock Out</button>
      `;
      activeShiftsList.appendChild(li);
    });
  }
  
  if (eDd || cDd) {
    populateEmployeeDropdowns(eDd);
    populateCustomerDropdowns(cDd);
  }
  
  if (clockInButton) {
    clockInButton.addEventListener('click', async () => {
      
      const empId = eDd.value;
      const custId = cDd.value;
      
      if (!empId || !custId) {
        shiftError.textContent = 'Please select both an employee and a job site.';
        return;
      }
      
      const existingShift = store.shifts.find(s => s.employee && s.employee.id === empId && !s.isComplete);
      if (existingShift) {
        shiftError.textContent = `${existingShift.employee.name} is already clocked in!`;
        return;
      }
      
      const emp = store.employees.get(empId);
      const cust = store.customers.get(custId);
      
      const shift = new WorkShift(emp,cust);
      shift.startShift();
      store.shifts.push(shift);
      await store.saveShift(shift);
      
      renderActiveShifts();
    }); //clock in button listener
  } // clock in button if statement

  if (activeShiftsList) {
    activeShiftsList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('stop-btn')) {
        const shiftId = e.target.getAttribute('data-id');
        const shiftToStop = store.shifts.find(s => s.id === shiftId);
        
        if (shiftToStop) {
          shiftToStop.stopShift();
          await store.saveShift(shiftToStop);
          renderActiveShifts();
        } // shicttostop if statement
      }
    }); //active shift list listener
    renderActiveShifts();
  } // active shifts list if statement

});