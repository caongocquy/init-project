import React from 'react';
import { Text, ViewStyle, TextProps, Platform } from 'react-native';
import R from '../res/R';
import { Pixel } from '../utils';

export type SizeType =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
  | number;
type FontType =
  | 'bold'
  | 'semiBold'
  | 'medium'
  | 'regular'
  | 'light'
  | 'lightItalic'
  | 'italic'
  | 'contentBold'
  | 'contentBoldItalic'
  | 'contentItalic'
  | 'contentRegular';
type LineHeightType = 'small' | 'medium' | 'large';

type Props = {
  type?: FontType;
  size?: SizeType;
  color?: string;
  style?: ViewStyle;
  children?: any;
  lineHeight?: LineHeightType;
} & TextProps;

const FontSize = {
  tiny: Platform.OS === 'ios' ? Pixel.pixelPerfect(13) : Pixel.pixelPerfect(12),
  small:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(15) : Pixel.pixelPerfect(14),
  medium:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(17) : Pixel.pixelPerfect(16),
  large:
    Platform.OS === 'ios' ? Pixel.pixelPerfect(19) : Pixel.pixelPerfect(18),
  'x-large':
    Platform.OS === 'ios' ? Pixel.pixelPerfect(21) : Pixel.pixelPerfect(20),
  'xx-large':
    Platform.OS === 'ios' ? Pixel.pixelPerfect(25) : Pixel.pixelPerfect(24),
};

function getConfigsFonts(
  type: FontType,
  size: SizeType,
  lineHeightP: LineHeightType,
) {
  const lineHeight = (function () {
    switch (lineHeightP) {
      case 'small':
        return typeof size === 'number' ? size : FontSize[size] + 2;
      case 'medium':
        return typeof size === 'number' ? size * 1.3 : FontSize[size] * 1.3;
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

export { type SizeType, type FontType, type LineHeightType, FontSize, getConfigsFonts}
export default function CText(props: Props) {
  const {
    type = 'regular',
    size = 'medium',
    color = R.colors.darkText,
    style,
    children,
    lineHeight = 'small',
    ...anyProps
  } = props || {};

  return (
    <Text
      style={[
        {
          ...getConfigsFonts(type, size, lineHeight),
          color,
        },
        style,
      ]}
      allowFontScaling={false}
      {...anyProps}>
      {children}
    </Text>
  );
}
