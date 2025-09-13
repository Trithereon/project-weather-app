// Date formatting module.
import { format } from "date-fns";

export function formatDate(date) {
  const formattedDate = format(new Date(date), "PP");
  return formattedDate;
}
