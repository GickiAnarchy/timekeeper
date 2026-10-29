import { loadDailyQuotes, saveDailyQuotes } from './models.js';
import { normalizeDailyQuotes } from './daily-quotes.mjs';

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createQuoteId() {
  const randomId = globalThis.crypto?.randomUUID?.();
  return randomId ? `quote-${randomId}` : `quote-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const quoteToggle = document.getElementById('quote-toggle');
  const quoteCard = document.getElementById('quote-card');
  const quoteList = document.getElementById('quote-list');
  const quoteStatus = document.getElementById('quote-status');
  const quoteForm = document.getElementById('daily-quote-form');
  const quoteDisclosure = document.getElementById('quote-form-disclosure');
  const quoteFormSummary = document.getElementById('quote-form-summary');
  const quoteFormError = document.getElementById('quote-form-error');
  const quoteSaveButton = document.getElementById('quote-save-button');
  const quoteCancelButton = document.getElementById('quote-cancel-button');
  const quoteFields = {
    text: document.getElementById('quote-text'),
    author: document.getElementById('quote-author'),
    work: document.getElementById('quote-work'),
    source: document.getElementById('quote-source')
  };

  let quotes = [];
  let editingId = null;
  let ready = false;
  let saving = false;

  quoteToggle.addEventListener('click', () => {
    const expanded = quoteToggle.getAttribute('aria-expanded') === 'true';
    quoteToggle.setAttribute('aria-expanded', String(!expanded));
    quoteCard.hidden = expanded;
  });

  function clearForm() {
    quoteForm.reset();
    editingId = null;
    quoteFormSummary.textContent = 'Add a daily quote';
    quoteSaveButton.textContent = 'Add quote';
    quoteCancelButton.hidden = true;
    quoteFormError.textContent = '';
  }

  function setBusy(isBusy) {
    saving = isBusy;
    quoteCard.setAttribute('aria-busy', String(isBusy));
    quoteForm.querySelectorAll('input, textarea, button').forEach(control => {
      control.disabled = isBusy || !ready;
    });
    quoteList.querySelectorAll('button').forEach(button => {
      button.disabled = isBusy || button.dataset.lastQuote === 'true';
    });
  }

  function renderQuotes() {
    quoteList.replaceChildren();
    if (!quotes.length) {
      quoteList.appendChild(makeElement('li', 'quote-empty', 'No daily quotes are available. Add one to get started.'));
      return;
    }

    quotes.forEach(quote => {
      const item = makeElement('li', 'quote-item');
      const copy = makeElement('div', 'quote-item-copy');
      copy.append(
        makeElement('p', 'quote-item-text', `“${quote.text}”`),
        makeElement('p', 'quote-item-attribution', `${quote.author} · ${quote.work}`)
      );

      const source = makeElement('a', 'quote-item-source', 'View source');
      source.href = quote.source;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      copy.appendChild(source);

      const actions = makeElement('div', 'quote-item-actions');
      const editButton = makeElement('button', 'admin-button admin-button-secondary', 'Edit');
      editButton.type = 'button';
      editButton.dataset.action = 'edit';
      editButton.dataset.quoteId = quote.id;
      editButton.setAttribute('aria-label', `Edit quote by ${quote.author}`);

      const deleteButton = makeElement('button', 'admin-button admin-button-danger', 'Delete');
      deleteButton.type = 'button';
      deleteButton.dataset.action = 'delete';
      deleteButton.dataset.quoteId = quote.id;
      deleteButton.dataset.lastQuote = String(quotes.length === 1);
      deleteButton.disabled = saving || quotes.length === 1;
      deleteButton.title = quotes.length === 1 ? 'At least one daily quote must remain.' : '';
      deleteButton.setAttribute('aria-label', `Delete quote by ${quote.author}`);
      actions.append(editButton, deleteButton);
      item.append(copy, actions);
      quoteList.appendChild(item);
    });
  }

  async function persistQuotes(nextQuotes, successMessage) {
    if (saving) return false;
    setBusy(true);
    quoteStatus.textContent = 'Saving quote changes…';
    quoteFormError.textContent = '';
    try {
      quotes = await saveDailyQuotes(nextQuotes);
      renderQuotes();
      quoteStatus.textContent = `${successMessage} ${quotes.length} ${quotes.length === 1 ? 'quote is' : 'quotes are'} available on the home page.`;
      return true;
    } catch (error) {
      console.error('Unable to save daily quote changes.', error);
      quoteStatus.textContent = 'The quote changes could not be saved. Check the connection and try again.';
      quoteFormError.textContent = error.message || 'Please check the quote details and try again.';
      return false;
    } finally {
      setBusy(false);
    }
  }

  function beginEdit(quoteId) {
    const quote = quotes.find(candidate => candidate.id === quoteId);
    if (!quote) return;
    editingId = quote.id;
    quoteFields.text.value = quote.text;
    quoteFields.author.value = quote.author;
    quoteFields.work.value = quote.work;
    quoteFields.source.value = quote.source;
    quoteFormSummary.textContent = 'Edit daily quote';
    quoteSaveButton.textContent = 'Save changes';
    quoteCancelButton.hidden = false;
    quoteFormError.textContent = '';
    quoteDisclosure.open = true;
    quoteFields.text.focus();
  }

  quoteCancelButton.addEventListener('click', clearForm);
  quoteForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!ready || saving) return;
    quoteFormError.textContent = '';

    try {
      const quote = normalizeDailyQuotes([{
        id: editingId || createQuoteId(),
        text: quoteFields.text.value,
        author: quoteFields.author.value,
        work: quoteFields.work.value,
        source: quoteFields.source.value
      }])[0];
      const nextQuotes = editingId
        ? quotes.map(candidate => candidate.id === editingId ? quote : candidate)
        : [...quotes, quote];
      const saved = await persistQuotes(nextQuotes, editingId ? 'Quote updated.' : 'Quote added.');
      if (saved) {
        clearForm();
        quoteDisclosure.open = false;
      }
    } catch (error) {
      quoteFormError.textContent = error.message || 'Please check the quote details and try again.';
    }
  });

  quoteList.addEventListener('click', async event => {
    const button = event.target.closest('button[data-action]');
    if (!button || saving || !ready) return;
    const quoteId = button.dataset.quoteId;
    if (button.dataset.action === 'edit') {
      beginEdit(quoteId);
      return;
    }
    if (button.dataset.action !== 'delete') return;

    const quote = quotes.find(candidate => candidate.id === quoteId);
    if (!quote || quotes.length <= 1) return;
    if (!window.confirm(`Delete this quote by ${quote.author}?`)) return;
    const nextQuotes = quotes.filter(candidate => candidate.id !== quoteId);
    await persistQuotes(nextQuotes, 'Quote deleted.');
  });

  try {
    quotes = await loadDailyQuotes();
    ready = true;
    renderQuotes();
    quoteStatus.textContent = `${quotes.length} ${quotes.length === 1 ? 'quote is' : 'quotes are'} in the shared daily rotation.`;
  } catch (error) {
    console.error('Unable to load daily quotes.', error);
    quoteList.replaceChildren();
    quoteStatus.textContent = 'Daily quotes could not be loaded. Refresh the page or check the connection before editing.';
    quoteFormError.textContent = 'The saved list was not loaded, so editing is disabled to avoid overwriting it.';
  } finally {
    setBusy(false);
  }
});
