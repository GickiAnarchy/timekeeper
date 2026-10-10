
import { 
  store, 
  WorkShift, 
  roundTo15Minutes,
  populateEmployeeDropdowns, 
  populateCustomerDropdowns 
} from './models.js';

function formatBreakDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
}

function makeElement(tag, className = '', text = undefined) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

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

  function updateBreakTimers() {
    const now = Date.now();
    activeShiftsList.querySelectorAll('.break-timer').forEach(timer => {
      const startedAt = Number(timer.dataset.startedAt);
      if (!Number.isFinite(startedAt)) return;
      timer.textContent = `Break ${formatBreakDuration(now - startedAt)}`;
    });
  }

  function renderActiveShifts() {
    if (!activeShiftsList) return;
    const activeShifts = store.shifts.filter(s => !s.isComplete);

    if (activeShifts.length === 0) {
      activeShiftsList.replaceChildren(makeElement('li', 'empty-msg', 'No active shifts right now.'));
      return;
    }
    activeShiftsList.replaceChildren();

    activeShifts.forEach((shift) => {
      const li = document.createElement('li');
      li.className = 'shift-card';
      const timeStr = shift.clockInTime ? shift.clockInTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Unknown';
      const activeBreak = shift.breaks.find(breakItem => breakItem.start && !breakItem.end);
      const breakStartedAt = activeBreak ? new Date(activeBreak.start).getTime() : NaN;
      const card = makeElement('div', 'active-card');
      const info = makeElement('div', 'active-info');
      info.append(
        makeElement('strong', '', shift.employee?.name || 'Unknown'),
        makeElement('span', '', ` @ ${shift.customer?.name || 'Unknown'}`),
        document.createElement('br'),
        makeElement('small', '', `Started: ${timeStr}`)
      );
      card.appendChild(info);
      if (shift.isOnBreak && Number.isFinite(breakStartedAt)) {
        const breakTimer = makeElement('span', 'break-timer', `Break ${formatBreakDuration(Date.now() - breakStartedAt)}`);
        breakTimer.setAttribute('role', 'timer');
        breakTimer.setAttribute('aria-label', 'Break duration');
        breakTimer.dataset.startedAt = String(breakStartedAt);
        card.appendChild(breakTimer);
      }
      const breakButtons = makeElement('div', 'break-buttons');
      const breakInBtn = makeElement('button', 'start-break-btn', 'Start Break');
      breakInBtn.type = 'button';
      breakInBtn.dataset.id = shift.id;
      const breakOutBtn = makeElement('button', 'stop-break-btn', 'Stop Break');
      breakOutBtn.type = 'button';
      breakOutBtn.dataset.id = shift.id;
      breakOutBtn.disabled = true;
      breakButtons.append(breakInBtn, breakOutBtn);
      const clockOutButton = makeElement('button', 'stop-btn', 'Clock Out');
      clockOutButton.type = 'button';
      clockOutButton.dataset.id = shift.id;
      card.append(breakButtons, clockOutButton);
      li.appendChild(card);
      
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

        await store.saveShifts(shifts);
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
    window.setInterval(updateBreakTimers, 1000);
  } // active shifts list if statement

});
