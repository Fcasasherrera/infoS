import React, {useState, useEffect, FC} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  flexOptional?: string;
  show?: boolean;
  fluid?: boolean;
  isScroll?: boolean;
  style?: any;
  contentContainerStyle?: any;
  direction?: 'row' | 'column';
  align?: string;
  justify?: string;
  children: any;
};
export const FadeInView: FC<Props> = ({
  flexOptional = '1',
  show = true,
  style,
  contentContainerStyle,
  fluid = false,
  children,
  isScroll = false,
  direction,
  align,
  justify,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    if (show === true) {
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 900,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  return show && !isScroll ? (
    <AnimatedFade
      flexOptional={flexOptional}
      fluid={fluid}
      direction={direction}
      align={align}
      justify={justify}
      style={{
        ...style,
        opacity: fadeAnim,
      }}>
      {children}
    </AnimatedFade>
  ) : (
    <Animated.ScrollView
      style={{
        opacity: fadeAnim,
        backgroundColor: 'white',
        ...style,
      }}
      contentContainerStyle={{...contentContainerStyle}}>
      {children}
    </Animated.ScrollView>
  );
};
type ContainerProps = {
  flexOptional?: string;
  direction?: 'row' | 'column';
  fluid?: boolean;
  align?: string;
  justify?: string;
  theme: any;
};

const AnimatedFade = styled(Animated.View).attrs((props: {theme: any}) => ({
  style: {backgroundColor: props.theme.backgroundColor},
}))<ContainerProps>`
  background-color: ${(props: ContainerProps) => props.theme.backgroundColor};
  ${(props: ContainerProps) =>
    props.flexOptional === 'auto' ? '' : `flex: ${props.flexOptional};`}
  flex-direction: ${(props: ContainerProps) =>
    props.direction === 'row' ? 'row' : 'column'}
  align-items: ${(props: ContainerProps) =>
    props.align ? props.align : 'center'};
  justify-content: ${(props: ContainerProps) =>
    props.justify ? props.justify : 'space-between'};
  padding-horizontal: ${(props: ContainerProps) =>
    props.fluid ? '0px' : '18px'};
`;
const stylesScroll = {
  alignItems: 'center',
  justifyContent: 'center',
};
