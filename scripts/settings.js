import { store } from './models.js';

const themeSelect = document.getElementById('theme-select');
const fontScaleInputs = [...document.querySelectorAll('input[name="font-scale"]')];
const THEME_KEY = 'timekeeper-theme';
const FONT_SCALE_KEY = 'timekeeper-font-scale';
const themes = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
const fontScales = new Set([1, 1.15, 1.3, 1.5]);

function applySettingsState(theme, fontScale) {
  if (themeSelect && themes.has(theme)) {
    themeSelect.value = theme;
  }
  if (fontScales.has(Number(fontScale))) {
    const selected = String(Number(fontScale));
    fontScaleInputs.forEach(input => { input.checked = input.value === selected; });
  }
}

function requestSettingsState() {
  if (window.parent === window) {
    let theme = 'forest';
    let fontScale = 1;
    try {
      const savedTheme = window.localStorage.getItem(THEME_KEY);
      const savedScale = Number(window.localStorage.getItem(FONT_SCALE_KEY));
      if (themes.has(savedTheme)) theme = savedTheme;
      if (fontScales.has(savedScale)) fontScale = savedScale;
    } catch (error) {
      console.warn('Unable to read appearance settings in this browser.', error);
    }
    applySettingsState(theme, fontScale);
    document.documentElement.dataset.theme = theme;
    return;
  }
  window.parent.postMessage({ type: 'timekeeper-settings-request' }, window.location.origin);
}

function sendSettingsUpdate() {
  const theme = themeSelect?.value;
  if (themes.has(theme)) document.documentElement.dataset.theme = theme;
  const selectedFontScale = fontScaleInputs.find(input => input.checked)?.value;
  if (window.parent === window) {
    try {
      if (themes.has(theme)) window.localStorage.setItem(THEME_KEY, theme);
      if (selectedFontScale && fontScales.has(Number(selectedFontScale))) {
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(selectedFontScale)));
      }
    } catch (error) {
      console.warn('Unable to save appearance settings in this browser.', error);
    }
    return;
  }
  window.parent.postMessage({
    type: 'timekeeper-settings-update',
    theme,
    fontScale: selectedFontScale ? Number(selectedFontScale) : undefined
  }, window.location.origin);
}

themeSelect?.addEventListener('change', sendSettingsUpdate);
fontScaleInputs.forEach(input => input.addEventListener('change', sendSettingsUpdate));
window.addEventListener('message', event => {
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
  if (event.data?.type === 'timekeeper-settings-state') {
    applySettingsState(event.data.theme, event.data.fontScale);
  }
});

requestSettingsState();

const downloadBackupButton = document.getElementById('download-backup-btn');
const backupFileInput = document.getElementById('backup-file');
const backupPreview = document.getElementById('backup-preview');
const restoreBackupButton = document.getElementById('restore-backup-btn');
const backupStatus = document.getElementById('backup-status');
let pendingBackup = null;

async function loadBackupWorkspace() {
  try {
    await store.init();
    if (store.loadFailures.length) {
      downloadBackupButton.disabled = true;
      backupStatus.textContent = 'Some workspace data could not be loaded. Retry the visible Firestore warning before downloading a full backup.';
      return;
    }
    downloadBackupButton.disabled = false;
    backupStatus.textContent = 'Workspace data is loaded and ready to back up.';
  } catch (error) {
    downloadBackupButton.disabled = true;
    backupStatus.textContent = error.message || 'Workspace data could not be loaded.';
  }
}

downloadBackupButton?.addEventListener('click', () => {
  try {
    if (store.loadFailures.length) throw new Error('The workspace did not finish loading; retry before exporting.');
    const backup = store.exportFullBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timekeeper-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    backupStatus.textContent = 'Full backup downloaded. Store the file somewhere safe; it contains payroll and business records.';
  } catch (error) {
    backupStatus.textContent = error.message || 'The backup could not be created.';
  }
});

backupFileInput?.addEventListener('change', async () => {
  pendingBackup = null;
  restoreBackupButton.disabled = true;
  const file = backupFileInput.files?.[0];
  if (!file) {
    backupPreview.textContent = 'No backup selected.';
    backupStatus.textContent = '';
    return;
  }
  try {
    const parsed = JSON.parse(await file.text());
    const preview = store.previewFullBackup(parsed);
    pendingBackup = parsed;
    backupPreview.textContent = [
      `File: ${file.name}`,
      `Format: ${preview.format} · schema ${preview.schemaVersion}`,
      `Exported: ${preview.exportedAt || 'timestamp not available'}`,
      ...Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`)
    ].join('\n');
    restoreBackupButton.disabled = false;
    backupStatus.textContent = 'Preview only: no data has been changed.';
  } catch (error) {
    backupPreview.textContent = 'This file could not be previewed.';
    backupStatus.textContent = error.message || 'Choose a valid versioned Timekeeper backup file.';
  }
});

restoreBackupButton?.addEventListener('click', async () => {
  if (!pendingBackup) return;
  const preview = store.previewFullBackup(pendingBackup);
  const counts = Object.entries(preview.counts).map(([name, count]) => `${name}: ${count}`).join('\n');
  const confirmed = window.confirm(
    `Restore this Timekeeper backup? This replaces all current employees, customers, shifts, invoices, payments, planned jobs, and ledger entries.\n\n${counts}\n\nThis cannot be undone unless you first download a backup of the current data.`
  );
  if (!confirmed) return;

  restoreBackupButton.disabled = true;
  downloadBackupButton.disabled = true;
  backupStatus.textContent = 'Restoring all workspace data…';
  try {
    await store.restoreFullBackup(pendingBackup);
    backupStatus.textContent = store.loadFailures.length
      ? 'Restore was written, but the workspace could not confirm every collection after reloading. Retry the Firestore warning.'
      : 'Restore completed and the workspace reloaded.';
    pendingBackup = null;
    backupFileInput.value = '';
    backupPreview.textContent = 'No backup selected.';
    downloadBackupButton.disabled = store.loadFailures.length > 0;
  } catch (error) {
    backupStatus.textContent = error.message || 'Restore failed. The current data was not confirmed as replaced.';
    restoreBackupButton.disabled = false;
    downloadBackupButton.disabled = store.loadFailures.length > 0;
  }
});

loadBackupWorkspace();
