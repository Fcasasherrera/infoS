import React, {useEffect} from 'react';
import {Animated, View, TouchableOpacity, Platform} from 'react-native';
import {SIZES, FONTS} from '../constants/colors';
import {useAppDispatch} from '../redux/hooks';
import {setActiveTab} from '../redux/requests/RequestAction';

const TabBarComponent = ({state, descriptors, navigation}: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveTab(state.index));
  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 0 : 44,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          dispatch(setActiveTab(state.index));

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? '#2977B7' : 'transparent',
              borderRadius: 50,
              marginHorizontal: 20,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.Text
              style={{
                fontSize: SIZES.body3,
                fontFamily: FONTS.h6.fontFamily,
                color: isFocused ? 'white' : '#565D61',
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarComponent;
