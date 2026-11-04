import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before, beforeEach } from 'node:test';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch
} from '@firebase/firestore';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing';

const PROJECT_ID = 'demo-timekeeper';
const APPROVED_OWNER_UID = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
const [firestoreHostname, firestorePortText] = firestoreHost.split(':');
let environment;

before(async () => {
  const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
  environment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { host: firestoreHostname, port: Number(firestorePortText), rules }
  });
});

beforeEach(async () => {
  await environment.clearFirestore();
});

after(async () => {
  await environment?.cleanup();
});

test('unauthenticated users retain full access to established non-ledger app collections, including shifts', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const collections = ['employees', 'customers', 'payments', 'invoices', 'planned', 'shifts'];

  await environment.withSecurityRulesDisabled(async context => {
    const adminDb = context.firestore();
    for (const collectionName of collections) {
      await setDoc(doc(adminDb, collectionName, 'existing'), { value: 'seed', nested: { count: 1 } });
    }
  });

  for (const collectionName of collections) {
    const existingRef = doc(anonymous, collectionName, 'existing');
    assert.equal((await assertSucceeds(getDoc(existingRef))).data().value, 'seed', `${collectionName} should be readable`);
    assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1,
      `${collectionName} should be queryable`);
    await assertSucceeds(setDoc(doc(anonymous, collectionName, 'created'), { value: 'anonymous create' }));
    await assertSucceeds(updateDoc(existingRef, { value: 'anonymous update' }));
    await assertSucceeds(deleteDoc(doc(anonymous, collectionName, 'created')));
  }
});

test('the local Auth emulator accepts a synthetic account using the demo project key', async () => {
  const email = `emulator-test-${Date.now()}@example.test`;
  const response = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'local-test-password-123', returnSecureToken: true })
  });
  const result = await response.json();
  assert.equal(response.status, 200, JSON.stringify(result));
  assert.equal(result.email, email);
  assert.ok(result.localId, 'Auth emulator should return a synthetic local user ID');
});

test('the Firestore emulator stores clock-in, clock-out, and shift-history records', async () => {
  const db = environment.unauthenticatedContext().firestore();
  const employee = doc(db, 'employees', 'emulator-flow-employee');
  const customer = doc(db, 'customers', 'emulator-flow-customer');
  const shift = doc(db, 'shifts', 'emulator-flow-shift');
  const clockInTime = '2026-11-04T09:00:00.000Z';
  const clockOutTime = '2026-11-04T10:00:00.000Z';

  await assertSucceeds(setDoc(employee, { name: 'Synthetic Employee', wage: 20 }));
  await assertSucceeds(setDoc(customer, { name: 'Synthetic Site', location: 'Local Test' }));
  await assertSucceeds(setDoc(shift, {
    employeeId: employee.id,
    custId: customer.id,
    clockInTime,
    clockOutTime: null,
    note: null,
    isPaid: false,
    breaks: [],
    paidHours: null,
    plannedJobsPrompted: false
  }));

  const active = await assertSucceeds(getDocs(collection(db, 'shifts')));
  assert.ok([...active.docs].some(snapshot => snapshot.id === shift.id && snapshot.data().clockOutTime === null));
  await assertSucceeds(updateDoc(shift, { clockOutTime }));

  const history = await assertSucceeds(getDocs(collection(db, 'shifts')));
  const savedShift = history.docs.find(snapshot => snapshot.id === shift.id)?.data();
  assert.equal(savedShift?.employeeId, employee.id);
  assert.equal(savedShift?.custId, customer.id);
  assert.equal(savedShift?.clockInTime, clockInTime);
  assert.equal(savedShift?.clockOutTime, clockOutTime);
});

test('ledger records and nested documents stay public-read but only the approved owner can write', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
  const owner = environment.authenticatedContext(APPROVED_OWNER_UID).firestore();
  const ledgerCollections = ['ledgerRows', 'ledgerArchives', 'ledgerArchiveRows'];

  await environment.withSecurityRulesDisabled(async context => {
    const adminDb = context.firestore();
    for (const collectionName of ledgerCollections) {
      await setDoc(doc(adminDb, collectionName, 'existing'), { value: 'seed' });
    }
  });

  for (const collectionName of ledgerCollections) {
    const publicRef = doc(anonymous, collectionName, 'existing');
    const unrelatedRef = doc(unrelatedUser, collectionName, 'existing');
    const ownerRef = doc(owner, collectionName, 'existing');

    assert.equal((await assertSucceeds(getDoc(publicRef))).data().value, 'seed', `${collectionName} should be publicly readable`);
    assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1,
      `${collectionName} should be publicly queryable`);
    await assertFails(setDoc(doc(anonymous, collectionName, 'anonymous-created'), { value: 'blocked' }));
    await assertFails(updateDoc(publicRef, { value: 'anonymous-update' }));
    await assertFails(deleteDoc(publicRef));
    await assertFails(setDoc(doc(unrelatedUser, collectionName, 'unrelated-created'), { value: 'blocked' }));
    await assertFails(updateDoc(unrelatedRef, { value: 'unrelated-update' }));
    await assertFails(deleteDoc(unrelatedRef));

    await assertSucceeds(updateDoc(ownerRef, { value: 'owner-update' }));
    const ownerCreatedRef = doc(owner, collectionName, 'owner-created');
    await assertSucceeds(setDoc(ownerCreatedRef, { value: 'owner-create' }));
    await assertSucceeds(updateDoc(ownerCreatedRef, { value: 'owner-updated' }));
    await assertSucceeds(deleteDoc(ownerCreatedRef));
    assert.equal((await assertSucceeds(getDoc(publicRef))).data().value, 'owner-update',
      `${collectionName} owner writes should remain publicly readable`);
  }

  const nestedPublicRef = doc(anonymous, 'ledgerRows', 'existing', 'metadata', 'nested');
  const nestedOwnerRef = doc(owner, 'ledgerRows', 'existing', 'metadata', 'nested');
  await assertFails(setDoc(nestedPublicRef, { value: 'nested write blocked' }));
  await assertSucceeds(setDoc(nestedOwnerRef, { value: 'nested owner write' }));
  assert.equal((await assertSucceeds(getDoc(nestedPublicRef))).data().value, 'nested owner write');
});

