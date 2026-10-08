const THEME_KEY = 'timekeeper-theme';
const THEMES = new Set(['forest', 'coastal', 'harvest', 'midnight']);

function readSavedTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    return THEMES.has(saved) ? saved : 'forest';
  } catch (error) {
    return 'forest';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navigation = [...document.querySelectorAll('.nav-link[data-page]')];
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  const title = document.getElementById('active-page-title');
  const dateLabel = document.getElementById('topbar-date');
  const themeSelect = document.getElementById('theme-select');

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
    if (themeSelect) themeSelect.value = safeTheme;

    try {
      const frameRoot = mainIframe?.contentDocument?.documentElement;
      if (frameRoot) frameRoot.dataset.theme = safeTheme;
    } catch (error) {
      console.warn('Unable to apply the selected theme to the workspace page.', error);
    }
    return safeTheme;
  }

  navigation.forEach(button => {
    button.addEventListener('click', () => {
      activate(button);
      if (mainIframe) mainIframe.src = button.dataset.page;
    });
  });

  if (mainIframe) {
    mainIframe.addEventListener('load', () => {
      try {
        const currentPath = new URL(mainIframe.src, window.location.href).pathname;
        const activeButton = navigation.find(button =>
          new URL(button.dataset.page, window.location.href).pathname === currentPath
        );
        if (activeButton) activate(activeButton);
      } catch (error) {
        console.warn('Unable to identify the active workspace page.', error);
      }
      applyTheme(document.documentElement.dataset.theme || 'forest');
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      const theme = applyTheme(themeSelect.value);
      try {
        window.localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        console.warn('Unable to save the selected theme in this browser.', error);
      }
    });
  }

  window.addEventListener('storage', event => {
    if (event.key === THEME_KEY) applyTheme(readSavedTheme());
  });

  applyTheme(readSavedTheme());

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
