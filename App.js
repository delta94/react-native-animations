import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from './src/components/Test';
import BlogTest from './src/components/BlogTest';
import Airship from './src/components/SVG/Airship';

const AnimatedUIThread = () => {
  return (
    <View style={styles.accordionContainer}>
      <Test title="Benefits" />
    </View>
  );
};

const AirshipFloating = () => {
  return (
    <View style={styles.airshipContainer}>
      <BlogTest />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{}}>
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <View style={{ height: 22, width: 22 }}>
                <Airship fillColor="black" />
              </View>
            ),
            tabBarLabel: () => (
              <Text style={{ color: 'black', fontSize: 12 }}>Airship</Text>
            ),
          }}
          name="Airship"
          component={AirshipFloating}
        />
        <Tab.Screen name="Accordion" component={AnimatedUIThread} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  airshipContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  accordionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
