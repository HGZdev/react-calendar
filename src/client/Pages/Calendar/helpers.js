import {
  isValid,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

const WEEK_START_DAY = 1;

export const getStartDayOfMonth = (d) => {
  const date = new Date(d);
  if (!isValid(date)) throw new Error(`Invalid date format.`);
  return startOfMonth(date, {weekStartsOn: WEEK_START_DAY});
};

export const getDaysOfWeek = (d) => {
  const date = new Date(d);
  if (!isValid(date)) throw new Error(`Invalid date format.`);

  const startOfWeekDay = startOfWeek(date, {weekStartsOn: WEEK_START_DAY});
  const endOfWeekDay = endOfWeek(date, {weekStartsOn: WEEK_START_DAY});

  const days = eachDayOfInterval(
    {start: startOfWeekDay, end: endOfWeekDay},
    {weekStartsOn: WEEK_START_DAY} // Mon
  );

  return days;
};

export const getStartDaysOfMonthWeeks = (d) => {
  const date = new Date(d);
  if (!isValid(date)) throw new Error(`Invalid date format.`);

  const startOfMonthDay = startOfMonth(date, {weekStartsOn: WEEK_START_DAY});
  const endOfMonthDay = endOfMonth(date, {weekStartsOn: WEEK_START_DAY});

  const weeks = eachWeekOfInterval(
    {start: startOfMonthDay, end: endOfMonthDay},
    {weekStartsOn: WEEK_START_DAY} // Mon
  );

  return weeks;
};
