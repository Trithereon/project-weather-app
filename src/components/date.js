// Date formatting module.
import { format } from "date-fns";

export function formatDate(date) {
  // Must add "T00:00" to date, to have it interpreted as local time.
  // Otherwise, 2025-09-13 might become 2025-09-12,
  // since it's interpreted as UTC, then corrected
  // based on diff between UTC and local time.
  const formattedDate = format(new Date(date + "T00:00"), "PP");
  return formattedDate;
}
