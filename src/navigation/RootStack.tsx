import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import Container from './NavigationContainer';
import {NavigationContainer} from '@react-navigation/native';

const {Navigator, Screen} = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={Container}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
};
