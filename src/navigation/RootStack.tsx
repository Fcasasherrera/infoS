import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import Container from './NavigationContainer';
import ProfileScreen from '../screens/profile/ProfileScreen';

import RequestDetail from '../screens/requests/RequestDetail';
import EditRequest from '../screens/requests/EditRequest';
import NewRequest from '../screens/requests/NewRequest';

import {NavigationContainer} from '@react-navigation/native';
import {commonScreenOptionsDelete, screenOptions} from './options';

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
        {/* Profile */}
        <Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        {/* Requests */}
        <Screen
          name="RequestDetail"
          component={RequestDetail}
          options={{headerShown: false}}
        />
        <Screen
          name="EditRequest"
          component={EditRequest}
          options={commonScreenOptionsDelete}
        />
        <Screen
          name="NewRequest"
          component={NewRequest}
          options={screenOptions}
        />
      </Navigator>
    </NavigationContainer>
  );
};
