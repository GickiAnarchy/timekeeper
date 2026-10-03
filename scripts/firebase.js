import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDn_y846YGhK689a-3S6VvO46uElD1JXw",
  authDomain: "timekeeper-ad253.firebaseapp.com",
  projectId: "timekeeper-ad253",
  storageBucket: "timekeeper-ad253.firebasestorage.app",
  messagingSenderId: "516577372091",
  appId: "1:516577372091:web:3bb56f8017058ffcd9869e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Local persistence lets the same-origin shell and iframe observe one login.
export const authPersistenceReady = setPersistence(auth, browserLocalPersistence);
