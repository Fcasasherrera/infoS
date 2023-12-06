// React
import React, {useEffect, useState} from 'react';

// Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {loginSelector} from '../redux/auth/login/LoginSelector';

// Icons
import HomeIcon from '../../assets/icons_svg/home_icon';
import FileIcon from '../../assets/icons_svg/file_icon';
import ChatIcon from '../../assets/icons_svg/chat_icon';
import NotificationIcon from '../../assets/icons_svg/notification_icon';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import CommunicatesListScreen from '../screens/communiques/CommunicatesListScreen';
import NotificationsList from '../screens/notifications/NotificationsList';
import ChatHome from '../screens/chat/ChatHome';

//Navigation Stack
import {STYLE_BOTTOMBAR, themeLight} from '../constants/colors';
import {ContainerFluid} from './options';
import {CheckIsLogedIn} from '../redux/auth/login/LoginAction';
import {DotIndicator} from 'react-native-indicators';
import {Splash} from '../components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';
import {str} from '../locales/Locale';
import {RequestStack} from './RequestStack';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = createBottomTabNavigator();

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
        <Navigator
          initialRouteName="CommunicateList"
          screenOptions={{
            tabBarStyle: STYLE_BOTTOMBAR,
            headerShown: false,
            tabBarShowLabel: true,
            ...stylesBottomBar,
          }}>
          <Screen
            name="CommunicateList"
            component={CommunicatesListScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => <HomeIcon size={24} color={color} />,
            }}
          />
          <Screen
            name="RequestStack"
            component={RequestStack}
            options={{
              tabBarLabel: str('requestsScreens.tabBarLabel'),
              tabBarIcon: ({color}) => (
                <NotificationIcon size={24} color={color} />
              ),
            }}
          />
          <Screen
            name="NotificationsScreen"
            component={NotificationsList}
            options={{
              tabBarLabel: str('notificationsScreens.tabBarLabel'),
              tabBarIcon: ({color}) => <FileIcon size={24} color={color} />,
            }}
          />
          <Screen
            name="ChatScreen"
            component={ChatHome}
            options={{
              tabBarLabel: str('chatScreens.tabBarLabel'),
              tabBarIcon: ({color}) => <ChatIcon size={24} color={color} />,
            }}
          />
        </Navigator>
      )}
    </>
  ) : (
    <ContainerFluid>
      <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        <DotIndicator color={themeLight.primary} size={12} count={3} />
      </View>
    </ContainerFluid>
  );
}

export default Container;
