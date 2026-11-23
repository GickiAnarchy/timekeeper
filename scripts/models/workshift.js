

class Workshift {
    constructor(id, employeeId, customerId, startTime, endTime) {
        this.id = id || crypto.randomUUID();
        this.employeeId = employeeId;
        this.customerId = customerId;
        this.startTime = startTime || new Date();
        this.endTime = endTime;
    }

    startShift() {
        this.startTime = new Date();
        console.log(`Shift started at ${this.startTime}`);
        //TODO : Add logic to check if the employee is already on a shift and handle accordingly.
        //TODO : Add logic to round time to the next 15 minute increment.
    }

    stopShift() {
        if (!this.startTime) {
            console.log("Cannot stop shift. Shift has not been started.");
            return;
        }
        this.endTime = new Date();
        console.log(`Shift ended at ${this.endTime}`);
        //TODO : Add logic to round time to the most recent 15 minute increment.
        //TODO : Add logic to calculate the duration of the shift and update the employee's ledger accordingly.
    }

    getDuration() {
        if (!this.startTime || !this.endTime) {
            console.log("Cannot calculate duration. Shift has not been started or stopped.");
            return null;
        }
        const durationMs = this.endTime - this.startTime;
        const durationHours = durationMs / (1000 * 60 * 60);
        return durationHours;
    }

    getTotalPay(hourlyWage) {
        const duration = this.getDuration();
        if (duration === null) {
            console.log("Cannot calculate total pay. Shift duration is not available.");
            return null;
        }
        return duration * hourlyWage;
        //TODO : Add logic to calculate total pay based on the employee's hourly wage and the duration of the shift, taking into account any breaks or overtime.
        //TODO : Add logic to handle different pay rates for different types of work (e.g., regular, overtime, holiday, etc.).
        //TODO : Add formatting for the total pay to display as currency.
    }
    
    //TODO : Add breaks in 15 minute increments, and calculate the total break time to subtract from the total shift duration.

}