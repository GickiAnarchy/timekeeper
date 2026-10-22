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
  updateDoc
} from '@firebase/firestore';
import {
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing';

const PROJECT_ID = 'demo-timekeeper';
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

test('unauthenticated users can read, create, update, and delete all established app collections', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const collections = ['employees', 'customers', 'payments', 'invoices', 'ledgerRows', 'ledgerArchives', 'ledgerArchiveRows', 'planned', 'shifts'];

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

test('the recursive public rule covers arbitrary collections and nested subcollections', async () => {
  const anonymous = environment.unauthenticatedContext().firestore();
  const nestedRef = doc(anonymous, 'unlistedCollection', 'parent', 'childCollection', 'nested-document');

  await assertSucceeds(setDoc(nestedRef, { value: 'public nested data' }));
  assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');
  await assertSucceeds(updateDoc(nestedRef, { value: 'updated by anyone' }));
  await assertSucceeds(deleteDoc(nestedRef));
});

test('an unrelated authenticated user has the same unrestricted access', async () => {
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
  const reference = doc(unrelatedUser, 'employees', 'public-to-everyone');

  await assertSucceeds(setDoc(reference, { name: 'Shared record', wage: 99 }));
  assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);
  await assertSucceeds(updateDoc(reference, { wage: 100 }));
  await assertSucceeds(deleteDoc(reference));
});
