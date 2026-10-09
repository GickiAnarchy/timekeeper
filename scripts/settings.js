const themeSelect = document.getElementById('theme-select');
const fontScaleInputs = [...document.querySelectorAll('input[name="font-scale"]')];
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
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'timekeeper-settings-request' }, window.location.origin);
  }
}

function sendSettingsUpdate() {
  if (window.parent === window) return;
  const selectedFontScale = fontScaleInputs.find(input => input.checked)?.value;
  window.parent.postMessage({
    type: 'timekeeper-settings-update',
    theme: themeSelect?.value,
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
