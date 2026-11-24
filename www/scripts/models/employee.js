import { Ledger } from './ledger.js';

export class Employee {
  constructor(name, wage, ledger = null, id = null) {
    this.name = name;
    // Employee.wage is the payroll rate; customer billing rates are separate.
    this.wage = wage;
    this.ledger = ledger || new Ledger();
    this.id = id || crypto.randomUUID();
  }
}
