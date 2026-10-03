import {
  observeAuthState,
  signInAdmin,
  signOutAdmin,
  watchAdminStatus
} from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const authGate = document.getElementById('auth-gate');
  const appShell = document.getElementById('app-shell');
  const appContent = document.getElementById('app-content');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const loginSubmit = document.getElementById('login-submit');
  const authStatus = document.getElementById('auth-status');
  const gateSignOut = document.getElementById('gate-sign-out');
  const headerSignOut = document.getElementById('header-sign-out');
  const mainIframe = document.querySelector('iframe[name="main-content"]');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!authGate || !appShell || !appContent || !loginForm || !authStatus || !mainIframe) return;

  let stopAdminWatch = null;
  let authRevision = 0;
  let iframeLoaded = false;

  const setStatus = (message) => {
    authStatus.textContent = message;
  };

  const closeProtectedApp = () => {
    appShell.hidden = true;
    appContent.hidden = true;
    authGate.hidden = false;
    mainIframe.src = 'about:blank';
    iframeLoaded = false;
  };

  const signOutAndReport = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      console.error('Unable to sign out:', error);
      setStatus('Sign-out failed. Please try again.');
    }
  };

  gateSignOut?.addEventListener('click', signOutAndReport);
  headerSignOut?.addEventListener('click', signOutAndReport);

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    loginSubmit.disabled = true;
    setStatus('Signing in…');

    try {
      await signInAdmin(email, password);
      passwordInput.value = '';
      setStatus('Signed in. Checking admin access…');
    } catch (error) {
      console.error('Firebase sign-in failed:', error);
      if (error.code === 'auth/operation-not-allowed') {
        setStatus('Email/password sign-in is not enabled in Firebase Authentication yet.');
      } else {
        setStatus('Sign-in failed. Check the credentials and try again.');
      }
    } finally {
      loginSubmit.disabled = false;
    }
  });

  const closeNavigation = () => {
    navMenu?.classList.remove('active');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavigation);
    });
  }

  const handleAuthChange = (user) => {
    const revision = ++authRevision;
    stopAdminWatch?.();
    stopAdminWatch = null;
    closeProtectedApp();
    if (headerSignOut) headerSignOut.hidden = true;
    if (gateSignOut) gateSignOut.hidden = !user;

    if (!user) {
      setStatus('Sign in with an enabled owner or admin account.');
      return;
    }

    setStatus('Signed in. Checking admin access…');
    stopAdminWatch = watchAdminStatus(user, (status, error) => {
      if (revision !== authRevision) return;

      if (status === 'checking') {
        closeProtectedApp();
        if (headerSignOut) headerSignOut.hidden = true;
        setStatus('Checking admin access…');
        return;
      }

      if (status === 'error') {
        closeProtectedApp();
        if (headerSignOut) headerSignOut.hidden = true;
        console.error('Unable to verify admin status:', error);
        setStatus('Could not verify admin access. Check that Firestore rules are deployed and the connection is available.');
        return;
      }

      if (status === 'disabled') {
        closeProtectedApp();
        setStatus('This account is not enabled as an admin.');
        return;
      }

      authGate.hidden = true;
      appShell.hidden = false;
      appContent.hidden = false;
      if (headerSignOut) headerSignOut.hidden = false;
      if (!iframeLoaded) {
        mainIframe.src = 'html/home.html';
        iframeLoaded = true;
      }
    });
  };

  try {
    await observeAuthState(handleAuthChange, (error) => {
      console.error('Firebase Auth state error:', error);
      closeProtectedApp();
      setStatus('Unable to initialize sign-in. Check the Firebase Authentication configuration.');
    });
  } catch (error) {
    console.error('Firebase Auth initialization failed:', error);
    closeProtectedApp();
    setStatus('Unable to initialize sign-in. Check browser storage and Firebase configuration.');
  }
});
