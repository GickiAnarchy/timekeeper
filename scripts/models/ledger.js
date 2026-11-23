

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
  if (typeof newEntry !== LedgerEntry ) {
    return;
  }
    this.entries.push(newEntry);
  }

  sortByDate() {
    this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
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