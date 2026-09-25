function updateTimeTheme() {
  const sky = document.querySelector('.sky');
  if (!sky) return;

  const hours = new Date().getHours();
  sky.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');

  if (hours >= 5 && hours < 12) {
    sky.classList.add('theme-morning');
  } else if (hours >= 12 && hours < 17) {
    sky.classList.add('theme-afternoon');
  } else if (hours >= 17 && hours < 21) {
    sky.classList.add('theme-evening');
  } else {
    sky.classList.add('theme-night');
  }
}

updateTimeTheme();
setInterval(updateTimeTheme, 60 * 1000);

/* The imported interaction is intentionally limited to the celestial body. */
const celestialBody = document.querySelector('.celestial-body');

if (celestialBody) {
  celestialBody.setAttribute('role', 'button');
  celestialBody.setAttribute('tabindex', '0');
  celestialBody.setAttribute(
    'aria-label',
    'Celestial body. Activate to launch it, then activate again to pause or resume.'
  );

  function handleInteraction(event) {
    event.preventDefault();

    if (celestialBody.classList.contains('shrinkAway') || celestialBody.classList.contains('rising')) {
      celestialBody.classList.toggle('paused');
    } else {
      celestialBody.classList.add('shrinkAway');
    }
  }

  celestialBody.addEventListener('animationend', (event) => {
    if (event.animationName === 'pulse') return;

    if (event.animationName === 'shrinkOut') {
      celestialBody.classList.remove('shrinkAway');
      celestialBody.classList.add('rising');
    } else if (event.animationName === 'riseFromBottom') {
      celestialBody.classList.remove('rising', 'paused');
    }
  });

  celestialBody.addEventListener('pointerdown', handleInteraction);
  celestialBody.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleInteraction(event);
    }
  });
}
