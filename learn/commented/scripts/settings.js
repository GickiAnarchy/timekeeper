// Original L1: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { store } from './models.js';
// Original L2: Blank line separates related code sections for readability.

// Original L3: Finds the page element whose unique ID is "theme-select", or null if absent; stores the result in `themeSelect`. const prevents reassignment of this binding, not mutation inside its object/array.
const themeSelect = document.getElementById('theme-select');
// Original L4: An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector "input[name=\"font-scale\"]"; stores the result in `fontScaleInputs`. const prevents reassignment of this binding, not mutation inside its object/array.
const fontScaleInputs = [...document.querySelectorAll('input[name="font-scale"]')];
// Original L5: "timekeeper-theme"; stores the result in `THEME_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.
const THEME_KEY = 'timekeeper-theme';
// Original L6: "timekeeper-font-scale"; stores the result in `FONT_SCALE_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.
const FONT_SCALE_KEY = 'timekeeper-font-scale';
// Original L7: Constructs a new instance of `Set` with an array containing "forest", "coastal", "harvest", "midnight", "lavender", and 2 more entries; stores the result in `themes`. const prevents reassignment of this binding, not mutation inside its object/array.
const themes = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
// Original L8: Constructs a new instance of `Set` with an array containing 1, 1.15, 1.3, 1.5; stores the result in `fontScales`. const prevents reassignment of this binding, not mutation inside its object/array.
const fontScales = new Set([1, 1.15, 1.3, 1.5]);
// Original L9: Blank line separates related code sections for readability.

// Original L10: Defines `applySettingsState` (apply settings state), a reusable function taking theme, fontScale. Its body runs when called, not when declared.
function applySettingsState(theme, fontScale) {
// Original L11: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (themeSelect && themes.has(theme)) {
// Original L12: Assigns the result of theme to themeSelect.value, updating this control or record for the next step.
    themeSelect.value = theme;
// Original L13: Closes conditional branch. Control continues after this block.
  }
// Original L14: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (fontScales.has(Number(fontScale))) {
// Original L15: Converts converts `fontScale` (font scale) to a number (invalid numeric text becomes NaN) to text; stores the result in `selected`. const prevents reassignment of this binding, not mutation inside its object/array.
    const selected = String(Number(fontScale));
// Original L16: Defines an inline callback that handles each item or event in the surrounding operation.
    fontScaleInputs.forEach(input => { input.checked = input.value === selected; });
// Original L17: Closes conditional branch. Control continues after this block.
  }
// Original L18: Closes function applySettingsState. Control continues after this block.
}
// Original L19: Blank line separates related code sections for readability.

// Original L20: Defines `requestSettingsState` (request settings state), a reusable function taking no arguments. Its body runs when called, not when declared.
function requestSettingsState() {
// Original L21: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (window.parent === window) {
// Original L22: "forest"; stores the result in `theme`. let allows the binding to be reassigned.
    let theme = 'forest';
// Original L23: 1; stores the result in `fontScale`. let allows the binding to be reassigned.
    let fontScale = 1;
// Original L24: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L25: Reads saved text at storage key `THEME_KEY` (theme key), or null if none exists; stores the result in `savedTheme`. const prevents reassignment of this binding, not mutation inside its object/array.
      const savedTheme = window.localStorage.getItem(THEME_KEY);
// Original L26: Converts reads saved text at storage key `FONT_SCALE_KEY` (font scale key), or null if none exists to a number (invalid numeric text becomes NaN); stores the result in `savedScale`. const prevents reassignment of this binding, not mutation inside its object/array.
      const savedScale = Number(window.localStorage.getItem(FONT_SCALE_KEY));
// Original L27: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (themes.has(savedTheme)) theme = savedTheme;
// Original L28: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (fontScales.has(savedScale)) fontScale = savedScale;
// Original L29: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L30: Calls `console.warn` with "Unable to read appearance settings in this browser."; `error` (error).
      console.warn('Unable to read appearance settings in this browser.', error);
// Original L31: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L32: Calls `applySettingsState` with `theme` (theme); `fontScale` (font scale).
    applySettingsState(theme, fontScale);
// Original L33: Stores an identifier/state in a data attribute so a later click handler can find the related record.
    document.documentElement.dataset.theme = theme;
// Original L34: Returns no value to the caller and exits this function.
    return;
// Original L35: Closes conditional branch. Control continues after this block.
  }
