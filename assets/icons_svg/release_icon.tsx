import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function release_icon(props: any) {
  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
      <Svg
        width={props.size}
        height={props.size}
        viewBox="0 0 20 20"
        fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.4697 10.2121C13.4697 9.81047 13.7953 9.48486 14.197 9.48486H17.1061C17.5077 9.48486 17.8333 9.81047 17.8333 10.2121V16.0303C17.8333 16.432 17.5077 16.7576 17.1061 16.7576H15.5891L14.7112 17.6355C14.4272 17.9195 13.9667 17.9195 13.6827 17.6355L12.8048 16.7576H9.10606C8.7044 16.7576 8.37878 16.432 8.37878 16.0303V13.1212C8.37878 12.7196 8.7044 12.394 9.10606 12.394H13.4697V10.2121ZM14.9242 10.9394V13.1212C14.9242 13.5229 14.5986 13.8485 14.197 13.8485H9.83333V15.303H13.1061C13.2989 15.303 13.4839 15.3797 13.6203 15.5161L14.197 16.0927L14.7736 15.5161C14.91 15.3797 15.095 15.303 15.2879 15.303H16.3788V10.9394H14.9242Z"
          fill="#3B82EE"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.83337 4.39402C1.83337 3.99236 2.15899 3.66675 2.56065 3.66675H14.197C14.5987 3.66675 14.9243 3.99236 14.9243 4.39402V13.1213C14.9243 13.523 14.5987 13.8486 14.197 13.8486H7.58917L6.34763 15.0901C6.06362 15.3741 5.60313 15.3741 5.31911 15.0901L4.07758 13.8486H2.56065C2.15899 13.8486 1.83337 13.523 1.83337 13.1213V4.39402ZM3.28792 5.12129V12.394H4.37883C4.57171 12.394 4.7567 12.4706 4.89309 12.607L5.83337 13.5473L6.77366 12.607C6.91005 12.4706 7.09504 12.394 7.28792 12.394H13.4697V5.12129H3.28792Z"
          fill="#3B82EE"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.74255 8.75755C4.74255 8.35588 5.06816 8.03027 5.46983 8.03027H5.83346C6.23512 8.03027 6.56074 8.35588 6.56074 8.75755C6.56074 9.15921 6.23512 9.48482 5.83346 9.48482H5.46983C5.06816 9.48482 4.74255 9.15921 4.74255 8.75755ZM7.28801 8.75755C7.28801 8.35588 7.61362 8.03027 8.01528 8.03027H8.37892C8.78058 8.03027 9.10619 8.35588 9.10619 8.75755C9.10619 9.15921 8.78058 9.48482 8.37892 9.48482H8.01528C7.61362 9.48482 7.28801 9.15921 7.28801 8.75755ZM9.83346 8.75755C9.83346 8.35588 10.1591 8.03027 10.5607 8.03027H10.9244C11.326 8.03027 11.6516 8.35588 11.6516 8.75755C11.6516 9.15921 11.326 9.48482 10.9244 9.48482H10.5607C10.1591 9.48482 9.83346 9.15921 9.83346 8.75755Z"
          fill="#3B82EE"
        />
      </Svg>
    </View>
  );
}