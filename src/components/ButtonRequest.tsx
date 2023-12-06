import React, {FC} from 'react';
import styled from 'styled-components/native';

type ButtonRequestProps = {
  onPress: any;
  width?: string;
  margin?: string;
  height?: string;
  style?: any;
  color?: string;
  isActive?: boolean;
  text?: string;
  children?: any;
};

export const ButtonRequest: FC<ButtonRequestProps> = ({
  children,
  onPress,
  color,
  width,
  height,
  margin,
  style,
  isActive,
}) => {
  return (
    <Container
      color={color}
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}
      style={style}
      isActive={isActive}>
      <>{children}</>
    </Container>
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
  isActive?: boolean;
};

const Container = styled.TouchableOpacity<StyleProps>`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding-horizontal: 8px;
  width: ${(props: StyleProps) => props.width || 'auto'};
  height: ${(props: StyleProps) => props.height || '37px'};
  border: ${(props: StyleProps) =>
    props.isActive ? props.theme.primary : props.theme.gray};
  border-radius: ${(props: StyleProps) => props.radius || '8px'};
  background-color: ${(props: StyleProps) =>
    props.bgColor || props.theme.white};
  margin-right: ${(props: StyleProps) => props.marginTop || '10px'};
`;

const ButtonText = styled.Text<StyleProps>`
  text-align: center;
  color: ${(props: StyleProps) => props.color || props.theme.black};
  font-size: 14px;
  font-family: 'Poppins';
  margin-left: 10px;
  font-weight: 400;
`;
