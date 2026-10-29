import { getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { app } from './models.js';

export const DAILY_QUOTES_OWNER_UID = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';

const auth = getAuth(app);

export async function prepareDailyQuotesAdminSignIn() {
  await setPersistence(auth, inMemoryPersistence);
  if (auth.currentUser) await signOut(auth);
}

export async function signInDailyQuotesAdmin(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export function isDailyQuotesAdmin(user) {
  return user?.uid === DAILY_QUOTES_OWNER_UID;
}

export async function signOutDailyQuotesAdmin() {
  if (auth.currentUser) await signOut(auth);
}
