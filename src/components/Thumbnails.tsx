import React from 'react';
import styled from 'styled-components/native';
import {SIZES, statusColor} from '../constants/colors';

type StyleProps = {
  margin?: string;
  outline: boolean;
  width?: string;
  height?: string;
  theme: any;
};
const BaseThumbnailStyles = `
  width: 40px;
  height: 40px; 
  min-height: 40px;
  min-width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px; 
  max-height: 40px;
`;

// const RedDot = styled.View`
//   ${RedDotStyles}
// `;
export const ProfileContainer = styled.TouchableOpacity`
  width: 144px;
  height: 144px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${(props: StyleProps) => props.theme.white};
  border-radius: 250px;
  padding: 6px;
`;

export const ProfileSmall = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 250px;
`;
export const ProfilePadding = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${(props: StyleProps) => props.theme.primaryProfile};
  background-color: ${(props: StyleProps) => props.theme.white};
  border-radius: 250px;
  padding: 6px;
`;
export const ProfileImage = styled.Image<StyleProps>`
  border-radius: 250px;
  background-color: ${(props: StyleProps) => props.theme.white};
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  height: ${(props: StyleProps) => (props.height ? props.height : '100%')};
  resize-mode: contain;
`;
