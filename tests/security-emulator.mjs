import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before, beforeEach } from 'node:test';
import { initializeApp, deleteApp } from '@firebase/app';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  getIdTokenResult,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut
} from '@firebase/auth';
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from '@firebase/firestore';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing';

const PROJECT_ID = 'demo-timekeeper';
const TEST_PASSWORD = 'LocalOnly-EmulatorPassword!42';
const PRIMARY_OWNER_UID = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';
const SECONDARY_OWNER_UID = 'S7v71Kjhesf4oWv1qTzsN8zcIZm1';
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
const [firestoreHostname, firestorePortText] = firestoreHost.split(':');
const firestorePort = Number(firestorePortText);

let app;
let auth;
let firestore;
let ownerUser;
let secondOwnerUser;
let outsiderUser;
let ownerEmail;
let secondOwnerEmail;
let outsiderEmail;
let ownerUid;
let secondOwnerUid;
let testEnvironment;

function activeShift(overrides = {}) {
  return {
    employeeId: 'employee-1',
    custId: 'customer-1',
    clockInTime: new Date().toISOString(),
    clockOutTime: null,
    note: null,
    isPaid: false,
    breaks: [],
    paidHours: null,
    ...overrides
  };
}

function testContext(uid, authTime) {
  return testEnvironment.authenticatedContext(uid, {
    auth_time: authTime,
    email: uid === ownerUid ? ownerEmail : uid === secondOwnerUid ? secondOwnerEmail : 'other@example.test',
    email_verified: true
  }).firestore();
}

before(async () => {
  app = initializeApp({
    apiKey: 'demo-api-key',
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    projectId: PROJECT_ID,
    appId: '1:123456789:web:emulator-only'
  }, `security-emulator-${Date.now()}`);
  auth = getAuth(app);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  firestore = (await import('@firebase/firestore')).getFirestore(app);
  connectFirestoreEmulator(firestore, firestoreHostname, firestorePort);

  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  ownerEmail = `owner-${runId}@example.test`;
  secondOwnerEmail = `second-owner-${runId}@example.test`;
  outsiderEmail = `outsider-${runId}@example.test`;
  ownerUser = (await createUserWithEmailAndPassword(auth, ownerEmail, TEST_PASSWORD)).user;
  ownerUid = ownerUser.uid;
  await signOut(auth);
  secondOwnerUser = (await createUserWithEmailAndPassword(auth, secondOwnerEmail, TEST_PASSWORD)).user;
  secondOwnerUid = secondOwnerUser.uid;
  await signOut(auth);
  outsiderUser = (await createUserWithEmailAndPassword(auth, outsiderEmail, TEST_PASSWORD)).user;
  await signOut(auth);

  const rulesSource = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
  const rules = rulesSource
    .replaceAll(PRIMARY_OWNER_UID, ownerUid)
    .replaceAll(SECONDARY_OWNER_UID, secondOwnerUid);
  testEnvironment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { rules }
  });
});

beforeEach(async () => {
  await testEnvironment.clearFirestore();
});

after(async () => {
  await testEnvironment?.cleanup();
  try {
    if (auth?.currentUser) await signOut(auth);
  } catch (error) {
    console.warn('Emulator user cleanup did not complete:', error?.code || error?.message);
  }
  if (app) await deleteApp(app);
});

test('both configured owners can read workspace collections while outsiders cannot', async () => {
  const now = Math.floor(Date.now() / 1000);
  const owner = testContext(ownerUid, now);
  const secondOwner = testContext(secondOwnerUid, now);
  const outsider = testContext('unrelated-user', now);
  const unauthenticated = testEnvironment.unauthenticatedContext().firestore();

  await testEnvironment.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), 'employees', 'seed'), { name: 'Seed', wage: 1 });
  });
  await assertSucceeds(getDoc(doc(owner, 'employees', 'seed')));
  await assertSucceeds(getDocs(collection(owner, 'employees')));
  await assertSucceeds(getDoc(doc(secondOwner, 'employees', 'seed')));
  await assertSucceeds(getDocs(collection(secondOwner, 'employees')));
  await assertFails(getDoc(doc(outsider, 'employees', 'seed')));
  await assertFails(getDocs(collection(outsider, 'employees')));
  await assertFails(getDoc(doc(unauthenticated, 'employees', 'seed')));
});

test('fresh owner authentication can write every protected workspace collection', async () => {
  const now = Math.floor(Date.now() / 1000);
  for (const uid of [ownerUid, secondOwnerUid]) {
    const owner = testContext(uid, now);
    for (const collectionName of ['employees', 'customers', 'payments', 'invoices', 'ledgerRows', 'planned']) {
      await assertSucceeds(setDoc(doc(owner, collectionName, `fresh-${collectionName}-${uid}`), { marker: true }));
    }
    await assertFails(setDoc(doc(owner, 'unlistedCollection', `blocked-${uid}`), { marker: true }));
  }
});

