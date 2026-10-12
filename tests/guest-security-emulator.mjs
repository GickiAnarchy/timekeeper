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

const PROJECT_ID = 'demo-timekeeper-guest-proposal';
const OWNER_UIDS = [
  'N9fh9kr98neSYBSNdyDHBZn9IGv1',
  'S7v71Kjhesf4oWv1qTzsN8zcIZm1'
];
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
const [firestoreHostname, firestorePortText] = firestoreHost.split(':');
let environment;

function ownerContext(authTime = Math.floor(Date.now() / 1000), uid = OWNER_UIDS[0]) {
  return environment.authenticatedContext(uid, { auth_time: authTime }).firestore();
}

function guestContext() {
  return environment.unauthenticatedContext().firestore();
}

function activePublicShift(overrides = {}) {
  return {
    employeeId: 'employee-1',
    custId: 'customer-1',
    clockInTime: new Date().toISOString(),
    clockOutTime: null,
    breaks: [],
    ...overrides
  };
}

function pendingRequest(overrides = {}) {
  return {
    kind: 'write',
    status: 'pending',
    submittedAt: new Date().toISOString(),
    requester: 'Shared kiosk',
    operation: 'update',
    collection: 'employees',
    documentId: 'employee-1',
    data: { name: 'Suggested name' },
    ...overrides
  };
}

before(async () => {
  const rules = await readFile(new URL('../proposals/firestore.guest-proposal.rules', import.meta.url), 'utf8');
  environment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { host: firestoreHostname, port: Number(firestorePortText), rules }
  });
});

beforeEach(async () => {
  await environment.clearFirestore();
  await environment.withSecurityRulesDisabled(async context => {
    const db = context.firestore();
    await setDoc(doc(db, 'publicEmployees', 'employee-1'), { name: 'Riley' });
    await setDoc(doc(db, 'publicCustomers', 'customer-1'), { name: 'Oak Park Client', location: 'Oak Park' });
    await setDoc(doc(db, 'employees', 'employee-1'), { name: 'Riley', wage: 35 });
    await setDoc(doc(db, 'customers', 'customer-1'), { name: 'Oak Park Client', location: '123 Main St', note: 'private', billingRate: 95 });
    await setDoc(doc(db, 'shifts', 'private-shift'), {
      employeeId: 'employee-1', custId: 'customer-1', clockInTime: new Date().toISOString(),
      clockOutTime: null, note: 'private shift note', isPaid: false, breaks: [], paidHours: null
    });
  });
});

after(async () => {
  await environment?.cleanup();
});

test('guests can read only sanitized projections, never canonical employees, customers, or shifts', async () => {
  const guest = guestContext();
  assert.equal((await assertSucceeds(getDoc(doc(guest, 'publicEmployees', 'employee-1')))).data().name, 'Riley');
  assert.equal((await assertSucceeds(getDoc(doc(guest, 'publicCustomers', 'customer-1')))).data().location, 'Oak Park');
  await assertFails(getDoc(doc(guest, 'employees', 'employee-1')));
  await assertFails(getDocs(collection(guest, 'customers')));
  await assertFails(getDoc(doc(guest, 'shifts', 'private-shift')));
  await assertFails(getDocs(collection(guest, 'changeRequests')));
});

test('guests can clock in/out through safe public shifts but cannot change private or unrelated fields', async () => {
  const guest = guestContext();
  const shiftRef = doc(guest, 'publicShifts', 'kiosk-shift');
  await assertSucceeds(setDoc(shiftRef, activePublicShift()));
  await assertSucceeds(updateDoc(shiftRef, { clockOutTime: new Date().toISOString() }));
  await assertFails(updateDoc(shiftRef, { paidHours: 8 }));
  await assertFails(updateDoc(shiftRef, { breaks: [{ start: new Date().toISOString(), end: null }] }));
  await assertFails(deleteDoc(shiftRef));
  await assertFails(setDoc(doc(guest, 'shifts', 'direct-private-write'), {
    employeeId: 'employee-1', custId: 'customer-1', clockInTime: new Date().toISOString()
  }));
});

test('guest clock-ins must reference published people and start active with no extra fields', async () => {
  const guest = guestContext();
  await assertFails(setDoc(doc(guest, 'publicShifts', 'unknown-person'), activePublicShift({ employeeId: 'missing' })));
  await assertFails(setDoc(doc(guest, 'publicShifts', 'completed'), activePublicShift({ clockOutTime: new Date().toISOString() })));
  await assertFails(setDoc(doc(guest, 'publicShifts', 'sensitive'), activePublicShift({ note: 'must not persist' })));
});

test('guest-created change requests are inert and readable/resolvable only by a recent-auth owner', async () => {
  const guest = guestContext();
  const requestRef = doc(guest, 'changeRequests', 'request-1');
  await assertSucceeds(setDoc(requestRef, pendingRequest()));
  await assertFails(getDoc(requestRef));
  await assertFails(updateDoc(requestRef, { status: 'approved', reviewedAt: new Date().toISOString(), reviewerNote: '' }));
  await assertFails(setDoc(doc(guest, 'changeRequests', 'self-approved'), pendingRequest({ status: 'approved' })));
  await assertFails(updateDoc(doc(guest, 'employees', 'employee-1'), { name: 'No direct change' }));

  const staleOwner = ownerContext(Math.floor(Date.now() / 1000) - 600);
  const freshOwner = ownerContext();
  const freshSecondOwner = ownerContext(undefined, OWNER_UIDS[1]);
  assert.equal((await assertSucceeds(getDoc(doc(freshOwner, 'changeRequests', 'request-1')))).data().status, 'pending');
  assert.equal((await assertSucceeds(getDoc(doc(freshSecondOwner, 'changeRequests', 'request-1')))).data().status, 'pending');
  await assertFails(updateDoc(doc(staleOwner, 'changeRequests', 'request-1'), {
    status: 'approved', reviewedAt: new Date().toISOString(), reviewerNote: ''
  }));

  const batch = writeBatch(freshOwner);
  batch.update(doc(freshOwner, 'employees', 'employee-1'), { name: 'Suggested name' });
  batch.update(doc(freshOwner, 'changeRequests', 'request-1'), {
    status: 'approved', reviewedAt: new Date().toISOString(), reviewerNote: ''
  });
  await assertSucceeds(batch.commit());
  assert.equal((await getDoc(doc(freshOwner, 'employees', 'employee-1'))).data().name, 'Suggested name');
});

test('only owners can publish safe directory projections; numbered street addresses are rejected', async () => {
  const guest = guestContext();
  const owner = ownerContext();
  const secondOwner = ownerContext(undefined, OWNER_UIDS[1]);
  await assertFails(setDoc(doc(guest, 'publicEmployees', 'guest-created'), { name: 'Guest' }));
  await assertFails(setDoc(doc(owner, 'publicCustomers', 'unsafe-address'), { name: 'Client', location: '123 Main Street' }));
  await assertSucceeds(setDoc(doc(owner, 'publicCustomers', 'safe-location'), { name: 'Client', location: 'Oak Park' }));
  await assertSucceeds(setDoc(doc(secondOwner, 'publicEmployees', 'second-owner-created'), { name: 'Second Owner' }));
});
