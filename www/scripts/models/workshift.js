const QUARTER_HOUR_MS = 15 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

// Round clock-in times forward and clock-out times backward without mutating the source date.
function roundUpToQuarterHour(value) {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp)
        ? new Date(Math.ceil(timestamp / QUARTER_HOUR_MS) * QUARTER_HOUR_MS)
        : new Date(NaN);
}

function roundDownToQuarterHour(value) {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp)
        ? new Date(Math.floor(timestamp / QUARTER_HOUR_MS) * QUARTER_HOUR_MS)
        : new Date(NaN);
}

class Workshift {
    constructor(id, employeeId, customerId, startTime, endTime, breakDurationMinutes = 0) {
        this.id = id || crypto.randomUUID();
        this.employeeId = employeeId;
        this.customerId = customerId;
        this.startTime = startTime || new Date();
        this.endTime = endTime;
        this.breakDurationMinutes = breakDurationMinutes;
    }

    // Breaks are stored as total minutes; the quarter-hour check keeps payroll duration precise.
    get breakDurationMinutes() {
        return this._breakDurationMinutes;
    }

    set breakDurationMinutes(minutes) {
        if (!Number.isInteger(minutes) || minutes < 0 || minutes % 15 !== 0) {
            throw new RangeError("Break duration must be a non-negative multiple of 15 minutes.");
        }
        this._breakDurationMinutes = minutes;
    }

    setBreakDuration(minutes) {
        this.breakDurationMinutes = minutes;
        return this.breakDurationMinutes;
    }

    startShift() {
        this.startTime = roundUpToQuarterHour(new Date());
        console.log(`Shift started at ${this.startTime}`);
        // TODO: Prevent duplicate active shifts once employee shift-state lookup is integrated.
    }

    stopShift() {
        if (!this.startTime) {
            console.log("Cannot stop shift. Shift has not been started.");
            return;
        }
        this.endTime = roundDownToQuarterHour(new Date());
        console.log(`Shift ended at ${this.endTime}`);
        // TODO: Update the employee ledger through the app's persisted shift/ledger workflow.
    }

    getDuration() {
        if (!this.startTime || !this.endTime) {
            console.log("Cannot calculate duration. Shift has not been started or stopped.");
            return null;
        }

        const startMs = new Date(this.startTime).getTime();
        const endMs = new Date(this.endTime).getTime();
        if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) {
            return null;
        }

        const elapsedHours = (endMs - startMs) / HOUR_MS;
        const breakHours = this.breakDurationMinutes / 60;
        // Invalid break totals must never create negative payable hours or pay.
        if (breakHours > elapsedHours) {
            return null;
        }
        return elapsedHours - breakHours;
    }

    getTotalPay(hourlyWage) {
        const duration = this.getDuration();
        if (duration === null) {
            console.log("Cannot calculate total pay. Shift duration is not available.");
            return null;
        }
        // Preserve the original numeric return value for callers doing their own calculations.
        return duration * hourlyWage;
    }

    getFormattedTotalPay(hourlyWage, currency = 'USD', locale = undefined) {
        const totalPay = this.getTotalPay(hourlyWage);
        if (totalPay === null) {
            return null;
        }
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(totalPay);
    }

    // TODO: Apply overtime or special-work rates only after the pay rules are specified.
}
