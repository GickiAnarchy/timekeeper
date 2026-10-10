const THEME_KEY = 'timekeeper-theme';
const FONT_SCALE_KEY = 'timekeeper-font-scale';
const THEMES = new Set(['forest', 'coastal', 'harvest', 'midnight', 'lavender', 'rose', 'slate']);
const FONT_SCALES = new Set([1, 1.15, 1.3, 1.5]);
const NON_TEXT_INPUT_TYPES = new Set(['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit']);

function readSavedTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    return THEMES.has(saved) ? saved : 'forest';
  } catch (error) {
    return 'forest';
  }
}

function readSavedFontScale() {
  try {
    const saved = Number(window.localStorage.getItem(FONT_SCALE_KEY));
    return FONT_SCALES.has(saved) ? saved : 1;
  } catch (error) {
    return 1;
  }
}

const fontScaleStates = new WeakMap();

function applyTextScaleToDocument(doc, scale) {
  if (!doc?.body || !doc.defaultView) return;

  let state = fontScaleStates.get(doc);
  if (!state) {
    state = { overrides: new Map(), observer: null, scheduled: false, scale: 1 };
    fontScaleStates.set(doc, state);
  }
  state.scale = scale;

  for (const [element, saved] of state.overrides) {
    if (saved.inlineFontSize) element.style.setProperty('font-size', saved.inlineFontSize, saved.inlineFontPriority);
    else element.style.removeProperty('font-size');
    if (saved.inlineLineHeight) element.style.setProperty('line-height', saved.inlineLineHeight, saved.inlineLineHeightPriority);
    else element.style.removeProperty('line-height');
  }
  state.overrides.clear();

  if (scale > 1) {
    const elements = [doc.documentElement, ...doc.body.querySelectorAll('*')];
    const baseStyles = elements.map(element => {
      const computed = doc.defaultView.getComputedStyle(element);
      return { element, fontSize: Number.parseFloat(computed.fontSize), lineHeight: computed.lineHeight };
    });

    for (const { element, fontSize, lineHeight } of baseStyles) {
      if (!Number.isFinite(fontSize)) continue;
      state.overrides.set(element, {
        inlineFontSize: element.style.getPropertyValue('font-size'),
        inlineFontPriority: element.style.getPropertyPriority('font-size'),
        inlineLineHeight: element.style.getPropertyValue('line-height'),
        inlineLineHeightPriority: element.style.getPropertyPriority('line-height')
      });
      element.style.setProperty('font-size', `${fontSize * scale}px`, 'important');
      const lineHeightPx = Number.parseFloat(lineHeight);
      if (Number.isFinite(lineHeightPx) && lineHeight !== 'normal') {
        element.style.setProperty('line-height', `${lineHeightPx * scale}px`, 'important');
      }
    }

    if (!state.observer) {
      state.observer = new doc.defaultView.MutationObserver(() => {
        if (state.scheduled || state.scale <= 1) return;
        state.scheduled = true;
        doc.defaultView.requestAnimationFrame(() => {
          state.scheduled = false;
          applyTextScaleToDocument(doc, state.scale);
        });
      });
      state.observer.observe(doc.body, { childList: true, subtree: true });
    }
  } else if (state.observer) {
    state.observer.disconnect();
    state.observer = null;
    state.scheduled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navigation = [...document.querySelectorAll('.nav-link[data-page]')];
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  const title = document.getElementById('active-page-title');
  const dateLabel = document.getElementById('topbar-date');
  let baselineViewportHeight = 0;

  function isKeyboardInput(target) {
    if (!target || target.disabled || target.readOnly) return false;
    const tagName = String(target.tagName || '').toUpperCase();
    if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
    if (tagName !== 'INPUT') return false;
    return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
  }

  function syncKeyboardLayout() {
    const layoutHeight = window.innerHeight || document.documentElement.clientHeight;
    const visualHeight = window.visualViewport?.height || layoutHeight;
    const visibleHeight = Math.min(layoutHeight, visualHeight);
    document.documentElement.style.setProperty('--app-visible-height', `${Math.round(visibleHeight)}px`);

    let focusedControl = null;
    try {
      focusedControl = mainIframe?.contentDocument?.activeElement;
    } catch (error) {
      // The workspace pages are same-origin, but keep the shell usable if that ever changes.
    }
    const keyboardControlFocused = isKeyboardInput(focusedControl);
    if (!keyboardControlFocused) baselineViewportHeight = Math.max(layoutHeight, visualHeight);

    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
    const keyboardIsVisible = keyboardControlFocused && baselineViewportHeight - visibleHeight > resizeThreshold;
    document.body.classList.toggle('keyboard-open', keyboardIsVisible);
  }

  function watchFrameFocus() {
    try {
      const frameDocument = mainIframe?.contentDocument;
      if (!frameDocument) return;

      const refreshLayout = () => window.requestAnimationFrame(syncKeyboardLayout);
      frameDocument.addEventListener('focusin', refreshLayout, true);
      frameDocument.addEventListener('focusout', () => window.setTimeout(refreshLayout, 0), true);
      syncKeyboardLayout();
    } catch (error) {
      console.warn('Unable to watch workspace form focus.', error);
    }
  }

  window.addEventListener('resize', syncKeyboardLayout);
  window.visualViewport?.addEventListener('resize', syncKeyboardLayout);
  window.visualViewport?.addEventListener('scroll', syncKeyboardLayout);
  syncKeyboardLayout();

  function activate(button) {
    if (!button) return;
    navigation.forEach(item => {
      if (item === button) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    if (title) title.textContent = button.dataset.title || 'Timekeeper';
  }

  function applyTheme(theme) {
    const safeTheme = THEMES.has(theme) ? theme : 'forest';
    document.documentElement.dataset.theme = safeTheme;
    try {
      const frameRoot = mainIframe?.contentDocument?.documentElement;
      if (frameRoot) frameRoot.dataset.theme = safeTheme;
    } catch (error) {
      console.warn('Unable to apply the selected theme to the workspace page.', error);
    }
    return safeTheme;
  }

  function applyFontScale(scale) {
    const safeScale = FONT_SCALES.has(Number(scale)) ? Number(scale) : 1;
    applyTextScaleToDocument(document, safeScale);
    try {
      const frameDocument = mainIframe?.contentDocument;
      if (frameDocument) applyTextScaleToDocument(frameDocument, safeScale);
    } catch (error) {
      console.warn('Unable to apply the selected text size to the workspace page.', error);
    }
    return safeScale;
  }

  function sendSettingsToFrame() {
    if (!mainIframe?.contentWindow) return;
    mainIframe.contentWindow.postMessage({
      type: 'timekeeper-settings-state',
      theme: readSavedTheme(),
      fontScale: readSavedFontScale()
    }, window.location.origin);
  }

  function applySavedSettings() {
    applyTheme(readSavedTheme());
    applyFontScale(readSavedFontScale());
  }

  navigation.forEach(button => {
    button.addEventListener('click', () => {
      activate(button);
      if (mainIframe) mainIframe.src = button.dataset.page;
    });
  });

  if (mainIframe) {
    mainIframe.addEventListener('load', () => {
      watchFrameFocus();
      try {
        const currentPath = new URL(mainIframe.src, window.location.href).pathname;
        const activeButton = navigation.find(button =>
          new URL(button.dataset.page, window.location.href).pathname === currentPath
        );
        if (activeButton) activate(activeButton);
      } catch (error) {
        console.warn('Unable to identify the active workspace page.', error);
      }
      applySavedSettings();
      sendSettingsToFrame();
    });
  }

  window.addEventListener('message', event => {
    if (event.origin !== window.location.origin || event.source !== mainIframe?.contentWindow) return;
    if (event.data?.type === 'timekeeper-settings-request') {
      sendSettingsToFrame();
      return;
    }
    if (event.data?.type !== 'timekeeper-settings-update') return;

    if (THEMES.has(event.data.theme)) {
      try {
        window.localStorage.setItem(THEME_KEY, event.data.theme);
      } catch (error) {
        console.warn('Unable to save the selected theme in this browser.', error);
      }
    }
    if (FONT_SCALES.has(Number(event.data.fontScale))) {
      try {
        window.localStorage.setItem(FONT_SCALE_KEY, String(Number(event.data.fontScale)));
      } catch (error) {
        console.warn('Unable to save the selected text size in this browser.', error);
      }
    }

    applySavedSettings();
    sendSettingsToFrame();
  });

  window.addEventListener('storage', event => {
    if (event.key === THEME_KEY || event.key === FONT_SCALE_KEY || event.key === null) {
      applySavedSettings();
      sendSettingsToFrame();
    }
  });

  applySavedSettings();

  if (dateLabel) {
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    }).format(new Date());
  }
});

export function changeHeader(newHeader = 'Mosher Lawns') {
  const header = document.getElementById('active-page-title');
  if (header) header.textContent = newHeader;
}
