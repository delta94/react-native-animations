import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Heart from './SVG/Heart';

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

const TouchableHeart = () => {
  // const [pressed, setPressed] = useState(false);
  // const [filled, setFilled] = useState(false);

  // const { clock, scale, circleScale, circleClock } = useMemo(
  //   () => ({
  //     clock: new Clock(),
  //     scale: new Value(0),
  //     circleScale: new Value(0),
  //     circleClock: new Clock(),
  //   }),
  //   [],
  // );

  // useCode(
  //   () =>
  //     block([
  //       pressed
  //         ? (set(scale, runTiming(clock, 0, 1)),
  //           set(scale, runTiming(clock, 0, 1)))
  //         : (set(scale, runTiming(clock, 1, 0)),
  //           set(scale, runTiming(clock, 1, 0))),
  //     ]),
  //   [pressed],
  // );

  // const heartScaling = interpolate(scale, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 1.2],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  // const circleScaling = interpolate(scale, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 3.4],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  return (
    // <TouchableWithoutFeedback
    //   style={{ height: 200 }}
    //   onPressIn={() => {
    //     setPressed(true);
    //     setFilled(!filled);
    //   }}
    //   onPressOut={() => setPressed(false)}>
    //   <Animated.View
    //     style={{
    //       transform: [{ scaleX: heartScaling }, { scaleY: heartScaling }],
    //     }}>
    //     <Heart fillColor={filled ? 'red' : 'gray'} />
    //   </Animated.View>
    //   <Animated.View
    //     style={[
    //       styles.circle,
    //       [{ scaleX: circleScaling }, { scaleY: circleScaling }],
    //     ]}
    //   />
    // </TouchableWithoutFeedback>
    <View>
      <Heart fillColor="red" />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TouchableHeart;
