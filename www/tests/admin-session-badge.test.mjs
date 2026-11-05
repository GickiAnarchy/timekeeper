import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ADMIN_SESSION_MESSAGE_TYPE,
  DAILY_QUOTES_OWNER_UID,
  announceAdminSessionToShell,
  watchAdminAccessBadgeMessages
} from '../scripts/admin.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const adminController = readFileSync(join(projectRoot, 'scripts', 'admin.js'), 'utf8');

function makeShell() {
  const listeners = new Map();
  const badge = { hidden: true };
  const iframe = { contentWindow: { page: 'first' } };
  const rootWindow = {
    location: { origin: 'https://timekeeper.test' },
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
    removeEventListener(type, listener) {
      if (listeners.get(type) === listener) listeners.delete(type);
    }
  };
  const root = {
    defaultView: rootWindow,
    getElementById(id) {
      return id === 'admin-access-badge' ? badge : null;
    },
    querySelector(selector) {
      assert.equal(selector, 'iframe[name="main-content"]');
      return iframe;
    }
  };
  const stop = watchAdminAccessBadgeMessages(root);
  return { badge, iframe, listeners, rootWindow, stop };
}

function send(shell, source, isAdmin, overrides = {}) {
  shell.listeners.get('message')({
    origin: shell.rootWindow.location.origin,
    source,
    data: { type: ADMIN_SESSION_MESSAGE_TYPE, isAdmin },
    ...overrides
  });
}

test('the shell badge follows verified owner sign-in and sign-out across iframe page navigation', () => {
  const shell = makeShell();
  const firstPage = shell.iframe.contentWindow;

  send(shell, firstPage, true);
  assert.equal(shell.badge.hidden, false, 'approved owner sign-in reveals the shell badge');

  shell.iframe.contentWindow = { page: 'ledger' };
  send(shell, firstPage, false);
  assert.equal(shell.badge.hidden, false, 'a stale page cannot overwrite the current iframe session');

  send(shell, shell.iframe.contentWindow, false);
  assert.equal(shell.badge.hidden, true, 'sign-out from the current page hides the persistent shell badge');
  shell.stop();
  assert.equal(shell.listeners.has('message'), false, 'the message listener can be removed');
});

test('child pages announce only approved-owner state to their shell', () => {
  const messages = [];
  const shellWindow = {
    postMessage(message, targetOrigin) {
      messages.push({ message, targetOrigin });
    }
  };
  const childWindow = {
    parent: shellWindow,
    location: { origin: 'https://timekeeper.test' }
  };

  assert.equal(announceAdminSessionToShell({ uid: DAILY_QUOTES_OWNER_UID }, childWindow), true);
  assert.equal(announceAdminSessionToShell({ uid: 'not-the-owner' }, childWindow), true);
  assert.equal(announceAdminSessionToShell(null, childWindow), true);
  assert.deepEqual(messages.map(entry => entry.message), [
    { type: ADMIN_SESSION_MESSAGE_TYPE, isAdmin: true },
    { type: ADMIN_SESSION_MESSAGE_TYPE, isAdmin: false },
    { type: ADMIN_SESSION_MESSAGE_TYPE, isAdmin: false }
  ]);
  assert.ok(messages.every(entry => entry.targetOrigin === 'https://timekeeper.test'));

  const topLevelWindow = { location: childWindow.location };
  topLevelWindow.parent = topLevelWindow;
  assert.equal(announceAdminSessionToShell({ uid: DAILY_QUOTES_OWNER_UID }, topLevelWindow), false);
});

test('the sign-out helper relies on Firebase and shell session updates, not a child-document badge', () => {
  const signOut = adminController.match(/export async function signOutDailyQuotesAdmin\(\) \{[\s\S]*?\n\}/)?.[0];
  assert.ok(signOut, 'sign-out helper should exist');
  assert.match(signOut, /await api\.signOut\(auth\)/);
  assert.match(signOut, /announceAdminSessionToShell\(null\)/);
  assert.doesNotMatch(signOut, /document\.getElementById\(['"]admin-access-badge/);
  assert.match(adminController, /onAuthStateChanged\(auth, user => \{\s*announceAdminSessionToShell\(user\)/);
  assert.match(adminController, /if \(badge\) watchAdminAccessBadgeMessages\(document\)/);
  assert.match(adminController, /setPersistence\(auth, api\.browserLocalPersistence\)/);
});

test('shell ignores untrusted, malformed, and non-current iframe messages', () => {
  const shell = makeShell();
  const currentPage = shell.iframe.contentWindow;
  send(shell, currentPage, true, { origin: 'https://attacker.test' });
  send(shell, {}, true);
  send(shell, currentPage, 'yes');
  send(shell, currentPage, true, { data: { type: 'other-message', isAdmin: true } });
  assert.equal(shell.badge.hidden, true);
});
