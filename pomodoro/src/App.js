import React, { Component } from 'react';
import Clock from './components/Clock';

/**
 * @todo GitHub!!!!!!!!
 * @todo Avoid timer from going bellow zero
 * @todo Alert user that the timer is done
 * @todo Breaks part
 * @todo Styles
 * @todo Custom times?
 * @todo Mobile App?
 * @todo DEPLOY
 */

const INITIAL_TIME = 60 * 25;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: INITIAL_TIME,
      interval: null,
      running: false,
    };
  }

  tick = () => {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  };

  handleTimer() {
    if (!this.state.running) {
      this.setState({
        interval: setInterval(() => this.tick(), 1000),
        running: true,
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        running: false,
      });
    }
  }

  reset() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.setState({
      running: false,
      time: INITIAL_TIME,
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
