/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Chevron from './SVG/Chevron';
import AccordionItem from './AccordionItem';

const AnimatedAccordion = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsOpen((prevState) => !prevState)}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <View>
              <Text>{title}</Text>
            </View>

            <View
              style={[
                styles.imageContainer,
                {
                  backgroundColor: isOpen ? '#91d194' : '#58c0ff',
                  transform: isOpen
                    ? [{ rotate: '180deg' }]
                    : [{ rotate: '0deg' }],
                },
              ]}>
              <Chevron />
            </View>
          </View>
          <View
            style={{
              height: isOpen ? 'auto' : 0,
              overflow: 'hidden',
            }}>
            <AccordionItem text="Reason 1" />
            <AccordionItem text="Reason 2" />
            <AccordionItem text="Reason 3" />
            <AccordionItem text="Reason 4" />
          </View>
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
