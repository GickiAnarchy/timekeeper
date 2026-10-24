# scripts/settings.js

[Exact copy](../../original/scripts/settings.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { store } from './models.js';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 2

```text

```

Blank line separates related code sections for readability.

### Line 3

```text
const themeSelect = document.getElementById('theme-select');
```

Finds the page element whose unique ID is "theme-select", or null if absent; stores the result in `themeSelect`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 4

```text
const fontScaleInputs = [...document.querySelectorAll('input[name="font-scale"]')];
```

An array containing the expanded entries/properties from finds all descendants of `document` (document) matching CSS selector "input[name=\"font-scale\"]"; stores the result in `fontScaleInputs`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 5

```text
const THEME_KEY = 'timekeeper-theme';
```

"timekeeper-theme"; stores the result in `THEME_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 6

```text
const FONT_SCALE_KEY = 'timekeeper-font-scale';
```

"timekeeper-font-scale"; stores the result in `FONT_SCALE_KEY`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 7

```text
const themes = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
```

Constructs a new instance of `Set` with an array containing "forest", "coastal", "harvest", "midnight", "lavender", and 2 more entries; stores the result in `themes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
const fontScales = new Set([1, 1.15, 1.3, 1.5]);
```

Constructs a new instance of `Set` with an array containing 1, 1.15, 1.3, 1.5; stores the result in `fontScales`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text

```

Blank line separates related code sections for readability.

### Line 10

```text
function applySettingsState(theme, fontScale) {
```

Defines `applySettingsState` (apply settings state), a reusable function taking theme, fontScale. Its body runs when called, not when declared.

### Line 11

```text
  if (themeSelect && themes.has(theme)) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 12

```text
    themeSelect.value = theme;
```

Assigns the result of theme to themeSelect.value, updating this control or record for the next step.

### Line 13

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 14

```text
  if (fontScales.has(Number(fontScale))) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 15

```text
    const selected = String(Number(fontScale));
```

Converts converts `fontScale` (font scale) to a number (invalid numeric text becomes NaN) to text; stores the result in `selected`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 16

```text
    fontScaleInputs.forEach(input => { input.checked = input.value === selected; });
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 17

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 18

```text
}
```

Closes function applySettingsState. Control continues after this block.

### Line 19

```text

```

Blank line separates related code sections for readability.

### Line 20

```text
function requestSettingsState() {
```

Defines `requestSettingsState` (request settings state), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 21

```text
  if (window.parent === window) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 22

```text
    let theme = 'forest';
```

"forest"; stores the result in `theme`. let allows the binding to be reassigned.

### Line 23

```text
    let fontScale = 1;
```

1; stores the result in `fontScale`. let allows the binding to be reassigned.

### Line 24

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 25

```text
      const savedTheme = window.localStorage.getItem(THEME_KEY);
```

Reads saved text at storage key `THEME_KEY` (theme key), or null if none exists; stores the result in `savedTheme`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 26

```text
      const savedScale = Number(window.localStorage.getItem(FONT_SCALE_KEY));
```

Converts reads saved text at storage key `FONT_SCALE_KEY` (font scale key), or null if none exists to a number (invalid numeric text becomes NaN); stores the result in `savedScale`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 27

```text
      if (themes.has(savedTheme)) theme = savedTheme;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 28

```text
      if (fontScales.has(savedScale)) fontScale = savedScale;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 29

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 30

```text
      console.warn('Unable to read appearance settings in this browser.', error);
```

Calls `console.warn` with "Unable to read appearance settings in this browser."; `error` (error).

### Line 31

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 32

```text
    applySettingsState(theme, fontScale);
```

Calls `applySettingsState` with `theme` (theme); `fontScale` (font scale).

### Line 33

```text
    document.documentElement.dataset.theme = theme;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 34

```text
    return;
```

Returns no value to the caller and exits this function.

### Line 35

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 36

```text
  window.parent.postMessage({ type: 'timekeeper-settings-request' }, window.location.origin);
```

Sends a same-origin settings message between the shell and its workspace iframe.

### Line 37

```text
}
```

Closes function requestSettingsState. Control continues after this block.

### Line 38

```text