// Original L36: Sends a same-origin settings message between the shell and its workspace iframe.
  window.parent.postMessage({ type: 'timekeeper-settings-request' }, window.location.origin);
// Original L37: Closes function requestSettingsState. Control continues after this block.
}
// Original L38: Blank line separates related code sections for readability.

// Original L39: Defines `sendSettingsUpdate` (send settings update), a reusable function taking no arguments. Its body runs when called, not when declared.
function sendSettingsUpdate() {
// Original L40: `themeSelect?.value` (the value property of themeSelect); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `theme`. const prevents reassignment of this binding, not mutation inside its object/array.
  const theme = themeSelect?.value;
// Original L41: Stores an identifier/state in a data attribute so a later click handler can find the related record.
  if (themes.has(theme)) document.documentElement.dataset.theme = theme;
// Original L42: `fontScaleInputs.find(input => input.checked)?.value` (the value property of fontScaleInputs.find(input => input.checked)); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `selectedFontScale`. const prevents reassignment of this binding, not mutation inside its object/array.
  const selectedFontScale = fontScaleInputs.find(input => input.checked)?.value;
// Original L43: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (window.parent === window) {
// Original L44: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
    try {
// Original L45: Reads or writes the browser-local preference, keeping this setting available across page loads.
      if (themes.has(theme)) window.localStorage.setItem(THEME_KEY, theme);
// Original L46: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
      if (selectedFontScale && fontScales.has(Number(selectedFontScale))) {
// Original L47: Reads or writes the browser-local preference, keeping this setting available across page loads.
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(selectedFontScale)));
// Original L48: Closes conditional branch. Control continues after this block.
      }
// Original L49: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
    } catch (error) {
// Original L50: Calls `console.warn` with "Unable to save appearance settings in this browser."; `error` (error).
      console.warn('Unable to save appearance settings in this browser.', error);
// Original L51: Closes error handler and try/catch error-handling construct. Control continues after this block.
    }
// Original L52: Returns no value to the caller and exits this function.
    return;
// Original L53: Closes conditional branch. Control continues after this block.
  }
