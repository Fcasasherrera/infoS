import {Dimensions, Platform, StyleProp, ViewStyle} from 'react-native';
const {width, height} = Dimensions.get('window');

export const statusColor = {
  green: '#5DBA9B',
  blue: '#5784C8',
  yellow: '#F4B217',
  red: '#F52D0F',
  orange: '#F5890F',
};

export const requestStatusColor = {
  pending: '#F5890F',
  pendingAccountable: '#C4D9EB',
  approved: '#5DBA9B',
  rejected: '#F52D0F',
  other: '#A76DF3',
  cancelled: '#959AA8',
};

export const gradients = ['#C4D9EB', '#F2F5FF'];
export const invertedGradients = ['#F2F5FF', '#C4D9EB'];

export const themeLight = {
  mode: 'light',
  primary: '#068DC4' /* color principal */,
  primaryLigth: '#5db9d8' /* color primario variante */,
  primarySLight:
    'rgba(569, 130, 238, 1)' /* color primario variante Super light*/,
  primarySLightD:
    'rgba(59, 130, 238, 0.16)' /* color primario variante Super light*/,
  primaryProfile: 'rgba(255, 156, 45, 0.4)',
  whiteTransparent: 'rgba(254, 254, 254, 0.6)',
  disabled: '#C4D9EB' /* desabilitado */,
  accent: '#0C659A',
  accentLight: '#238ccb' /* color secundario */,
  white: '#FEFEFE',
  blue: '#3B82EE',
  black: '#061822',
  gray: '#ebe8e8',
  blackLigth: '#c9c5c5',
  errorBor: '#F52D0F',
  errorBg: 'rgba(245, 45, 15, 0.24)',
  success: '#43a047',
  backgroundColor: '#FFFFFF',
  textColor: '#061822',
  captionColor: '#565D61',
  inputBG: '#FFF',
  inputBor: '#D8DCE6',
  inputText: '#959AA8',
  gradients: gradients,
  invertedGradients: invertedGradients,
};
export const themeDark = {
  mode: 'dark',
  primary: '#004984' /* color principal */,
  primaryLigth: '#1d75bc' /* color primario variante */,
  primarySLight:
    'rgba(59, 130, 238, 1)' /* color primario variante Super light*/,
  primarySLightD:
    'rgba(59, 130, 238, 0.16)' /* color primario variante Super light*/,
  primaryProfile: 'rgba(255, 156, 45, 0.4)',
  disabled: '#FBCCB2' /* desabilitado */,
  accent: '#ed3237',
  accentLight: '#ec4a4f' /* color secundario -Seed */,
  white: '#FEFEFE',
  blue: '#3B82EE',
  black: '#121212',
  gray: '#ebe8e8',
  blackLigth: '#c9c5c5',
  errorBor: 'rgba(168, 13, 13, 0.87)',
  errorBg: '#FFF2F2',
  success: '#43a047',
  backgroundColor: '#1c1c1e',
  textColor: '#ffffff',
  captionColor: '#ffffff',
  inputBG: '#FEFEFE',
  inputText: '#959AA8',
  gradients: gradients,
  invertedGradients: invertedGradients,
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 21},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 18},
  h6: {fontFamily: 'Poppins-Medium', fontSize: SIZES.h5, lineHeight: 18},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.body3,
    lineHeight: 24,
  },
  body4: {fontFamily: 'Poppins-Medium', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 22},
  body6: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body6, lineHeight: 16},
};
const DEVICE_WIDTH = Dimensions.get('window').width;
const stylesBottomBar =
  Platform.OS === 'android'
    ? {
        height: 50,
      }
    : {};

export const STYLE_BOTTOMBAR: StyleProp<ViewStyle> = {
  borderTopLeftRadius: 21,
  borderTopRightRadius: 21,
  backgroundColor: '#fff',
  paddingHorizontal: 6,
  ...stylesBottomBar,
  width: DEVICE_WIDTH,
  elevation: 2,
  borderTopWidth: 0.6,
  borderLeftWidth: 0.6,
  borderRightWidth: 0.6,
  borderColor: '#E2E2E2',
};

export const borderRadius = (percentage: number) =>
  `${(Dimensions.get('window').width * percentage) / 100}px`;
