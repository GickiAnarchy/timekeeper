import {
  store,
  PlannedJob,
  populateCustomerDropdowns
} from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  const plannedList = document.getElementById('planned-list');
  const addButton = document.getElementById('add-button');
  const modal = document.getElementById('add-modal');
  const custMenu = document.getElementById('planned-cust');
  
  if (custMenu) {
    populateCustomerDropdowns(custMenu);
  }
  
  plannedList.innerHTML = "";
  
  if (store.plannedJobs.length > 0) {
    store.plannedJobs.forEach((p) => {
    const li = document.createElement('li');
    li.className = "job-card";
    li.innerHTML=`
    <div class="info-div">
      <p>${p.scheduledDate.toISOString()}</p>
      <small>${p.customer.name}</small>
    </div>
    <div class="description-div">
      <p>${p.description}</p>
    </div>
    <div class="buttons-div">
      <button id="complete-button">Complete</button>
    </div>
    `;
    
    plannedList.appendChild(li);
    
    });
    
  } else {
    const li = document.createElement('li');
    
    li.innerHTML = `<p>No planned jobs.</p>`;
    plannedList.appendChild(li);
  }
  
  addButton.addEventListener('click', showAddModal());
  
  function showAddModal() {
    const addButton = document.getElementById('modal-add-button');
    const cancelButton = document.getElementById('modal-cancel-button');
    
    
    modal.showModal();
    
  }
  
});
