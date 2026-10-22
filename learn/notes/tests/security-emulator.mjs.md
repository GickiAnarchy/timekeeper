# tests/security-emulator.mjs

[Exact copy](../../original/tests/security-emulator.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import assert from 'node:assert/strict';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 2

```text
import { readFile } from 'node:fs/promises';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 3

```text
import test, { after, before, beforeEach } from 'node:test';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
import {
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 5

```text
  collection,
```

Imports collection from the shared module; collection is the name used in this file.

### Line 6

```text
  deleteDoc,
```

Imports deleteDoc from the shared module; deleteDoc is the name used in this file.

### Line 7

```text
  doc,
```

Imports doc from the shared module; doc is the name used in this file.

### Line 8

```text
  getDoc,
```

Imports getDoc from the shared module; getDoc is the name used in this file.

### Line 9

```text
  getDocs,
```

Imports getDocs from the shared module; getDocs is the name used in this file.

### Line 10

```text
  setDoc,
```

Imports setDoc from the shared module; setDoc is the name used in this file.

### Line 11

```text
  updateDoc
```

Imports updateDoc from the shared module; updateDoc is the name used in this file.

### Line 12

```text
} from '@firebase/firestore';
```

Completes the named import list and tells the browser to resolve these shared helpers from @firebase/firestore. Imported bindings refer to exports of that module.

### Line 13

```text
import {
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 14

```text
  assertSucceeds,
```

Imports assertSucceeds from the shared module; assertSucceeds is the name used in this file.

### Line 15

```text
  initializeTestEnvironment
```

Imports initializeTestEnvironment from the shared module; initializeTestEnvironment is the name used in this file.

### Line 16

```text
} from '@firebase/rules-unit-testing';
```

Completes the named import list and tells the browser to resolve these shared helpers from @firebase/rules-unit-testing. Imported bindings refer to exports of that module.

### Line 17

```text

```

Blank line separates related setup or assertions for readability.

### Line 18

```text
const PROJECT_ID = 'demo-timekeeper';
```

Initializes PROJECT_ID for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 19

```text
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
```

Initializes firestoreHost for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 20

```text
const [firestoreHostname, firestorePortText] = firestoreHost.split(':');
```

Initializes [firestoreHostname, for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 21

```text
let environment;
```

Initializes environment; for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 22

```text

```

Blank line separates related setup or assertions for readability.

### Line 23

```text
before(async () => {
```

Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.

### Line 24

```text
  const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
```

Initializes rules for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 25

```text
  environment = await initializeTestEnvironment({
```

Sets `environment` (environment) to waits for calls `initializeTestEnvironment` with an object with fields projectId: `PROJECT_ID` (project id); firestore: an object with fields host: `firestoreHostname` (firestore hostname); port: `Number(firestorePortText)`; rules: `rules` (rules) to finish before continuing; rejection throws into surrounding error handling.

### Line 26

```text
    projectId: PROJECT_ID,
```

Sets the object field projectId using PROJECT_ID. This field is read later through its property name.

### Line 27

```text
    firestore: { host: firestoreHostname, port: Number(firestorePortText), rules }
```

Sets the object field rules using rules. This field is read later through its property name.

### Line 28

```text
  });
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 29

```text
});
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 30

```text

```

Blank line separates related setup or assertions for readability.

### Line 31

```text
beforeEach(async () => {
```

Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.

### Line 32

```text
  await environment.clearFirestore();
```

Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.

### Line 33

```text
});
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 34

```text

```

Blank line separates related setup or assertions for readability.

### Line 35

```text
after(async () => {
```

Sets up or tears down shared test state for 'test setup', ensuring emulator/mocked resources do not leak between cases.

### Line 36

```text
  await environment?.cleanup();
```

Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.

### Line 37

```text
});
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 38

```text

```

Blank line separates related setup or assertions for readability.

### Line 39

```text
test('unauthenticated users can read, create, update, and delete all established app collections', async () => {
```

Starts an isolated test case whose title states the behavior being specified: unauthenticated users can read, create, update, and delete all established app collections.

### Line 40

```text
  const anonymous = environment.unauthenticatedContext().firestore();
```

Initializes anonymous for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.

### Line 41

```text
  const collections = ['employees', 'customers', 'payments', 'invoices', 'ledgerRows', 'ledgerArchives', 'ledgerArchiveRows', 'planned', 'shifts'];
```

Builds collections, the concrete fixture collection/object used as input for 'unauthenticated users can read, create, update, and delete all established app collections'; its fields model the relevant domain records or DOM state.

### Line 42

```text

```

Blank line separates related setup or assertions for readability.

### Line 43

```text
  await environment.withSecurityRulesDisabled(async context => {
```

Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.

### Line 44

```text
    const adminDb = context.firestore();
```

Initializes adminDb for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.

### Line 45

```text
    for (const collectionName of collections) {
```

Controls iteration/branching in the 'unauthenticated users can read, create, update, and delete all established app collections' test so each relevant fixture or environment condition is exercised.

### Line 46

```text
      await setDoc(doc(adminDb, collectionName, 'existing'), { value: 'seed', nested: { count: 1 } });
```

Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.

### Line 47

```text
    }
```

Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.

### Line 48

```text
  });
```

Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.

### Line 49

```text

```

Blank line separates related setup or assertions for readability.

### Line 50

```text
  for (const collectionName of collections) {
```

Controls iteration/branching in the 'unauthenticated users can read, create, update, and delete all established app collections' test so each relevant fixture or environment condition is exercised.

### Line 51

```text
    const existingRef = doc(anonymous, collectionName, 'existing');
```

Initializes existingRef for 'unauthenticated users can read, create, update, and delete all established app collections', supplying the value that the following test logic will inspect or mutate.

### Line 52

```text
    assert.equal((await assertSucceeds(getDoc(existingRef))).data().value, 'seed', `${collectionName} should be readable`);
```

In the test 'unauthenticated users can read, create, update, and delete all established app collections', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(existingRef))).data().value, 'seed', `${collectionName} should be readable`);; the fixture therefore checks the concrete boundary/result contract.

### Line 53

```text
    assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1,
```

In the test 'unauthenticated users can read, create, update, and delete all established app collections', this truthiness assertion requires the concrete condition to hold: assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1, `${collectionName} should be queryable`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 54

```text
      `${collectionName} should be queryable`);
```

In the test 'unauthenticated users can read, create, update, and delete all established app collections', this truthiness assertion requires the concrete condition to hold: assert.ok((await assertSucceeds(getDocs(collection(anonymous, collectionName)))).size >= 1, `${collectionName} should be queryable`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 55

```text
    await assertSucceeds(setDoc(doc(anonymous, collectionName, 'created'), { value: 'anonymous create' }));
```

Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.

### Line 56

```text
    await assertSucceeds(updateDoc(existingRef, { value: 'anonymous update' }));
```

Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.

### Line 57

```text
    await assertSucceeds(deleteDoc(doc(anonymous, collectionName, 'created')));
```

Waits for the asynchronous operation in 'unauthenticated users can read, create, update, and delete all established app collections' to finish before subsequent assertions inspect its effects.

### Line 58

```text
  }
```

Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.

### Line 59

```text
});
```

Closes the fixture, callback, loop, or test block for 'unauthenticated users can read, create, update, and delete all established app collections'.

### Line 60

```text

```

Blank line separates related setup or assertions for readability.

### Line 61

```text
test('the recursive public rule covers arbitrary collections and nested subcollections', async () => {
```

Starts an isolated test case whose title states the behavior being specified: the recursive public rule covers arbitrary collections and nested subcollections.

### Line 62

```text
  const anonymous = environment.unauthenticatedContext().firestore();
```

Initializes anonymous for 'the recursive public rule covers arbitrary collections and nested subcollections', supplying the value that the following test logic will inspect or mutate.

### Line 63

```text
  const nestedRef = doc(anonymous, 'unlistedCollection', 'parent', 'childCollection', 'nested-document');
```

Initializes nestedRef for 'the recursive public rule covers arbitrary collections and nested subcollections', supplying the value that the following test logic will inspect or mutate.

### Line 64

```text

```

Blank line separates related setup or assertions for readability.

### Line 65

```text
  await assertSucceeds(setDoc(nestedRef, { value: 'public nested data' }));
```

Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.

### Line 66

```text
  assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');
```

In the test 'the recursive public rule covers arbitrary collections and nested subcollections', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(nestedRef))).data().value, 'public nested data');; the fixture therefore checks the concrete boundary/result contract.

### Line 67

```text
  await assertSucceeds(updateDoc(nestedRef, { value: 'updated by anyone' }));
```

Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.

### Line 68

```text
  await assertSucceeds(deleteDoc(nestedRef));
```

Waits for the asynchronous operation in 'the recursive public rule covers arbitrary collections and nested subcollections' to finish before subsequent assertions inspect its effects.

### Line 69

```text
});
```

Closes the fixture, callback, loop, or test block for 'the recursive public rule covers arbitrary collections and nested subcollections'.

### Line 70

```text

```

Blank line separates related setup or assertions for readability.

### Line 71

```text
test('an unrelated authenticated user has the same unrestricted access', async () => {
```

Starts an isolated test case whose title states the behavior being specified: an unrelated authenticated user has the same unrestricted access.

### Line 72

```text
  const unrelatedUser = environment.authenticatedContext('not-an-owner').firestore();
```

Initializes unrelatedUser for 'an unrelated authenticated user has the same unrestricted access', supplying the value that the following test logic will inspect or mutate.

### Line 73

```text
  const reference = doc(unrelatedUser, 'employees', 'public-to-everyone');
```

Initializes reference for 'an unrelated authenticated user has the same unrestricted access', supplying the value that the following test logic will inspect or mutate.

### Line 74

```text

```

Blank line separates related setup or assertions for readability.

### Line 75

```text
  await assertSucceeds(setDoc(reference, { name: 'Shared record', wage: 99 }));
```

Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.

### Line 76

```text
  assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);
```

In the test 'an unrelated authenticated user has the same unrestricted access', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal((await assertSucceeds(getDoc(reference))).data().wage, 99);; the fixture therefore checks the concrete boundary/result contract.

### Line 77

```text
  await assertSucceeds(updateDoc(reference, { wage: 100 }));
```

Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.

### Line 78

```text
  await assertSucceeds(deleteDoc(reference));
```

Waits for the asynchronous operation in 'an unrelated authenticated user has the same unrestricted access' to finish before subsequent assertions inspect its effects.

### Line 79

```text
});
```

Closes the fixture, callback, loop, or test block for 'an unrelated authenticated user has the same unrestricted access'.
