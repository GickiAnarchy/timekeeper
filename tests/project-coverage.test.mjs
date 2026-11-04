import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlDirectory = join(projectRoot, 'html');
const embeddedPages = readdirSync(htmlDirectory).filter(file => file.endsWith('.html')).sort();
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');

test('only the core Home, Clock, Shift History, People Data, and Settings pages remain', () => {
  assert.deepEqual(embeddedPages, ['basic-data.html', 'clock.html', 'home.html', 'settings.html', 'viewshifts.html']);
  const shell = readProjectFile('index.html');
  const routes = [...shell.matchAll(/data-page=["']([^"']+)["']/g)].map(match => match[1]);
  assert.deepEqual(routes, ['html/home.html', 'html/clock.html', 'html/viewshifts.html', 'html/settings.html']);
  assert.doesNotMatch(shell, /admin\.js|admin-access-badge|invoice|ledger|planned|pay-period/i);
});

test('each embedded page loads the shared keyboard visibility helper', () => {
  for (const file of embeddedPages) {
    const markup = readProjectFile('html', file);
    assert.match(markup, /<script\b(?=[^>]*\btype=["']module["'])(?=[^>]*\bsrc=["']\.\.\/scripts\/keyboard\.mjs["'])[^>]*>/i, file);
  }
});

test('the shell monitors keyboard focus and viewport changes inside its active iframe', () => {
  const script = readProjectFile('scripts', 'index.js');
  assert.match(script, /mainIframe\?\.contentDocument\?\.activeElement/);
  assert.match(script, /frameDocument\.addEventListener\('focusin'/);
  assert.match(script, /visualViewport\?\.addEventListener\('resize'/);
});

test('People Data stays out of navigation but remains reachable from Settings', () => {
  const shell = readProjectFile('index.html');
  const settings = readProjectFile('html', 'settings.html');
  const people = readProjectFile('html', 'basic-data.html');
  assert.doesNotMatch(shell, /data-page=["']html\/basic-data\.html["']/);
  assert.match(settings, /href="basic-data\.html" target="main-content">Open People Data<\/a>/);
  assert.match(people, /Employees and customers|Add Employee/i);
  assert.doesNotMatch(people, /open Admin Settings/i);
});

test('theme and whole-workspace text-size controls stay together in Settings', () => {
  const settings = readProjectFile('html', 'settings.html');
  const controller = readProjectFile('scripts', 'settings.js');
  const shell = readProjectFile('scripts', 'index.js');
  assert.match(settings, /Appearance and text size/);
  assert.match(settings, /id="theme-select"/);
  assert.match(settings, /name="font-scale" value="1\.5"/);
  assert.match(controller, /timekeeper-settings-update/);
  assert.match(shell, /applyTextScaleToDocument\(frameDocument, safeScale\)/);
});

test('clock-in and clock-out retain multi-employee selection, duplicate-active guard, breaks, and batch saves', () => {
  const markup = readProjectFile('html', 'clock.html');
  const script = readProjectFile('scripts', 'clock.js');
  assert.match(markup, /<select id="emp-select" multiple/);
  assert.match(markup, /id="cust-select"/);
  assert.match(markup, /id="clock-in-button"/);
  assert.match(script, /alreadyClockedIn/);
  assert.match(script, /saveShifts\(shifts\)/);
  assert.match(script, /start-break-btn/);
  assert.match(script, /stop-break-btn/);
  assert.doesNotMatch(script, /planned\.js|promptForCompletedPlannedJobs/);
});

test('shift history retains manual entry, edit, delete, break and notes controls', () => {
  const markup = readProjectFile('html', 'viewshifts.html');
  const script = readProjectFile('scripts', 'shifts.js');
  assert.match(markup, /id="add-button"/);
  assert.match(markup, /id="shift-start"/);
  assert.match(markup, /id="shift-end"/);
  assert.match(markup, /id="add-break-button"/);
  assert.match(markup, /id="note-view"/);
  assert.match(script, /store\.saveShift\(activeShift\)/);
  assert.match(script, /store\.updateShift\(/);
  assert.match(script, /store\.deleteShift\(/);
  assert.match(script, /classList\.add\('paid-border'\)/);
});

test('core store touches only people and shift collections and preserves the existing shift document shape', () => {
  const model = readProjectFile('scripts', 'models.js');
  const readCollections = [...model.matchAll(/collection\(db,\s*['"]([^'"]+)['"]\)/g)].map(match => match[1]);
  assert.deepEqual(readCollections, ['employees', 'customers', 'shifts']);
  for (const field of ['employeeId', 'custId', 'clockInTime', 'clockOutTime', 'isPaid', 'breaks', 'paidHours', 'plannedJobsPrompted']) {
    assert.ok(model.includes(`${field}:`), `expected shift compatibility field ${field}`);
  }
  assert.match(model, /async saveShifts\(shifts\)/);
  assert.match(model, /async updateShift\(/);
  assert.doesNotMatch(model, /archiveAlreadySettledLedgers|loadInvoices|loadPlanned|restoreFullBackup/);
});

test('Firestore rules retain the public shift writes and owner-only ledger/quote exceptions', () => {
  const rules = readProjectFile('firestore.rules');
  assert.match(rules, /allow read: if true;/);
  assert.match(rules, /collection != 'appSettings' &&\s*collection != 'ledgerRows' &&\s*collection != 'ledgerArchives' &&\s*collection != 'ledgerArchiveRows'/);
  assert.match(rules, /match \/\{collection\}\/\{document=\*\*\}/);
  assert.match(rules, /settingsDocument != 'dailyQuotes' \|\| isApprovedOwner\(\)/);
  assert.match(rules, /request\.auth != null && request\.auth\.uid == 'N9fh9kr98neSYBSNdyDHBZn9IGv1'/);
});

test('the rules test command is pinned to the local demo emulator', () => {
  const packageJson = JSON.parse(readProjectFile('package.json'));
  assert.match(packageJson.scripts['test:firebase-emulator'], /demo-timekeeper/);
  assert.match(packageJson.scripts['test:firebase-emulator'], /--only auth,firestore/);
  assert.match(readProjectFile('firebase.json'), /"auth"[\s\S]*"port": 9099/);
  assert.match(readProjectFile('firebase.json'), /"firestore"[\s\S]*"port": 8080/);
  assert.match(readProjectFile('tests', 'security-emulator.mjs'), /PROJECT_ID = 'demo-timekeeper'/);
});

test('the browser Firebase client is demo-only and always connects to local Auth and Firestore emulators', () => {
  const model = readProjectFile('scripts', 'models.js');
  const firebaseConfig = JSON.parse(readProjectFile('firebase.json'));
  assert.match(model, /projectId: 'demo-timekeeper'/);
  assert.match(model, /apiKey: 'demo-key'/);
  assert.match(model, /connectAuthEmulator\(auth, AUTH_EMULATOR_URL/);
  assert.match(model, /connectFirestoreEmulator\(db, FIRESTORE_EMULATOR_HOST, 8080\)/);
  assert.doesNotMatch(model, /timekeeper-ad253|AIza[A-Za-z0-9_-]{20,}/);
  assert.deepEqual(firebaseConfig.emulators.auth, { host: '127.0.0.1', port: 9099 });
  assert.deepEqual(firebaseConfig.emulators.firestore, { host: '127.0.0.1', port: 8080 });
});
