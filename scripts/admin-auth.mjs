import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { app } from './models.js';

export const DAILY_QUOTES_OWNER_UID = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';

const auth = getAuth(app);
let persistencePromise;

function ensurePersistentAdminSession() {
  if (!persistencePromise) {
    persistencePromise = setPersistence(auth, browserLocalPersistence).catch(error => {
      persistencePromise = undefined;
      throw error;
    });
  }
  return persistencePromise;
}

function waitForInitialAuthState() {
  return new Promise((resolve, reject) => {
    let unsubscribe = () => {};
    unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, error => {
      unsubscribe();
      reject(error);
    });
  });
}

export async function prepareDailyQuotesAdminSignIn() {
  await ensurePersistentAdminSession();
  return waitForInitialAuthState();
}

export function observeDailyQuotesAdminSession(onChange, onError) {
  return onAuthStateChanged(auth, onChange, onError);
}

export async function signInDailyQuotesAdmin(email, password) {
  await ensurePersistentAdminSession();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export function isDailyQuotesAdmin(user) {
  return user?.uid === DAILY_QUOTES_OWNER_UID;
}

export async function signOutDailyQuotesAdmin() {
  if (auth.currentUser) await signOut(auth);
}
