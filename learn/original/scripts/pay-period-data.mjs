// Deliberately do not use store.init(): it can resume or create ledger archives.
// Keep this allowlist limited to reads so simply opening a review cannot change data.
export async function loadPayPeriodReviewData(store) {
  store.loadFailures = [];
  await store.loadEmployees();
  await store.loadCustomers();
  await store.loadShifts();
  await store.loadInvoices();
  await store.loadLedger();
  await store.loadLedgerArchives();
  // Existing loaders report failures instead of throwing. Never show a partial
  // snapshot as a complete review (especially an apparently zero ledger balance).
  if (store.loadFailures.length) {
    throw new Error('Some review data could not be loaded. No totals are shown; refresh to try again.');
  }
  return {
    employees: [...store.employees.values()],
    shifts: store.shifts,
    invoices: store.invoices,
    ledgerEntries: store.ledger.entries,
    ledgerArchiveRows: store.ledgerArchiveRows
  };
}