```

Blank line separates related code sections for readability.

### Line 39

```text
function sendSettingsUpdate() {
```

Defines `sendSettingsUpdate` (send settings update), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 40

```text
  const theme = themeSelect?.value;
```

`themeSelect?.value` (the value property of themeSelect); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `theme`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  if (themes.has(theme)) document.documentElement.dataset.theme = theme;
```

Stores an identifier/state in a data attribute so a later click handler can find the related record.

### Line 42

```text
  const selectedFontScale = fontScaleInputs.find(input => input.checked)?.value;
```

`fontScaleInputs.find(input => input.checked)?.value` (the value property of fontScaleInputs.find(input => input.checked)); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `selectedFontScale`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 43

```text
  if (window.parent === window) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 44

```text
    try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 45

```text
      if (themes.has(theme)) window.localStorage.setItem(THEME_KEY, theme);
```

Reads or writes the browser-local preference, keeping this setting available across page loads.

### Line 46

```text
      if (selectedFontScale && fontScales.has(Number(selectedFontScale))) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 47

```text
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(selectedFontScale)));
```

Reads or writes the browser-local preference, keeping this setting available across page loads.

### Line 48

```text
      }
```

Closes conditional branch. Control continues after this block.

### Line 49

```text
    } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 50

```text
      console.warn('Unable to save appearance settings in this browser.', error);
```

Calls `console.warn` with "Unable to save appearance settings in this browser."; `error` (error).

### Line 51

```text
    }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 52

```text
    return;
```

Returns no value to the caller and exits this function.

### Line 53

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 54

```text
  window.parent.postMessage({
```

Sends a same-origin settings message between the shell and its workspace iframe.

### Line 55

```text
    type: 'timekeeper-settings-update',
```

Supplies this argument/value (type: 'timekeeper-settings-update') to the surrounding constructor or DOM call.

### Line 56

```text
    theme,
```

Includes the named value theme in the surrounding import list or collection, making that app dependency available here.

### Line 57

```text
    fontScale: selectedFontScale ? Number(selectedFontScale) : undefined
```

Continues the arguments for Number. Each comma separates one argument that the function receives in this order.

### Line 58

```text
  }, window.location.origin);
```

Continues the surrounding JavaScript expression or argument list. This line contributes }, window.location.origin);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 59

```text
}
```

Closes function sendSettingsUpdate. Control continues after this block.

### Line 60

```text

```

Blank line separates related code sections for readability.

### Line 61

```text
themeSelect?.addEventListener('change', sendSettingsUpdate);
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 62

