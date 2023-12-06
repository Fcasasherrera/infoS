import React, {FC} from 'react';
import {DotIndicator} from 'react-native-indicators';
import styled from 'styled-components/native';
import {themeLight} from '../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Label} from './Button';

type ButtonProps = {
  outline?: boolean;
  link?: boolean;
  accent?: boolean;
  disabled?: boolean;
  onPress: any;
  width?: string;
  margin?: string;
  isLoading?: boolean;
  style?: any;
  children?: any;
  Icon?: any;
  iconName?: string;
  iconSize?: string | number;
  customIcon?: any;
};

export const ButtonSmall: FC<ButtonProps> = ({
  children,
  isLoading = false,
  outline,
  link,
  onPress,
  accent,
  width,
  disabled = false,
  margin,
  style,
  Icon = SimpleLineIcons,
  iconName,
  iconSize = 14,
  customIcon,
}) => {
  return !isLoading && !disabled ? (
    <ButtonContainer
      onPress={onPress}
      outline={outline}
      link={link}
      accent={accent}
      width={width}
      margin={margin}
      style={style}>
      {iconName && (
        <Icon
          style={{paddingLeft: 8}}
          name={iconName}
          size={iconSize}
          color="white"
        />
      )}
      {customIcon && customIcon}
      <LabelSmall outline={outline} link={link}>
        {children}
      </LabelSmall>
    </ButtonContainer>
  ) : (
    <ButtonSmallDeactivaded
      style={style}
      width={width}
      disabled={disabled}
      margin={margin}>
      {isLoading ? (
        <DotIndicator color={themeLight.white} size={10} count={3} />
      ) : (
        <>
          <Icon
            style={{paddingLeft: 8}}
            name={iconName}
            size={iconSize}
            color="white"
          />
          <LabelSmall disabled={disabled}>{children}</LabelSmall>
        </>
      )}
    </ButtonSmallDeactivaded>
  );
};

type StyleProps = {
  margin?: string;
  width?: string;
  outline: boolean;
  link: boolean;
  accent: boolean;
  disabled: boolean;
  theme: any;
};
const BaseButtonStyles = `
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  max-height: 40px;
  margin-top: 5px;
`;

const ButtonContainer = styled.TouchableOpacity<StyleProps>`
  ${BaseButtonStyles}
  ${(props: StyleProps) => (props.link ? 'margin-top: 0px;' : '')}
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  background-color: ${(props: StyleProps) =>
    props.accent
      ? props.theme.accent
      : props.outline
      ? props.theme.white
      : props.link
      ? props.theme.white
      : props.theme.primarySLight};
  ${(props: StyleProps) => props.margin && `margin: ${props.margin}`};
`;
export const ButtonSmallDeactivaded = styled.View<StyleProps>`
  ${BaseButtonStyles}
  background-color: ${(props: StyleProps) => props.theme.primarySLightD};
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  ${(props: StyleProps) => props.disabled && 'max-height: 60px;'}
  ${(props: StyleProps) => props.margin && `margin: ${props.margin}`};
`;

const LabelSmall = styled(Label)<StyleProps>`
  padding: 8px;
  color: white;
`;
