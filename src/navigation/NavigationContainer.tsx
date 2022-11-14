// React
import React, {useEffect, useState} from 'react';

// Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {loginSelector} from '../redux/auth/login/LoginSelector';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

//Navigation Stack
import {gradients, themeLight} from '../constants/colors';
import {ContainerFluid} from './options';
import {CheckIsLogedIn} from '../redux/auth/login/LoginAction';
import {DotIndicator} from 'react-native-indicators';
import {Splash} from '../components';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';

const Stack = createNativeStackNavigator();
// const {Navigator, Screen} = createBottomTabNavigator();

function Container() {
  const loginState = useAppSelector(loginSelector);
  const {isLogedin, loadingCheckIsLogged} = loginState;
  const [appIsReady, setAppIsReady] = useState(false);

  const dispacth = useAppDispatch();
  useEffect(() => {
    dispacth(CheckIsLogedIn());
  }, []);
  /**
   * Show Splash's animation
   */
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };
    setTimeout(loadUserData, 2500);
  }, []);

  if (!appIsReady) {
    return <Splash />;
  }
  const stylesBottomBar =
    Platform.OS === 'android'
      ? {
          tabBarIconStyle: {marginTop: 8},
          tabBarItemStyle: {marginBottom: 8},
        }
      : {};

  return !loadingCheckIsLogged ? (
    <>
      {!isLogedin ? (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <ContainerFluid>
          <View
            colors={gradients}
            style={{flex: 1, width: '100%', justifyContent: 'center'}}>
            <DotIndicator color={themeLight.primary} size={12} count={3} />
          </View>
        </ContainerFluid>
      )}
    </>
  ) : (
    <ContainerFluid>
      <View
        colors={gradients}
        style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        <DotIndicator color={themeLight.primary} size={12} count={3} />
      </View>
    </ContainerFluid>
  );
}

export default Container;
