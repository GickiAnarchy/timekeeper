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
  const viewport = Object.assign(createEventTarget(), { height: 800, width: 400, offsetTop: 0, offsetLeft: 0 });
  const view = Object.assign(createEventTarget(), {
    innerHeight: 800,
    innerWidth: 400,
    visualViewport: viewport,
    requestAnimationFrame(callback) { callback(); },
    setTimeout(callback) { timers.push(callback); return timers.length; }
  });
  const document = Object.assign(createEventTarget(), {
    defaultView: view,
    documentElement: { clientHeight: 800, clientWidth: 400 },
    activeElement: null
  });
  return { document, view, viewport, timers };
}

function createControl(tagName, options = {}) {
  const { type = 'text', top = 760, bottom = 800, left = 10, right = 50, ...attributes } = options;
  const scrollCalls = [];
  return Object.assign({
    tagName,
    type,
    disabled: false,
    readOnly: false,
    isConnected: true,
    scrollCalls,
    getBoundingClientRect() { return { top, bottom, left, right, height: bottom - top, width: right - left }; },
    hasAttribute(name) { return Object.hasOwn(attributes, name); },
    getAttribute(name) { return attributes[name] ?? null; },
    scrollIntoView(options) { scrollCalls.push(options); }
  }, attributes);
}

test('focused text fields and selects scroll into view when outside the viewport', () => {
  for (const control of [
    createControl('INPUT', { top: 780, bottom: 820 }),
    createControl('TEXTAREA', { top: 780, bottom: 820 }),
    createControl('SELECT', { top: 780, bottom: 820 })
  ]) {
    const { document } = createHarness();
    enableAutoScrollOnFocus(document);
    document.activeElement = control;
    document.dispatch('focusin', { target: control });

    assert.equal(control.scrollCalls.length, 1);
    assert.deepEqual(control.scrollCalls[0], {
      behavior: 'auto', block: 'nearest', inline: 'nearest'
    });
  }
});

test('buttons, non-text inputs, links, and tabindex elements are also revealed on focus', () => {
  const controls = [
    createControl('BUTTON', { top: 780, bottom: 820 }),
    createControl('INPUT', { type: 'checkbox', top: 780, bottom: 820 }),
    createControl('INPUT', { type: 'radio', top: 780, bottom: 820 }),
    createControl('A', { href: '/ledger', top: 780, bottom: 820 }),
    createControl('DIV', { tabindex: '-1', top: 780, bottom: 820 }),
    createControl('DIV', { contentEditable: 'true', top: 780, bottom: 820 })
  ];

  for (const control of controls) {
    const { document } = createHarness();
    enableAutoScrollOnFocus(document);
    document.activeElement = control;
    document.dispatch('focusin', { target: control });
    assert.equal(control.scrollCalls.length, 1, `${control.tagName} ${control.type || ''}`);
    assert.deepEqual(control.scrollCalls[0], {
      behavior: 'auto', block: 'nearest', inline: 'nearest'
    });
  }
});

test('a visual viewport resize rechecks the focused control after the keyboard opens', () => {
  const { document, viewport } = createHarness();
  const control = createControl('INPUT', { top: 780, bottom: 820 });
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

test('a control fully visible at the viewport edge is left in place', () => {
  const { document } = createHarness();
  const control = createControl('BUTTON', { top: 760, bottom: 800 });
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });

  assert.equal(control.scrollCalls.length, 0);
});

test('a focused control clipped horizontally is revealed', () => {
  const { document } = createHarness();
  const control = createControl('BUTTON', { top: 300, bottom: 340, left: -10, right: 30 });
  enableAutoScrollOnFocus(document);
  document.activeElement = control;
  document.dispatch('focusin', { target: control });

  assert.equal(control.scrollCalls.length, 1);
  assert.deepEqual(control.scrollCalls[0], {
    behavior: 'auto', block: 'nearest', inline: 'nearest'
  });
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

test('a focused dialog action button is revealed when it falls below the viewport', () => {
  const { document } = createHarness();
  const button = createControl('BUTTON', { top: 780, bottom: 820 });
  createDialogFor(button);
  enableAutoScrollOnFocus(document);
  document.activeElement = button;
  document.dispatch('focusin', { target: button });

  assert.equal(button.scrollCalls.length, 1);
  assert.deepEqual(button.scrollCalls[0], {
    behavior: 'auto', block: 'nearest', inline: 'nearest'
  });
});

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

test('non-focusable controls are ignored and initialization is idempotent', () => {
  const { document } = createHarness();
  enableAutoScrollOnFocus(document);
  enableAutoScrollOnFocus(document);
  assert.equal(document.listenerCount('focusin'), 1);

  const disabledButton = createControl('BUTTON', { top: 780, bottom: 820 });
  disabledButton.disabled = true;
  document.activeElement = disabledButton;
  document.dispatch('focusin', { target: disabledButton });
  assert.equal(disabledButton.scrollCalls.length, 0);

  const hiddenInput = createControl('INPUT', { type: 'hidden', top: 780, bottom: 820 });
  document.activeElement = hiddenInput;
  document.dispatch('focusin', { target: hiddenInput });
  assert.equal(hiddenInput.scrollCalls.length, 0);
});
