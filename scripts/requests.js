import { store } from './models.js';

const list = document.getElementById('requests-list');
const status = document.getElementById('requests-status');
const refreshButton = document.getElementById('refresh-requests');

function makeElement(tag, className, text = undefined) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function describeRequest(request) {
  if (request.kind === 'batch') return `Batch · ${(request.operations || []).length} change(s)`;
  return `${request.operation || 'Change'} · ${request.collection || 'workspace'} · ${request.documentId || 'record'}`;
}

async function renderRequests() {
  refreshButton.disabled = true;
  status.textContent = 'Loading pending requests…';
  try {
    await store.init();
    if (!store.isOwner) {
      status.textContent = 'Owner sign-in is required to view or resolve requests.';
      list.replaceChildren();
      return;
    }
    const requests = await store.loadPendingRequests();
    const pending = requests.filter(request => request.status === 'pending');
    list.replaceChildren();
    if (!pending.length) {
      list.appendChild(makeElement('li', 'empty-requests', 'No pending requests.'));
      status.textContent = 'All caught up.';
      return;
    }

    status.textContent = `${pending.length} request${pending.length === 1 ? '' : 's'} awaiting review.`;
    for (const request of pending) {
      const card = makeElement('li', 'request-card');
      card.dataset.requestId = request.id;
      card.appendChild(makeElement('h2', '', describeRequest(request)));
      card.appendChild(makeElement('p', 'request-meta',
        `Submitted ${request.submittedAt || 'time unavailable'} · ${request.requester || 'Shared kiosk'}`));

      const details = document.createElement('details');
      const summary = makeElement('summary', '', 'Review proposed data');
      const payload = makeElement('pre', 'request-payload', JSON.stringify(
        request.kind === 'batch'
          ? { kind: request.kind, operations: request.operations }
          : { operation: request.operation, collection: request.collection, documentId: request.documentId, data: request.data },
        null,
        2
      ));
      details.append(summary, payload);

      const actions = makeElement('div', 'request-actions');
      const deny = makeElement('button', 'deny-request', 'Deny');
      deny.type = 'button';
      deny.addEventListener('click', () => resolveRequest(request.id, 'denied', card));
      const approve = makeElement('button', 'approve-request', 'Approve');
      approve.type = 'button';
      approve.addEventListener('click', () => resolveRequest(request.id, 'approved', card));
      actions.append(deny, approve);
      card.append(details, actions);
      list.appendChild(card);
    }
  } catch (error) {
    status.textContent = error.message || 'Requests could not be loaded.';
    list.replaceChildren();
  } finally {
    refreshButton.disabled = false;
  }
}

async function resolveRequest(requestId, decision, card) {
  const buttons = [...card.querySelectorAll('button')];
  buttons.forEach(button => { button.disabled = true; });
  status.textContent = decision === 'approved' ? 'Applying approved changes…' : 'Denying request…';
  try {
    await store.resolvePendingRequest(requestId, decision);
    status.textContent = `Request ${decision}.`;
    await renderRequests();
  } catch (error) {
    status.textContent = error.message || 'The request could not be resolved.';
    buttons.forEach(button => { button.disabled = false; });
  }
}

refreshButton.addEventListener('click', renderRequests);
document.addEventListener('DOMContentLoaded', renderRequests);
