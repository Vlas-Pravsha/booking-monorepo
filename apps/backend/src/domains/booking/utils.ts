import { TZDate } from "@date-fns/tz";
import {
  addMinutes,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  isValid,
  parse,
} from "date-fns";

const RESTAURANT_TIME_ZONE = "Europe/Kyiv";
const RESERVATION_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

export const buildReservationDateTime = (date: string, time: string): Date => {
  const parsedDateTime = parse(
    `${date} ${time}`,
    RESERVATION_DATE_TIME_FORMAT,
    new Date()
  );

  if (!isValid(parsedDateTime)) {
    return parsedDateTime;
  }

  return new TZDate(
    getYear(parsedDateTime),
    getMonth(parsedDateTime),
    getDate(parsedDateTime),
    getHours(parsedDateTime),
    getMinutes(parsedDateTime),
    RESTAURANT_TIME_ZONE
  );
};

export { addMinutes };
