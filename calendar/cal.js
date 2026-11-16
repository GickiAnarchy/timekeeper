/*import { store } from '../scripts/models.js';*/

document.addEventListener('DOMContentLoaded', () => {
  /*await store.init();*/
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
  
  function createCalendar(year, month) {
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    
    const container = document.getElementById('days-container');
    container.innerHTML = ''; // Clear previous days
    
    const monthText = document.getElementById('month-text');
    monthText.innerHTML = month;
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('empty-slot');
      container.appendChild(emptyDiv);
    }
    
    // Create buttons for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const btn = document.createElement('button'); // Create a button for each day
      btn.textContent = day; // Set the button text to the day number
      
      btn.addEventListener('click', () => { //  Add a click event listener to the button
        console.log(`Selected: ${month + 1}/${day}/${year}`);
        alert(`You clicked day ${day}!`);
      });
      
      container.appendChild(btn); // Append the button to the container
    }
  }
  
  
});