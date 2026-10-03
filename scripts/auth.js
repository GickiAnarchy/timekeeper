import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, authPersistenceReady, db } from './firebase.js';

export function observeAuthState(onChange, onError) {
  return authPersistenceReady.then(() => onAuthStateChanged(auth, onChange, onError));
}

export function watchAdminStatus(user, onStatus) {
  const adminRef = doc(db, 'admins', user.uid);

  return onSnapshot(
    adminRef,
    { includeMetadataChanges: true },
    (snapshot) => {
      // Never authorize from a cached role document; wait for the server result.
      if (snapshot.metadata.fromCache) {
        onStatus('checking');
        return;
      }

      const enabled = snapshot.exists() && snapshot.data()?.enabled === true;
      onStatus(enabled ? 'enabled' : 'disabled');
    },
    (error) => onStatus('error', error)
  );
}

export async function signInAdmin(email, password) {
  await authPersistenceReady;
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  await authPersistenceReady;
  return signOut(auth);
}
