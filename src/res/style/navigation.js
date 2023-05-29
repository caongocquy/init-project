import { Platform } from "react-native";

import DeviceInfo from "react-native-device-info/deviceinfo";

const isTablet = DeviceInfo.isTablet();

export const noNavTabbarNavigation = {
  orientation: isTablet? 'landscape':"portrait",
  navBarHidden: true,
  tabBarHidden: true,
  statusBarBlur: false,
  statusBarColor: "rgba(75,102,234,0.9)",
};

export const appSingleNavigation = {
  navBarHidden: true,
  orientation: isTablet? 'landscape':"portrait",
  //statusBarColor: '#fff',
  statusBarTextColorSchemeSingleScreen: "#000",
};

export const singleScreenNavigation = {
  orientation: isTablet? 'landscape':"portrait",
  navBarHidden: true,
  tabBarHidden: true,
  disabledBackGesture: true,
  gesturesEnabled: false,
  //statusBarColor: '#fff',
  statusBarTextColorScheme: "#000",
};
