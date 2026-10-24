# scripts/models.js

[Exact copy](../../original/scripts/models.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import {
```

Imports timekeeper domain helpers so this model layer can reuse shift-hour calculation, invoice linkage checks, quarter-hour rounding, ledger-row construction, and cent-accurate balance logic.

### Line 2

```text
  actualShiftHours,
```

Uses the actualShiftHours, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 3

```text
  invoiceShiftIds,
```

Uses the invoiceShiftIds, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 4

```text
  roundDown15Minutes,
```

Uses the roundDown15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 5

```text
  roundTo15Minutes,
```

Uses the roundTo15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 6

```text
  roundUp15Minutes,
```

Uses the roundUp15Minutes, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 7

```text
  shiftIsAttachedElsewhere,
```

Uses the shiftIsAttachedElsewhere, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 8

```text
  makeShiftLedgerEntryData,
```

Uses the makeShiftLedgerEntryData, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 9

```text
  ledgerBalanceCents
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 10

```text
} from './domain.mjs';
```

Ends the domain-helper import; all helpers above come from the application domain module.

### Line 11

```text

```

Blank line separates related statements for readability.

### Line 12

```text
/*
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 13

```text
  Firebase Setup
```

Labels the Firebase connection section; the following imports and configuration establish this app’s Firestore client.

### Line 14

```text
*/
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 15

```text

```

Blank line separates related statements for readability.

### Line 16

```text
// 1. Import Firebase & Firestore Modular SDKs (CDN Links)
```

This comment identifies the following implementation area: 1. Import Firebase & Firestore Modular SDKs (CDN Links).

### Line 17

```text
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
```

Loads Firebase App initialization from the pinned browser CDN module.

### Line 18

```text
import {
```

Imports the named dependency so this module can use the referenced API or domain behavior.

### Line 19

```text
  getFirestore,
```

Imports Firestore factory and collection/document read-write primitives from Firebase’s modular browser SDK.

### Line 20

```text
  collection,
```

Uses the collection, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 21

```text
  setDoc as firestoreSetDoc,
```

Uses the setDoc as firestoreSetDoc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 22

```text
  getDocs as firestoreGetDocs,
```

Uses the getDocs as firestoreGetDocs, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 23

```text
  doc,
```

Uses the doc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 24

```text
  updateDoc as firestoreUpdateDoc,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 25

```text
  deleteDoc as firestoreDeleteDoc,
```

Uses the deleteDoc as firestoreDeleteDoc, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 26

```text
  writeBatch
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 27

```text
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
```

Ends the Firestore SDK import; aliases below distinguish wrapped operations from raw SDK functions.

### Line 28

```text

```

Blank line separates related statements for readability.

### Line 29

```text
// 2. Your web app's Firebase configuration
```

This comment identifies the following implementation area: 2. Your web app's Firebase configuration.

### Line 30

```text
const firebaseConfig = {
```

Defines the Firebase project settings used to connect this browser app to its timekeeper backend.

### Line 31

```text
  apiKey: "AIzaSyDn_y846YGhK689a3-2S6VvO46uElD1JXw",
```

Supplies the Firebase web API key identifying this app configuration to Firebase (not employee data).

### Line 32

```text
  authDomain: "timekeeper-ad253.firebaseapp.com",
```

Names the Firebase Auth/hosting domain associated with the timekeeper project.

### Line 33

```text
  projectId: "timekeeper-ad253",
```

Selects the Firestore project whose collections store employees, shifts, invoices, and other records.

### Line 34

```text
  storageBucket: "timekeeper-ad253.firebasestorage.app",
```

Identifies the project storage bucket, although this model file primarily uses Firestore.

### Line 35

```text
  messagingSenderId: "516577372091",
```

Identifies the Firebase messaging sender for the web app configuration.

### Line 36

```text
  appId: "1:516577372091:web:3bb56f8017058ffcd9869e"
```

Identifies this particular web app instance within the Firebase project.

### Line 37

```text
};
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 38

```text

```

Blank line separates related statements for readability.

### Line 39

```text
// 3. Initialize Firebase & Firestore
```

This comment identifies the following implementation area: 3. Initialize Firebase & Firestore.

### Line 40

```text
const app = initializeApp(firebaseConfig);
```

Initializes the Firebase client using the project configuration, producing the app handle.

### Line 41

```text
const db = getFirestore(app);
```

Creates the Firestore database client used by every persistence method below.

### Line 42

```text

```

Blank line separates related statements for readability.

### Line 43

```text
function showFirestoreError(message, retryOperation) {
```

Declares the showFirestoreError operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 44

```text
  if (!globalThis.document?.body) return;
```

Avoids touching the DOM when running without a document body, such as a non-browser test or early startup.

### Line 45

```text
  let banner = document.getElementById('firestore-error-banner');
```

Looks up the single persistent Firestore error banner so repeated failures can reuse it.

### Line 46

```text
  if (!banner) {
```

Creates the banner only on its first error instead of duplicating alerts.

### Line 47

```text
    banner = document.createElement('section');
```

Invokes banner = document.createElement for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 48

```text
    banner.id = 'firestore-error-banner';
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 49

```text
    banner.setAttribute('role', 'alert');
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 50

```text
    banner.setAttribute('aria-live', 'assertive');
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 51

```text
    Object.assign(banner.style, {
```

Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.

### Line 52

```text
      position: 'fixed',
```

Sets the error banner’s CSS position to 'fixed', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 53

```text
      inset: '12px 12px auto',
```

Sets the error banner’s CSS inset to '12px 12px auto', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 54

```text
      zIndex: '2147483647',
```

Sets the error banner’s CSS zIndex to '2147483647', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 55

```text
      display: 'flex',
```

Sets the error banner’s CSS display to 'flex', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 56

```text
      alignItems: 'center',
```

Sets the error banner’s CSS alignItems to 'center', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 57

```text
      justifyContent: 'space-between',
```

Sets the error banner’s CSS justifyContent to 'space-between', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 58

```text
      gap: '12px',
```

Sets the error banner’s CSS gap to '12px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 59

```text
      padding: '12px 16px',
```

Sets the error banner’s CSS padding to '12px 16px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 60

```text
      color: '#521b1b',
```

Sets the error banner’s CSS color to '#521b1b', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 61

```text
      background: '#fff0ee',
```

Sets the error banner’s CSS background to '#fff0ee', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 62

```text
      border: '1px solid #d98b83',
```

Sets the error banner’s CSS border to '1px solid #d98b83', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 63

```text
      borderRadius: '10px',
```

Sets the error banner’s CSS borderRadius to '10px', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 64

```text
      boxShadow: '0 8px 24px rgba(0,0,0,.18)',
```

Sets the error banner’s CSS boxShadow to '0 8px 24px rgba(0,0,0,.18)', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 65

```text
      font: '600 14px/1.4 system-ui, sans-serif'
```

Sets the error banner’s CSS font to '600 14px/1.4 system-ui, sans-serif', controlling its fixed placement, stacking, layout, spacing, colors, border, shadow, or typography in the browser.

### Line 66

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 67

```text
    const text = document.createElement('span');
```

Derives text from document.createElement('span'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 68

```text
    text.dataset.errorMessage = 'true';
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 69

```text
    const retry = document.createElement('button');
```

Derives retry from document.createElement('button'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 70

```text
    retry.type = 'button';
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 71

```text
    retry.textContent = 'Retry';
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 72

```text
    Object.assign(retry.style, {
```

Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.

### Line 73

```text
      padding: '8px 13px',
```

Stores the padding field with '8px 13px'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 74

```text
      color: '#fff',
```

Stores the color field with '#fff'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 75

```text
      background: '#8f302b',
```

Stores the background field with '#8f302b'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 76

```text
      border: '0',
```

Stores the border field with '0'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 77

```text
      borderRadius: '7px',
```

Stores the borderRadius field with '7px'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 78

```text
      font: 'inherit',
```

Stores the font field with 'inherit'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 79

```text
      cursor: 'pointer'
```

Stores the cursor field with 'pointer'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 80

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 81

```text
    retry.addEventListener('click', async () => {
```

Makes the Retry button rerun failed Firestore operations asynchronously.

### Line 82

```text
      retry.disabled = true;
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 83

```text
      retry.textContent = 'Retrying…';
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 84

```text
      try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 85

```text
        for (const operation of retry._retryOperations || []) await operation();
```

Replays each operation collected for this banner; a Set prevents duplicate retry callbacks.

### Line 86

```text
        banner.remove();
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 87

```text
        globalThis.location?.reload();
```

Reloads the page after all retries succeed so in-memory state is freshly read from Firestore.

### Line 88

```text
      } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 89

```text
        console.error('Firestore retry failed:', error);
```

Logs retry failure details for diagnosis without hiding the original error.

### Line 90

```text
        text.textContent = `A retry did not succeed. Check your connection, then retry the failed Firestore operations again.`;
```

Tells the user that at least one Firestore retry failed and that the failed operations can be tried again.

### Line 91

```text
        retry.disabled = false;
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 92

```text
        retry.textContent = 'Retry';
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 93

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 94

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 95

```text
    banner.append(text, retry);
```

Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.

### Line 96

```text
    document.body.appendChild(banner);
```

Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.

### Line 97

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 98

```text
  const text = banner.querySelector('[data-error-message]');
```

Derives text from banner.querySelector('[data-error-message]'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 99

```text
  const retry = banner.querySelector('button');
```

Derives retry from banner.querySelector('button'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 100

```text
  retry._retryOperations ||= new Set();
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 101

```text
  retry._messages ||= new Set();
```

Updates the retry banner control state so users can see whether Firestore recovery is idle, running, or failed.

### Line 102

```text
  retry._retryOperations.add(retryOperation);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 103

```text
  retry._messages.add(message);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 104

```text
  text.textContent = `${[...retry._messages].join(' ')} Press Retry to repeat the failed operations and reload if they succeed.`;
```

Combines distinct failure messages and tells the user Retry will repeat them and reload on success.

### Line 105

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 106

```text

```

Blank line separates related statements for readability.

### Line 107

```text
function firestoreRequest(message, operation) {
```

Declares the firestoreRequest operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 108

```text
  return operation().catch(error => {
```

Runs the supplied asynchronous Firestore operation and enters the error path on rejection.

### Line 109

```text
    console.error(message, error);
```

Logs the operation-specific failure and its Error object for developers.

### Line 110

```text
    showFirestoreError(message, operation);
```

Invokes showFirestoreError for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 111

```text
    throw error;
```

Rethrows after showing the banner so callers can roll back state or report the failed save.

### Line 112

```text
  });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 113

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 114

```text

```

Blank line separates related statements for readability.

### Line 115

```text
const setDoc = (...args) => firestoreRequest('Saving data to Firestore failed.', () => firestoreSetDoc(...args));
```

Replaces raw setDoc with the error/retry wrapper while preserving its original arguments.

### Line 116

```text
const getDocs = (...args) => firestoreRequest('Loading data from Firestore failed.', () => firestoreGetDocs(...args));
```

Replaces raw getDocs with the error/retry wrapper while preserving its original arguments.

### Line 117

```text
const updateDoc = (...args) => firestoreRequest('Updating data in Firestore failed.', () => firestoreUpdateDoc(...args));
```

Replaces raw updateDoc with the error/retry wrapper while preserving its original arguments.

### Line 118

```text
const deleteDoc = (...args) => firestoreRequest('Deleting data from Firestore failed.', () => firestoreDeleteDoc(...args));
```

Replaces raw deleteDoc with the error/retry wrapper while preserving its original arguments.

### Line 119

```text
const commitBatch = (batch, message = 'Saving this group of changes to Firestore failed.') =>
```

Derives commitBatch from (batch, message = 'Saving this group of changes to Firestore failed.') =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 120

```text
  firestoreRequest(message, () => batch.commit());
```

Commits a prepared batch through the same retry-aware Firestore path and allows a custom message.

### Line 121

```text

```

Blank line separates related statements for readability.

### Line 122

```text

```

Blank line separates related statements for readability.

### Line 123

```text
export { roundTo15Minutes, roundDown15Minutes, roundUp15Minutes };
```

Exports quarter-hour rounding helpers for UI code that needs the same time policy as shifts.

### Line 124

```text

```

Blank line separates related statements for readability.

### Line 125

```text
// Normalizes the name string
```

This comment identifies the following implementation area: Normalizes the name string.

### Line 126

```text
const normalize = (str) => (str ? str.trim().toLowerCase() : '');
```

Normalizes names for case-insensitive duplicate detection by trimming whitespace and lowercasing; empty input becomes empty.

### Line 127

```text

```

Blank line separates related statements for readability.

### Line 128

```text
// Formats the datetime object
```

This comment identifies the following implementation area: Formats the datetime object.

### Line 129

```text
export const toLocalISO = (date) => {
```

Exports a local datetime formatter for datetime-local inputs.

### Line 130

```text
  if (!date) return '';
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 131

```text
  const off = date.getTimezoneOffset() * 60000;
```

Derives off from date.getTimezoneOffset() * 60000; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 132

```text
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
```

Compensates for the browser timezone offset before producing an ISO prefix without a timezone suffix, preserving local clock fields.

### Line 133

```text
};
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 134

```text

```

Blank line separates related statements for readability.

### Line 135

```text
export function formatTime24(date) {
```

Formats a valid JavaScript Date as a two-digit 24-hour clock value for break comparisons and display.

### Line 136

```text
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 137

```text
  
```

Blank line separates related statements for readability.

### Line 138

```text
  const hours = String(date.getHours()).padStart(2, '0');
```

Derives hours from String(date.getHours()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 139

```text
  const minutes = String(date.getMinutes()).padStart(2, '0');
```

Derives minutes from String(date.getMinutes()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 140

```text
  
```

Blank line separates related statements for readability.

### Line 141

```text
  return `${hours}:${minutes}`;
```

Returns a text template that combines fixed text with computed values `hours` (hours), `minutes` (minutes) to the caller and exits this function.

### Line 142

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 143

```text

```

Blank line separates related statements for readability.

### Line 144

```text
/*
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 145

```text
  DATA MODELS
```

Uses the DATA MODELS expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 146

```text
*/
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 147

```text

```

Blank line separates related statements for readability.

### Line 148

```text
export class Employee {
```

Defines the Employee entity used for payroll and employee directory records.

### Line 149

```text
  constructor(id, name, wage = 15) {
```

Initializes a Employee entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 150

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 151

```text
    this.name = name;
```

Sets this object’s name (employee/customer display name) from name, keeping in-memory state aligned with the entity’s business meaning.

### Line 152

```text
    this.wage = Number(wage);
```

Sets this object’s wage (hourly employee wage used by payroll) from Number(wage), keeping in-memory state aligned with the entity’s business meaning.

### Line 153

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 154

```text
  
```

Blank line separates related statements for readability.

### Line 155

```text
  getPay(hours) {
```

Declares the getPay model/store method, exposing this specific timekeeper behavior to its caller.

### Line 156

```text
    return Number((this.wage * hours).toFixed(2));
```

Returns converts formats multiplies `this.wage` (the wage property of this) by `hours` (hours) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.

### Line 157

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 158

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 159

```text

```

Blank line separates related statements for readability.

### Line 160

```text
export class Customer {
```

Defines the Customer/site entity used by shifts, invoices, and planned jobs.

### Line 161

```text
  constructor(id, name, location, note = null, billingRate = null) {
```

Initializes a Customer entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 162

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 163

```text
    this.name = name;
```

Sets this object’s name (employee/customer display name) from name, keeping in-memory state aligned with the entity’s business meaning.

### Line 164

```text
    this.location = location;
```

Sets this object’s location (customer work-site/location) from location, keeping in-memory state aligned with the entity’s business meaning.

### Line 165

```text
    this.note = note;
```

Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.

### Line 166

```text
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
```

Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 167

```text
    this.billingRate = Number.isFinite(rate) && rate >= 0 ? rate : null;
```

Sets this object’s billingRate (non-negative customer hourly billing rate) from Number.isFinite(rate) && rate >= 0 ? rate : null, keeping in-memory state aligned with the entity’s business meaning.

### Line 168

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 169

```text
  
```

Blank line separates related statements for readability.

### Line 170

```text
  customInfo() {
```

Uses the customInfo() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 171

```text
    const noteString = this.note ? ` - ${this.note}` : '';
```

Derives noteString from this.note ? ` - ${this.note}` : ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 172

```text
    const locString = this.location ? ` - ${this.location}` : '';
```

Derives locString from this.location ? ` - ${this.location}` : ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 173

```text
    return `${this.name} - ${locString}`;
```

Returns a text template that combines fixed text with computed values `this.name` (the name property of this), `locString` (loc string) to the caller and exits this function.

### Line 174

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 175

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 176

```text

```

Blank line separates related statements for readability.

### Line 177

```text
export class WorkShift {
```

Defines a WorkShift entity joining one employee to one customer and tracking clocking, breaks, notes, and pay status.

### Line 178

```text
  constructor(employee, customer, id = null, note = null, isPaid = false, breaks = [], paidHours = null) {
```

Initializes a WorkShift entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 179

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 180

```text
    this.employee = employee;
```

Sets this object’s employee (the employee linked to this shift) from employee, keeping in-memory state aligned with the entity’s business meaning.

### Line 181

```text
    this.customer = customer;
```

Sets this object’s customer (the customer/site linked to this work) from customer, keeping in-memory state aligned with the entity’s business meaning.

### Line 182

```text
    this.clockInTime = null;
```

Sets this object’s clockInTime (shift start timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.

### Line 183

```text
    this.clockOutTime = null;
```

Sets this object’s clockOutTime (shift end timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.

### Line 184

```text
    this.breaks = breaks;
```

Sets this object’s breaks (break intervals excluded from worked hours) from breaks, keeping in-memory state aligned with the entity’s business meaning.

### Line 185

```text
    this.note = note;
```

Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.

### Line 186

```text
    this.isPaid = isPaid;
```

Sets this object’s isPaid (whether this shift has already been paid) from isPaid, keeping in-memory state aligned with the entity’s business meaning.

### Line 187

```text
    this.paidHours = paidHours === null || paidHours === undefined || paidHours === '' ?
```

Sets this object’s paidHours (optional payroll-hours override) from paidHours === null || paidHours === undefined || paidHours === '' ?, keeping in-memory state aligned with the entity’s business meaning.

### Line 188

```text
      null :
```

Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 189

```text
      Number(paidHours);
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 190

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 191

```text
  
```

Blank line separates related statements for readability.

### Line 192

```text
  startBreak() {
```

Declares the startBreak model/store method, exposing this specific timekeeper behavior to its caller.

### Line 193

```text
    const breakIn = roundTo15Minutes();
```

Derives breakIn from roundTo15Minutes(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 194

```text
    this.breaks.push({ start: breakIn, end: null });
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 195

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 196

```text
  
```

Blank line separates related statements for readability.

### Line 197

```text
  stopBreak() {
```

Declares the stopBreak model/store method, exposing this specific timekeeper behavior to its caller.

### Line 198

```text
    const activeBreak = this.breaks.find(b => b.start && !b.end);
```

Derives activeBreak from this.breaks.find(b => b.start && !b.end); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 199

```text
    const endTime = roundTo15Minutes();
```

Derives endTime from roundTo15Minutes(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 200

```text
    if (activeBreak) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 201

```text
      if (formatTime24(activeBreak.start) === formatTime24(endTime)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 202

```text
        this.breaks = this.breaks.filter(b => b !== activeBreak);
```

Sets this object’s breaks (break intervals excluded from worked hours) from this.breaks.filter(b => b !== activeBreak), keeping in-memory state aligned with the entity’s business meaning.

### Line 203

```text
      } else {
```

Uses the } else { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 204

```text
        activeBreak.end = endTime;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 205

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 206

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 207

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 208

```text
  
```

Blank line separates related statements for readability.

### Line 209

```text
  get isOnBreak() {
```

Reports whether any break lacks an end time, which prevents a shift from being left silently on break.

### Line 210

```text
    return Boolean(this.breaks.find(b => b.start && !b.end));
```

Returns converts returns the first item of `this.breaks` (the breaks property of this) matching a callback taking b that uses negates the truthiness of `b.end` only if `b.start` (the start property of b) is truthy; otherwise keeps the falsy first value, or undefined to true or false according to truthiness to the caller and exits this function.

### Line 211

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 212

```text
  
```

Blank line separates related statements for readability.

### Line 213

```text
  getTotalBreakTimeMs() {
```

Declares the getTotalBreakTimeMs model/store method, exposing this specific timekeeper behavior to its caller.

### Line 214

```text
    return this.breaks.reduce((total, b) => {
```

Returns combines the items of `this.breaks` (the breaks property of this) with a callback taking total, b that runs its enclosed statements, starting with 0 to the caller and exits this function.

### Line 215

```text
      if (b.start && b.end) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 216

```text
        return total + (b.end - b.start);
```

Returns adds `total` (total) and subtracts `b.start` (the start property of b) from `b.end` (the end property of b) (or joins them if a value is text) to the caller and exits this function.

### Line 217

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 218

```text
      return total;
```

Returns `total` (total) to the caller and exits this function.

### Line 219

```text
    }, 0);
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 220

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 221

```text
  
```

Blank line separates related statements for readability.

### Line 222

```text
  startShift(clockInTime = roundTo15Minutes()) {
```

Declares the startShift model/store method, exposing this specific timekeeper behavior to its caller.

### Line 223

```text
    this.clockInTime = clockInTime;
```

Sets this object’s clockInTime (shift start timestamp) from clockInTime, keeping in-memory state aligned with the entity’s business meaning.

### Line 224

```text
    this.clockOutTime = null;
```

Sets this object’s clockOutTime (shift end timestamp) from null, keeping in-memory state aligned with the entity’s business meaning.

### Line 225

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 226

```text
  
```

Blank line separates related statements for readability.

### Line 227

```text
  stopShift() {
```

Declares the stopShift model/store method, exposing this specific timekeeper behavior to its caller.

### Line 228

```text
    if (!this.clockInTime) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 229

```text
    if (this.isOnBreak) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 230

```text
      this.stopBreak();
```

Invokes this.stopBreak for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 231

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 232

```text
    this.clockOutTime = roundTo15Minutes();
```

Sets this object’s clockOutTime (shift end timestamp) from roundTo15Minutes(), keeping in-memory state aligned with the entity’s business meaning.

### Line 233

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 234

```text
  
```

Blank line separates related statements for readability.

### Line 235

```text
  addNote(newnote) {
```

Declares the addNote model/store method, exposing this specific timekeeper behavior to its caller.

### Line 236

```text
    if (!this.note) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 237

```text
      this.note = newnote;
```

Sets this object’s note (human-entered note) from newnote, keeping in-memory state aligned with the entity’s business meaning.

### Line 238

```text
    } else {
```

Uses the } else { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 239

```text
      this.note = `${this.note}\n${newnote}`;
```

Sets this object’s note (human-entered note) from `${this.note}\n${newnote}`, keeping in-memory state aligned with the entity’s business meaning.

### Line 240

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 241

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 242

```text
  
```

Blank line separates related statements for readability.

### Line 243

```text
  get isComplete() {
```

Defines completion as having both clock-in and clock-out timestamps.

### Line 244

```text
    return Boolean(this.clockInTime && this.clockOutTime);
```

Returns converts uses `this.clockOutTime` (the clock out time property of this) only if `this.clockInTime` (the clock in time property of this) is truthy; otherwise keeps the falsy first value to true or false according to truthiness to the caller and exits this function.

### Line 245

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 246

```text
  
```

Blank line separates related statements for readability.

### Line 247

```text
  duplicateFor(employee) {
```

Creates a safe duplicate of a completed shift for another employee, retaining customer, times, breaks, note, and override hours.

### Line 248

```text
    if (!employee?.id || employee.id === this.employee?.id) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 249

```text
      throw new Error('Choose a different employee for the duplicate shift.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 250

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 251

```text
    if (!this.isComplete || !(this.clockInTime instanceof Date) ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 252

```text
        !(this.clockOutTime instanceof Date) || !Number.isFinite(this.clockInTime.getTime()) ||
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 253

```text
        !Number.isFinite(this.clockOutTime.getTime()) || this.clockOutTime <= this.clockInTime) {
```

Uses the !Number.isFinite(this.clockOutTime.getTime()) || this.clockOutTime <= this.clockInTime) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 254

```text
      throw new Error('Only a completed shift with valid start and end times can be duplicated.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 255

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 256

```text
    const breaks = this.breaks.map(item => ({
```

Derives breaks from this.breaks.map(item => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 257

```text
      start: item.start ? new Date(item.start.getTime()) : null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 258

```text
      end: item.end ? new Date(item.end.getTime()) : null
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 259

```text
    }));
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 260

```text
    const duplicate = new WorkShift(employee, this.customer, null, this.note, false, breaks, this.paidHours);
```

Derives duplicate from new WorkShift(employee, this.customer, null, this.note, false, breaks, this.paidHours); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 261

```text
    duplicate.clockInTime = new Date(this.clockInTime.getTime());
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 262

```text
    duplicate.clockOutTime = new Date(this.clockOutTime.getTime());
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 263

```text
    return duplicate;
```

Returns `duplicate` (duplicate) to the caller and exits this function.

### Line 264

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 265

```text

```

Blank line separates related statements for readability.

### Line 266

```text
  getHoursWorked() {
```

Declares the getHoursWorked model/store method, exposing this specific timekeeper behavior to its caller.

### Line 267

```text
    if (!this.isComplete) return 0;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 268

```text
    return actualShiftHours(this.clockInTime, this.clockOutTime, this.breaks);
```

Returns calls `actualShiftHours` with `this.clockInTime` (the clock in time property of this); `this.clockOutTime` (the clock out time property of this); `this.breaks` (the breaks property of this) to the caller and exits this function.

### Line 269

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 270

```text
  
```

Blank line separates related statements for readability.

### Line 271

```text
  getPaidHours() {
```

Declares the getPaidHours model/store method, exposing this specific timekeeper behavior to its caller.

### Line 272

```text
    return Number.isFinite(this.paidHours) ? this.paidHours : this.getHoursWorked();
```

Returns checks checks that `this.paidHours` (the paid hours property of this) is a finite number, excluding NaN and infinity; if true chooses `this.paidHours` (the paid hours property of this), otherwise calls `this.getHoursWorked` with no arguments to the caller and exits this function.

### Line 273

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 274

```text
  
```

Blank line separates related statements for readability.

### Line 275

```text
  getShiftPay() {
```

Declares the getShiftPay model/store method, exposing this specific timekeeper behavior to its caller.

### Line 276

```text
    if (this.isPaid) return 0;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 277

```text
    return this.employee ? this.employee.getPay(this.getPaidHours()) : 0;
```

Returns checks `this.employee` (the employee property of this); if true chooses calls `this.employee.getPay` with calls `this.getPaidHours` with no arguments, otherwise 0 to the caller and exits this function.

### Line 278

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 279

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 280

```text

```

Blank line separates related statements for readability.

### Line 281

```text
export class Payment {
```

Defines a Payment record representing money already paid to an employee.

### Line 282

```text
  constructor(employeeId, amount, date = null, note = '', id = null) {
```

Initializes a Payment entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 283

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 284

```text
    this.employeeId = employeeId;
```

Sets this object’s employeeId (domain state) from employeeId, keeping in-memory state aligned with the entity’s business meaning.

### Line 285

```text
    this.amount = Number(amount);
```

Sets this object’s amount (domain state) from Number(amount), keeping in-memory state aligned with the entity’s business meaning.

### Line 286

```text
    this.date = date ? new Date(date) : new Date();
```

Sets this object’s date (domain state) from date ? new Date(date) : new Date(), keeping in-memory state aligned with the entity’s business meaning.

### Line 287

```text
    this.note = note;
```

Sets this object’s note (human-entered note) from note, keeping in-memory state aligned with the entity’s business meaning.

### Line 288

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 289

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 290

```text

```

Blank line separates related statements for readability.

### Line 291

```text
function todayDateString() {
```

Declares the todayDateString operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 292

```text
  const today = new Date();
```

Derives today from new Date(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 293

```text
  const year = today.getFullYear();
```

Derives year from today.getFullYear(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 294

```text
  const month = String(today.getMonth() + 1).padStart(2, '0');
```

Derives month from String(today.getMonth() + 1).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 295

```text
  const day = String(today.getDate()).padStart(2, '0');
```

Derives day from String(today.getDate()).padStart(2, '0'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 296

```text
  return `${year}-${month}-${day}`;
```

Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.

### Line 297

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 298

```text

```

Blank line separates related statements for readability.

### Line 299

```text
export class Invoice {
```

Defines an Invoice containing billable items and optional linked work-shift IDs.

### Line 300

```text
  constructor(cust, items = [], id = null, isPaid = false, date = todayDateString(), shiftIds = []) {
```

Initializes a Invoice entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 301

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 302

```text
    this.customer = cust;
```

Sets this object’s customer (the customer/site linked to this work) from cust, keeping in-memory state aligned with the entity’s business meaning.

### Line 303

```text
    this.items = items;
```

Sets this object’s items (domain state) from items, keeping in-memory state aligned with the entity’s business meaning.

### Line 304

```text
    this.isPaid = Boolean(isPaid);
```

Sets this object’s isPaid (whether this shift has already been paid) from Boolean(isPaid), keeping in-memory state aligned with the entity’s business meaning.

### Line 305

```text
    this.date = date || null;
```

Sets this object’s date (domain state) from date || null, keeping in-memory state aligned with the entity’s business meaning.

### Line 306

```text
    this.shiftIds = Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [];
```

Sets this object’s shiftIds (domain state) from Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [], keeping in-memory state aligned with the entity’s business meaning.

### Line 307

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 308

```text
  
```

Blank line separates related statements for readability.

### Line 309

```text
  addItem(name, value) {
```

Declares the addItem model/store method, exposing this specific timekeeper behavior to its caller.

### Line 310

```text
    this.items.push({ name: name, value: Number(value) });
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 311

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 312

```text
  
```

Blank line separates related statements for readability.

### Line 313

```text
  deleteItem(name, value) {
```

Declares the deleteItem model/store method, exposing this specific timekeeper behavior to its caller.

### Line 314

```text
    const dItem = this.items.find(i => i.name === name && i.value === value);
```

Derives dItem from this.items.find(i => i.name === name && i.value === value); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 315

```text
    this.items = this.items.filter(i => i !== dItem);
```

Sets this object’s items (domain state) from this.items.filter(i => i !== dItem), keeping in-memory state aligned with the entity’s business meaning.

### Line 316

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 317

```text
  
```

Blank line separates related statements for readability.

### Line 318

```text
  totalBill() {
```

Uses the totalBill() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 319

```text
    const total = this.items.reduce((sum, item) => sum + Number(item.value || 0), 0);
```

Derives total from this.items.reduce((sum, item) => sum + Number(item.value || 0), 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 320

```text
    return Number(total.toFixed(2));
```

Returns converts formats `total` (total) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.

### Line 321

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 322

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 323

```text

```

Blank line separates related statements for readability.

### Line 324

```text
export class Ledger {
```

Defines a Ledger that stores employee earning/payment adjustments and supports settlement archival.

### Line 325

```text
  constructor(initialEntries = []) {
```

Initializes a Ledger entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 326

```text
    this.entries = [];
```

Sets this object’s entries (ledger rows) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 327

```text
    if (Array.isArray(initialEntries) && initialEntries.length > 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 328

```text
      initialEntries.forEach(data => this.addEntry(data));
```

Invokes initialEntries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 329

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 330

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 331

```text
  
```

Blank line separates related statements for readability.

### Line 332

```text
  addEntry(data = {}) {
```

Declares the addEntry model/store method, exposing this specific timekeeper behavior to its caller.

### Line 333

```text
    const employeeId = data.employeeId || null;
```

Derives employeeId from data.employeeId || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 334

```text
    const nextIndex = this.entries.filter(entry => entry.employeeId === employeeId).length + 1;
```

Derives nextIndex from this.entries.filter(entry => entry.employeeId === employeeId).length + 1; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 335

```text
    const entry = {
```

Derives entry from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 336

```text
      id: data.id || crypto.randomUUID(),
```

Stores the id field with data.id || crypto.randomUUID(); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 337

```text
      index: Number(data.index) > 0 ? Number(data.index) : nextIndex,
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 338

```text
      employeeId,
```

Uses the employeeId, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 339

```text
      date: data.date ?? null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 340

```text
      type: data.type ?? null,
```

Stores the type field with data.type ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 341

```text
      hours: data.hours ?? null,
```

Stores the hours field with data.hours ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 342

```text
      amount: data.amount ?? null,
```

Stores the amount field with data.amount ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 343

```text
      notes: data.notes ?? null,
```

Stores the notes field with data.notes ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 344

```text
      sourceShiftId: data.sourceShiftId ? String(data.sourceShiftId) : null
```

Stores the sourceShiftId field with data.sourceShiftId ? String(data.sourceShiftId) : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 345

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 346

```text
    
```

Blank line separates related statements for readability.

### Line 347

```text
    this.entries.push(entry);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 348

```text
    return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 349

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 350

```text
  
```

Blank line separates related statements for readability.

### Line 351

```text
  updateEntry(id, updates = {}) {
```

Declares the updateEntry model/store method, exposing this specific timekeeper behavior to its caller.

### Line 352

```text
    const entry = this.getEntry(id);
```

Derives entry from this.getEntry(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 353

```text
    if (!entry) return null;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 354

```text
    
```

Blank line separates related statements for readability.

### Line 355

```text
    Object.assign(entry, updates);
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 356

```text
    return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 357

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 358

```text
  
```

Blank line separates related statements for readability.

### Line 359

```text
  deleteEntry(id) {
```

Declares the deleteEntry model/store method, exposing this specific timekeeper behavior to its caller.

### Line 360

```text
    const initialLength = this.entries.length;
```

Derives initialLength from this.entries.length; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 361

```text
    const entry = this.getEntry(id);
```

Derives entry from this.getEntry(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 362

```text
    this.entries = this.entries.filter(entry => entry.id !== id);
```

Sets this object’s entries (ledger rows) from this.entries.filter(entry => entry.id !== id), keeping in-memory state aligned with the entity’s business meaning.

### Line 363

```text
    
```

Blank line separates related statements for readability.

### Line 364

```text
    if (this.entries.length !== initialLength) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 365

```text
      this.reindex(entry?.employeeId ?? null);
```

Invokes this.reindex for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 366

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 367

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 368

```text
    return false;
```

Returns false to the caller and exits this function.

### Line 369

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 370

```text
  
```

Blank line separates related statements for readability.

### Line 371

```text
  getEntry(id) {
```

Declares the getEntry model/store method, exposing this specific timekeeper behavior to its caller.

### Line 372

```text
    return this.entries.find(entry => entry.id === id) || null;
```

Returns uses returns the first item of `this.entries` (the entries property of this) matching a callback taking entry that checks that `entry.id` (the id property of entry) and `id` (id) have the same value and type, or undefined when it is truthy, otherwise falls back to null to the caller and exits this function.

### Line 373

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 374

```text
  
```

Blank line separates related statements for readability.

### Line 375

```text
  reindex(employeeId = undefined) {
```

Uses the reindex(employeeId = undefined) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 376

```text
    const entries = employeeId === undefined ?
```

Derives entries from employeeId === undefined ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 377

```text
      this.entries :
```

Uses the this.entries : expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 378

```text
      this.entries.filter(entry => entry.employeeId === employeeId);
```

Sets this object’s entries.filter(entry (domain state) from > entry.employeeId === employeeId), keeping in-memory state aligned with the entity’s business meaning.

### Line 379

```text
    entries.forEach((entry, i) => { entry.index = i + 1; });
```

Invokes entries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 380

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 381

```text
  
```

Blank line separates related statements for readability.

### Line 382

```text
  getTotal() {
```

Declares the getTotal model/store method, exposing this specific timekeeper behavior to its caller.

### Line 383

```text
    return this.entries.reduce((total, { type = '', amount = 0 }) => {
```

Returns combines the items of `this.entries` (the entries property of this) with a callback taking total, { type = '', amount = 0 } that runs its enclosed statements, starting with 0 to the caller and exits this function.

### Line 384

```text
      const entryType = type.toLowerCase();
```

Derives entryType from type.toLowerCase(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 385

```text
      const amt = Number(amount) || 0;
```

Derives amt from Number(amount) || 0; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 386

```text
      
```

Blank line separates related statements for readability.

### Line 387

```text
      if (entryType === 'normal' || entryType === 'general') return total + amt;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 388

```text
      if (entryType === 'advance') return total - amt;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 389

```text
      return total;
```

Returns `total` (total) to the caller and exits this function.

### Line 390

```text
    }, 0);
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 391

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 392

```text
  
```

Blank line separates related statements for readability.

### Line 393

```text
  toJSON() {
```

Uses the toJSON() { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 394

```text
    return this.entries;
```

Returns `this.entries` (the entries property of this) to the caller and exits this function.

### Line 395

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 396

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 397

```text

```

Blank line separates related statements for readability.

### Line 398

```text
export class PlannedJob {
```

Defines a PlannedJob for future customer work with optional scheduling and completion state.

### Line 399

```text
  constructor(description, scheduledDate, customer = null, isComplete = false, id = null) {
```

Initializes a PlannedJob entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 400

```text
    this.description = String(description || '').trim();
```

Sets this object’s description (domain state) from String(description || '').trim(), keeping in-memory state aligned with the entity’s business meaning.

### Line 401

```text
    const date = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
```

Derives date from scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 402

```text
      null :
```

Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 403

```text
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 404

```text
    this.scheduledDate = date && !Number.isNaN(date.getTime()) ? date : null;
```

Sets this object’s scheduledDate (domain state) from date && !Number.isNaN(date.getTime()) ? date : null, keeping in-memory state aligned with the entity’s business meaning.

### Line 405

```text
    this.customer = customer;
```

Sets this object’s customer (the customer/site linked to this work) from customer, keeping in-memory state aligned with the entity’s business meaning.

### Line 406

```text
    this.isComplete = Boolean(isComplete);
```

Sets this object’s isComplete (domain state) from Boolean(isComplete), keeping in-memory state aligned with the entity’s business meaning.

### Line 407

```text
    this.id = id || crypto.randomUUID();
```

Sets this object’s id (stable entity identifier (or a UUID for a new record)) from id || crypto.randomUUID(), keeping in-memory state aligned with the entity’s business meaning.

### Line 408

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 409

```text
  
```

Blank line separates related statements for readability.

### Line 410

```text
  getDate() {
```

Declares the getDate model/store method, exposing this specific timekeeper behavior to its caller.

### Line 411

```text
    return this.scheduledDate;
```

Returns `this.scheduledDate` (the scheduled date property of this) to the caller and exits this function.

### Line 412

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 413

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 414

```text

```

Blank line separates related statements for readability.

### Line 415

```text

```

Blank line separates related statements for readability.

### Line 416

```text
/*
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 417

```text
  DATA STORE
```

Uses the DATA STORE expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 418

```text
*/
```

Comment delimiter marks documentation for the surrounding implementation.

### Line 419

```text

```

Blank line separates related statements for readability.

### Line 420

```text
export class AppDataStore {
```

Defines the in-memory application store that coordinates all entities and Firestore persistence.

### Line 421

```text
  constructor() {
```

Initializes a AppDataStore entity from the supplied arguments, applying defaults and normalization so later payroll, billing, scheduling, or persistence code has a predictable record.

### Line 422

```text
    this.employees = new Map();
```

Sets this object’s employees (domain state) from new Map(), keeping in-memory state aligned with the entity’s business meaning.

### Line 423

```text
    this.customers = new Map();
```

Sets this object’s customers (domain state) from new Map(), keeping in-memory state aligned with the entity’s business meaning.

### Line 424

```text
    this.payments = [];
```

Sets this object’s payments (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 425

```text
    this.shifts = [];
```

Sets this object’s shifts (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 426

```text
    this.invoices = [];
```

Sets this object’s invoices (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 427

```text
    this.ledger = new Ledger();
```

Sets this object’s ledger (domain state) from new Ledger(), keeping in-memory state aligned with the entity’s business meaning.

### Line 428

```text
    this.ledgerArchives = [];
```

Sets this object’s ledgerArchives (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 429

```text
    this.ledgerArchiveRows = [];
```

Sets this object’s ledgerArchiveRows (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 430

```text
    this.pendingLedgerSettlements = new Set();
```

Sets this object’s pendingLedgerSettlements (domain state) from new Set(), keeping in-memory state aligned with the entity’s business meaning.

### Line 431

```text
    this.recentlyArchivedLedgerIds = [];
```

Sets this object’s recentlyArchivedLedgerIds (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 432

```text
    this.plannedJobs = [];
```

Sets this object’s plannedJobs (future customer work items) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 433

```text
    this.loadFailures = [];
```

Sets this object’s loadFailures (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 434

```text
    this.isAdmin = null;
```

Sets this object’s isAdmin (domain state) from null, keeping in-memory state aligned with the entity’s business meaning.

### Line 435

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 436

```text
  
```

Blank line separates related statements for readability.

### Line 437

```text
  async init() {
```

Declares the init operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 438

```text
    this.loadFailures = [];
```

Sets this object’s loadFailures (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 439

```text
    this.pendingLedgerSettlements.clear();
```

Invokes this.pendingLedgerSettlements.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 440

```text
    this.recentlyArchivedLedgerIds = [];
```

Sets this object’s recentlyArchivedLedgerIds (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 441

```text
    await this.loadEmployees();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 442

```text
    await this.loadCustomers();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 443

```text
    await this.loadShifts();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 444

```text
    await this.loadPayments();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 445

```text
    await this.loadInvoices();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 446

```text
    await this.loadLedger();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 447

```text
    await this.loadLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 448

```text
    if (!this.loadFailures.length) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 449

```text
      try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 450

```text
        await this.resumePendingLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 451

```text
        await this.archiveAlreadySettledLedgers();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 452

```text
      } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 453

```text
        console.error('Unable to finish a settled ledger archive:', error);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 454

```text
        this.loadFailures.push(error);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 455

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 456

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 457

```text
    await this.loadPlanned();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 458

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 459

```text
  
```

Blank line separates related statements for readability.

### Line 460

```text
  // LEDGER --
```

This comment identifies the following implementation area: LEDGER --.

### Line 461

```text
  async loadLedger() {
```

Declares the loadLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 462

```text
    this.ledger = new Ledger();
```

Sets this object’s ledger (domain state) from new Ledger(), keeping in-memory state aligned with the entity’s business meaning.

### Line 463

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 464

```text
      const querySnapshot = await getDocs(collection(db, "ledgerRows"));
```

Derives querySnapshot from await getDocs(collection(db, "ledgerRows")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 465

```text
      const loadedEntries = [];
```

Derives loadedEntries from []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 466

```text
      
```

Blank line separates related statements for readability.

### Line 467

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 468

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 469

```text
        loadedEntries.push({ ...data, id: docSnap.id });
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 470

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 471

```text
      
```

Blank line separates related statements for readability.

### Line 472

```text
      loadedEntries.sort((a, b) => (a.index || 0) - (b.index || 0));
```

Invokes loadedEntries.sort for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 473

```text
      loadedEntries.forEach(data => this.ledger.addEntry(data));
```

Invokes loadedEntries.forEach for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 474

```text
      
```

Blank line separates related statements for readability.

### Line 475

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 476

```text
      console.error("Error loading Ledger from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 477

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 478

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 479

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 480

```text

```

Blank line separates related statements for readability.

### Line 481

```text
  async loadLedgerArchives() {
```

Declares the loadLedgerArchives operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 482

```text
    this.ledgerArchives = [];
```

Sets this object’s ledgerArchives (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 483

```text
    this.ledgerArchiveRows = [];
```

Sets this object’s ledgerArchiveRows (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 484

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 485

```text
      const [archivesSnapshot, rowsSnapshot] = await Promise.all([
```

Derives [archivesSnapshot, rowsSnapshot] from await Promise.all([; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 486

```text
        getDocs(collection(db, 'ledgerArchives')),
```

Declares the getDocs model/store method, exposing this specific timekeeper behavior to its caller.

### Line 487

```text
        getDocs(collection(db, 'ledgerArchiveRows'))
```

Declares the getDocs model/store method, exposing this specific timekeeper behavior to its caller.

### Line 488

```text
      ]);
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 489

```text
      archivesSnapshot.forEach(docSnap => {
```

Uses the archivesSnapshot.forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 490

```text
        this.ledgerArchives.push({ ...docSnap.data(), id: docSnap.id });
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 491

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 492

```text
      rowsSnapshot.forEach(docSnap => {
```

Uses the rowsSnapshot.forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 493

```text
        this.ledgerArchiveRows.push({ ...docSnap.data(), id: docSnap.id });
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 494

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 495

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 496

```text
      console.error('Error loading archived ledger history from Firestore:', error);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 497

```text
      this.loadFailures.push(error);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 498

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 499

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 500

```text

```

Blank line separates related statements for readability.

### Line 501

```text
  async writeLedgerArchiveRows(rows) {
```

Declares the writeLedgerArchiveRows operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 502

```text
    for (let offset = 0; offset < rows.length; offset += 500) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 503

```text
      const batch = writeBatch(db);
```

Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 504

```text
      const chunk = rows.slice(offset, offset + 500);
```

Derives chunk from rows.slice(offset, offset + 500); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 505

```text
      chunk.forEach(row => batch.set(doc(db, 'ledgerArchiveRows', row.id), row));
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 506

```text
      await commitBatch(batch, 'Saving archived ledger history failed.');
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 507

```text
      const savedIds = new Set(chunk.map(row => row.id));
```

Derives savedIds from new Set(chunk.map(row => row.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 508

```text
      this.ledgerArchiveRows = [
```

Sets this object’s ledgerArchiveRows (domain state) from [, keeping in-memory state aligned with the entity’s business meaning.

### Line 509

```text
        ...this.ledgerArchiveRows.filter(row => !savedIds.has(row.id)),
```

Selects only records matching the timekeeper condition, excluding unrelated entities from the result.

### Line 510

```text
        ...chunk
```

Uses the ...chunk expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 511

```text
      ];
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 512

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 513

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 514

```text

```

Blank line separates related statements for readability.

### Line 515

```text
  makeLedgerArchiveRow(archive, entry) {
```

Uses the makeLedgerArchiveRow(archive, entry) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 516

```text
    return {
```

Returns an object with fields id: a text template that combines fixed text with computed values `archive.id` (the id property of archive), `entry.id` (the id property of entry); archiveId: `archive.id` (the id property of archive); sourceEntryId: `entry.id` (the id property of entry); employeeId: `entry.employeeId` (the employee id property of entry); index: `entry.index` (the index property of entry); date: `entry.date` (the date property of entry); and further fields to the caller and exits this function.

### Line 517

```text
      id: `${archive.id}--${entry.id}`,
```

Stores the id field with `${archive.id}--${entry.id}`; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 518

```text
      archiveId: archive.id,
```

Stores the archiveId field with archive.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 519

```text
      sourceEntryId: entry.id,
```

Stores the sourceEntryId field with entry.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 520

```text
      employeeId: entry.employeeId,
```

Stores the employeeId field with entry.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 521

```text
      index: entry.index,
```

Stores the index field with entry.index; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 522

```text
      date: entry.date,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 523

```text
      type: entry.type,
```

Stores the type field with entry.type; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 524

```text
      hours: entry.hours,
```

Stores the hours field with entry.hours; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 525

```text
      amount: entry.amount,
```

Stores the amount field with entry.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 526

```text
      notes: entry.notes,
```

Stores the notes field with entry.notes; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 527

```text
      sourceShiftId: entry.sourceShiftId || null
```

Stores the sourceShiftId field with entry.sourceShiftId || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 528

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 529

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 530

```text

```

Blank line separates related statements for readability.

### Line 531

```text
  async completePendingLedgerArchive(archive) {
```

Declares the completePendingLedgerArchive operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 532

```text
    const entryIds = (archive.entryIds || []).map(String);
```

Derives entryIds from (archive.entryIds || []).map(String); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 533

```text
    const archivedByEntryId = new Map(this.ledgerArchiveRows
```

Derives archivedByEntryId from new Map(this.ledgerArchiveRows; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 534

```text
      .filter(row => row.archiveId === archive.id)
```

Selects only records matching the timekeeper condition, excluding unrelated entities from the result.

### Line 535

```text
      .map(row => [String(row.sourceEntryId), row]));
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 536

```text
    const activeById = new Map(this.ledger.entries.map(entry => [String(entry.id), entry]));
```

Derives activeById from new Map(this.ledger.entries.map(entry => [String(entry.id), entry])); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 537

```text
    const rowsToWrite = [];
```

Derives rowsToWrite from []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 538

```text
    for (const entryId of entryIds) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 539

```text
      if (archivedByEntryId.has(entryId)) continue;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 540

```text
      const activeEntry = activeById.get(entryId);
```

Derives activeEntry from activeById.get(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 541

```text
      if (!activeEntry) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 542

```text
        throw new Error(`Ledger archive ${archive.id} is missing entry ${entryId}; active data was left unchanged.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 543

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 544

```text
      rowsToWrite.push(this.makeLedgerArchiveRow(archive, activeEntry));
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 545

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 546

```text

```

Blank line separates related statements for readability.

### Line 547

```text
    await this.writeLedgerArchiveRows(rowsToWrite);
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 548

```text
    for (let offset = 0; offset < entryIds.length; offset += 500) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 549

```text
      const batch = writeBatch(db);
```

Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 550

```text
      entryIds.slice(offset, offset + 500).forEach(entryId => {
```

Uses the entryIds.slice(offset, offset + 500).forEach(entryId => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 551

```text
        batch.delete(doc(db, 'ledgerRows', entryId));
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 552

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 553

```text
      await commitBatch(batch, 'Clearing a settled ledger after archiving failed.');
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 554

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 555

```text

```

Blank line separates related statements for readability.

### Line 556

```text
    const archivedIds = new Set(entryIds);
```

Derives archivedIds from new Set(entryIds); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 557

```text
    this.ledger.entries = this.ledger.entries.filter(entry => !archivedIds.has(String(entry.id)));
```

Sets this object’s ledger.entries (domain state) from this.ledger.entries.filter(entry => !archivedIds.has(String(entry.id))), keeping in-memory state aligned with the entity’s business meaning.

### Line 558

```text
    await updateDoc(doc(db, 'ledgerArchives', archive.id), { status: 'archived' });
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 559

```text
    archive.status = 'archived';
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 560

```text
    if (!this.recentlyArchivedLedgerIds.includes(archive.id)) this.recentlyArchivedLedgerIds.push(archive.id);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 561

```text
    this.pendingLedgerSettlements.delete(String(archive.employeeId));
```

Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 562

```text
    return archive;
```

Returns `archive` (archive) to the caller and exits this function.

### Line 563

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 564

```text

```

Blank line separates related statements for readability.

### Line 565

```text
  async resumePendingLedgerArchives() {
```

Declares the resumePendingLedgerArchives operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 566

```text
    const pending = this.ledgerArchives.filter(archive => archive.status === 'pending');
```

Derives pending from this.ledgerArchives.filter(archive => archive.status === 'pending'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 567

```text
    for (const archive of pending) await this.completePendingLedgerArchive(archive);
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 568

```text
    return pending.length;
```

Returns `pending.length` (the length property of pending) to the caller and exits this function.

### Line 569

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 570

```text

```

Blank line separates related statements for readability.

### Line 571

```text
  async archiveSettledLedger(employeeId) {
```

Declares the archiveSettledLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 572

```text
    const id = String(employeeId);
```

Derives id from String(employeeId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 573

```text
    const entries = this.ledger.entries
```

Derives entries from this.ledger.entries; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 574

```text
      .filter(entry => String(entry.employeeId || '') === id)
```

Selects only records matching the timekeeper condition, excluding unrelated entities from the result.

### Line 575

```text
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 576

```text
    if (!entries.length || ledgerBalanceCents(entries) !== 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 577

```text
      this.pendingLedgerSettlements.delete(id);
```

Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 578

```text
      return null;
```

Returns null to the caller and exits this function.

### Line 579

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 580

```text

```

Blank line separates related statements for readability.

### Line 581

```text
    const entryIds = entries.map(entry => String(entry.id));
```

Derives entryIds from entries.map(entry => String(entry.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 582

```text
    const sameEntries = archive => archive.employeeId === id && archive.status === 'pending' &&
```

Derives sameEntries from archive => archive.employeeId === id && archive.status === 'pending' &&; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 583

```text
      Array.isArray(archive.entryIds) && archive.entryIds.length === entryIds.length &&
```

Uses the Array.isArray(archive.entryIds) && archive.entryIds.length === entryIds.length && expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 584

```text
      archive.entryIds.every((entryId, index) => String(entryId) === entryIds[index]);
```

Invokes archive.entryIds.every for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 585

```text
    let archive = this.ledgerArchives.find(sameEntries);
```

Finds the first matching domain record, allowing the following validation or update to target the intended entity.

### Line 586

```text
    if (!archive) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 587

```text
      archive = {
```

Uses the archive = { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 588

```text
        id: crypto.randomUUID(),
```

Stores the id field with crypto.randomUUID(); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 589

```text
        employeeId: id,
```

Stores the employeeId field with id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 590

```text
        employeeName: this.employees.get(id)?.name || 'Unknown employee',
```

Stores the employeeName field with this.employees.get(id)?.name || 'Unknown employee'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 591

```text
        archivedAt: new Date().toISOString(),
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 592

```text
        balanceCents: 0,
```

Stores the balanceCents field with 0; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 593

```text
        entryCount: entries.length,
```

Stores the entryCount field with entries.length; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 594

```text
        entryIds,
```

Uses the entryIds, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 595

```text
        status: 'pending'
```

Stores the status field with 'pending'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 596

```text
      };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 597

```text
      await setDoc(doc(db, 'ledgerArchives', archive.id), archive);
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 598

```text
      this.ledgerArchives.unshift(archive);
```

Invokes this.ledgerArchives.unshift for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 599

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 600

```text

```

Blank line separates related statements for readability.

### Line 601

```text
    const result = await this.completePendingLedgerArchive(archive);
```

Derives result from await this.completePendingLedgerArchive(archive); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 602

```text
    entries.forEach(entry => {
```

Uses the entries.forEach(entry => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 603

```text
      entry.archivedOnZero = true;
```

Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 604

```text
      entry.archiveId = result.id;
```

Updates entry.archiveId to result.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 605

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 606

```text
    this.pendingLedgerSettlements.delete(id);
```

Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 607

```text
    return result;
```

Returns `result` (result) to the caller and exits this function.

### Line 608

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 609

```text

```

Blank line separates related statements for readability.

### Line 610

```text
  async archiveAlreadySettledLedgers() {
```

Declares the archiveAlreadySettledLedgers operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 611

```text
    const employeeIds = new Set(this.ledger.entries.map(entry => String(entry.employeeId || '')).filter(Boolean));
```

Derives employeeIds from new Set(this.ledger.entries.map(entry => String(entry.employeeId || '')).filter(Boolean)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 612

```text
    for (const employeeId of employeeIds) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 613

```text
      const entries = this.ledger.entries.filter(entry => String(entry.employeeId || '') === employeeId);
```

Derives entries from this.ledger.entries.filter(entry => String(entry.employeeId || '') === employeeId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 614

```text
      const hasNonZeroAmount = entries.some(entry => Number(entry.amount || 0) !== 0);
```

Derives hasNonZeroAmount from entries.some(entry => Number(entry.amount || 0) !== 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 615

```text
      if (hasNonZeroAmount && ledgerBalanceCents(entries) === 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 616

```text
        await this.archiveSettledLedger(employeeId);
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 617

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 618

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 619

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 620

```text

```

Blank line separates related statements for readability.

### Line 621

```text
  async archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer = false } = {}) {
```

Declares the archiveLedgerIfSettled operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 622

```text
    const id = String(employeeId || '');
```

Derives id from String(employeeId || ''); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 623

```text
    const entries = this.ledger.entries.filter(entry => String(entry.employeeId || '') === id);
```

Derives entries from this.ledger.entries.filter(entry => String(entry.employeeId || '') === id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 624

```text
    if (previousBalanceCents === 0 || !entries.length || ledgerBalanceCents(entries) !== 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 625

```text
      if (ledgerBalanceCents(entries) !== 0) this.pendingLedgerSettlements.delete(id);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 626

```text
      return null;
```

Returns null to the caller and exits this function.

### Line 627

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 628

```text
    if (defer) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 629

```text
      this.pendingLedgerSettlements.add(id);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 630

```text
      return null;
```

Returns null to the caller and exits this function.

### Line 631

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 632

```text
    return this.archiveSettledLedger(id);
```

Returns calls `this.archiveSettledLedger` with `id` (id) to the caller and exits this function.

### Line 633

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 634

```text
  
```

Blank line separates related statements for readability.

### Line 635

```text
  async saveLedgerEntry(data, { deferZeroArchive = false } = {}) {
```

Declares the saveLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 636

```text
    await this.resumePendingLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 637

```text
    const employeeId = data.employeeId || null;
```

Derives employeeId from data.employeeId || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 638

```text
    if (!employeeId || !this.employees.has(employeeId)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 639

```text
      throw new Error("Choose an employee for this ledger entry.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 640

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 641

```text
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
```

Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 642

```text
    const entry = this.ledger.addEntry({ ...data, employeeId });
```

Derives entry from this.ledger.addEntry({ ...data, employeeId }); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 643

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 644

```text
      await setDoc(doc(db, "ledgerRows", entry.id), entry);
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 645

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 646

```text
      this.ledger.deleteEntry(entry.id);
```

Invokes this.ledger.deleteEntry for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 647

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 648

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 649

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 650

```text
      const archive = await this.archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer: deferZeroArchive });
```

Derives archive from await this.archiveLedgerIfSettled(employeeId, previousBalanceCents, { defer: deferZeroArchive }); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 651

```text
      if (archive) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 652

```text
        entry.archivedOnZero = true;
```

Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 653

```text
        entry.archiveId = archive.id;
```

Updates entry.archiveId to archive.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 654

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 655

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 656

```text
      error.entrySaved = true;
```

Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 657

```text
      error.message = `Entry saved, but archiving the settled ledger is still pending. ${error.message}`;
```

Updates error.message to `Entry saved, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 658

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 659

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 660

```text
    return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 661

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 662

```text

```

Blank line separates related statements for readability.

### Line 663

```text
  async saveShiftToLedger(shiftId) {
```

Declares the saveShiftToLedger operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 664

```text
    await this.resumePendingLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 665

```text
    const shift = this.shifts.find(candidate => String(candidate.id) === String(shiftId));
```

Derives shift from this.shifts.find(candidate => String(candidate.id) === String(shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 666

```text
    if (!shift) throw new Error('The selected shift could not be found.');
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 667

```text
    if (this.ledger.entries.some(entry => String(entry.sourceShiftId || '') === String(shift.id))) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 668

```text
      throw new Error('This shift has already been added to the ledger.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 669

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 670

```text
    return this.saveLedgerEntry(makeShiftLedgerEntryData(shift), { deferZeroArchive: true });
```

Returns calls `this.saveLedgerEntry` with calls `makeShiftLedgerEntryData` with `shift` (shift); an object with fields deferZeroArchive: true to the caller and exits this function.

### Line 671

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 672

```text
  
```

Blank line separates related statements for readability.

### Line 673

```text
  async updateLedgerEntry(entryId, updates) {
```

Declares the updateLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 674

```text
    await this.resumePendingLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 675

```text
    const current = this.ledger.getEntry(entryId);
```

Derives current from this.ledger.getEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 676

```text
    if (!current) throw new Error("Ledger entry not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 677

```text
    const employeeId = current.employeeId;
```

Derives employeeId from current.employeeId; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 678

```text
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
```

Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 679

```text
    const previous = { ...current };
```

Derives previous from { ...current }; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 680

```text
    const entry = this.ledger.updateEntry(entryId, updates);
```

Derives entry from this.ledger.updateEntry(entryId, updates); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 681

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 682

```text
      // Apply only the edited fields so any unrelated Firestore data remains untouched.
```

This comment identifies the following implementation area: Apply only the edited fields so any unrelated Firestore data remains untouched..

### Line 683

```text
      await updateDoc(doc(db, "ledgerRows", entryId), updates);
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 684

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 685

```text
      Object.assign(entry, previous);
```

Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.

### Line 686

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 687

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 688

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 689

```text
      const pendingSettlement = this.pendingLedgerSettlements.has(String(employeeId || ''));
```

Derives pendingSettlement from this.pendingLedgerSettlements.has(String(employeeId || '')); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 690

```text
      const balanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
```

Derives balanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 691

```text
      const archive = balanceCents === 0 && (previousBalanceCents !== 0 || pendingSettlement)
```

Derives archive from balanceCents === 0 && (previousBalanceCents !== 0 || pendingSettlement); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 692

```text
        ? await this.archiveSettledLedger(employeeId)
```

Invokes ? await this.archiveSettledLedger for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 693

```text
        : null;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 694

```text
      if (archive) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 695

```text
        entry.archivedOnZero = true;
```

Updates entry.archivedOnZero to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 696

```text
        entry.archiveId = archive.id;
```

Updates entry.archiveId to archive.id; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 697

```text
      } else if (balanceCents !== 0) {
```

Uses the } else if (balanceCents !== 0) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 698

```text
        this.pendingLedgerSettlements.delete(String(employeeId || ''));
```

Invokes this.pendingLedgerSettlements.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 699

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 700

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 701

```text
      error.entrySaved = true;
```

Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 702

```text
      error.message = `Entry updated, but archiving the settled ledger is still pending. ${error.message}`;
```

Updates error.message to `Entry updated, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 703

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 704

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 705

```text
    return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 706

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 707

```text
  
```

Blank line separates related statements for readability.

### Line 708

```text
  async deleteLedgerEntry(entryId) {
```

Declares the deleteLedgerEntry operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 709

```text
    await this.resumePendingLedgerArchives();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 710

```text
    const entry = this.ledger.getEntry(entryId);
```

Derives entry from this.ledger.getEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 711

```text
    if (!entry) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 712

```text
    const employeeId = entry.employeeId;
```

Derives employeeId from entry.employeeId; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 713

```text
    const previousBalanceCents = ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId));
```

Derives previousBalanceCents from ledgerBalanceCents(this.ledger.entries.filter(candidate => candidate.employeeId === employeeId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 714

```text
    const isDeleted = this.ledger.deleteEntry(entryId);
```

Derives isDeleted from this.ledger.deleteEntry(entryId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 715

```text
    if (!isDeleted) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 716

```text
    
```

Blank line separates related statements for readability.

### Line 717

```text
    await deleteDoc(doc(db, "ledgerRows", entryId));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 718

```text
    
```

Blank line separates related statements for readability.

### Line 719

```text
    // Batch update updated index numbers in Firestore efficiently
```

This comment identifies the following implementation area: Batch update updated index numbers in Firestore efficiently.

### Line 720

```text
    const batch = writeBatch(db);
```

Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 721

```text
    const affectedEntries = this.ledger.entries.filter(candidate => candidate.employeeId === (entry.employeeId || null));
```

Derives affectedEntries from this.ledger.entries.filter(candidate => candidate.employeeId === (entry.employeeId || null)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 722

```text
    affectedEntries.forEach((candidate) => {
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 723

```text
      const ref = doc(db, "ledgerRows", candidate.id);
```

Derives ref from doc(db, "ledgerRows", candidate.id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 724

```text
      batch.update(ref, { index: candidate.index });
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 725

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 726

```text
    if (affectedEntries.length) await commitBatch(batch);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 727

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 728

```text
      await this.archiveLedgerIfSettled(employeeId, previousBalanceCents);
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 729

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 730

```text
      error.entrySaved = true;
```

Updates error.entrySaved to true; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 731

```text
      error.message = `Entry deleted, but archiving the settled ledger is still pending. ${error.message}`;
```

Updates error.message to `Entry deleted, but archiving the settled ledger is still pending. ${error.message}`; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 732

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 733

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 734

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 735

```text
  
```

Blank line separates related statements for readability.

### Line 736

```text
  // INVOICE --
```

This comment identifies the following implementation area: INVOICE --.

### Line 737

```text
  async loadInvoices() {
```

Declares the loadInvoices operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 738

```text
    this.invoices = [];
```

Sets this object’s invoices (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 739

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 740

```text
      const querySnapshot = await getDocs(collection(db, "invoices"));
```

Derives querySnapshot from await getDocs(collection(db, "invoices")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 741

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 742

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 743

```text
        const customer = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown');
```

Derives customer from (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 744

```text
        const items = data.items || [];
```

Derives items from data.items || []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 745

```text
        const isPaid = data.isPaid || false;
```

Derives isPaid from data.isPaid || false; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 746

```text
        
```

Blank line separates related statements for readability.

### Line 747

```text
        const inv = new Invoice(customer, items, docSnap.id, isPaid, data.date || null, data.shiftIds || []);
```

Derives inv from new Invoice(customer, items, docSnap.id, isPaid, data.date || null, data.shiftIds || []); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 748

```text
        
```

Blank line separates related statements for readability.

### Line 749

```text
        this.invoices.push(inv);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 750

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 751

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 752

```text
      console.error("Error loading invoices from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 753

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 754

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 755

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 756

```text
  
```

Blank line separates related statements for readability.

### Line 757

```text
  async saveInvoice(invoice) {
```

Declares the saveInvoice operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 758

```text
    const linkedShiftIds = invoiceShiftIds(invoice);
```

Derives linkedShiftIds from invoiceShiftIds(invoice); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 759

```text
    const linkedLineIds = (invoice.items || []).filter(item => item?.shiftId).map(item => String(item.shiftId));
```

Derives linkedLineIds from (invoice.items || []).filter(item => item?.shiftId).map(item => String(item.shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 760

```text
    if (new Set(linkedLineIds).size !== linkedLineIds.length) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 761

```text
      throw new Error('This invoice contains the same work shift more than once. Remove the duplicate before saving.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 762

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 763

```text
    const duplicateShiftId = [...linkedShiftIds].find(shiftId =>
```

Derives duplicateShiftId from [...linkedShiftIds].find(shiftId =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 764

```text
      shiftIsAttachedElsewhere(this.invoices, shiftId, invoice.id)
```

Invokes shiftIsAttachedElsewhere for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 765

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 766

```text
    if (duplicateShiftId) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 767

```text
      throw new Error(`Shift ${duplicateShiftId} is already attached to another invoice.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 768

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 769

```text
    invoice.shiftIds = [...linkedShiftIds];
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 770

```text
    await setDoc(doc(db, "invoices", invoice.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 771

```text
      custId: invoice.customer ? invoice.customer.id : null,
```

Stores the custId field with invoice.customer ? invoice.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 772

```text
      items: invoice.items,
```

Stores the items field with invoice.items; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 773

```text
      isPaid: Boolean(invoice.isPaid),
```

Stores the isPaid field with Boolean(invoice.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 774

```text
      date: invoice.date || null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 775

```text
      shiftIds: Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []
```

Stores the shiftIds field with Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 776

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 777

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 778

```text
  
```

Blank line separates related statements for readability.

### Line 779

```text
  async deleteInvoice(invoiceId) {
```

Declares the deleteInvoice operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 780

```text
    await deleteDoc(doc(db, "invoices", invoiceId));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 781

```text
    this.invoices = this.invoices.filter(s => s.id !== invoiceId);
```

Sets this object’s invoices (domain state) from this.invoices.filter(s => s.id !== invoiceId), keeping in-memory state aligned with the entity’s business meaning.

### Line 782

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 783

```text
  
```

Blank line separates related statements for readability.

### Line 784

```text
  // EMPLOYEE --
```

This comment identifies the following implementation area: EMPLOYEE --.

### Line 785

```text
  async loadEmployees() {
```

Declares the loadEmployees operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 786

```text
    this.employees.clear();
```

Invokes this.employees.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 787

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 788

```text
      const querySnapshot = await getDocs(collection(db, "employees"));
```

Derives querySnapshot from await getDocs(collection(db, "employees")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 789

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 790

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 791

```text
        this.employees.set(docSnap.id, new Employee(docSnap.id, data.name, data.wage));
```

Invokes this.employees.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 792

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 793

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 794

```text
      console.error("Error loading employees from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 795

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 796

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 797

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 798

```text
  
```

Blank line separates related statements for readability.

### Line 799

```text
  async addEmployee(name, wage) {
```

Declares the addEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 800

```text
    const cleanName = normalize(name);
```

Derives cleanName from normalize(name); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 801

```text
    if (!cleanName) throw new Error("Employee name cannot be empty.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 802

```text
    
```

Blank line separates related statements for readability.

### Line 803

```text
    const isDuplicate = Array.from(this.employees.values()).some(
```

Derives isDuplicate from Array.from(this.employees.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 804

```text
      (emp) => normalize(emp.name) === cleanName
```

Uses the (emp) => normalize(emp.name) === cleanName expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 805

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 806

```text
    if (isDuplicate) return null;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 807

```text
    
```

Blank line separates related statements for readability.

### Line 808

```text
    const emp = new Employee(null, name.trim(), wage);
```

Derives emp from new Employee(null, name.trim(), wage); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 809

```text
    await setDoc(doc(db, "employees", emp.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 810

```text
      name: emp.name,
```

Stores the name field with emp.name; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 811

```text
      wage: emp.wage
```

Stores the wage field with emp.wage; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 812

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 813

```text
    this.employees.set(emp.id, emp);
```

Invokes this.employees.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 814

```text
    return emp;
```

Returns `emp` (emp) to the caller and exits this function.

### Line 815

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 816

```text
  
```

Blank line separates related statements for readability.

### Line 817

```text
  async updateEmployee(id, name, wage) {
```

Declares the updateEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 818

```text
    const employee = this.employees.get(id);
```

Derives employee from this.employees.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 819

```text
    if (!employee) throw new Error("Employee not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 820

```text
    
```

Blank line separates related statements for readability.

### Line 821

```text
    const cleanName = String(name ?? '').trim();
```

Derives cleanName from String(name ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 822

```text
    const cleanWage = Number(wage);
```

Derives cleanWage from Number(wage); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 823

```text
    if (!cleanName) throw new Error("Employee name cannot be empty.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 824

```text
    if (!Number.isFinite(cleanWage) || cleanWage < 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 825

```text
      throw new Error("Employee wage must be a non-negative number.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 826

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 827

```text
    const duplicate = Array.from(this.employees.values()).some(
```

Derives duplicate from Array.from(this.employees.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 828

```text
      candidate => candidate.id !== id && normalize(candidate.name) === normalize(cleanName)
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 829

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 830

```text
    if (duplicate) throw new Error("An employee with that name already exists.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 831

```text
    
```

Blank line separates related statements for readability.

### Line 832

```text
    await updateDoc(doc(db, "employees", id), { name: cleanName, wage: cleanWage });
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 833

```text
    employee.name = cleanName;
```

Updates employee.name to cleanName; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 834

```text
    employee.wage = cleanWage;
```

Updates employee.wage to cleanWage; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 835

```text
    return employee;
```

Returns `employee` (employee) to the caller and exits this function.

### Line 836

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 837

```text
  
```

Blank line separates related statements for readability.

### Line 838

```text
  async deleteEmployee(id) {
```

Declares the deleteEmployee operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 839

```text
    if (this.employees.has(id)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 840

```text
      await deleteDoc(doc(db, "employees", id));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 841

```text
      this.employees.delete(id);
```

Invokes this.employees.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 842

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 843

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 844

```text
    return false;
```

Returns false to the caller and exits this function.

### Line 845

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 846

```text
  
```

Blank line separates related statements for readability.

### Line 847

```text
  // CUSTOMER --
```

This comment identifies the following implementation area: CUSTOMER --.

### Line 848

```text
  async loadCustomers() {
```

Declares the loadCustomers operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 849

```text
    this.customers.clear();
```

Invokes this.customers.clear for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 850

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 851

```text
      const querySnapshot = await getDocs(collection(db, "customers"));
```

Derives querySnapshot from await getDocs(collection(db, "customers")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 852

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 853

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 854

```text
        this.customers.set(docSnap.id, new Customer(docSnap.id, data.name, data.location, data.note, data.billingRate));
```

Invokes this.customers.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 855

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 856

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 857

```text
      console.error("Error loading customers from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 858

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 859

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 860

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 861

```text
  
```

Blank line separates related statements for readability.

### Line 862

```text
  async addCustomer(name, location, note = null, billingRate = null) {
```

Declares the addCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 863

```text
    const cleanName = normalize(name);
```

Derives cleanName from normalize(name); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 864

```text
    const cleanLocation = normalize(location);
```

Derives cleanLocation from normalize(location); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 865

```text
    if (!cleanName) throw new Error("Customer name cannot be empty.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 866

```text
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
```

Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 867

```text
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 868

```text
      throw new Error("Hourly billing rate must be a non-negative number.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 869

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 870

```text
    
```

Blank line separates related statements for readability.

### Line 871

```text
    const isDuplicate = Array.from(this.customers.values()).some(
```

Derives isDuplicate from Array.from(this.customers.values()).some(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 872

```text
      (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation
```

Uses the (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 873

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 874

```text
    if (isDuplicate) return null;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 875

```text
    
```

Blank line separates related statements for readability.

### Line 876

```text
    const site = new Customer(null, name.trim(), location ? location.trim() : null, note, rate);
```

Derives site from new Customer(null, name.trim(), location ? location.trim() : null, note, rate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 877

```text
    await setDoc(doc(db, "customers", site.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 878

```text
      name: site.name,
```

Stores the name field with site.name; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 879

```text
      location: site.location,
```

Stores the location field with site.location; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 880

```text
      note: site.note,
```

Stores the note field with site.note; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 881

```text
      billingRate: site.billingRate
```

Stores the billingRate field with site.billingRate; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 882

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 883

```text
    this.customers.set(site.id, site);
```

Invokes this.customers.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 884

```text
    return site;
```

Returns `site` (site) to the caller and exits this function.

### Line 885

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 886

```text
  
```

Blank line separates related statements for readability.

### Line 887

```text
  async updateCustomer(id, name, location, note, billingRate = undefined) {
```

Declares the updateCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 888

```text
    const customer = this.customers.get(id);
```

Derives customer from this.customers.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 889

```text
    if (!customer) throw new Error("Customer not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 890

```text
    
```

Blank line separates related statements for readability.

### Line 891

```text
    const cleanName = String(name ?? '').trim();
```

Derives cleanName from String(name ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 892

```text
    const cleanLocation = String(location ?? '').trim();
```

Derives cleanLocation from String(location ?? '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 893

```text
    const cleanNote = String(note ?? '').trim() || null;
```

Derives cleanNote from String(note ?? '').trim() || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 894

```text
    if (!cleanName) throw new Error("Customer name cannot be empty.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 895

```text
    if (!cleanLocation) throw new Error("Customer location cannot be empty.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 896

```text
    const duplicate = Array.from(this.customers.values()).some(candidate =>
```

Derives duplicate from Array.from(this.customers.values()).some(candidate =>; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 897

```text
      candidate.id !== id &&
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 898

```text
      normalize(candidate.name) === normalize(cleanName) &&
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 899

```text
      normalize(candidate.location) === normalize(cleanLocation)
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 900

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 901

```text
    if (duplicate) throw new Error("A customer with that name and location already exists.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 902

```text
    
```

Blank line separates related statements for readability.

### Line 903

```text
    const updates = {
```

Derives updates from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 904

```text
      name: cleanName,
```

Stores the name field with cleanName; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 905

```text
      location: cleanLocation,
```

Stores the location field with cleanLocation; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 906

```text
      note: cleanNote
```

Stores the note field with cleanNote; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 907

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 908

```text
    let cleanRate;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 909

```text
    if (billingRate !== undefined) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 910

```text
      cleanRate = billingRate === null || billingRate === '' ? null : Number(billingRate);
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 911

```text
      if (cleanRate !== null && (!Number.isFinite(cleanRate) || cleanRate < 0)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 912

```text
        throw new Error("Hourly billing rate must be a non-negative number.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 913

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 914

```text
      updates.billingRate = cleanRate;
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 915

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 916

```text
    
```

Blank line separates related statements for readability.

### Line 917

```text
    await updateDoc(doc(db, "customers", id), updates);
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 918

```text
    customer.name = cleanName;
```

Updates customer.name to cleanName; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 919

```text
    customer.location = cleanLocation;
```

Updates customer.location to cleanLocation; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 920

```text
    customer.note = cleanNote;
```

Updates customer.note to cleanNote; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 921

```text
    if (billingRate !== undefined) customer.billingRate = cleanRate;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 922

```text
    return true;
```

Returns true to the caller and exits this function.

### Line 923

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 924

```text
  
```

Blank line separates related statements for readability.

### Line 925

```text
  async updateCustomerBillingRate(id, billingRate) {
```

Declares the updateCustomerBillingRate operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 926

```text
    const customer = this.customers.get(id);
```

Derives customer from this.customers.get(id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 927

```text
    if (!customer) throw new Error("Customer not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 928

```text
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
```

Derives rate from billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 929

```text
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 930

```text
      throw new Error("Hourly billing rate must be a non-negative number.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 931

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 932

```text
    const previousRate = customer.billingRate;
```

Derives previousRate from customer.billingRate; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 933

```text
    customer.billingRate = rate;
```

Updates customer.billingRate to rate; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 934

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 935

```text
      await updateDoc(doc(db, "customers", id), { billingRate: rate });
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 936

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 937

```text
      customer.billingRate = previousRate;
```

Updates customer.billingRate to previousRate; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 938

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 939

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 940

```text
    return customer;
```

Returns `customer` (customer) to the caller and exits this function.

### Line 941

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 942

```text
  
```

Blank line separates related statements for readability.

### Line 943

```text
  async deleteCustomer(id) {
```

Declares the deleteCustomer operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 944

```text
    if (this.customers.has(id)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 945

```text
      await deleteDoc(doc(db, "customers", id));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 946

```text
      this.customers.delete(id);
```

Invokes this.customers.delete for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 947

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 948

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 949

```text
    return false;
```

Returns false to the caller and exits this function.

### Line 950

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 951

```text
  
```

Blank line separates related statements for readability.

### Line 952

```text
  // WORKSHIFT --
```

This comment identifies the following implementation area: WORKSHIFT --.

### Line 953

```text
  async loadShifts() {
```

Declares the loadShifts operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 954

```text
    this.shifts = [];
```

Sets this object’s shifts (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 955

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 956

```text
      const querySnapshot = await getDocs(collection(db, "shifts"));
```

Derives querySnapshot from await getDocs(collection(db, "shifts")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 957

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 958

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 959

```text
        const emp = (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0);
```

Derives emp from (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 960

```text
        const site = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site');
```

Derives site from (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 961

```text
        const parsedBreaks = (data.breaks || []).map(b => ({ start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null }));
```

Derives parsedBreaks from (data.breaks || []).map(b => ({ start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null })); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 962

```text
        
```

Blank line separates related statements for readability.

### Line 963

```text
        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks, data.paidHours);
```

Derives shift from new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks, data.paidHours); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 964

```text
        
```

Blank line separates related statements for readability.

### Line 965

```text
        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
```

Updates shift.clockInTime to data.clockInTime ? new Date(data.clockInTime) : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 966

```text
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
```

Updates shift.clockOutTime to data.clockOutTime ? new Date(data.clockOutTime) : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 967

```text
        
```

Blank line separates related statements for readability.

### Line 968

```text
        this.shifts.push(shift);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 969

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 970

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 971

```text
      console.error("Error loading shifts from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 972

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 973

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 974

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 975

```text
  
```

Blank line separates related statements for readability.

### Line 976

```text
  async saveShift(shift) {
```

Declares the saveShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 977

```text
    const formattedBreaks = shift.breaks.map(b => ({
```

Derives formattedBreaks from shift.breaks.map(b => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 978

```text
      start: b.start instanceof Date ? b.start.toISOString() : b.start,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 979

```text
      end: b.end instanceof Date ? b.end.toISOString() : b.end
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 980

```text
    }));
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 981

```text

```

Blank line separates related statements for readability.

### Line 982

```text
    await setDoc(doc(db, "shifts", shift.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 983

```text
      employeeId: shift.employee ? shift.employee.id : null,
```

Stores the employeeId field with shift.employee ? shift.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 984

```text
      custId: shift.customer ? shift.customer.id : null,
```

Stores the custId field with shift.customer ? shift.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 985

```text
      clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
```

Stores the clockInTime field with shift.clockInTime ? shift.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 986

```text
      clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
```

Stores the clockOutTime field with shift.clockOutTime ? shift.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 987

```text
      note: shift.note || null,
```

Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 988

```text
      isPaid: shift.isPaid || false,
```

Stores the isPaid field with shift.isPaid || false; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 989

```text
      breaks: formattedBreaks,
```

Stores the breaks field with formattedBreaks; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 990

```text
      paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
```

Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 991

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 992

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 993

```text
  
```

Blank line separates related statements for readability.

### Line 994

```text
  async saveShifts(shifts) {
```

Declares the saveShifts operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 995

```text
    if (!Array.isArray(shifts) || shifts.length === 0) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 996

```text
    if (shifts.length > 500) throw new Error("A single clock-in batch cannot contain more than 500 shifts.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 997

```text
    const ids = shifts.map(shift => String(shift.id));
```

Derives ids from shifts.map(shift => String(shift.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 998

```text
    if (new Set(ids).size !== ids.length) throw new Error("A shift appears more than once in this clock-in batch.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 999

```text
    const batch = writeBatch(db);
```

Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1000

```text
    shifts.forEach(shift => {
```

Uses the shifts.forEach(shift => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1001

```text
      const formattedBreaks = (shift.breaks || []).map(b => ({
```

Derives formattedBreaks from (shift.breaks || []).map(b => ({; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1002

```text
        start: b.start instanceof Date ? b.start.toISOString() : b.start,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1003

```text
        end: b.end instanceof Date ? b.end.toISOString() : b.end
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1004

```text
      }));
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1005

```text
      batch.set(doc(db, "shifts", shift.id), {
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 1006

```text
        employeeId: shift.employee ? shift.employee.id : null,
```

Stores the employeeId field with shift.employee ? shift.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1007

```text
        custId: shift.customer ? shift.customer.id : null,
```

Stores the custId field with shift.customer ? shift.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1008

```text
        clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
```

Stores the clockInTime field with shift.clockInTime ? shift.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1009

```text
        clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
```

Stores the clockOutTime field with shift.clockOutTime ? shift.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1010

```text
        note: shift.note || null,
```

Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1011

```text
        isPaid: Boolean(shift.isPaid),
```

Stores the isPaid field with Boolean(shift.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1012

```text
        breaks: formattedBreaks,
```

Stores the breaks field with formattedBreaks; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1013

```text
        paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
```

Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1014

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1015

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1016

```text
    await commitBatch(batch, 'Clocking in the selected employees failed.');
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1017

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1018

```text
  
```

Blank line separates related statements for readability.

### Line 1019

```text
  async deleteShift(shiftId) {
```

Declares the deleteShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1020

```text
    await deleteDoc(doc(db, "shifts", shiftId));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 1021

```text
    this.shifts = this.shifts.filter(s => s.id !== shiftId);
```

Sets this object’s shifts (domain state) from this.shifts.filter(s => s.id !== shiftId), keeping in-memory state aligned with the entity’s business meaning.

### Line 1022

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1023

```text
  
```

Blank line separates related statements for readability.

### Line 1024

```text
  async updateShift(shiftId, employee, customer, clockInTime, clockOutTime, note = null, isPaid = false, breaks = null, paidHours = undefined) {
```

Declares the updateShift operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1025

```text
    const shift = this.shifts.find(s => s.id === shiftId);
```

Derives shift from this.shifts.find(s => s.id === shiftId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1026

```text
    if (!shift) throw new Error("Shift could not be found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1027

```text
    if (!employee || !customer) throw new Error("Please select an employee and customer.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1028

```text
    
```

Blank line separates related statements for readability.

### Line 1029

```text
    const start = clockInTime instanceof Date ? clockInTime : new Date(clockInTime);
```

Derives start from clockInTime instanceof Date ? clockInTime : new Date(clockInTime); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1030

```text
    const end = clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime);
```

Derives end from clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1031

```text
    const sourceBreaks = Array.isArray(breaks) ? breaks : shift.breaks;
```

Derives sourceBreaks from Array.isArray(breaks) ? breaks : shift.breaks; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1032

```text
    
```

Blank line separates related statements for readability.

### Line 1033

```text
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1034

```text
      throw new Error("Please provide valid start and end times.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1035

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1036

```text
    if (end <= start) throw new Error("End time must be after start time.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1037

```text
    
```

Blank line separates related statements for readability.

### Line 1038

```text
    const normalizedBreaks = sourceBreaks.map((breakItem, index) => {
```

Derives normalizedBreaks from sourceBreaks.map((breakItem, index) => {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1039

```text
      const breakStart = breakItem.start instanceof Date ? breakItem.start : new Date(breakItem.start);
```

Derives breakStart from breakItem.start instanceof Date ? breakItem.start : new Date(breakItem.start); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1040

```text
      const breakEnd = breakItem.end instanceof Date ? breakItem.end : new Date(breakItem.end);
```

Derives breakEnd from breakItem.end instanceof Date ? breakItem.end : new Date(breakItem.end); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1041

```text
      if (Number.isNaN(breakStart.getTime()) || Number.isNaN(breakEnd.getTime())) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1042

```text
        throw new Error(`Break ${index + 1} needs both a valid start and end time.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1043

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1044

```text
      if (breakEnd <= breakStart) throw new Error(`Break ${index + 1} must end after it starts.`);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1045

```text
      if (breakStart < start || breakEnd > end) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1046

```text
        throw new Error(`Break ${index + 1} must fall within the shift.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1047

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1048

```text
      return { start: breakStart, end: breakEnd };
```

Returns an object with fields start: `breakStart` (break start); end: `breakEnd` (break end) to the caller and exits this function.

### Line 1049

```text
    }).sort((a, b) => a.start - b.start);
```

Invokes }).sort for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 1050

```text
    
```

Blank line separates related statements for readability.

### Line 1051

```text
    for (let index = 1; index < normalizedBreaks.length; index += 1) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1052

```text
      if (normalizedBreaks[index].start < normalizedBreaks[index - 1].end) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1053

```text
        throw new Error("Break times cannot overlap.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1054

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1055

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1056

```text
    
```

Blank line separates related statements for readability.

### Line 1057

```text
    const nextPaidHours = paidHours === undefined ? shift.paidHours :
```

Derives nextPaidHours from paidHours === undefined ? shift.paidHours :; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1058

```text
      (paidHours === null || paidHours === '' ? null : Number(paidHours));
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 1059

```text
    if (nextPaidHours !== null && (!Number.isFinite(nextPaidHours) || nextPaidHours < 0)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1060

```text
      throw new Error("Paid hours must be a valid non-negative number, or left blank to use worked hours.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1061

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1062

```text
    
```

Blank line separates related statements for readability.

### Line 1063

```text
    await updateDoc(doc(db, "shifts", shiftId), {
```

Patches the specified Firestore document, preserving unrelated fields while changing validated timekeeper data.

### Line 1064

```text
      employeeId: employee.id,
```

Stores the employeeId field with employee.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1065

```text
      custId: customer.id,
```

Stores the custId field with customer.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1066

```text
      clockInTime: start.toISOString(),
```

Stores the clockInTime field with start.toISOString(); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1067

```text
      clockOutTime: end.toISOString(),
```

Stores the clockOutTime field with end.toISOString(); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1068

```text
      note: note ? String(note).trim() : null,
```

Stores the note field with note ? String(note).trim() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1069

```text
      isPaid: Boolean(isPaid),
```

Stores the isPaid field with Boolean(isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1070

```text
      breaks: normalizedBreaks.map(b => ({ start: b.start.toISOString(), end: b.end.toISOString() })),
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1071

```text
      paidHours: nextPaidHours
```

Stores the paidHours field with nextPaidHours; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1072

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1073

```text
    
```

Blank line separates related statements for readability.

### Line 1074

```text
    shift.employee = employee;
```

Updates shift.employee to employee; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1075

```text
    shift.customer = customer;
```

Updates shift.customer to customer; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1076

```text
    shift.clockInTime = start;
```

Updates shift.clockInTime to start; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1077

```text
    shift.clockOutTime = end;
```

Updates shift.clockOutTime to end; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1078

```text
    shift.note = note ? String(note).trim() : null;
```

Updates shift.note to note ? String(note).trim() : null; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1079

```text
    shift.isPaid = Boolean(isPaid);
```

Updates shift.isPaid to Boolean(isPaid); this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1080

```text
    shift.breaks = normalizedBreaks;
```

Updates shift.breaks to normalizedBreaks; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1081

```text
    shift.paidHours = nextPaidHours;
```

Updates shift.paidHours to nextPaidHours; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1082

```text
    return shift;
```

Returns `shift` (shift) to the caller and exits this function.

### Line 1083

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1084

```text
  
```

Blank line separates related statements for readability.

### Line 1085

```text
  async howManyActive() {
```

Declares the howManyActive operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1086

```text
    const activeShifts = this.shifts.filter(s => !s.isComplete);
```

Derives activeShifts from this.shifts.filter(s => !s.isComplete); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1087

```text
    return activeShifts.length;
```

Returns `activeShifts.length` (the length property of activeShifts) to the caller and exits this function.

### Line 1088

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1089

```text
  
```

Blank line separates related statements for readability.

### Line 1090

```text
  // PAYMENT --
```

This comment identifies the following implementation area: PAYMENT --.

### Line 1091

```text
  async loadPayments() {
```

Declares the loadPayments operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1092

```text
    this.payments = [];
```

Sets this object’s payments (domain state) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 1093

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1094

```text
      const querySnapshot = await getDocs(collection(db, "payments"));
```

Derives querySnapshot from await getDocs(collection(db, "payments")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1095

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1096

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1097

```text
        const payment = new Payment(
```

Derives payment from new Payment(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1098

```text
          data.employeeId,
```

Uses the data.employeeId, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1099

```text
          data.amount,
```

Uses the data.amount, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1100

```text
          data.date,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1101

```text
          data.note,
```

Uses the data.note, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1102

```text
          docSnap.id
```

Uses the docSnap.id expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1103

```text
        );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1104

```text
        this.payments.push(payment);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1105

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1106

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1107

```text
      console.error("Error loading payments from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 1108

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1109

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1110

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1111

```text
  
```

Blank line separates related statements for readability.

### Line 1112

```text
  async addPayment(employeeId, amount, note = '') {
```

Declares the addPayment operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1113

```text
    const payment = new Payment(employeeId, amount, new Date(), note);
```

Derives payment from new Payment(employeeId, amount, new Date(), note); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1114

```text
    await setDoc(doc(db, "payments", payment.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 1115

```text
      employeeId: payment.employeeId,
```

Stores the employeeId field with payment.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1116

```text
      amount: payment.amount,
```

Stores the amount field with payment.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1117

```text
      date: payment.date.toISOString(),
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1118

```text
      note: payment.note
```

Stores the note field with payment.note; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1119

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1120

```text
    this.payments.push(payment);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1121

```text
    return payment;
```

Returns `payment` (payment) to the caller and exits this function.

### Line 1122

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1123

```text
  
```

Blank line separates related statements for readability.

### Line 1124

```text
  async deletePayment(paymentId) {
```

Declares the deletePayment operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1125

```text
    await deleteDoc(doc(db, "payments", paymentId));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 1126

```text
    this.payments = this.payments.filter(p => p.id !== paymentId);
```

Sets this object’s payments (domain state) from this.payments.filter(p => p.id !== paymentId), keeping in-memory state aligned with the entity’s business meaning.

### Line 1127

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1128

```text
  
```

Blank line separates related statements for readability.

### Line 1129

```text
  // CALCULATE BALANCES FOR AN EMPLOYEE
```

This comment identifies the following implementation area: CALCULATE BALANCES FOR AN EMPLOYEE.

### Line 1130

```text
  getEmployeeLedger(employeeId) {
```

Declares the getEmployeeLedger model/store method, exposing this specific timekeeper behavior to its caller.

### Line 1131

```text
    const empShifts = this.shifts.filter(
```

Derives empShifts from this.shifts.filter(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1132

```text
      s => s.employee && s.employee.id === employeeId && s.isComplete
```

Uses the s => s.employee && s.employee.id === employeeId && s.isComplete expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1133

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1134

```text
    const empPayments = this.payments.filter(
```

Derives empPayments from this.payments.filter(; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1135

```text
      p => p.employeeId === employeeId
```

Uses the p => p.employeeId === employeeId expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1136

```text
    );
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1137

```text
    
```

Blank line separates related statements for readability.

### Line 1138

```text
    const totalEarned = empShifts.reduce((sum, s) => sum + Number(s.getShiftPay()), 0);
```

Derives totalEarned from empShifts.reduce((sum, s) => sum + Number(s.getShiftPay()), 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1139

```text
    const totalPaid = empPayments.reduce((sum, p) => sum + p.amount, 0);
```

Derives totalPaid from empPayments.reduce((sum, p) => sum + p.amount, 0); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1140

```text
    const balanceOwed = Number((totalEarned - totalPaid).toFixed(2));
```

Derives balanceOwed from Number((totalEarned - totalPaid).toFixed(2)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1141

```text
    
```

Blank line separates related statements for readability.

### Line 1142

```text
    return {
```

Returns an object with fields shifts: `empShifts` (emp shifts); payments: `empPayments` (emp payments); totalEarned: `totalEarned` (total earned); totalPaid: `totalPaid` (total paid); balanceOwed: `balanceOwed` (balance owed) to the caller and exits this function.

### Line 1143

```text
      shifts: empShifts,
```

Stores the shifts field with empShifts; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1144

```text
      payments: empPayments,
```

Stores the payments field with empPayments; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1145

```text
      totalEarned,
```

Uses the totalEarned, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1146

```text
      totalPaid,
```

Uses the totalPaid, expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1147

```text
      balanceOwed
```

Uses the balanceOwed expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1148

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1149

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1150

```text
  
```

Blank line separates related statements for readability.

### Line 1151

```text
  // IMPORT & EXPORT
```

This comment identifies the following implementation area: IMPORT & EXPORT.

### Line 1152

```text
  exportDirectoryData() {
```

Declares the exportDirectoryData model/store method, exposing this specific timekeeper behavior to its caller.

### Line 1153

```text
    return {
```

Returns an object with fields employees: calls `Object.fromEntries` with `this.employees` (the employees property of this); customers: calls `Object.fromEntries` with `this.customers` (the customers property of this) to the caller and exits this function.

### Line 1154

```text
      employees: Object.fromEntries(this.employees),
```

Stores the employees field with Object.fromEntries(this.employees); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1155

```text
      customers: Object.fromEntries(this.customers)
```

Stores the customers field with Object.fromEntries(this.customers); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1156

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1157

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1158

```text
  
```

Blank line separates related statements for readability.

### Line 1159

```text
  async importDirectoryData(jsonString) {
```

Declares the importDirectoryData operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1160

```text
    const parsed = JSON.parse(jsonString);
```

Derives parsed from JSON.parse(jsonString); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1161

```text
    if (!parsed || typeof parsed !== 'object' || !parsed.employees || !parsed.customers) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1162

```text
      throw new Error("Invalid format. File must contain 'employees' and 'customers'.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1163

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1164

```text
    for (const [id, emp] of Object.entries(parsed.employees)) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1165

```text
      await setDoc(doc(db, "employees", id), { name: emp.name, wage: emp.wage });
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 1166

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1167

```text
    for (const [id, cust] of Object.entries(parsed.customers)) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1168

```text
      const billingRate = Object.prototype.hasOwnProperty.call(cust, 'billingRate') ?
```

Derives billingRate from Object.prototype.hasOwnProperty.call(cust, 'billingRate') ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1169

```text
        cust.billingRate :
```

Uses the cust.billingRate : expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1170

```text
        this.customers.get(id)?.billingRate ?? null;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1171

```text
      await setDoc(doc(db, "customers", id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 1172

```text
        name: cust.name,
```

Stores the name field with cust.name; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1173

```text
        location: cust.location,
```

Stores the location field with cust.location; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1174

```text
        note: cust.note,
```

Stores the note field with cust.note; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1175

```text
        billingRate
```

Uses the billingRate expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1176

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1177

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1178

```text
    await this.init();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1179

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1180

```text
  
```

Blank line separates related statements for readability.

### Line 1181

```text
  exportShiftData() {
```

Declares the exportShiftData model/store method, exposing this specific timekeeper behavior to its caller.

### Line 1182

```text
    return this.shifts.map(s => ({
```

Returns transforms each item of `this.shifts` (the shifts property of this) using a callback taking s that an object with fields id: `s.id` (the id property of s); employeeId: checks `s.employee` (the employee property of s); if true chooses `s.employee.id` (the id property of s.employee), otherwise null; custId: checks `s.customer` (the customer property of s); if true chooses `s.customer.id` (the id property of s.customer), otherwise null; clockInTime: checks `s.clockInTime` (the clock in time property of s); if true chooses formats `s.clockInTime` as a UTC ISO date-time string, otherwise null; clockOutTime: checks `s.clockOutTime` (the clock out time property of s); if true chooses formats `s.clockOutTime` as a UTC ISO date-time string, otherwise null; note: uses `s.note` (the note property of s) when it is truthy, otherwise falls back to null; and further fields and returns a new array to the caller and exits this function.

### Line 1183

```text
      id: s.id,
```

Stores the id field with s.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1184

```text
      employeeId: s.employee ? s.employee.id : null,
```

Stores the employeeId field with s.employee ? s.employee.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1185

```text
      custId: s.customer ? s.customer.id : null,
```

Stores the custId field with s.customer ? s.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1186

```text
      clockInTime: s.clockInTime ? s.clockInTime.toISOString() : null,
```

Stores the clockInTime field with s.clockInTime ? s.clockInTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1187

```text
      clockOutTime: s.clockOutTime ? s.clockOutTime.toISOString() : null,
```

Stores the clockOutTime field with s.clockOutTime ? s.clockOutTime.toISOString() : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1188

```text
      note: s.note || null,
```

Stores the note field with s.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1189

```text
      isPaid: s.isPaid || null,
```

Stores the isPaid field with s.isPaid || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1190

```text
      breaks: s.breaks.map(b => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1191

```text
        start: b.start ? new Date(b.start).toISOString() : null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1192

```text
        end: b.end ? new Date(b.end).toISOString() : null
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1193

```text
      })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1194

```text
      paidHours: Number.isFinite(s.paidHours) ? s.paidHours : null
```

Stores the paidHours field with Number.isFinite(s.paidHours) ? s.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1195

```text
    }));
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1196

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1197

```text
  
```

Blank line separates related statements for readability.

### Line 1198

```text
  async importShiftData(jsonString) {
```

Declares the importShiftData operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1199

```text
    const parsed = JSON.parse(jsonString);
```

Derives parsed from JSON.parse(jsonString); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1200

```text
    if (!Array.isArray(parsed)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1201

```text
      throw new Error("Invalid format. File must be a JSON list of shifts.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1202

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1203

```text
    
```

Blank line separates related statements for readability.

### Line 1204

```text
    for (const shiftData of parsed) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1205

```text
      await setDoc(doc(db, "shifts", shiftData.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 1206

```text
        employeeId: shiftData.employeeId,
```

Stores the employeeId field with shiftData.employeeId; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1207

```text
        custId: shiftData.custId,
```

Stores the custId field with shiftData.custId; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1208

```text
        clockInTime: shiftData.clockInTime,
```

Stores the clockInTime field with shiftData.clockInTime; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1209

```text
        clockOutTime: shiftData.clockOutTime,
```

Stores the clockOutTime field with shiftData.clockOutTime; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1210

```text
        note: shiftData.note || null,
```

Stores the note field with shiftData.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1211

```text
        isPaid: shiftData.isPaid,
```

Stores the isPaid field with shiftData.isPaid; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1212

```text
        breaks: shiftData.breaks || [],
```

Stores the breaks field with shiftData.breaks || []; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1213

```text
        paidHours: shiftData.paidHours ?? null
```

Stores the paidHours field with shiftData.paidHours ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1214

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1215

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1216

```text
    await this.loadShifts();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1217

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1218

```text
  
```

Blank line separates related statements for readability.

### Line 1219

```text
  exportFullBackup() {
```

Declares the exportFullBackup model/store method, exposing this specific timekeeper behavior to its caller.

### Line 1220

```text
    const copy = value => JSON.parse(JSON.stringify(value));
```

Derives copy from value => JSON.parse(JSON.stringify(value)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1221

```text
    return {
```

Returns an object with fields format: "timekeeper-full-backup"; schemaVersion: 1; exportedAt: formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; data: an object with fields employees: transforms each item of an array containing the expanded entries/properties from `this.employees.values()` using a callback taking employee that an object with fields id: `employee.id`; name: `employee.name`; wage: `employee.wage` and returns a new array; customers: transforms each item of an array containing the expanded entries/properties from `this.customers.values()` using a callback taking customer that an object with fields id: `customer.id`; name: `customer.name`; location: `customer.location || null`; note: `customer.note || null`; billingRate: `customer.billingRate ?? null` and returns a new array; shifts: transforms each item of `this.shifts` (the shifts property of this) using a callback taking shift that an object with fields id: `shift.id`; employeeId: `shift.employee?.id || null`; custId: `shift.customer?.id || null`; clockInTime: `shift.clockInTime?.toISOString?.() || null`; clockOutTime: `shift.clockOutTime?.toISOString?.() || null`; note: `shift.note || null`; and further fields and returns a new array; invoices: transforms each item of `this.invoices` (the invoices property of this) using a callback taking invoice that an object with fields id: `invoice.id`; custId: `invoice.customer?.id || null`; items: `copy(invoice.items || [])`; isPaid: `Boolean(invoice.isPaid)`; date: `invoice.date || null`; shiftIds: `[...invoiceShiftIds(invoice)]` and returns a new array; payments: transforms each item of `this.payments` (the payments property of this) using a callback taking payment that an object with fields id: `payment.id`; employeeId: `payment.employeeId || null`; amount: `payment.amount`; date: `payment.date?.toISOString?.() || null`; note: `payment.note || ''` and returns a new array; plannedJobs: transforms each item of `this.plannedJobs` (the planned jobs property of this) using a callback taking job that an object with fields id: `job.id`; custId: `job.customer?.id || null`; description: `job.description || ''`; isComplete: `Boolean(job.isComplete)`; scheduledDate: `job.scheduledDate?.toISOString?.() || null` and returns a new array; and further fields to the caller and exits this function.

### Line 1222

```text
      format: 'timekeeper-full-backup',
```

Stores the format field with 'timekeeper-full-backup'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1223

```text
      schemaVersion: 1,
```

Stores the schemaVersion field with 1; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1224

```text
      exportedAt: new Date().toISOString(),
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1225

```text
      data: {
```

Stores the data field with {; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1226

```text
        employees: [...this.employees.values()].map(employee => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1227

```text
          id: employee.id,
```

Stores the id field with employee.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1228

```text
          name: employee.name,
```

Stores the name field with employee.name; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1229

```text
          wage: employee.wage
```

Stores the wage field with employee.wage; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1230

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1231

```text
        customers: [...this.customers.values()].map(customer => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1232

```text
          id: customer.id,
```

Stores the id field with customer.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1233

```text
          name: customer.name,
```

Stores the name field with customer.name; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1234

```text
          location: customer.location || null,
```

Stores the location field with customer.location || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1235

```text
          note: customer.note || null,
```

Stores the note field with customer.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1236

```text
          billingRate: customer.billingRate ?? null
```

Stores the billingRate field with customer.billingRate ?? null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1237

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1238

```text
        shifts: this.shifts.map(shift => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1239

```text
          id: shift.id,
```

Stores the id field with shift.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1240

```text
          employeeId: shift.employee?.id || null,
```

Stores the employeeId field with shift.employee?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1241

```text
          custId: shift.customer?.id || null,
```

Stores the custId field with shift.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1242

```text
          clockInTime: shift.clockInTime?.toISOString?.() || null,
```

Stores the clockInTime field with shift.clockInTime?.toISOString?.() || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1243

```text
          clockOutTime: shift.clockOutTime?.toISOString?.() || null,
```

Stores the clockOutTime field with shift.clockOutTime?.toISOString?.() || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1244

```text
          note: shift.note || null,
```

Stores the note field with shift.note || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1245

```text
          isPaid: Boolean(shift.isPaid),
```

Stores the isPaid field with Boolean(shift.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1246

```text
          breaks: (shift.breaks || []).map(item => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1247

```text
            start: item.start?.toISOString?.() || item.start || null,
```

Stores the start field with item.start?.toISOString?.() || item.start || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1248

```text
            end: item.end?.toISOString?.() || item.end || null
```

Stores the end field with item.end?.toISOString?.() || item.end || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1249

```text
          })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1250

```text
          paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
```

Stores the paidHours field with Number.isFinite(shift.paidHours) ? shift.paidHours : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1251

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1252

```text
        invoices: this.invoices.map(invoice => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1253

```text
          id: invoice.id,
```

Stores the id field with invoice.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1254

```text
          custId: invoice.customer?.id || null,
```

Stores the custId field with invoice.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1255

```text
          items: copy(invoice.items || []),
```

Stores the items field with copy(invoice.items || []); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1256

```text
          isPaid: Boolean(invoice.isPaid),
```

Stores the isPaid field with Boolean(invoice.isPaid); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1257

```text
          date: invoice.date || null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1258

```text
          shiftIds: [...invoiceShiftIds(invoice)]
```

Stores the shiftIds field with [...invoiceShiftIds(invoice)]; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1259

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1260

```text
        payments: this.payments.map(payment => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1261

```text
          id: payment.id,
```

Stores the id field with payment.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1262

```text
          employeeId: payment.employeeId || null,
```

Stores the employeeId field with payment.employeeId || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1263

```text
          amount: payment.amount,
```

Stores the amount field with payment.amount; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1264

```text
          date: payment.date?.toISOString?.() || null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1265

```text
          note: payment.note || ''
```

Stores the note field with payment.note || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1266

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1267

```text
        plannedJobs: this.plannedJobs.map(job => ({
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1268

```text
          id: job.id,
```

Stores the id field with job.id; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1269

```text
          custId: job.customer?.id || null,
```

Stores the custId field with job.customer?.id || null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1270

```text
          description: job.description || '',
```

Stores the description field with job.description || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1271

```text
          isComplete: Boolean(job.isComplete),
```

Stores the isComplete field with Boolean(job.isComplete); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1272

```text
          scheduledDate: job.scheduledDate?.toISOString?.() || null
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1273

```text
        })),
```

Uses the })), expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1274

```text
        ledger: this.ledger.entries.map(entry => ({ ...entry })),
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1275

```text
        ledgerArchives: this.ledgerArchives.map(archive => ({ ...archive, entryIds: [...(archive.entryIds || [])] })),
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1276

```text
        ledgerArchiveRows: this.ledgerArchiveRows.map(row => ({ ...row }))
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1277

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1278

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1279

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1280

```text
  
```

Blank line separates related statements for readability.

### Line 1281

```text
  previewFullBackup(backup) {
```

Declares the previewFullBackup model/store method, exposing this specific timekeeper behavior to its caller.

### Line 1282

```text
    const keys = ['employees', 'customers', 'shifts', 'invoices', 'payments', 'plannedJobs', 'ledger'];
```

Derives keys from ['employees', 'customers', 'shifts', 'invoices', 'payments', 'plannedJobs', 'ledger']; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1283

```text
    if (!backup || typeof backup !== 'object' || backup.format !== 'timekeeper-full-backup' || backup.schemaVersion !== 1) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1284

```text
      throw new Error('This is not a supported Timekeeper backup (expected schema version 1).');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1285

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1286

```text
    if (!backup.data || typeof backup.data !== 'object' || keys.some(key => !Array.isArray(backup.data[key]))) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1287

```text
      throw new Error('The backup is incomplete. It must contain employees, customers, shifts, invoices, payments, planned jobs, and ledger records.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1288

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1289

```text
    const hasArchiveHeaders = Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchives');
```

Derives hasArchiveHeaders from Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchives'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1290

```text
    const hasArchiveRows = Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchiveRows');
```

Derives hasArchiveRows from Object.prototype.hasOwnProperty.call(backup.data, 'ledgerArchiveRows'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1291

```text
    if (hasArchiveHeaders !== hasArchiveRows ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1292

```text
      (hasArchiveHeaders && (!Array.isArray(backup.data.ledgerArchives) || !Array.isArray(backup.data.ledgerArchiveRows)))) {
```

Uses the (hasArchiveHeaders && (!Array.isArray(backup.data.ledgerArchives) || !Array.isArray(backup.data.ledgerArchiveRows)))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1293

```text
      throw new Error('The archived-ledger data is incomplete. Include both archive headers and archive entries.');
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1294

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1295

```text
    const archiveKeys = hasArchiveHeaders ? ['ledgerArchives', 'ledgerArchiveRows'] : [];
```

Derives archiveKeys from hasArchiveHeaders ? ['ledgerArchives', 'ledgerArchiveRows'] : []; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1296

```text
    const validatedKeys = [...keys, ...archiveKeys];
```

Derives validatedKeys from [...keys, ...archiveKeys]; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1297

```text
    for (const key of validatedKeys) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1298

```text
      const ids = new Set();
```

Derives ids from new Set(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1299

```text
      for (const [index, record] of backup.data[key].entries()) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1300

```text
        if (!record || typeof record !== 'object' || typeof record.id !== 'string' || !record.id.trim() || record.id.includes('/')) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1301

```text
          throw new Error(`The ${key} list has an invalid record at row ${index + 1}.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1302

```text
        }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1303

```text
        if (ids.has(record.id)) throw new Error(`The ${key} list contains duplicate ID ${record.id}.`);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1304

```text
        ids.add(record.id);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1305

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1306

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1307

```text
    
```

Blank line separates related statements for readability.

### Line 1308

```text
    const validDateOrNull = value => value === null || value === undefined ||
```

Derives validDateOrNull from value => value === null || value === undefined ||; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1309

```text
      (typeof value === 'string' && value.length > 0 && !Number.isNaN(Date.parse(value)));
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1310

```text
    const finiteOrNull = value => value === null || value === undefined || Number.isFinite(Number(value));
```

Derives finiteOrNull from value => value === null || value === undefined || Number.isFinite(Number(value)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1311

```text
    for (const employee of backup.data.employees) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1312

```text
      if (typeof employee.name !== 'string' || typeof employee.wage !== 'number' || !Number.isFinite(employee.wage) || employee.wage < 0) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1313

```text
        throw new Error(`Employee ${employee.id} needs a name and a non-negative wage.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1314

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1315

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1316

```text
    for (const customer of backup.data.customers) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1317

```text
      if (typeof customer.name !== 'string' || !finiteOrNull(customer.billingRate) ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1318

```text
        (customer.billingRate !== null && customer.billingRate !== undefined &&
```

Uses the (customer.billingRate !== null && customer.billingRate !== undefined && expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1319

```text
          (typeof customer.billingRate !== 'number' || customer.billingRate < 0))) {
```

Uses the (typeof customer.billingRate !== 'number' || customer.billingRate < 0))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1320

```text
        throw new Error(`Customer ${customer.id} has invalid name or billing-rate data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1321

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1322

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1323

```text
    for (const shift of backup.data.shifts) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1324

```text
      if (!validDateOrNull(shift.clockInTime) || !validDateOrNull(shift.clockOutTime) ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1325

```text
        !Array.isArray(shift.breaks || []) || !finiteOrNull(shift.paidHours) || typeof shift.isPaid !== 'boolean' ||
```

Uses the !Array.isArray(shift.breaks || []) || !finiteOrNull(shift.paidHours) || typeof shift.isPaid !== 'boolean' || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1326

```text
        (shift.paidHours !== null && shift.paidHours !== undefined && typeof shift.paidHours !== 'number') ||
```

Uses the (shift.paidHours !== null && shift.paidHours !== undefined && typeof shift.paidHours !== 'number') || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1327

```text
        (shift.breaks || []).some(item => !item || typeof item !== 'object' ||
```

Uses the (shift.breaks || []).some(item => !item || typeof item !== 'object' || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1328

```text
          !validDateOrNull(item.start) || !validDateOrNull(item.end))) {
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1329

```text
        throw new Error(`Shift ${shift.id} has invalid date, break, or paid-hours data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1330

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1331

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1332

```text
    for (const invoice of backup.data.invoices) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1333

```text
      if (!Array.isArray(invoice.items) || !validDateOrNull(invoice.date) || typeof invoice.isPaid !== 'boolean' ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1334

```text
        invoice.items.some(item => !item || typeof item.name !== 'string' || typeof item.value !== 'number' || !Number.isFinite(item.value))) {
```

Uses the invoice.items.some(item => !item || typeof item.name !== 'string' || typeof item.value !== 'number' || !Number.isFinite(item.value))) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1335

```text
        throw new Error(`Invoice ${invoice.id} has invalid item or date data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1336

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1337

```text
      const laborShiftIds = invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId));
```

Derives laborShiftIds from invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1338

```text
      if (new Set(laborShiftIds).size !== laborShiftIds.length) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1339

```text
        throw new Error(`Invoice ${invoice.id} attaches the same shift more than once.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1340

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1341

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1342

```text
    const shiftOwners = new Map();
```

Derives shiftOwners from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1343

```text
    for (const invoice of backup.data.invoices) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1344

```text
      const linkedIds = new Set([...(Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []),
```

Derives linkedIds from new Set([...(Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []),; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1345

```text
        ...invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId))
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1346

```text
      ].map(String));
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1347

```text
      for (const shiftId of linkedIds) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1348

```text
        const owner = shiftOwners.get(shiftId);
```

Derives owner from shiftOwners.get(shiftId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1349

```text
        if (owner && owner !== invoice.id) throw new Error(`Shift ${shiftId} is attached to more than one invoice in this backup.`);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1350

```text
        shiftOwners.set(shiftId, invoice.id);
```

Invokes shiftOwners.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 1351

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1352

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1353

```text
    for (const payment of backup.data.payments) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1354

```text
      if (typeof payment.amount !== 'number' || !Number.isFinite(payment.amount) || !validDateOrNull(payment.date)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1355

```text
        throw new Error(`Payment ${payment.id} has invalid amount or date data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1356

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1357

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1358

```text
    for (const job of backup.data.plannedJobs) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1359

```text
      if (typeof job.description !== 'string' || !validDateOrNull(job.scheduledDate) || typeof job.isComplete !== 'boolean') {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1360

```text
        throw new Error(`Planned job ${job.id} has invalid description or date data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1361

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1362

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1363

```text

```

Blank line separates related statements for readability.

### Line 1364

```text
    if (hasArchiveHeaders) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1365

```text
      const archiveById = new Map();
```

Derives archiveById from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1366

```text
      for (const archive of backup.data.ledgerArchives) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1367

```text
        if (typeof archive.employeeId !== 'string' || typeof archive.employeeName !== 'string' ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1368

```text
          !validDateOrNull(archive.archivedAt) || typeof archive.balanceCents !== 'number' ||
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1369

```text
          !Number.isFinite(archive.balanceCents) || archive.balanceCents !== 0 || !Number.isInteger(archive.entryCount) ||
```

Uses the !Number.isFinite(archive.balanceCents) || archive.balanceCents !== 0 || !Number.isInteger(archive.entryCount) || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1370

```text
          archive.entryCount < 1 || !Array.isArray(archive.entryIds) ||
```

Uses the archive.entryCount < 1 || !Array.isArray(archive.entryIds) || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1371

```text
          !['pending', 'archived'].includes(archive.status) || archive.entryIds.length !== archive.entryCount ||
```

Uses the !['pending', 'archived'].includes(archive.status) || archive.entryIds.length !== archive.entryCount || expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1372

```text
          new Set(archive.entryIds.map(String)).size !== archive.entryIds.length) {
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1373

```text
          throw new Error(`Ledger archive ${archive.id} has invalid summary data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1374

```text
        }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1375

```text
        archiveById.set(archive.id, archive);
```

Invokes archiveById.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 1376

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1377

```text
      const entryIdsByArchive = new Map([...archiveById].map(([id, archive]) => [id, new Set(archive.entryIds.map(String))]));
```

Derives entryIdsByArchive from new Map([...archiveById].map(([id, archive]) => [id, new Set(archive.entryIds.map(String))])); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1378

```text
      const archivedEntryIds = new Map();
```

Derives archivedEntryIds from new Map(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1379

```text
      for (const row of backup.data.ledgerArchiveRows) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1380

```text
        const archive = archiveById.get(row.archiveId);
```

Derives archive from archiveById.get(row.archiveId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1381

```text
        if (!archive || typeof row.sourceEntryId !== 'string' || row.employeeId !== archive.employeeId ||
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1382

```text
          !entryIdsByArchive.get(row.archiveId).has(row.sourceEntryId) || !Number.isFinite(Number(row.amount)) ||
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 1383

```text
          !Number.isFinite(Number(row.hours))) {
```

Normalizes numeric payroll/billing data and applies the timekeeper wage, amount, or cent-accurate balance calculation required by this branch.

### Line 1384

```text
          throw new Error(`Archived ledger entry ${row.id} has invalid or unmatched data.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1385

```text
        }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1386

```text
        const key = `${row.archiveId}:${row.sourceEntryId}`;
```

Derives key from `${row.archiveId}:${row.sourceEntryId}`; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1387

```text
        if (archivedEntryIds.has(key)) throw new Error(`Ledger archive ${row.archiveId} contains duplicate entry ${row.sourceEntryId}.`);
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1388

```text
        archivedEntryIds.set(key, true);
```

Invokes archivedEntryIds.set for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 1389

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1390

```text
      for (const archive of backup.data.ledgerArchives) {
```

Iterates through the selected records so each timekeeper entity receives the same persistence or validation treatment.

### Line 1391

```text
        const storedCount = archive.entryIds.filter(entryId => archivedEntryIds.has(`${archive.id}:${String(entryId)}`)).length;
```

Derives storedCount from archive.entryIds.filter(entryId => archivedEntryIds.has(`${archive.id}:${String(entryId)}`)).length; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1392

```text
        if (archive.status === 'archived' && storedCount !== archive.entryCount) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1393

```text
          throw new Error(`Ledger archive ${archive.id} is missing archived entries.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1394

```text
        }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1395

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1396

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1397

```text
    
```

Blank line separates related statements for readability.

### Line 1398

```text
    return {
```

Returns an object with fields format: `backup.format` (the format property of backup); schemaVersion: `backup.schemaVersion` (the schema version property of backup); exportedAt: checks calls `validDateOrNull` with `backup.exportedAt` (the exported at property of backup); if true chooses `backup.exportedAt` (the exported at property of backup), otherwise null; counts: calls `Object.fromEntries` with transforms each item of `validatedKeys` (validated keys) using a callback taking key that an array containing `key` (key), `backup.data[key].length` and returns a new array; archiveHistoryIncluded: `hasArchiveHeaders` (has archive headers) to the caller and exits this function.

### Line 1399

```text
      format: backup.format,
```

Stores the format field with backup.format; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1400

```text
      schemaVersion: backup.schemaVersion,
```

Stores the schemaVersion field with backup.schemaVersion; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1401

```text
      exportedAt: validDateOrNull(backup.exportedAt) ? backup.exportedAt : null,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1402

```text
      counts: Object.fromEntries(validatedKeys.map(key => [key, backup.data[key].length])),
```

Transforms each entity or nested value into the storage/display shape required by this operation.

### Line 1403

```text
      archiveHistoryIncluded: hasArchiveHeaders
```

Stores the archiveHistoryIncluded field with hasArchiveHeaders; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1404

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1405

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1406

```text
  
```

Blank line separates related statements for readability.

### Line 1407

```text
  async restoreFullBackup(backup) {
```

Declares the restoreFullBackup operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1408

```text
    const preview = this.previewFullBackup(backup);
```

Derives preview from this.previewFullBackup(backup); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1409

```text
    const collectionByKey = {
```

Derives collectionByKey from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1410

```text
      employees: 'employees',
```

Stores the employees field with 'employees'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1411

```text
      customers: 'customers',
```

Stores the customers field with 'customers'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1412

```text
      shifts: 'shifts',
```

Stores the shifts field with 'shifts'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1413

```text
      invoices: 'invoices',
```

Stores the invoices field with 'invoices'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1414

```text
      payments: 'payments',
```

Stores the payments field with 'payments'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1415

```text
      plannedJobs: 'planned',
```

Stores the plannedJobs field with 'planned'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1416

```text
      ledger: 'ledgerRows'
```

Stores the ledger field with 'ledgerRows'; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1417

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1418

```text
    if (preview.archiveHistoryIncluded) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1419

```text
      collectionByKey.ledgerArchives = 'ledgerArchives';
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1420

```text
      collectionByKey.ledgerArchiveRows = 'ledgerArchiveRows';
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1421

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1422

```text
    const snapshots = await Promise.all(Object.values(collectionByKey).map(name => getDocs(collection(db, name))));
```

Derives snapshots from await Promise.all(Object.values(collectionByKey).map(name => getDocs(collection(db, name)))); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1423

```text
    const batch = writeBatch(db);
```

Derives batch from writeBatch(db); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1424

```text
    let operationCount = 0;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1425

```text
    
```

Blank line separates related statements for readability.

### Line 1426

```text
    Object.entries(collectionByKey).forEach(([key, collectionName], index) => {
```

Uses the Object.entries(collectionByKey).forEach(([key, collectionName], index) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1427

```text
      const savedRecords = backup.data[key];
```

Derives savedRecords from backup.data[key]; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1428

```text
      const savedIds = new Set(savedRecords.map(record => record.id));
```

Derives savedIds from new Set(savedRecords.map(record => record.id)); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1429

```text
      snapshots[index].forEach(docSnap => {
```

Uses the snapshots[index].forEach(docSnap => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1430

```text
        if (!savedIds.has(docSnap.id)) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1431

```text
          batch.delete(doc(db, collectionName, docSnap.id));
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 1432

```text
          operationCount += 1;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1433

```text
        }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1434

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1435

```text
      savedRecords.forEach(record => {
```

Uses the savedRecords.forEach(record => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1436

```text
        const { id, ...documentData } = record;
```

Derives { id, ...documentData } from record; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1437

```text
        batch.set(doc(db, collectionName, id), documentData);
```

Builds or applies a Firestore batch so multiple related records are written atomically and within Firestore’s operation limit.

### Line 1438

```text
        operationCount += 1;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1439

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1440

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1441

```text
    
```

Blank line separates related statements for readability.

### Line 1442

```text
    if (operationCount > 500) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1443

```text
      throw new Error(`This restore needs ${operationCount} Firestore writes; one atomic restore is limited to 500. No data was changed.`);
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1444

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1445

```text
    if (operationCount) await commitBatch(batch, 'Restoring the selected backup failed.');
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1446

```text
    await this.init();
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1447

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1448

```text
  
```

Blank line separates related statements for readability.

### Line 1449

```text
  
```

Blank line separates related statements for readability.

### Line 1450

```text
  // PLANNED JOBS
```

This comment identifies the following implementation area: PLANNED JOBS.

### Line 1451

```text
  async loadPlanned() {
```

Declares the loadPlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1452

```text
    this.plannedJobs = [];
```

Sets this object’s plannedJobs (future customer work items) from [], keeping in-memory state aligned with the entity’s business meaning.

### Line 1453

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1454

```text
      const querySnapshot = await getDocs(collection(db, "planned"));
```

Derives querySnapshot from await getDocs(collection(db, "planned")); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1455

```text
      querySnapshot.forEach((docSnap) => {
```

Uses the querySnapshot.forEach((docSnap) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1456

```text
        const data = docSnap.data();
```

Derives data from docSnap.data(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1457

```text
        const customer = (data.custId && this.customers.get(data.custId)) ||
```

Derives customer from (data.custId && this.customers.get(data.custId)) ||; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1458

```text
          (data.custId ? new Customer(data.custId, 'Unknown Site') : null);
```

Invokes  for the surrounding timekeeper workflow, applying the current entity, validation, or UI update before the next statement.

### Line 1459

```text
        const storedDate = data.scheduledDate?.toDate?.() || data.scheduledDate || null;
```

Derives storedDate from data.scheduledDate?.toDate?.() || data.scheduledDate || null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1460

```text
        const planned = new PlannedJob(data.description, storedDate, customer, data.isComplete, docSnap.id);
```

Derives planned from new PlannedJob(data.description, storedDate, customer, data.isComplete, docSnap.id); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1461

```text
        this.plannedJobs.push(planned);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1462

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1463

```text
      this.plannedJobs.sort((a, b) => {
```

Sets this object’s plannedJobs.sort((a, b) (domain state) from > {, keeping in-memory state aligned with the entity’s business meaning.

### Line 1464

```text
        const dateA = a.scheduledDate?.getTime() ?? null;
```

Derives dateA from a.scheduledDate?.getTime() ?? null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1465

```text
        const dateB = b.scheduledDate?.getTime() ?? null;
```

Derives dateB from b.scheduledDate?.getTime() ?? null; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1466

```text
        if (dateA === null && dateB !== null) return 1;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1467

```text
        if (dateA !== null && dateB === null) return -1;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1468

```text
        return (dateA ?? 0) - (dateB ?? 0);
```

Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.

### Line 1469

```text
      });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1470

```text
    } catch (e) {
```

Uses the } catch (e) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1471

```text
      console.error("Error loading planned jobs from Firestore:", e);
```

Reports this Firestore/model diagnostic to the browser console so failures can be investigated without losing the user-facing error path.

### Line 1472

```text
      this.loadFailures.push(e);
```

Adds the newly created timekeeper record to the in-memory collection after the relevant checks.

### Line 1473

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1474

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1475

```text
  
```

Blank line separates related statements for readability.

### Line 1476

```text
  async savePlanned(planned) {
```

Declares the savePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1477

```text
    let scheduledDate = null;
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1478

```text
    if (planned.scheduledDate !== null && planned.scheduledDate !== undefined && planned.scheduledDate !== '') {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1479

```text
      scheduledDate = planned.scheduledDate instanceof Date ? planned.scheduledDate : new Date(planned.scheduledDate);
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1480

```text
      if (Number.isNaN(scheduledDate.getTime())) {
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1481

```text
        throw new Error("Planned job needs a valid scheduled date or no date.");
```

Rejects invalid or unsafe timekeeper data with a user-facing validation error instead of writing it.

### Line 1482

```text
      }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1483

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1484

```text
    await setDoc(doc(db, "planned", planned.id), {
```

Writes the entity to its Firestore document ID, keeping the remote record and local model keyed consistently.

### Line 1485

```text
      custId: planned.customer ? planned.customer.id : null,
```

Stores the custId field with planned.customer ? planned.customer.id : null; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1486

```text
      description: planned.description || '',
```

Stores the description field with planned.description || ''; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1487

```text
      isComplete: Boolean(planned.isComplete),
```

Stores the isComplete field with Boolean(planned.isComplete); this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1488

```text
      scheduledDate
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1489

```text
    });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1490

```text
    return planned;
```

Returns `planned` (planned) to the caller and exits this function.

### Line 1491

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1492

```text
  
```

Blank line separates related statements for readability.

### Line 1493

```text
  async setPlannedComplete(plannedId, isComplete) {
```

Declares the setPlannedComplete operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1494

```text
    const planned = this.plannedJobs.find(job => job.id === plannedId);
```

Derives planned from this.plannedJobs.find(job => job.id === plannedId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1495

```text
    if (!planned) throw new Error("Planned job not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1496

```text
    const previousValue = planned.isComplete;
```

Derives previousValue from planned.isComplete; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1497

```text
    planned.isComplete = Boolean(isComplete);
```

Updates planned.isComplete to Boolean(isComplete); this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1498

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1499

```text
      await this.savePlanned(planned);
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1500

```text
      return planned;
```

Returns `planned` (planned) to the caller and exits this function.

### Line 1501

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1502

```text
      planned.isComplete = previousValue;
```

Updates planned.isComplete to previousValue; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1503

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 1504

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1505

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1506

```text
  
```

Blank line separates related statements for readability.

### Line 1507

```text
  async updatePlanned(plannedId, description, scheduledDate, customer) {
```

Declares the updatePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1508

```text
    const planned = this.plannedJobs.find(job => job.id === plannedId);
```

Derives planned from this.plannedJobs.find(job => job.id === plannedId); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1509

```text
    if (!planned) throw new Error("Planned job not found.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1510

```text
    const cleanDescription = String(description || '').trim();
```

Derives cleanDescription from String(description || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1511

```text
    const nextDate = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
```

Derives nextDate from scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1512

```text
      null :
```

Stores the null field with ; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1513

```text
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1514

```text
    if (!cleanDescription) throw new Error("Add a job description before saving.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1515

```text
    if (nextDate && Number.isNaN(nextDate.getTime())) throw new Error("Planned job needs a valid scheduled date or no date.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1516

```text
    if (!customer) throw new Error("Choose a customer before saving this job.");
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1517

```text
    
```

Blank line separates related statements for readability.

### Line 1518

```text
    const previous = {
```

Derives previous from {; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1519

```text
      description: planned.description,
```

Stores the description field with planned.description; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1520

```text
      scheduledDate: planned.scheduledDate,
```

Parses, validates, or serializes a timekeeper date/time so shifts, breaks, payments, invoices, or jobs remain consistent across Firestore and the browser.

### Line 1521

```text
      customer: planned.customer
```

Stores the customer field with planned.customer; this object field is part of the Firestore payload or a domain record used by timekeeper.

### Line 1522

```text
    };
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1523

```text
    planned.description = cleanDescription;
```

Updates planned.description to cleanDescription; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1524

```text
    planned.scheduledDate = nextDate;
```

Updates planned.scheduledDate to nextDate; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1525

```text
    planned.customer = customer;
```

Updates planned.customer to customer; this keeps the in-memory record or error metadata consistent after the Firestore operation.

### Line 1526

```text
    try {
```

Uses the try { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1527

```text
      await this.savePlanned(planned);
```

Waits for the asynchronous Firestore or ledger operation to finish before allowing dependent local state changes to proceed.

### Line 1528

```text
      return planned;
```

Returns `planned` (planned) to the caller and exits this function.

### Line 1529

```text
    } catch (error) {
```

Uses the } catch (error) { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1530

```text
      Object.assign(planned, previous);
```

Applies the validated field changes to the existing in-memory entity while retaining fields not included in the update.

### Line 1531

```text
      throw error;
```

Propagates the original Firestore/domain error after local rollback or error metadata updates so the caller can show the failed operation.

### Line 1532

```text
    }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1533

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1534

```text
  
```

Blank line separates related statements for readability.

### Line 1535

```text
  async deletePlanned(plannedId) {
```

Declares the deletePlanned operation in the timekeeper API; callers use it for the surrounding Firestore, validation, calculation, or UI workflow.

### Line 1536

```text
    await deleteDoc(doc(db, "planned", plannedId));
```

Deletes the corresponding Firestore document so the remote record matches the local removal.

### Line 1537

```text
    this.plannedJobs = this.plannedJobs.filter(job => job.id !== plannedId);
```

Sets this object’s plannedJobs (future customer work items) from this.plannedJobs.filter(job => job.id !== plannedId), keeping in-memory state aligned with the entity’s business meaning.

### Line 1538

```text
  }
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1539

```text
  
```

Blank line separates related statements for readability.

### Line 1540

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1541

```text

```

Blank line separates related statements for readability.

### Line 1542

```text
export const store = new AppDataStore();
```

Creates the singleton store shared by the UI modules.

### Line 1543

```text

```

Blank line separates related statements for readability.

### Line 1544

```text
const nameCollator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
```

Creates a locale-aware collator that ignores case and naturally orders numeric portions of names.

### Line 1545

```text

```

Blank line separates related statements for readability.

### Line 1546

```text
export function compareByFirstName(a, b) {
```

Exports employee/customer sorting by first name, with a full-name tie-breaker.

### Line 1547

```text
  const nameA = String(a?.name || '').trim();
```

Derives nameA from String(a?.name || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1548

```text
  const nameB = String(b?.name || '').trim();
```

Derives nameB from String(b?.name || '').trim(); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1549

```text
  const firstA = nameA.split(/\s+/)[0] || '';
```

Derives firstA from nameA.split(/\s+/)[0] || ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1550

```text
  const firstB = nameB.split(/\s+/)[0] || '';
```

Derives firstB from nameB.split(/\s+/)[0] || ''; this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1551

```text
  return nameCollator.compare(firstA, firstB) || nameCollator.compare(nameA, nameB);
```

Returns uses calls `nameCollator.compare` with `firstA` (first a); `firstB` (first b) when it is truthy, otherwise falls back to calls `nameCollator.compare` with `nameA` (name a); `nameB` (name b) to the caller and exits this function.

### Line 1552

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1553

```text

```

Blank line separates related statements for readability.

### Line 1554

```text
export function populateEmployeeDropdowns(empDropdownElement) {
```

Exports a helper that repopulates an employee select element from the current store.

### Line 1555

```text
  if (!empDropdownElement) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1556

```text
  empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 1557

```text
  [...store.employees.values()].sort(compareByFirstName).forEach((emp) => {
```

Uses the [...store.employees.values()].sort(compareByFirstName).forEach((emp) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1558

```text
    const opt = document.createElement('option');
```

Derives opt from document.createElement('option'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1559

```text
    opt.value = emp.id;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1560

```text
    opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 1561

```text
    empDropdownElement.appendChild(opt);
```

Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.

### Line 1562

```text
  });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1563

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1564

```text

```

Blank line separates related statements for readability.

### Line 1565

```text
export function populateCustomerDropdowns(custDropdownElement) {
```

Exports the analogous helper for customer/site select elements.

### Line 1566

```text
  if (!custDropdownElement) return;
```

Guards this operation so invalid state or missing timekeeper data is handled before the next business step.

### Line 1567

```text
  custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 1568

```text
  [...store.customers.values()].sort(compareByFirstName).forEach((cust) => {
```

Uses the [...store.customers.values()].sort(compareByFirstName).forEach((cust) => { expression as part of the surrounding timekeeper model operation, carrying the current entity or control-flow state to the next business step.

### Line 1569

```text
    const opt = document.createElement('option');
```

Derives opt from document.createElement('option'); this local value carries the validated or normalized data needed by the surrounding timekeeper calculation.

### Line 1570

```text
    opt.value = cust.id;
```

Performs the surrounding timekeeper operation and preserves the model/store state needed by subsequent UI or Firestore work.

### Line 1571

```text
    opt.textContent = cust.customInfo();
```

Updates visible DOM text/options so the interface reflects the current error or entity selection.

### Line 1572

```text
    custDropdownElement.appendChild(opt);
```

Adds the constructed DOM node to the banner or dropdown so the user can see and interact with the current timekeeper data.

### Line 1573

```text
  });
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.

### Line 1574

```text
}
```

Structural delimiter closes or opens the surrounding block; it controls scope but performs no business operation itself.
