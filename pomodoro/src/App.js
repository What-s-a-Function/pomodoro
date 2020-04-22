import React, { Component } from 'react';
import Clock from './components/Clock';
import alerm from '../assets/sound/alarm.mp3';

/**
 * @todo Breaks part
 * @todo Styles
 * @todo Custom times?
 * @todo Mobile App?
 * @todo DEPLOY
 */

export default class App extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(alerm);
    this.initialTime = {
      work: 5,
      break: 60*5
    };

    this.state = {
      time: this.initialTime.work,
      interval: null,
      running: false,
      isWork: true
    };
  }

  tick = () => {
    if (this.state.time <= 0) {
      this.handleEnd();
    } else {
      this.setState(prevState => ({
        time: prevState.time-1,
      }));
    }
  }

  handleEnd() {
    this.audio.play();

    this.setState(prevState => ({
      isWork: !prevState.isWork
    }));

    this.reset();
  }

  setWork() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.setState({
      running: false,
      isWork: true,
      time: this.initialTime.work
    });
  }

  setBreak() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.setState({
      running: false,
      isWork: false,
      time: this.initialTime.break
    });
  }

  handleTimer() {
    if (!this.state.running) {
      this.setState({
        interval: setInterval(() => this.tick(), 1000),
        running: true,
      });
    } else {
      this.clearTimer();
    }
  }

  clearTimer() {
    clearInterval(this.state.interval);
    this.setState({
      running: false
    });
  }

  reset() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    this.setState({
      running: false,
      time: this.initialTime.work
    });
  }

  render() {
    return (
      <div>
        <h1>WORK!</h1>
        <Clock time={ this.state.time }/>
        <button onClick={() => this.handleTimer()}>{this.state.running ? 'STOP' : 'START'}</button>
        <button onClick={() => this.reset()}>RESET</button>
      </div>
    );
  }
}
