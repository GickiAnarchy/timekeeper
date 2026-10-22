// Original L1: Comment: Keep navigation in the shell's single asset: a missing separately deployed
// Keep navigation in the shell's single asset: a missing separately deployed
// Original L2: Comment: module must not prevent every click handler from being registered.
// module must not prevent every click handler from being registered.
// Original L3: Comment: Native buttons retain Enter/Space activation and the shared focus-visible ring.
// Native buttons retain Enter/Space activation and the shared focus-visible ring.
// Original L4: Comment: Categories remain grouped, but only one list is expanded at a time.
// Categories remain grouped, but only one list is expanded at a time.
// Original L5: Exports this reusable UI setup function so the shell can initialize it from another module.
export function setupNavigationGroups(root) {
// Original L6: Transforms each item of an array containing the expanded entries/properties from uses `root?.querySelectorAll('.nav-group')`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to an array containing  using a callback taking group that an object with fields group: `group` (group); toggle: finds the first descendant of `group` (group) matching CSS selector ".nav-group-toggle"; panel: finds the first descendant of `group` (group) matching CSS selector ".nav-group-pages" and returns a new array; stores the result in `groups`. const prevents reassignment of this binding, not mutation inside its object/array.
  const groups = [...(root?.querySelectorAll('.nav-group') || [])].map(group => ({
// Original L7: Keeps the navigation group element associated with its controls.
    group,
// Original L8: Finds the button that expands or collapses this navigation category.
    toggle: group.querySelector('.nav-group-toggle'),
// Original L9: Finds the page list whose hidden state is controlled by the category button.
    panel: group.querySelector('.nav-group-pages')
// Original L10: Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
  }));
// Original L11: Blank line separates related code sections for readability.

// Original L12: Defines `setExpanded` (set expanded), a reusable function taking entry, expanded. Its body runs when called, not when declared.
  function setExpanded(entry, expanded) {
// Original L13: Sets accessibility metadata so assistive technology can understand the control and its current state.
    entry.toggle.setAttribute('aria-expanded', String(expanded));
// Original L14: Assigns the result of !expanded to entry.panel.hidden, updating this control or record for the next step.
    entry.panel.hidden = !expanded;
// Original L15: Closes function setExpanded. Control continues after this block.
  }
// Original L16: Blank line separates related code sections for readability.

// Original L17: Iterates through the matching controls or records so each one receives the same UI/data treatment.
  for (const entry of groups) {
// Original L18: Sets accessibility metadata so assistive technology can understand the control and its current state.
    setExpanded(entry, entry.toggle.getAttribute('aria-expanded') === 'true');
// Original L19: Registers a handler so a user action or browser event triggers the page behavior described here.
    entry.toggle.addEventListener('click', () => {
// Original L20: `entry.panel.hidden` (the hidden property of entry.panel); stores the result in `expand`. const prevents reassignment of this binding, not mutation inside its object/array.
      const expand = entry.panel.hidden;
// Original L21: Defines an inline callback that handles each item or event in the surrounding operation.
      groups.forEach(item => setExpanded(item, item === entry && expand));
// Original L22: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L23: Closes loop. Control continues after this block.
  }
// Original L24: Blank line separates related code sections for readability.

// Original L25: Returns a callback taking button that runs its enclosed statements to the caller and exits this function.
  return function reveal(button) {
// Original L26: Returns the first item of `groups` (groups) matching a callback taking entry that calls `entry.group.contains` with `button` (button), or undefined; stores the result in `activeGroup`. const prevents reassignment of this binding, not mutation inside its object/array.
    const activeGroup = groups.find(entry => entry.group.contains(button));
// Original L27: Returns no value to the caller and exits this function.
    if (!activeGroup) return;
// Original L28: Iterates through the matching controls or records so each one receives the same UI/data treatment.
    for (const entry of groups) {
// Original L29: Checks that `entry` (entry) and `activeGroup` (active group) have the same value and type; stores the result in `isActive`. const prevents reassignment of this binding, not mutation inside its object/array.
      const isActive = entry === activeGroup;
// Original L30: Calls `setExpanded` with `entry` (entry); `isActive` (is active).
      setExpanded(entry, isActive);
// Original L31: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      if (isActive) entry.toggle.setAttribute('data-current', 'true');
// Original L32: Handles the alternative branch when the preceding condition is false.
      else entry.toggle.removeAttribute('data-current');
// Original L33: Closes loop. Control continues after this block.
    }
// Original L34: Closes callback function. The semicolon ends the statement.
  };
// Original L35: Closes function setupNavigationGroups. Control continues after this block.
}
// Original L36: Blank line separates related code sections for readability.

// Original L37: Comment: A disclosure, not an ARIA menu: ordinary buttons keep native Tab/Enter/Space.
// A disclosure, not an ARIA menu: ordinary buttons keep native Tab/Enter/Space.
// Original L38: Exports this reusable UI setup function so the shell can initialize it from another module.
export function setupNavigationPicker(root) {
// Original L39: Finds the first descendant of `root` (root) matching CSS selector ".nav-picker-toggle"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `toggle`. const prevents reassignment of this binding, not mutation inside its object/array.
  const toggle = root?.querySelector('.nav-picker-toggle');
// Original L40: Finds the first descendant of `root` (root) matching CSS selector ".sidebar-nav"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `panel`. const prevents reassignment of this binding, not mutation inside its object/array.
  const panel = root?.querySelector('.sidebar-nav');
// Original L41: Finds the first descendant of `root` (root) matching CSS selector ".nav-picker-label"; optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.
  const label = root?.querySelector('.nav-picker-label');
// Original L42: Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.
  if (!toggle || !panel) return () => {};
// Original L43: `root.ownerDocument` (the owner document property of root); stores the result in `doc`. const prevents reassignment of this binding, not mutation inside its object/array.
  const doc = root.ownerDocument;
// Original L44: Blank line separates related code sections for readability.

// Original L45: Defines `close` (close), a reusable function taking restoreFocus = false. Its body runs when called, not when declared.
  function close(restoreFocus = false) {
// Original L46: Assigns the result of true to panel.hidden, updating this control or record for the next step.
    panel.hidden = true;
// Original L47: Sets accessibility metadata so assistive technology can understand the control and its current state.
    toggle.setAttribute('aria-expanded', 'false');
// Original L48: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (restoreFocus) toggle.focus();
// Original L49: Closes function close. Control continues after this block.
  }
// Original L50: Calls `close` with no arguments.
  close();
// Original L51: Registers a handler so a user action or browser event triggers the page behavior described here.
  toggle.addEventListener('click', () => {
// Original L52: `panel.hidden` (the hidden property of panel); stores the result in `open`. const prevents reassignment of this binding, not mutation inside its object/array.
    const open = panel.hidden;
// Original L53: Assigns the result of !open to panel.hidden, updating this control or record for the next step.
    panel.hidden = !open;
// Original L54: Sets accessibility metadata so assistive technology can understand the control and its current state.
    toggle.setAttribute('aria-expanded', String(open));
// Original L55: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L56: Registers a handler so a user action or browser event triggers the page behavior described here.
  root.addEventListener('keydown', event => {
// Original L57: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (event.key === 'Escape' && !panel.hidden) {
// Original L58: Stops the browser’s default form/navigation action so this JavaScript handler can validate and save asynchronously.
      event.preventDefault();
// Original L59: Calls `close` with true.
      close(true);
// Original L60: Closes conditional branch. Control continues after this block.
    }
// Original L61: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L62: Registers a handler so a user action or browser event triggers the page behavior described here.
  doc?.addEventListener('pointerdown', event => {
// Original L63: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!root.contains(event.target)) close();
// Original L64: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L65: Comment: Pointer events inside the workspace iframe do not bubble to this document.
  // Pointer events inside the workspace iframe do not bubble to this document.
// Original L66: Comment: Entering that frame blurs the shell window; dismiss without stealing focus.
  // Entering that frame blurs the shell window; dismiss without stealing focus.
// Original L67: Registers a handler so a user action or browser event triggers the page behavior described here.
  doc?.defaultView?.addEventListener('blur', () => close());
// Original L68: Registers a handler so a user action or browser event triggers the page behavior described here.
  root.addEventListener('focusout', event => {
// Original L69: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (event.relatedTarget && !root.contains(event.relatedTarget)) close();
// Original L70: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L71: Blank line separates related code sections for readability.

// Original L72: Returns a callback taking button that runs its enclosed statements to the caller and exits this function.
  return function select(button) {
// Original L73: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L74: Uses `button.dataset.title` (the title property of button.dataset) when it is truthy, otherwise falls back to "Timekeeper"; stores the result in `title`. const prevents reassignment of this binding, not mutation inside its object/array.
    const title = button.dataset.title || 'Timekeeper';
// Original L75: Writes user-visible text into the element; textContent avoids treating data as HTML.
    if (label) label.textContent = title;
// Original L76: Sets accessibility metadata so assistive technology can understand the control and its current state.
    toggle.setAttribute('aria-label', `Pages, current page: ${title}`);
// Original L77: Calls `close` with calls `panel.contains` with `doc?.activeElement` (the active element property of doc); optional chaining stops with undefined if a guarded receiver is null or undefined.
    close(panel.contains(doc?.activeElement));
// Original L78: Closes callback function. The semicolon ends the statement.
  };
// Original L79: Closes function setupNavigationPicker. Control continues after this block.
}
// Original L80: Blank line separates related code sections for readability.

// Original L81: "timekeeper-theme"; stores the result in `THEME_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.
const THEME_KEY = 'timekeeper-theme';
// Original L82: "timekeeper-font-scale"; stores the result in `FONT_SCALE_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.
const FONT_SCALE_KEY = 'timekeeper-font-scale';
// Original L83: Constructs a new instance of `Set` with an array containing "forest", "coastal", "harvest", "midnight", "lavender", and 2 more entries; stores the result in `THEMES`. const prevents reassignment of this binding, not mutation inside its object/array.
const THEMES = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
// Original L84: Constructs a new instance of `Set` with an array containing 1, 1.15, 1.3, 1.5; stores the result in `FONT_SCALES`. const prevents reassignment of this binding, not mutation inside its object/array.
const FONT_SCALES = new Set([1, 1.15, 1.3, 1.5]);
// Original L85: Constructs a new instance of `Set` with an array containing "button", "checkbox", "color", "file", "hidden", and 5 more entries; stores the result in `NON_TEXT_INPUT_TYPES`. const prevents reassignment of this binding, not mutation inside its object/array.
const NON_TEXT_INPUT_TYPES = new Set(['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit']);
// Original L86: Blank line separates related code sections for readability.

// Original L87: Defines `readSavedTheme` (read saved theme), a reusable function taking no arguments. Its body runs when called, not when declared.
function readSavedTheme() {
// Original L88: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L89: Reads saved text at storage key `THEME_KEY` (theme key), or null if none exists; stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.
    const saved = window.localStorage.getItem(THEME_KEY);
// Original L90: Returns checks calls `THEMES.has` with `saved` (saved); if true chooses `saved` (saved), otherwise "forest" to the caller and exits this function.
    return THEMES.has(saved) ? saved : 'forest';
// Original L91: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L92: Returns "forest" to the caller and exits this function.
    return 'forest';
// Original L93: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L94: Closes function readSavedTheme. Control continues after this block.
}
// Original L95: Blank line separates related code sections for readability.

// Original L96: Defines `readSavedFontScale` (read saved font scale), a reusable function taking no arguments. Its body runs when called, not when declared.
function readSavedFontScale() {
// Original L97: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L98: Converts reads saved text at storage key `FONT_SCALE_KEY` (font scale key), or null if none exists to a number (invalid numeric text becomes NaN); stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.
    const saved = Number(window.localStorage.getItem(FONT_SCALE_KEY));
// Original L99: Returns checks calls `FONT_SCALES.has` with `saved` (saved); if true chooses `saved` (saved), otherwise 1 to the caller and exits this function.
    return FONT_SCALES.has(saved) ? saved : 1;
// Original L100: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L101: Returns 1 to the caller and exits this function.
    return 1;
// Original L102: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L103: Closes function readSavedFontScale. Control continues after this block.
}
// Original L104: Blank line separates related code sections for readability.

// Original L105: Constructs a new instance of `WeakMap` with no arguments; stores the result in `fontScaleStates`. const prevents reassignment of this binding, not mutation inside its object/array.
const fontScaleStates = new WeakMap();
// Original L106: Blank line separates related code sections for readability.

// Original L107: Defines `applyTextScaleToDocument` (apply text scale to document), a reusable function taking doc, scale. Its body runs when called, not when declared.
function applyTextScaleToDocument(doc, scale) {
// Original L108: Returns no value to the caller and exits this function.
  if (!doc?.body || !doc.defaultView) return;
// Original L109: Blank line separates related code sections for readability.

// Original L110: Calls `fontScaleStates.get` with `doc` (doc); stores the result in `state`. let allows the binding to be reassigned.
  let state = fontScaleStates.get(doc);
// Original L111: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (!state) {
// Original L112: Assigns the result of { overrides: new Map(), observer: null, scheduled: false, scale: 1 } to state, updating this control or record for the next step.
    state = { overrides: new Map(), observer: null, scheduled: false, scale: 1 };
// Original L113: Calls `fontScaleStates.set` with `doc` (doc); `state` (state).
    fontScaleStates.set(doc, state);
// Original L114: Closes conditional branch. Control continues after this block.
  }
// Original L115: Assigns the result of scale to state.scale, updating this control or record for the next step.
  state.scale = scale;
// Original L116: Blank line separates related code sections for readability.

// Original L117: Iterates through the matching controls or records so each one receives the same UI/data treatment.
  for (const [element, saved] of state.overrides) {
// Original L118: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (saved.inlineFontSize) element.style.setProperty('font-size', saved.inlineFontSize, saved.inlineFontPriority);
// Original L119: Handles the alternative branch when the preceding condition is false.
    else element.style.removeProperty('font-size');
// Original L120: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (saved.inlineLineHeight) element.style.setProperty('line-height', saved.inlineLineHeight, saved.inlineLineHeightPriority);
// Original L121: Handles the alternative branch when the preceding condition is false.
    else element.style.removeProperty('line-height');
// Original L122: Closes loop. Control continues after this block.
  }
// Original L123: Calls `state.overrides.clear` with no arguments.
  state.overrides.clear();
// Original L124: Blank line separates related code sections for readability.

// Original L125: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (scale > 1) {
// Original L126: An array containing `doc.documentElement` (the document element property of doc), the expanded entries/properties from finds all descendants of `doc.body` (the body property of doc) matching CSS selector "*"; stores the result in `elements`. const prevents reassignment of this binding, not mutation inside its object/array.
    const elements = [doc.documentElement, ...doc.body.querySelectorAll('*')];
// Original L127: Transforms each item of `elements` (elements) using a callback taking element that runs its enclosed statements and returns a new array; stores the result in `baseStyles`. const prevents reassignment of this binding, not mutation inside its object/array.
    const baseStyles = elements.map(element => {
// Original L128: Calls `doc.defaultView.getComputedStyle` with `element` (element); stores the result in `computed`. const prevents reassignment of this binding, not mutation inside its object/array.
      const computed = doc.defaultView.getComputedStyle(element);
// Original L129: Returns an object with fields element: `element` (element); fontSize: calls `Number.parseFloat` with `computed.fontSize` (the font size property of computed); lineHeight: `computed.lineHeight` (the line height property of computed) to the caller and exits this function.
      return { element, fontSize: Number.parseFloat(computed.fontSize), lineHeight: computed.lineHeight };
// Original L130: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L131: Blank line separates related code sections for readability.

// Original L132: Iterates through the matching controls or records so each one receives the same UI/data treatment.
    for (const { element, fontSize, lineHeight } of baseStyles) {
// Original L133: Validates that the converted value is a real finite number before using it in calculations or saving.
      if (!Number.isFinite(fontSize)) continue;
// Original L134: Calls `state.overrides.set` with `element` (element); an object with fields inlineFontSize: calls `element.style.getPropertyValue` with "font-size"; inlineFontPriority: calls `element.style.getPropertyPriority` with "font-size"; inlineLineHeight: calls `element.style.getPropertyValue` with "line-height"; inlineLineHeightPriority: calls `element.style.getPropertyPriority` with "line-height".
      state.overrides.set(element, {
// Original L135: Supplies this argument/value (inlineFontSize: element.style.getPropertyValue('font-size')) to the surrounding constructor or DOM call.
        inlineFontSize: element.style.getPropertyValue('font-size'),
// Original L136: Supplies this argument/value (inlineFontPriority: element.style.getPropertyPriority('font-size')) to the surrounding constructor or DOM call.
        inlineFontPriority: element.style.getPropertyPriority('font-size'),
// Original L137: Supplies this argument/value (inlineLineHeight: element.style.getPropertyValue('line-height')) to the surrounding constructor or DOM call.
        inlineLineHeight: element.style.getPropertyValue('line-height'),
// Original L138: Defines field inlineLineHeightPriority as calls `element.style.getPropertyPriority` with "line-height".
        inlineLineHeightPriority: element.style.getPropertyPriority('line-height')
// Original L139: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
      });
// Original L140: Calls `element.style.setProperty` with "font-size"; a text template that combines fixed text with computed values multiplies `fontSize` (font size) by `scale` (scale); "important".
      element.style.setProperty('font-size', `${fontSize * scale}px`, 'important');
// Original L141: Calls `Number.parseFloat` with `lineHeight` (line height); stores the result in `lineHeightPx`. const prevents reassignment of this binding, not mutation inside its object/array.
      const lineHeightPx = Number.parseFloat(lineHeight);
// Original L142: Validates that the converted value is a real finite number before using it in calculations or saving.
      if (Number.isFinite(lineHeightPx) && lineHeight !== 'normal') {
// Original L143: Calls `element.style.setProperty` with "line-height"; a text template that combines fixed text with computed values multiplies `lineHeightPx` (line height px) by `scale` (scale); "important".
        element.style.setProperty('line-height', `${lineHeightPx * scale}px`, 'important');
// Original L144: Closes conditional branch. Control continues after this block.
      }
// Original L145: Closes loop. Control continues after this block.
    }
// Original L146: Blank line separates related code sections for readability.

// Original L147: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!state.observer) {
// Original L148: Defines an inline callback that handles each item or event in the surrounding operation.
      state.observer = new doc.defaultView.MutationObserver(() => {
// Original L149: Returns no value to the caller and exits this function.
        if (state.scheduled || state.scale <= 1) return;
// Original L150: Assigns the result of true to state.scheduled, updating this control or record for the next step.
        state.scheduled = true;
// Original L151: Defines an inline callback that handles each item or event in the surrounding operation.
        doc.defaultView.requestAnimationFrame(() => {
// Original L152: Assigns the result of false to state.scheduled, updating this control or record for the next step.
          state.scheduled = false;
// Original L153: Calls `applyTextScaleToDocument` with `doc` (doc); `state.scale` (the scale property of state).
          applyTextScaleToDocument(doc, state.scale);
// Original L154: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
        });
// Original L155: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
      });
// Original L156: Calls `state.observer.observe` with `doc.body` (the body property of doc); an object with fields childList: true; subtree: true.
      state.observer.observe(doc.body, { childList: true, subtree: true });
// Original L157: Closes conditional branch. Control continues after this block.
    }
// Original L158: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  } else if (state.observer) {
// Original L159: Calls `state.observer.disconnect` with no arguments.
    state.observer.disconnect();
// Original L160: Assigns the result of null to state.observer, updating this control or record for the next step.
    state.observer = null;
// Original L161: Assigns the result of false to state.scheduled, updating this control or record for the next step.
    state.scheduled = false;
// Original L162: Closes conditional branch. Control continues after this block.
  }
// Original L163: Closes function applyTextScaleToDocument. Control continues after this block.
}
// Original L164: Blank line separates related code sections for readability.

// Original L165: Exports this reusable UI setup function so the shell can initialize it from another module.
export function initializeShell() {
// Original L166: An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector ".nav-link[data-page]"; stores the result in `navigation`. const prevents reassignment of this binding, not mutation inside its object/array.
  const navigation = [...document.querySelectorAll('.nav-link[data-page]')];
// Original L167: Calls `setupNavigationGroups` with finds the first descendant of `document` (document) matching CSS selector ".sidebar-nav"; stores the result in `revealNavigationGroup`. const prevents reassignment of this binding, not mutation inside its object/array.
  const revealNavigationGroup = setupNavigationGroups(document.querySelector('.sidebar-nav'));
// Original L168: Calls `setupNavigationPicker` with finds the first descendant of `document` (document) matching CSS selector ".sidebar"; stores the result in `selectNavigationPage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const selectNavigationPage = setupNavigationPicker(document.querySelector('.sidebar'));
// Original L169: Finds the first descendant of `document` (document) matching CSS selector "iframe[name=\"main-content\"]"; stores the result in `mainIframe`. const prevents reassignment of this binding, not mutation inside its object/array.
  const mainIframe = document.querySelector('iframe[name="main-content"]');
// Original L170: Finds the page element whose unique ID is "active-page-title", or null if absent; stores the result in `title`. const prevents reassignment of this binding, not mutation inside its object/array.
  const title = document.getElementById('active-page-title');
// Original L171: Finds the page element whose unique ID is "topbar-date", or null if absent; stores the result in `dateLabel`. const prevents reassignment of this binding, not mutation inside its object/array.
  const dateLabel = document.getElementById('topbar-date');
// Original L172: 0; stores the result in `baselineViewportHeight`. let allows the binding to be reassigned.
  let baselineViewportHeight = 0;
// Original L173: Blank line separates related code sections for readability.

// Original L174: Defines `isKeyboardInput` (is keyboard input), a reusable function taking target. Its body runs when called, not when declared.
  function isKeyboardInput(target) {
// Original L175: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    if (!target || target.disabled || target.readOnly) return false;
// Original L176: Converts converts uses `target.tagName` (the tag name property of target) when it is truthy, otherwise falls back to "" to text to uppercase text; stores the result in `tagName`. const prevents reassignment of this binding, not mutation inside its object/array.
    const tagName = String(target.tagName || '').toUpperCase();
// Original L177: Returns true to the caller and exits this function.
    if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
// Original L178: Returns false to the caller and exits this function.
    if (tagName !== 'INPUT') return false;
// Original L179: Returns negates the truthiness of calls `NON_TEXT_INPUT_TYPES.has` with converts converts uses `target.type` when it is truthy, otherwise falls back to "text" to text to lowercase text to the caller and exits this function.
    return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
// Original L180: Closes function isKeyboardInput. Control continues after this block.
  }
// Original L181: Blank line separates related code sections for readability.

// Original L182: Defines `syncKeyboardLayout` (sync keyboard layout), a reusable function taking no arguments. Its body runs when called, not when declared.
  function syncKeyboardLayout() {
// Original L183: Uses `window.innerHeight` (the inner height property of window) when it is truthy, otherwise falls back to `document.documentElement.clientHeight` (the client height property of document.documentElement); stores the result in `layoutHeight`. const prevents reassignment of this binding, not mutation inside its object/array.
    const layoutHeight = window.innerHeight || document.documentElement.clientHeight;
// Original L184: Uses `window.visualViewport?.height` (the height property of window.visualViewport); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to `layoutHeight` (layout height); stores the result in `visualHeight`. const prevents reassignment of this binding, not mutation inside its object/array.
    const visualHeight = window.visualViewport?.height || layoutHeight;
// Original L185: Chooses the smallest of `layoutHeight` (layout height), `visualHeight` (visual height); stores the result in `visibleHeight`. const prevents reassignment of this binding, not mutation inside its object/array.
    const visibleHeight = Math.min(layoutHeight, visualHeight);
// Original L186: Uses a browser API to update this page, manage focus, or move data between the UI and a downloaded file.
    document.documentElement.style.setProperty('--app-visible-height', `${Math.round(visibleHeight)}px`);
// Original L187: Blank line separates related code sections for readability.

// Original L188: Null; stores the result in `focusedControl`. let allows the binding to be reassigned.
    let focusedControl = null;
// Original L189: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L190: Assigns the result of mainIframe?.contentDocument?.activeElement to focusedControl, updating this control or record for the next step.
      focusedControl = mainIframe?.contentDocument?.activeElement;
// Original L191: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L192: Comment: The workspace pages are same-origin, but keep the shell usable if that ever changes.
      // The workspace pages are same-origin, but keep the shell usable if that ever changes.
// Original L193: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L194: Calls `isKeyboardInput` with `focusedControl` (focused control); stores the result in `keyboardControlFocused`. const prevents reassignment of this binding, not mutation inside its object/array.
    const keyboardControlFocused = isKeyboardInput(focusedControl);
// Original L195: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!keyboardControlFocused) baselineViewportHeight = Math.max(layoutHeight, visualHeight);
// Original L196: Blank line separates related code sections for readability.

// Original L197: Chooses the largest of 100, multiplies `baselineViewportHeight` (baseline viewport height) by 0.15; stores the result in `resizeThreshold`. const prevents reassignment of this binding, not mutation inside its object/array.
    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
// Original L198: Uses checks whether subtracts `visibleHeight` (visible height) from `baselineViewportHeight` (baseline viewport height) is greater than `resizeThreshold` (resize threshold) only if `keyboardControlFocused` (keyboard control focused) is truthy; otherwise keeps the falsy first value; stores the result in `keyboardIsVisible`. const prevents reassignment of this binding, not mutation inside its object/array.
    const keyboardIsVisible = keyboardControlFocused && baselineViewportHeight - visibleHeight > resizeThreshold;
// Original L199: Adds, removes, or selects CSS classes that control this element’s appearance/state.
    document.body.classList.toggle('keyboard-open', keyboardIsVisible);
// Original L200: Closes function syncKeyboardLayout. Control continues after this block.
  }
// Original L201: Blank line separates related code sections for readability.

// Original L202: Defines `watchFrameFocus` (watch frame focus), a reusable function taking no arguments. Its body runs when called, not when declared.
  function watchFrameFocus() {
// Original L203: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L204: `mainIframe?.contentDocument` (the content document property of mainIframe); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameDocument`. const prevents reassignment of this binding, not mutation inside its object/array.
      const frameDocument = mainIframe?.contentDocument;
// Original L205: Returns no value to the caller and exits this function.
      if (!frameDocument) return;
// Original L206: Blank line separates related code sections for readability.

// Original L207: A callback taking no parameters that calls `window.requestAnimationFrame` with `syncKeyboardLayout` (sync keyboard layout); stores the result in `refreshLayout`. const prevents reassignment of this binding, not mutation inside its object/array.
      const refreshLayout = () => window.requestAnimationFrame(syncKeyboardLayout);
// Original L208: Registers a handler so a user action or browser event triggers the page behavior described here.
      frameDocument.addEventListener('focusin', refreshLayout, true);
// Original L209: Registers a handler so a user action or browser event triggers the page behavior described here.
      frameDocument.addEventListener('focusout', () => window.setTimeout(refreshLayout, 0), true);
// Original L210: Calls `syncKeyboardLayout` with no arguments.
      syncKeyboardLayout();
// Original L211: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L212: Calls `console.warn` with "Unable to watch workspace form focus."; `error` (error).
      console.warn('Unable to watch workspace form focus.', error);
// Original L213: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L214: Closes function watchFrameFocus. Control continues after this block.
  }
// Original L215: Blank line separates related code sections for readability.

// Original L216: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.addEventListener('resize', syncKeyboardLayout);
// Original L217: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.visualViewport?.addEventListener('resize', syncKeyboardLayout);
// Original L218: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.visualViewport?.addEventListener('scroll', syncKeyboardLayout);
// Original L219: Calls `syncKeyboardLayout` with no arguments.
  syncKeyboardLayout();
// Original L220: Blank line separates related code sections for readability.

// Original L221: Defines `activate` (activate), a reusable function taking button. Its body runs when called, not when declared.
  function activate(button) {
// Original L222: Returns no value to the caller and exits this function.
    if (!button) return;
// Original L223: Defines an inline callback that handles each item or event in the surrounding operation.
    navigation.forEach(item => {
// Original L224: Sets accessibility metadata so assistive technology can understand the control and its current state.
      if (item === button) item.setAttribute('aria-current', 'page');
// Original L225: Handles the alternative branch when the preceding condition is false.
      else item.removeAttribute('aria-current');
// Original L226: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L227: Writes user-visible text into the element; textContent avoids treating data as HTML.
    if (title) title.textContent = button.dataset.title || 'Timekeeper';
// Original L228: Calls `revealNavigationGroup` with `button` (button).
    revealNavigationGroup(button);
// Original L229: Calls `selectNavigationPage` with `button` (button).
    selectNavigationPage(button);
// Original L230: Closes function activate. Control continues after this block.
  }
// Original L231: Blank line separates related code sections for readability.

// Original L232: Defines `applyTheme` (apply theme), a reusable function taking theme. Its body runs when called, not when declared.
  function applyTheme(theme) {
// Original L233: Stores a validated theme name, falling back to forest.
    const safeTheme = THEMES.has(theme) ? theme : 'forest';
// Original L234: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    document.documentElement.dataset.theme = safeTheme;
// Original L235: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L236: `mainIframe?.contentDocument?.documentElement` (the document element property of mainIframe?.contentDocument); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameRoot`. const prevents reassignment of this binding, not mutation inside its object/array.
      const frameRoot = mainIframe?.contentDocument?.documentElement;
// Original L237: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      if (frameRoot) frameRoot.dataset.theme = safeTheme;
// Original L238: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L239: Calls `console.warn` with "Unable to apply the selected theme to the workspace page."; `error` (error).
      console.warn('Unable to apply the selected theme to the workspace page.', error);
// Original L240: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L241: Returns `safeTheme` (safe theme) to the caller and exits this function.
    return safeTheme;
// Original L242: Closes function applyTheme. Control continues after this block.
  }
// Original L243: Blank line separates related code sections for readability.

// Original L244: Defines `applyFontScale` (apply font scale), a reusable function taking scale. Its body runs when called, not when declared.
  function applyFontScale(scale) {
// Original L245: Stores a validated text scale, falling back to normal size.
    const safeScale = FONT_SCALES.has(Number(scale)) ? Number(scale) : 1;
// Original L246: Calls `applyTextScaleToDocument` with `document` (document); `safeScale` (safe scale).
    applyTextScaleToDocument(document, safeScale);
// Original L247: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L248: `mainIframe?.contentDocument` (the content document property of mainIframe); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `frameDocument`. const prevents reassignment of this binding, not mutation inside its object/array.
      const frameDocument = mainIframe?.contentDocument;
// Original L249: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (frameDocument) applyTextScaleToDocument(frameDocument, safeScale);
// Original L250: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L251: Calls `console.warn` with "Unable to apply the selected text size to the workspace page."; `error` (error).
      console.warn('Unable to apply the selected text size to the workspace page.', error);
// Original L252: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L253: Returns `safeScale` (safe scale) to the caller and exits this function.
    return safeScale;
// Original L254: Closes function applyFontScale. Control continues after this block.
  }
// Original L255: Blank line separates related code sections for readability.

// Original L256: Defines `sendSettingsToFrame` (send settings to frame), a reusable function taking no arguments. Its body runs when called, not when declared.
  function sendSettingsToFrame() {
// Original L257: Returns no value to the caller and exits this function.
    if (!mainIframe?.contentWindow) return;
// Original L258: Sends a same-origin settings message between the shell and its workspace iframe.
    mainIframe.contentWindow.postMessage({
// Original L259: Supplies this argument/value (type: 'timekeeper-settings-state') to the surrounding constructor or DOM call.
      type: 'timekeeper-settings-state',
// Original L260: Supplies this argument/value (theme: readSavedTheme()) to the surrounding constructor or DOM call.
      theme: readSavedTheme(),
// Original L261: Continues the arguments for readSavedFontScale. Each comma separates one argument that the function receives in this order.
      fontScale: readSavedFontScale()
// Original L262: Continues the surrounding JavaScript expression or argument list. This line contributes }, window.location.origin);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
    }, window.location.origin);
// Original L263: Closes function sendSettingsToFrame. Control continues after this block.
  }
// Original L264: Blank line separates related code sections for readability.

// Original L265: Defines `applySavedSettings` (apply saved settings), a reusable function taking no arguments. Its body runs when called, not when declared.
  function applySavedSettings() {
// Original L266: Calls `applyTheme` with calls `readSavedTheme` with no arguments.
    applyTheme(readSavedTheme());
// Original L267: Calls `applyFontScale` with calls `readSavedFontScale` with no arguments.
    applyFontScale(readSavedFontScale());
// Original L268: Closes function applySavedSettings. Control continues after this block.
  }
// Original L269: Blank line separates related code sections for readability.

// Original L270: Defines an inline callback that handles each item or event in the surrounding operation.
  navigation.forEach(button => {
// Original L271: Registers a handler so a user action or browser event triggers the page behavior described here.
    button.addEventListener('click', () => {
// Original L272: Calls `activate` with `button` (button).
      activate(button);
// Original L273: Stores an identifier/state in a data attribute so a later click handler can find the related record.
      if (mainIframe) mainIframe.src = button.dataset.page;
// Original L274: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L275: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L276: Blank line separates related code sections for readability.

// Original L277: Sets accessibility metadata so assistive technology can understand the control and its current state.
  activate(navigation.find(button => button.getAttribute('aria-current') === 'page'));
// Original L278: Blank line separates related code sections for readability.

// Original L279: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (mainIframe) {
// Original L280: Registers a handler so a user action or browser event triggers the page behavior described here.
    mainIframe.addEventListener('load', () => {
// Original L281: Calls `watchFrameFocus` with no arguments.
      watchFrameFocus();
// Original L282: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L283: Comment: In-frame links and the brand target do not update the iframe's src attribute.
        // In-frame links and the brand target do not update the iframe's src attribute.
// Original L284: `new URL(mainIframe.contentWindow.location.href, window.location.href).pathname` (the pathname property of new URL(mainIframe.contentWindow.location.href, window.location.href)); stores the result in `currentPath`. const prevents reassignment of this binding, not mutation inside its object/array.
        const currentPath = new URL(mainIframe.contentWindow.location.href, window.location.href).pathname;
// Original L285: Returns the first item of `navigation` (navigation) matching a callback taking button that checks that `new URL(button.dataset.page, window.location.href).pathname` (the pathname property of new URL(button.dataset.page, window.location.href)) and `currentPath` (current path) have the same value and type, or undefined; stores the result in `activeButton`. const prevents reassignment of this binding, not mutation inside its object/array.
        const activeButton = navigation.find(button =>
// Original L286: Stores an identifier/state in a data attribute so a later click handler can find the related record.
          new URL(button.dataset.page, window.location.href).pathname === currentPath
// Original L287: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
        );
// Original L288: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
        if (activeButton) activate(activeButton);
// Original L289: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L290: Calls `console.warn` with "Unable to identify the active workspace page."; `error` (error).
        console.warn('Unable to identify the active workspace page.', error);
// Original L291: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L292: Calls `applySavedSettings` with no arguments.
      applySavedSettings();
// Original L293: Calls `sendSettingsToFrame` with no arguments.
      sendSettingsToFrame();
// Original L294: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L295: Closes conditional branch. Control continues after this block.
  }
// Original L296: Blank line separates related code sections for readability.

// Original L297: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.addEventListener('message', event => {
// Original L298: Rejects messages from another origin, preventing unrelated pages from changing app settings.
    if (event.origin !== window.location.origin || event.source !== mainIframe?.contentWindow) return;
// Original L299: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (event.data?.type === 'timekeeper-settings-request') {
// Original L300: Calls `sendSettingsToFrame` with no arguments.
      sendSettingsToFrame();
// Original L301: Returns no value to the caller and exits this function.
      return;
// Original L302: Closes conditional branch. Control continues after this block.
    }
// Original L303: Returns no value to the caller and exits this function.
    if (event.data?.type !== 'timekeeper-settings-update') return;
// Original L304: Blank line separates related code sections for readability.

// Original L305: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (THEMES.has(event.data.theme)) {
// Original L306: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L307: Reads or writes the browser-local preference, keeping this setting available across page loads.
        window.localStorage.setItem(THEME_KEY, event.data.theme);
// Original L308: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L309: Calls `console.warn` with "Unable to save the selected theme in this browser."; `error` (error).
        console.warn('Unable to save the selected theme in this browser.', error);
// Original L310: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L311: Closes conditional branch. Control continues after this block.
    }
// Original L312: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (FONT_SCALES.has(Number(event.data.fontScale))) {
// Original L313: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
      try {
// Original L314: Reads or writes the browser-local preference, keeping this setting available across page loads.
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(event.data.fontScale)));
// Original L315: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
      } catch (error) {
// Original L316: Calls `console.warn` with "Unable to save the selected text size in this browser."; `error` (error).
        console.warn('Unable to save the selected text size in this browser.', error);
// Original L317: Closes error handler and try/catch error-handling construct. Control continues after this block.
      }
// Original L318: Closes conditional branch. Control continues after this block.
    }
// Original L319: Blank line separates related code sections for readability.

// Original L320: Calls `applySavedSettings` with no arguments.
    applySavedSettings();
// Original L321: Calls `sendSettingsToFrame` with no arguments.
    sendSettingsToFrame();
// Original L322: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L323: Blank line separates related code sections for readability.

// Original L324: Registers a handler so a user action or browser event triggers the page behavior described here.
  window.addEventListener('storage', event => {
// Original L325: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (event.key === THEME_KEY || event.key === FONT_SCALE_KEY || event.key === null) {
// Original L326: Calls `applySavedSettings` with no arguments.
      applySavedSettings();
// Original L327: Calls `sendSettingsToFrame` with no arguments.
      sendSettingsToFrame();
// Original L328: Closes conditional branch. Control continues after this block.
    }
// Original L329: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L330: Blank line separates related code sections for readability.

// Original L331: Calls `applySavedSettings` with no arguments.
  applySavedSettings();
// Original L332: Blank line separates related code sections for readability.

// Original L333: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (dateLabel) {
// Original L334: Writes user-visible text into the element; textContent avoids treating data as HTML.
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
// Original L335: Sets the object field month using 'short'. This field is read later through its property name.
      weekday: 'short', month: 'short', day: 'numeric'
// Original L336: Converts the stored or entered date/time into a Date object for display or arithmetic.
    }).format(new Date());
// Original L337: Closes conditional branch. Control continues after this block.
  }
// Original L338: Closes function initializeShell. Control continues after this block.
}
// Original L339: Blank line separates related code sections for readability.

// Original L340: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
if (typeof document !== 'undefined') {
// Original L341: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (document.readyState === 'loading') {
// Original L342: Waits until the page’s HTML exists before querying elements and wiring its controls.
    document.addEventListener('DOMContentLoaded', initializeShell, { once: true });
// Original L343: Begins the alternative branch: this code runs only when the preceding if condition was false. An else-if additionally tests its written condition.
  } else {
// Original L344: Calls `initializeShell` with no arguments.
    initializeShell();
// Original L345: Closes conditional branch. Control continues after this block.
  }
// Original L346: Closes conditional branch. Control continues after this block.
}
