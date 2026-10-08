import {
  store,
  PlannedJob,
  populateCustomerDropdowns
} from './models.js';

const formatJobDate = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
const formatMonth = new Intl.DateTimeFormat(undefined, { month: 'short' });
const formatWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' });

function asDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function calendarDayNumber(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

document.addEventListener('DOMContentLoaded', async () => {
  const plannedList = document.getElementById('planned-list');
  const addButton = document.getElementById('add-button');
  const modal = document.getElementById('add-modal');
  const form = document.getElementById('add-form');
  const customerSelect = document.getElementById('planned-cust');
  const dateInput = document.getElementById('planned-date');
  const descriptionInput = document.getElementById('planned-description');
  const formError = document.getElementById('planned-form-error');
  const customerHelp = document.getElementById('customer-help');
  const submitButton = document.getElementById('modal-add-button');
  const jobCount = document.getElementById('job-count');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  let activeFilter = 'open';

  await store.init();
  populateCustomerDropdowns(customerSelect);

  function sortedJobs() {
    return [...store.plannedJobs].sort((a, b) => {
      if (a.isComplete !== b.isComplete) return Number(a.isComplete) - Number(b.isComplete);
      return (asDate(a.scheduledDate)?.getTime() ?? 0) - (asDate(b.scheduledDate)?.getTime() ?? 0);
    });
  }

  function updateSummary() {
    const today = new Date();
    const todayNumber = calendarDayNumber(today);
    const openJobs = store.plannedJobs.filter(job => !job.isComplete);
    const dueToday = openJobs.filter(job => {
      const date = asDate(job.scheduledDate);
      return date && calendarDayNumber(date) === todayNumber;
    });
    const completedJobs = store.plannedJobs.filter(job => job.isComplete);
    document.getElementById('open-count').textContent = openJobs.length;
    document.getElementById('today-count').textContent = dueToday.length;
    document.getElementById('completed-count').textContent = completedJobs.length;
  }

  function createJobCard(job) {
    const item = makeElement('li', `job-card${job.isComplete ? ' is-complete' : ''}`);
    const date = asDate(job.scheduledDate);
    const dayNumber = date ? calendarDayNumber(date) : null;
    const daysAway = dayNumber === null ? null : dayNumber - calendarDayNumber(new Date());

    const dateTile = makeElement('div', 'date-tile');
    dateTile.append(
      makeElement('span', 'date-weekday', date ? formatWeekday.format(date) : '—'),
      makeElement('strong', 'date-day', date ? String(date.getDate()) : '—'),
      makeElement('span', 'date-month', date ? formatMonth.format(date) : '')
    );

    const content = makeElement('div', 'job-content');
    const titleRow = makeElement('div', 'job-title-row');
    titleRow.appendChild(makeElement('h3', 'job-description', job.description || 'Scheduled job'));

    let statusText = 'Date not set';
    let statusClass = 'status-pill';
    if (job.isComplete) {
      statusText = 'Completed';
      statusClass += ' status-complete';
    } else if (daysAway === 0) {
      statusText = 'Due today';
      statusClass += ' status-today';
    } else if (daysAway === 1) {
      statusText = 'Tomorrow';
      statusClass += ' status-upcoming';
    } else if (daysAway < 0) {
      statusText = 'Overdue';
      statusClass += ' status-overdue';
    } else {
      statusText = 'Upcoming';
      statusClass += ' status-upcoming';
    }
    titleRow.appendChild(makeElement('span', statusClass, statusText));

    const customerName = job.customer?.name || 'Customer not available';
    const customerLine = makeElement('p', 'job-customer', customerName);
    const dateLine = makeElement('p', 'job-date', date ? formatJobDate.format(date) : 'Date not set');
    content.append(titleRow, customerLine, dateLine);

    const actions = makeElement('div', 'job-actions');
    const completeButton = makeElement('button', 'button button-small button-primary', job.isComplete ? 'Reopen' : 'Complete');
    completeButton.type = 'button';
    completeButton.dataset.action = 'toggle-complete';
    completeButton.dataset.id = job.id;
    completeButton.setAttribute('aria-label', `${job.isComplete ? 'Reopen' : 'Complete'} ${job.description || 'scheduled job'}`);

    const deleteButton = makeElement('button', 'button button-small button-quiet', 'Remove');
    deleteButton.type = 'button';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.id = job.id;
    deleteButton.setAttribute('aria-label', `Remove ${job.description || 'scheduled job'}`);
    actions.append(completeButton, deleteButton);
    item.append(dateTile, content, actions);
    return item;
  }

  function renderJobs() {
    updateSummary();
    const visibleJobs = sortedJobs().filter(job => {
      if (activeFilter === 'open') return !job.isComplete;
      if (activeFilter === 'completed') return job.isComplete;
      return true;
    });

    plannedList.replaceChildren();
    jobCount.textContent = `${visibleJobs.length} ${visibleJobs.length === 1 ? 'job' : 'jobs'}`;

    if (visibleJobs.length === 0) {
      const empty = makeElement('li', 'empty-state');
      const icon = makeElement('span', 'empty-state-icon', activeFilter === 'completed' ? '✓' : '＋');
      icon.setAttribute('aria-hidden', 'true');
      const heading = makeElement('h3', '', activeFilter === 'completed' ? 'Nothing completed yet' : 'Your schedule is clear');
      const message = makeElement('p', '', activeFilter === 'completed'
        ? 'Jobs you complete will show up here.'
        : 'Add a planned job to keep upcoming work in view.');
      empty.append(icon, heading, message);
      plannedList.appendChild(empty);
      return;
    }

    visibleJobs.forEach(job => plannedList.appendChild(createJobCard(job)));
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(filterButton => {
        const selected = filterButton === button;
        filterButton.classList.toggle('is-active', selected);
        filterButton.setAttribute('aria-pressed', String(selected));
      });
      renderJobs();
    });
  });

  addButton.addEventListener('click', () => {
    form.reset();
    formError.textContent = '';
    const today = new Date();
    dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const hasCustomers = store.customers.size > 0;
    customerHelp.textContent = hasCustomers ? '' : 'Add a customer in People Data before planning a job.';
    submitButton.disabled = !hasCustomers;
    modal.showModal();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    formError.textContent = '';
    const customer = store.customers.get(customerSelect.value);
    const description = descriptionInput.value.trim();
    const dateValue = dateInput.value;

    if (!customer) {
      formError.textContent = 'Choose a customer before saving this job.';
      return;
    }
    if (!dateValue || !description) {
      formError.textContent = 'Add a planned date and job description.';
      return;
    }

    const [year, month, day] = dateValue.split('-').map(Number);
    const scheduledDate = new Date(year, month - 1, day, 12, 0, 0, 0);
    const newJob = new PlannedJob(description, scheduledDate, customer);

    submitButton.disabled = true;
    submitButton.textContent = 'Saving…';
    try {
      await store.savePlanned(newJob);
      store.plannedJobs.push(newJob);
      activeFilter = 'open';
      filterButtons.forEach(button => {
        const selected = button.dataset.filter === activeFilter;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      modal.close();
      renderJobs();
    } catch (error) {
      console.error('Unable to save planned job:', error);
      formError.textContent = 'This job could not be saved. Check your connection and try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Save job';
    }
  });

  function closeModal() {
    form.reset();
    formError.textContent = '';
    modal.close();
  }

  document.getElementById('modal-cancel-button').addEventListener('click', closeModal);
  document.getElementById('modal-cancel-action').addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  plannedList.addEventListener('click', async event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const job = store.plannedJobs.find(candidate => candidate.id === button.dataset.id);
    if (!job) return;

    if (button.dataset.action === 'toggle-complete') {
      button.disabled = true;
      try {
        await store.setPlannedComplete(job.id, !job.isComplete);
        renderJobs();
      } catch (error) {
        console.error('Unable to update planned job:', error);
        button.disabled = false;
        window.alert('This job could not be updated. Please try again.');
      }
    }

    if (button.dataset.action === 'delete') {
      const label = job.description || 'this planned job';
      if (!window.confirm(`Remove “${label}” from the schedule?`)) return;
      button.disabled = true;
      try {
        await store.deletePlanned(job.id);
        renderJobs();
      } catch (error) {
        console.error('Unable to remove planned job:', error);
        button.disabled = false;
        window.alert('This job could not be removed. Please try again.');
      }
    }
  });

  renderJobs();
});
