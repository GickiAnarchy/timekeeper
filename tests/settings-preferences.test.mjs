import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

// Execute the real appearance-settings block with small browser-like controls.
// Passing the native change event to each listener reproduces actual DOM behavior.
const settingsSource = readFileSync(new URL('../scripts/settings.js', import.meta.url), 'utf8');
const blockStart = settingsSource.indexOf('const themeSelect =');
const blockEnd = settingsSource.indexOf('\nconst downloadBackupButton =', blockStart);
assert.notEqual(blockStart, -1, 'appearance settings block should remain in settings.js');
assert.notEqual(blockEnd, -1, 'appearance settings block should end before backup controls');
const appearanceSettingsSource = settingsSource.slice(blockStart, blockEnd);

function makeControl(value = '') {
  return {
    value,
    checked: false,
    listeners: new Map(),
    addEventListener(type, callback) {
      const handlers = this.listeners.get(type) || [];
      handlers.push(callback);
      this.listeners.set(type, handlers);
    }
  };
}

function change(control) {
  for (const callback of control.listeners.get('change') || []) {
    callback({ type: 'change', target: control });
  }
}

function createSettingsHarness({ embedded }) {
  const themeSelect = makeControl('forest');
  const fontScaleInputs = ['1', '1.15', '1.3', '1.5'].map(makeControl);
  const values = new Map();
  const messages = [];
  const listeners = new Map();
  const window = {
    location: { origin: 'https://timekeeper.example' },
    localStorage: {
      getItem(key) { return values.has(key) ? values.get(key) : null; },
      setItem(key, value) { values.set(key, String(value)); }
    },
    addEventListener(type, callback) {
      const handlers = listeners.get(type) || [];
      handlers.push(callback);
      listeners.set(type, handlers);
    }
  };
  const parent = { postMessage(message, origin) { messages.push({ message, origin }); } };
  window.parent = embedded ? parent : window;
  const document = {
    documentElement: { dataset: {} },
    getElementById(id) { return id === 'theme-select' ? themeSelect : null; },
    querySelectorAll(selector) { return selector === 'input[name="font-scale"]' ? fontScaleInputs : []; }
  };

  vm.runInNewContext(appearanceSettingsSource, { window, document, console });
  return { themeSelect, fontScaleInputs, values, messages };
}

test('text-size changes inside the iframe notify the app shell without throwing', () => {
  const fixture = createSettingsHarness({ embedded: true });
  const largeOption = fixture.fontScaleInputs.find(input => input.value === '1.3');
  fixture.fontScaleInputs.forEach(input => { input.checked = input === largeOption; });

  assert.doesNotThrow(() => change(largeOption));
  const update = fixture.messages.at(-1);
  assert.equal(update.origin, 'https://timekeeper.example');
  assert.equal(update.message.type, 'timekeeper-settings-update');
  assert.equal(update.message.theme, 'forest');
  assert.equal(update.message.fontScale, 1.3);
});

test('standalone appearance changes save the selected theme and text size', () => {
  const fixture = createSettingsHarness({ embedded: false });
  fixture.themeSelect.value = 'coastal';
  assert.doesNotThrow(() => change(fixture.themeSelect));

  const largestOption = fixture.fontScaleInputs.find(input => input.value === '1.5');
  fixture.fontScaleInputs.forEach(input => { input.checked = input === largestOption; });
  assert.doesNotThrow(() => change(largestOption));

  assert.equal(fixture.values.get('timekeeper-theme'), 'coastal');
  assert.equal(fixture.values.get('timekeeper-font-scale'), '1.5');
});


// The shell must scale the body itself as well as child elements so direct body text
// inherits the selected size on every iframe page.
const shellSource = readFileSync(new URL('../scripts/index.js', import.meta.url), 'utf8');
const scaleStart = shellSource.indexOf('const fontScaleStates =');
const scaleEnd = shellSource.indexOf('\nexport function initializeShell()', scaleStart);
assert.notEqual(scaleStart, -1, 'shell text-scaling state should remain in index.js');
assert.notEqual(scaleEnd, -1, 'shell text-scaling helper should precede initialization');
const scaleFunctionSource = shellSource.slice(scaleStart, scaleEnd);
const scaleContext = { WeakMap };
vm.runInNewContext(`${scaleFunctionSource}\nthis.applyTextScaleToDocument = applyTextScaleToDocument;`, scaleContext);
const applyTextScaleToDocument = scaleContext.applyTextScaleToDocument;

function makeStyledElement(fontSize, lineHeight = 'normal') {
  const inlineValues = new Map();
  const inlinePriorities = new Map();
  return {
    baseFontSize: fontSize,
    baseLineHeight: lineHeight,
    style: {
      getPropertyValue(property) { return inlineValues.get(property) || ''; },
      getPropertyPriority(property) { return inlinePriorities.get(property) || ''; },
      setProperty(property, value, priority = '') {
        inlineValues.set(property, String(value));
        inlinePriorities.set(property, priority);
      },
      removeProperty(property) { inlineValues.delete(property); inlinePriorities.delete(property); }
    },
    querySelectorAll() { return []; }
  };
}

test('shell text scaling includes body text and descendants in embedded pages', () => {
  const body = makeStyledElement('14px', '21px');
  const paragraph = makeStyledElement('12px', '18px');
  body.querySelectorAll = selector => selector === '*' ? [paragraph] : [];
  const documentElement = makeStyledElement('16px', 'normal');
  const document = {
    documentElement,
    body,
    defaultView: {
      getComputedStyle(element) { return { fontSize: element.baseFontSize, lineHeight: element.baseLineHeight }; },
      MutationObserver: class { observe() {} disconnect() {} },
      requestAnimationFrame(callback) { callback(); }
    }
  };

  applyTextScaleToDocument(document, 1.3);

  assert.equal(body.style.getPropertyValue('font-size'), '18.2px');
  assert.ok(Math.abs(Number.parseFloat(paragraph.style.getPropertyValue('font-size')) - 15.6) < 1e-9);
  assert.equal(documentElement.style.getPropertyValue('font-size'), '20.8px');
});