```text
fontScaleInputs.forEach(input => input.addEventListener('change', sendSettingsUpdate));
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 63

```text
window.addEventListener('message', event => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 64

```text
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
```

Rejects messages from another origin, preventing unrelated pages from changing app settings.

### Line 65

```text
  if (event.data?.type === 'timekeeper-settings-state') {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 66

```text
    applySettingsState(event.data.theme, event.data.fontScale);
```

Calls `applySettingsState` with `event.data.theme` (the theme property of event.data); `event.data.fontScale` (the font scale property of event.data).

### Line 67

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 68

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 69

```text

```

Blank line separates related code sections for readability.

### Line 70

```text
requestSettingsState();
```

Calls `requestSettingsState` with no arguments.

### Line 71

```text

```

Blank line separates related code sections for readability.

### Line 72

```text
const downloadBackupButton = document.getElementById('download-backup-btn');
```

Finds the page element whose unique ID is "download-backup-btn", or null if absent; stores the result in `downloadBackupButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 73

```text
const backupFileInput = document.getElementById('backup-file');
```

Finds the page element whose unique ID is "backup-file", or null if absent; stores the result in `backupFileInput`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 74

```text
const backupPreview = document.getElementById('backup-preview');
```

Finds the page element whose unique ID is "backup-preview", or null if absent; stores the result in `backupPreview`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 75

```text
const restoreBackupButton = document.getElementById('restore-backup-btn');
```

Finds the page element whose unique ID is "restore-backup-btn", or null if absent; stores the result in `restoreBackupButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 76

```text
const backupStatus = document.getElementById('backup-status');
```

Finds the page element whose unique ID is "backup-status", or null if absent; stores the result in `backupStatus`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 77

```text
let pendingBackup = null;
```

Null; stores the result in `pendingBackup`. let allows the binding to be reassigned.

### Line 78

```text

```

Blank line separates related code sections for readability.

### Line 79

```text
async function loadBackupWorkspace() {
```

Defines `loadBackupWorkspace` (load backup workspace), a reusable asynchronous function taking no arguments. Its body runs when called, not when declared.

### Line 80

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 81

```text
    await store.init();
```

Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.

### Line 82

```text
    if (store.loadFailures.length) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 83

```text
      downloadBackupButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 84

```text
      backupStatus.textContent = 'Some workspace data could not be loaded. Retry the visible Firestore warning before downloading a full backup.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 85

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 86

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 87

```text
    downloadBackupButton.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 88

```text
    backupStatus.textContent = 'Workspace data is loaded and ready to back up.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 89

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 90

```text
    downloadBackupButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 91

```text
    backupStatus.textContent = error.message || 'Workspace data could not be loaded.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 92

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 93

```text
}
```

Closes function loadBackupWorkspace. Control continues after this block.

### Line 94

```text

```

Blank line separates related code sections for readability.

### Line 95

```text
downloadBackupButton?.addEventListener('click', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 96

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 97

```text
    if (store.loadFailures.length) throw new Error('The workspace did not finish loading; retry before exporting.');
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 98

```text
    const backup = store.exportFullBackup();
```

Calls `store.exportFullBackup` with no arguments; stores the result in `backup`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 99

```text
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
```

Constructs a new instance of `Blob` with an array containing encodes `backup` (backup) as JSON text for storage or transport; an object with fields type: "application/json"; stores the result in `blob`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 100

```text
    const url = URL.createObjectURL(blob);
```

Calls `URL.createObjectURL` with `blob` (blob); stores the result in `url`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 101

```text
    const link = document.createElement('a');
```

Creates a detached HTML element with tag "a"; it is not visible until inserted in the page; stores the result in `link`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 102

```text
    link.href = url;
```

Assigns the result of url to link.href, updating this control or record for the next step.

### Line 103

```text
    link.download = `timekeeper-backup-${new Date().toISOString().slice(0, 10)}.json`;
```

Converts the stored or entered date/time into a Date object for display or arithmetic.

### Line 104

```text
    link.click();
```

Calls `link.click` with no arguments.

### Line 105

```text
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 106

```text
    backupStatus.textContent = 'Full backup downloaded. Store the file somewhere safe; it contains payroll and business records.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 107

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 108

```text
    backupStatus.textContent = error.message || 'The backup could not be created.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 109

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 110

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 111

```text

```

Blank line separates related code sections for readability.

### Line 112

```text
backupFileInput?.addEventListener('change', async () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 113

```text
  pendingBackup = null;
```

Assigns the result of null to pendingBackup, updating this control or record for the next step.

### Line 114

```text
  restoreBackupButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 115

```text
  const file = backupFileInput.files?.[0];
```

The entry at index/key 0 in `backupFileInput.files` (the files property of backupFileInput); optional chaining stops with undefined if a guarded receiver is null or undefined; stores the result in `file`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 116

```text
  if (!file) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 117

```text
    backupPreview.textContent = 'No backup selected.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 118

```text
    backupStatus.textContent = '';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 119

```text
    return;
```

Returns no value to the caller and exits this function.

### Line 120

```text
  }
```

Closes conditional branch. Control continues after this block.

### Line 121

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 122

```text
    const parsed = JSON.parse(await file.text());
```

Decodes JSON text waits for calls `file.text` with no arguments to finish before continuing; rejection throws into surrounding error handling into JavaScript data; malformed JSON throws an error; stores the result in `parsed`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 123

```text
    const preview = store.previewFullBackup(parsed);
```

Calls `store.previewFullBackup` with `parsed` (parsed); stores the result in `preview`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 124

```text
    pendingBackup = parsed;
```

Assigns the result of parsed to pendingBackup, updating this control or record for the next step.

### Line 125

```text
    backupPreview.textContent = [
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 126

```text
      `File: ${file.name}`,
```

Supplies this argument/value (`File: ${file.name}`) to the surrounding constructor or DOM call.

### Line 127

```text
      `Format: ${preview.format} · schema ${preview.schemaVersion}`,
```

Supplies this argument/value (`Format: ${preview.format} · schema ${preview.schemaVersion}`) to the surrounding constructor or DOM call.

### Line 128

```text
      `Exported: ${preview.exportedAt || 'timestamp not available'}`,
```

Supplies this argument/value (`Exported: ${preview.exportedAt || 'timestamp not available'}`) to the surrounding constructor or DOM call.

### Line 129

```text
      preview.archiveHistoryIncluded ? 'Archived ledger history: included' : 'Archived ledger history: not included (current archives will be preserved)',
```

Supplies this argument/value (preview.archiveHistoryIncluded ? 'Archived ledger history: included' : 'Archived ledger history: not included (current archives will be preserved)') to the surrounding constructor or DOM call.

### Line 130

```text
      ...Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`)
```

Transforms each selected value into the representation needed by the next UI or data operation.

### Line 131

```text
    ].join('\n');
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 132

```text
    restoreBackupButton.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 133

```text
    backupStatus.textContent = 'Preview only: no data has been changed.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 134

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 135

```text
    backupPreview.textContent = 'This file could not be previewed.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 136

```text
    backupStatus.textContent = error.message || 'Choose a valid versioned Timekeeper backup file.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 137

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 138

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 139

```text

```

Blank line separates related code sections for readability.

### Line 140

```text
restoreBackupButton?.addEventListener('click', async () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 141

```text
  if (!pendingBackup) return;
```

Returns no value to the caller and exits this function.

### Line 142

```text
  const preview = store.previewFullBackup(pendingBackup);
```

Calls `store.previewFullBackup` with `pendingBackup` (pending backup); stores the result in `preview`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 143

```text
  const counts = Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`).join('\n');
```

Joins the items of transforms each item of turns `preview.counts` (the counts property of preview) into [key, value] pairs using a callback taking [name, count] that a text template that combines fixed text with computed values `name` (name), `count` (count) and returns a new array into text separated by "\n"; stores the result in `counts`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 144

```text
  const archiveHandling = preview.archiveHistoryIncluded ?
```

Checks `preview.archiveHistoryIncluded` (the archive history included property of preview); if true chooses "This backup includes archived ledger history, which will be replaced.", otherwise "This older backup has no archived ledger history; current archives will be preserved."; stores the result in `archiveHandling`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 145

```text
    'This backup includes archived ledger history, which will be replaced.' :
```

Continues the surrounding JavaScript expression or argument list. This line contributes 'This backup includes archived ledger history, which will be replaced.' :; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 146

```text
    'This older backup has no archived ledger history; current archives will be preserved.';
```

Continues the surrounding JavaScript expression or argument list. This line contributes 'This older backup has no archived ledger history; current archives will be preserved.';; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 147

```text
  const confirmed = window.confirm(
```

Calls `window.confirm` with a text template that combines fixed text with computed values `archiveHandling` (archive handling), `counts` (counts); stores the result in `confirmed`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 148

```text
    `Restore this Timekeeper backup? This replaces the current records in the included data groups. ${archiveHandling}\n\n${counts}\n\nThis cannot be undone unless you first download a backup of the current data.`
```

Continues the surrounding JavaScript expression or argument list. This line contributes `Restore this Timekeeper backup? This replaces the current records in the included data groups. ${archiveHandling}\n\n${counts}\n\nThis cannot be undone unless you first download a backup of the current data.`; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 149

```text
  );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 150

```text
  if (!confirmed) return;
```

Returns no value to the caller and exits this function.

### Line 151

```text
  
```

Blank line separates related code sections for readability.

### Line 152

```text
  restoreBackupButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 153

```text
  downloadBackupButton.disabled = true;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 154

```text
  backupStatus.textContent = 'Restoring all workspace data…';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 155

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 156

```text
    await store.restoreFullBackup(pendingBackup);
```

Waits for the asynchronous store/browser operation to finish before continuing, preserving ordering.

### Line 157

```text
    backupStatus.textContent = store.loadFailures.length ?
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 158

```text
      'Restore was written, but the workspace could not confirm every collection after reloading. Retry the Firestore warning.' :
```

Continues the surrounding JavaScript expression or argument list. This line contributes 'Restore was written, but the workspace could not confirm every collection after reloading. Retry the Firestore warning.' :; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 159

```text
      'Restore completed and the workspace reloaded.';
```

Continues the surrounding JavaScript expression or argument list. This line contributes 'Restore completed and the workspace reloaded.';; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 160

```text
    pendingBackup = null;
```

Assigns the result of null to pendingBackup, updating this control or record for the next step.

### Line 161

```text
    backupFileInput.value = '';
```

Assigns the result of '' to backupFileInput.value, updating this control or record for the next step.

### Line 162

```text
    backupPreview.textContent = 'No backup selected.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 163

```text
    downloadBackupButton.disabled = store.loadFailures.length > 0;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 164

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 165

```text
    backupStatus.textContent = error.message || 'Restore failed. The current data was not confirmed as replaced.';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 166

```text
    restoreBackupButton.disabled = false;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 167

```text
    downloadBackupButton.disabled = store.loadFailures.length > 0;
```

Disables or enables the control to prevent duplicate submissions while work is pending or invalid.

### Line 168

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 169

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 170

```text

```

Blank line separates related code sections for readability.

### Line 171

```text
loadBackupWorkspace();
```

Calls `loadBackupWorkspace` with no arguments.
