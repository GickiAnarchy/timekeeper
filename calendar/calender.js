const date = new Date();
const year = date.getFullYear();
const month = date.getMonth(); // Current month (0-11)

// Get total days in the month and the starting weekday index (0 = Sunday)
const totalDays = new Date(year, month + 1, 0).getDate();
const firstDayIndex = new Date(year, month, 1).getDay();

const container = document.getElementById('days-container'); // Days grid, the calender

// 1. Add empty padding slots for days before the 1st of the month
for (let i = 0; i < firstDayIndex; i++) {
  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('empty-slot');
  container.appendChild(emptyDiv);
}

// 2. Create a button for each day of the month
for (let day = 1; day <= totalDays; day++) {
  const btn = document.createElement('button');
  if (day % 2 === 0) {
    btn.classList.add('day-button', 'even');
  } else {
    btn.classList.add('day-button', 'odd');
  }
  btn.textContent = day;
  
  // Add a click event to handle user selection
  btn.addEventListener('click', () => {
    console.log(`Selected: ${month + 1}/${day}/${year}`);
    alert(`You clicked day ${day}!`);
  });

  container.appendChild(btn);
}


