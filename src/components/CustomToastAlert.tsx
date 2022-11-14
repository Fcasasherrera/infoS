import React from 'react';
import  { BaseToast, ErrorToast } from 'react-native-toast-message';
import styled from 'styled-components';
import { FONTS, SIZES, themeLight } from '../constants/colors';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `docsToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  docsToast: ({ text1, props }) => (
    <ToastContainer>
      <ToastText>{text1}</ToastText>
    </ToastContainer>
  )
};

export const ToastContainer = styled.View`
  width: ${SIZES.width}px;
  height: 32px;
  background-color: ${themeLight.errorBg};
  justify-content: center;

`;
export const ToastText = styled.Text`
  ${FONTS.h5}
  text-align: center;
  color: #A80D0D;
`;

// Example: 

/* const showToast = () => {
    Toast.show({
      type: 'docsToast',
      text1: 'This is an info message'
    });
  } */

//     <Toast config={toastConfig}  position='top' topOffset={0} />

 // https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md