import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function right_arrow(props: any) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.7612 11.7071C13.9056 11.8757 13.9056 12.1243 13.7612 12.2928L8.43056 18.5119C8.16099 18.8264 8.19741 19.2999 8.51191 19.5694C8.8264 19.839 9.29988 19.8026 9.56944 19.4881L14.9001 13.269C15.526 12.5388 15.526 11.4612 14.9001 10.7309L9.56944 4.51189C9.29987 4.1974 8.8264 4.16098 8.51191 4.43055C8.19741 4.70011 8.16099 5.17359 8.43056 5.48808L13.7612 11.7071Z"
          fill="#2B3F6C"
        />
      </Svg>
    </TouchableOpacity>
  );
}
