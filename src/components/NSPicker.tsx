import React, { useState } from 'react';
import { TextInput, TextInputProps, Platform, ViewProps } from 'react-native';
import { CIcon, CText, CTouchable } from '.';
import R from '../res/R';

import { LineHeightType, FontType, SizeType, getConfigsFonts } from './CText';

export type Props = {
  placeholderSize?: number;
  type?: FontType;
  size?: SizeType;
  color?: string;
  style?: ViewProps['style'];
  containerStyle?: ViewProps['style'];
  children?: any;
  lineHeight?: LineHeightType;
  placeholderTextColor?: string;
  onPress?: any;
} & TextInputProps;

function NSPicker(props: Props, ref: React.Ref<TextInput>) {
  const {
    value,
    placeholder,
    multiline = false,
    placeholderTextColor = R.colors.darkBlue64,
    placeholderSize,
    type = 'regular',
    size = 'medium',
    color = R.colors.darkText,
    style,
    containerStyle,
    lineHeight = 'small',
    onPress,


    ...anyProps
  } = props;

  const [isActive, setActive] = useState(false);
  // Cannot switch back condition fontFamily on Android.
  // ISSUE: "https://github.com/facebook/react-native/issues/27585"
  // ISSUE: "https://github.com/facebook/react-native/issues/18820"
  //           => 👉 workaround add {fontWeight: 'normal'} to textInputStyle
  const androidStyle = Platform.OS === 'android' ? { fontWeight: 'normal' } : {};

  const { lineHeight: lineHeightP, fontSize } = getConfigsFonts(type, size, lineHeight);
  let fixHeightAndroid = {};
  // Problem with TextInput lineHeight on iOS
  // https://github.com/facebook/react-native/issues/28012
  let fixLineHeightIOS: Object = { lineHeight: 48 };

  if (!multiline) {
    if (Platform.OS === 'android') {
      fixHeightAndroid = { height: 48 };
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
    <CTouchable
      style={[
        containerStyle,
        {
          height: 48,
          borderColor: isActive? R.colors.P_main: R.colors.darkBlue32,
          borderWidth: 1,
          borderRadius: R.values.borderRadius,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: R.values.padding
        },
      ]}
      onPress={onPress}
      >
      <CText
        // {...anyProps}
        style={[
          {
            alignContent: 'center',
            flex: 1,
            textAlignVertical: 'center',
          },
          fixLineHeightIOS,
          placeholderStyles && String(value || '').length === 0 ? placeholderStyles : null,
          fixHeightAndroid,
          style,
        ]}
        color={(value && value.length > 0)? R.colors.darkText: R.colors.darkBlue64}
        type={(value && value.length > 0)? 'medium': 'regular'}
      >{(value && value.length > 0) ? value: placeholder}</CText>
      <CIcon source={R.images.iconDown()} size={16}/>
    </CTouchable>
  );
}

export default React.forwardRef(NSPicker);
