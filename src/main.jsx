import React from 'react';
import ReactDOM from 'react-dom';

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      today: this.props.today,
      currentFirstDay: this.props.today.clone().startOf('M'),
      daysNames: this.setDaysNames(),
      daysArray: this.setDays(this.props.today.clone().startOf('M')),
      weeksArray: "",
      selectedArray: ""
    }
  }

  componentWillMount() {
    let newState = {
      weeksArray: this.setWeeks(),
      selectedArray: ["Nie zaznaczono żadnych dat"]
    };
    return this.setState(newState);
  }

  render() {
    return (
      <div>
        <Header/>
        <Navbar currentFirstDay={this.state.currentFirstDay.format('MMMM')}/>
        <DaysNames daysNames={this.state.daysNames}/>
        <MainPanel daysArray={this.state.daysArray} weeksArray={this.state.weeksArray}/> {/* <SelectedDates/> */}
      </div>
    )
  }

  setDaysNames() {
    let firstDay = this.props.today.clone().startOf('w').subtract(1, 'd');
    let daysNames = [];
    for (var i = 0; i < 7; i++) {
      daysNames.push(firstDay.clone().add(i + 1, 'd').format('ddd'))
    }
    let daysNamesMap = daysNames.map((el, i) => {
      return <div key={i} className="col-1">{el}</div>
    })
    return daysNamesMap;
  }

  setDays(currentFirstDay) {
    let today = this.props.today.clone();
    let currentDay = currentFirstDay.clone().startOf('w');
    let numberOfWeek = currentFirstDay.clone().endOf('M').week() - currentFirstDay.clone().week() + 1;
    let daysArray = [];
    let daysInWeekArray = [];
    let weeksInMonthArray = [];

    for (var i = 0; i < numberOfWeek; i++) {
      for (var j = 0; j < 7; j++) {
        let isToday,
          isSelected,
          isOtherMonth,
          featuresArray = "";

        isToday = (currentDay.format('L') == today.format('L'))
          ? "today"
          : "";
        isOtherMonth = (currentDay.month() !== currentFirstDay.month())
          ? "otherMonth"
          : "";
        featuresArray = {
          date: currentDay.clone(),
          isToday: isToday,
          isSelected: isSelected,
          isOtherMonth: isOtherMonth
        };
        daysArray.push(featuresArray);
        currentDay = currentDay.add(1, 'd');
      }
    }
    return daysArray;
  }

  setWeeks() {
    let daysArray = this.state.daysArray;
    let weeksNumbers = [];

    for (var i = 0; i < daysArray.length / 7; i++) {
      weeksNumbers.push(daysArray[i * 7].date.week());
    }
    let weeksMap = weeksNumbers.map((el, i) => {
      return <Week key={el} weekNumber={el} daysArray={this.state.daysArray} weeksArray={this.state.weeksArray}/>;
    })
    return weeksMap;
  }
}

class SevenDays extends React.Component {
  render() {
    let daysArray = this.props.daysArray;
    let sevenDaysMap = daysArray.map((el, i) => {
      if (el.date.week() === this.props.weekNumber) {
        return <div key={el.date.format('L')} className={"col-1 day " + el.isToday + " " + el.isOtherMonth + " " + el.isSelected}>{el.date.date()}</div>;
      }
    }).filter((el) => {
      return el
    });
    return (
      <div key={this.props.weekNumber} className="week flex_row">
        <div className="col-1 weekNumber">{this.props.weekNumber}</div>
        {sevenDaysMap}
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    return <SevenDays weekNumber={this.props.weekNumber} daysArray={this.props.daysArray}/>
  }
}

class MainPanel extends React.Component {
  render() {
    return (
      <section className="mainPanel">
        <div className="container">
          {this.props.weeksArray}
        </div>
      </section>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container flex_row">
          <div className="col-8">
            <h1>React Calendar</h1>
          </div>
        </div>
      </header>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <section className="navbar">
        <div className="container flex_row">
          {/* <div className="col-1 prev">&laquo;</div> */}
          <div className="col-8 monthName">{this.props.currentFirstDay}</div>
          {/* <div className="col-1 next">&raquo;</div> */}
        </div>
      </section>
    );
  }
}

class DaysNames extends React.Component {
  render() {

    return (
      <section className="daysNames">
        <div className="container flex_row">
          <div className="col-1"></div>
          {this.props.daysNames}
        </div>
      </section>
    );
  }
}

class SelectedDates extends React.Component {
  render() {
    return (
      <section className="selectedDates">
        <div className="container flex_row">
          <div className="col-8 title">
            Wybrane daty:
          </div>
          <div className="col-8 board">
            Nie zaznaczono żadnych dat
          </div>
        </div>
      </section>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Calendar today={moment().locale('pl')}/>, document.getElementById('app'));
});
