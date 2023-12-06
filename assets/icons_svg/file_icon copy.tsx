import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function file_icon(props: any) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Svg
        width={`${props.size}`}
        height={`${props.size}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M12.1027 5.24371L12.713 4.80779V4.80779L12.1027 5.24371ZM11.3973 4.25629L10.787 4.69221V4.69221L11.3973 4.25629ZM21.25 11.5V16H22.75V11.5H21.25ZM17 20.25H7V21.75H17V20.25ZM2.75 16V8H1.25V16H2.75ZM7 3.75H8.95615V2.25H7V3.75ZM10.787 4.69221L11.4924 5.67964L12.713 4.80779L12.0076 3.82036L10.787 4.69221ZM14.5439 7.25H17V5.75H14.5439V7.25ZM11.4924 5.67964C12.1963 6.66513 13.3328 7.25 14.5439 7.25V5.75C13.8172 5.75 13.1353 5.39908 12.713 4.80779L11.4924 5.67964ZM8.95615 3.75C9.68279 3.75 10.3647 4.10092 10.787 4.69221L12.0076 3.82036C11.3037 2.83487 10.1672 2.25 8.95615 2.25V3.75ZM7 20.25C4.65279 20.25 2.75 18.3472 2.75 16H1.25C1.25 19.1756 3.82436 21.75 7 21.75V20.25ZM21.25 16C21.25 18.3472 19.3472 20.25 17 20.25V21.75C20.1756 21.75 22.75 19.1756 22.75 16H21.25ZM22.75 11.5C22.75 8.32436 20.1756 5.75 17 5.75V7.25C19.3472 7.25 21.25 9.15279 21.25 11.5H22.75ZM2.75 8C2.75 5.65279 4.65279 3.75 7 3.75V2.25C3.82436 2.25 1.25 4.82436 1.25 8H2.75ZM11 4.75H16.5V3.25H11V4.75ZM16.5 4.75C18.5711 4.75 20.25 6.42893 20.25 8.5H21.75C21.75 5.60051 19.3995 3.25 16.5 3.25V4.75Z"
          fill={props.color}
        />
        <Path
          d="M12 16.5H18"
          stroke={props.color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
