// Original L1: Imports timekeeper domain helpers so this model layer can reuse shift-hour calculation, invoice linkage checks, quarter-hour rounding, ledger-row construction, and cent-accurate balance logic.
import {
// Original L2: Uses the actualShiftHours, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  actualShiftHours,
// Original L3: Uses the invoiceShiftIds, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  invoiceShiftIds,
// Original L4: Uses the roundDown15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  roundDown15Minutes,
// Original L5: Uses the roundTo15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  roundTo15Minutes,
// Original L6: Uses the roundUp15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  roundUp15Minutes,
// Original L7: Uses the shiftIsAttachedElsewhere, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  shiftIsAttachedElsewhere,
// Original L8: Uses the makeShiftLedgerEntryData, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  makeShiftLedgerEntryData,
// Original L9: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
  ledgerBalanceCents
// Original L10: Ends the domain-helper import; all helpers above come from the application domain module.
} from './domain.mjs';
// Original L11: Blank line separates related statements for readability.

// Original L12: Comment delimiter marks documentation for the surrounding implementation.
// Original L13: Labels the Firebase connection section; the following imports and configuration establish this app’s Firestore client.
// Original L14: Comment delimiter marks documentation for the surrounding implementation.
/*
  Firebase Setup
*/
// Original L15: Blank line separates related statements for readability.

