import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';

type dimensionsType = { width: number; height: number };
const dimensionsWindow: dimensionsType = Dimensions.get('window');
const dimensionsScreen: dimensionsType = Dimensions.get('screen');

const dimensionsWidth = dimensionsWindow.width;
const dimensionsHeight = Platform.select({
  ios: dimensionsWindow.height,
  default:
    dimensionsWindow.height !== dimensionsScreen.height && (StatusBar.currentHeight || 0) > 24
      ? dimensionsScreen.height - (StatusBar.currentHeight || 0)
      : dimensionsWindow.height,
});

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (dimensionsWindow.height === 812 ||
    dimensionsWindow.width === 812 || // iPhone X, XS, 11_Pro, 12_Mini
    dimensionsWindow.height === 844 ||
    dimensionsWindow.width === 844 || // iPhone 12, 12_Pro,
    dimensionsWindow.height === 896 ||
    dimensionsWindow.width === 896 || // iPhone XR, XS_Max, 11, 11_Pro_Max
    dimensionsWindow.height === 926 ||
    dimensionsWindow.width === 926); // iPhone 12_Pro_Max

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const isPortrait = dimensionsWidth < dimensionsHeight;
const androidApiLevel = isAndroid ? Platform.Version : 0;
const isAndroidKitKat = isAndroid && Platform.Version <= 20;

const statusBarHeight = Platform.select({ ios: isIphoneX ? 44 : 20, android: StatusBar.currentHeight, default: 0 }); // iphoneX safe is 44, unsafe is 30, regularIphone is 20
const statusBarHeightIOS = Platform.select({ ios: statusBarHeight, android: 0, default: 0 });
const statusBarHeightAndroid = Platform.select({ ios: 0, android: statusBarHeight, default: 0 });
const iphoneXBottomSpace = isIphoneX ? 34 : 0;
const iPhoneXIndicatorLine = isIphoneX ? 14 : 0;

const headerBarHeight = Platform.select({ ios: 44, android: 56, default: 64 }); // node_modules/react-navigation-stack/src/views/Header/Header.tsx#48

const width = isPortrait ? dimensionsWidth : dimensionsHeight;
const height = isPortrait ? dimensionsHeight : dimensionsWidth;
const screenWidth = Math.floor(width * 10) / 10;
const screenHeight = Math.floor(height * 10) / 10;

const isSmallScreen = screenWidth <= 320;
const isLargeScreen = screenWidth >= 600;
const limitScreenWidth = 560;

const marginBottomSpace = (space: number) => {
  if (isIphoneX) return space > iphoneXBottomSpace ? space : iphoneXBottomSpace;
  return space;
};

const headerWithStatusBarHeightIOS = headerBarHeight + statusBarHeightIOS;
const screenHeightWithoutHeader = screenHeight - headerWithStatusBarHeightIOS;
const lineHalf = StyleSheet.hairlineWidth;
const line = lineHalf * 2;
const xbLine = lineHalf * 10;

export default {
  isIOS,
  isAndroid,
  isIphoneX,
  isPortrait,
  androidApiLevel,
  isAndroidKitKat,
  // device
  screenWidth,
  screenHeight,
  isSmallScreen,
  isLargeScreen,
  limitScreenWidth,
  statusBarHeight,
  statusBarHeightIOS,
  statusBarHeightAndroid,
  iphoneXBottomSpace,
  iPhoneXIndicatorLine,
  marginBottomSpace,
  headerBarHeight,
  headerWithStatusBarHeightIOS,
  screenHeightWithoutHeader,
  //
  xbLine,
  line,
  lineHalf,
  borderRadius: 8, // 7 not work on some android devices

  // icon
  tinyIcon: 4,
  smallIcon: 8,
  smediumIcon: 12,
  mediumIcon: 16,
  largeIcon: 24,
  extraLargeIcon: 32,

  icon20: 20,
  icon48: 48,
  icon56: 56,
  icon64: 64,
};
