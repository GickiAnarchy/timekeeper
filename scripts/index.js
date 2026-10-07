
document.addEventListener('DOMContentLoaded', () => {
  
  const pageSelect = document.getElementById('page-select');
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  const cornerLogo = document.getElementById('corner-logo');
  const logo = document.getElementById('logo');
  const borderWrapper = document.getElementById('border-wrapper');
  
  pageSelect.addEventListener('change', (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      mainIframe.src = selectedUrl;
    }
  });
  
  logo.addEventListener('click', () => {
    const state = getComputedStyle(borderWrapper).animationPlayState;
    borderWrapper.style.animationPlayState = state === "paused" ? "running" : "paused";
    cornerLogo.style.animationPlayState = state === "paused" ? "running" : "paused";
  });
  
});

  

export function changeHeader(newHeader = "Mosher Lawns") {
  const theHeader = document.getElementById('main-header');
  if (theHeader) {
    theHeader.textContent = newHeader;
  }
}

