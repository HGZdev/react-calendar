import MockDate from "mockdate";
import {dateFormatter} from "src/client/helpers";
import {getDaysOfWeek, getStartDaysOfMonthWeeks} from "./helpers";

test("CAL_01 getDaysOfWeek, getStartDaysOfMonthWeeks", () => {
  MockDate.set("2021-03-21T16:50:00.000Z");
  expect(getDaysOfWeek(new Date())).toMatchInlineSnapshot(`
    Array [
      2021-03-14T23:00:00.000Z,
      2021-03-15T23:00:00.000Z,
      2021-03-16T23:00:00.000Z,
      2021-03-17T23:00:00.000Z,
      2021-03-18T23:00:00.000Z,
      2021-03-19T23:00:00.000Z,
      2021-03-20T23:00:00.000Z,
    ]
  `);

  expect(
    getDaysOfWeek(new Date()).map((date) => dateFormatter(date, "iii"))
  ).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

  expect(getStartDaysOfMonthWeeks(new Date())).toMatchInlineSnapshot(`
    Array [
      2021-02-28T23:00:00.000Z,
      2021-03-07T23:00:00.000Z,
      2021-03-14T23:00:00.000Z,
      2021-03-21T23:00:00.000Z,
      2021-03-28T22:00:00.000Z,
    ]
  `);

  MockDate.set("2021-04-21T16:50:00.000Z");

  expect(getDaysOfWeek(new Date())).toMatchInlineSnapshot(`
    Array [
      2021-04-18T22:00:00.000Z,
      2021-04-19T22:00:00.000Z,
      2021-04-20T22:00:00.000Z,
      2021-04-21T22:00:00.000Z,
      2021-04-22T22:00:00.000Z,
      2021-04-23T22:00:00.000Z,
      2021-04-24T22:00:00.000Z,
    ]
  `);

  expect(getStartDaysOfMonthWeeks(new Date())).toMatchInlineSnapshot(`
    Array [
      2021-03-28T22:00:00.000Z,
      2021-04-04T22:00:00.000Z,
      2021-04-11T22:00:00.000Z,
      2021-04-18T22:00:00.000Z,
      2021-04-25T22:00:00.000Z,
    ]
  `);
});
