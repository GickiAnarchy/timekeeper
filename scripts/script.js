function showWelcome() {
    const welcomeBox = document.getElementById('welcome-dialog');
    const enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener('click', () => {
        welcomeBox.close();
    });

    welcomeBox.showModal();

}


document.addEventListener('DOMContentLoaded', () => {    

    setTimeout(() => {
        showWelcome();
    }, 2000);

});