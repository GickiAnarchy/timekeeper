import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import assert from 'node:assert/strict';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing';

const ownerUid = 'N9fh9kr98neSYBSNdyDHBZn9IGv1';
const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
const emulatorIsRunning = Boolean(process.env.FIRESTORE_EMULATOR_HOST);

// Keep this suite discoverable by the ordinary test command, but require an
// actual emulator for Firestore assertions; the dedicated npm target starts it.
test('Firestore rules allow public reads, restrict ledger and daily quote writes to the owner, and keep shifts public', {
  skip: !emulatorIsRunning
}, async () => {
  const environment = await initializeTestEnvironment({
    projectId: 'demo-timekeeper',
    firestore: { rules }
  });

  try {
    const protectedDocuments = [
      { label: 'ledgerRows', path: ['ledgerRows', 'row-1'] },
      { label: 'ledgerArchives', path: ['ledgerArchives', 'archive-1'] },
      { label: 'ledgerArchiveRows', path: ['ledgerArchiveRows', 'archive-row-1'] },
      { label: 'appSettings/dailyQuotes', path: ['appSettings', 'dailyQuotes'] }
    ];

    // Seed public records without letting the rules under test influence setup.
    await environment.withSecurityRulesDisabled(async context => {
      const firestore = context.firestore();
      for (const { path } of protectedDocuments) {
        await setDoc(doc(firestore, ...path), { seededForTest: true });
      }
      await setDoc(doc(firestore, 'shifts', 'saved-shift'), { seededForTest: true });
    });

    const anonymousDb = environment.unauthenticatedContext().firestore();
    const otherUserDb = environment.authenticatedContext('not-the-owner').firestore();
    const ownerDb = environment.authenticatedContext(ownerUid).firestore();

    // Public reads stay available, but neither anonymous nor other signed-in
    // users may write to protected ledger collections or the daily quote list.
    for (const { label, path } of protectedDocuments) {
      const anonymousRef = doc(anonymousDb, ...path);
      const otherUserRef = doc(otherUserDb, ...path);
      const ownerRef = doc(ownerDb, ...path);
      const anonymousSnapshot = await assertSucceeds(getDoc(anonymousRef));
      const otherUserSnapshot = await assertSucceeds(getDoc(otherUserRef));
      assert.equal(anonymousSnapshot.exists(), true, `${label} should be publicly readable`);
      assert.equal(otherUserSnapshot.exists(), true, `${label} should be readable to signed-in users`);
      await assertFails(setDoc(anonymousRef, { writtenBy: 'anonymous' }));
      await assertFails(setDoc(otherUserRef, { writtenBy: 'other-user' }));
      await assertSucceeds(setDoc(ownerRef, { writtenBy: 'owner' }));
    }

    // The /shifts exception is intentional: clock-in/out must remain usable
    // without an owner session, including both reads and writes.
    await assertSucceeds(getDoc(doc(anonymousDb, 'shifts', 'saved-shift')));
    await assertSucceeds(setDoc(doc(anonymousDb, 'shifts', 'anonymous-shift'), { createdBy: 'anonymous' }));
    await assertSucceeds(getDoc(doc(otherUserDb, 'shifts', 'anonymous-shift')));
    await assertSucceeds(setDoc(doc(otherUserDb, 'shifts', 'anonymous-shift'), { updatedBy: 'other-user' }));
  } finally {
    await environment.cleanup();
  }
});
