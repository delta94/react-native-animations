import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Plus from './SVG/Plus';

const AccordionItem = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Plus />
      </View>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
});

export default AccordionItem;
