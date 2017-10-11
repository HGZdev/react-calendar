import React from 'react';
import ReactDOM from 'react-dom';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: this.props.today,
      currentFirstDay: this.props.today.clone().startOf('M'),
      DaysNames: this.setDaysNames(),
      daysArray: "",
      selectedArray: []
    }
  }

  componentWillMount() {
    let newState = {
      daysArray: this.setDays(this.props.today.clone().startOf('M'))
    }
    return this.setState(newState);
  }

  render() {
    return (
      <div>
        <Header/>
        <Navbar currentFirstDay={this.state.currentFirstDay.format('MMMM YYYY')} onClick={this.handleArrowClick}/>
        <DaysNames DaysNames={this.state.DaysNames}/>
        <MainPanel daysArray={this.state.daysArray} onClick={this.handleDayClick}/>
        <DatesSelected selectedArray={this.state.selectedArray}/>
      </div>
    )
  }

  handleDayClick = (e) => {
    let daysArrayCopy = this.state.daysArray;
    let selectedArrayCopy = this.state.selectedArray;

    for (var i = 0; i < daysArrayCopy.length; i++) {

      // Searching for clicked day in current daysArray
      if (daysArrayCopy[i].date.format('L') === e.target.id) {

        // Selected / unselected tasks
        if (e.target.classList.contains('selected')) {
          daysArrayCopy[i].isSelected = "";

          // Searching for clicked day in selectedArray in order to remove it
          for (var j = 0; j < selectedArrayCopy.length; j++) {
            if (selectedArrayCopy[j].date.format('L') === e.target.id) {
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
    selectedArrayCopy.sort((a,b) => a.date - b.date);;

    let newState = {
      daysArray: daysArrayCopy,
      selectedArray: selectedArrayCopy
    }
    return this.setState(newState);
  }

  setDaysNames() {
    let firstDay = this.props.today.clone().startOf('w').add(-1, 'd');
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
    let currentDay = currentFirstDay.clone().startOf('w');

    let startOfMonthWeek = (currentFirstDay.clone().week() === 52 || currentFirstDay.clone().week() === 53)
      ? 0
      : currentFirstDay.clone().week();
    let endOfMonthWeek = (currentFirstDay.clone().endOf('M').week() === 1)
      ? 53
      : currentFirstDay.clone().endOf('M').week();

    let daysArray = [];
    for (var i = 0; i < (endOfMonthWeek - startOfMonthWeek + 1); i++) {
      for (var j = 0; j < 7; j++) {
        let isToday = (currentDay.format('L') == this.props.today.clone().format('L'))
          ? "today"
          : "";
        let isother_month = (currentDay.month() !== currentFirstDay.month())
          ? "other_month"
          : "";
        let isSelected = (this.state.selectedArray.indexOf(currentDay.format('L')) > -1)
          ? "selected"
          : "";

        let featuresArray = {
          date: currentDay.clone(),
          isToday: isToday,
          isSelected: isSelected,
          isother_month: isother_month
        };
        daysArray.push(featuresArray);
        currentDay = currentDay.add(1, 'd');
      }
    }

    return daysArray;
  }

    handleArrowClick = (e) => {
    console.log('Clicked arrow!');
    let newDate = this.state.currentFirstDay.clone().add(e.target.dataset.step, "M");
    let newState = {
      currentFirstDay: newDate,
      daysArray: this.setDays(newDate)
    }
    return this.setState(newState);
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container flex">
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
        <div className="container flex">
          <div className="col-1 prev" data-step="-12" onClick={this.props.onClick}>&laquo;</div>
          <div className="col-1 prev" data-step="-1" onClick={this.props.onClick}>&lt;</div>
          <div className="col-4 month_name">{this.props.currentFirstDay}</div>
          <div className="col-1 next" data-step="1" onClick={this.props.onClick}>&gt;</div>
          <div className="col-1 next" data-step="12" onClick={this.props.onClick}>&raquo;</div>
        </div>
      </section>
    );
  }
}

class DaysNames extends React.Component {
  render() {
    return (
      <section className="days_names">
        <div className="container flex">
          <div className="col-1"></div>
          {this.props.DaysNames}
        </div>
      </section>
    );
  }
}

class MainPanel extends React.Component {
  render() {
    let daysArray = this.props.daysArray;
    let weeksNumbers = [];

    for (var i = 0; i < daysArray.length / 7; i++) {
      weeksNumbers.push(daysArray[i * 7].date.week());
    }

    let weeksMap = weeksNumbers.map((el, i) => {
      return <Week key={el} week_number={el} daysArray={this.props.daysArray} onClick={this.props.onClick}/>;
    })
    return (
      <section className="main_panel">
        <div className="container">
          {weeksMap}
        </div>
      </section>
    );
  }
}

class Week extends React.Component {
  render() {
    return <SevenDays week_number={this.props.week_number} daysArray={this.props.daysArray} onClick={this.props.onClick}/>
  }
}

class SevenDays extends React.Component {
  render() {
    let daysArray = this.props.daysArray;
    let sevenDaysMap = daysArray.map((el, i) => {
      if (el.date.week() === this.props.week_number) {
        return <div key={el.date.format('L')} id={el.date.format('L')} className={"col-1 day " + el.isToday + " " + el.isother_month + " " + el.isSelected} onClick={this.props.onClick}>{el.date.date()}</div>;
      }
    }).filter((el) => {
      return el
    });
    return (
      <div key={this.props.week_number} className="week flex">
        <div className="col-1 week_number">{this.props.week_number}</div>
        {sevenDaysMap}
      </div>
    );
  }
}

class DatesSelected extends React.Component {
  render() {
    let selectedArray = this.props.selectedArray;
    let selectedArrayCopy = selectedArray.map((el, i)=> {
      return <div key={el.date.format('L')} className="date flex"><span>{el.date.format('L')}</span></div>
    })
    return (
      <section className="dates_selected">
        <div className="container flex">
          <div className="col-8 title">
            Wybrane daty:
          </div>
          <div className="col-8 board">
            {selectedArrayCopy}
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
