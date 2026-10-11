import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  EmailAuthProvider,
  getAuth,
  getIdToken,
  getIdTokenResult,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Replace this fail-closed placeholder with the owner's Firebase Auth UID in
// both this file and firestore.rules before any future production deployment.
export const OWNER_UID = "N9fh9kr98neSYBSNdyDHBZn9IGv1";

const firebaseConfig = {
  apiKey: "AIzaSyDn_y846YGhK689a3-2S6VvO46uElD1JXw",
  authDomain: "timekeeper-ad253.firebaseapp.com",
  projectId: "timekeeper-ad253",
  storageBucket: "timekeeper-ad253.firebasestorage.app",
  messagingSenderId: "516577372091",
  appId: "1:516577372091:web:3bb56f8017058ffcd9869e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let resolveInitialAuth;
const initialAuthState = new Promise(resolve => { resolveInitialAuth = resolve; });
let hasInitialAuthState = false;
let lastObservedUid;
let lastPasswordReauthenticationAt = 0;
onAuthStateChanged(auth, user => {
  const uid = user?.uid || null;
  if (uid !== lastObservedUid) lastPasswordReauthenticationAt = 0;
  lastObservedUid = uid;
  if (hasInitialAuthState) return;
  hasInitialAuthState = true;
  resolveInitialAuth(user || null);
});

export function observeAuthState(callback, onError = console.error) {
  return onAuthStateChanged(auth, callback, onError);
}

export async function getCurrentOwner() {
  await initialAuthState;
  const user = auth.currentUser;
  if (!user) return null;
  if (user.uid !== OWNER_UID) {
    await signOut(auth);
    return null;
  }
  return user;
}

export async function signInOwner(email, password) {
  const result = await signInWithEmailAndPassword(auth, String(email || "").trim(), password);
  lastPasswordReauthenticationAt = 0;
  if (result.user.uid !== OWNER_UID) {
    await signOut(auth);
    throw new Error("This account is not authorized to use this workspace.");
  }
  return result.user;
}

export async function signOutOwner() {
  lastPasswordReauthenticationAt = 0;
  await signOut(auth);
}

function showPasswordReauthenticationDialog(user, reason) {
  if (!globalThis.document?.body || typeof document.createElement("dialog").showModal !== "function") {
    return Promise.reject(new Error("This browser cannot securely request password reauthentication."));
  }

  const dialog = document.createElement("dialog");
  dialog.className = "reauth-dialog";
  dialog.setAttribute("aria-labelledby", "reauth-title");
  const heading = document.createElement("h2");
  heading.id = "reauth-title";
  heading.textContent = "Confirm your identity";
  const description = document.createElement("p");
  description.textContent = `${reason} Re-enter the owner account password to continue.`;
  const email = document.createElement("p");
  email.className = "reauth-email";
  email.textContent = user.email || "Owner account";
  const form = document.createElement("form");
  form.method = "dialog";
  const label = document.createElement("label");
  label.textContent = "Owner password";
  const password = document.createElement("input");
  password.type = "password";
  password.autocomplete = "current-password";
  password.required = true;
  password.autofocus = true;
  label.appendChild(password);
  const error = document.createElement("p");
  error.className = "reauth-error";
  error.setAttribute("role", "alert");
  const actions = document.createElement("div");
  actions.className = "reauth-actions";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "secondary-button";
  cancel.textContent = "Cancel";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Reauthenticate";
  actions.append(cancel, submit);
  form.append(label, error, actions);
  dialog.append(heading, description, email, form);
  document.body.appendChild(dialog);

  return new Promise(resolve => {
    let completed = false;
    const finish = value => {
      if (completed) return;
      completed = true;
      password.value = "";
      dialog.close();
      dialog.remove();
      resolve(value);
    };
    cancel.addEventListener("click", () => finish(false));
    dialog.addEventListener("cancel", event => {
      event.preventDefault();
      finish(false);
    });
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!password.reportValidity()) return;
      const suppliedPassword = password.value;
      password.value = "";
      submit.disabled = true;
      cancel.disabled = true;
      submit.textContent = "Checking…";
      try {
        await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, suppliedPassword)
        );
        await getIdToken(user, true);
        finish(true);
      } catch (reauthError) {
        console.warn("Owner password reauthentication failed.", reauthError?.code || "auth/error");
        error.textContent = "The password could not be confirmed. Check it and try again.";
        submit.disabled = false;
        cancel.disabled = false;
        submit.textContent = "Reauthenticate";
        password.focus();
      }
    });
    dialog.addEventListener("close", () => {
      if (!completed) finish(false);
    }, { once: true });
    dialog.showModal();
    password.focus();
  });
}

export async function requireRecentOwnerReauthentication(reason = "This change is protected.") {
  await initialAuthState;
  const user = auth.currentUser;
  if (!user || user.uid !== OWNER_UID) {
    throw new Error("Sign in with the owner account before changing workspace data.");
  }
  if (!user.email || !user.providerData.some(provider => provider.providerId === "password")) {
    throw new Error("The owner account must use email and password to make protected changes.");
  }

  const currentToken = await getIdTokenResult(user);
  const authTime = Number(currentToken.claims.auth_time);
  const now = Date.now() / 1000;
  // Prompt before the Rules' five-minute window expires to leave room for network latency.
  if (lastPasswordReauthenticationAt <= 0 || now - lastPasswordReauthenticationAt >= 240 ||
      !Number.isFinite(authTime) || authTime > now + 60 || now - authTime >= 240) {
    const confirmed = await showPasswordReauthenticationDialog(user, reason);
    if (!confirmed) throw new Error("Password reauthentication was cancelled.");
    lastPasswordReauthenticationAt = Date.now() / 1000;
  }

  const refreshedToken = await getIdTokenResult(user, true);
  const refreshedAuthTime = Number(refreshedToken.claims.auth_time);
  const refreshedNow = Date.now() / 1000;
  if (!Number.isFinite(refreshedAuthTime) || refreshedAuthTime > refreshedNow + 60 ||
      refreshedNow - refreshedAuthTime >= 300) {
    throw new Error("Recent password authentication could not be confirmed. Try again.");
  }
  return user;
}
