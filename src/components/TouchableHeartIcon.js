import React, { useState, useMemo } from 'react';
import { View, StyleSheet, processColor } from 'react-native';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Heart from './SVG/Heart';
import {
  onGestureEvent,
  withTransition,
  mix,
  mixColor,
} from 'react-native-redash';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  interpolate,
  useCode,
  eq,
  not,
} = Animated;

const runTiming = (clock, from, to) => {
  const state = {
    finished: new Value(0),
    position: new Value(from),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 200,
    toValue: new Value(to),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), [], startClock(clock)),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
};

const TouchableHeartIcon = () => {
  const pressed = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const squareClock = new Clock();
  const squareScale = new Value(0);
  const transition = withTransition(pressed);
  const gestureHandler = onGestureEvent({ state });

  const squareScaling = interpolate(squareScale, {
    inputRange: [0, 1],
    outputRange: [1, 1.6],
    extrapolate: Extrapolate.CLAMP,
  });

  const heartColor = mixColor(
    squareClock,
    processColor('#808080'),
    processColor('#f2003c'),
  );

  useCode(
    () =>
      block([
        cond(eq(state, State.END), set(pressed, not(pressed))),

        pressed
          ? (set(squareScale, [
              cond(clockRunning(squareClock), [], startClock(squareClock)),
              timing(squareClock, state, {
                duration: 200,
                toValue: 1,
                easing: Easing.inOut(Easing.ease),
              }),
              cond(state.END, debug('stop clock', stopClock(squareClock))),
              // we made the block return the updated position
              0,
            ]),
            set(squareScale, [
              cond(clockRunning(squareClock), [], startClock(squareClock)),
              timing(squareClock, state, {
                duration: 200,
                toValue: 1,
                easing: Easing.inOut(Easing.ease),
              }),
              cond(state.END, debug('stop clock', stopClock(squareClock))),
              // we made the block return the updated position
              0,
            ]))
          : (set(squareScale, [
              cond(clockRunning(squareClock), [], startClock(squareClock)),
              timing(squareClock, state, {
                duration: 200,
                toValue: 0,
                easing: Easing.inOut(Easing.ease),
              }),
              cond(state.END, debug('stop clock', stopClock(squareClock))),
              // we made the block return the updated position
              1,
            ]),
            set(squareScale, [
              cond(clockRunning(squareClock), [], startClock(squareClock)),
              timing(squareClock, state, {
                duration: 200,
                toValue: 0,
                easing: Easing.inOut(Easing.ease),
              }),
              cond(state.END, debug('stop clock', stopClock(squareClock))),
              // we made the block return the updated position
              1,
            ])),
      ]),
    [pressed, state],
  );

  return (
    <View style={styles.container}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ scaleX: squareScaling }, { scaleY: squareScaling }],
          }}>
          <Animated.View
            style={{
              backgroundColor: heartColor,
              height: 200,
              width: 200,
            }}>
            {/* <Heart fillColor={'grey'} /> */}
          </Animated.View>
        </Animated.View>
        {/* <Animated.View
        style={[
            styles.circle,
            [{ scaleX: circleScaling }, { scaleY: circleScaling }],
        ]}
    /> */}
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 200,
  },
  circle: {
    backgroundColor: 'red',
    opacity: 0.1,
    height: 100,
    width: 100,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 500,
    // zIndex: -2,
  },
});

export default TouchableHeartIcon;
