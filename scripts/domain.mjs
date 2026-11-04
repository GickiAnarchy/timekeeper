// Shared time helpers for the clock and shift-history workflows.
const QUARTER_HOUR_MS = 15 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

function validDate(value) {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (value === null || value === undefined || value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function roundTo15Minutes(value = new Date()) {
  const date = validDate(value);
  return date ? new Date(Math.round(date.getTime() / QUARTER_HOUR_MS) * QUARTER_HOUR_MS) : new Date(NaN);
}

export function roundDown15Minutes(value = new Date()) {
  const date = validDate(value);
  return date ? new Date(Math.floor(date.getTime() / QUARTER_HOUR_MS) * QUARTER_HOUR_MS) : new Date(NaN);
}

export function roundUp15Minutes(value = new Date()) {
  const date = validDate(value);
  return date ? new Date(Math.ceil(date.getTime() / QUARTER_HOUR_MS) * QUARTER_HOUR_MS) : new Date(NaN);
}

// Clip breaks to the shift, merge overlaps, and round only the final result so
// manually entered intervals cannot subtract the same minutes twice.
export function actualShiftHours(startValue, endValue, breaks = []) {
  const start = validDate(startValue);
  const end = validDate(endValue);
  if (!start || !end || end <= start) return 0;

  const intervals = [];
  for (const item of Array.isArray(breaks) ? breaks : []) {
    const breakStart = validDate(item?.start);
    const breakEnd = validDate(item?.end);
    if (!breakStart || !breakEnd || breakEnd <= breakStart) continue;
    const clippedStart = Math.max(start.getTime(), breakStart.getTime());
    const clippedEnd = Math.min(end.getTime(), breakEnd.getTime());
    if (clippedEnd > clippedStart) intervals.push([clippedStart, clippedEnd]);
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let breakMs = 0;
  let intervalStart = null;
  let intervalEnd = null;
  for (const [nextStart, nextEnd] of intervals) {
    if (intervalStart === null) {
      intervalStart = nextStart;
      intervalEnd = nextEnd;
    } else if (nextStart <= intervalEnd) {
      intervalEnd = Math.max(intervalEnd, nextEnd);
    } else {
      breakMs += intervalEnd - intervalStart;
      intervalStart = nextStart;
      intervalEnd = nextEnd;
    }
  }
  if (intervalStart !== null) breakMs += intervalEnd - intervalStart;

  return Number(Math.max(0, (end.getTime() - start.getTime() - breakMs) / HOUR_MS).toFixed(2));
}
