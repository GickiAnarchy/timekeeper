import { store } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
    await store.init();
    const shiftStatus = document.querySelector('.shift-status');



});