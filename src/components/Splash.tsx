import React, {FC} from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

export const Splash: FC = () => {
  return (
    <View style={{flex: 1}}>
      <Lottie
        source={require('../../assets/lottie/animation.json')}
        autoPlay
        loop
        resizeMode="cover"
      />
    </View>
  );
};
