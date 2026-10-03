import {
  observeAuthState,
  watchAdminStatus
} from './auth.js';
import { store } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  const shiftStatus = document.getElementById('shift-status');
  if (!shiftStatus) return;

  let stopAdminWatch = null;
  let authRevision = 0;
  let dataLoadRevision = 0;
  let initializedUid = null;
  let activeAdminUid = null;

  const showStatus = (message, className = 'noshifts') => {
    shiftStatus.classList.remove('noshifts', 'shifts', 'status-message');
    shiftStatus.classList.add(className);
    shiftStatus.textContent = message;
  };

  const renderActiveShiftStatus = () => {
    if (store.hasActiveShifts()) {
      const count = store.getActiveShiftCount();
      showStatus(`${count} open shift(s)!`, 'shifts');
    } else {
      showStatus('No open shifts.');
    }
  };

  showStatus('Checking sign-in status…', 'status-message');

  try {
    await observeAuthState((user) => {
      const revision = ++authRevision;
      stopAdminWatch?.();
      stopAdminWatch = null;
      initializedUid = null;
      activeAdminUid = null;
      dataLoadRevision += 1;
      store.reset();

      if (!user) {
        showStatus('Sign in through the main app to view shift status.', 'status-message');
        return;
      }

      showStatus('Checking admin access…', 'status-message');
      stopAdminWatch = watchAdminStatus(user, async (status, error) => {
        if (revision !== authRevision) return;
        if (status !== 'enabled') activeAdminUid = null;

        if (status === 'checking') {
          dataLoadRevision += 1;
          initializedUid = null;
          store.reset();
          showStatus('Checking admin access…', 'status-message');
          return;
        }

        if (status === 'error') {
          dataLoadRevision += 1;
          initializedUid = null;
          store.reset();
          console.error('Unable to verify admin status in Home iframe:', error);
          showStatus('Unable to verify admin access. Check Firestore rules and the connection.', 'status-message');
          return;
        }

        if (status === 'disabled') {
          dataLoadRevision += 1;
          initializedUid = null;
          store.reset();
          showStatus('This account is not enabled as an admin.', 'status-message');
          return;
        }

        activeAdminUid = user.uid;
        if (initializedUid === user.uid) return;
        initializedUid = user.uid;
        const loadRevision = ++dataLoadRevision;
        showStatus('Loading shifts…', 'status-message');

        try {
          await store.init();
          if (revision === authRevision && loadRevision === dataLoadRevision) {
            renderActiveShiftStatus();
          } else if (activeAdminUid === null) {
            store.reset();
            initializedUid = null;
          }
        } catch (initError) {
          console.error('Unable to initialize Home iframe data store:', initError);
          if (revision === authRevision && loadRevision === dataLoadRevision) {
            initializedUid = null;
            showStatus('Unable to load app data. Check Firestore rules and the connection.', 'status-message');
          } else if (activeAdminUid === null) {
            store.reset();
          }
        }
      });
    }, (error) => {
      console.error('Firebase Auth state error in Home iframe:', error);
      showStatus('Unable to check sign-in status.', 'status-message');
    });
  } catch (error) {
    console.error('Firebase Auth initialization failed in Home iframe:', error);
    showStatus('Unable to initialize sign-in. Check browser storage and Firebase configuration.', 'status-message');
  }
});
