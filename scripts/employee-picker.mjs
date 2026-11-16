// Keep the checkbox picker logic small and framework-free so multi-selection
// and its visible count can be tested without loading the page controller.
export function selectedEmployeeIds(employeeInputs) {
  return Array.from(employeeInputs || [], input => input?.checked ? input.value : '').filter(Boolean);
}

export function employeeSelectionLabel(count) {
  const selectedCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return `${selectedCount} selected`;
}
