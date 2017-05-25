import React, { Component } from 'react';
import {
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Components } from 'expo';

import Style from './Style';

import { BasicCalculator } from './screens';

const { LinearGradient } = Components;
const { width, height } = Dimensions.get('window');
const DURATION = 400;
const CLOSE_MODE = 200;
const ICON_LINE_HEIGHT = 2;

const closeItems = [0, 1];
const burgerItems = [0, 1, 2];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.closeAnimations = [];
    this.burgerAnimations = [];

    closeItems.forEach(i => {
      this.closeAnimations.push(
        new Animated.Value(i === 0 ? -CLOSE_MODE : CLOSE_MODE)
      );
    });

    burgerItems.forEach(i => {
      this.burgerAnimations.push(new Animated.Value(0));
    });

    this.state = {
      animateStripe: new Animated.Value(height),
      animateBg: new Animated.Value(0),
      animateOpacity: new Animated.Value(1),
      finished: false,
      closeFinished: false,
      burgerFinished: false,
      selectedMode: 1,
    };
  }

  animateClose() {
    const animations = closeItems.map(i => {
      if (this.state.closeFinished) {
        return Animated.timing(this.closeAnimations[i], {
          toValue: i === 0 ? -CLOSE_MODE : CLOSE_MODE,
          duraction: DURATION
        });
      } else {
        return Animated.sequence([
          Animated.delay(DURATION / 2),
          Animated.timing(this.closeAnimations[i], {
            toValue: 0,
            duraction: DURATION
          })
        ]);
      }
    });

    return Animated.stagger(150, animations);
  }

  animateBurger() {
    const animations = burgerItems.map(i => {
      if (this.state.closeFinished) {
        return Animated.timing(this.burgerAnimations[i], {
          toValue: 0,
          duraction: DURATION
        });
      } else {
        return Animated.timing(this.burgerAnimations[i], {
          toValue: CLOSE_MODE,
          duraction: DURATION
        });
      }
    });

    return Animated.stagger(150, animations);
  }

  renderCloseButton() {
    return (
      <View>
        {closeItems.map(i => {
          const inputRange = i === 0 ? [-CLOSE_MODE, 0] : [0, CLOSE_MODE];

          const bg = this.closeAnimations[i].interpolate({
            inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
            outputRange: ['#aaa', '#353535', '#aaa']
          });
          const opacity = this.closeAnimations[i].interpolate({
            inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.View
              key={i}
              style={[
                Style.line,
                {
                  marginBottom: i === 0 ? -ICON_LINE_HEIGHT : 0,
                  backgroundColor: bg,
                  transform: [
                    {
                      rotate: i === 0 ? '90deg' : '0deg'
                    },
                    {
                      translateX: this.closeAnimations[i]
                    }
                  ]
                }
              ]}
            />
          );
        })}
      </View>
    );
  }

  renderBurger() {
    return (
      <View
        style={[
          Style.closeContainer,
          Style.burgerContainer,
          { position: 'absolute', top: 0, left: 0 }
        ]}>
        <Animated.View
          style={[
            Style.line,
            Style.lineMedium,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[1]
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            Style.line,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[0]
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            Style.line,
            Style.lineSmall,
            {
              transform: [
                {
                  translateX: this.burgerAnimations[2]
                }
              ]
            }
          ]}
        />
      </View>
    );
  }

  renderScreen() {
    switch (this.state.selectedMode) {
      case 1:
        return <BasicCalculator />;
        break;
    }
  }

  restartAnimation() {
    if (this.state.finished) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.animateBg, {
            toValue: 1,
            duration: DURATION / 10
          }),
          Animated.timing(this.state.animateStripe, {
            toValue: height,
            duration: DURATION,
            easing: Easing.Out
          })
        ]),
        this.animateClose(),
        this.animateBurger(),
        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(this.state.animateOpacity, {
            toValue: 1,
            duration: DURATION
          })
        ])
      ]).start(() => {
        this.state.animateBg.setValue(0);
        this.setState({
          closeFinished: !this.state.closeFinished
        });
      });
    } else {
      Animated.parallel([
        Animated.timing(this.state.animateOpacity, {
          toValue: 0,
          duration: DURATION
        }),

        this.animateBurger(),
        this.animateClose(),

        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(this.state.animateStripe, {
            toValue: 0,
            duration: DURATION,
            easing: Easing.Out
          })
        ])
      ]).start(() => {
        this.state.animateOpacity.setValue(0);
        this.setState({
          closeFinished: !this.state.closeFinished
        });
      });
    }
  }

  render() {
    const top = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [-height / 4, 0],
      extrapolate: 'clamp'
    });

    const bottom = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [height / 4, 0],
      extrapolate: 'clamp'
    });

    const opacity = this.state.animateStripe.interpolate({
      inputRange: [0, height / 1.5, height],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    const translateContent = this.state.animateStripe.interpolate({
      inputRange: [0, height],
      outputRange: [0, 30],
      extrapolate: 'clamp'
    });

    const bgColor = this.state.animateBg.interpolate({
      inputRange: [0, 0.002, 1],
      outputRange: ['transparent', '#fc00ff', '#00dbde']
    });

    const scaleLogo = this.state.animateOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    });

    return (
      <View style={Style.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]}
        />
        <Animated.View
          style={[
            Style.menuContainer,
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'transparent',
              opacity: opacity,
              transform: [{ translateY: translateContent }]
            }
          ]}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'transparent'
            }}>
            <TouchableOpacity onPress={() => this.setState({ selectedMode: 1 })}>
              <Text style={Style.buttonStyle}>Basic Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ selectedMode: 2 })}>
              <Text style={Style.buttonStyle}>Solve Equations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ selectedMode: 3 })}>
              <Text style={Style.buttonStyle}>Bases Converter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ selectedMode: 4 })}>
              <Text style={Style.buttonStyle}>About</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            transform: [
              {
                rotate: '-35deg'
              }
            ]
          }}>
          <Animated.View
            style={[
              Style.strip,
              Style.top,
              {
                height: this.state.animateStripe,
                transform: [
                  {
                    translateY: top
                  }
                ]
              }
            ]}
          />
          <Animated.View
            style={[
              Style.strip,
              Style.bottom,
              {
                height: this.state.animateStripe,
                transform: [
                  {
                    translateY: bottom
                  }
                ]
              }
            ]}
          />
        </View>

        <Animated.View style={[
          StyleSheet.absoluteFill,
          {
            opacity: this.state.animateOpacity
          },
        ]}>
          <LinearGradient
            start={[0.0, 0.25]}
            end={[0.5, 1.0]}
            colors={['#fc00ff', '#00dbde']}
            style={[{
              height,
            },
              StyleSheet.absoluteFill,
            ]}
          >
            {this.renderScreen()}
          </LinearGradient>
        </Animated.View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              finished: !this.state.finished
            });
            this.restartAnimation();
          }}>
          <View
            style={[
              Style.closeContainer,
              Style.burgerContainer,
              {
                transform: [
                  {
                    rotate: '-45deg'
                  }
                ]
              }
            ]}>

            {this.renderCloseButton()}
            {this.renderBurger()}
          </View>

        </TouchableWithoutFeedback>
      </View>
    );
  }
}
