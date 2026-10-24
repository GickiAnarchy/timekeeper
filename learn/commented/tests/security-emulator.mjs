// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { readFile } from 'node:fs/promises';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test, { after, before, beforeEach } from 'node:test';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import {
// Original L5: Imports collection from the shared module; collection is the name used in this file.
  collection,
// Original L6: Imports deleteDoc from the shared module; deleteDoc is the name used in this file.
  deleteDoc,
// Original L7: Imports doc from the shared module; doc is the name used in this file.
  doc,
// Original L8: Imports getDoc from the shared module; getDoc is the name used in this file.
  getDoc,
// Original L9: Imports getDocs from the shared module; getDocs is the name used in this file.
  getDocs,
// Original L10: Imports setDoc from the shared module; setDoc is the name used in this file.
  setDoc,
// Original L11: Imports updateDoc from the shared module; updateDoc is the name used in this file.
  updateDoc
// Original L12: Completes the named import list and tells the browser to resolve these shared helpers from @firebase/firestore. Imported bindings refer to exports of that module.
} from '@firebase/firestore';
// Original L13: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import {
// Original L14: Imports assertSucceeds from the shared module; assertSucceeds is the name used in this file.
  assertSucceeds,
// Original L15: Imports initializeTestEnvironment from the shared module; initializeTestEnvironment is the name used in this file.
  initializeTestEnvironment
// Original L16: Completes the named import list and tells the browser to resolve these shared helpers from @firebase/rules-unit-testing. Imported bindings refer to exports of that module.
} from '@firebase/rules-unit-testing';
// Original L17: Blank line separates related setup or assertions for readability.

// Original L18: Initializes PROJECT_ID for 'test setup', supplying the value that the following test logic will inspect or mutate.
const PROJECT_ID = 'demo-timekeeper';
// Original L19: Initializes firestoreHost for 'test setup', supplying the value that the following test logic will inspect or mutate.
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
// Original L20: Initializes [firestoreHostname, for 'test setup', supplying the value that the following test logic will inspect or mutate.
const [firestoreHostname, firestorePortText] = firestoreHost.split(':');
// Original L21: Initializes environment; for 'test setup', supplying the value that the following test logic will inspect or mutate.
let environment;
// Original L22: Blank line separates related setup or assertions for readability.

// Original L23: Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.
before(async () => {
// Original L24: Initializes rules for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
// Original L25: Sets `environment` (environment) to waits for calls `initializeTestEnvironment` with an object with fields projectId: `PROJECT_ID` (project id); firestore: an object with fields host: `firestoreHostname` (firestore hostname); port: `Number(firestorePortText)`; rules: `rules` (rules) to finish before continuing; rejection throws into surrounding error handling.
  environment = await initializeTestEnvironment({
// Original L26: Sets the object field projectId using PROJECT_ID. This field is read later through its property name.
    projectId: PROJECT_ID,
// Original L27: Sets the object field rules using rules. This field is read later through its property name.
    firestore: { host: firestoreHostname, port: Number(firestorePortText), rules }
// Original L28: Closes the fixture, callback, loop, or test block for 'test setup'.
  });
// Original L29: Closes the fixture, callback, loop, or test block for 'test setup'.
});
// Original L30: Blank line separates related setup or assertions for readability.

// Original L31: Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.
beforeEach(async () => {
// Original L32: Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.
  await environment.clearFirestore();
// Original L33: Closes the fixture, callback, loop, or test block for 'test setup'.
});
// Original L34: Blank line separates related setup or assertions for readability.

// Original L35: Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.
after(async () => {
// Original L36: Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.
  await environment?.cleanup();
// Original L37: Closes the fixture, callback, loop, or test block for 'test setup'.
});
// Original L38: Blank line separates related setup or assertions for readability.

