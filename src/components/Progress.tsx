import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {increaseBrightness} from '../utils/Utils';

interface ProgressProps {
  step: number;
  color: string;
  styles?: any;
}

export const Progress = (props: ProgressProps) => {
  const counter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return load(props.step);
  }, [props.step]);

  const load = (count: number) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  const styles = getStyles(props.color);
  const color2 = props.color;

  return (
    <View style={[styles.progressBar, props.styles]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {borderRadius: 150, backgroundColor: color2, width},
        ]}
      />
    </View>
  );
};
const getStyles = (color: string) => {
  const brightColor = increaseBrightness(color, 50);
  return StyleSheet.create({
    progressBar: {
      height: 5,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: brightColor,
      borderColor: '#000',
      borderRadius: 150,
    },
  });
};
