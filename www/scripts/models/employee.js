import { Ledger } from './ledger.js';


class Employee {
  constructor(name, wage, ledger = null, id = null) {
    this.name = name;
    this.wage = wage;
    this.ledger = ledger || new Ledger();
    this.id = id || crypto.randomUUID();
  }
}