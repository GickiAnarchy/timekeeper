# scripts/index.js

[Exact copy](../../original/scripts/index.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Keep navigation in the shell's single asset: a missing separately deployed
```

Comment: Keep navigation in the shell's single asset: a missing separately deployed

### Line 2

```text
// module must not prevent every click handler from being registered.
```

Comment: module must not prevent every click handler from being registered.

### Line 3

```text
// Native buttons retain Enter/Space activation and the shared focus-visible ring.
```

Comment: Native buttons retain Enter/Space activation and the shared focus-visible ring.

### Line 4

```text
// Categories remain grouped, but only one list is expanded at a time.
```

Comment: Categories remain grouped, but only one list is expanded at a time.

### Line 5

```text
export function setupNavigationGroups(root) {
```

Exports this reusable UI setup function so the shell can initialize it from another module.

### Line 6

```text
  const groups = [...(root?.querySelectorAll('.nav-group') || [])].map(group => ({
```

Transforms each item of an array containing the expanded entries/properties from uses `root?.querySelectorAll('.nav-group')`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to an array containing  using a callback taking group that an object with fields group: `group` (group); toggle: finds the first descendant of `group` (group) matching CSS selector ".nav-group-toggle"; panel: finds the first descendant of `group` (group) matching CSS selector ".nav-group-pages" and returns a new array; stores the result in `groups`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 7

```text
    group,
```

Keeps the navigation group element associated with its controls.

### Line 8

```text
    toggle: group.querySelector('.nav-group-toggle'),
```

Finds the button that expands or collapses this navigation category.

### Line 9

```text
    panel: group.querySelector('.nav-group-pages')
```

Finds the page list whose hidden state is controlled by the category button.

### Line 10

```text
  }));
```

Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 11

```text

```

Blank line separates related code sections for readability.

### Line 12

```text
  function setExpanded(entry, expanded) {
```

Defines `setExpanded` (set expanded), a reusable function taking entry, expanded. Its body runs when called, not when declared.

### Line 13

```text
    entry.toggle.setAttribute('aria-expanded', String(expanded));
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 14

```text
    entry.panel.hidden = !expanded;
```

Assigns the result of !expanded to entry.panel.hidden, updating this control or record for the next step.

### Line 15

```text
  }
```

Closes function setExpanded. Control continues after this block.

### Line 16

```text

```

Blank line separates related code sections for readability.

### Line 17

```text
  for (const entry of groups) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 18

```text
    setExpanded(entry, entry.toggle.getAttribute('aria-expanded') === 'true');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 19

```text
    entry.toggle.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 20

```text
      const expand = entry.panel.hidden;
```

`entry.panel.hidden` (the hidden property of entry.panel); stores the result in `expand`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 21

```text
      groups.forEach(item => setExpanded(item, item === entry && expand));
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 22

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 23

```text
  }
```

Closes loop. Control continues after this block.

### Line 24

```text

```

Blank line separates related code sections for readability.

### Line 25

```text
  return function reveal(button) {
```

Returns a callback taking button that runs its enclosed statements to the caller and exits this function.

### Line 26

```text
    const activeGroup = groups.find(entry => entry.group.contains(button));
```

Returns the first item of `groups` (groups) matching a callback taking entry that calls `entry.group.contains` with `button` (button), or undefined; stores the result in `activeGroup`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 27

```text
    if (!activeGroup) return;
```

Returns no value to the caller and exits this function.

### Line 28

```text
    for (const entry of groups) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 29

```text
      const isActive = entry === activeGroup;
```

Checks that `entry` (entry) and `activeGroup` (active group) have the same value and type; stores the result in `isActive`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 30

```text
      setExpanded(entry, isActive);
```

Calls `setExpanded` with `entry` (entry); `isActive` (is active).

### Line 31

```text
      if (isActive) entry.toggle.setAttribute('data-current', 'true');
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 32

```text
      else entry.toggle.removeAttribute('data-current');
```

Handles the alternative branch when the preceding condition is false.

### Line 33

```text
    }
```

Closes loop. Control continues after this block.

### Line 34

```text
  };
```

Closes callback function. The semicolon ends the statement.

### Line 35

```text
}
```

Closes function setupNavigationGroups. Control continues after this block.

### Line 36

```text

```

Blank line separates related code sections for readability.

### Line 37

```text
// A disclosure, not an ARIA menu: ordinary buttons keep native Tab/Enter/Space.
```

Comment: A disclosure, not an ARIA menu: ordinary buttons keep native Tab/Enter/Space.

### Line 38

```text
export function setupNavigationPicker(root) {
```

Exports this reusable UI setup function so the shell can initialize it from another module.

### Line 39

```text
  const toggle = root?.querySelector('.nav-picker-toggle');
```

Finds the first descendant of `root` (root) matching CSS selector ".nav-picker-toggle"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `toggle`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 40

```text
  const panel = root?.querySelector('.sidebar-nav');
```

Finds the first descendant of `root` (root) matching CSS selector ".sidebar-nav"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `panel`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  const label = root?.querySelector('.nav-picker-label');
```

Finds the first descendant of `root` (root) matching CSS selector ".nav-picker-label"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
  if (!toggle || !panel) return () => {};
```

Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.

### Line 43

```text
  const doc = root.ownerDocument;
```

`root.ownerDocument` (the owner document property of root); stores the result in `doc`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 44

```text

```

Blank line separates related code sections for readability.

### Line 45

```text
  function close(restoreFocus = false) {
```

Defines `close` (close), a reusable function taking restoreFocus = false. Its body runs when called, not when declared.

### Line 46

```text
    panel.hidden = true;
```

Assigns the result of true to panel.hidden, updating this control or record for the next step.

### Line 47

```text
    toggle.setAttribute('aria-expanded', 'false');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 48

```text
    if (restoreFocus) toggle.focus();
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 49

```text
  }
```

Closes function close. Control continues after this block.

### Line 50

```text
  close();
```

Calls `close` with no arguments.

### Line 51

```text
  toggle.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 52

```text
    const open = panel.hidden;
```

`panel.hidden` (the hidden property of panel); stores the result in `open`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 53

```text
    panel.hidden = !open;
```

Assigns the result of !open to panel.hidden, updating this control or record for the next step.

### Line 54

```text
    toggle.setAttribute('aria-expanded', String(open));
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 55

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 56

```text
  root.addEventListener('keydown', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 57

```text
    if (event.key === 'Escape' && !panel.hidden) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 58

```text
      event.preventDefault();
```

Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.

### Line 59

```text
      close(true);
```

Calls `close` with true.

### Line 60

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 61

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 62

```text
  doc?.addEventListener('pointerdown', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 63

```text
    if (!root.contains(event.target)) close();
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 64

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 65

```text
  // Pointer events inside the workspace iframe do not bubble to this document.
```

Comment: Pointer events inside the workspace iframe do not bubble to this document.

### Line 66

```text
  // Entering that frame blurs the shell window; dismiss without stealing focus.
```

Comment: Entering that frame blurs the shell window; dismiss without stealing focus.

### Line 67

```text
  doc?.defaultView?.addEventListener('blur', () => close());
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 68

```text
  root.addEventListener('focusout', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 69

```text
    if (event.relatedTarget && !root.contains(event.relatedTarget)) close();
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 70

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 71

```text

```

Blank line separates related code sections for readability.

### Line 72

```text
  return function select(button) {
```

Returns a callback taking button that runs its enclosed statements to the caller and exits this function.

### Line 73

```text
    if (!button) return;
```

Returns no value to the caller and exits this function.

### Line 74

```text
    const title = button.dataset.title || 'Timekeeper';
```

Uses `button.dataset.title` (the title property of button.dataset) when it is truthy, otherwise falls back to "Timekeeper"; stores the result in `title`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 75

```text
    if (label) label.textContent = title;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 76

```text
    toggle.setAttribute('aria-label', `Pages, current page: ${title}`);
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 77

```text
    close(panel.contains(doc?.activeElement));
```

Calls `close` with calls `panel.contains` with `doc?.activeElement` (the active element property of doc); optional chaining stops with undefined if a guarded receiver is null or undefined.

### Line 78

```text
  };
```

Closes callback function. The semicolon ends the statement.

### Line 79

```text
}
```

Closes function setupNavigationPicker. Control continues after this block.

### Line 80

```text

```

Blank line separates related code sections for readability.

### Line 81

```text
const THEME_KEY = 'timekeeper-theme';
```

"timekeeper-theme"; stores the result in `THEME_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 82

```text
const FONT_SCALE_KEY = 'timekeeper-font-scale';
```

"timekeeper-font-scale"; stores the result in `FONT_SCALE_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 83

```text
const THEMES = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
```

Constructs a new instance of `Set` with an array containing "forest", "coastal", "harvest", "midnight", "lavender", and 2 more entries; stores the result in `THEMES`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 84

```text
const FONT_SCALES = new Set([1, 1.15, 1.3, 1.5]);
```

Constructs a new instance of `Set` with an array containing 1, 1.15, 1.3, 1.5; stores the result in `FONT_SCALES`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 85

```text
const NON_TEXT_INPUT_TYPES = new Set(['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit']);
```

Constructs a new instance of `Set` with an array containing "button", "checkbox", "color", "file", "hidden", and 5 more entries; stores the result in `NON_TEXT_INPUT_TYPES`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 86

```text

```

Blank line separates related code sections for readability.

### Line 87

```text
function readSavedTheme() {
```

Defines `readSavedTheme` (read saved theme), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 88

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 89

```text
    const saved = window.localStorage.getItem(THEME_KEY);
```

Reads saved text at storage key `THEME_KEY` (theme key), or null if none exists; stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 90

```text
    return THEMES.has(saved) ? saved : 'forest';
```

Returns checks calls `THEMES.has` with `saved` (saved); if true chooses `saved` (saved), otherwise "forest" to the caller and exits this function.

### Line 91

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 92

```text
    return 'forest';
```

Returns "forest" to the caller and exits this function.

### Line 93

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 94

```text
}
```

Closes function readSavedTheme. Control continues after this block.

### Line 95

```text

```

Blank line separates related code sections for readability.

### Line 96

```text
function readSavedFontScale() {
```

Defines `readSavedFontScale` (read saved font scale), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 97

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 98

```text
    const saved = Number(window.localStorage.getItem(FONT_SCALE_KEY));
```

Converts reads saved text at storage key `FONT_SCALE_KEY` (font scale key), or null if none exists to a number (invalid numeric text becomes NaN); stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 99

```text
    return FONT_SCALES.has(saved) ? saved : 1;
```

Returns checks calls `FONT_SCALES.has` with `saved` (saved); if true chooses `saved` (saved), otherwise 1 to the caller and exits this function.

### Line 100

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 101

```text
    return 1;
```

Returns 1 to the caller and exits this function.

### Line 102

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 103

```text
}
```

Closes function readSavedFontScale. Control continues after this block.

### Line 104

```text

```

Blank line separates related code sections for readability.

### Line 105

```text
const fontScaleStates = new WeakMap();
```

Constructs a new instance of `WeakMap` with no arguments; stores the result in `fontScaleStates`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 106

```text

```

Blank line separates related code sections for readability.

### Line 107

```text
function applyTextScaleToDocument(doc, scale) {
```

Defines `applyTextScaleToDocument` (apply text scale to document), a reusable function taking doc, scale. Its body runs when called, not when declared.

### Line 108

```text
  if (!doc?.body || !doc.defaultView) return;
```

Returns no value to the caller and exits this function.

### Line 109

```text

```

Blank line separates related code sections for readability.

### Line 110

```text
  let state = fontScaleStates.get(doc);
```

Calls `fontScaleStates.get` with `doc` (doc); stores the result in `state`. let allows the binding to be reassigned.

### Line 111

```text
  if (!state) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 112

```text
    state = { overrides: new Map(), observer: null, scheduled: false, scale: 1 };
```

Assigns the result of { overrides: new Map(), observer: null, scheduled: false, scale: 1 } to state, updating this control or record for the next step.

### Line 113

```text
    fontScaleStates.set(doc, state);
```

Calls `fontScaleStates.set` with `doc` (doc); `state` (state).

### Line 114

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 115

```text
  state.scale = scale;
```

Assigns the result of scale to state.scale, updating this control or record for the next step.

### Line 116

```text

```

Blank line separates related code sections for readability.

### Line 117

```text
  for (const [element, saved] of state.overrides) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 118

```text
    if (saved.inlineFontSize) element.style.setProperty('font-size', saved.inlineFontSize, saved.inlineFontPriority);
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 119

```text
    else element.style.removeProperty('font-size');
```

Handles the alternative branch when the preceding condition is false.

### Line 120

```text
    if (saved.inlineLineHeight) element.style.setProperty('line-height', saved.inlineLineHeight, saved.inlineLineHeightPriority);
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 121

```text
    else element.style.removeProperty('line-height');
```

Handles the alternative branch when the preceding condition is false.

### Line 122

```text
  }
```

Closes loop. Control continues after this block.

### Line 123

```text
  state.overrides.clear();
```

Calls `state.overrides.clear` with no arguments.

### Line 124

```text

```

Blank line separates related code sections for readability.

### Line 125

```text
  if (scale > 1) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 126

```text
    const elements = [doc.documentElement, ...doc.body.querySelectorAll('*')];
```

An array containing `doc.documentElement` (the document element property of doc), the expanded entries/properties from finds all descendants of `doc.body` (the body property of doc) matching CSS selector "*"; stores the result in `elements`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 127

```text
    const baseStyles = elements.map(element => {
```

Transforms each item of `elements` (elements) using a callback taking element that runs its enclosed statements and returns a new array; stores the result in `baseStyles`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 128

```text
      const computed = doc.defaultView.getComputedStyle(element);
```

Calls `doc.defaultView.getComputedStyle` with `element` (element); stores the result in `computed`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 129

```text
      return { element, fontSize: Number.parseFloat(computed.fontSize), lineHeight: computed.lineHeight };
```

Returns an object with fields element: `element` (element); fontSize: calls `Number.parseFloat` with `computed.fontSize` (the font size property of computed); lineHeight: `computed.lineHeight` (the line height property of computed) to the caller and exits this function.

### Line 130

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 131

```text

```

Blank line separates related code sections for readability.

### Line 132

```text
    for (const { element, fontSize, lineHeight } of baseStyles) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 133

```text
      if (!Number.isFinite(fontSize)) continue;
```

Validates that the converted value is a real finite number before using it in calculations or saving.

### Line 134

```text
      state.overrides.set(element, {
```

Calls `state.overrides.set` with `element` (element); an object with fields inlineFontSize: calls `element.style.getPropertyValue` with "font-size"; inlineFontPriority: calls `element.style.getPropertyPriority` with "font-size"; inlineLineHeight: calls `element.style.getPropertyValue` with "line-height"; inlineLineHeightPriority: calls `element.style.getPropertyPriority` with "line-height".

### Line 135

```text
        inlineFontSize: element.style.getPropertyValue('font-size'),
```

Supplies this argument/value (inlineFontSize: element.style.getPropertyValue('font-size')) to the surrounding constructor or DOM call.

### Line 136

```text
        inlineFontPriority: element.style.getPropertyPriority('font-size'),
```

Supplies this argument/value (inlineFontPriority: element.style.getPropertyPriority('font-size')) to the surrounding constructor or DOM call.

### Line 137

```text
        inlineLineHeight: element.style.getPropertyValue('line-height'),
```

Supplies this argument/value (inlineLineHeight: element.style.getPropertyValue('line-height')) to the surrounding constructor or DOM call.

### Line 138

```text
        inlineLineHeightPriority: element.style.getPropertyPriority('line-height')
```

Defines field inlineLineHeightPriority as calls `element.style.getPropertyPriority` with "line-height".

### Line 139

```text
      });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 140

```text
      element.style.setProperty('font-size', `${fontSize * scale}px`, 'important');
```

Calls `element.style.setProperty` with "font-size"; a text template that combines fixed text with computed values multiplies `fontSize` (font size) by `scale` (scale); "important".

### Line 141

```text
      const lineHeightPx = Number.parseFloat(lineHeight);
```

Calls `Number.parseFloat` with `lineHeight` (line height); stores the result in `lineHeightPx`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 142

```text
      if (Number.isFinite(lineHeightPx) && lineHeight !== 'normal') {
```

Validates that the converted value is a real finite number before using it in calculations or saving.

### Line 143

```text
        element.style.setProperty('line-height', `${lineHeightPx * scale}px`, 'important');
```

Calls `element.style.setProperty` with "line-height"; a text template that combines fixed text with computed values multiplies `lineHeightPx` (line height px) by `scale` (scale); "important".

### Line 144

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 145

```text
    }
```

Closes loop. Control continues after this block.

### Line 146

```text

```

Blank line separates related code sections for readability.

### Line 147

```text
    if (!state.observer) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 148

```text
      state.observer = new doc.defaultView.MutationObserver(() => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 149

```text
        if (state.scheduled || state.scale <= 1) return;
```

Returns no value to the caller and exits this function.

### Line 150

```text
        state.scheduled = true;
```

Assigns the result of true to state.scheduled, updating this control or record for the next step.

### Line 151

```text
        doc.defaultView.requestAnimationFrame(() => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 152

```text
          state.scheduled = false;
```

Assigns the result of false to state.scheduled, updating this control or record for the next step.

### Line 153

```text
          applyTextScaleToDocument(doc, state.scale);
```

Calls `applyTextScaleToDocument` with `doc` (doc); `state.scale` (the scale property of state).

### Line 154

```text
        });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 155

```text
      });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 156

```text
      state.observer.observe(doc.body, { childList: true, subtree: true });
```

Calls `state.observer.observe` with `doc.body` (the body property of doc); an object with fields childList: true; subtree: true.

### Line 157

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 158

```text
  } else if (state.observer) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 159

```text
    state.observer.disconnect();
```

Calls `state.observer.disconnect` with no arguments.

### Line 160

```text
    state.observer = null;
```

Assigns the result of null to state.observer, updating this control or record for the next step.

### Line 161

```text
    state.scheduled = false;
```

Assigns the result of false to state.scheduled, updating this control or record for the next step.

### Line 162

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 163

```text
}
```

Closes function applyTextScaleToDocument. Control continues after this block.

### Line 164

```text

```

Blank line separates related code sections for readability.

### Line 165

```text
export function initializeShell() {
```

Exports this reusable UI setup function so the shell can initialize it from another module.

### Line 166

```text
  const navigation = [...document.querySelectorAll('.nav-link[data-page]')];
```

An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector ".nav-link[data-page]"; stores the result in `navigation`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 167

```text
  const revealNavigationGroup = setupNavigationGroups(document.querySelector('.sidebar-nav'));
```

Calls `setupNavigationGroups` with finds the first descendant of `document` (document) matching CSS selector ".sidebar-nav"; stores the result in `revealNavigationGroup`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 168

```text
  const selectNavigationPage = setupNavigationPicker(document.querySelector('.sidebar'));
```

Calls `setupNavigationPicker` with finds the first descendant of `document` (document) matching CSS selector ".sidebar"; stores the result in `selectNavigationPage`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 169

```text
  const mainIframe = document.querySelector('iframe[name="main-content"]');
```

Finds the first descendant of `document` (document) matching CSS selector "iframe[name=\"main-content\"]"; stores the result in `mainIframe`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 170

```text
  const title = document.getElementById('active-page-title');
```

Finds the page element whose unique ID is "active-page-title", or null if absent; stores the result in `title`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 171

```text
  const dateLabel = document.getElementById('topbar-date');
```

Finds the page element whose unique ID is "topbar-date", or null if absent; stores the result in `dateLabel`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 172

```text
  let baselineViewportHeight = 0;
```

0; stores the result in `baselineViewportHeight`. let allows the binding to be reassigned.

### Line 173

```text

```

Blank line separates related code sections for readability.

### Line 174

```text
  function isKeyboardInput(target) {
```

Defines `isKeyboardInput` (is keyboard input), a reusable function taking target. Its body runs when called, not when declared.

### Line 175

```text
    if (!target || target.disabled || target.readOnly) return false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 176

```text
    const tagName = String(target.tagName || '').toUpperCase();
```

Converts converts uses `target.tagName` (the tag name property of target) when it is truthy, otherwise falls back to "" to text to uppercase text; stores the result in `tagName`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 177

```text
    if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
```

Returns true to the caller and exits this function.

### Line 178

```text
    if (tagName !== 'INPUT') return false;
```

Returns false to the caller and exits this function.

### Line 179

```text
    return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
```

Returns negates the truthiness of calls `NON_TEXT_INPUT_TYPES.has` with converts converts uses `target.type` when it is truthy, otherwise falls back to "text" to text to lowercase text to the caller and exits this function.

### Line 180

```text
  }
