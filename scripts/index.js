document.addEventListener('DOMContentLoaded', () => {
  const navigation = [...document.querySelectorAll('.nav-link[data-page]')];
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  const title = document.getElementById('active-page-title');
  const dateLabel = document.getElementById('topbar-date');

  function activate(button) {
    if (!button) return;
    navigation.forEach(item => {
      if (item === button) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    title.textContent = button.dataset.title || 'Timekeeper';
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
    });
  }

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
