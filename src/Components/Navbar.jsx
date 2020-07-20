import React from "react";

const Navbar = ({onClick, currentFirstDay}) => {
  return (
    <section className="navbar">
      <div className="container flex">
        <div className="col-1 prev" data-step="-12" onClick={onClick}>
          &laquo;
        </div>
        <div className="col-1 prev" data-step="-1" onClick={onClick}>
          &lt;
        </div>
        <div className="col-4 month_name">{currentFirstDay}</div>
        <div className="col-1 next" data-step="1" onClick={onClick}>
          &gt;
        </div>
        <div className="col-1 next" data-step="12" onClick={onClick}>
          &raquo;
        </div>
      </div>
    </section>
  );
};

export default Navbar;
