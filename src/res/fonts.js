import { Platform } from "react-native"

export default Platform.select({
  ios: {
    light: 'SF Pro Display Light',
    lightItalic: 'SF Pro Display Light Italic',
  
    regular: 'SF Pro Display Regular',
    italic: 'SF Pro Display Regular Italic',
  
    medium: 'SF Pro Display Medium',
  
    semiBold: 'SF Pro Display Semibold',
  
    bold: 'SF Pro Display Bold',
  
    contentBold: 'NotoSerif-Bold',
  
    contentBoldItalic: 'NotoSerif-BoldItalic',
  
    contentItalic: 'NotoSerif-Italic',
  
    contentRegular: 'NotoSerif-Regular',
  },
  android: {
    light: 'SF-Pro-Display-Light',
    lightItalic: 'SF-Pro-Display-LightItalic',

    regular: 'SF-Pro-Display-Regular',
    italic: 'SF-Pro-Display-RegularItalic',

    medium: 'SF-Pro-Display-Medium',

    semiBold: 'SF-Pro-Display-Semibold',

    bold: 'SF-Pro-Display-Bold',

    contentBold: 'NotoSerif-Bold',

    contentBoldItalic: 'NotoSerif-BoldItalic',

    contentItalic: 'NotoSerif-Italic',

    contentRegular: 'NotoSerif-Regular',
  }
});