// Original L39: Starts an isolated test case whose title states the behavior being specified: unauthenticated users can read, create, update, and delete all established app collections.
test('unauthenticated users can read, create, update, and delete all established app collections', async () => {
// Original L40: Initializes anonymous for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.
  const anonymous = environment.unauthenticatedContext().firestore();
// Original L41: Builds collections, the concrete fixture collection/object used as input for 'unauthenticated users can read, create, update, and delete all established app collections'; its fields model the relevant domain records or DOM state.
  const collections = ['employees', 'customers', 'payments', 'invoices', 'ledgerRows', 'ledgerArchives', 'ledgerArchiveRows', 'planned', 'shifts'];
// Original L42: Blank line separates related setup or assertions for readability.

// Original L43: Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.
  await environment.withSecurityRulesDisabled(async context => {
// Original L44: Initializes adminDb for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.
    const adminDb = context.firestore();
// Original L45: Controls iteration/branching in the 'unauthenticated users can read, create, update, and delete all established app collections' test so each relevant fixture or environment condition is exercised.
    for (const collectionName of collections) {
// Original L46: Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.
      await setDoc(doc(adminDb, collectionName, 'existing'), { value: 'seed', nested: { count: 1 } });
// Original L47: Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.
    }
// Original L48: Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.
  });
// Original L49: Blank line separates related setup or assertions for readability.

// Original L50: Controls iteration/branching in the 'unauthenticated users can read, create, update, and delete all established app collections' test so each relevant fixture or environment condition is exercised.
  for (const collectionName of collections) {
// Original L51: Initializes existingRef for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.
    const existingRef = doc(anonymous, collectionName, 'existing');
// Original L52: In the test 'unauthenticated users can read, create, update, and delete all established app collections', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(existingRef))).data().value, 'seed', `${collectionName} should be readable`);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal((await assertSucceeds(getDoc(existingRef))).data().value, 'seed', `${collectionName} should be readable`);
// Original L53: In the test 'unauthenticated users can read, create, update, and delete all established app collections', this truthiness assertion requires the concrete condition to hold: assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1, `${collectionName} should be queryable`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1,
// Original L54: In the test 'unauthenticated users can read, create, update, and delete all established app collections', this truthiness assertion requires the concrete condition to hold: assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1, `${collectionName} should be queryable`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
      `${collectionName} should be queryable`);
// Original L55: Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.
    await assertSucceeds(setDoc(doc(anonymous, collectionName, 'created'), { value: 'anonymous create' }));
// Original L56: Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.
    await assertSucceeds(updateDoc(existingRef, { value: 'anonymous update' }));
// Original L57: Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.
    await assertSucceeds(deleteDoc(doc(anonymous, collectionName, 'created')));
// Original L58: Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.
  }
// Original L59: Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.
});
// Original L60: Blank line separates related setup or assertions for readability.

// Original L61: Starts an isolated test case whose title states the behavior being specified: the recursive public rule covers arbitrary collections and nested subcollections.
test('the recursive public rule covers arbitrary collections and nested subcollections', async () => {
// Original L62: Initializes anonymous for 'the recursive public rule covers arbitrary collections and nested subcollections', supplying the value that the following test logic will inspect or mutate.
  const anonymous = environment.unauthenticatedContext().firestore();
// Original L63: Initializes nestedRef for 'the recursive public rule covers arbitrary collections and nested subcollections', supplying the value that the following test logic will inspect or mutate.
  const nestedRef = doc(anonymous, 'unlistedCollection', 'parent', 'childCollection', 'nested-document');
// Original L64: Blank line separates related setup or assertions for readability.

// Original L65: Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(setDoc(nestedRef, { value: 'public nested data' }));
// Original L66: In the test 'the recursive public rule covers arbitrary collections and nested subcollections', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');
// Original L67: Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(updateDoc(nestedRef, { value: 'updated by anyone' }));
// Original L68: Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(deleteDoc(nestedRef));
// Original L69: Closes the fixture, callback, loop, or test block for 'the recursive public rule covers arbitrary collections and nested subcollections'.
});
// Original L70: Blank line separates related setup or assertions for readability.

// Original L71: Starts an isolated test case whose title states the behavior being specified: an unrelated authenticated user has the same unrestricted access.
test('an unrelated authenticated user has the same unrestricted access', async () => {
// Original L72: Initializes unrelatedUser for 'an unrelated authenticated user has the same unrestricted access', supplying the value that the following test logic will inspect or mutate.
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
// Original L73: Initializes reference for 'an unrelated authenticated user has the same unrestricted access', supplying the value that the following test logic will inspect or mutate.
  const reference = doc(unrelatedUser, 'employees', 'public-to-everyone');
// Original L74: Blank line separates related setup or assertions for readability.

// Original L75: Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(setDoc(reference, { name: 'Shared record', wage: 99 }));
// Original L76: In the test 'an unrelated authenticated user has the same unrestricted access', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);
// Original L77: Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(updateDoc(reference, { wage: 100 }));
// Original L78: Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.
  await assertSucceeds(deleteDoc(reference));
// Original L79: Closes the fixture, callback, loop, or test block for 'an unrelated authenticated user has the same unrestricted access'.
});
