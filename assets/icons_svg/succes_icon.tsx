import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {View, StyleSheet} from 'react-native';

export default function Succes_icon(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<React.Component<SvgProps, any, any>> &
    Readonly<SvgProps>,
) {
  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
      <Svg
        width={74}
        height={74}
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37 .334C16.75.334.333 16.751.333 37.001S16.75 73.667 37 73.667s36.667-16.416 36.667-36.666C73.667 16.75 57.25.334 37 .334zm15.893 30.467a3.334 3.334 0 10-5.12-4.267L33.44 43.731l-7.417-7.42a3.333 3.333 0 00-4.713 4.713l10 10a3.334 3.334 0 004.917-.223l16.666-20z"
          fill="#0C659A"
        />
      </Svg>
    </View>
  );
}