test('a backup-style mixed batch cannot partially update public shifts when a ledger write is unauthorized', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  await environment.withSecurityRulesDisabled(async context => {
    const adminDb = context.firestore();
    await setDoc(doc(adminDb, 'shifts', 'work-shift'), { note: 'original' });
    await setDoc(doc(adminDb, 'ledgerRows', 'entry'), { amount: 10 });
  });

  const batch = writeBatch(anonymous);
  batch.update(doc(anonymous, 'shifts', 'work-shift'), { note: 'restore attempt' });
  batch.update(doc(anonymous, 'ledgerRows', 'entry'), { amount: 20 });
  await assertFails(batch.commit());
  assert.equal((await assertSucceeds(getDoc(doc(anonymous, 'shifts', 'work-shift')))).data().note, 'original',
    'the failed atomic batch must not partially restore public shift data');
  assert.equal((await assertSucceeds(getDoc(doc(anonymous, 'ledgerRows', 'entry')))).data().amount, 10);
});

test('the recursive public rule covers arbitrary collections and nested subcollections', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const nestedRef = doc(anonymous, 'unlistedCollection', 'parent', 'childCollection', 'nested-document');

  await assertSucceeds(setDoc(nestedRef, { value: 'public nested data' }));
  assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');
  await assertSucceeds(updateDoc(nestedRef, { value: 'updated by anyone' }));
  await assertSucceeds(deleteDoc(nestedRef));
});

test('an unrelated authenticated user has unrestricted access to non-ledger data', async () => {
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
  const reference = doc(unrelatedUser, 'employees', 'public-to-everyone');

  await assertSucceeds(setDoc(reference, { name: 'Shared record', wage: 99 }));
  assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);
  await assertSucceeds(updateDoc(reference, { wage: 100 }));
  await assertSucceeds(deleteDoc(reference));
});

test('daily quote settings are public-read and writable only by the approved owner UID', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
  const owner = environment.authenticatedContext(APPROVED_OWNER_UID).firestore();
  const anonymousQuoteRef = doc(anonymous, 'appSettings', 'dailyQuotes');
  const unrelatedQuoteRef = doc(unrelatedUser, 'appSettings', 'dailyQuotes');
  const ownerQuoteRef = doc(owner, 'appSettings', 'dailyQuotes');

  await assertSucceeds(getDoc(anonymousQuoteRef));
  await assertFails(setDoc(anonymousQuoteRef, { quotes: [] }));
  await assertFails(setDoc(unrelatedQuoteRef, { quotes: [] }));
  await assertSucceeds(setDoc(ownerQuoteRef, { quotes: ['owner-created'] }));
  assert.deepEqual((await assertSucceeds(getDoc(anonymousQuoteRef))).data().quotes, ['owner-created']);
  await assertFails(updateDoc(unrelatedQuoteRef, { quotes: ['unrelated-update'] }));
  await assertFails(deleteDoc(unrelatedQuoteRef));
  await assertSucceeds(updateDoc(ownerQuoteRef, { quotes: ['owner-updated'] }));
  await assertSucceeds(deleteDoc(ownerQuoteRef));
});

test('other appSettings documents and subcollection documents remain publicly writable', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const siblingSetting = doc(anonymous, 'appSettings', 'otherSetting');
  const nestedSetting = doc(anonymous, 'appSettings', 'dailyQuotes', 'metadata', 'entry');

  await assertSucceeds(setDoc(siblingSetting, { value: 'public sibling' }));
  await assertSucceeds(updateDoc(siblingSetting, { value: 'updated sibling' }));
  await assertSucceeds(deleteDoc(siblingSetting));
  await assertSucceeds(setDoc(nestedSetting, { value: 'public nested document' }));
  await assertSucceeds(updateDoc(nestedSetting, { value: 'updated nested document' }));
  await assertSucceeds(deleteDoc(nestedSetting));
});