```

Closes function isKeyboardInput. Control continues after this block.

### Line 181

```text

```

Blank line separates related code sections for readability.

### Line 182

```text
  function syncKeyboardLayout() {
```

Defines `syncKeyboardLayout` (sync keyboard layout), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 183

```text
    const layoutHeight = window.innerHeight || document.documentElement.clientHeight;
```

Uses `window.innerHeight` (the inner height property of window) when it is truthy, otherwise falls back to `document.documentElement.clientHeight` (the client height property of document.documentElement); stores the result in `layoutHeight`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 184

```text
    const visualHeight = window.visualViewport?.height || layoutHeight;
```

Uses `window.visualViewport?.height` (the height property of window.visualViewport); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to `layoutHeight` (layout height); stores the result in `visualHeight`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 185

```text
    const visibleHeight = Math.min(layoutHeight, visualHeight);
```

Chooses the smallest of `layoutHeight` (layout height), `visualHeight` (visual height); stores the result in `visibleHeight`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 186

```text
    document.documentElement.style.setProperty('--app-visible-height', `${Math.round(visibleHeight)}px`);
```

Uses a browser API to update this page, manage focus, or move data between the UI and a downloaded file.

### Line 187

```text

```

Blank line separates related code sections for readability.

### Line 188

```text
    let focusedControl = null;
```

Null; stores the result in `focusedControl`. let allows the binding to be reassigned.

### Line 189

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 190

```text
      focusedControl = mainIframe?.contentDocument?.activeElement;
```

Assigns the result of mainIframe?.contentDocument?.activeElement to focusedControl, updating this control or record for the next step.

### Line 191

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 192

```text
      // The workspace pages are same-origin, but keep the shell usable if that ever changes.
```

Comment: The workspace pages are same-origin, but keep the shell usable if that ever changes.

### Line 193

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 194

```text
    const keyboardControlFocused = isKeyboardInput(focusedControl);
```

Calls `isKeyboardInput` with `focusedControl` (focused control); stores the result in `keyboardControlFocused`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 195

```text
    if (!keyboardControlFocused) baselineViewportHeight = Math.max(layoutHeight, visualHeight);
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 196

```text

```

Blank line separates related code sections for readability.

### Line 197

```text
    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
```

Chooses the largest of 100, multiplies `baselineViewportHeight` (baseline viewport height) by 0.15; stores the result in `resizeThreshold`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 198

```text
    const keyboardIsVisible = keyboardControlFocused && baselineViewportHeight - visibleHeight > resizeThreshold;
```

Uses checks whether subtracts `visibleHeight` (visible height) from `baselineViewportHeight` (baseline viewport height) is greater than `resizeThreshold` (resize threshold) only if `keyboardControlFocused` (keyboard control focused) is truthy; otherwise keeps the falsy first value; stores the result in `keyboardIsVisible`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 199

```text
    document.body.classList.toggle('keyboard-open', keyboardIsVisible);
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 200

```text
  }
