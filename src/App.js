import { Components } from 'expo';
import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

import Style from './Style';

import InputButton from './components/InputButton';
import Modal from './components/Modal';

const { LinearGradient } = Components;
const { height } = Dimensions.get('window');

const inputButtons = [
  ['C', 'M', '( )', 'DEL'],
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  ['.', 0, '=', '+']
]

export default class App extends Component {
  state = {
    inputValue: '0',
    expressionString: '',
    errorModalOpen: false,
    openBrackets: 0,
    closeBrackets: 0,
    error: '',
  }

  componentDidUpdate () {
    if (this.state.errorModalOpen) {
      setTimeout(() => {
        this.setState({
          errorModalOpen: false,
        });
      }, 1000);
    }
  }

  render() {
    return (
      <LinearGradient
        start={[0.0, 0.25]}
        end={[0.5, 1.0]}
        colors={['#fc00ff', '#00dbde']}
        style={{
          height,
        }}
      >
        <View style={Style.displayExpressionContainer}>
          <Text style={Style.displayExpressionText}>{this.state.expressionString}</Text>
        </View>
        <View style={Style.displayCurrentContainer}>
          <Text style={Style.displayCurrentText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
        <Modal
          open={this.state.errorModalOpen}
          offset={500}
          modalStyle={Style.errorModal}
          overlayBackground={'rgba(255, 255, 255, 0)'}
          modalDidClose={() => this.setState({ errorModalOpen: false })}
        >
          <View style={Style.errorContainer}>
            <Text style={Style.errorText}>Somethings went wrong!</Text>
          </View>
        </Modal>
      </LinearGradient>
    );
  }

  _renderInputButtons() {
    let views = [];

    inputButtons.map((row, idx1) => {
      let inputRow = [];

      row.map((input, idx2) => inputRow.push(
        <InputButton
          value={input}
          key={idx1 - idx2}
          onPress={this._onInputButtonPressed(input)}
        />
      ));

      views.push(<View style={Style.inputRow} key={"row-" + idx1}>{inputRow}</View>);
    });

    return views;
  }

  _onInputButtonPressed = (input) => () => {
    switch (typeof input) {
      case 'number':
        return this._handleNumberInput(input)
      case 'string':
        return this._handleStringInput(input)
    }
  }

  _handleNumberInput = (num) => {
    const { inputValue } = this.state;
    const value = (inputValue === '0') ? num.toString() : inputValue + num.toString();
    this.setState({
      inputValue: value,
    });
  }

  _handleStringInput = (str) => {
    const { inputValue, closeBrackets, openBrackets } = this.state;

    switch (str) {
      case '/':
      case '*':
      case '+':
        if (inputValue !== '0') this.setState({
          inputValue: inputValue + str,
        });
        break;
      case '-':
        if (inputValue === '0') {
          this.setState({
            inputValue: str,
          })
        } else {
          this.setState({
            inputValue: inputValue + str,
          })
        }
        break;
      case '( )':
        if (inputValue === '0') {
          this.setState({
            inputValue: '(',
            openBrackets: openBrackets + 1,
          });
        } else if (!isNaN(inputValue[inputValue.length - 1]) && closeBrackets < openBrackets) {
          this.setState({
            inputValue: inputValue + ')',
            closeBrackets: closeBrackets + 1,
          });
        } else if (isNaN(inputValue[inputValue.length - 1])) {
          switch (inputValue[inputValue.length - 1]) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '(':
              this.setState({
                inputValue: inputValue + '(',
                openBrackets: openBrackets + 1,
              });
              break;
            case ')':
              if (closeBrackets < openBrackets) this.setState({
                inputValue: inputValue + ')',
                closeBrackets: closeBrackets + 1,
              });
              break;
          }
        };
        break;
      case '.':
          if (inputValue !== '0') this.setState({
            inputValue: inputValue + str,
          });
          break;
      case '=':
        if (!inputValue) return;
        try {
          const value = eval(inputValue).toString();
          this.setState({
            expressionString: inputValue,
            inputValue: value,
            openBrackets: 0,
            closeBrackets: 0,
          });
        } catch (e) {
          if (e instanceof SyntaxError) {
            this.setState({ errorModalOpen: true, });
          }
        }
        break;
      case 'C':
        this.setState({
          inputValue: '0',
          expressionString: '',
        });
        break;
      case 'DEL':
        if (inputValue.length <= 1) {
          this.setState({
            inputValue: '0',
          });
        } else {
          switch (inputValue[inputValue.length - 1]) {
            case '(':
              this.setState({
                openBrackets: openBrackets - 1,
                inputValue: inputValue.slice(0, -1),
              });
              break;
            case ')':
              this.setState({
                closeBrackets: closeBrackets - 1,
                inputValue: inputValue.slice(0, -1),
              });
              break;
            default:
              this.setState({
                inputValue: inputValue.slice(0, -1),
              });
          }
        }
        break;
    }
  }
}
