import moment from "moment";

export const truncateString = (
  str: string,
  maxLength: number
) => str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

export const formatWithMoment = (date: string) => {
  return moment.utc(date).local().startOf("seconds").fromNow();
}
