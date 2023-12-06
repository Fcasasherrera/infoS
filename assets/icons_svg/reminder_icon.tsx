import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function reminder_icon(props: any) {
  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
      <Svg
        width={props.size}
        height={props.size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10.3003 10.3003L14.3897 14.3897L10.3003 10.3003ZM1.61035 6.72208L6.72208 1.61035C6.72208 1.61035 7.74442 3.65504 8.76677 4.67739C9.78911 5.69973 13.3673 6.72208 13.3673 6.72208L6.72208 13.3673C6.72208 13.3673 5.69973 9.78911 4.67739 8.76677C3.65504 7.74442 1.61035 6.72208 1.61035 6.72208Z"
          stroke="#64DB59"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
