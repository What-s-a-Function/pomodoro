import React, { Component } from 'react';
import Clock from './components/Clock';
import alerm from '../assets/sound/alarm.mp3';

/**
 * @todo Breaks part
 * @todo Simplify methods (setWork and setBreak)?
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
      work: 60*25,
      break: 60*5
    };

    this.state = {
      time: this.initialTime.work,
      interval: null,
      running: false
    };
  }

  tick = () => {
    if (this.state.time <= 0) {
      this.audio.play();
      this.reset();
    } else {
      this.setState(prevState => ({
        time: prevState.time-1,
      }));
    }
  }

  handleTimer() {
    if (!this.state.running) {
      this.setState({
        interval: setInterval(()=>this.tick(), 1000),
        running: true
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
        <Clock time={ this.state.time }/>
        <button onClick={() => this.handleTimer()}>{this.state.running ? 'STOP' : 'START'}</button>
        <button onClick={() => this.reset()}>RESET</button>
      </div>
    )
  }
}
