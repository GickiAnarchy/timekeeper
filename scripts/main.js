import { store } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }
  
  // Close menu automatically when any navigation link inside it is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  
  const pageSelect = document.getElementById('page-select');
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  
  navMenu.addEventListener('change', (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      mainIframe.src = selectedUrl;
    }
  });
});