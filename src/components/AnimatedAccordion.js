/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import Chevron from './SVG/Chevron';
import AccordionItem from './AccordionItem';
import { mix, useTransition, bin } from 'react-native-redash';

const { not } = Animated;

const AnimatedAccordion = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const transition = useTransition(
    isOpen,
    not(bin(isOpen)),
    bin(isOpen),
    400,
    Easing.inOut(Easing.ease),
  );

  const infoHeight = mix(transition, 0, 110);

  const rotateZ = mix(transition, 0, Math.PI);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsOpen((prevState) => !prevState);
      }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <View>
              <Text>{title}</Text>
            </View>

            <Animated.View
              style={[
                styles.imageContainer,
                {
                  backgroundColor: isOpen ? '#91d194' : '#58c0ff',
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
      </View>
    </TouchableWithoutFeedback>
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

export default AnimatedAccordion;
