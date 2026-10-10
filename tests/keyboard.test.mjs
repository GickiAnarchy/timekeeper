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

function createDialogFor(control) {
  const properties = new Map();
  const style = {
    setProperty(name, value, priority = '') { properties.set(name, { value, priority }); },
    getPropertyValue(name) { return properties.get(name)?.value || ''; },
    getPropertyPriority(name) { return properties.get(name)?.priority || ''; },
    removeProperty(name) { properties.delete(name); }
  };
  const dialog = Object.assign(createEventTarget(), {
    tagName: 'DIALOG',
    open: true,
    style,
    parentElement: null
  });
  control.parentElement = dialog;
  return { dialog, properties };
}

test('focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', () => {
  const { document, viewport } = createHarness();
  const control = createControl('TEXTAREA');
  const { dialog, properties } = createDialogFor(control);
  properties.set('margin-block', { value: '3px', priority: 'important' });
  enableAutoScrollOnFocus(document);
  viewport.height = 420;
  document.activeElement = control;
  document.dispatch('focusin', { target: control });

  assert.equal(properties.get('position').value, 'fixed');
  assert.equal(properties.get('inset-block-start').value, '8px');
  assert.equal(properties.get('inset-block-end').value, '388px');
  assert.equal(properties.get('max-height').value, '404px');
  assert.equal(properties.get('margin-block').value, 'auto');

  dialog.open = true;
  dialog.dispatch('close');
  assert.equal(properties.get('position').value, 'fixed');

  dialog.open = false;
  dialog.dispatch('close');
  assert.equal(properties.has('position'), false);
  assert.deepEqual(properties.get('margin-block'), { value: '3px', priority: 'important' });
});

test('dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', () => {
  const { document, viewport } = createHarness();
  const control = createControl('INPUT');
  const { properties } = createDialogFor(control);
  enableAutoScrollOnFocus(document);
  viewport.height = 400;
  viewport.offsetTop = 120;
  document.activeElement = control;
  document.dispatch('focusin', { target: control });
  assert.equal(properties.get('inset-block-start').value, '128px');
  assert.equal(properties.get('inset-block-end').value, '288px');

  viewport.offsetTop = 150;
  viewport.dispatch('scroll');
  assert.equal(properties.get('inset-block-start').value, '158px');
  assert.equal(properties.get('inset-block-end').value, '258px');

  document.activeElement = null;
  document.dispatch('focusout');
  assert.equal(properties.size, 0);
});

test('an open dialog adapts when the keyboard resize arrives after field focus', () => {
  const { document, viewport } = createHarness();
  const control = createControl('TEXTAREA');
  const { properties } = createDialogFor(control);
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });
  assert.equal(properties.size, 0);

  viewport.height = 420;
  viewport.dispatch('resize');
  assert.equal(properties.get('max-height').value, '404px');
  assert.equal(properties.get('inset-block-end').value, '388px');
});

test('dialogs keep their original layout when the visual viewport has not reduced', () => {
  const { document } = createHarness();
  const control = createControl('SELECT');
  const { properties } = createDialogFor(control);
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });
  assert.equal(properties.size, 0);
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
