// Time formatting module.

import { getSettings } from "./settings";
import { format, parse } from "date-fns";

export function trimTime(time) {
  const trimmedTime = time.slice(0, 5);
  const units = getSettings().checkedSettings[0];
  if (units === "us") {
    // Here's how I got to the following solution:
    // To use format, I have to input a valid date,
    // so I first parse the trimmedTime,
    // specifying the inputted format HH:mm (e.g. 14:00)
    // then I give a reference date, so I give today, new Date()
    const parsedTime = parse(trimmedTime, "HH:mm", new Date());
    // Now I can use the parsedTime
    // (e.g. Sun Sep 14 2025 14:00:00 GMT-0400 (Eastern Daylight Time))
    // as input, to be formatted to hh:mm aa which is 12h-format
    return format(new Date(parsedTime), "hh:mm aa");
  } else return trimmedTime;
}
