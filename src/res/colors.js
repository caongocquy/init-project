export default {
  mainLight: '#17733a',
  mainDark: '#262262',
  mainGrayBG: '#EEEEEE',
  inactiveGrey: '#72849A',
  inactiveRed: '#FF545A',
  popUpMessage: '#0E1236',
  darkBlue: '#282169',
  darkBlue64: '#676B79',
  darkBlue32: '#B3B5BC',
  darkBlue16: '#D9DADE',
  darkBlue08: '#ECECEE',
  darkBlue04: '#F6F6F7',
  darkBlue800: '#343751',
  lightGreen: '#00b937',
  overlayBackground: '#00000080',
  red: '#FF3551',
  error: '#FF3551',
  blue: '#3b7cec',
  yellow: '#F9660C',
  darkText: '#12172E',

  black: alpha => {
    return `#333333${parseInt(alpha * 255)
      .toString(16)
      .replace('0x', '')}`;
  },
  // grayLight: '#e6e6e6',
  grayLight: alpha => {
    return `#e6e6e6${parseInt(alpha * 255)
      .toString(16)
      .replace('0x', '')}`;
  },
  // gray: '#808080',
  gray: alpha => {
    return `#808080${parseInt(alpha * 255)
      .toString(16)
      .replace('0x', '')}`;
  },
  // grayDark: '#5f5f5f',
  grayDark: alpha => {
    return `#5f5f5f${parseInt(alpha * 255)
      .toString(16)
      .replace('0x', '')}`;
  },
  P_main: '#23BBC8',

  S_dark: '#000D19',
  S_main: '#f9660c',
  S_light: '#2E96FF',

  light: '#E5E7EB',
  light02: '#FAFBFC',
  light05: '#E5E7EB',
  lightGray: '#C9CED9',
  xLightGray: '#e5e7eb',
  xxxLightGray: '#F2F3F5',
  dark: '#232e43',
  darkGray: '#565f71',
  dark05: '#001133',
  background: '#FDFDFD',

  D05: '#001133',
  D04: '#232E43',
  D03: '#565F71',
  D02: '#8D95A5',
  D01: '#C9CED9',

  L05: '#E5E7EB',
  L04: '#EBECF0',
  L03: '#F2F3F5',
  L02: '#FAFBFC',

  B04: '#0073F7',
  B05: '#005CC4',
  B02: '#9DC8F9',
  B01: '#E5F1FF',

  R04: '#F70000',
  R01: '#FFE5E5',

  G01: '#E5FFF4',
  G04: '#06C170',
  G05: '#05A862',

  Y04: '#FFCC00',
  Y05: '#E5B800',

  O05: '#E57A00',
  O04: '#FF8800',
  O01: '#FFF8E6',

  P05: '#4D0099',
  P04: '#6600CC',
  P01: '#FFE6FF',

  GL05: '#D48806',
  GL04: '#FAAD14',
  GL03: '#FFC53D',
  GL02: '#FFD666',
  GL01: '#FFF1B8',

  white: '#FFFFFF',
  white07: 'rgba(255,255,255,0.7)',
  white05: 'rgba(255,255,255,0.5)',
  white03: 'rgba(255,255,255,0.3)',
  white02: 'rgba(255,255,255,0.2)',

  black05: 'rgba(0,0,0,0.5)',

  overlay07: 'rgba(0,0,0,0.7)',
  overlay05: 'rgba(0,0,0,0.5)',
  overlay03: 'rgba(0,0,0,0.3)',
  overlay02: 'rgba(0,0,0,0.2)',
  transparent: 'transparent',
};
