import React, {FC} from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

type ButtonNewRequestProps = {
  onPress: any;
  width?: string;
  margin?: string;
  height?: string;
  style?: any;
  color?: string;
  bgColor?: string;
  isActive?: boolean;
  text?: string;
  children?: any;
  iconName?: string;
  iconSize?: number;
  Icon?: any;
};

export const ButtonNewRequest: FC<ButtonNewRequestProps> = ({
  onPress,
  color,
  bgColor,
  width,
  height,
  margin,
  style,
  children,
  iconName = 'plus',
  iconSize = 18,
  Icon = Feather,
}) => {
  return (
    <NewContainer
      bgColor={bgColor}
      color={color}
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}
      style={style}>
      <Icon
        name={iconName}
        size={iconSize}
        color="white"
        style={{paddingRight: children ? 8 : 0}}
      />
      {children && <ButtonNewText>{children}</ButtonNewText>}
    </NewContainer>
  );
};

type StyleProps = {
  onPress: any;
  width?: string;
  marginTop?: string;
  height?: string;
  style?: any;
  color?: string;
  radius?: string;
  bgColor: string;
  theme: any;
  padding?: string;
};

const NewContainer = styled.TouchableOpacity<StyleProps>`
  align-self: center;
  padding-horizontal: 16px;
  height: ${(props: StyleProps) => props.height || '48px'};
  border-radius: ${(props: StyleProps) => props.radius || '24px'};
  background-color: ${(props: StyleProps) =>
    props.bgColor || props.theme.black};
  margin-top: ${(props: StyleProps) => props.marginTop || '10px'};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ButtonNewText = styled.Text<StyleProps>`
  color: ${(props: StyleProps) => props.color || props.theme.white};
  font-style: normal;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: 500;
`;
