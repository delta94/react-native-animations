import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Chevron = () => (
  <Image
    source={require('../../../assets/down-arrow.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Chevron;
