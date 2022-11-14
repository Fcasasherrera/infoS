import styled from 'styled-components/native';
import {SIZES, themeLight} from '../constants/colors';
/*
 *  Component for all text in app
 */

export type ContainerProps = {
  onPress?: any;
  fdirection?: 'row' | 'column';
  align?: string;
  justify?: string;
  theme: any;
  height?: string;
  center?: string;
  bottom?: string;
  top?: string;
  display?: string;
};

export const Row = styled.View<ContainerProps>`
    flex-direction: ${(props: ContainerProps) =>
      props.fdirection === 'row' ? 'row' : 'column'}
    align-items: ${(props: ContainerProps) =>
      props.align ? props.align : 'center'};
    justify-content: ${(props: ContainerProps) =>
      props.justify ? props.justify : 'center'};
`;
export const CustomView = styled.View<ContainerProps>`
  width: 100%;
  align-self: ${(props: ContainerProps) =>
    props.center ? props.center : 'center'};
  ${(props: ContainerProps) =>
    props.bottom ? `bottom: ${props.bottom}px` : ''}
  ${(props: ContainerProps) => (props.top ? `top: ${props.top}px` : '')}
`;

type StyleProps = {
  width?: string;
  height?: string;
};

export const CustomImage = styled.Image<StyleProps>`
  width: ${(props: StyleProps) => props.width || '200px'};
  height: ${(props: StyleProps) => props.height || '167px'};
`;
export const CustomCardNews = styled.TouchableOpacity<ContainerProps>`
  margin-top: 16px;
  padding-horizontal: ${SIZES.base * 2}px;
  width: ${SIZES.width}px;
`;
export const CardContainer = styled.TouchableOpacity<ContainerProps>`
  flex: 0.5;
  padding: 8px;
  padding-horizontal: ${SIZES.base * 2}px;
`;

export const CustomCardNotification = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${(props: ContainerProps) => props.theme.inputBor};
  margin-bottom: 12px;
  padding-bottom: 12px;
`;

export const Hr = styled.View<ContainerProps>`
  width: ${SIZES.width}px;
  height: 1px;
  background-color: ${(props: ContainerProps) => props.theme.inputBor};
`;
export const CustomTouchable = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  align-self: ${(props: ContainerProps) =>
    props.center ? props.center : 'center'};
  ${(props: ContainerProps) =>
    props.bottom ? `bottom: ${props.bottom}px` : ''}
  ${(props: ContainerProps) => (props.top ? `top: ${props.top}px` : '')}
`;

export const TrustedContactsContainer = styled.View<StyleProps>`
  width: 100%;
  height: auto;
  padding: 24px 16px;
  background-color: ${themeLight.inputBG};
  border-radius: 16px;
`;

export const TrustedContactsCard = styled.TouchableOpacity<StyleProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 7px 16px;
  margin-top: 16px;
  background-color: transparent;
  border-radius: 8px;
  border-color: ${themeLight.inputText};
  border-width: 1px;
`;
