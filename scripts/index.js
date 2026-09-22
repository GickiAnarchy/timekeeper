
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


export function changeHeader(newHeader = "Mosher Lawns") {
  const theHeader = document.getElementById('main-header');
  if (theHeader) {
    theHeader.textContent = newHeader;
  }
}

