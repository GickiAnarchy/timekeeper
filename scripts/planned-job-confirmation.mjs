import { plannedJobsForCompletedShift } from './domain.mjs';

export async function promptForCompletedPlannedJobs(shift, store, ui = globalThis.window) {
  const candidates = plannedJobsForCompletedShift(shift, store?.plannedJobs);
  if (!candidates.length) return [];

  try {
    await store.markShiftPlannedJobsPrompted(shift.id);
  } catch (error) {
    // Suppress repeat prompts in this session even if the marker write fails.
    shift.plannedJobsPrompted = true;
    console.error('Unable to save planned-job prompt status:', error);
  }

  const shiftDate = shift.clockInTime.toLocaleDateString();
  for (const [index, job] of candidates.entries()) {
    const dueDate = job.scheduledDate.toLocaleDateString();
    const jobLabel = job.description || 'Scheduled job';
    const prompt = candidates.length > 1
      ? `Did the ${shiftDate} work shift complete planned job ${index + 1} of ${candidates.length}: “${jobLabel}” for ${job.customer?.name || 'this customer'}? (Due ${dueDate})`
      : `Did the ${shiftDate} work shift complete planned job “${jobLabel}” for ${job.customer?.name || 'this customer'}? (Due ${dueDate})`;
    if (!ui.confirm(prompt)) continue;
    try {
      await store.setPlannedComplete(job.id, true);
    } catch (error) {
      console.error('Unable to mark planned job complete:', error);
      ui.alert(`“${jobLabel}” could not be marked complete. You can update it in Planned Jobs.`);
    }
  }
  return candidates;
}
