import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, Platform, StatusBar, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {ProfileImage} from '.';
import {str} from '../locales/Locale';
import {Row} from './Containers';
import {FadeInView} from './FadeInView';
import {Text} from './Texts';

const HEADER_HEIGHT = 60;
const HEADER_HEIGHT_ANDROID = 100;

export const AnimatedHeader = (props: any) => {
  const {animatedValue, user} = props;
  const {person} = user;

  const insets = useSafeAreaInsets();
  const height = Platform.OS === 'ios' ? 30 : 70;
  const HEADER_HEIGHT_END =
    Platform.OS === 'ios' ? HEADER_HEIGHT : HEADER_HEIGHT_ANDROID;
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT_END + insets.top],
    outputRange: [HEADER_HEIGHT_END + insets.top, insets.top + height],
    extrapolate: 'clamp',
  });
  const navigation: any = useNavigation();

  return (
    <>
      <FadeInView
        fluid
        style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10}}>
        <Animated.View
          style={{
            width: '100%',
            height: headerHeight,
            backgroundColor: '#3190e1',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00A9CD', '#5287EE']}
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <Row
              fdirection="row"
              align="center"
              style={{marginTop: Platform.OS === 'ios' ? 0 : 24}}>
              <Row style={{marginLeft: 8}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProfileScreen');
                  }}>
                  <ProfileImageBordered
                    source={require('../../assets/images/profile.jpeg')}
                    width={44}
                    height={44}
                  />
                </TouchableOpacity>
              </Row>
              <Row align="flex-start" style={{marginLeft: 8}}>
                <Text size="big" white>
                  {str('newsScreen.welcome', {name: person.firstname})}
                </Text>
                <Text size="medium" white>
                  {str('newsScreen.headerText')}
                </Text>
              </Row>
            </Row>
          </LinearGradient>
        </Animated.View>
      </FadeInView>
    </>
  );
};
const ProfileImageBordered = styled(ProfileImage)`
  border-width: 2px;
  border-color: ${(props: any) => props.theme.primaryProfile};
`;
