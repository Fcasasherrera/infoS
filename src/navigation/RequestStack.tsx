import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Top Tab
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import RequestList from '../screens/requests/RequestList';

// Components
import {ContainerNoF} from './options';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = createMaterialTopTabNavigator();

export const RequestStack = () => {
  return (
    <ContainerNoF>
      <Stack.Navigator initialRouteName="RequestLis">
        <Stack.Screen
          name="RequestLis"
          component={RequestList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ContainerNoF>
  );
};
