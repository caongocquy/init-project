import React from 'react';
import { TextInput, TextInputProps, Platform, ViewProps } from 'react-native';
import R from '../res/R';
import { Pixel } from '../utils';

type SizeType = 'tiny' | 'small' | 'medium' | 'large' | number;
type FontType = 'black' | 'bold' | 'semiBold' | 'medium' | 'regular' | 'light';
type LineHeightType = 'small' | 'medium' | 'large';

export type Props = {
  placeholderSize?: number;
  type?: FontType;
  size?: SizeType;
  color?: string;
  style?: ViewProps['style'];
  children?: any;
  lineHeight?: LineHeightType;
} & TextInputProps;

const FontSize = {
  tiny: Platform.OS === 'ios' ? Pixel.pixelPerfect(13) : Pixel.pixelPerfect(12),
  small:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(15) : Pixel.pixelPerfect(14),
  medium:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(17) : Pixel.pixelPerfect(16),
  large:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(19) : Pixel.pixelPerfect(18),
  'x-large':
    Platform.OS === 'ios' ? Pixel.pixelPerfect(23) : Pixel.pixelPerfect(22),
  'xx-large':
    Platform.OS === 'ios' ? Pixel.pixelPerfect(33) : Pixel.pixelPerfect(32),
};

function getConfigsFonts(
  type: FontType,
  size: SizeType,
  lineHeightP: LineHeightType,
) {
  const lineHeight = (function () {
    switch (lineHeightP) {
      case 'small':
        return typeof size === 'number' ? size : FontSize[size];
      case 'medium':
        return typeof size === 'number' ? size * 1.2 : FontSize[size] * 1.2;
      default:
        return typeof size === 'number' ? size * 1.5 : FontSize[size] * 1.5;
    }
  })();

  const fontConfigs = {
    fontFamily: R.fonts.regular,
    fontSize:
      (typeof size === 'number' ? size : FontSize[size]) ||
      Pixel.pixelPerfect(14),
    lineHeight,
  };
  switch (type) {
    case 'italic':
      fontConfigs.fontFamily = R.fonts.italic;
      break;
    case 'bold':
      fontConfigs.fontFamily = R.fonts.bold;
      break;
    case 'semiBold':
      fontConfigs.fontFamily = R.fonts.semiBold;
      break;
    case 'medium':
      fontConfigs.fontFamily = R.fonts.medium;
      break;
    case 'light':
      fontConfigs.fontFamily = R.fonts.light;
      break;
    case 'lightItalic':
      fontConfigs.fontFamily = R.fonts.lightItalic;
      break;
    case 'contentBold':
      fontConfigs.fontFamily = R.fonts.contentBold;
      break;
    case 'contentBoldItalic':
      fontConfigs.fontFamily = R.fonts.contentBoldItalic;
      break;
    case 'contentItalic':
      fontConfigs.fontFamily = R.fonts.contentItalic;
      break;
    case 'contentRegular':
      fontConfigs.fontFamily = R.fonts.contentRegular;
      break;
    default:
      fontConfigs.fontFamily = R.fonts.regular;
      break;
  }
  return fontConfigs;
}

function EDTextInput(props: Props, ref: React.Ref<TextInput>) {
  const {
    value,
    multiline = false,
    placeholderTextColor = R.colors.darkBlue32,
    placeholderSize,

    type = 'regular',
    size = 'medium',
    color = R.colors.darkText,
    style,
    lineHeight = 'medium',

    ...anyProps
  } = props;

  // Cannot switch back condition fontFamily on Android.
  // ISSUE: "https://github.com/facebook/react-native/issues/27585"
  // ISSUE: "https://github.com/facebook/react-native/issues/18820"
  //           => 👉 workaround add {fontWeight: 'normal'} to textInputStyle
  const androidStyle = Platform.OS === 'android' ? { fontWeight: 'normal' } : {};

  const { lineHeight: lineHeightP, fontSize } = getConfigsFonts(
    type,
    size,
    lineHeight,
  );
  let fixHeightAndroid = {};
  // Problem with TextInput lineHeight on iOS
  // https://github.com/facebook/react-native/issues/28012
  let fixLineHeightIOS: Object = { lineHeight: lineHeightP };

  if (!multiline) {
    if (Platform.OS === 'android') {
      fixHeightAndroid = { height: lineHeightP };
    } else {
      fixLineHeightIOS = {};
    }
  }

  let placeholderStyles: any;
  if (placeholderSize) {
    placeholderStyles = {
      ...placeholderStyles,
      fontSize,
    };
  }

  return (
    <TextInput
      value={value}
      autoCorrect={false}
      autoCapitalize="none"
      multiline={multiline}
      textAlignVertical="top"
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      placeholderTextColor={placeholderTextColor}
      {...anyProps}
      ref={ref}
      style={[
        {
          color,
          padding: 0,
          margin: 0,
          ...getConfigsFonts(type, size, lineHeight),
        },
        androidStyle,
        fixLineHeightIOS,
        placeholderStyles && String(value || '').length === 0
          ? placeholderStyles
          : null,
        fixHeightAndroid,
        style,
      ]}
    />
  );
}

export default React.forwardRef(EDTextInput);
