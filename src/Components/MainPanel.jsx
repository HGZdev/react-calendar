import React from "react";

// seven days in row
const Week = ({weekNumber, daysArray, onClick}) => {
  const sevenDaysMap = daysArray
    .map(
      (el) =>
        el.date.week() === weekNumber && (
          <div
            key={el.date.format("L")}
            id={el.date.format("L")}
            className={
              "col-1 day " +
              el.isToday +
              " " +
              el.isOtherMonth +
              " " +
              el.isSelected
            }
            onClick={onClick}
          >
            {el.date.date()}
          </div>
        )
    )
    .filter((el) => {
      return el;
    });

  return (
    <div key={weekNumber} className="week flex">
      <div className="col-1 week_number">{weekNumber}</div>
      {sevenDaysMap}
    </div>
  );
};

const MainPanel = ({daysArray, onClick}) => {
  const weeksNumbers = [];

  for (let i = 0; i < daysArray.length / 7; i++) {
    weeksNumbers.push(daysArray[i * 7].date.week());
  }

  const weeksMap = weeksNumbers.map((el) => {
    return (
      <Week key={el} weekNumber={el} daysArray={daysArray} onClick={onClick} />
    );
  });
  return (
    <section className="main_panel">
      <div className="container">{weeksMap}</div>
    </section>
  );
};

export default MainPanel;
