import test from 'node:test';
import assert from 'node:assert/strict';
import { watchAdminOnlyControls } from '../scripts/admin-controls.mjs';

const observers = [];

class FakeMutationObserver {
  constructor(callback) {
    this.callback = callback;
    observers.push(this);
  }
  observe(target, options) {
    this.target = target;
    this.options = options;
  }
  disconnect() {
    this.disconnected = true;
  }
  trigger() {
    this.callback([], this);
  }
}

function makeRoot(controls = []) {
  return {
    controls,
    documentElement: {},
    defaultView: { MutationObserver: FakeMutationObserver },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-admin-only]');
      return this.controls.filter(control => control.adminOnly);
    }
  };
}

function makeControl({ adminOnly = true, disabled = false } = {}) {
  return { adminOnly, disabled };
}

test('admin-only native controls are disabled for non-admins and restored for the approved owner', () => {
  const enabledButton = makeControl();
  const businessDisabledButton = makeControl({ disabled: true });
  const publicFilter = makeControl({ adminOnly: false });
  const root = makeRoot([enabledButton, businessDisabledButton, publicFilter]);
  const gate = watchAdminOnlyControls(root, false);

  assert.equal(enabledButton.disabled, true);
  assert.equal(businessDisabledButton.disabled, true);
  assert.equal(publicFilter.disabled, false);

  gate.setAdmin(true);
  assert.equal(enabledButton.disabled, false);
  assert.equal(businessDisabledButton.disabled, true, 'non-auth disabled state is preserved');
  assert.equal(publicFilter.disabled, false);

  gate.setAdmin(false);
  assert.equal(enabledButton.disabled, true);
  gate.disconnect();
  assert.equal(enabledButton.disabled, false, 'disconnect restores the original state');
  assert.equal(businessDisabledButton.disabled, true);
});

test('dynamically added ledger action groups inherit the current admin state and removed markers are restored', () => {
  const firstActionGroup = makeControl();
  const root = makeRoot([firstActionGroup]);
  const gate = watchAdminOnlyControls(root, false);
  const observer = observers.at(-1);
  assert.equal(firstActionGroup.disabled, true);
  assert.equal(observer.options.subtree, true);

  const laterActionGroup = makeControl();
  root.controls.push(laterActionGroup);
  observer.trigger();
  assert.equal(laterActionGroup.disabled, true);

  gate.setAdmin(true);
  assert.equal(firstActionGroup.disabled, false);
  assert.equal(laterActionGroup.disabled, false);

  laterActionGroup.adminOnly = false;
  observer.trigger();
  assert.equal(laterActionGroup.disabled, false, 'removing the marker restores the original state');
  gate.disconnect();
  assert.equal(observer.disconnected, true);
});
