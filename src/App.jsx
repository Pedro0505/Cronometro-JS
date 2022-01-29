import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      inputValue: '',
      isDisabled: true,
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { time } = this.state;
    if (time !== prevState.time) {
      this.stopTimer();
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.configTime();
      this.handleDisableBtn();
    });
  };

  handleDisableBtn = () => {
    const { inputValue } = this.state;
    const rgx = /\d[:]\d/gi;
    if (!rgx.test(inputValue)) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  configTime = () => {
    const { inputValue } = this.state;
    const arrayTime = inputValue.split(':');
    const minutes = +arrayTime[0] * 60;
    const seconds = +arrayTime[1];
    const sum = minutes + seconds;
    if (!Number.isNaN(sum)) {
      this.setState({ inputValue: sum });
    }
  };

  timer = () => {
    const { inputValue } = this.state;
    this.setState({ time: inputValue });
    this.keyInterval = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time <= 0 ? 0 : prevState.time - 1 }));
    }, 1000);
    this.setState({ isDisabled: true });
  };

  stopTimer = () => {
    const { time } = this.state;
    if (time === 0) {
      this.cancelTimer();
    }
  };

  cancelTimer = () => {
    clearInterval(this.keyInterval);
    this.setState({ isDisabled: false });
  };

  render() {
    const { time, isDisabled } = this.state;
    return (
      <div>
        <input
          onChange={this.handleChange}
          type="text"
          name="inputValue"
          placeholder="00:00"
          maxLength="5"
        />
        <button
          onClick={this.timer}
          type="button"
          disabled={isDisabled}
        >
          Iniciar
        </button>
        <button onClick={this.cancelTimer} type="button">Parar</button>
        <h1>
          { time < 600 ? `0${Math.floor(time / 60)}` : `${Math.floor(time / 60)}` }
          :
          { time % 60 < 10 ? `0${time % 60}` : `${time % 60}` }
        </h1>
      </div>
    );
  }
}

export default App;
