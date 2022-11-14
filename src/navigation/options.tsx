import React from 'react';
import FIcon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {themeLight} from '../constants/colors';
import {Appearance, SafeAreaView, StatusBar, View} from 'react-native';
import {getStyles} from '../../App';
import {useAppDispatch} from '../redux/hooks';

export const commonScreenOptions = ({
  navigation,
  route,
}): NativeStackNavigationOptions => ({
  headerTitle: route.params.name ? route.params.name : '',
  headerTitleAlign: 'center',
  headerBackTitle: '',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerLeft: props => {
    return (
      <>
        {props.canGoBack && (
          <IconContainer onPress={() => navigation.pop()}>
            <FIcon name="arrowleft" size={24} color={themeLight.black} />
          </IconContainer>
        )}
      </>
    );
  },
});

export const screenOptions = ({
  navigation,
  route,
}): NativeStackNavigationOptions => ({
  headerTitle: '',
  headerTitleAlign: 'center',
  headerBackTitle: '',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerLeft: props => {
    return (
      <>
        {props.canGoBack && (
          <IconContainer onPress={() => navigation.pop()}>
            <FIcon name="arrowleft" size={24} color={themeLight.black} />
          </IconContainer>
        )}
      </>
    );
  },
});

export const commonScreenOptionsDelete = ({
  navigation,
}): NativeStackNavigationOptions => ({
  headerTitle: '',
  headerBackTitle: '',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerLeft: props => {
    return (
      <>
        {props.canGoBack && (
          <IconContainer onPress={() => navigation.pop()}>
            <FIcon name="arrowleft" size={24} color={themeLight.black} />
          </IconContainer>
        )}
      </>
    );
  },
  headerRight: props => {
    const dispatch = useAppDispatch();
    return (
      <>
        {props.canGoBack && (
          <IconContainer onPress={() => dispatch(ToggleDeleteModal())}>
            <Trash_icon
              size={24}
              onPress={() => dispatch(ToggleDeleteModal())}
            />
          </IconContainer>
        )}
      </>
    );
  },
});
export const IconContainer = styled.TouchableOpacity.attrs(
  (props: any) => ({}),
)`
  padding: 8px;
  border-radius: 50px;
`;

export const ContainerFluid = (props: any) => {
  const appearance = themeLight;

  const stylesSafeArea = getStyles(appearance, true);
  return (
    <>
      <SafeAreaView
        style={
          props?.inverted
            ? {backgroundColor: themeLight.invertedGradients[0]}
            : stylesSafeArea.headerGradient
        }
      />
      <SafeAreaView style={stylesSafeArea.container}>
        <StatusBar
          animated={true}
          barStyle={
            Appearance.getColorScheme() === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <View style={stylesSafeArea.fullScreen}>{props.children}</View>
      </SafeAreaView>
    </>
  );
};

export const ContainerNoF = (props: any) => {
  const appearance = themeLight;

  const stylesSafeArea = getStyles(appearance, false);
  return (
    <>
      {/* <SafeAreaView style={stylesSafeArea.headerGradient} /> */}
      <SafeAreaView style={stylesSafeArea.container}>
        <StatusBar animated={true} barStyle={'dark-content'} />
        <View style={stylesSafeArea.fullScreen}>{props.children}</View>
      </SafeAreaView>
    </>
  );
};
