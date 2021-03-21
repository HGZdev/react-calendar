import MockDate from "mockdate";
import {dateFormatter} from "./helpers";
import {ru, pl} from "date-fns/locale";

test("H_01 dateFormatter", () => {
  MockDate.set("2021-03-21T16:50:00.000Z");

  const now = new Date();

  expect(() => dateFormatter("ala")).toThrow(`Date is invalid.`);

  expect(dateFormatter()).toEqual(undefined);

  expect(dateFormatter("2021-02-21T16:50:00.000Z")).toEqual("2021-02-21");

  expect(dateFormatter(now)).toEqual("2021-03-21");

  expect(dateFormatter(now, "iii")).toEqual("Sun");

  expect(dateFormatter(now, "iiii", {locale: ru})).toEqual("воскресенье");

  expect(dateFormatter(now, "iiii", {locale: pl})).toEqual("niedziela");
});
