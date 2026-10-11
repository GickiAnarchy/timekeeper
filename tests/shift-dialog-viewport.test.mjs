import test from 'node:test';
import assert from 'node:assert/strict';
import { resetShiftDialogViewport, syncShiftDialogViewport } from '../scripts/shift-dialog-viewport.mjs';

function createDialog(activeElement = null) {
  const values = new Map();
  const classes = new Set();
  const document = { activeElement, documentElement: { clientHeight: 800 } };
  const dialog = {
    open: true,
    ownerDocument: document,
    style: {
      setProperty(name, value) { values.set(name, value); },
      removeProperty(name) { values.delete(name); }
    },
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); }
    },
    contains(element) { return element === activeElement; }
  };
  return { dialog, document, values, classes };
}

function createView({ innerHeight = 800, visualHeight = 800, offsetTop = 0 } = {}) {
  return {
    innerHeight,
    visualViewport: { height: visualHeight, offsetTop },
    requestAnimationFrame(callback) { callback(); }
  };
}

function createNotesControl({ tagName = 'TEXTAREA', top = 530, bottom = 570 } = {}) {
  const scrollCalls = [];
  return {
    tagName,
    disabled: false,
    readOnly: false,
    isConnected: true,
    scrollCalls,
    getBoundingClientRect() { return { top, bottom, height: bottom - top }; },
    scrollIntoView(options) { scrollCalls.push(options); }
  };
}

test('Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', () => {
  const notes = createNotesControl();
  const { dialog, document, values, classes } = createDialog(notes);
  const view = createView({ visualHeight: 420 });

  assert.equal(syncShiftDialogViewport(dialog, view), true);
  assert.equal(document.activeElement, notes);
  assert.equal(classes.has('viewport-constrained'), true);
  assert.equal(values.get('--shift-visible-top'), '8px');
  assert.equal(values.get('--shift-visible-bottom'), '388px');
  assert.equal(values.get('--shift-visible-max-height'), '404px');
  assert.deepEqual(notes.scrollCalls, [{
    behavior: 'auto', block: 'nearest', inline: 'nearest'
  }]);

  const visibleDialogTop = 8;
  const visibleDialogBottom = view.visualViewport.height - 8;
  assert.ok(visibleDialogTop < visibleDialogBottom);
  assert.ok(Number.parseFloat(values.get('--shift-visible-max-height')) <= visibleDialogBottom - visibleDialogTop);
});

test('Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', () => {
  const notes = createNotesControl();
  const { dialog, values, classes } = createDialog(notes);
  const view = createView({ visualHeight: 400, offsetTop: 120 });

  syncShiftDialogViewport(dialog, view);
  assert.equal(values.get('--shift-visible-top'), '128px');
  assert.equal(values.get('--shift-visible-bottom'), '288px');
  assert.equal(values.get('--shift-visible-max-height'), '384px');

  dialog.open = false;
  assert.equal(syncShiftDialogViewport(dialog, view), false);
  assert.equal(classes.has('viewport-constrained'), false);
  assert.equal(values.size, 0);
  assert.equal(notes.scrollCalls.length, 1);
});

test('Shift dialog uses the layout viewport when VisualViewport is unavailable', () => {
  const { dialog, values } = createDialog();
  assert.equal(syncShiftDialogViewport(dialog, { innerHeight: 800 }), true);
  assert.equal(values.get('--shift-visible-top'), '8px');
  assert.equal(values.get('--shift-visible-bottom'), '8px');
  assert.equal(values.get('--shift-visible-max-height'), '784px');
});

test('Shift edit dialog reveals a focused action button that is outside the visible area', () => {
  const button = createNotesControl({ tagName: 'BUTTON', top: 790, bottom: 830 });
  const { dialog } = createDialog(button);
  const view = createView();

  assert.equal(syncShiftDialogViewport(dialog, view), true);
  assert.deepEqual(button.scrollCalls, [{
    behavior: 'auto', block: 'nearest', inline: 'nearest'
  }]);
});
