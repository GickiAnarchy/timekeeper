import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const adminAuthPath = path.join(root, 'scripts', 'admin-auth.mjs');
const adminPath = path.join(root, 'scripts', 'admin.js');
const htmlPath = path.join(root, 'html', 'admin-settings.html');
const OWNER_UID = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';

class FakeEventTarget {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, listener) {
    const list = this.listeners.get(type) || [];
    list.push(listener);
    this.listeners.set(type, list);
  }
  async dispatch(type, event = {}) {
    event.type = type;
    event.preventDefault ||= () => { event.defaultPrevented = true; };
    for (const listener of this.listeners.get(type) || []) await listener(event);
  }
}

class FakeElement extends FakeEventTarget {
  constructor(id = '') {
    super();
    this.id = id;
    this.hidden = false;
    this.disabled = false;
    this.open = false;
    this.value = '';
    this.textContent = '';
    this.dataset = {};
    this.children = [];
    this.attributes = new Map();
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  append(...items) { this.children.push(...items); }
  appendChild(item) { this.children.push(item); return item; }
  replaceChildren(...items) { this.children = items; }
  querySelectorAll() { return []; }
  querySelector() { return null; }
  reset() { this.value = ''; }
  focus() {}
  showModal() { this.open = true; }
  async close() { this.open = false; await this.dispatch('close'); }
}

function makeDom() {
  const ids = [
    'owner-auth-dialog', 'owner-auth-form', 'owner-auth-email', 'owner-auth-password',
    'owner-auth-status', 'owner-auth-submit', 'owner-auth-cancel', 'admin-content',
    'quote-toggle', 'quote-card', 'quote-list', 'quote-status', 'daily-quote-form',
    'quote-form-disclosure', 'quote-form-summary', 'quote-form-error',
    'quote-save-button', 'quote-cancel-button', 'quote-text', 'quote-author',
    'quote-work', 'quote-source'
  ];
  const elements = new Map(ids.map(id => [id, new FakeElement(id)]));
  elements.get('owner-auth-dialog').open = false;
  elements.get('admin-content').hidden = true;
  elements.get('quote-form-disclosure').open = false;
  const document = new FakeEventTarget();
  document.getElementById = id => elements.get(id) || null;
  document.createElement = tag => new FakeElement(tag);
  document.body = new FakeElement('body');
  return { document, elements };
}

async function loadAuthModule() {
  const source = await fs.readFile(adminAuthPath, 'utf8');
  const firebaseCalls = { persistence: [], signIns: [], signOuts: [] };
  const auth = { currentUser: { uid: 'stale-user' } };
  const context = {
    console,
    getAuth: () => auth,
    inMemoryPersistence: Symbol('inMemoryPersistence'),
    setPersistence: async (...args) => firebaseCalls.persistence.push(args),
    signInWithEmailAndPassword: async (...args) => {
      firebaseCalls.signIns.push(args);
      auth.currentUser = { uid: args[0].nextUid ?? OWNER_UID };
      return { user: auth.currentUser };
    },
    signOut: async (...args) => { firebaseCalls.signOuts.push(args); auth.currentUser = null; },
    app: {},
    globalThis: null
  };
  context.globalThis = context;
  const transformed = source
    .replace(/^import .*?;\n/gm, '')
    .replace(/export const /g, 'const ')
    .replace(/export async function /g, 'async function ')
    .replace(/export function /g, 'function ')
    + '\nglobalThis.__exports = { DAILY_QUOTES_OWNER_UID, prepareDailyQuotesAdminSignIn, signInDailyQuotesAdmin, isDailyQuotesAdmin, signOutDailyQuotesAdmin };';
  vm.runInNewContext(transformed, context, { filename: adminAuthPath });
  return { api: context.__exports, auth, firebaseCalls };
}

async function loadAdminScenario({ signIn, initialEmail = 'owner@example.test', initialPassword = 'secret' } = {}) {
  const source = await fs.readFile(adminPath, 'utf8');
  const dom = makeDom();
  const calls = { quoteLoads: 0, routes: [], signOuts: 0, signIns: [] };
  const authApi = {
    prepareDailyQuotesAdminSignIn: async () => {},
    signInDailyQuotesAdmin: async (email, password) => {
      calls.signIns.push([email, password]);
      if (signIn instanceof Error) throw signIn;
      return { uid: signIn ?? OWNER_UID };
    },
    isDailyQuotesAdmin: user => user?.uid === OWNER_UID,
    signOutDailyQuotesAdmin: async () => { calls.signOuts++; }
  };
  const context = {
    console,
    document: dom.document,
    window: {
      confirm: () => false,
      location: { href: 'https://example.test/html/admin-settings.html', replace: url => calls.routes.push(url) }
    },
    URL,
    loadDailyQuotes: async () => { calls.quoteLoads++; return []; },
    saveDailyQuotes: async quotes => quotes,
    normalizeDailyQuotes: quotes => quotes,
    __authApi: authApi,
    globalThis: null
  };
  context.globalThis = context;
  const transformed = source
    .replace(/^import .*?;\n/gm, '')
    .replace("await import('./admin-auth.mjs')", 'globalThis.__authApi');
  vm.runInNewContext(transformed, context, { filename: adminPath });
  await dom.document.dispatch('DOMContentLoaded');
  const fields = dom.elements;
  return { ...dom, calls, fields };
}

function submitEvent() { return { preventDefault() { this.defaultPrevented = true; } }; }


test('admin auth uses in-memory persistence and exact owner UID gating', async () => {
  const { api, auth, firebaseCalls } = await loadAuthModule();
  assert.equal(api.DAILY_QUOTES_OWNER_UID, OWNER_UID);
  await api.prepareDailyQuotesAdminSignIn();
  assert.equal(firebaseCalls.persistence.length, 1);
  assert.equal(firebaseCalls.persistence[0][0], auth);
  assert.equal(firebaseCalls.persistence[0][1].description, 'inMemoryPersistence');
  assert.equal(firebaseCalls.signOuts.length, 1, 'stale persisted user is cleared');

  assert.equal(api.isDailyQuotesAdmin({ uid: OWNER_UID }), true);
  assert.equal(api.isDailyQuotesAdmin({ uid: `${OWNER_UID}x` }), false);
  assert.equal(api.isDailyQuotesAdmin({ uid: 'another-user' }), false);
  assert.equal(api.isDailyQuotesAdmin(null), false);
});

test('admin content starts hidden and does not load quotes before approved sign-in', async () => {
  const page = await loadAdminScenario({ signIn: OWNER_UID });
  assert.equal(page.fields.get('admin-content').hidden, true);
  assert.equal(page.calls.quoteLoads, 0);
  assert.equal(page.fields.get('owner-auth-dialog').open, true);
});

test('approved owner sign-in reveals editor, clears password, and initializes quote loading', async () => {
  const page = await loadAdminScenario({ signIn: OWNER_UID });
  const email = page.fields.get('owner-auth-email');
  const password = page.fields.get('owner-auth-password');
  email.value = 'owner@example.test';
  password.value = 'approved-password';
  await page.fields.get('owner-auth-form').dispatch('submit', submitEvent());
  assert.deepEqual(page.calls.signIns, [['owner@example.test', 'approved-password']]);
  assert.equal(page.fields.get('owner-auth-password').value, '');
  assert.equal(page.fields.get('admin-content').hidden, false);
  assert.equal(page.calls.quoteLoads, 1);
  assert.equal(page.calls.routes.length, 0);
});

for (const [name, signIn] of [
  ['unrelated UID', 'not-the-owner'],
  ['auth failure', new Error('invalid credentials')]
]) {
  test(`${name} routes Home without initializing quote manager`, async () => {
    const page = await loadAdminScenario({ signIn });
    page.fields.get('owner-auth-email').value = 'someone@example.test';
    page.fields.get('owner-auth-password').value = 'password';
    await page.fields.get('owner-auth-form').dispatch('submit', submitEvent());
    assert.equal(page.calls.quoteLoads, 0);
    assert.equal(page.fields.get('admin-content').hidden, true);
    assert.equal(page.calls.routes.length, 1);
    assert.match(page.calls.routes[0], /\/html\/home\.html$/);
  });
}

for (const [name, action] of [
  ['empty fields', async page => {
    await page.fields.get('owner-auth-form').dispatch('submit', submitEvent());
  }],
  ['Cancel', async page => {
    await page.fields.get('owner-auth-cancel').dispatch('click');
  }],
  ['Escape', async page => {
    await page.fields.get('owner-auth-dialog').dispatch('cancel', { preventDefault() { this.defaultPrevented = true; } });
  }]
]) {
  test(`${name} routes Home without initializing quote manager`, async () => {
    const page = await loadAdminScenario({ signIn: OWNER_UID });
    if (name === 'empty fields') {
      page.fields.get('owner-auth-email').value = '';
      page.fields.get('owner-auth-password').value = '';
    }
    await action(page);
    assert.equal(page.calls.quoteLoads, 0);
    assert.equal(page.fields.get('admin-content').hidden, true);
    assert.equal(page.calls.routes.length, 1);
    assert.match(page.calls.routes[0], /\/html\/home\.html$/);
  });
}

test('admin markup keeps protected content hidden in the initial document', async () => {
  const html = await fs.readFile(htmlPath, 'utf8');
  assert.match(html, /<main[^>]+id="admin-content"[^>]+hidden>/);
  assert.match(html, /id="owner-auth-dialog"/);
  assert.match(html, /id="owner-auth-form"/);
});
