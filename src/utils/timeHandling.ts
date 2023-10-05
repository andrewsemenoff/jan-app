import { format, formatDistanceToNow, formatRelative, parseISO, subMinutes } from "date-fns";

export function toLocalDate(date: string) {
  const timeZoneOffset = new Date().getTimezoneOffset();
  const parsedTime = parseISO(date);
  return subMinutes(parsedTime, timeZoneOffset);
}

export const getStandardLocalDate = (date: string) => {
  const localDate = toLocalDate(date);
  return format(localDate, "dd/MM/yyyy hh:mm");
};

export const getLocalDateInWords = (date: string) => {
  const localDate = toLocalDate(date);
  return formatRelative(localDate, new Date())
};

export const getLocalDateDistance = (date: string)=>{
    const localDate = toLocalDate(date);
    return `${formatDistanceToNow(localDate)} ago`
}