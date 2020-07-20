import React, {Component} from "react";
import MainPanel from "./MainPanel.jsx";
import Navbar from "./Navbar.jsx";
import DaysNames from "./DaysNames.jsx";
import DatesSelected from "./DatesSelected.jsx";

// TODO convert into functional component with hooks
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFirstDay: this.props.today.clone().startOf("M"),
      DaysNames: this.setDaysNames(),
      daysArray: "",
      selectedArray: [],
    };
  }

  componentWillMount() {
    const newState = {
      daysArray: this.setDays(this.props.today.clone().startOf("M")),
    };
    return this.setState(newState);
  }

  handleDayClick = (e) => {
    const daysArrayCopy = this.state.daysArray;
    const selectedArrayCopy = this.state.selectedArray;

    for (let i = 0; i < daysArrayCopy.length; i++) {
      // Searching for clicked day in current daysArray
      if (daysArrayCopy[i].date.format("L") === e.target.id) {
        // Selected / unselected tasks
        if (e.target.classList.contains("selected")) {
          daysArrayCopy[i].isSelected = "";

          // Searching for clicked day in selectedArray in order to remove it
          for (let j = 0; j < selectedArrayCopy.length; j++) {
            if (selectedArrayCopy[j].date.format("L") === e.target.id) {
              selectedArrayCopy.splice(j, 1);
            }
          }
        } else {
          daysArrayCopy[i].isSelected = "selected";
          selectedArrayCopy.push(daysArrayCopy[i]);
        }
      }
    }

    // Sort selectedArray by date
    selectedArrayCopy.sort((a, b) => a.date - b.date);

    const newState = {
      daysArray: daysArrayCopy,
      selectedArray: selectedArrayCopy,
    };
    return this.setState(newState);
  };

  setDaysNames() {
    const firstDay = this.props.today
      .clone()
      .startOf("w")
      .add(-1, "d");
    const daysNames = [];
    for (let i = 0; i < 7; i++) {
      daysNames.push(
        firstDay
          .clone()
          .add(i + 1, "d")
          .format("ddd")
      );
    }
    const daysNamesMap = daysNames.map((el, i) => {
      return (
        <div key={i} className="col-1">
          {el}
        </div>
      );
    });
    return daysNamesMap;
  }

  setDays(currentFirstDay) {
    let currentDay = currentFirstDay.clone().startOf("w");

    const startOfMonthWeek =
      currentFirstDay.clone().week() === 52 ||
      currentFirstDay.clone().week() === 53
        ? 0
        : currentFirstDay.clone().week();
    const endOfMonthWeek =
      currentFirstDay
        .clone()
        .endOf("M")
        .week() === 1
        ? 53
        : currentFirstDay
            .clone()
            .endOf("M")
            .week();

    const daysArray = [];
    for (let i = 0; i < endOfMonthWeek - startOfMonthWeek + 1; i++) {
      for (let j = 0; j < 7; j++) {
        const isToday =
          currentDay.format("L") === this.props.today.clone().format("L")
            ? "today"
            : "";
        const isOtherMonth =
          currentDay.month() === currentFirstDay.month() ? "" : "otherMonth";

        const isSelected = this.state.selectedArray.includes(
          currentDay.format("L")
        )
          ? "selected"
          : "";

        const featuresArray = {
          date: currentDay.clone(),
          isToday,
          isSelected,
          isOtherMonth,
        };
        daysArray.push(featuresArray);
        currentDay = currentDay.add(1, "d");
      }
    }

    return daysArray;
  }

  handleArrowClick = (e) => {
    console.log("Clicked arrow!");
    const newDate = this.state.currentFirstDay
      .clone()
      .add(e.target.dataset.step, "M");
    const newState = {
      currentFirstDay: newDate,
      daysArray: this.setDays(newDate),
    };
    return this.setState(newState);
  };

  render() {
    return (
      <div>
        <Navbar
          currentFirstDay={this.state.currentFirstDay.format("MMMM YYYY")}
          onClick={this.handleArrowClick}
        />
        <DaysNames DaysNames={this.state.DaysNames} />
        <MainPanel
          daysArray={this.state.daysArray}
          onClick={this.handleDayClick}
        />
        <DatesSelected selectedArray={this.state.selectedArray} />
      </div>
    );
  }
}

export default Calendar;
