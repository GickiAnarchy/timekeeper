const NUMBERED_STREET_ADDRESS = /^\s*\d+[a-z]?\s+/i;

export function guestSafeLocation(value) {
  const location = String(value ?? '').trim();
  if (!location || NUMBERED_STREET_ADDRESS.test(location)) return null;
  return location;
}

export function publicEmployeeData(employee = {}) {
  return { name: String(employee.name ?? '').trim() };
}

export function publicCustomerData(customer = {}) {
  return {
    name: String(customer.name ?? '').trim(),
    location: guestSafeLocation(customer.location)
  };
}

export function publicShiftData(shift = {}) {
  return {
    employeeId: shift.employeeId ?? shift.employee?.id ?? null,
    custId: shift.custId ?? shift.customer?.id ?? null,
    clockInTime: shift.clockInTime instanceof Date
      ? shift.clockInTime.toISOString()
      : shift.clockInTime ?? null,
    clockOutTime: shift.clockOutTime instanceof Date
      ? shift.clockOutTime.toISOString()
      : shift.clockOutTime ?? null,
    breaks: (Array.isArray(shift.breaks) ? shift.breaks : []).map(item => ({
      start: item?.start instanceof Date ? item.start.toISOString() : item?.start ?? null,
      end: item?.end instanceof Date ? item.end.toISOString() : item?.end ?? null
    }))
  };
}

export function safeShiftUpdate(shift = {}) {
  const data = publicShiftData(shift);
  return {
    employeeId: data.employeeId,
    custId: data.custId,
    clockInTime: data.clockInTime,
    clockOutTime: data.clockOutTime,
    breaks: data.breaks
  };
}
