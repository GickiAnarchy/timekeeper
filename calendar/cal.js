import { store } from '../scripts/models.js';

document.addEventListener('DOMContentLoaded', async () => {
  // The calendar only needs shift records; init() also runs ledger settlement/archive work.
  await store.loadShifts();

  const makeBtn = document.getElementById('make');
  makeBtn.addEventListener('click', () => {
    const date = new Date();
    makeBtn.textContent = date.getMonth() + 1;
    renderCalender(date);
  });

  function renderCalender(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // Current month (0-11)
    createCalendar(year, month);
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function shiftsForDay(year, month, day) {
    return store.shifts.filter(shift => {
      const shiftDate = shift.clockInTime;
      return shiftDate instanceof Date && Number.isFinite(shiftDate.getTime()) &&
        shiftDate.getFullYear() === year &&
        shiftDate.getMonth() === month &&
        shiftDate.getDate() === day;
    });
  }

  function createCalendar(year, month) {
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const container = document.getElementById('days-container');
    container.innerHTML = ''; // Clear previous days
    const monthText = document.getElementById('month-text');
    monthText.innerHTML = month;

    // Add empty slots for days before the first of the month.
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('empty-slot');
      container.appendChild(emptyDiv);
    }

    // Create a day button and mark it when saved shift data matches its local date.
    for (let day = 1; day <= totalDays; day++) {
      const btn = document.createElement('button');
      btn.textContent = day;
      const dayShifts = shiftsForDay(year, month, day);
      if (dayShifts.length) {
        const count = dayShifts.length;
        const shiftLabel = `${count} saved shift${count === 1 ? '' : 's'}`;
        btn.classList.add('has-shifts');
        btn.dataset.shiftCount = String(count);
        btn.title = shiftLabel;
        btn.setAttribute('aria-label', `${month + 1}/${day}/${year}, ${shiftLabel}`);
      }
      btn.addEventListener('click', () => {
        console.log(`Selected: ${month + 1}/${day}/${year}`);
        const count = dayShifts.length;
        const shiftMessage = count ? ` ${count} saved shift${count === 1 ? '' : 's'} on this date.` : '';
        alert(`You clicked day ${day}!${shiftMessage}`);
      });
      container.appendChild(btn);
    }
  }
});
