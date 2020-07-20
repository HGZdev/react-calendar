import React from "react";

const DatesSelected = ({selectedArray}) => {
  const selectedArrayCopy = selectedArray.map((el) => {
    return (
      <div key={el.date.format("L")} className="date flex">
        <span>{el.date.format("L")}</span>
      </div>
    );
  });
  return (
    <section className="dates_selected">
      <div className="container flex">
        <div className="col-8 title">Wybrane daty:</div>
        <div className="col-8 board">{selectedArrayCopy}</div>
      </div>
    </section>
  );
};

export default DatesSelected;
