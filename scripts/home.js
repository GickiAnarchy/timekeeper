

document.addEventListener('DOMContentLoaded', async () => {
  const updatesDiv = document.getElementById('updates-div');
  const updatesDivAnimation = updatesDiv.getAnimations();
  const welcomeMessageDiv = document.getElementById('welcome-div');
  const homeBody = document.getElementById('home-body');


  updatesDiv.addEventListener('animationend', () => {
    homeBody.removeChild(updatesDiv);
    welcomeMessageDiv.classList.remove('hidden');
  });

});