/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, processColor } from 'react-native';
import Animated, { Value, useCode } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import {
  mix,
  withTransition,
  onGestureEvent,
  mixColor,
} from 'react-native-redash';

import Chevron from './SVG/Chevron';
import AccordionItem from './AccordionItem';

const { not, cond, eq, set } = Animated;

const Test = ({ title }) => {
  const open = new Value(0);
  const transition = withTransition(open);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });

  const infoHeight = mix(transition, 0, 110);

  const rotateZ = mix(transition, 0, Math.PI);

  const backgroundColor = mixColor(
    transition,
    processColor('#58c0ff'),
    processColor('#91d194'),
  );

  useCode(() => cond(eq(state, State.END), set(open, not(open))), [
    open,
    state,
  ]);

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <View>
              <Text>{title}</Text>
            </View>

            <Animated.View
              style={[
                styles.imageContainer,
                {
                  backgroundColor,
                  transform: [{ rotateZ }],
                },
              ]}>
              <Chevron />
            </Animated.View>
          </View>
          <Animated.View
            style={{
              height: infoHeight,
              overflow: 'hidden',
            }}>
            <AccordionItem text="Reason 1" />
            <AccordionItem text="Reason 2" />
            <AccordionItem text="Reason 3" />
            <AccordionItem text="Reason 4" />
          </Animated.View>
        </View>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 8,
  },
  card: {
    width: 300,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  imageContainer: {
    backgroundColor: '#58c0ff',
    width: 30,
    height: 30,
    padding: 6,
    borderRadius: 500,
  },
});

export default Test;
