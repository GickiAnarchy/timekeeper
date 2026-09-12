document.addEventListener('DOMContentLoaded', () => {
  const pageSelect = document.getElementById('page-select');
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  
  pageSelect.addEventListener('change', (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      mainIframe.src = selectedUrl;
    }
  });
});
