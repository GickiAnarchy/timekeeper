
import { 
  store, 
  WorkShift, 
  roundTo15Minutes,
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
        <div class="active-info">
          <strong>${shift.employee ? shift.employee.name : 'Unknown'}</strong> @ ${shift.customer ? shift.customer.name : 'Unknown'}<br>
          <small>Started: ${timeStr}</small>
        </div>
        <div class="break-buttons">
        <button type="button" id="start-break-btn" class="start-break-btn" data-id="${shift.id}">Start Break</button>
        <button type="button" id="stop-break-btn" class="stop-break-btn" data-id="${shift.id}" disabled="true">Stop Break</button>
        </div>
        <button type="button" class="stop-btn" data-id="${shift.id}">Clock Out</button>
      </div>
      `;
      
      const breakInBtn = li.querySelector('.start-break-btn');
      const breakOutBtn = li.querySelector('.stop-break-btn');
      if (shift.isOnBreak) {
        breakInBtn.disabled = true;
        breakOutBtn.disabled = false;
        li.classList.add('on-break');
      } else {
        breakInBtn.disabled = false;
        breakOutBtn.disabled = true;
        li.classList.remove('on-break');
      }
      activeShiftsList.appendChild(li);
    });
  }
  
  if (eDd || cDd) {
    populateEmployeeDropdowns(eDd);
    populateCustomerDropdowns(cDd);
  }
  
  if (clockInButton) {
    clockInButton.addEventListener('click', async () => {
      const empIds = Array.from(eDd.selectedOptions)
        .map(option => option.value)
        .filter(Boolean);
      const custId = cDd.value;
      
      if (empIds.length === 0 || !custId) {
        shiftError.textContent = 'Please select at least one employee and a job site.';
        return;
      }
      
      const employees = empIds.map(empId => store.employees.get(empId)).filter(Boolean);
      const alreadyClockedIn = employees.filter(emp =>
        store.shifts.some(s => s.employee && s.employee.id === emp.id && !s.isComplete)
      );
      if (alreadyClockedIn.length > 0) {
        const names = alreadyClockedIn.map(emp => emp.name).join(', ');
        shiftError.textContent = `${names} ${alreadyClockedIn.length === 1 ? 'is' : 'are'} already clocked in!`;
        return;
      }
      
      const cust = store.customers.get(custId);

      clockInButton.disabled = true;
      shiftError.textContent = '';
      try {
        const clockInTime = roundTo15Minutes();
        const shifts = employees.map(emp => {
          const shift = new WorkShift(emp, cust);
          shift.startShift(clockInTime);
          return shift;
        });

        await Promise.all(shifts.map(shift => store.saveShift(shift)));
        store.shifts.push(...shifts);
        renderActiveShifts();
      } catch (error) {
        console.error('Unable to clock in employees:', error);
        shiftError.textContent = 'Unable to clock in the selected employees. Please try again.';
      } finally {
        clockInButton.disabled = false;
      }
    }); //clock in button listener
  } // clock in button if statement

  if (activeShiftsList) {
    activeShiftsList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('stop-btn')) {
        const shiftId = e.target.getAttribute('data-id');
        const shiftToStop = store.shifts.find(s => s.id === shiftId);
        
        if (shiftToStop) {
          if (confirm("Are you sure you want to clock out?")) {
            shiftToStop.stopShift();
            await store.saveShift(shiftToStop);
            renderActiveShifts();
          }
            
        } // shicttostop if statement
      }
      
      if (e.target.classList.contains('start-break-btn')) {
        const shiftId = e.target.getAttribute('data-id');
        const shiftToBreak = store.shifts.find(s => s.id === shiftId);
        if (shiftToBreak) {
          shiftToBreak.startBreak();
          await store.saveShift(shiftToBreak);
          renderActiveShifts();
        }
      }
      
      if (e.target.classList.contains('stop-break-btn')) {
        const shiftId = e.target.getAttribute('data-id');
        const shiftToBreak = store.shifts.find(s => s.id === shiftId);
        if (shiftToBreak) {
          shiftToBreak.stopBreak();
          await store.saveShift(shiftToBreak);
          renderActiveShifts();
        }
      }
      
    }); //active shift list slistener
    
    renderActiveShifts();
  } // active shifts list if statement

});