// Original L16: This comment identifies the following implementation area: 1. Import Firebase & Firestore Modular SDKs (CDN Links).
// 1. Import Firebase & Firestore Modular SDKs (CDN Links)
// Original L17: Loads Firebase App initialization from the pinned browser CDN module.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// Original L18: Imports the named dependency so this module can use the referenced API or domain behavior.
import {
// Original L19: Imports Firestore factory and collection/document read-write primitives from Firebase’s modular browser SDK.
  getFirestore,
// Original L20: Uses the collection, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  collection,
// Original L21: Uses the setDoc as firestoreSetDoc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  setDoc as firestoreSetDoc,
// Original L22: Uses the getDocs as firestoreGetDocs, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  getDocs as firestoreGetDocs,
// Original L23: Uses the doc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  doc,
// Original L24: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
  updateDoc as firestoreUpdateDoc,
// Original L25: Uses the deleteDoc as firestoreDeleteDoc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  deleteDoc as firestoreDeleteDoc,
// Original L26: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
  writeBatch
// Original L27: Ends the Firestore SDK import; aliases below distinguish wrapped operations from raw SDK functions.
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// Original L28: Blank line separates related statements for readability.

// Original L29: This comment identifies the following implementation area: 2. Your web app's Firebase configuration.
// 2. Your web app's Firebase configuration
// Original L30: Defines the Firebase project settings used to connect this browser app to its timekeeper backend.
const firebaseConfig = {
// Original L31: Supplies the Firebase web API key identifying this app configuration to Firebase (not employee data).
  apiKey: "AIzaSyDn_y846YGhK689a3-2S6VvO46uElD1JXw",
// Original L32: Names the Firebase Auth/hosting domain associated with the timekeeper project.
  authDomain: "timekeeper-ad253.firebaseapp.com",
// Original L33: Selects the Firestore project whose collections store employees, shifts, invoices, and other records.
  projectId: "timekeeper-ad253",
// Original L34: Identifies the project storage bucket, although this model file primarily uses Firestore.
  storageBucket: "timekeeper-ad253.firebasestorage.app",
// Original L35: Identifies the Firebase messaging sender for the web app configuration.
  messagingSenderId: "516577372091",
// Original L36: Identifies this particular web app instance within the Firebase project.
  appId: "1:516577372091:web:3bb56f8017058ffcd9869e"
// Original L37: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
};
// Original L38: Blank line separates related statements for readability.

// Original L39: This comment identifies the following implementation area: 3. Initialize Firebase & Firestore.
// 3. Initialize Firebase & Firestore
// Original L40: Initializes the Firebase client using the project configuration, producing the app handle.
const app = initializeApp(firebaseConfig);
// Original L41: Creates the Firestore database client used by every persistence method below.
const db = getFirestore(app);
// Original L42: Blank line separates related statements for readability.

// Original L43: Declares the showFirestoreError operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
function showFirestoreError(message, retryOperation) {
// Original L44: Avoids touching the DOM when running without a document body, such as a non-browser test or early startup.
  if (!globalThis.document?.body) return;
// Original L45: Looks up the single persistent Firestore error banner so repeated failures can reuse it.
  let banner = document.getElementById('firestore-error-banner');
// Original L46: Creates the banner only on its first error instead of duplicating alerts.
  if (!banner) {
// Original L47: Invokes banner = document.createElement for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    banner = document.createElement('section');
// Original L48: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
    banner.id = 'firestore-error-banner';
// Original L49: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
    banner.setAttribute('role', 'alert');
// Original L50: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
    banner.setAttribute('aria-live', 'assertive');
// Original L51: Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.
    Object.assign(banner.style, {
// Original L52: Sets the error banner’s CSS position to 'fixed', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      position: 'fixed',
// Original L53: Sets the error banner’s CSS inset to '12px 12px auto', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      inset: '12px 12px auto',
// Original L54: Sets the error banner’s CSS zIndex to '2147483647', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      zIndex: '2147483647',
// Original L55: Sets the error banner’s CSS display to 'flex', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      display: 'flex',
// Original L56: Sets the error banner’s CSS alignItems to 'center', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      alignItems: 'center',
// Original L57: Sets the error banner’s CSS justifyContent to 'space-between', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      justifyContent: 'space-between',
// Original L58: Sets the error banner’s CSS gap to '12px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      gap: '12px',
// Original L59: Sets the error banner’s CSS padding to '12px 16px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      padding: '12px 16px',
// Original L60: Sets the error banner’s CSS color to '#521b1b', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      color: '#521b1b',
// Original L61: Sets the error banner’s CSS background to '#fff0ee', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      background: '#fff0ee',
// Original L62: Sets the error banner’s CSS border to '1px solid #d98b83', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      border: '1px solid #d98b83',
// Original L63: Sets the error banner’s CSS borderRadius to '10px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      borderRadius: '10px',
// Original L64: Sets the error banner’s CSS boxShadow to '0 8px 24px rgba(0,0,0,.18)', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      boxShadow: '0 8px 24px rgba(0,0,0,.18)',
// Original L65: Sets the error banner’s CSS font to '600 14px/1.4 system-ui, sans-serif', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.
      font: '600 14px/1.4 system-ui, sans-serif'
// Original L66: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L67: Derives text from document.createElement('span'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const text = document.createElement('span');
// Original L68: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
    text.dataset.errorMessage = 'true';
// Original L69: Derives retry from document.createElement('button'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const retry = document.createElement('button');
// Original L70: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
    retry.type = 'button';
// Original L71: Updates visible DOM text/options so the interface reflects the current error or entity selection.
    retry.textContent = 'Retry';
// Original L72: Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.
    Object.assign(retry.style, {
// Original L73: Stores the padding field with '8px 13px'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      padding: '8px 13px',
// Original L74: Stores the color field with '#fff'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      color: '#fff',
// Original L75: Stores the background field with '#8f302b'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      background: '#8f302b',
// Original L76: Stores the border field with '0'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      border: '0',
// Original L77: Stores the borderRadius field with '7px'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      borderRadius: '7px',
// Original L78: Stores the font field with 'inherit'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      font: 'inherit',
// Original L79: Stores the cursor field with 'pointer'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      cursor: 'pointer'
// Original L80: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L81: Makes the Retry button rerun failed Firestore operations asynchronously.
    retry.addEventListener('click', async () => {
// Original L82: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
      retry.disabled = true;
// Original L83: Updates visible DOM text/options so the interface reflects the current error or entity selection.
      retry.textContent = 'Retrying…';
// Original L84: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      try {
// Original L85: Replays each operation collected for this banner; a Set prevents duplicate retry callbacks.
        for (const operation of retry._retryOperations || []) await operation();
// Original L86: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
        banner.remove();
// Original L87: Reloads the page after all retries succeed so in-memory state is freshly read from Firestore.
        globalThis.location?.reload();
// Original L88: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      } catch (error) {
// Original L89: Logs retry failure details for diagnosis without hiding the original error.
        console.error('Firestore retry failed:', error);
// Original L90: Tells the user that at least one Firestore retry failed and that the failed operations can be tried again.
        text.textContent = `A retry did not succeed. Check your connection, then retry the failed Firestore operations again.`;
// Original L91: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
        retry.disabled = false;
// Original L92: Updates visible DOM text/options so the interface reflects the current error or entity selection.
        retry.textContent = 'Retry';
// Original L93: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L94: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L95: Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.
    banner.append(text, retry);
// Original L96: Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.
    document.body.appendChild(banner);
// Original L97: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L98: Derives text from banner.querySelector('[data-error-message]'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const text = banner.querySelector('[data-error-message]');
// Original L99: Derives retry from banner.querySelector('button'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const retry = banner.querySelector('button');
// Original L100: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
  retry._retryOperations ||= new Set();
// Original L101: Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.
  retry._messages ||= new Set();
// Original L102: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
  retry._retryOperations.add(retryOperation);
// Original L103: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
  retry._messages.add(message);
// Original L104: Combines distinct failure messages and tells the user Retry will repeat them and reload on success.
  text.textContent = `${[...retry._messages].join(' ')} Press Retry to repeat the failed operations and reload if they succeed.`;
// Original L105: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L106: Blank line separates related statements for readability.

// Original L107: Declares the firestoreRequest operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
function firestoreRequest(message, operation) {
// Original L108: Runs the supplied asynchronous Firestore operation and enters the error path on rejection.
  return operation().catch(error => {
// Original L109: Logs the operation-specific failure and its Error object for developers.
    console.error(message, error);
// Original L110: Invokes showFirestoreError for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    showFirestoreError(message, operation);
// Original L111: Rethrows after showing the banner so callers can roll back state or report the failed save.
    throw error;
// Original L112: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  });
// Original L113: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L114: Blank line separates related statements for readability.

// Original L115: Replaces raw setDoc with the error/retry wrapper while preserving its original arguments.
const setDoc = (...args) => firestoreRequest('Saving data to Firestore failed.', () => firestoreSetDoc(...args));
// Original L116: Replaces raw getDocs with the error/retry wrapper while preserving its original arguments.
const getDocs = (...args) => firestoreRequest('Loading data from Firestore failed.', () => firestoreGetDocs(...args));
// Original L117: Replaces raw updateDoc with the error/retry wrapper while preserving its original arguments.
const updateDoc = (...args) => firestoreRequest('Updating data in Firestore failed.', () => firestoreUpdateDoc(...args));
// Original L118: Replaces raw deleteDoc with the error/retry wrapper while preserving its original arguments.
const deleteDoc = (...args) => firestoreRequest('Deleting data from Firestore failed.', () => firestoreDeleteDoc(...args));
// Original L119: Derives commitBatch from (batch, message = 'Saving this group of changes to Firestore failed.') =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
const commitBatch = (batch, message = 'Saving this group of changes to Firestore failed.') =>
// Original L120: Commits a prepared batch through the same retry-aware Firestore path and allows a custom message.
  firestoreRequest(message, () => batch.commit());
// Original L121: Blank line separates related statements for readability.

// Original L122: Blank line separates related statements for readability.

// Original L123: Exports quarter-hour rounding helpers for UI code that needs the same time policy as shifts.
export { roundTo15Minutes, roundDown15Minutes, roundUp15Minutes };
// Original L124: Blank line separates related statements for readability.

// Original L125: This comment identifies the following implementation area: Normalizes the name string.
// Normalizes the name string
// Original L126: Normalizes names for case-insensitive duplicate detection by trimming whitespace and lowercasing; empty input becomes empty.
const normalize = (str) => (str ? str.trim().toLowerCase() : '');
// Original L127: Blank line separates related statements for readability.

// Original L128: This comment identifies the following implementation area: Formats the datetime object.
// Formats the datetime object
// Original L129: Exports a local datetime formatter for datetime-local inputs.
export const toLocalISO = (date) => {
// Original L130: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
  if (!date) return '';
// Original L131: Derives off from date.getTimezoneOffset() * 60000; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const off = date.getTimezoneOffset() * 60000;
// Original L132: Compensates for the browser timezone offset before producing an ISO prefix without a timezone suffix, preserving local clock fields.
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
// Original L133: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
};
// Original L134: Blank line separates related statements for readability.

// Original L135: Formats a valid JavaScript Date as a two-digit 24-hour clock value for break comparisons and display.
export function formatTime24(date) {
// Original L136: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
// Original L137: Blank line separates related statements for readability.
  
// Original L138: Derives hours from String(date.getHours()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const hours = String(date.getHours()).padStart(2, '0');
// Original L139: Derives minutes from String(date.getMinutes()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const minutes = String(date.getMinutes()).padStart(2, '0');
// Original L140: Blank line separates related statements for readability.
  
// Original L141: Returns a text template that combines fixed text with computed values `hours` (hours), `minutes` (minutes) to the caller and exits this function.
  return `${hours}:${minutes}`;
// Original L142: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L143: Blank line separates related statements for readability.

// Original L144: Comment delimiter marks documentation for the surrounding implementation.
// Original L145: Uses the DATA MODELS expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
// Original L146: Comment delimiter marks documentation for the surrounding implementation.
/*
  DATA MODELS
*/
// Original L147: Blank line separates related statements for readability.

// Original L148: Defines the Employee entity used for payroll and employee directory records.
export class Employee {
// Original L149: Initializes a Employee entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(id, name, wage = 15) {
// Original L150: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L151: Sets this object’s name (employee/customer display name) from name, keeping in-memory state aligned with the entity’s business meaning.
    this.name = name;
// Original L152: Sets this object’s wage (hourly employee wage used by payroll) from Number(wage), keeping in-memory state aligned with the entity’s business meaning.
    this.wage = Number(wage);
// Original L153: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L154: Blank line separates related statements for readability.
  
// Original L155: Declares the getPay model/store method, exposing this specific timekeeper behavior to its caller.
  getPay(hours) {
// Original L156: Returns converts formats multiplies `this.wage` (the wage property of this) by `hours` (hours) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.
    return Number((this.wage * hours).toFixed(2));
// Original L157: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L158: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L159: Blank line separates related statements for readability.

// Original L160: Defines the Customer/site entity used by shifts, invoices, and planned jobs.
export class Customer {
// Original L161: Initializes a Customer entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(id, name, location, note = null, billingRate = null) {
// Original L162: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L163: Sets this object’s name (employee/customer display name) from name, keeping in-memory state aligned with the entity’s business meaning.
    this.name = name;
// Original L164: Sets this object’s location (customer work-site/location) from location, keeping in-memory state aligned with the entity’s business meaning.
    this.location = location;
// Original L165: Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.
    this.note = note;
// Original L166: Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
// Original L167: Sets this object’s billingRate (non-negative customer hourly billing rate) from Number.isFinite(rate) && rate >= 0 ? rate : null, keeping in-memory state aligned with the entity’s business meaning.
    this.billingRate = Number.isFinite(rate) && rate >= 0 ? rate : null;
// Original L168: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L169: Blank line separates related statements for readability.
  
// Original L170: Uses the customInfo() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  customInfo() {
// Original L171: Derives noteString from this.note ? ` - ${this.note}` : ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const noteString = this.note ? ` - ${this.note}` : '';
// Original L172: Derives locString from this.location ? ` - ${this.location}` : ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const locString = this.location ? ` - ${this.location}` : '';
// Original L173: Returns a text template that combines fixed text with computed values `this.name` (the name property of this), `locString` (loc string) to the caller and exits this function.
    return `${this.name} - ${locString}`;
// Original L174: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L175: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L176: Blank line separates related statements for readability.

// Original L177: Defines a WorkShift entity joining one employee to one customer and tracking clocking, breaks, notes, and pay status.
export class WorkShift {
// Original L178: Initializes a WorkShift entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(employee, customer, id = null, note = null, isPaid = false, breaks = [], paidHours = null) {
// Original L179: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L180: Sets this object’s employee (the employee linked to this shift) from employee, keeping in-memory state aligned with the entity’s business meaning.
    this.employee = employee;
// Original L181: Sets this object’s customer (the customer/site linked to this work) from customer, keeping in-memory state aligned with the entity’s business meaning.
    this.customer = customer;
// Original L182: Sets this object’s clockInTime (shift start timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.
    this.clockInTime = null;
// Original L183: Sets this object’s clockOutTime (shift end timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.
    this.clockOutTime = null;
// Original L184: Sets this object’s breaks (break intervals excluded from worked hours) from breaks, keeping in-memory state aligned with the entity’s business meaning.
    this.breaks = breaks;
// Original L185: Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.
    this.note = note;
// Original L186: Sets this object’s isPaid (whether this shift has already been paid) from isPaid, keeping in-memory state aligned with the entity’s business meaning.
    this.isPaid = isPaid;
// Original L187: Sets this object’s paidHours (optional payroll-hours override) from paidHours === null || paidHours === undefined || paidHours === '' ?, keeping in-memory state aligned with the entity’s business meaning.
    this.paidHours = paidHours === null || paidHours === undefined || paidHours === '' ?
// Original L188: Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.
      null :
// Original L189: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
      Number(paidHours);
// Original L190: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L191: Blank line separates related statements for readability.
  
// Original L192: Declares the startBreak model/store method, exposing this specific timekeeper behavior to its caller.
  startBreak() {
// Original L193: Derives breakIn from roundTo15Minutes(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const breakIn = roundTo15Minutes();
// Original L194: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
    this.breaks.push({ start: breakIn, end: null });
// Original L195: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L196: Blank line separates related statements for readability.
  
// Original L197: Declares the stopBreak model/store method, exposing this specific timekeeper behavior to its caller.
  stopBreak() {
// Original L198: Derives activeBreak from this.breaks.find(b => b.start && !b.end); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const activeBreak = this.breaks.find(b => b.start && !b.end);
// Original L199: Derives endTime from roundTo15Minutes(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const endTime = roundTo15Minutes();
// Original L200: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (activeBreak) {
// Original L201: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (formatTime24(activeBreak.start) === formatTime24(endTime)) {
// Original L202: Sets this object’s breaks (break intervals excluded from worked hours) from this.breaks.filter(b => b !== activeBreak), keeping in-memory state aligned with the entity’s business meaning.
        this.breaks = this.breaks.filter(b => b !== activeBreak);
// Original L203: Uses the } else { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      } else {
// Original L204: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
        activeBreak.end = endTime;
// Original L205: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L206: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L207: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L208: Blank line separates related statements for readability.
  
// Original L209: Reports whether any break lacks an end time, which prevents a shift from being left silently on break.
  get isOnBreak() {
// Original L210: Returns converts returns the first item of `this.breaks` (the breaks property of this) matching a callback taking b that uses negates the truthiness of `b.end` only if `b.start` (the start property of b) is truthy; otherwise keeps the falsy first value, or undefined to true or false according to truthiness to the caller and exits this function.
    return Boolean(this.breaks.find(b => b.start && !b.end));
// Original L211: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L212: Blank line separates related statements for readability.
  
// Original L213: Declares the getTotalBreakTimeMs model/store method, exposing this specific timekeeper behavior to its caller.
  getTotalBreakTimeMs() {
// Original L214: Returns combines the items of `this.breaks` (the breaks property of this) with a callback taking total, b that runs its enclosed statements, starting with 0 to the caller and exits this function.
    return this.breaks.reduce((total, b) => {
// Original L215: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (b.start && b.end) {
// Original L216: Returns adds `total` (total) and subtracts `b.start` (the start property of b) from `b.end` (the end property of b) (or joins them if a value is text) to the caller and exits this function.
        return total + (b.end - b.start);
// Original L217: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L218: Returns `total` (total) to the caller and exits this function.
      return total;
// Original L219: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    }, 0);
// Original L220: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L221: Blank line separates related statements for readability.
  
// Original L222: Declares the startShift model/store method, exposing this specific timekeeper behavior to its caller.
  startShift(clockInTime = roundTo15Minutes()) {
// Original L223: Sets this object’s clockInTime (shift start timestamp) from clockInTime, keeping in-memory state aligned with the entity’s business meaning.
    this.clockInTime = clockInTime;
// Original L224: Sets this object’s clockOutTime (shift end timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.
    this.clockOutTime = null;
// Original L225: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L226: Blank line separates related statements for readability.
  
// Original L227: Declares the stopShift model/store method, exposing this specific timekeeper behavior to its caller.
  stopShift() {
// Original L228: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.clockInTime) return;
// Original L229: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.isOnBreak) {
// Original L230: Invokes this.stopBreak for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.stopBreak();
// Original L231: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L232: Sets this object’s clockOutTime (shift end timestamp) from roundTo15Minutes(), keeping in-memory state aligned with the entity’s business meaning.
    this.clockOutTime = roundTo15Minutes();
// Original L233: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L234: Blank line separates related statements for readability.
  
// Original L235: Declares the addNote model/store method, exposing this specific timekeeper behavior to its caller.
  addNote(newnote) {
// Original L236: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.note) {
// Original L237: Sets this object’s note (human-entered note) from newnote, keeping in-memory state aligned with the entity’s business meaning.
      this.note = newnote;
// Original L238: Uses the } else { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } else {
// Original L239: Sets this object’s note (human-entered note) from `${this.note}\n${newnote}`, keeping in-memory state aligned with the entity’s business meaning.
      this.note = `${this.note}\n${newnote}`;
// Original L240: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L241: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L242: Blank line separates related statements for readability.
  
// Original L243: Defines completion as having both clock-in and clock-out timestamps.
  get isComplete() {
// Original L244: Returns converts uses `this.clockOutTime` (the clock out time property of this) only if `this.clockInTime` (the clock in time property of this) is truthy; otherwise keeps the falsy first value to true or false according to truthiness to the caller and exits this function.
    return Boolean(this.clockInTime && this.clockOutTime);
// Original L245: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L246: Blank line separates related statements for readability.
  
// Original L247: Creates a safe duplicate of a completed shift for another employee, retaining customer, times, breaks, note, and override hours.
  duplicateFor(employee) {
// Original L248: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!employee?.id || employee.id === this.employee?.id) {
// Original L249: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('Choose a different employee for the duplicate shift.');
// Original L250: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L251: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.isComplete || !(this.clockInTime instanceof Date) ||
// Original L252: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        !(this.clockOutTime instanceof Date) || !Number.isFinite(this.clockInTime.getTime()) ||
// Original L253: Uses the !Number.isFinite(this.clockOutTime.getTime()) || this.clockOutTime <= this.clockInTime) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        !Number.isFinite(this.clockOutTime.getTime()) || this.clockOutTime <= this.clockInTime) {
// Original L254: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('Only a completed shift with valid start and end times can be duplicated.');
// Original L255: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L256: Derives breaks from this.breaks.map(item => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const breaks = this.breaks.map(item => ({
// Original L257: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      start: item.start ? new Date(item.start.getTime()) : null,
// Original L258: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      end: item.end ? new Date(item.end.getTime()) : null
// Original L259: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    }));
// Original L260: Derives duplicate from new WorkShift(employee, this.customer, null, this.note, false, breaks, this.paidHours); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const duplicate = new WorkShift(employee, this.customer, null, this.note, false, breaks, this.paidHours);
// Original L261: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
    duplicate.clockInTime = new Date(this.clockInTime.getTime());
// Original L262: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
    duplicate.clockOutTime = new Date(this.clockOutTime.getTime());
// Original L263: Returns `duplicate` (duplicate) to the caller and exits this function.
    return duplicate;
// Original L264: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L265: Blank line separates related statements for readability.

// Original L266: Declares the getHoursWorked model/store method, exposing this specific timekeeper behavior to its caller.
  getHoursWorked() {
// Original L267: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.isComplete) return 0;
// Original L268: Returns calls `actualShiftHours` with `this.clockInTime` (the clock in time property of this); `this.clockOutTime` (the clock out time property of this); `this.breaks` (the breaks property of this) to the caller and exits this function.
    return actualShiftHours(this.clockInTime, this.clockOutTime, this.breaks);
// Original L269: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L270: Blank line separates related statements for readability.
  
// Original L271: Declares the getPaidHours model/store method, exposing this specific timekeeper behavior to its caller.
  getPaidHours() {
// Original L272: Returns checks checks that `this.paidHours` (the paid hours property of this) is a finite number, excluding NaN and infinity; if true chooses `this.paidHours` (the paid hours property of this), otherwise calls `this.getHoursWorked` with no arguments to the caller and exits this function.
    return Number.isFinite(this.paidHours) ? this.paidHours : this.getHoursWorked();
// Original L273: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L274: Blank line separates related statements for readability.
  
// Original L275: Declares the getShiftPay model/store method, exposing this specific timekeeper behavior to its caller.
  getShiftPay() {
// Original L276: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.isPaid) return 0;
// Original L277: Returns checks `this.employee` (the employee property of this); if true chooses calls `this.employee.getPay` with calls `this.getPaidHours` with no arguments, otherwise 0 to the caller and exits this function.
    return this.employee ? this.employee.getPay(this.getPaidHours()) : 0;
// Original L278: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L279: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L280: Blank line separates related statements for readability.

// Original L281: Defines a Payment record representing money already paid to an employee.
export class Payment {
// Original L282: Initializes a Payment entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(employeeId, amount, date = null, note = '', id = null) {
// Original L283: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L284: Sets this object’s employeeId (domain state) from employeeId, keeping in-memory state aligned with the entity’s business meaning.
    this.employeeId = employeeId;
// Original L285: Sets this object’s amount (domain state) from Number(amount), keeping in-memory state aligned with the entity’s business meaning.
    this.amount = Number(amount);
// Original L286: Sets this object’s date (domain state) from date ? new Date(date) : new Date(), keeping in-memory state aligned with the entity’s business meaning.
    this.date = date ? new Date(date) : new Date();
// Original L287: Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.
    this.note = note;
// Original L288: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L289: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L290: Blank line separates related statements for readability.

// Original L291: Declares the todayDateString operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
function todayDateString() {
// Original L292: Derives today from new Date(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const today = new Date();
// Original L293: Derives year from today.getFullYear(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const year = today.getFullYear();
// Original L294: Derives month from String(today.getMonth() + 1).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const month = String(today.getMonth() + 1).padStart(2, '0');
// Original L295: Derives day from String(today.getDate()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const day = String(today.getDate()).padStart(2, '0');
// Original L296: Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.
  return `${year}-${month}-${day}`;
// Original L297: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L298: Blank line separates related statements for readability.

// Original L299: Defines an Invoice containing billable items and optional linked work-shift IDs.
export class Invoice {
// Original L300: Initializes a Invoice entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(cust, items = [], id = null, isPaid = false, date = todayDateString(), shiftIds = []) {
// Original L301: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L302: Sets this object’s customer (the customer/site linked to this work) from cust, keeping in-memory state aligned with the entity’s business meaning.
    this.customer = cust;
// Original L303: Sets this object’s items (domain state) from items, keeping in-memory state aligned with the entity’s business meaning.
    this.items = items;
// Original L304: Sets this object’s isPaid (whether this shift has already been paid) from Boolean(isPaid), keeping in-memory state aligned with the entity’s business meaning.
    this.isPaid = Boolean(isPaid);
// Original L305: Sets this object’s date (domain state) from date || null, keeping in-memory state aligned with the entity’s business meaning.
    this.date = date || null;
// Original L306: Sets this object’s shiftIds (domain state) from Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [], keeping in-memory state aligned with the entity’s business meaning.
    this.shiftIds = Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [];
// Original L307: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L308: Blank line separates related statements for readability.
  
// Original L309: Declares the addItem model/store method, exposing this specific timekeeper behavior to its caller.
  addItem(name, value) {
// Original L310: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
    this.items.push({ name: name, value: Number(value) });
// Original L311: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L312: Blank line separates related statements for readability.
  
// Original L313: Declares the deleteItem model/store method, exposing this specific timekeeper behavior to its caller.
  deleteItem(name, value) {
// Original L314: Derives dItem from this.items.find(i => i.name === name && i.value === value); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const dItem = this.items.find(i => i.name === name && i.value === value);
// Original L315: Sets this object’s items (domain state) from this.items.filter(i => i !== dItem), keeping in-memory state aligned with the entity’s business meaning.
    this.items = this.items.filter(i => i !== dItem);
// Original L316: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L317: Blank line separates related statements for readability.
  
// Original L318: Uses the totalBill() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  totalBill() {
// Original L319: Derives total from this.items.reduce((sum, item) => sum + Number(item.value || 0), 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const total = this.items.reduce((sum, item) => sum + Number(item.value || 0), 0);
// Original L320: Returns converts formats `total` (total) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.
    return Number(total.toFixed(2));
// Original L321: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L322: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L323: Blank line separates related statements for readability.

// Original L324: Defines a Ledger that stores employee earning/payment adjustments and supports settlement archival.
export class Ledger {
// Original L325: Initializes a Ledger entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(initialEntries = []) {
// Original L326: Sets this object’s entries (ledger rows) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.entries = [];
// Original L327: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (Array.isArray(initialEntries) && initialEntries.length > 0) {
// Original L328: Invokes initialEntries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      initialEntries.forEach(data => this.addEntry(data));
// Original L329: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L330: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L331: Blank line separates related statements for readability.
  
// Original L332: Declares the addEntry model/store method, exposing this specific timekeeper behavior to its caller.
  addEntry(data = {}) {
// Original L333: Derives employeeId from data.employeeId || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employeeId = data.employeeId || null;
// Original L334: Derives nextIndex from this.entries.filter(entry => entry.employeeId === employeeId).length + 1; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const nextIndex = this.entries.filter(entry => entry.employeeId === employeeId).length + 1;
// Original L335: Derives entry from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = {
// Original L336: Stores the id field with data.id || crypto.randomUUID(); this object field is part of the Firestore payload or a domain record used by timekeeper.
      id: data.id || crypto.randomUUID(),
// Original L337: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
      index: Number(data.index) > 0 ? Number(data.index) : nextIndex,
// Original L338: Uses the employeeId, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      employeeId,
// Original L339: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      date: data.date ?? null,
// Original L340: Stores the type field with data.type ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      type: data.type ?? null,
// Original L341: Stores the hours field with data.hours ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      hours: data.hours ?? null,
// Original L342: Stores the amount field with data.amount ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      amount: data.amount ?? null,
// Original L343: Stores the notes field with data.notes ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      notes: data.notes ?? null,
// Original L344: Stores the sourceShiftId field with data.sourceShiftId ? String(data.sourceShiftId) : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      sourceShiftId: data.sourceShiftId ? String(data.sourceShiftId) : null
// Original L345: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L346: Blank line separates related statements for readability.
    
// Original L347: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
    this.entries.push(entry);
// Original L348: Returns `entry` (entry) to the caller and exits this function.
    return entry;
// Original L349: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L350: Blank line separates related statements for readability.
  
// Original L351: Declares the updateEntry model/store method, exposing this specific timekeeper behavior to its caller.
  updateEntry(id, updates = {}) {
// Original L352: Derives entry from this.getEntry(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = this.getEntry(id);
// Original L353: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!entry) return null;
// Original L354: Blank line separates related statements for readability.
    
// Original L355: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
    Object.assign(entry, updates);
// Original L356: Returns `entry` (entry) to the caller and exits this function.
    return entry;
// Original L357: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L358: Blank line separates related statements for readability.
  
// Original L359: Declares the deleteEntry model/store method, exposing this specific timekeeper behavior to its caller.
  deleteEntry(id) {
// Original L360: Derives initialLength from this.entries.length; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const initialLength = this.entries.length;
// Original L361: Derives entry from this.getEntry(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = this.getEntry(id);
// Original L362: Sets this object’s entries (ledger rows) from this.entries.filter(entry => entry.id !== id), keeping in-memory state aligned with the entity’s business meaning.
    this.entries = this.entries.filter(entry => entry.id !== id);
// Original L363: Blank line separates related statements for readability.
    
// Original L364: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.entries.length !== initialLength) {
// Original L365: Invokes this.reindex for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.reindex(entry?.employeeId ?? null);
// Original L366: Returns true to the caller and exits this function.
      return true;
// Original L367: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L368: Returns false to the caller and exits this function.
    return false;
// Original L369: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L370: Blank line separates related statements for readability.
  
// Original L371: Declares the getEntry model/store method, exposing this specific timekeeper behavior to its caller.
  getEntry(id) {
// Original L372: Returns uses returns the first item of `this.entries` (the entries property of this) matching a callback taking entry that checks that `entry.id` (the id property of entry) and `id` (id) have the same value and type, or undefined when it is truthy, otherwise falls back to null to the caller and exits this function.
    return this.entries.find(entry => entry.id === id) || null;
// Original L373: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L374: Blank line separates related statements for readability.
  
// Original L375: Uses the reindex(employeeId = undefined) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  reindex(employeeId = undefined) {
// Original L376: Derives entries from employeeId === undefined ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entries = employeeId === undefined ?
// Original L377: Uses the this.entries : expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      this.entries :
// Original L378: Sets this object’s entries.filter(entry (domain state) from > entry.employeeId === employeeId), keeping in-memory state aligned with the entity’s business meaning.
      this.entries.filter(entry => entry.employeeId === employeeId);
// Original L379: Invokes entries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    entries.forEach((entry, i) => { entry.index = i + 1; });
// Original L380: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L381: Blank line separates related statements for readability.
  
// Original L382: Declares the getTotal model/store method, exposing this specific timekeeper behavior to its caller.
  getTotal() {
// Original L383: Returns combines the items of `this.entries` (the entries property of this) with a callback taking total, { type = '', amount = 0 } that runs its enclosed statements, starting with 0 to the caller and exits this function.
    return this.entries.reduce((total, { type = '', amount = 0 }) => {
// Original L384: Derives entryType from type.toLowerCase(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const entryType = type.toLowerCase();
// Original L385: Derives amt from Number(amount) || 0; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const amt = Number(amount) || 0;
// Original L386: Blank line separates related statements for readability.
      
// Original L387: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (entryType === 'normal' || entryType === 'general') return total + amt;
// Original L388: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (entryType === 'advance') return total - amt;
// Original L389: Returns `total` (total) to the caller and exits this function.
      return total;
// Original L390: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    }, 0);
// Original L391: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L392: Blank line separates related statements for readability.
  
// Original L393: Uses the toJSON() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  toJSON() {
// Original L394: Returns `this.entries` (the entries property of this) to the caller and exits this function.
    return this.entries;
// Original L395: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L396: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L397: Blank line separates related statements for readability.

// Original L398: Defines a PlannedJob for future customer work with optional scheduling and completion state.
export class PlannedJob {
// Original L399: Initializes a PlannedJob entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor(description, scheduledDate, customer = null, isComplete = false, id = null) {
// Original L400: Sets this object’s description (domain state) from String(description || '').trim(), keeping in-memory state aligned with the entity’s business meaning.
    this.description = String(description || '').trim();
// Original L401: Derives date from scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const date = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
// Original L402: Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.
      null :
// Original L403: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
// Original L404: Sets this object’s scheduledDate (domain state) from date && !Number.isNaN(date.getTime()) ? date : null, keeping in-memory state aligned with the entity’s business meaning.
    this.scheduledDate = date && !Number.isNaN(date.getTime()) ? date : null;
// Original L405: Sets this object’s customer (the customer/site linked to this work) from customer, keeping in-memory state aligned with the entity’s business meaning.
    this.customer = customer;
// Original L406: Sets this object’s isComplete (domain state) from Boolean(isComplete), keeping in-memory state aligned with the entity’s business meaning.
    this.isComplete = Boolean(isComplete);
// Original L407: Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.
    this.id = id || crypto.randomUUID();
// Original L408: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L409: Blank line separates related statements for readability.
  
// Original L410: Declares the getDate model/store method, exposing this specific timekeeper behavior to its caller.
  getDate() {
// Original L411: Returns `this.scheduledDate` (the scheduled date property of this) to the caller and exits this function.
    return this.scheduledDate;
// Original L412: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L413: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L414: Blank line separates related statements for readability.

// Original L415: Blank line separates related statements for readability.

// Original L416: Comment delimiter marks documentation for the surrounding implementation.
// Original L417: Uses the DATA STORE expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
// Original L418: Comment delimiter marks documentation for the surrounding implementation.
/*
  DATA STORE
*/
// Original L419: Blank line separates related statements for readability.

// Original L420: Defines the in-memory application store that coordinates all entities and Firestore persistence.
export class AppDataStore {
// Original L421: Initializes a AppDataStore entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.
  constructor() {
// Original L422: Sets this object’s employees (domain state) from new Map(), keeping in-memory state aligned with the entity’s business meaning.
    this.employees = new Map();
// Original L423: Sets this object’s customers (domain state) from new Map(), keeping in-memory state aligned with the entity’s business meaning.
    this.customers = new Map();
// Original L424: Sets this object’s payments (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.payments = [];
// Original L425: Sets this object’s shifts (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.shifts = [];
// Original L426: Sets this object’s invoices (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.invoices = [];
// Original L427: Sets this object’s ledger (domain state) from new Ledger(), keeping in-memory state aligned with the entity’s business meaning.
    this.ledger = new Ledger();
// Original L428: Sets this object’s ledgerArchives (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.ledgerArchives = [];
// Original L429: Sets this object’s ledgerArchiveRows (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.ledgerArchiveRows = [];
// Original L430: Sets this object’s pendingLedgerSettlements (domain state) from new Set(), keeping in-memory state aligned with the entity’s business meaning.
    this.pendingLedgerSettlements = new Set();
// Original L431: Sets this object’s recentlyArchivedLedgerIds (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.recentlyArchivedLedgerIds = [];
// Original L432: Sets this object’s plannedJobs (future customer work items) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.plannedJobs = [];
// Original L433: Sets this object’s loadFailures (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.loadFailures = [];
// Original L434: Sets this object’s isAdmin (domain state) from null, keeping in-memory state aligned with the entity’s business meaning.
    this.isAdmin = null;
// Original L435: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L436: Blank line separates related statements for readability.
  
// Original L437: Declares the init operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async init() {
// Original L438: Sets this object’s loadFailures (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.loadFailures = [];
// Original L439: Invokes this.pendingLedgerSettlements.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.pendingLedgerSettlements.clear();
// Original L440: Sets this object’s recentlyArchivedLedgerIds (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.recentlyArchivedLedgerIds = [];
// Original L441: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadEmployees();
// Original L442: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadCustomers();
// Original L443: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadShifts();
// Original L444: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadPayments();
// Original L445: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadInvoices();
// Original L446: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadLedger();
// Original L447: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadLedgerArchives();
// Original L448: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.loadFailures.length) {
// Original L449: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      try {
// Original L450: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
        await this.resumePendingLedgerArchives();
// Original L451: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
        await this.archiveAlreadySettledLedgers();
// Original L452: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      } catch (error) {
// Original L453: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
        console.error('Unable to finish a settled ledger archive:', error);
// Original L454: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.loadFailures.push(error);
// Original L455: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L456: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L457: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadPlanned();
// Original L458: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L459: Blank line separates related statements for readability.
  
// Original L460: This comment identifies the following implementation area: LEDGER --.
  // LEDGER --
// Original L461: Declares the loadLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadLedger() {
// Original L462: Sets this object’s ledger (domain state) from new Ledger(), keeping in-memory state aligned with the entity’s business meaning.
    this.ledger = new Ledger();
// Original L463: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L464: Derives querySnapshot from await getDocs(collection(db, "ledgerRows")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "ledgerRows"));
// Original L465: Derives loadedEntries from []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const loadedEntries = [];
// Original L466: Blank line separates related statements for readability.
      
// Original L467: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L468: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L469: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        loadedEntries.push({ ...data, id: docSnap.id });
// Original L470: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L471: Blank line separates related statements for readability.
      
// Original L472: Invokes loadedEntries.sort for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      loadedEntries.sort((a, b) => (a.index || 0) - (b.index || 0));
// Original L473: Invokes loadedEntries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      loadedEntries.forEach(data => this.ledger.addEntry(data));
// Original L474: Blank line separates related statements for readability.
      
// Original L475: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L476: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading Ledger from Firestore:", e);
// Original L477: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L478: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L479: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L480: Blank line separates related statements for readability.

// Original L481: Declares the loadLedgerArchives operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadLedgerArchives() {
// Original L482: Sets this object’s ledgerArchives (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.ledgerArchives = [];
// Original L483: Sets this object’s ledgerArchiveRows (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.ledgerArchiveRows = [];
// Original L484: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L485: Derives [archivesSnapshot, rowsSnapshot] from await Promise.all([; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const [archivesSnapshot, rowsSnapshot] = await Promise.all([
// Original L486: Declares the getDocs model/store method, exposing this specific timekeeper behavior to its caller.
        getDocs(collection(db, 'ledgerArchives')),
// Original L487: Declares the getDocs model/store method, exposing this specific timekeeper behavior to its caller.
        getDocs(collection(db, 'ledgerArchiveRows'))
// Original L488: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      ]);
// Original L489: Uses the archivesSnapshot.forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      archivesSnapshot.forEach(docSnap => {
// Original L490: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.ledgerArchives.push({ ...docSnap.data(), id: docSnap.id });
// Original L491: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L492: Uses the rowsSnapshot.forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      rowsSnapshot.forEach(docSnap => {
// Original L493: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.ledgerArchiveRows.push({ ...docSnap.data(), id: docSnap.id });
// Original L494: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L495: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L496: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error('Error loading archived ledger history from Firestore:', error);
// Original L497: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(error);
// Original L498: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L499: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L500: Blank line separates related statements for readability.

// Original L501: Declares the writeLedgerArchiveRows operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async writeLedgerArchiveRows(rows) {
// Original L502: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (let offset = 0; offset < rows.length; offset += 500) {
// Original L503: Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const batch = writeBatch(db);
// Original L504: Derives chunk from rows.slice(offset, offset + 500); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const chunk = rows.slice(offset, offset + 500);
// Original L505: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
      chunk.forEach(row => batch.set(doc(db, 'ledgerArchiveRows', row.id), row));
// Original L506: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
      await commitBatch(batch, 'Saving archived ledger history failed.');
// Original L507: Derives savedIds from new Set(chunk.map(row => row.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const savedIds = new Set(chunk.map(row => row.id));
// Original L508: Sets this object’s ledgerArchiveRows (domain state) from [, keeping in-memory state aligned with the entity’s business meaning.
      this.ledgerArchiveRows = [
// Original L509: Selects only records matching the timekeeper condition, excluding unrelated entities from the result.
        ...this.ledgerArchiveRows.filter(row => !savedIds.has(row.id)),
// Original L510: Uses the ...chunk expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        ...chunk
// Original L511: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      ];
// Original L512: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L513: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L514: Blank line separates related statements for readability.

// Original L515: Uses the makeLedgerArchiveRow(archive, entry) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  makeLedgerArchiveRow(archive, entry) {
// Original L516: Returns an object with fields id: a text template that combines fixed text with computed values `archive.id` (the id property of archive), `entry.id` (the id property of entry); archiveId: `archive.id` (the id property of archive); sourceEntryId: `entry.id` (the id property of entry); employeeId: `entry.employeeId` (the employee id property of entry); index: `entry.index` (the index property of entry); date: `entry.date` (the date property of entry); and further fields to the caller and exits this function.
    return {
// Original L517: Stores the id field with `${archive.id}--${entry.id}`; this object field is part of the Firestore payload or a domain record used by timekeeper.
      id: `${archive.id}--${entry.id}`,
// Original L518: Stores the archiveId field with archive.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
      archiveId: archive.id,
// Original L519: Stores the sourceEntryId field with entry.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
      sourceEntryId: entry.id,
// Original L520: Stores the employeeId field with entry.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employeeId: entry.employeeId,
// Original L521: Stores the index field with entry.index; this object field is part of the Firestore payload or a domain record used by timekeeper.
      index: entry.index,
// Original L522: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      date: entry.date,
// Original L523: Stores the type field with entry.type; this object field is part of the Firestore payload or a domain record used by timekeeper.
      type: entry.type,
// Original L524: Stores the hours field with entry.hours; this object field is part of the Firestore payload or a domain record used by timekeeper.
      hours: entry.hours,
// Original L525: Stores the amount field with entry.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.
      amount: entry.amount,
// Original L526: Stores the notes field with entry.notes; this object field is part of the Firestore payload or a domain record used by timekeeper.
      notes: entry.notes,
// Original L527: Stores the sourceShiftId field with entry.sourceShiftId || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      sourceShiftId: entry.sourceShiftId || null
// Original L528: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L529: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L530: Blank line separates related statements for readability.

// Original L531: Declares the completePendingLedgerArchive operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async completePendingLedgerArchive(archive) {
// Original L532: Derives entryIds from (archive.entryIds || []).map(String); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entryIds = (archive.entryIds || []).map(String);
// Original L533: Derives archivedByEntryId from new Map(this.ledgerArchiveRows; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const archivedByEntryId = new Map(this.ledgerArchiveRows
// Original L534: Selects only records matching the timekeeper condition, excluding unrelated entities from the result.
      .filter(row => row.archiveId === archive.id)
// Original L535: Transforms each entity or nested value into the storage/display shape required by this operation.
      .map(row => [String(row.sourceEntryId), row]));
// Original L536: Derives activeById from new Map(this.ledger.entries.map(entry => [String(entry.id), entry])); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const activeById = new Map(this.ledger.entries.map(entry => [String(entry.id), entry]));
// Original L537: Derives rowsToWrite from []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const rowsToWrite = [];
// Original L538: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const entryId of entryIds) {
// Original L539: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (archivedByEntryId.has(entryId)) continue;
// Original L540: Derives activeEntry from activeById.get(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const activeEntry = activeById.get(entryId);
// Original L541: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (!activeEntry) {
// Original L542: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Ledger archive ${archive.id} is missing entry ${entryId}; active data was left unchanged.`);
// Original L543: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L544: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      rowsToWrite.push(this.makeLedgerArchiveRow(archive, activeEntry));
// Original L545: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L546: Blank line separates related statements for readability.

// Original L547: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.writeLedgerArchiveRows(rowsToWrite);
// Original L548: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (let offset = 0; offset < entryIds.length; offset += 500) {
// Original L549: Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const batch = writeBatch(db);
// Original L550: Uses the entryIds.slice(offset, offset + 500).forEach(entryId => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      entryIds.slice(offset, offset + 500).forEach(entryId => {
// Original L551: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
        batch.delete(doc(db, 'ledgerRows', entryId));
// Original L552: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L553: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
      await commitBatch(batch, 'Clearing a settled ledger after archiving failed.');
// Original L554: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L555: Blank line separates related statements for readability.

// Original L556: Derives archivedIds from new Set(entryIds); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const archivedIds = new Set(entryIds);
// Original L557: Sets this object’s ledger.entries (domain state) from this.ledger.entries.filter(entry => !archivedIds.has(String(entry.id))), keeping in-memory state aligned with the entity’s business meaning.
    this.ledger.entries = this.ledger.entries.filter(entry => !archivedIds.has(String(entry.id)));
// Original L558: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
    await updateDoc(doc(db, 'ledgerArchives', archive.id), { status: 'archived' });
// Original L559: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    archive.status = 'archived';
// Original L560: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!this.recentlyArchivedLedgerIds.includes(archive.id)) this.recentlyArchivedLedgerIds.push(archive.id);
// Original L561: Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.pendingLedgerSettlements.delete(String(archive.employeeId));
// Original L562: Returns `archive` (archive) to the caller and exits this function.
    return archive;
// Original L563: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L564: Blank line separates related statements for readability.

// Original L565: Declares the resumePendingLedgerArchives operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async resumePendingLedgerArchives() {
// Original L566: Derives pending from this.ledgerArchives.filter(archive => archive.status === 'pending'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const pending = this.ledgerArchives.filter(archive => archive.status === 'pending');
// Original L567: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const archive of pending) await this.completePendingLedgerArchive(archive);
// Original L568: Returns `pending.length` (the length property of pending) to the caller and exits this function.
    return pending.length;
// Original L569: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L570: Blank line separates related statements for readability.

// Original L571: Declares the archiveSettledLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async archiveSettledLedger(employeeId) {
// Original L572: Derives id from String(employeeId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const id = String(employeeId);
// Original L573: Derives entries from this.ledger.entries; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entries = this.ledger.entries
// Original L574: Selects only records matching the timekeeper condition, excluding unrelated entities from the result.
      .filter(entry => String(entry.employeeId || '') === id)
// Original L575: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
// Original L576: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!entries.length || ledgerBalanceCents(entries) !== 0) {
// Original L577: Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.pendingLedgerSettlements.delete(id);
// Original L578: Returns null to the caller and exits this function.
      return null;
// Original L579: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L580: Blank line separates related statements for readability.

// Original L581: Derives entryIds from entries.map(entry => String(entry.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entryIds = entries.map(entry => String(entry.id));
// Original L582: Derives sameEntries from archive => archive.employeeId === id && archive.status === 'pending' &&; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const sameEntries = archive => archive.employeeId === id && archive.status === 'pending' &&
// Original L583: Uses the Array.isArray(archive.entryIds) && archive.entryIds.length === entryIds.length && expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      Array.isArray(archive.entryIds) && archive.entryIds.length === entryIds.length &&
// Original L584: Invokes archive.entryIds.every for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      archive.entryIds.every((entryId, index) => String(entryId) === entryIds[index]);
// Original L585: Finds the first matching domain record, allowing the following validation or update to target the intended entity.
    let archive = this.ledgerArchives.find(sameEntries);
// Original L586: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!archive) {
// Original L587: Uses the archive = { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      archive = {
// Original L588: Stores the id field with crypto.randomUUID(); this object field is part of the Firestore payload or a domain record used by timekeeper.
        id: crypto.randomUUID(),
// Original L589: Stores the employeeId field with id; this object field is part of the Firestore payload or a domain record used by timekeeper.
        employeeId: id,
// Original L590: Stores the employeeName field with this.employees.get(id)?.name || 'Unknown employee'; this object field is part of the Firestore payload or a domain record used by timekeeper.
        employeeName: this.employees.get(id)?.name || 'Unknown employee',
// Original L591: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        archivedAt: new Date().toISOString(),
// Original L592: Stores the balanceCents field with 0; this object field is part of the Firestore payload or a domain record used by timekeeper.
        balanceCents: 0,
// Original L593: Stores the entryCount field with entries.length; this object field is part of the Firestore payload or a domain record used by timekeeper.
        entryCount: entries.length,
// Original L594: Uses the entryIds, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        entryIds,
// Original L595: Stores the status field with 'pending'; this object field is part of the Firestore payload or a domain record used by timekeeper.
        status: 'pending'
// Original L596: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      };
// Original L597: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
      await setDoc(doc(db, 'ledgerArchives', archive.id), archive);
// Original L598: Invokes this.ledgerArchives.unshift for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.ledgerArchives.unshift(archive);
// Original L599: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L600: Blank line separates related statements for readability.

// Original L601: Derives result from await this.completePendingLedgerArchive(archive); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const result = await this.completePendingLedgerArchive(archive);
// Original L602: Uses the entries.forEach(entry => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    entries.forEach(entry => {
// Original L603: Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      entry.archivedOnZero = true;
// Original L604: Updates entry.archiveId to result.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      entry.archiveId = result.id;
// Original L605: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L606: Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.pendingLedgerSettlements.delete(id);
// Original L607: Returns `result` (result) to the caller and exits this function.
    return result;
// Original L608: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L609: Blank line separates related statements for readability.

// Original L610: Declares the archiveAlreadySettledLedgers operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async archiveAlreadySettledLedgers() {
// Original L611: Derives employeeIds from new Set(this.ledger.entries.map(entry => String(entry.employeeId || '')).filter(Boolean)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employeeIds = new Set(this.ledger.entries.map(entry => String(entry.employeeId || '')).filter(Boolean));
// Original L612: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const employeeId of employeeIds) {
// Original L613: Derives entries from this.ledger.entries.filter(entry => String(entry.employeeId || '') === employeeId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const entries = this.ledger.entries.filter(entry => String(entry.employeeId || '') === employeeId);
// Original L614: Derives hasNonZeroAmount from entries.some(entry => Number(entry.amount || 0) !== 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const hasNonZeroAmount = entries.some(entry => Number(entry.amount || 0) !== 0);
// Original L615: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (hasNonZeroAmount && ledgerBalanceCents(entries) === 0) {
// Original L616: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
        await this.archiveSettledLedger(employeeId);
// Original L617: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L618: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L619: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L620: Blank line separates related statements for readability.

// Original L621: Declares the archiveLedgerIfSettled operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer = false } = {}) {
// Original L622: Derives id from String(employeeId || ''); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const id = String(employeeId || '');
// Original L623: Derives entries from this.ledger.entries.filter(entry => String(entry.employeeId || '') === id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entries = this.ledger.entries.filter(entry => String(entry.employeeId || '') === id);
// Original L624: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (previousBalanceCents === 0 || !entries.length || ledgerBalanceCents(entries) !== 0) {
// Original L625: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (ledgerBalanceCents(entries) !== 0) this.pendingLedgerSettlements.delete(id);
// Original L626: Returns null to the caller and exits this function.
      return null;
// Original L627: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L628: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (defer) {
// Original L629: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.pendingLedgerSettlements.add(id);
// Original L630: Returns null to the caller and exits this function.
      return null;
// Original L631: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L632: Returns calls `this.archiveSettledLedger` with `id` (id) to the caller and exits this function.
    return this.archiveSettledLedger(id);
// Original L633: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L634: Blank line separates related statements for readability.
  
// Original L635: Declares the saveLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async saveLedgerEntry(data, { deferZeroArchive = false } = {}) {
// Original L636: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.resumePendingLedgerArchives();
// Original L637: Derives employeeId from data.employeeId || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employeeId = data.employeeId || null;
// Original L638: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!employeeId || !this.employees.has(employeeId)) {
// Original L639: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Choose an employee for this ledger entry.");
// Original L640: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L641: Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
// Original L642: Derives entry from this.ledger.addEntry({ ...data, employeeId }); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = this.ledger.addEntry({ ...data, employeeId });
// Original L643: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L644: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
      await setDoc(doc(db, "ledgerRows", entry.id), entry);
// Original L645: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L646: Invokes this.ledger.deleteEntry for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.ledger.deleteEntry(entry.id);
// Original L647: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L648: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L649: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L650: Derives archive from await this.archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer: deferZeroArchive }); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const archive = await this.archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer: deferZeroArchive });
// Original L651: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (archive) {
// Original L652: Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        entry.archivedOnZero = true;
// Original L653: Updates entry.archiveId to archive.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        entry.archiveId = archive.id;
// Original L654: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L655: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L656: Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.entrySaved = true;
// Original L657: Updates error.message to `Entry saved, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.message = `Entry saved, but archiving the settled ledger is still pending. ${error.message}`;
// Original L658: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L659: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L660: Returns `entry` (entry) to the caller and exits this function.
    return entry;
// Original L661: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L662: Blank line separates related statements for readability.

// Original L663: Declares the saveShiftToLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async saveShiftToLedger(shiftId) {
// Original L664: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.resumePendingLedgerArchives();
// Original L665: Derives shift from this.shifts.find(candidate => String(candidate.id) === String(shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const shift = this.shifts.find(candidate => String(candidate.id) === String(shiftId));
// Original L666: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!shift) throw new Error('The selected shift could not be found.');
// Original L667: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.ledger.entries.some(entry => String(entry.sourceShiftId || '') === String(shift.id))) {
// Original L668: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('This shift has already been added to the ledger.');
// Original L669: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L670: Returns calls `this.saveLedgerEntry` with calls `makeShiftLedgerEntryData` with `shift` (shift); an object with fields deferZeroArchive: true to the caller and exits this function.
    return this.saveLedgerEntry(makeShiftLedgerEntryData(shift), { deferZeroArchive: true });
// Original L671: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L672: Blank line separates related statements for readability.
  
// Original L673: Declares the updateLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updateLedgerEntry(entryId, updates) {
// Original L674: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.resumePendingLedgerArchives();
// Original L675: Derives current from this.ledger.getEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const current = this.ledger.getEntry(entryId);
// Original L676: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!current) throw new Error("Ledger entry not found.");
// Original L677: Derives employeeId from current.employeeId; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employeeId = current.employeeId;
// Original L678: Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
// Original L679: Derives previous from { ...current }; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previous = { ...current };
// Original L680: Derives entry from this.ledger.updateEntry(entryId, updates); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = this.ledger.updateEntry(entryId, updates);
// Original L681: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L682: This comment identifies the following implementation area: Apply only the edited fields so any unrelated Firestore data remains untouched..
      // Apply only the edited fields so any unrelated Firestore data remains untouched.
// Original L683: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
      await updateDoc(doc(db, "ledgerRows", entryId), updates);
// Original L684: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L685: Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.
      Object.assign(entry, previous);
// Original L686: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L687: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L688: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L689: Derives pendingSettlement from this.pendingLedgerSettlements.has(String(employeeId || '')); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const pendingSettlement = this.pendingLedgerSettlements.has(String(employeeId || ''));
// Original L690: Derives balanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const balanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
// Original L691: Derives archive from balanceCents === 0 && (previousBalanceCents !== 0 || pendingSettlement); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const archive = balanceCents === 0 && (previousBalanceCents !== 0 || pendingSettlement)
// Original L692: Invokes ? await this.archiveSettledLedger for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        ? await this.archiveSettledLedger(employeeId)
// Original L693: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
        : null;
// Original L694: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (archive) {
// Original L695: Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        entry.archivedOnZero = true;
// Original L696: Updates entry.archiveId to archive.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        entry.archiveId = archive.id;
// Original L697: Uses the } else if (balanceCents !== 0) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      } else if (balanceCents !== 0) {
// Original L698: Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        this.pendingLedgerSettlements.delete(String(employeeId || ''));
// Original L699: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L700: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L701: Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.entrySaved = true;
// Original L702: Updates error.message to `Entry updated, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.message = `Entry updated, but archiving the settled ledger is still pending. ${error.message}`;
// Original L703: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L704: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L705: Returns `entry` (entry) to the caller and exits this function.
    return entry;
// Original L706: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L707: Blank line separates related statements for readability.
  
// Original L708: Declares the deleteLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deleteLedgerEntry(entryId) {
// Original L709: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.resumePendingLedgerArchives();
// Original L710: Derives entry from this.ledger.getEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const entry = this.ledger.getEntry(entryId);
// Original L711: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!entry) return;
// Original L712: Derives employeeId from entry.employeeId; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employeeId = entry.employeeId;
// Original L713: Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
// Original L714: Derives isDeleted from this.ledger.deleteEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const isDeleted = this.ledger.deleteEntry(entryId);
// Original L715: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!isDeleted) return;
// Original L716: Blank line separates related statements for readability.
    
// Original L717: Deletes the corresponding Firestore document so the remote record matches the local removal.
    await deleteDoc(doc(db, "ledgerRows", entryId));
// Original L718: Blank line separates related statements for readability.
    
// Original L719: This comment identifies the following implementation area: Batch update updated index numbers in Firestore efficiently.
    // Batch update updated index numbers in Firestore efficiently
// Original L720: Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const batch = writeBatch(db);
// Original L721: Derives affectedEntries from this.ledger.entries.filter(candidate => candidate.employeeId === (entry.employeeId || null)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const affectedEntries = this.ledger.entries.filter(candidate => candidate.employeeId === (entry.employeeId || null));
// Original L722: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
    affectedEntries.forEach((candidate) => {
// Original L723: Derives ref from doc(db, "ledgerRows", candidate.id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const ref = doc(db, "ledgerRows", candidate.id);
// Original L724: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
      batch.update(ref, { index: candidate.index });
// Original L725: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L726: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (affectedEntries.length) await commitBatch(batch);
// Original L727: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L728: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
      await this.archiveLedgerIfSettled(employeeId, previousBalanceCents);
// Original L729: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L730: Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.entrySaved = true;
// Original L731: Updates error.message to `Entry deleted, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      error.message = `Entry deleted, but archiving the settled ledger is still pending. ${error.message}`;
// Original L732: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L733: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L734: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L735: Blank line separates related statements for readability.
  
// Original L736: This comment identifies the following implementation area: INVOICE --.
  // INVOICE --
// Original L737: Declares the loadInvoices operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadInvoices() {
// Original L738: Sets this object’s invoices (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.invoices = [];
// Original L739: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L740: Derives querySnapshot from await getDocs(collection(db, "invoices")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "invoices"));
// Original L741: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L742: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L743: Derives customer from (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const customer = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown');
// Original L744: Derives items from data.items || []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const items = data.items || [];
// Original L745: Derives isPaid from data.isPaid || false; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const isPaid = data.isPaid || false;
// Original L746: Blank line separates related statements for readability.
        
// Original L747: Derives inv from new Invoice(customer, items, docSnap.id, isPaid, data.date || null, data.shiftIds || []); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const inv = new Invoice(customer, items, docSnap.id, isPaid, data.date || null, data.shiftIds || []);
// Original L748: Blank line separates related statements for readability.
        
// Original L749: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.invoices.push(inv);
// Original L750: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L751: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L752: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading invoices from Firestore:", e);
// Original L753: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L754: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L755: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L756: Blank line separates related statements for readability.
  
// Original L757: Declares the saveInvoice operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async saveInvoice(invoice) {
// Original L758: Derives linkedShiftIds from invoiceShiftIds(invoice); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const linkedShiftIds = invoiceShiftIds(invoice);
// Original L759: Derives linkedLineIds from (invoice.items || []).filter(item => item?.shiftId).map(item => String(item.shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const linkedLineIds = (invoice.items || []).filter(item => item?.shiftId).map(item => String(item.shiftId));
// Original L760: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (new Set(linkedLineIds).size !== linkedLineIds.length) {
// Original L761: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('This invoice contains the same work shift more than once. Remove the duplicate before saving.');
// Original L762: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L763: Derives duplicateShiftId from [...linkedShiftIds].find(shiftId =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const duplicateShiftId = [...linkedShiftIds].find(shiftId =>
// Original L764: Invokes shiftIsAttachedElsewhere for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      shiftIsAttachedElsewhere(this.invoices, shiftId, invoice.id)
// Original L765: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L766: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (duplicateShiftId) {
// Original L767: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error(`Shift ${duplicateShiftId} is already attached to another invoice.`);
// Original L768: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L769: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    invoice.shiftIds = [...linkedShiftIds];
// Original L770: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "invoices", invoice.id), {
// Original L771: Stores the custId field with invoice.customer ? invoice.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      custId: invoice.customer ? invoice.customer.id : null,
// Original L772: Stores the items field with invoice.items; this object field is part of the Firestore payload or a domain record used by timekeeper.
      items: invoice.items,
// Original L773: Stores the isPaid field with Boolean(invoice.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.
      isPaid: Boolean(invoice.isPaid),
// Original L774: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      date: invoice.date || null,
// Original L775: Stores the shiftIds field with Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []; this object field is part of the Firestore payload or a domain record used by timekeeper.
      shiftIds: Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []
// Original L776: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L777: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L778: Blank line separates related statements for readability.
  
// Original L779: Declares the deleteInvoice operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deleteInvoice(invoiceId) {
// Original L780: Deletes the corresponding Firestore document so the remote record matches the local removal.
    await deleteDoc(doc(db, "invoices", invoiceId));
// Original L781: Sets this object’s invoices (domain state) from this.invoices.filter(s => s.id !== invoiceId), keeping in-memory state aligned with the entity’s business meaning.
    this.invoices = this.invoices.filter(s => s.id !== invoiceId);
// Original L782: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L783: Blank line separates related statements for readability.
  
// Original L784: This comment identifies the following implementation area: EMPLOYEE --.
  // EMPLOYEE --
// Original L785: Declares the loadEmployees operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadEmployees() {
// Original L786: Invokes this.employees.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.employees.clear();
// Original L787: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L788: Derives querySnapshot from await getDocs(collection(db, "employees")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "employees"));
// Original L789: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L790: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L791: Invokes this.employees.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        this.employees.set(docSnap.id, new Employee(docSnap.id, data.name, data.wage));
// Original L792: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L793: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L794: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading employees from Firestore:", e);
// Original L795: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L796: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L797: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L798: Blank line separates related statements for readability.
  
// Original L799: Declares the addEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async addEmployee(name, wage) {
// Original L800: Derives cleanName from normalize(name); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanName = normalize(name);
// Original L801: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanName) throw new Error("Employee name cannot be empty.");
// Original L802: Blank line separates related statements for readability.
    
// Original L803: Derives isDuplicate from Array.from(this.employees.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const isDuplicate = Array.from(this.employees.values()).some(
// Original L804: Uses the (emp) => normalize(emp.name) === cleanName expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      (emp) => normalize(emp.name) === cleanName
// Original L805: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L806: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (isDuplicate) return null;
// Original L807: Blank line separates related statements for readability.
    
// Original L808: Derives emp from new Employee(null, name.trim(), wage); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const emp = new Employee(null, name.trim(), wage);
// Original L809: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "employees", emp.id), {
// Original L810: Stores the name field with emp.name; this object field is part of the Firestore payload or a domain record used by timekeeper.
      name: emp.name,
// Original L811: Stores the wage field with emp.wage; this object field is part of the Firestore payload or a domain record used by timekeeper.
      wage: emp.wage
// Original L812: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L813: Invokes this.employees.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.employees.set(emp.id, emp);
// Original L814: Returns `emp` (emp) to the caller and exits this function.
    return emp;
// Original L815: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L816: Blank line separates related statements for readability.
  
// Original L817: Declares the updateEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updateEmployee(id, name, wage) {
// Original L818: Derives employee from this.employees.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const employee = this.employees.get(id);
// Original L819: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!employee) throw new Error("Employee not found.");
// Original L820: Blank line separates related statements for readability.
    
// Original L821: Derives cleanName from String(name ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanName = String(name ?? '').trim();
// Original L822: Derives cleanWage from Number(wage); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanWage = Number(wage);
// Original L823: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanName) throw new Error("Employee name cannot be empty.");
// Original L824: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!Number.isFinite(cleanWage) || cleanWage < 0) {
// Original L825: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Employee wage must be a non-negative number.");
// Original L826: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L827: Derives duplicate from Array.from(this.employees.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const duplicate = Array.from(this.employees.values()).some(
// Original L828: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      candidate => candidate.id !== id && normalize(candidate.name) === normalize(cleanName)
// Original L829: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L830: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (duplicate) throw new Error("An employee with that name already exists.");
// Original L831: Blank line separates related statements for readability.
    
// Original L832: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
    await updateDoc(doc(db, "employees", id), { name: cleanName, wage: cleanWage });
// Original L833: Updates employee.name to cleanName; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    employee.name = cleanName;
// Original L834: Updates employee.wage to cleanWage; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    employee.wage = cleanWage;
// Original L835: Returns `employee` (employee) to the caller and exits this function.
    return employee;
// Original L836: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L837: Blank line separates related statements for readability.
  
// Original L838: Declares the deleteEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deleteEmployee(id) {
// Original L839: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.employees.has(id)) {
// Original L840: Deletes the corresponding Firestore document so the remote record matches the local removal.
      await deleteDoc(doc(db, "employees", id));
// Original L841: Invokes this.employees.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.employees.delete(id);
// Original L842: Returns true to the caller and exits this function.
      return true;
// Original L843: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L844: Returns false to the caller and exits this function.
    return false;
// Original L845: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L846: Blank line separates related statements for readability.
  
// Original L847: This comment identifies the following implementation area: CUSTOMER --.
  // CUSTOMER --
// Original L848: Declares the loadCustomers operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadCustomers() {
// Original L849: Invokes this.customers.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.customers.clear();
// Original L850: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L851: Derives querySnapshot from await getDocs(collection(db, "customers")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "customers"));
// Original L852: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L853: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L854: Invokes this.customers.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        this.customers.set(docSnap.id, new Customer(docSnap.id, data.name, data.location, data.note, data.billingRate));
// Original L855: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L856: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L857: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading customers from Firestore:", e);
// Original L858: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L859: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L860: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L861: Blank line separates related statements for readability.
  
// Original L862: Declares the addCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async addCustomer(name, location, note = null, billingRate = null) {
// Original L863: Derives cleanName from normalize(name); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanName = normalize(name);
// Original L864: Derives cleanLocation from normalize(location); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanLocation = normalize(location);
// Original L865: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanName) throw new Error("Customer name cannot be empty.");
// Original L866: Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
// Original L867: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
// Original L868: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Hourly billing rate must be a non-negative number.");
// Original L869: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L870: Blank line separates related statements for readability.
    
// Original L871: Derives isDuplicate from Array.from(this.customers.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const isDuplicate = Array.from(this.customers.values()).some(
// Original L872: Uses the (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation
// Original L873: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L874: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (isDuplicate) return null;
// Original L875: Blank line separates related statements for readability.
    
// Original L876: Derives site from new Customer(null, name.trim(), location ? location.trim() : null, note, rate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const site = new Customer(null, name.trim(), location ? location.trim() : null, note, rate);
// Original L877: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "customers", site.id), {
// Original L878: Stores the name field with site.name; this object field is part of the Firestore payload or a domain record used by timekeeper.
      name: site.name,
// Original L879: Stores the location field with site.location; this object field is part of the Firestore payload or a domain record used by timekeeper.
      location: site.location,
// Original L880: Stores the note field with site.note; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: site.note,
// Original L881: Stores the billingRate field with site.billingRate; this object field is part of the Firestore payload or a domain record used by timekeeper.
      billingRate: site.billingRate
// Original L882: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L883: Invokes this.customers.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    this.customers.set(site.id, site);
// Original L884: Returns `site` (site) to the caller and exits this function.
    return site;
// Original L885: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L886: Blank line separates related statements for readability.
  
// Original L887: Declares the updateCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updateCustomer(id, name, location, note, billingRate = undefined) {
// Original L888: Derives customer from this.customers.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const customer = this.customers.get(id);
// Original L889: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!customer) throw new Error("Customer not found.");
// Original L890: Blank line separates related statements for readability.
    
// Original L891: Derives cleanName from String(name ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanName = String(name ?? '').trim();
// Original L892: Derives cleanLocation from String(location ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanLocation = String(location ?? '').trim();
// Original L893: Derives cleanNote from String(note ?? '').trim() || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanNote = String(note ?? '').trim() || null;
// Original L894: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanName) throw new Error("Customer name cannot be empty.");
// Original L895: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanLocation) throw new Error("Customer location cannot be empty.");
// Original L896: Derives duplicate from Array.from(this.customers.values()).some(candidate =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const duplicate = Array.from(this.customers.values()).some(candidate =>
// Original L897: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      candidate.id !== id &&
// Original L898: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      normalize(candidate.name) === normalize(cleanName) &&
// Original L899: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      normalize(candidate.location) === normalize(cleanLocation)
// Original L900: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L901: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (duplicate) throw new Error("A customer with that name and location already exists.");
// Original L902: Blank line separates related statements for readability.
    
// Original L903: Derives updates from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const updates = {
// Original L904: Stores the name field with cleanName; this object field is part of the Firestore payload or a domain record used by timekeeper.
      name: cleanName,
// Original L905: Stores the location field with cleanLocation; this object field is part of the Firestore payload or a domain record used by timekeeper.
      location: cleanLocation,
// Original L906: Stores the note field with cleanNote; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: cleanNote
// Original L907: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L908: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    let cleanRate;
// Original L909: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (billingRate !== undefined) {
// Original L910: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
      cleanRate = billingRate === null || billingRate === '' ? null : Number(billingRate);
// Original L911: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (cleanRate !== null && (!Number.isFinite(cleanRate) || cleanRate < 0)) {
// Original L912: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error("Hourly billing rate must be a non-negative number.");
// Original L913: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L914: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      updates.billingRate = cleanRate;
// Original L915: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L916: Blank line separates related statements for readability.
    
// Original L917: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
    await updateDoc(doc(db, "customers", id), updates);
// Original L918: Updates customer.name to cleanName; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    customer.name = cleanName;
// Original L919: Updates customer.location to cleanLocation; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    customer.location = cleanLocation;
// Original L920: Updates customer.note to cleanNote; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    customer.note = cleanNote;
// Original L921: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (billingRate !== undefined) customer.billingRate = cleanRate;
// Original L922: Returns true to the caller and exits this function.
    return true;
// Original L923: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L924: Blank line separates related statements for readability.
  
// Original L925: Declares the updateCustomerBillingRate operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updateCustomerBillingRate(id, billingRate) {
// Original L926: Derives customer from this.customers.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const customer = this.customers.get(id);
// Original L927: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!customer) throw new Error("Customer not found.");
// Original L928: Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
// Original L929: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
// Original L930: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Hourly billing rate must be a non-negative number.");
// Original L931: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L932: Derives previousRate from customer.billingRate; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previousRate = customer.billingRate;
// Original L933: Updates customer.billingRate to rate; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    customer.billingRate = rate;
// Original L934: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L935: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
      await updateDoc(doc(db, "customers", id), { billingRate: rate });
// Original L936: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L937: Updates customer.billingRate to previousRate; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      customer.billingRate = previousRate;
// Original L938: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L939: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L940: Returns `customer` (customer) to the caller and exits this function.
    return customer;
// Original L941: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L942: Blank line separates related statements for readability.
  
// Original L943: Declares the deleteCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deleteCustomer(id) {
// Original L944: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (this.customers.has(id)) {
// Original L945: Deletes the corresponding Firestore document so the remote record matches the local removal.
      await deleteDoc(doc(db, "customers", id));
// Original L946: Invokes this.customers.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
      this.customers.delete(id);
// Original L947: Returns true to the caller and exits this function.
      return true;
// Original L948: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L949: Returns false to the caller and exits this function.
    return false;
// Original L950: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L951: Blank line separates related statements for readability.
  
// Original L952: This comment identifies the following implementation area: WORKSHIFT --.
  // WORKSHIFT --
// Original L953: Declares the loadShifts operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadShifts() {
// Original L954: Sets this object’s shifts (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.shifts = [];
// Original L955: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L956: Derives querySnapshot from await getDocs(collection(db, "shifts")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "shifts"));
// Original L957: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L958: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L959: Derives emp from (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const emp = (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0);
// Original L960: Derives site from (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const site = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site');
// Original L961: Derives parsedBreaks from (data.breaks || []).map(b => ({ start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null })); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const parsedBreaks = (data.breaks || []).map(b => ({ start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null }));
// Original L962: Blank line separates related statements for readability.
        
// Original L963: Derives shift from new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks, data.paidHours); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks, data.paidHours);
// Original L964: Blank line separates related statements for readability.
        
// Original L965: Updates shift.clockInTime to data.clockInTime ? new Date(data.clockInTime) : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
// Original L966: Updates shift.clockOutTime to data.clockOutTime ? new Date(data.clockOutTime) : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
// Original L967: Blank line separates related statements for readability.
        
// Original L968: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.shifts.push(shift);
// Original L969: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L970: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L971: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading shifts from Firestore:", e);
// Original L972: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L973: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L974: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L975: Blank line separates related statements for readability.
  
// Original L976: Declares the saveShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async saveShift(shift) {
// Original L977: Derives formattedBreaks from shift.breaks.map(b => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const formattedBreaks = shift.breaks.map(b => ({
// Original L978: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      start: b.start instanceof Date ? b.start.toISOString() : b.start,
// Original L979: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      end: b.end instanceof Date ? b.end.toISOString() : b.end
// Original L980: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    }));
// Original L981: Blank line separates related statements for readability.

// Original L982: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "shifts", shift.id), {
// Original L983: Stores the employeeId field with shift.employee ? shift.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employeeId: shift.employee ? shift.employee.id : null,
// Original L984: Stores the custId field with shift.customer ? shift.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      custId: shift.customer ? shift.customer.id : null,
// Original L985: Stores the clockInTime field with shift.clockInTime ? shift.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
// Original L986: Stores the clockOutTime field with shift.clockOutTime ? shift.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
// Original L987: Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: shift.note || null,
// Original L988: Stores the isPaid field with shift.isPaid || false; this object field is part of the Firestore payload or a domain record used by timekeeper.
      isPaid: shift.isPaid || false,
// Original L989: Stores the breaks field with formattedBreaks; this object field is part of the Firestore payload or a domain record used by timekeeper.
      breaks: formattedBreaks,
// Original L990: Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
// Original L991: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L992: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L993: Blank line separates related statements for readability.
  
// Original L994: Declares the saveShifts operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async saveShifts(shifts) {
// Original L995: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!Array.isArray(shifts) || shifts.length === 0) return;
// Original L996: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (shifts.length > 500) throw new Error("A single clock-in batch cannot contain more than 500 shifts.");
// Original L997: Derives ids from shifts.map(shift => String(shift.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const ids = shifts.map(shift => String(shift.id));
// Original L998: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (new Set(ids).size !== ids.length) throw new Error("A shift appears more than once in this clock-in batch.");
// Original L999: Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const batch = writeBatch(db);
// Original L1000: Uses the shifts.forEach(shift => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    shifts.forEach(shift => {
// Original L1001: Derives formattedBreaks from (shift.breaks || []).map(b => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const formattedBreaks = (shift.breaks || []).map(b => ({
// Original L1002: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        start: b.start instanceof Date ? b.start.toISOString() : b.start,
// Original L1003: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        end: b.end instanceof Date ? b.end.toISOString() : b.end
// Original L1004: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      }));
// Original L1005: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
      batch.set(doc(db, "shifts", shift.id), {
// Original L1006: Stores the employeeId field with shift.employee ? shift.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        employeeId: shift.employee ? shift.employee.id : null,
// Original L1007: Stores the custId field with shift.customer ? shift.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        custId: shift.customer ? shift.customer.id : null,
// Original L1008: Stores the clockInTime field with shift.clockInTime ? shift.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
// Original L1009: Stores the clockOutTime field with shift.clockOutTime ? shift.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
// Original L1010: Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        note: shift.note || null,
// Original L1011: Stores the isPaid field with Boolean(shift.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.
        isPaid: Boolean(shift.isPaid),
// Original L1012: Stores the breaks field with formattedBreaks; this object field is part of the Firestore payload or a domain record used by timekeeper.
        breaks: formattedBreaks,
// Original L1013: Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
// Original L1014: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1015: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L1016: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await commitBatch(batch, 'Clocking in the selected employees failed.');
// Original L1017: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1018: Blank line separates related statements for readability.
  
// Original L1019: Declares the deleteShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deleteShift(shiftId) {
// Original L1020: Deletes the corresponding Firestore document so the remote record matches the local removal.
    await deleteDoc(doc(db, "shifts", shiftId));
// Original L1021: Sets this object’s shifts (domain state) from this.shifts.filter(s => s.id !== shiftId), keeping in-memory state aligned with the entity’s business meaning.
    this.shifts = this.shifts.filter(s => s.id !== shiftId);
// Original L1022: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1023: Blank line separates related statements for readability.
  
// Original L1024: Declares the updateShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updateShift(shiftId, employee, customer, clockInTime, clockOutTime, note = null, isPaid = false, breaks = null, paidHours = undefined) {
// Original L1025: Derives shift from this.shifts.find(s => s.id === shiftId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const shift = this.shifts.find(s => s.id === shiftId);
// Original L1026: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!shift) throw new Error("Shift could not be found.");
// Original L1027: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!employee || !customer) throw new Error("Please select an employee and customer.");
// Original L1028: Blank line separates related statements for readability.
    
// Original L1029: Derives start from clockInTime instanceof Date ? clockInTime : new Date(clockInTime); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const start = clockInTime instanceof Date ? clockInTime : new Date(clockInTime);
// Original L1030: Derives end from clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const end = clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime);
// Original L1031: Derives sourceBreaks from Array.isArray(breaks) ? breaks : shift.breaks; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const sourceBreaks = Array.isArray(breaks) ? breaks : shift.breaks;
// Original L1032: Blank line separates related statements for readability.
    
// Original L1033: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
// Original L1034: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Please provide valid start and end times.");
// Original L1035: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1036: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (end <= start) throw new Error("End time must be after start time.");
// Original L1037: Blank line separates related statements for readability.
    
// Original L1038: Derives normalizedBreaks from sourceBreaks.map((breakItem, index) => {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const normalizedBreaks = sourceBreaks.map((breakItem, index) => {
// Original L1039: Derives breakStart from breakItem.start instanceof Date ? breakItem.start : new Date(breakItem.start); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const breakStart = breakItem.start instanceof Date ? breakItem.start : new Date(breakItem.start);
// Original L1040: Derives breakEnd from breakItem.end instanceof Date ? breakItem.end : new Date(breakItem.end); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const breakEnd = breakItem.end instanceof Date ? breakItem.end : new Date(breakItem.end);
// Original L1041: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (Number.isNaN(breakStart.getTime()) || Number.isNaN(breakEnd.getTime())) {
// Original L1042: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Break ${index + 1} needs both a valid start and end time.`);
// Original L1043: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1044: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (breakEnd <= breakStart) throw new Error(`Break ${index + 1} must end after it starts.`);
// Original L1045: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (breakStart < start || breakEnd > end) {
// Original L1046: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Break ${index + 1} must fall within the shift.`);
// Original L1047: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1048: Returns an object with fields start: `breakStart` (break start); end: `breakEnd` (break end) to the caller and exits this function.
      return { start: breakStart, end: breakEnd };
// Original L1049: Invokes }).sort for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
    }).sort((a, b) => a.start - b.start);
// Original L1050: Blank line separates related statements for readability.
    
// Original L1051: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (let index = 1; index < normalizedBreaks.length; index += 1) {
// Original L1052: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (normalizedBreaks[index].start < normalizedBreaks[index - 1].end) {
// Original L1053: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error("Break times cannot overlap.");
// Original L1054: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1055: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1056: Blank line separates related statements for readability.
    
// Original L1057: Derives nextPaidHours from paidHours === undefined ? shift.paidHours :; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const nextPaidHours = paidHours === undefined ? shift.paidHours :
// Original L1058: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
      (paidHours === null || paidHours === '' ? null : Number(paidHours));
// Original L1059: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (nextPaidHours !== null && (!Number.isFinite(nextPaidHours) || nextPaidHours < 0)) {
// Original L1060: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Paid hours must be a valid non-negative number, or left blank to use worked hours.");
// Original L1061: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1062: Blank line separates related statements for readability.
    
// Original L1063: Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.
    await updateDoc(doc(db, "shifts", shiftId), {
// Original L1064: Stores the employeeId field with employee.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employeeId: employee.id,
// Original L1065: Stores the custId field with customer.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
      custId: customer.id,
// Original L1066: Stores the clockInTime field with start.toISOString(); this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockInTime: start.toISOString(),
// Original L1067: Stores the clockOutTime field with end.toISOString(); this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockOutTime: end.toISOString(),
// Original L1068: Stores the note field with note ? String(note).trim() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: note ? String(note).trim() : null,
// Original L1069: Stores the isPaid field with Boolean(isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.
      isPaid: Boolean(isPaid),
// Original L1070: Transforms each entity or nested value into the storage/display shape required by this operation.
      breaks: normalizedBreaks.map(b => ({ start: b.start.toISOString(), end: b.end.toISOString() })),
// Original L1071: Stores the paidHours field with nextPaidHours; this object field is part of the Firestore payload or a domain record used by timekeeper.
      paidHours: nextPaidHours
// Original L1072: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L1073: Blank line separates related statements for readability.
    
// Original L1074: Updates shift.employee to employee; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.employee = employee;
// Original L1075: Updates shift.customer to customer; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.customer = customer;
// Original L1076: Updates shift.clockInTime to start; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.clockInTime = start;
// Original L1077: Updates shift.clockOutTime to end; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.clockOutTime = end;
// Original L1078: Updates shift.note to note ? String(note).trim() : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.note = note ? String(note).trim() : null;
// Original L1079: Updates shift.isPaid to Boolean(isPaid); this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.isPaid = Boolean(isPaid);
// Original L1080: Updates shift.breaks to normalizedBreaks; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.breaks = normalizedBreaks;
// Original L1081: Updates shift.paidHours to nextPaidHours; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    shift.paidHours = nextPaidHours;
// Original L1082: Returns `shift` (shift) to the caller and exits this function.
    return shift;
// Original L1083: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1084: Blank line separates related statements for readability.
  
// Original L1085: Declares the howManyActive operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async howManyActive() {
// Original L1086: Derives activeShifts from this.shifts.filter(s => !s.isComplete); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const activeShifts = this.shifts.filter(s => !s.isComplete);
// Original L1087: Returns `activeShifts.length` (the length property of activeShifts) to the caller and exits this function.
    return activeShifts.length;
// Original L1088: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1089: Blank line separates related statements for readability.
  
// Original L1090: This comment identifies the following implementation area: PAYMENT --.
  // PAYMENT --
// Original L1091: Declares the loadPayments operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadPayments() {
// Original L1092: Sets this object’s payments (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.payments = [];
// Original L1093: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L1094: Derives querySnapshot from await getDocs(collection(db, "payments")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "payments"));
// Original L1095: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L1096: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L1097: Derives payment from new Payment(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const payment = new Payment(
// Original L1098: Uses the data.employeeId, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          data.employeeId,
// Original L1099: Uses the data.amount, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          data.amount,
// Original L1100: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          data.date,
// Original L1101: Uses the data.note, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          data.note,
// Original L1102: Uses the docSnap.id expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          docSnap.id
// Original L1103: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
        );
// Original L1104: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.payments.push(payment);
// Original L1105: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1106: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L1107: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading payments from Firestore:", e);
// Original L1108: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L1109: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1110: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1111: Blank line separates related statements for readability.
  
// Original L1112: Declares the addPayment operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async addPayment(employeeId, amount, note = '') {
// Original L1113: Derives payment from new Payment(employeeId, amount, new Date(), note); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const payment = new Payment(employeeId, amount, new Date(), note);
// Original L1114: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "payments", payment.id), {
// Original L1115: Stores the employeeId field with payment.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employeeId: payment.employeeId,
// Original L1116: Stores the amount field with payment.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.
      amount: payment.amount,
// Original L1117: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      date: payment.date.toISOString(),
// Original L1118: Stores the note field with payment.note; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: payment.note
// Original L1119: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L1120: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
    this.payments.push(payment);
// Original L1121: Returns `payment` (payment) to the caller and exits this function.
    return payment;
// Original L1122: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1123: Blank line separates related statements for readability.
  
// Original L1124: Declares the deletePayment operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deletePayment(paymentId) {
// Original L1125: Deletes the corresponding Firestore document so the remote record matches the local removal.
    await deleteDoc(doc(db, "payments", paymentId));
// Original L1126: Sets this object’s payments (domain state) from this.payments.filter(p => p.id !== paymentId), keeping in-memory state aligned with the entity’s business meaning.
    this.payments = this.payments.filter(p => p.id !== paymentId);
// Original L1127: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1128: Blank line separates related statements for readability.
  
// Original L1129: This comment identifies the following implementation area: CALCULATE BALANCES FOR AN EMPLOYEE.
  // CALCULATE BALANCES FOR AN EMPLOYEE
// Original L1130: Declares the getEmployeeLedger model/store method, exposing this specific timekeeper behavior to its caller.
  getEmployeeLedger(employeeId) {
// Original L1131: Derives empShifts from this.shifts.filter(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const empShifts = this.shifts.filter(
// Original L1132: Uses the s => s.employee && s.employee.id === employeeId && s.isComplete expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      s => s.employee && s.employee.id === employeeId && s.isComplete
// Original L1133: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L1134: Derives empPayments from this.payments.filter(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const empPayments = this.payments.filter(
// Original L1135: Uses the p => p.employeeId === employeeId expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      p => p.employeeId === employeeId
// Original L1136: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    );
// Original L1137: Blank line separates related statements for readability.
    
// Original L1138: Derives totalEarned from empShifts.reduce((sum, s) => sum + Number(s.getShiftPay()), 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const totalEarned = empShifts.reduce((sum, s) => sum + Number(s.getShiftPay()), 0);
// Original L1139: Derives totalPaid from empPayments.reduce((sum, p) => sum + p.amount, 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const totalPaid = empPayments.reduce((sum, p) => sum + p.amount, 0);
// Original L1140: Derives balanceOwed from Number((totalEarned - totalPaid).toFixed(2)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const balanceOwed = Number((totalEarned - totalPaid).toFixed(2));
// Original L1141: Blank line separates related statements for readability.
    
// Original L1142: Returns an object with fields shifts: `empShifts` (emp shifts); payments: `empPayments` (emp payments); totalEarned: `totalEarned` (total earned); totalPaid: `totalPaid` (total paid); balanceOwed: `balanceOwed` (balance owed) to the caller and exits this function.
    return {
// Original L1143: Stores the shifts field with empShifts; this object field is part of the Firestore payload or a domain record used by timekeeper.
      shifts: empShifts,
// Original L1144: Stores the payments field with empPayments; this object field is part of the Firestore payload or a domain record used by timekeeper.
      payments: empPayments,
// Original L1145: Uses the totalEarned, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      totalEarned,
// Original L1146: Uses the totalPaid, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      totalPaid,
// Original L1147: Uses the balanceOwed expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      balanceOwed
// Original L1148: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1149: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1150: Blank line separates related statements for readability.
  
// Original L1151: This comment identifies the following implementation area: IMPORT & EXPORT.
  // IMPORT & EXPORT
// Original L1152: Declares the exportDirectoryData model/store method, exposing this specific timekeeper behavior to its caller.
  exportDirectoryData() {
// Original L1153: Returns an object with fields employees: calls `Object.fromEntries` with `this.employees` (the employees property of this); customers: calls `Object.fromEntries` with `this.customers` (the customers property of this) to the caller and exits this function.
    return {
// Original L1154: Stores the employees field with Object.fromEntries(this.employees); this object field is part of the Firestore payload or a domain record used by timekeeper.
      employees: Object.fromEntries(this.employees),
// Original L1155: Stores the customers field with Object.fromEntries(this.customers); this object field is part of the Firestore payload or a domain record used by timekeeper.
      customers: Object.fromEntries(this.customers)
// Original L1156: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1157: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1158: Blank line separates related statements for readability.
  
// Original L1159: Declares the importDirectoryData operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async importDirectoryData(jsonString) {
// Original L1160: Derives parsed from JSON.parse(jsonString); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const parsed = JSON.parse(jsonString);
// Original L1161: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!parsed || typeof parsed !== 'object' || !parsed.employees || !parsed.customers) {
// Original L1162: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Invalid format. File must contain 'employees' and 'customers'.");
// Original L1163: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1164: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const [id, emp] of Object.entries(parsed.employees)) {
// Original L1165: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
      await setDoc(doc(db, "employees", id), { name: emp.name, wage: emp.wage });
// Original L1166: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1167: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const [id, cust] of Object.entries(parsed.customers)) {
// Original L1168: Derives billingRate from Object.prototype.hasOwnProperty.call(cust, 'billingRate') ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const billingRate = Object.prototype.hasOwnProperty.call(cust, 'billingRate') ?
// Original L1169: Uses the cust.billingRate : expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        cust.billingRate :
// Original L1170: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
        this.customers.get(id)?.billingRate ?? null;
// Original L1171: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
      await setDoc(doc(db, "customers", id), {
// Original L1172: Stores the name field with cust.name; this object field is part of the Firestore payload or a domain record used by timekeeper.
        name: cust.name,
// Original L1173: Stores the location field with cust.location; this object field is part of the Firestore payload or a domain record used by timekeeper.
        location: cust.location,
// Original L1174: Stores the note field with cust.note; this object field is part of the Firestore payload or a domain record used by timekeeper.
        note: cust.note,
// Original L1175: Uses the billingRate expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        billingRate
// Original L1176: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1177: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1178: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.init();
// Original L1179: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1180: Blank line separates related statements for readability.
  
// Original L1181: Declares the exportShiftData model/store method, exposing this specific timekeeper behavior to its caller.
  exportShiftData() {
// Original L1182: Returns transforms each item of `this.shifts` (the shifts property of this) using a callback taking s that an object with fields id: `s.id` (the id property of s); employeeId: checks `s.employee` (the employee property of s); if true chooses `s.employee.id` (the id property of s.employee), otherwise null; custId: checks `s.customer` (the customer property of s); if true chooses `s.customer.id` (the id property of s.customer), otherwise null; clockInTime: checks `s.clockInTime` (the clock in time property of s); if true chooses formats `s.clockInTime` as a UTC ISO date-time string, otherwise null; clockOutTime: checks `s.clockOutTime` (the clock out time property of s); if true chooses formats `s.clockOutTime` as a UTC ISO date-time string, otherwise null; note: uses `s.note` (the note property of s) when it is truthy, otherwise falls back to null; and further fields and returns a new array to the caller and exits this function.
    return this.shifts.map(s => ({
// Original L1183: Stores the id field with s.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
      id: s.id,
// Original L1184: Stores the employeeId field with s.employee ? s.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employeeId: s.employee ? s.employee.id : null,
// Original L1185: Stores the custId field with s.customer ? s.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      custId: s.customer ? s.customer.id : null,
// Original L1186: Stores the clockInTime field with s.clockInTime ? s.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockInTime: s.clockInTime ? s.clockInTime.toISOString() : null,
// Original L1187: Stores the clockOutTime field with s.clockOutTime ? s.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      clockOutTime: s.clockOutTime ? s.clockOutTime.toISOString() : null,
// Original L1188: Stores the note field with s.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      note: s.note || null,
// Original L1189: Stores the isPaid field with s.isPaid || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      isPaid: s.isPaid || null,
// Original L1190: Transforms each entity or nested value into the storage/display shape required by this operation.
      breaks: s.breaks.map(b => ({
// Original L1191: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        start: b.start ? new Date(b.start).toISOString() : null,
// Original L1192: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
        end: b.end ? new Date(b.end).toISOString() : null
// Original L1193: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      })),
// Original L1194: Stores the paidHours field with Number.isFinite(s.paidHours) ? s.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      paidHours: Number.isFinite(s.paidHours) ? s.paidHours : null
// Original L1195: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    }));
// Original L1196: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1197: Blank line separates related statements for readability.
  
// Original L1198: Declares the importShiftData operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async importShiftData(jsonString) {
// Original L1199: Derives parsed from JSON.parse(jsonString); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const parsed = JSON.parse(jsonString);
// Original L1200: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!Array.isArray(parsed)) {
// Original L1201: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error("Invalid format. File must be a JSON list of shifts.");
// Original L1202: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1203: Blank line separates related statements for readability.
    
// Original L1204: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const shiftData of parsed) {
// Original L1205: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
      await setDoc(doc(db, "shifts", shiftData.id), {
// Original L1206: Stores the employeeId field with shiftData.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.
        employeeId: shiftData.employeeId,
// Original L1207: Stores the custId field with shiftData.custId; this object field is part of the Firestore payload or a domain record used by timekeeper.
        custId: shiftData.custId,
// Original L1208: Stores the clockInTime field with shiftData.clockInTime; this object field is part of the Firestore payload or a domain record used by timekeeper.
        clockInTime: shiftData.clockInTime,
// Original L1209: Stores the clockOutTime field with shiftData.clockOutTime; this object field is part of the Firestore payload or a domain record used by timekeeper.
        clockOutTime: shiftData.clockOutTime,
// Original L1210: Stores the note field with shiftData.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        note: shiftData.note || null,
// Original L1211: Stores the isPaid field with shiftData.isPaid; this object field is part of the Firestore payload or a domain record used by timekeeper.
        isPaid: shiftData.isPaid,
// Original L1212: Stores the breaks field with shiftData.breaks || []; this object field is part of the Firestore payload or a domain record used by timekeeper.
        breaks: shiftData.breaks || [],
// Original L1213: Stores the paidHours field with shiftData.paidHours ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
        paidHours: shiftData.paidHours ?? null
// Original L1214: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1215: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1216: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.loadShifts();
// Original L1217: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1218: Blank line separates related statements for readability.
  
// Original L1219: Declares the exportFullBackup model/store method, exposing this specific timekeeper behavior to its caller.
  exportFullBackup() {
// Original L1220: Derives copy from value => JSON.parse(JSON.stringify(value)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const copy = value => JSON.parse(JSON.stringify(value));
// Original L1221: Returns an object with fields format: "timekeeper-full-backup"; schemaVersion: 1; exportedAt: formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; data: an object with fields employees: transforms each item of an array containing the expanded entries/properties from `this.employees.values()` using a callback taking employee that an object with fields id: `employee.id`; name: `employee.name`; wage: `employee.wage` and returns a new array; customers: transforms each item of an array containing the expanded entries/properties from `this.customers.values()` using a callback taking customer that an object with fields id: `customer.id`; name: `customer.name`; location: `customer.location || null`; note: `customer.note || null`; billingRate: `customer.billingRate ?? null` and returns a new array; shifts: transforms each item of `this.shifts` (the shifts property of this) using a callback taking shift that an object with fields id: `shift.id`; employeeId: `shift.employee?.id || null`; custId: `shift.customer?.id || null`; clockInTime: `shift.clockInTime?.toISOString?.() || null`; clockOutTime: `shift.clockOutTime?.toISOString?.() || null`; note: `shift.note || null`; and further fields and returns a new array; invoices: transforms each item of `this.invoices` (the invoices property of this) using a callback taking invoice that an object with fields id: `invoice.id`; custId: `invoice.customer?.id || null`; items: `copy(invoice.items || [])`; isPaid: `Boolean(invoice.isPaid)`; date: `invoice.date || null`; shiftIds: `[...invoiceShiftIds(invoice)]` and returns a new array; payments: transforms each item of `this.payments` (the payments property of this) using a callback taking payment that an object with fields id: `payment.id`; employeeId: `payment.employeeId || null`; amount: `payment.amount`; date: `payment.date?.toISOString?.() || null`; note: `payment.note || ''` and returns a new array; plannedJobs: transforms each item of `this.plannedJobs` (the planned jobs property of this) using a callback taking job that an object with fields id: `job.id`; custId: `job.customer?.id || null`; description: `job.description || ''`; isComplete: `Boolean(job.isComplete)`; scheduledDate: `job.scheduledDate?.toISOString?.() || null` and returns a new array; and further fields to the caller and exits this function.
    return {
// Original L1222: Stores the format field with 'timekeeper-full-backup'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      format: 'timekeeper-full-backup',
// Original L1223: Stores the schemaVersion field with 1; this object field is part of the Firestore payload or a domain record used by timekeeper.
      schemaVersion: 1,
// Original L1224: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      exportedAt: new Date().toISOString(),
// Original L1225: Stores the data field with {; this object field is part of the Firestore payload or a domain record used by timekeeper.
      data: {
// Original L1226: Transforms each entity or nested value into the storage/display shape required by this operation.
        employees: [...this.employees.values()].map(employee => ({
// Original L1227: Stores the id field with employee.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: employee.id,
// Original L1228: Stores the name field with employee.name; this object field is part of the Firestore payload or a domain record used by timekeeper.
          name: employee.name,
// Original L1229: Stores the wage field with employee.wage; this object field is part of the Firestore payload or a domain record used by timekeeper.
          wage: employee.wage
// Original L1230: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1231: Transforms each entity or nested value into the storage/display shape required by this operation.
        customers: [...this.customers.values()].map(customer => ({
// Original L1232: Stores the id field with customer.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: customer.id,
// Original L1233: Stores the name field with customer.name; this object field is part of the Firestore payload or a domain record used by timekeeper.
          name: customer.name,
// Original L1234: Stores the location field with customer.location || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          location: customer.location || null,
// Original L1235: Stores the note field with customer.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          note: customer.note || null,
// Original L1236: Stores the billingRate field with customer.billingRate ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          billingRate: customer.billingRate ?? null
// Original L1237: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1238: Transforms each entity or nested value into the storage/display shape required by this operation.
        shifts: this.shifts.map(shift => ({
// Original L1239: Stores the id field with shift.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: shift.id,
// Original L1240: Stores the employeeId field with shift.employee?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          employeeId: shift.employee?.id || null,
// Original L1241: Stores the custId field with shift.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          custId: shift.customer?.id || null,
// Original L1242: Stores the clockInTime field with shift.clockInTime?.toISOString?.() || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          clockInTime: shift.clockInTime?.toISOString?.() || null,
// Original L1243: Stores the clockOutTime field with shift.clockOutTime?.toISOString?.() || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          clockOutTime: shift.clockOutTime?.toISOString?.() || null,
// Original L1244: Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          note: shift.note || null,
// Original L1245: Stores the isPaid field with Boolean(shift.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.
          isPaid: Boolean(shift.isPaid),
// Original L1246: Transforms each entity or nested value into the storage/display shape required by this operation.
          breaks: (shift.breaks || []).map(item => ({
// Original L1247: Stores the start field with item.start?.toISOString?.() || item.start || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
            start: item.start?.toISOString?.() || item.start || null,
// Original L1248: Stores the end field with item.end?.toISOString?.() || item.end || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
            end: item.end?.toISOString?.() || item.end || null
// Original L1249: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          })),
// Original L1250: Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
// Original L1251: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1252: Transforms each entity or nested value into the storage/display shape required by this operation.
        invoices: this.invoices.map(invoice => ({
// Original L1253: Stores the id field with invoice.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: invoice.id,
// Original L1254: Stores the custId field with invoice.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          custId: invoice.customer?.id || null,
// Original L1255: Stores the items field with copy(invoice.items || []); this object field is part of the Firestore payload or a domain record used by timekeeper.
          items: copy(invoice.items || []),
// Original L1256: Stores the isPaid field with Boolean(invoice.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.
          isPaid: Boolean(invoice.isPaid),
// Original L1257: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          date: invoice.date || null,
// Original L1258: Stores the shiftIds field with [...invoiceShiftIds(invoice)]; this object field is part of the Firestore payload or a domain record used by timekeeper.
          shiftIds: [...invoiceShiftIds(invoice)]
// Original L1259: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1260: Transforms each entity or nested value into the storage/display shape required by this operation.
        payments: this.payments.map(payment => ({
// Original L1261: Stores the id field with payment.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: payment.id,
// Original L1262: Stores the employeeId field with payment.employeeId || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          employeeId: payment.employeeId || null,
// Original L1263: Stores the amount field with payment.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.
          amount: payment.amount,
// Original L1264: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          date: payment.date?.toISOString?.() || null,
// Original L1265: Stores the note field with payment.note || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.
          note: payment.note || ''
// Original L1266: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1267: Transforms each entity or nested value into the storage/display shape required by this operation.
        plannedJobs: this.plannedJobs.map(job => ({
// Original L1268: Stores the id field with job.id; this object field is part of the Firestore payload or a domain record used by timekeeper.
          id: job.id,
// Original L1269: Stores the custId field with job.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.
          custId: job.customer?.id || null,
// Original L1270: Stores the description field with job.description || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.
          description: job.description || '',
// Original L1271: Stores the isComplete field with Boolean(job.isComplete); this object field is part of the Firestore payload or a domain record used by timekeeper.
          isComplete: Boolean(job.isComplete),
// Original L1272: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          scheduledDate: job.scheduledDate?.toISOString?.() || null
// Original L1273: Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        })),
// Original L1274: Transforms each entity or nested value into the storage/display shape required by this operation.
        ledger: this.ledger.entries.map(entry => ({ ...entry })),
// Original L1275: Transforms each entity or nested value into the storage/display shape required by this operation.
        ledgerArchives: this.ledgerArchives.map(archive => ({ ...archive, entryIds: [...(archive.entryIds || [])] })),
// Original L1276: Transforms each entity or nested value into the storage/display shape required by this operation.
        ledgerArchiveRows: this.ledgerArchiveRows.map(row => ({ ...row }))
// Original L1277: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1278: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1279: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1280: Blank line separates related statements for readability.
  
// Original L1281: Declares the previewFullBackup model/store method, exposing this specific timekeeper behavior to its caller.
  previewFullBackup(backup) {
// Original L1282: Derives keys from ['employees', 'customers', 'shifts', 'invoices', 'payments', 'plannedJobs', 'ledger']; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const keys = ['employees', 'customers', 'shifts', 'invoices', 'payments', 'plannedJobs', 'ledger'];
// Original L1283: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!backup || typeof backup !== 'object' || backup.format !== 'timekeeper-full-backup' || backup.schemaVersion !== 1) {
// Original L1284: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('This is not a supported Timekeeper backup (expected schema version 1).');
// Original L1285: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1286: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!backup.data || typeof backup.data !== 'object' || keys.some(key => !Array.isArray(backup.data[key]))) {
// Original L1287: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('The backup is incomplete. It must contain employees, customers, shifts, invoices, payments, planned jobs, and ledger records.');
// Original L1288: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1289: Derives hasArchiveHeaders from Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchives'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const hasArchiveHeaders = Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchives');
// Original L1290: Derives hasArchiveRows from Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchiveRows'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const hasArchiveRows = Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchiveRows');
// Original L1291: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (hasArchiveHeaders !== hasArchiveRows ||
// Original L1292: Uses the (hasArchiveHeaders && (!Array.isArray(backup.data.ledgerArchives) || !Array.isArray(backup.data.ledgerArchiveRows)))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      (hasArchiveHeaders && (!Array.isArray(backup.data.ledgerArchives) || !Array.isArray(backup.data.ledgerArchiveRows)))) {
// Original L1293: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error('The archived-ledger data is incomplete. Include both archive headers and archive entries.');
// Original L1294: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1295: Derives archiveKeys from hasArchiveHeaders ? ['ledgerArchives', 'ledgerArchiveRows'] : []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const archiveKeys = hasArchiveHeaders ? ['ledgerArchives', 'ledgerArchiveRows'] : [];
// Original L1296: Derives validatedKeys from [...keys, ...archiveKeys]; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const validatedKeys = [...keys, ...archiveKeys];
// Original L1297: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const key of validatedKeys) {
// Original L1298: Derives ids from new Set(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const ids = new Set();
// Original L1299: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
      for (const [index, record] of backup.data[key].entries()) {
// Original L1300: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (!record || typeof record !== 'object' || typeof record.id !== 'string' || !record.id.trim() || record.id.includes('/')) {
// Original L1301: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
          throw new Error(`The ${key} list has an invalid record at row ${index + 1}.`);
// Original L1302: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
        }
// Original L1303: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (ids.has(record.id)) throw new Error(`The ${key} list contains duplicate ID ${record.id}.`);
// Original L1304: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        ids.add(record.id);
// Original L1305: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1306: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1307: Blank line separates related statements for readability.
    
// Original L1308: Derives validDateOrNull from value => value === null || value === undefined ||; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const validDateOrNull = value => value === null || value === undefined ||
// Original L1309: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      (typeof value === 'string' && value.length > 0 && !Number.isNaN(Date.parse(value)));
// Original L1310: Derives finiteOrNull from value => value === null || value === undefined || Number.isFinite(Number(value)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const finiteOrNull = value => value === null || value === undefined || Number.isFinite(Number(value));
// Original L1311: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const employee of backup.data.employees) {
// Original L1312: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (typeof employee.name !== 'string' || typeof employee.wage !== 'number' || !Number.isFinite(employee.wage) || employee.wage < 0) {
// Original L1313: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Employee ${employee.id} needs a name and a non-negative wage.`);
// Original L1314: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1315: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1316: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const customer of backup.data.customers) {
// Original L1317: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (typeof customer.name !== 'string' || !finiteOrNull(customer.billingRate) ||
// Original L1318: Uses the (customer.billingRate !== null && customer.billingRate !== undefined && expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        (customer.billingRate !== null && customer.billingRate !== undefined &&
// Original L1319: Uses the (typeof customer.billingRate !== 'number' || customer.billingRate < 0))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          (typeof customer.billingRate !== 'number' || customer.billingRate < 0))) {
// Original L1320: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Customer ${customer.id} has invalid name or billing-rate data.`);
// Original L1321: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1322: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1323: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const shift of backup.data.shifts) {
// Original L1324: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (!validDateOrNull(shift.clockInTime) || !validDateOrNull(shift.clockOutTime) ||
// Original L1325: Uses the !Array.isArray(shift.breaks || []) || !finiteOrNull(shift.paidHours) || typeof shift.isPaid !== 'boolean' || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        !Array.isArray(shift.breaks || []) || !finiteOrNull(shift.paidHours) || typeof shift.isPaid !== 'boolean' ||
// Original L1326: Uses the (shift.paidHours !== null && shift.paidHours !== undefined && typeof shift.paidHours !== 'number') || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        (shift.paidHours !== null && shift.paidHours !== undefined && typeof shift.paidHours !== 'number') ||
// Original L1327: Uses the (shift.breaks || []).some(item => !item || typeof item !== 'object' || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        (shift.breaks || []).some(item => !item || typeof item !== 'object' ||
// Original L1328: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          !validDateOrNull(item.start) || !validDateOrNull(item.end))) {
// Original L1329: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Shift ${shift.id} has invalid date, break, or paid-hours data.`);
// Original L1330: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1331: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1332: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const invoice of backup.data.invoices) {
// Original L1333: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (!Array.isArray(invoice.items) || !validDateOrNull(invoice.date) || typeof invoice.isPaid !== 'boolean' ||
// Original L1334: Uses the invoice.items.some(item => !item || typeof item.name !== 'string' || typeof item.value !== 'number' || !Number.isFinite(item.value))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
        invoice.items.some(item => !item || typeof item.name !== 'string' || typeof item.value !== 'number' || !Number.isFinite(item.value))) {
// Original L1335: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Invoice ${invoice.id} has invalid item or date data.`);
// Original L1336: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1337: Derives laborShiftIds from invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const laborShiftIds = invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId));
// Original L1338: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (new Set(laborShiftIds).size !== laborShiftIds.length) {
// Original L1339: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Invoice ${invoice.id} attaches the same shift more than once.`);
// Original L1340: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1341: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1342: Derives shiftOwners from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const shiftOwners = new Map();
// Original L1343: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const invoice of backup.data.invoices) {
// Original L1344: Derives linkedIds from new Set([...(Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []),; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const linkedIds = new Set([...(Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []),
// Original L1345: Transforms each entity or nested value into the storage/display shape required by this operation.
        ...invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId))
// Original L1346: Transforms each entity or nested value into the storage/display shape required by this operation.
      ].map(String));
// Original L1347: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
      for (const shiftId of linkedIds) {
// Original L1348: Derives owner from shiftOwners.get(shiftId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const owner = shiftOwners.get(shiftId);
// Original L1349: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (owner && owner !== invoice.id) throw new Error(`Shift ${shiftId} is attached to more than one invoice in this backup.`);
// Original L1350: Invokes shiftOwners.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        shiftOwners.set(shiftId, invoice.id);
// Original L1351: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1352: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1353: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const payment of backup.data.payments) {
// Original L1354: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (typeof payment.amount !== 'number' || !Number.isFinite(payment.amount) || !validDateOrNull(payment.date)) {
// Original L1355: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Payment ${payment.id} has invalid amount or date data.`);
// Original L1356: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1357: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1358: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
    for (const job of backup.data.plannedJobs) {
// Original L1359: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (typeof job.description !== 'string' || !validDateOrNull(job.scheduledDate) || typeof job.isComplete !== 'boolean') {
// Original L1360: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error(`Planned job ${job.id} has invalid description or date data.`);
// Original L1361: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1362: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1363: Blank line separates related statements for readability.

// Original L1364: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (hasArchiveHeaders) {
// Original L1365: Derives archiveById from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const archiveById = new Map();
// Original L1366: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
      for (const archive of backup.data.ledgerArchives) {
// Original L1367: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (typeof archive.employeeId !== 'string' || typeof archive.employeeName !== 'string' ||
// Original L1368: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
          !validDateOrNull(archive.archivedAt) || typeof archive.balanceCents !== 'number' ||
// Original L1369: Uses the !Number.isFinite(archive.balanceCents) || archive.balanceCents !== 0 || !Number.isInteger(archive.entryCount) || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          !Number.isFinite(archive.balanceCents) || archive.balanceCents !== 0 || !Number.isInteger(archive.entryCount) ||
// Original L1370: Uses the archive.entryCount < 1 || !Array.isArray(archive.entryIds) || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          archive.entryCount < 1 || !Array.isArray(archive.entryIds) ||
// Original L1371: Uses the !['pending', 'archived'].includes(archive.status) || archive.entryIds.length !== archive.entryCount || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
          !['pending', 'archived'].includes(archive.status) || archive.entryIds.length !== archive.entryCount ||
// Original L1372: Transforms each entity or nested value into the storage/display shape required by this operation.
          new Set(archive.entryIds.map(String)).size !== archive.entryIds.length) {
// Original L1373: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
          throw new Error(`Ledger archive ${archive.id} has invalid summary data.`);
// Original L1374: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
        }
// Original L1375: Invokes archiveById.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        archiveById.set(archive.id, archive);
// Original L1376: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1377: Derives entryIdsByArchive from new Map([...archiveById].map(([id, archive]) => [id, new Set(archive.entryIds.map(String))])); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const entryIdsByArchive = new Map([...archiveById].map(([id, archive]) => [id, new Set(archive.entryIds.map(String))]));
// Original L1378: Derives archivedEntryIds from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const archivedEntryIds = new Map();
// Original L1379: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
      for (const row of backup.data.ledgerArchiveRows) {
// Original L1380: Derives archive from archiveById.get(row.archiveId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const archive = archiveById.get(row.archiveId);
// Original L1381: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (!archive || typeof row.sourceEntryId !== 'string' || row.employeeId !== archive.employeeId ||
// Original L1382: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
          !entryIdsByArchive.get(row.archiveId).has(row.sourceEntryId) || !Number.isFinite(Number(row.amount)) ||
// Original L1383: Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.
          !Number.isFinite(Number(row.hours))) {
// Original L1384: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
          throw new Error(`Archived ledger entry ${row.id} has invalid or unmatched data.`);
// Original L1385: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
        }
// Original L1386: Derives key from `${row.archiveId}:${row.sourceEntryId}`; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const key = `${row.archiveId}:${row.sourceEntryId}`;
// Original L1387: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (archivedEntryIds.has(key)) throw new Error(`Ledger archive ${row.archiveId} contains duplicate entry ${row.sourceEntryId}.`);
// Original L1388: Invokes archivedEntryIds.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
        archivedEntryIds.set(key, true);
// Original L1389: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1390: Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.
      for (const archive of backup.data.ledgerArchives) {
// Original L1391: Derives storedCount from archive.entryIds.filter(entryId => archivedEntryIds.has(`${archive.id}:${String(entryId)}`)).length; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const storedCount = archive.entryIds.filter(entryId => archivedEntryIds.has(`${archive.id}:${String(entryId)}`)).length;
// Original L1392: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (archive.status === 'archived' && storedCount !== archive.entryCount) {
// Original L1393: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
          throw new Error(`Ledger archive ${archive.id} is missing archived entries.`);
// Original L1394: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
        }
// Original L1395: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1396: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1397: Blank line separates related statements for readability.
    
// Original L1398: Returns an object with fields format: `backup.format` (the format property of backup); schemaVersion: `backup.schemaVersion` (the schema version property of backup); exportedAt: checks calls `validDateOrNull` with `backup.exportedAt` (the exported at property of backup); if true chooses `backup.exportedAt` (the exported at property of backup), otherwise null; counts: calls `Object.fromEntries` with transforms each item of `validatedKeys` (validated keys) using a callback taking key that an array containing `key` (key), `backup.data[key].length` and returns a new array; archiveHistoryIncluded: `hasArchiveHeaders` (has archive headers) to the caller and exits this function.
    return {
// Original L1399: Stores the format field with backup.format; this object field is part of the Firestore payload or a domain record used by timekeeper.
      format: backup.format,
// Original L1400: Stores the schemaVersion field with backup.schemaVersion; this object field is part of the Firestore payload or a domain record used by timekeeper.
      schemaVersion: backup.schemaVersion,
// Original L1401: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      exportedAt: validDateOrNull(backup.exportedAt) ? backup.exportedAt : null,
// Original L1402: Transforms each entity or nested value into the storage/display shape required by this operation.
      counts: Object.fromEntries(validatedKeys.map(key => [key, backup.data[key].length])),
// Original L1403: Stores the archiveHistoryIncluded field with hasArchiveHeaders; this object field is part of the Firestore payload or a domain record used by timekeeper.
      archiveHistoryIncluded: hasArchiveHeaders
// Original L1404: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1405: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1406: Blank line separates related statements for readability.
  
// Original L1407: Declares the restoreFullBackup operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async restoreFullBackup(backup) {
// Original L1408: Derives preview from this.previewFullBackup(backup); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const preview = this.previewFullBackup(backup);
// Original L1409: Derives collectionByKey from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const collectionByKey = {
// Original L1410: Stores the employees field with 'employees'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      employees: 'employees',
// Original L1411: Stores the customers field with 'customers'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      customers: 'customers',
// Original L1412: Stores the shifts field with 'shifts'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      shifts: 'shifts',
// Original L1413: Stores the invoices field with 'invoices'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      invoices: 'invoices',
// Original L1414: Stores the payments field with 'payments'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      payments: 'payments',
// Original L1415: Stores the plannedJobs field with 'planned'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      plannedJobs: 'planned',
// Original L1416: Stores the ledger field with 'ledgerRows'; this object field is part of the Firestore payload or a domain record used by timekeeper.
      ledger: 'ledgerRows'
// Original L1417: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1418: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (preview.archiveHistoryIncluded) {
// Original L1419: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      collectionByKey.ledgerArchives = 'ledgerArchives';
// Original L1420: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
      collectionByKey.ledgerArchiveRows = 'ledgerArchiveRows';
// Original L1421: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1422: Derives snapshots from await Promise.all(Object.values(collectionByKey).map(name => getDocs(collection(db, name)))); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const snapshots = await Promise.all(Object.values(collectionByKey).map(name => getDocs(collection(db, name))));
// Original L1423: Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const batch = writeBatch(db);
// Original L1424: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    let operationCount = 0;
// Original L1425: Blank line separates related statements for readability.
    
// Original L1426: Uses the Object.entries(collectionByKey).forEach(([key, collectionName], index) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    Object.entries(collectionByKey).forEach(([key, collectionName], index) => {
// Original L1427: Derives savedRecords from backup.data[key]; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const savedRecords = backup.data[key];
// Original L1428: Derives savedIds from new Set(savedRecords.map(record => record.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const savedIds = new Set(savedRecords.map(record => record.id));
// Original L1429: Uses the snapshots[index].forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      snapshots[index].forEach(docSnap => {
// Original L1430: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (!savedIds.has(docSnap.id)) {
// Original L1431: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
          batch.delete(doc(db, collectionName, docSnap.id));
// Original L1432: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
          operationCount += 1;
// Original L1433: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
        }
// Original L1434: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1435: Uses the savedRecords.forEach(record => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      savedRecords.forEach(record => {
// Original L1436: Derives { id, ...documentData } from record; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const { id, ...documentData } = record;
// Original L1437: Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.
        batch.set(doc(db, collectionName, id), documentData);
// Original L1438: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
        operationCount += 1;
// Original L1439: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1440: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L1441: Blank line separates related statements for readability.
    
// Original L1442: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (operationCount > 500) {
// Original L1443: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
      throw new Error(`This restore needs ${operationCount} Firestore writes; one atomic restore is limited to 500. No data was changed.`);
// Original L1444: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1445: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (operationCount) await commitBatch(batch, 'Restoring the selected backup failed.');
// Original L1446: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
    await this.init();
// Original L1447: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1448: Blank line separates related statements for readability.
  
// Original L1449: Blank line separates related statements for readability.
  
// Original L1450: This comment identifies the following implementation area: PLANNED JOBS.
  // PLANNED JOBS
// Original L1451: Declares the loadPlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async loadPlanned() {
// Original L1452: Sets this object’s plannedJobs (future customer work items) from [], keeping in-memory state aligned with the entity’s business meaning.
    this.plannedJobs = [];
// Original L1453: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L1454: Derives querySnapshot from await getDocs(collection(db, "planned")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
      const querySnapshot = await getDocs(collection(db, "planned"));
// Original L1455: Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
      querySnapshot.forEach((docSnap) => {
// Original L1456: Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const data = docSnap.data();
// Original L1457: Derives customer from (data.custId && this.customers.get(data.custId)) ||; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const customer = (data.custId && this.customers.get(data.custId)) ||
// Original L1458: Invokes  for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.
          (data.custId ? new Customer(data.custId, 'Unknown Site') : null);
// Original L1459: Derives storedDate from data.scheduledDate?.toDate?.() || data.scheduledDate || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const storedDate = data.scheduledDate?.toDate?.() || data.scheduledDate || null;
// Original L1460: Derives planned from new PlannedJob(data.description, storedDate, customer, data.isComplete, docSnap.id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const planned = new PlannedJob(data.description, storedDate, customer, data.isComplete, docSnap.id);
// Original L1461: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
        this.plannedJobs.push(planned);
// Original L1462: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1463: Sets this object’s plannedJobs.sort((a, b) (domain state) from > {, keeping in-memory state aligned with the entity’s business meaning.
      this.plannedJobs.sort((a, b) => {
// Original L1464: Derives dateA from a.scheduledDate?.getTime() ?? null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const dateA = a.scheduledDate?.getTime() ?? null;
// Original L1465: Derives dateB from b.scheduledDate?.getTime() ?? null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
        const dateB = b.scheduledDate?.getTime() ?? null;
// Original L1466: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (dateA === null && dateB !== null) return 1;
// Original L1467: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
        if (dateA !== null && dateB === null) return -1;
// Original L1468: Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.
        return (dateA ?? 0) - (dateB ?? 0);
// Original L1469: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      });
// Original L1470: Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (e) {
// Original L1471: Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.
      console.error("Error loading planned jobs from Firestore:", e);
// Original L1472: Adds the newly created timekeeper record to the in-memory collection after the relevant checks.
      this.loadFailures.push(e);
// Original L1473: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1474: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1475: Blank line separates related statements for readability.
  
// Original L1476: Declares the savePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async savePlanned(planned) {
// Original L1477: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
    let scheduledDate = null;
// Original L1478: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (planned.scheduledDate !== null && planned.scheduledDate !== undefined && planned.scheduledDate !== '') {
// Original L1479: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      scheduledDate = planned.scheduledDate instanceof Date ? planned.scheduledDate : new Date(planned.scheduledDate);
// Original L1480: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
      if (Number.isNaN(scheduledDate.getTime())) {
// Original L1481: Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.
        throw new Error("Planned job needs a valid scheduled date or no date.");
// Original L1482: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
      }
// Original L1483: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1484: Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.
    await setDoc(doc(db, "planned", planned.id), {
// Original L1485: Stores the custId field with planned.customer ? planned.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.
      custId: planned.customer ? planned.customer.id : null,
// Original L1486: Stores the description field with planned.description || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.
      description: planned.description || '',
// Original L1487: Stores the isComplete field with Boolean(planned.isComplete); this object field is part of the Firestore payload or a domain record used by timekeeper.
      isComplete: Boolean(planned.isComplete),
// Original L1488: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      scheduledDate
// Original L1489: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    });
// Original L1490: Returns `planned` (planned) to the caller and exits this function.
    return planned;
// Original L1491: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1492: Blank line separates related statements for readability.
  
// Original L1493: Declares the setPlannedComplete operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async setPlannedComplete(plannedId, isComplete) {
// Original L1494: Derives planned from this.plannedJobs.find(job => job.id === plannedId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const planned = this.plannedJobs.find(job => job.id === plannedId);
// Original L1495: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!planned) throw new Error("Planned job not found.");
// Original L1496: Derives previousValue from planned.isComplete; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previousValue = planned.isComplete;
// Original L1497: Updates planned.isComplete to Boolean(isComplete); this keeps the in-memory record or error metadata consistent after the Firestore operation.
    planned.isComplete = Boolean(isComplete);
// Original L1498: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L1499: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
      await this.savePlanned(planned);
// Original L1500: Returns `planned` (planned) to the caller and exits this function.
      return planned;
// Original L1501: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L1502: Updates planned.isComplete to previousValue; this keeps the in-memory record or error metadata consistent after the Firestore operation.
      planned.isComplete = previousValue;
// Original L1503: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L1504: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1505: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1506: Blank line separates related statements for readability.
  
// Original L1507: Declares the updatePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async updatePlanned(plannedId, description, scheduledDate, customer) {
// Original L1508: Derives planned from this.plannedJobs.find(job => job.id === plannedId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const planned = this.plannedJobs.find(job => job.id === plannedId);
// Original L1509: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!planned) throw new Error("Planned job not found.");
// Original L1510: Derives cleanDescription from String(description || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const cleanDescription = String(description || '').trim();
// Original L1511: Derives nextDate from scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const nextDate = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
// Original L1512: Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.
      null :
// Original L1513: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
// Original L1514: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!cleanDescription) throw new Error("Add a job description before saving.");
// Original L1515: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (nextDate && Number.isNaN(nextDate.getTime())) throw new Error("Planned job needs a valid scheduled date or no date.");
// Original L1516: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
    if (!customer) throw new Error("Choose a customer before saving this job.");
// Original L1517: Blank line separates related statements for readability.
    
// Original L1518: Derives previous from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const previous = {
// Original L1519: Stores the description field with planned.description; this object field is part of the Firestore payload or a domain record used by timekeeper.
      description: planned.description,
// Original L1520: Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.
      scheduledDate: planned.scheduledDate,
// Original L1521: Stores the customer field with planned.customer; this object field is part of the Firestore payload or a domain record used by timekeeper.
      customer: planned.customer
// Original L1522: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    };
// Original L1523: Updates planned.description to cleanDescription; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    planned.description = cleanDescription;
// Original L1524: Updates planned.scheduledDate to nextDate; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    planned.scheduledDate = nextDate;
// Original L1525: Updates planned.customer to customer; this keeps the in-memory record or error metadata consistent after the Firestore operation.
    planned.customer = customer;
// Original L1526: Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    try {
// Original L1527: Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.
      await this.savePlanned(planned);
// Original L1528: Returns `planned` (planned) to the caller and exits this function.
      return planned;
// Original L1529: Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
    } catch (error) {
// Original L1530: Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.
      Object.assign(planned, previous);
// Original L1531: Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.
      throw error;
// Original L1532: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
    }
// Original L1533: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1534: Blank line separates related statements for readability.
  
// Original L1535: Declares the deletePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.
  async deletePlanned(plannedId) {
// Original L1536: Deletes the corresponding Firestore document so the remote record matches the local removal.
    await deleteDoc(doc(db, "planned", plannedId));
// Original L1537: Sets this object’s plannedJobs (future customer work items) from this.plannedJobs.filter(job => job.id !== plannedId), keeping in-memory state aligned with the entity’s business meaning.
    this.plannedJobs = this.plannedJobs.filter(job => job.id !== plannedId);
// Original L1538: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  }
// Original L1539: Blank line separates related statements for readability.
  
// Original L1540: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L1541: Blank line separates related statements for readability.

// Original L1542: Creates the singleton store shared by the UI modules.
export const store = new AppDataStore();
// Original L1543: Blank line separates related statements for readability.

// Original L1544: Creates a locale-aware collator that ignores case and naturally orders numeric portions of names.
const nameCollator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
// Original L1545: Blank line separates related statements for readability.

// Original L1546: Exports employee/customer sorting by first name, with a full-name tie-breaker.
export function compareByFirstName(a, b) {
// Original L1547: Derives nameA from String(a?.name || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const nameA = String(a?.name || '').trim();
// Original L1548: Derives nameB from String(b?.name || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const nameB = String(b?.name || '').trim();
// Original L1549: Derives firstA from nameA.split(/\s+/)[0] || ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const firstA = nameA.split(/\s+/)[0] || '';
// Original L1550: Derives firstB from nameB.split(/\s+/)[0] || ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
  const firstB = nameB.split(/\s+/)[0] || '';
// Original L1551: Returns uses calls `nameCollator.compare` with `firstA` (first a); `firstB` (first b) when it is truthy, otherwise falls back to calls `nameCollator.compare` with `nameA` (name a); `nameB` (name b) to the caller and exits this function.
  return nameCollator.compare(firstA, firstB) || nameCollator.compare(nameA, nameB);
// Original L1552: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L1553: Blank line separates related statements for readability.

// Original L1554: Exports a helper that repopulates an employee select element from the current store.
export function populateEmployeeDropdowns(empDropdownElement) {
// Original L1555: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
  if (!empDropdownElement) return;
// Original L1556: Updates visible DOM text/options so the interface reflects the current error or entity selection.
  empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
// Original L1557: Uses the [...store.employees.values()].sort(compareByFirstName).forEach((emp) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  [...store.employees.values()].sort(compareByFirstName).forEach((emp) => {
// Original L1558: Derives opt from document.createElement('option'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const opt = document.createElement('option');
// Original L1559: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    opt.value = emp.id;
// Original L1560: Updates visible DOM text/options so the interface reflects the current error or entity selection.
    opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
// Original L1561: Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.
    empDropdownElement.appendChild(opt);
// Original L1562: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  });
// Original L1563: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
// Original L1564: Blank line separates related statements for readability.

// Original L1565: Exports the analogous helper for customer/site select elements.
export function populateCustomerDropdowns(custDropdownElement) {
// Original L1566: Guards this operation so invalid state or missing timekeeper data is handled before the next business step.
  if (!custDropdownElement) return;
// Original L1567: Updates visible DOM text/options so the interface reflects the current error or entity selection.
  custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
// Original L1568: Uses the [...store.customers.values()].sort(compareByFirstName).forEach((cust) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.
  [...store.customers.values()].sort(compareByFirstName).forEach((cust) => {
// Original L1569: Derives opt from document.createElement('option'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.
    const opt = document.createElement('option');
// Original L1570: Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.
    opt.value = cust.id;
// Original L1571: Updates visible DOM text/options so the interface reflects the current error or entity selection.
    opt.textContent = cust.customInfo();
// Original L1572: Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.
    custDropdownElement.appendChild(opt);
// Original L1573: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
  });
// Original L1574: Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
}
