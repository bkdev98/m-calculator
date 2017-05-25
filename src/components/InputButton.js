import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Style from '../Style';

class InputButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[Style.inputButton, this.props.selected ? Style.inputButtonSelected : null]}
        underlayColor="rgba(255, 255, 255, 0.05)"
        onPress={this.props.onPress}
      >
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }
}

export default InputButton;