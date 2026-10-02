import { store } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
    //await store.init();
    const shiftStatus = document.querySelector('.shift-status');
    
    if (shiftStatus && store.hasActiveShifts()) {
        const numOfShifts = store.getActiveShiftCount();
        shiftStatus.classList.remove('noshifts');
        shiftStatus.classList.add('shifts');
        shiftStatus.textContent = `${numOfShifts} open shift(s)!`;
    } else {
        shiftStatus.classList.add('noshifts');
        shiftStatus.classList.remove('shifts');
        shiftStatus.textContent = "No open shifts.";
    }
    
    


});