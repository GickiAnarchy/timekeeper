const themeSelect = document.getElementById('theme-select');
const fontScaleInputs = [...document.querySelectorAll('input[name="font-scale"]')];
const THEME_KEY = 'timekeeper-theme';
const FONT_SCALE_KEY = 'timekeeper-font-scale';
const themes = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
const fontScales = new Set([1, 1.15, 1.3, 1.5]);

function applySettings(theme, fontScale) {
  if (themes.has(theme)) {
    themeSelect.value = theme;
    document.documentElement.dataset.theme = theme;
  }
  if (fontScales.has(Number(fontScale))) {
    const selected = String(Number(fontScale));
    fontScaleInputs.forEach(input => { input.checked = input.value === selected; });
  }
}

function requestSettings() {
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
    applySettings(theme, fontScale);
    return;
  }
  window.parent.postMessage({ type: 'timekeeper-settings-request' }, window.location.origin);
}

function publishSettings() {
  const theme = themeSelect.value;
  const fontScale = Number(fontScaleInputs.find(input => input.checked)?.value || 1);
  if (!themes.has(theme) || !fontScales.has(fontScale)) return;
  document.documentElement.dataset.theme = theme;

  if (window.parent === window) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
      window.localStorage.setItem(FONT_SCALE_KEY, String(fontScale));
    } catch (error) {
      console.warn('Unable to save appearance settings in this browser.', error);
    }
    return;
  }
  window.parent.postMessage({ type: 'timekeeper-settings-update', theme, fontScale }, window.location.origin);
}

themeSelect?.addEventListener('change', publishSettings);
fontScaleInputs.forEach(input => input.addEventListener('change', publishSettings));
window.addEventListener('message', event => {
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
  if (event.data?.type === 'timekeeper-settings-state') applySettings(event.data.theme, event.data.fontScale);
});

requestSettings();
