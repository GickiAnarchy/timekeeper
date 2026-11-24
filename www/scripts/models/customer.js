


export class Customer {
    constructor(id, name, loc = '', note = '', hourlyRate = 0) {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.loc = loc;
        this.note = note || "";
        // Customer.hourlyRate describes billing, never employee payroll.
        this.hourlyRate = hourlyRate;
    }

}
