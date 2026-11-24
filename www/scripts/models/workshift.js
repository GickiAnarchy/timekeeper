const QUARTER_HOUR_MS = 15 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

// Keep clock-time rounding pure so lifecycle decisions can stay in ShiftService.
export function roundUpToQuarterHour(value) {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp)
        ? new Date(Math.ceil(timestamp / QUARTER_HOUR_MS) * QUARTER_HOUR_MS)
        : new Date(NaN);
}

export function roundDownToQuarterHour(value) {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp)
        ? new Date(Math.floor(timestamp / QUARTER_HOUR_MS) * QUARTER_HOUR_MS)
        : new Date(NaN);
}

// Workshift only represents times and calculates break-adjusted duration/pay.
export class Workshift {
    constructor(id, employeeId, customerId, startTime = new Date(), endTime = null, breakDurationMinutes = 0) {
        this.id = id ?? crypto.randomUUID();
        this.employeeId = employeeId;
        this.customerId = customerId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.breakDurationMinutes = breakDurationMinutes;
    }

    // The model retains its existing quarter-hour break convention.
    get breakDurationMinutes() {
        return this._breakDurationMinutes;
    }

    set breakDurationMinutes(minutes) {
        if (!Number.isInteger(minutes) || minutes < 0 || minutes % 15 !== 0) {
            throw new RangeError('Break duration must be a non-negative multiple of 15 minutes.');
        }
        this._breakDurationMinutes = minutes;
    }

    setBreakDuration(minutes) {
        this.breakDurationMinutes = minutes;
        return this.breakDurationMinutes;
    }

    getDuration() {
        if (!this.startTime || !this.endTime) return null;

        const startMs = new Date(this.startTime).getTime();
        const endMs = new Date(this.endTime).getTime();
        if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return null;

        const elapsedHours = (endMs - startMs) / HOUR_MS;
        const breakHours = this.breakDurationMinutes / 60;
        // Invalid break totals must never create negative payable hours or pay.
        if (breakHours > elapsedHours) return null;
        return elapsedHours - breakHours;
    }

    getTotalPay(hourlyWage) {
        const duration = this.getDuration();
        if (duration === null || !Number.isFinite(hourlyWage) || hourlyWage < 0) return null;
        return duration * hourlyWage;
    }

    getFormattedTotalPay(hourlyWage, currency = 'USD', locale = undefined) {
        const totalPay = this.getTotalPay(hourlyWage);
        if (totalPay === null) return null;
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(totalPay);
    }
}
