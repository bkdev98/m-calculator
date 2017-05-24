import { Components } from 'expo';
import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

import Style from './Style';

import InputButton from './components/InputButton';

const { LinearGradient } = Components;
const { height } = Dimensions.get('window');

const inputButtons = [
  ['C', 'MR', '%', '$'],
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  ['.', 0, '=', '+']
]

export default class App extends Component {
  state = {
    inputValue: 0,
    historyValue: '',
    previousInputValue: 0,
    selectedSymbol: null,
  }

  render() {
    return (
      <LinearGradient
        start={[0.0, 0.25]}
        end={[0.5, 1.0]}
        colors={['#fc00ff', '#00dbde']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height,
        }}
      >
        <View style={Style.displayHistoryContainer}>
          <Text style={Style.displayHistoryText}>{this.state.historyValue}</Text>
        </View>
        <View style={Style.displayCurrentContainer}>
          <Text style={Style.displayCurrentText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
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
          selected={this.state.selectedSymbol === input}
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
    this.setState({
      inputValue: this.state.inputValue*10 + num,
    });
  }

  _handleStringInput = (str) => {
    switch (str) {
      case '/':
      case '*':
      case '-':
      case '+':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0,
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;
        if (!symbol) return;
        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null,
        });
        break;
      case 'C':
        this.setState({
          previousInputValue: 0,
          inputValue: 0,
          selectedSymbol: null,
        });
    }
  }
}
