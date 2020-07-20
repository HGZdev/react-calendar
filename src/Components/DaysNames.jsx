import React from "react";

const DaysNames = ({DaysNames}) => {
  return (
    <section className="days_names">
      <div className="container flex">
        <div className="col-1" />
        {DaysNames}
      </div>
    </section>
  );
};

export default DaysNames;
