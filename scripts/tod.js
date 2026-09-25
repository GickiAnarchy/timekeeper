function updateTimeTheme() {
  const now = new Date();
  const hours = now.getHours();
  const sky = document.querySelector('.sky');
  
  // Reset theme classes
  sky.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');

  // Determine time of day and set active CSS theme
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

// Run clock theme calculation
updateTimeTheme();
setInterval(updateTimeTheme, 1000);

/* --- CELESTIAL BODY INTERACTION LOGIC --- */

const celestialBody = document.querySelector('.celestial-body');

// Handle Touch / Click trigger
function handleInteraction(event) {
  event.preventDefault(); // Prevent duplicate touch/click triggering on mobile devices

  // If active animation is playing, toggle pause / play
  if (celestialBody.classList.contains('launching') || celestialBody.classList.contains('rising')) {
    celestialBody.classList.toggle('paused');
    return;
  }

  // Otherwise, start launch phase
  celestialBody.classList.add('launching');
}

// Handle animation completion transitions
celestialBody.addEventListener('animationend', (event) => {
  // Ignore ambient pulse keyframe events
  if (event.animationName === 'pulse') return;

  if (event.animationName === 'launchUp') {
    // Once launched off screen, transition immediately to rising from bottom
    celestialBody.classList.remove('launching');
    celestialBody.classList.add('rising');
  } else if (event.animationName === 'riseFromBottom') {
    // Reset state back to idle after rising completion
    celestialBody.classList.remove('rising', 'paused');
  }
});

// Attach pointer and touch event listeners
celestialBody.addEventListener('pointerdown', handleInteraction);
