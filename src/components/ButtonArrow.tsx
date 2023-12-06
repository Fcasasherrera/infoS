import React, {FC} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

type ButtonArrowProps = {
  onPress: any;
  width?: string;
  margin?: string;
  height?: string;
  style?: any;
  color?: string;
};

export const ButtonArrow: FC<ButtonArrowProps> = ({
  onPress,
  color,
  width,
  height,
  margin,
}) => {
  return (
    <ArrowContainer
      color={color}
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}>
      <Icon size={22} name="arrowleft" color="#2B3F6C" />
    </ArrowContainer>
  );
};

type StyleProps = {
  onPress: any;
  width?: string;
  marginTop?: string;
  height?: string;
  style?: any;
  color?: string;
  padding?: string;
};

const ArrowContainer = styled.TouchableOpacity<StyleProps>`
  padding-horizontal: 0px;
  height: ${(props: StyleProps) => props.height || '48px'};
  margin-top: ${(props: StyleProps) => props.marginTop || '10px'};
  flex-direction: row;
  align-items: center;
`;