```

Closes function syncKeyboardLayout. Control continues after this block.

### Line 201

```text

```

Blank line separates related code sections for readability.

### Line 202

```text
  function watchFrameFocus() {
```

Defines `watchFrameFocus` (watch frame focus), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 203

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 204

```text
      const frameDocument = mainIframe?.contentDocument;
```

`mainIframe?.contentDocument` (the content document property of mainIframe); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameDocument`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 205

```text
      if (!frameDocument) return;
```

Returns no value to the caller and exits this function.

### Line 206

```text

```

Blank line separates related code sections for readability.

### Line 207

```text
      const refreshLayout = () => window.requestAnimationFrame(syncKeyboardLayout);
```

A callback taking no parameters that calls `window.requestAnimationFrame` with `syncKeyboardLayout` (sync keyboard layout); stores the result in `refreshLayout`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 208

```text
      frameDocument.addEventListener('focusin', refreshLayout, true);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 209

```text
      frameDocument.addEventListener('focusout', () => window.setTimeout(refreshLayout, 0), true);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 210

```text
      syncKeyboardLayout();
```

Calls `syncKeyboardLayout` with no arguments.

### Line 211

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 212

```text
      console.warn('Unable to watch workspace form focus.', error);
```

Calls `console.warn` with "Unable to watch workspace form focus."; `error` (error).

### Line 213

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 214

```text
  }
```

Closes function watchFrameFocus. Control continues after this block.

### Line 215

```text

```

Blank line separates related code sections for readability.

### Line 216

```text
  window.addEventListener('resize', syncKeyboardLayout);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 217

```text
  window.visualViewport?.addEventListener('resize', syncKeyboardLayout);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 218

```text
  window.visualViewport?.addEventListener('scroll', syncKeyboardLayout);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 219

```text
  syncKeyboardLayout();
```

Calls `syncKeyboardLayout` with no arguments.

### Line 220

```text

```

Blank line separates related code sections for readability.

### Line 221

```text
  function activate(button) {
```

Defines `activate` (activate), a reusable function taking button. Its body runs when called, not when declared.

### Line 222

```text
    if (!button) return;
```

Returns no value to the caller and exits this function.

### Line 223

```text
    navigation.forEach(item => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 224

```text
      if (item === button) item.setAttribute('aria-current', 'page');
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 225

```text
      else item.removeAttribute('aria-current');
```

Handles the alternative branch when the preceding condition is false.

### Line 226

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 227

```text
    if (title) title.textContent = button.dataset.title || 'Timekeeper';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 228

```text
    revealNavigationGroup(button);
```

Calls `revealNavigationGroup` with `button` (button).

### Line 229

```text
    selectNavigationPage(button);
```

Calls `selectNavigationPage` with `button` (button).

### Line 230

```text
  }
```

Closes function activate. Control continues after this block.

### Line 231

```text

```

Blank line separates related code sections for readability.

### Line 232

```text
  function applyTheme(theme) {
```

Defines `applyTheme` (apply theme), a reusable function taking theme. Its body runs when called, not when declared.

### Line 233

```text
    const safeTheme = THEMES.has(theme) ? theme : 'forest';
```

Stores a validated theme name, falling back to forest.

### Line 234

```text
    document.documentElement.dataset.theme = safeTheme;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 235

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 236

```text
      const frameRoot = mainIframe?.contentDocument?.documentElement;
```

`mainIframe?.contentDocument?.documentElement` (the document element property of mainIframe?.contentDocument); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameRoot`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 237

```text
      if (frameRoot) frameRoot.dataset.theme = safeTheme;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 238

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 239

```text
      console.warn('Unable to apply the selected theme to the workspace page.', error);
```

Calls `console.warn` with "Unable to apply the selected theme to the workspace page."; `error` (error).

### Line 240

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 241

```text
    return safeTheme;
```

Returns `safeTheme` (safe theme) to the caller and exits this function.

### Line 242

```text
  }
```

Closes function applyTheme. Control continues after this block.

### Line 243

```text

```

Blank line separates related code sections for readability.

### Line 244

```text
  function applyFontScale(scale) {
```

Defines `applyFontScale` (apply font scale), a reusable function taking scale. Its body runs when called, not when declared.

### Line 245

```text
    const safeScale = FONT_SCALES.has(Number(scale)) ? Number(scale) : 1;
```

Stores a validated text scale, falling back to normal size.

### Line 246

```text
    applyTextScaleToDocument(document, safeScale);
```

Calls `applyTextScaleToDocument` with `document` (document); `safeScale` (safe scale).

### Line 247

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 248

```text
      const frameDocument = mainIframe?.contentDocument;
```

`mainIframe?.contentDocument` (the content document property of mainIframe); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameDocument`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 249

```text
      if (frameDocument) applyTextScaleToDocument(frameDocument, safeScale);
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 250

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 251

```text
      console.warn('Unable to apply the selected text size to the workspace page.', error);
```

Calls `console.warn` with "Unable to apply the selected text size to the workspace page."; `error` (error).

### Line 252

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 253

```text
    return safeScale;
```

Returns `safeScale` (safe scale) to the caller and exits this function.

### Line 254

```text
  }
```

Closes function applyFontScale. Control continues after this block.

### Line 255

```text

```

Blank line separates related code sections for readability.

### Line 256

```text
  function sendSettingsToFrame() {
```

Defines `sendSettingsToFrame` (send settings to frame), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 257

```text
    if (!mainIframe?.contentWindow) return;
```

Returns no value to the caller and exits this function.

### Line 258

```text
    mainIframe.contentWindow.postMessage({
```

Sends a same-origin settings message between the shell and its workspace iframe.

### Line 259

```text
      type: 'timekeeper-settings-state',
```

Supplies this argument/value (type: 'timekeeper-settings-state') to the surrounding constructor or DOM call.

### Line 260

```text
      theme: readSavedTheme(),
```

Supplies this argument/value (theme: readSavedTheme()) to the surrounding constructor or DOM call.

### Line 261

```text
      fontScale: readSavedFontScale()
```

Continues the arguments for readSavedFontScale. Each comma separates one argument that the function receives in this order.

### Line 262

```text
    }, window.location.origin);
```

Continues the surrounding JavaScript expression or argument list. This line contributes }, window.location.origin);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 263

```text
  }
```

Closes function sendSettingsToFrame. Control continues after this block.

### Line 264

```text

```

Blank line separates related code sections for readability.

### Line 265

```text
  function applySavedSettings() {
```

Defines `applySavedSettings` (apply saved settings), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 266

```text
    applyTheme(readSavedTheme());
```

Calls `applyTheme` with calls `readSavedTheme` with no arguments.

### Line 267

```text
    applyFontScale(readSavedFontScale());
```

Calls `applyFontScale` with calls `readSavedFontScale` with no arguments.

### Line 268

```text
  }
```

Closes function applySavedSettings. Control continues after this block.

### Line 269

```text

```

Blank line separates related code sections for readability.

### Line 270

```text
  navigation.forEach(button => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 271

```text
    button.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 272

```text
      activate(button);
```

Calls `activate` with `button` (button).

### Line 273

```text
      if (mainIframe) mainIframe.src = button.dataset.page;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 274

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 275

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 276

```text

```

Blank line separates related code sections for readability.

### Line 277

```text
  activate(navigation.find(button => button.getAttribute('aria-current') === 'page'));
```

Sets accessibility metadata so assistive technology can understand the control and its current state.

### Line 278

```text

```

Blank line separates related code sections for readability.

### Line 279

```text
  if (mainIframe) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 280

```text
    mainIframe.addEventListener('load', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 281

```text
      watchFrameFocus();
```

Calls `watchFrameFocus` with no arguments.

### Line 282

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 283

```text
        // In-frame links and the brand target do not update the iframe's src attribute.
```

Comment: In-frame links and the brand target do not update the iframe's src attribute.

### Line 284

```text
        const currentPath = new URL(mainIframe.contentWindow.location.href, window.location.href).pathname;
```

`new URL(mainIframe.contentWindow.location.href, window.location.href).pathname` (the pathname property of new URL(mainIframe.contentWindow.location.href, window.location.href)); stores the result in `currentPath`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 285

```text
        const activeButton = navigation.find(button =>
```

Returns the first item of `navigation` (navigation) matching a callback taking button that checks that `new URL(button.dataset.page, window.location.href).pathname` (the pathname property of new URL(button.dataset.page, window.location.href)) and `currentPath` (current path) have the same value and type, or undefined; stores the result in `activeButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 286

```text
          new URL(button.dataset.page, window.location.href).pathname === currentPath
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 287

```text
        );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 288

```text
        if (activeButton) activate(activeButton);
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 289

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 290

```text
        console.warn('Unable to identify the active workspace page.', error);
```

Calls `console.warn` with "Unable to identify the active workspace page."; `error` (error).

### Line 291

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 292

```text
      applySavedSettings();
```

Calls `applySavedSettings` with no arguments.

### Line 293

```text
      sendSettingsToFrame();
```

Calls `sendSettingsToFrame` with no arguments.

### Line 294

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 295

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 296

```text

```

Blank line separates related code sections for readability.

### Line 297

```text
  window.addEventListener('message', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 298

```text
    if (event.origin !== window.location.origin || event.source !== mainIframe?.contentWindow) return;
```

Rejects messages from another origin, preventing unrelated pages from changing app settings.

### Line 299

```text
    if (event.data?.type === 'timekeeper-settings-request') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 300

```text
      sendSettingsToFrame();
```

Calls `sendSettingsToFrame` with no arguments.

### Line 301

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 302

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 303

```text
    if (event.data?.type !== 'timekeeper-settings-update') return;
```

Returns no value to the caller and exits this function.

### Line 304

```text

```

Blank line separates related code sections for readability.

### Line 305

```text
    if (THEMES.has(event.data.theme)) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 306

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 307

```text
        window.localStorage.setItem(THEME_KEY, event.data.theme);
```

Reads or writes the browser-local preference, keeping this setting available across page loads.

### Line 308

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 309

```text
        console.warn('Unable to save the selected theme in this browser.', error);
```

Calls `console.warn` with "Unable to save the selected theme in this browser."; `error` (error).

### Line 310

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 311

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 312

```text
    if (FONT_SCALES.has(Number(event.data.fontScale))) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 313

```text
      try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 314

```text
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(event.data.fontScale)));
```

Reads or writes the browser-local preference, keeping this setting available across page loads.

### Line 315

```text
      } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 316

```text
        console.warn('Unable to save the selected text size in this browser.', error);
```

Calls `console.warn` with "Unable to save the selected text size in this browser."; `error` (error).

### Line 317

```text
      }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 318

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 319

```text

```

Blank line separates related code sections for readability.

### Line 320

```text
    applySavedSettings();
```

Calls `applySavedSettings` with no arguments.

### Line 321

```text
    sendSettingsToFrame();
```

Calls `sendSettingsToFrame` with no arguments.

### Line 322

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 323

```text

```

Blank line separates related code sections for readability.

### Line 324

```text
  window.addEventListener('storage', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 325

```text
    if (event.key === THEME_KEY || event.key === FONT_SCALE_KEY || event.key === null) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 326

```text
      applySavedSettings();
```

Calls `applySavedSettings` with no arguments.

### Line 327

```text
      sendSettingsToFrame();
```

Calls `sendSettingsToFrame` with no arguments.

### Line 328

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 329

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 330

```text

```

Blank line separates related code sections for readability.

### Line 331

```text
  applySavedSettings();
```

Calls `applySavedSettings` with no arguments.

### Line 332

```text

```

Blank line separates related code sections for readability.

### Line 333

```text
  if (dateLabel) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 334

```text
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 335

```text
      weekday: 'short', month: 'short', day: 'numeric'
```

Sets the object field month using 'short'. This field is read later through its property name.

### Line 336

```text
    }).format(new Date());
```

Converts the stored or entered date/time into a Date object for display or arithmetic.

### Line 337

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 338

```text
}
```

Closes function initializeShell. Control continues after this block.

### Line 339

```text

```

Blank line separates related code sections for readability.

### Line 340

```text
if (typeof document !== 'undefined') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 341

```text
  if (document.readyState === 'loading') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 342

```text
    document.addEventListener('DOMContentLoaded', initializeShell, { once: true });
```

Waits until the page’s HTML exists before querying elements and wiring its controls.

### Line 343

```text
  } else {
```

Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.

### Line 344

```text
    initializeShell();
```

Calls `initializeShell` with no arguments.

### Line 345

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 346

```text
}
```

Closes conditional branch. Control continues after this block.