test('stale owner authentication and non-owner direct writes are denied', async () => {
  const staleOwner = testContext(ownerUid, Math.floor(Date.now() / 1000) - 600);
  const freshOutsider = testContext('unrelated-user', Math.floor(Date.now() / 1000));
  await assertFails(setDoc(doc(staleOwner, 'employees', 'stale-create'), { name: 'Blocked', wage: 1 }));
  await assertFails(setDoc(doc(freshOutsider, 'employees', 'other-create'), { name: 'Blocked', wage: 1 }));

  await testEnvironment.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), 'customers', 'existing'), { name: 'Existing' });
  });
  await assertFails(updateDoc(doc(staleOwner, 'customers', 'existing'), { name: 'Changed' }));
  await assertFails(deleteDoc(doc(staleOwner, 'customers', 'existing')));
});

test('routine clock-in, active break updates, and clock-out work without recent auth', async () => {
  const staleOwner = testContext(ownerUid, Math.floor(Date.now() / 1000) - 600);
  const staleOutsider = testContext('unrelated-user', Math.floor(Date.now() / 1000) - 600);
  const shiftRef = doc(staleOwner, 'shifts', 'routine-start');
  await assertSucceeds(setDoc(shiftRef, activeShift()));
  await assertFails(setDoc(doc(staleOutsider, 'shifts', 'outsider-clock-in'), activeShift()));
  await assertSucceeds(updateDoc(shiftRef, {
    breaks: [{ start: new Date().toISOString(), end: null }]
  }));
  await assertSucceeds(updateDoc(shiftRef, {
    breaks: [{ start: new Date(Date.now() - 5 * 60_000).toISOString(), end: new Date().toISOString() }]
  }));
  await assertSucceeds(updateDoc(shiftRef, { clockOutTime: new Date().toISOString() }));
});

test('routine shift exception cannot edit historical or unrelated shift fields', async () => {
  const staleOwner = testContext(ownerUid, Math.floor(Date.now() / 1000) - 600);
  const activeRef = doc(staleOwner, 'shifts', 'active-protected-fields');
  await assertSucceeds(setDoc(activeRef, activeShift()));
  await assertFails(updateDoc(activeRef, { note: 'This requires recent authentication.' }));
  await assertFails(updateDoc(activeRef, { isPaid: true }));

  const historicalRef = doc(staleOwner, 'shifts', 'historical');
  await testEnvironment.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), 'shifts', 'historical'), activeShift({
      clockOutTime: new Date().toISOString()
    }));
  });
  await assertFails(updateDoc(historicalRef, { breaks: [] }));
  await assertFails(deleteDoc(historicalRef));
});

test('recent authentication is required to create or edit completed shifts', async () => {
  const now = Math.floor(Date.now() / 1000);
  const staleOwner = testContext(ownerUid, now - 600);
  const freshOwner = testContext(ownerUid, now);
  const completed = activeShift({ clockOutTime: new Date().toISOString() });
  await assertFails(setDoc(doc(staleOwner, 'shifts', 'stale-history'), completed));
  await assertSucceeds(setDoc(doc(freshOwner, 'shifts', 'fresh-history'), completed));
  await assertFails(updateDoc(doc(staleOwner, 'shifts', 'fresh-history'), { note: 'blocked' }));
  await assertSucceeds(updateDoc(doc(freshOwner, 'shifts', 'fresh-history'), { note: 'allowed' }));
  await assertSucceeds(deleteDoc(doc(freshOwner, 'shifts', 'fresh-history')));
});

test('email/password sign-in and reauthentication refresh auth_time; app source has no signup flow', async () => {
  const appSource = await readFile(new URL('../scripts/firebase.js', import.meta.url), 'utf8');
  const htmlSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(appSource, /createUserWithEmailAndPassword/);
  assert.doesNotMatch(htmlSource, /sign\s*up|create\s+account/i);
  assert.match(appSource, /signInWithEmailAndPassword/);

  const signedIn = (await signInWithEmailAndPassword(auth, ownerEmail, TEST_PASSWORD)).user;
  const authTimeBefore = Number((await getIdTokenResult(signedIn, true)).claims.auth_time);
  assert.ok(Number.isFinite(authTimeBefore));
  await new Promise(resolve => setTimeout(resolve, 1100));
  await reauthenticateWithCredential(
    signedIn,
    EmailAuthProvider.credential(ownerEmail, TEST_PASSWORD)
  );
  const authTimeAfter = Number((await getIdTokenResult(signedIn, true)).claims.auth_time);
  assert.ok(authTimeAfter > authTimeBefore, 'reauthentication should refresh the auth_time claim');

  await assertSucceeds(setDoc(doc(firestore, 'employees', 'auth-emulator-write'), {
    name: 'Emulator owner',
    wage: 10
  }));

  await signOut(auth);
  const outsider = (await signInWithEmailAndPassword(auth, outsiderEmail, TEST_PASSWORD)).user;
  assert.notEqual(outsider.uid, ownerUid);
  await assertFails(getDocs(collection(firestore, 'employees')));
  await assertFails(setDoc(doc(firestore, 'employees', 'outsider-write'), { name: 'Blocked' }));
});
