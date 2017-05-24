import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Style from '../Style';

class InputButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[Style.inputButton, this.props.selected ? Style.inputButtonSelected : null]}
        underlayColor="#E91E63"
        onPress={this.props.onPress}
      >
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}

export default InputButton;