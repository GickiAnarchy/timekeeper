

class LedgerEntry {
  constructor({ id, date, entryType, amount, note }) {
    this.id = id || crypto.randomUUID();
    this.date = date;
    if (entryType !== 'general' && entryType !== 'advance') {
      entryType = 'general';
    }
    this.entryType = entryType;
    this.amount = amount;
    this.note = note;
  }
}


class Ledger {
  constructor(entries = []) {
    this.entries = entries;       //  List of LedgerEntry 
  }

  addEntry(newEntry) {
    // Require an actual entry object so malformed values cannot enter the ledger.
    if (!(newEntry instanceof LedgerEntry)) {
      return false;
    }

    // IDs identify saved records, so never append a second copy of the same entry.
    if (this.entries.some((entry) => entry?.id === newEntry.id)) {
      return false;
    }

    this.entries.push(newEntry);
    return true;
  }

  sortByDate() {
    this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  sortByType() {
    this.entries.sort((a,b) => {
      const order = { 'general': 1, 'advance': 2};
      return order[a.entryType] - order[b.entryType]
    });
    console.log("Ledger sorted by entry type.");
  }

  getTotal() {
    let totalBalance = 0;
    this.entries.forEach((entry) => {
      if (entry.entryType === 'general') {
        totalBalance += entry.amount;
      } else if (entry.entryType === 'advance') {
        totalBalance -= entry.amount;
      }
    });
    return totalBalance;
  }

  getTotalAdvances() {
    let totalAdvances = 0;
    this.entries.forEach((entry) => {
      if (entry.entryType === 'advance') {
        totalAdvances += entry.amount;
      }
    });
    return totalAdvances;
  }

  getTotalGeneral() {
    let totalGeneral = 0;
    this.entries.forEach((entry) => {
      if (entry.entryType === 'general') {
        totalGeneral += entry.amount;
      }
    });
    return totalGeneral;
  }

}
