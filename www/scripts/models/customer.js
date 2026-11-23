


class Customer {
    constructor(id, name, loc, note, hourlyRate) {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.loc = loc;
        this.note = note || "";
        this.hourlyRate = hourlyRate;
    }

}