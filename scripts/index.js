import { store } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  store.init();
  const activeCount = store.howManyActive();
  const smallBanner = document.getElementById('small-banner');
  if (smallBanner && activeCount > 0) {
    smallBanner.textContent = `Time Manager - ${activeCount} active shifts`;
    smallBanner.classList.add('make-red');
  } else {
    smallBanner.classList.remove('make-red');
  }
  
  const pageSelect = document.getElementById('page-select');
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  
  pageSelect.addEventListener('change', (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      mainIframe.src = selectedUrl;
    }
  });
});
