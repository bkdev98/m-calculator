import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayHistoryContainer: {
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
    padding: 20,
  },
  displayHistoryText: {
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
    backgroundColor: 'rgba(10, 10, 10, 0.03)',
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
});

export default Style;
