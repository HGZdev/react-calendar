import React, {useState} from "react";
import {Box} from "Components/Box";
import {CAL_LIGHT, CAL_DARK} from "Styles";
import {
  getDaysOfWeek,
  getStartDayOfMonth,
  getStartDaysOfMonthWeeks,
} from "./helpers";
import {SqrtBox} from "./Components";
import {dateFormatter} from "src/client/helpers";
import {addMonths, addYears, getWeek, subMonths, subYears} from "date-fns";

const Header = ({
  selectedMonthStartDay: curMonth,
  setSelectedMonthStartDay: setCurMonth,
}) => {
  return (
    <Box>
      <SqrtBox />
      <SqrtBox
        {...{label: "<<", onClick: () => setCurMonth(subYears(curMonth, 1))}}
        cursor
      />
      <SqrtBox
        {...{label: "<", onClick: () => setCurMonth(subMonths(curMonth, 1))}}
        cursor
      />
      <SqrtBox
        {...{width: "12rem", label: dateFormatter(curMonth, "MMMM yyyy")}}
      />
      <SqrtBox
        {...{label: ">", onClick: () => setCurMonth(addMonths(curMonth, 1))}}
        cursor
      />
      <SqrtBox
        {...{label: ">>", onClick: () => setCurMonth(addYears(curMonth, 1))}}
        cursor
      />
    </Box>
  );
};

const DaysLabels = () => {
  const now = new Date();
  const dayLabels = getDaysOfWeek(now).map((date) =>
    dateFormatter(date, "iii")
  );

  return (
    <Box>
      <SqrtBox />
      {dayLabels.map((label, i) => (
        <SqrtBox key={i} {...{label}} />
      ))}
    </Box>
  );
};

const WeekRow = ({startWeekDay, ...p}) => {
  const weekOfYear = getWeek(startWeekDay);
  const weekDays = getDaysOfWeek(startWeekDay);
  return (
    <Box>
      <SqrtBox {...{label: weekOfYear}} />
      {weekDays?.map((day, i) => (
        <SqrtBox key={i} {...{...p, label: dateFormatter(day, "d")}} />
      ))}
    </Box>
  );
};

const WeekRows = ({selectedMonthStartDay, ...p}) => {
  const weeksStartDaysArr = getStartDaysOfMonthWeeks(selectedMonthStartDay);

  return (
    <Box top column>
      {weeksStartDaysArr?.map((startWeekDay, i) => (
        <WeekRow key={i} {...{...p, startWeekDay}} />
      ))}
    </Box>
  );
};

const CalendarPanel = (p) => {
  return (
    <Box top column>
      <Header {...p} />
      <DaysLabels />
      <WeekRows {...p} />
    </Box>
  );
};

const MainPanel = () => {
  const now = new Date();
  const [selectedDay, setSelectedDay] = useState(now);
  const [selectedMonthStartDay, setSelectedMonthStartDay] = useState(
    getStartDayOfMonth(now)
  );

  return (
    <Box column top {...{bg: CAL_LIGHT, fg: CAL_DARK}}>
      <CalendarPanel
        {...{selectedDay, selectedMonthStartDay, setSelectedMonthStartDay}}
      />
      {/* <InfoBar /> */}
    </Box>
  );
};

export default MainPanel;
