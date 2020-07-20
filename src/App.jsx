import React from "react";
import "./styles/index.scss";
import moment from "moment";
import Calendar from "./Components/Calendar.jsx";
import Header from "./Components/Header.jsx";

const App = () => {
  const today = moment().locale("pl");
  return (
    <div className="main-container">
      <Header {...{today}} />
      <Calendar {...{today}} />
    </div>
  );
};

export default App;
