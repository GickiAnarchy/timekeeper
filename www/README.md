# Rework shift and payroll flow

This is the small, runnable `www` app for the `rework` branch. It covers employee/customer setup, active shifts, completed-shift history, and employee payroll-ledger entries.

## Run it locally

From the repository root, start any static HTTP server, for example:

```sh
python3 -m http.server 8000 --directory www
```

Open <http://localhost:8000/>. Running it over HTTP on `localhost` is important; opening `index.html` as a `file://` URL can block ES modules or browser storage.

The app saves records in this browser profile's `localStorage` under `timekeeper-rework-local-v1`. It has no cloud persistence or cross-device sync. Clearing the browser's site data removes these records.

## Manual smoke test

1. Add employee **Alex** with a payroll wage of **$20.00/hour**.
2. Add customer **Maple Street** with a billing rate of **$60.00/hour**. The customer rate is shown as billing-only and is not used for payroll.
3. Choose Alex and Maple Street and clock in. A start time near 9:07 rounds forward to 9:15. Try clocking Alex in again; the app must prevent a second active shift for that employee.
4. Clock out at a time such as 11:08 and enter **15** break minutes. A clock-out near 11:08 rounds back to 11:00, producing **1.50 paid hours** and **$30.00** payroll using Alex's $20 wage.
5. Confirm the completed shift and one ledger entry appear with the same `sourceShiftId`. The $60 customer billing rate must not change the $30 payroll amount.
6. Reload the page. Employee, customer, shift history, and ledger should still appear in the same browser. The local-only notice should remain visible; this is not a sync test.
7. Optional idempotency check in the browser console: run the following with the completed shift's ID in place of `shift-id` and confirm the returned ledger list has one matching row:

   ```js
   const { ShiftService } = await import('./scripts/services/shift-service.js');
   const { LocalStoragePersistence } = await import('./scripts/local-persistence.js');
   const check = new ShiftService({ persistence: new LocalStoragePersistence() });
   check.postShiftToLedger('shift-id');
   check.postShiftToLedger('shift-id');
   check.getLedgerEntries().filter(entry => entry.sourceShiftId === 'shift-id');
   ```

## Automated checks

Run the focused checks with:

```sh
npm run test:rework
```

The legacy repo-wide `npm test` currently includes older tests for missing root-level `scripts/` and `html/` files; those unrelated files are outside this shift-flow change.
