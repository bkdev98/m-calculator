import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const { height, width } = Dimensions.get('window');
const ICON_LINE_HEIGHT = 2;
const ICON_SIZE = 30;

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
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
  closeContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 40
  },
  line: {
    height: ICON_LINE_HEIGHT,
    width: ICON_SIZE,
    backgroundColor: '#fff'
  },
  burgerContainer: {
    justifyContent: 'space-around'
  },
  lineMedium: {
    width: ICON_SIZE * 0.67,
    alignSelf: 'flex-start'
  },
  lineSmall: {
    width: ICON_SIZE * 0.45,
    alignSelf: 'flex-end'
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: height / 5,
    backgroundColor: 'white'
  },
  buttonStyle: {
    fontSize: 20,
    color: '#353535'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  strip: {
    backgroundColor: '#353535',
    height: height,
    width: width * 3
  },
  top: {
    // backgroundColor: 'green'
  },
  bottom: {
    // backgroundColor: 'red',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});

export default Style;
