import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayExpressionContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  displayCurrentContainer: {
    flex: 1.5,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  displayCurrentText: {
    color: 'white',
    fontSize: 55,
    textAlign: 'right',
    lineHeight: 48,
    padding: 20,
  },
  displayExpressionText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'right',
    padding: 20,
  },
  inputContainer: {
    flex: 7,
  },
  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputButtonText: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'transparent',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
  errorModal: {
    alignItems: 'center',
    top: 10,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  errorText: {
    color: '#fff',
    fontSize: 25,
  },
});

export default Style;
