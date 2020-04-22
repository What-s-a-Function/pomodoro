import React, { Component } from 'react';
import Clock from './components/Clock';
import Alarm from '../alarm.mp3';

/*
 * @todo Styles
 * @todo Custom times?
 * @todo Mobile App?
 * @todo DEPLOY
 */

// temporary start values for test
const WORK_TIME = 60 * 25;
const BREAK_TIME = 60 * 5;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.alarm = new Audio(Alarm);

    this.state = {
      time: WORK_TIME,
      interval: null,
      running: false,
      isWork: true,
    };
  }

  // start the clock
  runTimer = () => {
    this.setState({
      interval: setInterval(() => this.tick(), 1000),
      running: true,
    });
  };

  // stop the clock
  stopTimer = () => {
    clearInterval(this.state.interval);
    this.setState({
      running: false,
    });
  };

  // change the period work break
  workBreak = () => {
    if (this.state.isWork) {
      alert('Continue to break');
      this.setState({
        isWork: false,
        time: BREAK_TIME,
      });
      this.runTimer();
    } else {
      alert('Continue to work');
      this.setState({
        isWork: true,
        time: WORK_TIME,
      });
      this.runTimer();
    }
  };

  // decrement timer
  tick = () => {
    if (this.state.time <= 0) {
      this.alarm.play();
      this.stopTimer();
      this.workBreak();
    } else {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }
  };

  // start/stop button logic
  handleTimer() {
    if (!this.state.running) {
      this.alarm.play();
      this.runTimer();
    } else {
      this.stopTimer();
    }
  }

  // reset pomodoro
  reset() {
    if (this.state.running) {
      this.stopTimer();
    }
    this.setState({
      time: WORK_TIME,
    });
  }

  render() {
    return (
      <div>
        <Clock time={this.state.time} />
        <button onClick={() => this.handleTimer()}>
          {this.state.running ? 'STOP' : 'START'}
        </button>
        <button onClick={() => this.reset()}>RESET</button>
      </div>
    );
  }
}
