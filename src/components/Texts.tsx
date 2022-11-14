import styled from 'styled-components/native';
/*
 *  Component for all text in app
 */

type TitleProps = {
  size?: 'big' | 'medium' | 'normal';
  upperCase?: boolean;
  theme: any;
};

export const Title = styled.Text<TitleProps>`
  font-family: Poppins-Regular;
  text-transform: ${(props: TextProps) =>
    props.upperCase ? 'uppercase' : 'none'};
  font-weight: ${(props: TitleProps) =>
    props.size === 'big' ? '400' : props.size === 'medium' ? '400' : '600'};
  font-size: ${(props: TitleProps) =>
    props.size === 'big' ? '34px' : props.size === 'medium' ? '24px' : '18px'};
  color: ${(props: TitleProps) => props.theme.textColor};
`;

export const Subtitle = styled(Title)<TitleProps>`
  font-family: Poppins-Regular;
  font-size: ${(props: TitleProps) =>
    props.size === 'big' ? '18px' : props.size === 'medium' ? '16px' : '14px'};
  text-transform: ${(props: TextProps) =>
    props.upperCase ? 'uppercase' : 'none'};
  color: ${(props: TitleProps) => props.theme.textColor};
  font-weight: ${(props: TitleProps) =>
    props.size === 'big' ? '400' : props.size === 'medium' ? '400' : '500'};
`;
type TextProps = {
  size?: 'big' | 'medium' | 'normal' | 'xs';
  bold?: boolean;
  center?: boolean;
  light?: boolean;
  white?: boolean;
  gray?: boolean;
  primary?: boolean;
  upperCase?: boolean;
  theme: any;
  style: any;
};
export const Text = styled.Text<TextProps>`
  font-family: Poppins-Regular;
  text-transform: ${(props: TextProps) =>
    props.upperCase ? 'uppercase' : 'none'};
  font-weight: ${(props: TextProps) => (props.bold ? '500' : 'normal')};
  color: ${(props: TextProps) =>
    props.light
      ? props.theme.blackLigth
      : props.white
      ? props.theme.white
      : props.gray
      ? props.theme.inputText
      : props.primary
      ? props.theme.primary
      : props.theme.textColor};
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'justify')};
  font-size: ${(props: TextProps) =>
    props.size === 'big'
      ? '18px'
      : props.size === 'medium'
      ? '16px'
      : props.size === 'xs'
      ? '12px'
      : '14px'};
`;
export const Caption = styled(Text)<TextProps>`
  letter-spacing: 0.064px;
  line-height: 18px;
  font-size: ${(props: TitleProps) =>
    props.size === 'big' ? '16px' : props.size === 'medium' ? '14px' : '12px'};
  color: ${(props: TitleProps) => props.theme.captionColor};
`;
