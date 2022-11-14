import React, {FC} from 'react';
import {DotIndicator} from 'react-native-indicators';
import styled from 'styled-components/native';
import {themeLight} from '../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Row} from './Containers';

type ButtonProps = {
  outline?: boolean;
  link?: boolean;
  accent?: boolean;
  secondary?: boolean;
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
  position?: string;
  iconColor?: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  isLoading = false,
  outline,
  link,
  onPress,
  accent,
  secondary,
  width,
  disabled = false,
  margin,
  style,
  Icon = SimpleLineIcons,
  iconName,
  iconSize = 14,
  position = 'left',
  iconColor = '#000',
}) => {
  return !isLoading && !disabled ? (
    <ButtonContainer
      onPress={onPress}
      outline={outline}
      secondary={secondary}
      link={link}
      accent={accent}
      width={width}
      margin={margin}
      style={style}>
      {iconName && position === 'left' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
      <Label outline={outline} link={link}>
        {children}
      </Label>
      {iconName && position === 'right' && (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
    </ButtonContainer>
  ) : (
    <ButtonDeactivaded
      style={style}
      width={width}
      disabled={disabled}
      margin={margin}>
      {isLoading ? (
        <DotIndicator color={themeLight.white} size={10} count={3} />
      ) : (
        <Label disabled={disabled}>{children}</Label>
      )}
    </ButtonDeactivaded>
  );
};

type StyleProps = {
  margin?: string;
  width?: string;
  outline?: boolean;
  secondary?: boolean;
  link: boolean;
  accent: boolean;
  success?: boolean;
  disabled: boolean;
  theme: any;
};
const BaseButtonStyles = `
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
  max-height: 60px;
  margin-top: 5px;
`;

const ButtonContainer = styled.TouchableOpacity<StyleProps>`
  ${BaseButtonStyles}
  ${(props: StyleProps) => (props.link ? 'margin-top: 0px;' : '')}
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  background-color: ${(props: StyleProps) =>
    props.accent
      ? props.theme.accent
      : props.secondary
      ? props.theme.inputBG
      : props.outline
      ? props.theme.white
      : props.link
      ? props.theme.white
      : props.theme.primaryLigth};
  ${(props: StyleProps) => props.margin && `margin: ${props.margin}`};
`;

export const ButtonDeactivaded = styled.View<StyleProps>`
  ${BaseButtonStyles}
  height: 50px;
  background-color: ${(props: StyleProps) => props.theme.disabled};
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  ${(props: StyleProps) => props.disabled && 'max-height: 60px;'}
  ${(props: StyleProps) => props.margin && `margin: ${props.margin}`};
`;
const ButtonTabBorder = styled(Row)<StyleProps>`
  padding: 8px;
  border-radius: 35px;
  top: -18px;
  border-width: 1px;
  border-color: #e2e2e2;
  width: 60px;
  height: 60px;
`;
const ButtonTabContainer = styled.TouchableOpacity<StyleProps>`
  top: -8px;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 35px;
  padding: 0;
  margin: 0;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  shadow-offset: 1px 1px;
  elevation: 1;
  background-color: ${(props: StyleProps) =>
    props.accent
      ? props.theme.accent
      : props.secondary
      ? props.theme.inputBG
      : props.outline
      ? props.theme.white
      : props.link
      ? props.theme.white
      : props.theme.primaryLigth};
`;

export const ButtonWithIcon = styled.TouchableOpacity<StyleProps>`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 35px;
  padding: 0;
  margin: 0;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  shadow-offset: 1px 1px;
  elevation: 1;
  background-color: ${(props: StyleProps) =>
    props.success ? props.theme.success : props.theme.primaryLigth};
`;

export const Label = styled.Text<StyleProps>`
  color: ${(props: StyleProps) =>
    props.outline
      ? props.theme.primary
      : props.link
      ? props.theme.accent
      : props.disabled
      ? props.theme.inputText
      : props.theme.white};
  align-self: center;
  padding: 15px;
  font-weight: 500;
`;
type IconButtonProps = {
  outline?: boolean;
  theme: any;
  justify?: string;
  align?: string;
  rounded?: boolean;
};
export const IconButton = styled.TouchableOpacity<IconButtonProps>`
  font-family: Poppins-Regular;
  justify-content: ${(props: IconButtonProps) => props.justify || 'flex-start'};
  align-items: ${(props: IconButtonProps) => props.align || 'flex-start'};
  ${(props: IconButtonProps) =>
    props.outline
      ? `
    padding: 8px;
    border-width: 1px;
    border-radius: 150px;
  `
      : 'padding: 4px;'}
  ${(props: IconButtonProps) =>
    props.rounded
      ? `
        border-radius: 150px;
      `
      : ''}
`;
export const BadgeVacations = styled(Row)<IconButtonProps>`
  padding-horizontal: 23px;
  padding-vertical: 2px;
  border-radius: 8px;
  border-width: 1px;
  margin-top: 12px;
  border-color: ${(props: StyleProps) => props.theme.blue};
  background-color: ${(props: IconButtonProps) => props.theme.white};
`;
