import React, { Component } from 'react';
import './Calculator.css';
import LCDDisplay from './LCDDisplay';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      operator: null,
      prevInput: '',
      memory: 0,
      history: '',
      isButtonPressed: false,
    };
  }

  handleDigitClick = (digit) => {
    if (this.state.display === '0' && digit !== '.') {
      this.setState({ display: digit, currentInput: digit });
    } else if (!this.state.display.includes('.') || digit !== '.') {
      this.setState((prevState) => ({
        display: prevState.display + digit,
        currentInput: prevState.currentInput + digit,
      }));
    }
  };

  handleOperatorClick = (operator) => {
    if (this.state.operator) {
      this.calculateResult();
    }

    this.setState({
      operator,
      prevInput: this.state.currentInput,
      currentInput: '',
      history: this.state.history + this.state.prevInput + operator,
    });
  };

  calculateResult = () => {
    const { prevInput, currentInput, operator } = this.state;
    let result;

    switch (operator) {
      case '+':
        result = parseFloat(prevInput) + parseFloat(currentInput);
        break;
      case '-':
        result = parseFloat(prevInput) - parseFloat(currentInput);
        break;
      case '*':
        result = parseFloat(prevInput) * parseFloat(currentInput);
        break;
      case '/':
        if (parseFloat(currentInput) !== 0) {
          result = parseFloat(prevInput) / parseFloat(currentInput);
        } else {
          this.setState({
            display: 'Error',
            currentInput: '',
            operator: null,
            prevInput: '',
            history: '',
          });
          return;
        }
        break;
      case '%':
        result = (parseFloat(prevInput) * parseFloat(currentInput)) / 100;
        break;
      default:
        return;
    }

    this.setState({ isButtonPressed: true });

    setTimeout(() => {
      this.setState({
        display: result.toString(),
        currentInput: result.toString(),
        prevInput: '',
        operator: null,
        history: this.state.history + currentInput,
        isButtonPressed: false, 
      });
    }, 100);
  };

  handleClear = () => {
    this.setState({
      display: '0',
      currentInput: '',
      operator: null,
      prevInput: '',
      history: '',
    });
  };

  handleEquals = () => {
    if (this.state.operator) {
      this.calculateResult();
    }
  };

  handleHistoryClear = () => {
    this.setState({ history: '' });
  };

  render() {
    return (
        <div className="calculator">
        <div className="history-label">
          {this.state.history}
        </div>
        <LCDDisplay value={this.state.display} />
        <div className="buttons">
          <div className="row">
            <button className="clear" onClick={this.handleClear}>C</button>
            <button  className="clear" onClick={this.handleHistoryClear}>CE</button>
            <button onClick={() => this.handleOperatorClick('%')}>%</button>
            <button onClick={() => this.handleOperatorClick('/')}>/</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('7')}>7</button>
            <button onClick={() => this.handleDigitClick('8')}>8</button>
            <button onClick={() => this.handleDigitClick('9')}>9</button>
            <button onClick={() => this.handleOperatorClick('*')}>*</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('4')}>4</button>
            <button onClick={() => this.handleDigitClick('5')}>5</button>
            <button onClick={() => this.handleDigitClick('6')}>6</button>
            <button onClick={() => this.handleOperatorClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('1')}>1</button>
            <button onClick={() => this.handleDigitClick('2')}>2</button>
            <button onClick={() => this.handleDigitClick('3')}>3</button>
            <button onClick={() => this.handleOperatorClick('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('0')}>0</button>
            <button onClick={() => this.handleDigitClick('.')}>.</button>
            <button className='equals' onClick={this.handleEquals}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
