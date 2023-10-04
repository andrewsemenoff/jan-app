import { parseISO, subMinutes } from "date-fns";

export function toLocalTime(time: string) {
  const timeZoneOffset = new Date().getTimezoneOffset();
  const parsedTime = parseISO(time);
  const localTime = subMinutes(parsedTime, timeZoneOffset);
  return localTime;
}