// Original L54: Sends a same-origin settings message between the shell and its workspace iframe.
  window.parent.postMessage({
// Original L55: Supplies this argument/value (type: 'timekeeper-settings-update') to the surrounding constructor or DOM call.
    type: 'timekeeper-settings-update',
// Original L56: Includes the named value theme in the surrounding import list or collection, making that app dependency available here.
    theme,
// Original L57: Continues the arguments for Number. Each comma separates one argument that the function receives in this order.
    fontScale: selectedFontScale ? Number(selectedFontScale) : undefined
// Original L58: Continues the surrounding JavaScript expression or argument list. This line contributes }, window.location.origin);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  }, window.location.origin);
// Original L59: Closes function sendSettingsUpdate. Control continues after this block.
}
// Original L60: Blank line separates related code sections for readability.

// Original L61: Registers a handler so a user action or browser event triggers the page behavior described here.
themeSelect?.addEventListener('change', sendSettingsUpdate);
// Original L62: Registers a handler so a user action or browser event triggers the page behavior described here.
fontScaleInputs.forEach(input => input.addEventListener('change', sendSettingsUpdate));
// Original L63: Registers a handler so a user action or browser event triggers the page behavior described here.
window.addEventListener('message', event => {
// Original L64: Rejects messages from another origin, preventing unrelated pages from changing app settings.
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
// Original L65: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (event.data?.type === 'timekeeper-settings-state') {
// Original L66: Calls `applySettingsState` with `event.data.theme` (the theme property of event.data); `event.data.fontScale` (the font scale property of event.data).
    applySettingsState(event.data.theme, event.data.fontScale);
// Original L67: Closes conditional branch. Control continues after this block.
  }
// Original L68: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
// Original L69: Blank line separates related code sections for readability.

// Original L70: Calls `requestSettingsState` with no arguments.
requestSettingsState();
// Original L71: Blank line separates related code sections for readability.

// Original L72: Finds the page element whose unique ID is "download-backup-btn", or null if absent; stores the result in `downloadBackupButton`. const prevents reassignment of this binding, not mutation inside its object/array.
const downloadBackupButton = document.getElementById('download-backup-btn');
// Original L73: Finds the page element whose unique ID is "backup-file", or null if absent; stores the result in `backupFileInput`. const prevents reassignment of this binding, not mutation inside its object/array.
const backupFileInput = document.getElementById('backup-file');
// Original L74: Finds the page element whose unique ID is "backup-preview", or null if absent; stores the result in `backupPreview`. const prevents reassignment of this binding, not mutation inside its object/array.
const backupPreview = document.getElementById('backup-preview');
// Original L75: Finds the page element whose unique ID is "restore-backup-btn", or null if absent; stores the result in `restoreBackupButton`. const prevents reassignment of this binding, not mutation inside its object/array.
const restoreBackupButton = document.getElementById('restore-backup-btn');
// Original L76: Finds the page element whose unique ID is "backup-status", or null if absent; stores the result in `backupStatus`. const prevents reassignment of this binding, not mutation inside its object/array.
const backupStatus = document.getElementById('backup-status');
// Original L77: Null; stores the result in `pendingBackup`. let allows the binding to be reassigned.
let pendingBackup = null;
// Original L78: Blank line separates related code sections for readability.

// Original L79: Defines `loadBackupWorkspace` (load backup workspace), a reusable asynchronous function taking no arguments. Its body runs when called, not when declared.
async function loadBackupWorkspace() {
// Original L80: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L81: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
    await store.init();
// Original L82: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (store.loadFailures.length) {
// Original L83: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
      downloadBackupButton.disabled = true;
// Original L84: Writes user-visible text into the element; textContent avoids treating data as HTML.
      backupStatus.textContent = 'Some workspace data could not be loaded. Retry the visible Firestore warning before downloading a full backup.';
// Original L85: Returns no value to the caller and exits this function.
      return;
// Original L86: Closes conditional branch. Control continues after this block.
    }
// Original L87: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    downloadBackupButton.disabled = false;
// Original L88: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = 'Workspace data is loaded and ready to back up.';
// Original L89: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L90: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    downloadBackupButton.disabled = true;
// Original L91: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = error.message || 'Workspace data could not be loaded.';
// Original L92: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L93: Closes function loadBackupWorkspace. Control continues after this block.
}
// Original L94: Blank line separates related code sections for readability.

// Original L95: Registers a handler so a user action or browser event triggers the page behavior described here.
downloadBackupButton?.addEventListener('click', () => {
// Original L96: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L97: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (store.loadFailures.length) throw new Error('The workspace did not finish loading; retry before exporting.');
// Original L98: Calls `store.exportFullBackup` with no arguments; stores the result in `backup`. const prevents reassignment of this binding, not mutation inside its object/array.
    const backup = store.exportFullBackup();
// Original L99: Constructs a new instance of `Blob` with an array containing encodes `backup` (backup) as JSON text for storage or transport; an object with fields type: "application/json"; stores the result in `blob`. const prevents reassignment of this binding, not mutation inside its object/array.
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
// Original L100: Calls `URL.createObjectURL` with `blob` (blob); stores the result in `url`. const prevents reassignment of this binding, not mutation inside its object/array.
    const url = URL.createObjectURL(blob);
// Original L101: Creates a detached HTML element with tag "a"; it is not visible until inserted in the page; stores the result in `link`. const prevents reassignment of this binding, not mutation inside its object/array.
    const link = document.createElement('a');
// Original L102: Assigns the result of url to link.href, updating this control or record for the next step.
    link.href = url;
// Original L103: Converts the stored or entered date/time into a Date object for display or arithmetic.
    link.download = `timekeeper-backup-${new Date().toISOString().slice(0, 10)}.json`;
// Original L104: Calls `link.click` with no arguments.
    link.click();
// Original L105: Defines an inline callback that handles each item or event in the surrounding operation.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
// Original L106: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = 'Full backup downloaded. Store the file somewhere safe; it contains payroll and business records.';
// Original L107: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L108: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = error.message || 'The backup could not be created.';
// Original L109: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L110: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
// Original L111: Blank line separates related code sections for readability.

// Original L112: Registers a handler so a user action or browser event triggers the page behavior described here.
backupFileInput?.addEventListener('change', async () => {
// Original L113: Assigns the result of null to pendingBackup, updating this control or record for the next step.
  pendingBackup = null;
// Original L114: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
  restoreBackupButton.disabled = true;
// Original L115: The entry at index/key 0 in `backupFileInput.files` (the files property of backupFileInput); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `file`. const prevents reassignment of this binding, not mutation inside its object/array.
  const file = backupFileInput.files?.[0];
// Original L116: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
  if (!file) {
// Original L117: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupPreview.textContent = 'No backup selected.';
// Original L118: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = '';
// Original L119: Returns no value to the caller and exits this function.
    return;
// Original L120: Closes conditional branch. Control continues after this block.
  }
// Original L121: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L122: Decodes JSON text waits for calls `file.text` with no arguments to finish before continuing; rejection throws into surrounding error handling into JavaScript data; malformed JSON throws an error; stores the result in `parsed`. const prevents reassignment of this binding, not mutation inside its object/array.
    const parsed = JSON.parse(await file.text());
// Original L123: Calls `store.previewFullBackup` with `parsed` (parsed); stores the result in `preview`. const prevents reassignment of this binding, not mutation inside its object/array.
    const preview = store.previewFullBackup(parsed);
// Original L124: Assigns the result of parsed to pendingBackup, updating this control or record for the next step.
    pendingBackup = parsed;
// Original L125: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupPreview.textContent = [
// Original L126: Supplies this argument/value (`File: ${file.name}`) to the surrounding constructor or DOM call.
      `File: ${file.name}`,
// Original L127: Supplies this argument/value (`Format: ${preview.format} · schema ${preview.schemaVersion}`) to the surrounding constructor or DOM call.
      `Format: ${preview.format} · schema ${preview.schemaVersion}`,
// Original L128: Supplies this argument/value (`Exported: ${preview.exportedAt || 'timestamp not available'}`) to the surrounding constructor or DOM call.
      `Exported: ${preview.exportedAt || 'timestamp not available'}`,
// Original L129: Supplies this argument/value (preview.archiveHistoryIncluded ? 'Archived ledger history: included' : 'Archived ledger history: not included (current archives will be preserved)') to the surrounding constructor or DOM call.
      preview.archiveHistoryIncluded ? 'Archived ledger history: included' : 'Archived ledger history: not included (current archives will be preserved)',
// Original L130: Transforms each selected value into the representation needed by the next UI or data operation.
      ...Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`)
// Original L131: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
    ].join('\n');
// Original L132: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    restoreBackupButton.disabled = false;
// Original L133: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = 'Preview only: no data has been changed.';
// Original L134: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L135: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupPreview.textContent = 'This file could not be previewed.';
// Original L136: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = error.message || 'Choose a valid versioned Timekeeper backup file.';
// Original L137: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L138: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
// Original L139: Blank line separates related code sections for readability.

// Original L140: Registers a handler so a user action or browser event triggers the page behavior described here.
restoreBackupButton?.addEventListener('click', async () => {
// Original L141: Returns no value to the caller and exits this function.
  if (!pendingBackup) return;
// Original L142: Calls `store.previewFullBackup` with `pendingBackup` (pending backup); stores the result in `preview`. const prevents reassignment of this binding, not mutation inside its object/array.
  const preview = store.previewFullBackup(pendingBackup);
// Original L143: Joins the items of transforms each item of turns `preview.counts` (the counts property of preview) into [key, value] pairs using a callback taking [name, count] that a text template that combines fixed text with computed values `name` (name), `count` (count) and returns a new array into text separated by "\n"; stores the result in `counts`. const prevents reassignment of this binding, not mutation inside its object/array.
  const counts = Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`).join('\n');
// Original L144: Checks `preview.archiveHistoryIncluded` (the archive history included property of preview); if true chooses "This backup includes archived ledger history, which will be replaced.", otherwise "This older backup has no archived ledger history; current archives will be preserved."; stores the result in `archiveHandling`. const prevents reassignment of this binding, not mutation inside its object/array.
  const archiveHandling = preview.archiveHistoryIncluded ?
// Original L145: Continues the surrounding JavaScript expression or argument list. This line contributes 'This backup includes archived ledger history, which will be replaced.' :; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
    'This backup includes archived ledger history, which will be replaced.' :
// Original L146: Continues the surrounding JavaScript expression or argument list. This line contributes 'This older backup has no archived ledger history; current archives will be preserved.';; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
    'This older backup has no archived ledger history; current archives will be preserved.';
// Original L147: Calls `window.confirm` with a text template that combines fixed text with computed values `archiveHandling` (archive handling), `counts` (counts); stores the result in `confirmed`. const prevents reassignment of this binding, not mutation inside its object/array.
  const confirmed = window.confirm(
// Original L148: Continues the surrounding JavaScript expression or argument list. This line contributes `Restore this Timekeeper backup? This replaces the current records in the included data groups. ${archiveHandling}\n\n${counts}\n\nThis cannot be undone unless you first download a backup of the current data.`; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
    `Restore this Timekeeper backup? This replaces the current records in the included data groups. ${archiveHandling}\n\n${counts}\n\nThis cannot be undone unless you first download a backup of the current data.`
// Original L149: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
  );
// Original L150: Returns no value to the caller and exits this function.
  if (!confirmed) return;
// Original L151: Blank line separates related code sections for readability.
  
// Original L152: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
  restoreBackupButton.disabled = true;
// Original L153: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
  downloadBackupButton.disabled = true;
// Original L154: Writes user-visible text into the element; textContent avoids treating data as HTML.
  backupStatus.textContent = 'Restoring all workspace data…';
// Original L155: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L156: Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.
    await store.restoreFullBackup(pendingBackup);
// Original L157: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = store.loadFailures.length ?
// Original L158: Continues the surrounding JavaScript expression or argument list. This line contributes 'Restore was written, but the workspace could not confirm every collection after reloading. Retry the Firestore warning.' :; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
      'Restore was written, but the workspace could not confirm every collection after reloading. Retry the Firestore warning.' :
// Original L159: Continues the surrounding JavaScript expression or argument list. This line contributes 'Restore completed and the workspace reloaded.';; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
      'Restore completed and the workspace reloaded.';
// Original L160: Assigns the result of null to pendingBackup, updating this control or record for the next step.
    pendingBackup = null;
// Original L161: Assigns the result of '' to backupFileInput.value, updating this control or record for the next step.
    backupFileInput.value = '';
// Original L162: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupPreview.textContent = 'No backup selected.';
// Original L163: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    downloadBackupButton.disabled = store.loadFailures.length > 0;
// Original L164: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L165: Writes user-visible text into the element; textContent avoids treating data as HTML.
    backupStatus.textContent = error.message || 'Restore failed. The current data was not confirmed as replaced.';
// Original L166: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    restoreBackupButton.disabled = false;
// Original L167: Disables or enables the control to prevent duplicate submissions while work is pending or invalid.
    downloadBackupButton.disabled = store.loadFailures.length > 0;
// Original L168: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L169: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});
// Original L170: Blank line separates related code sections for readability.

// Original L171: Calls `loadBackupWorkspace` with no arguments.
loadBackupWorkspace();