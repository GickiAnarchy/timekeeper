import test from 'node:test';
import assert from 'node:assert/strict';
import { enableAutoScrollOnFocus } from '../scripts/keyboard.mjs';

function createEventTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, listener) {
      const callbacks = listeners.get(type) || [];
      callbacks.push(listener);
      listeners.set(type, callbacks);
    },
    dispatch(type, event = {}) {
      for (const listener of listeners.get(type) || []) listener(event);
    },
    listenerCount(type) {
      return (listeners.get(type) || []).length;
    }
  };
}

function createHarness() {
  const timers = [];
  const viewport = Object.assign(createEventTarget(), { height: 800, offsetTop: 0 });
  const view = Object.assign(createEventTarget(), {
    innerHeight: 800,
    visualViewport: viewport,
    requestAnimationFrame(callback) { callback(); },
    setTimeout(callback) { timers.push(callback); return timers.length; }
  });
  const document = Object.assign(createEventTarget(), {
    defaultView: view,
    documentElement: { clientHeight: 800 },
    activeElement: null
  });
  return { document, view, viewport, timers };
}

function createControl(tagName, { type = 'text', top = 760, bottom = 800 } = {}) {
  const scrollCalls = [];
  return {
    tagName,
    type,
    disabled: false,
    readOnly: false,
    isConnected: true,
    scrollCalls,
    getBoundingClientRect() { return { top, bottom, height: bottom - top }; },
    scrollIntoView(options) { scrollCalls.push(options); }
  };
}

test('focused text fields and selects scroll into view when outside the viewport', () => {
  for (const control of [createControl('INPUT'), createControl('TEXTAREA'), createControl('SELECT')]) {
    const { document } = createHarness();
    enableAutoScrollOnFocus(document);
    document.activeElement = control;
    document.dispatch('focusin', { target: control });

    assert.equal(control.scrollCalls.length, 1);
    assert.deepEqual(control.scrollCalls[0], {
      behavior: 'auto', block: 'center', inline: 'nearest'
    });
  }
});

test('a visual viewport resize rechecks the focused control after the keyboard opens', () => {
  const { document, viewport } = createHarness();
  const control = createControl('INPUT');
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });
  assert.equal(control.scrollCalls.length, 1);

  viewport.height = 420;
  viewport.dispatch('resize');
  assert.equal(control.scrollCalls.length, 2);
});

test('a focused control already inside the visible area is not repositioned', () => {
  const { document } = createHarness();
  const control = createControl('INPUT', { top: 300, bottom: 340 });
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });

  assert.equal(control.scrollCalls.length, 0);
});

test('non-text controls are ignored and initialization is idempotent', () => {
  const { document } = createHarness();
  enableAutoScrollOnFocus(document);
  enableAutoScrollOnFocus(document);
  assert.equal(document.listenerCount('focusin'), 1);

  const checkbox = createControl('INPUT', { type: 'checkbox' });
  document.activeElement = checkbox;
  document.dispatch('focusin', { target: checkbox });
  assert.equal(checkbox.scrollCalls.length, 0);
});
