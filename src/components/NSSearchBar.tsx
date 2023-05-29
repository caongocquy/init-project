import React, { useState } from 'react';
import { View, TextInput, TextInputProps, Platform, ViewProps, StyleSheet } from 'react-native';
import { CIcon, CTouchable } from '.';
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
  leftIcon: any;
  leftIconStyle: ViewProps['style'];
  onClear?: any;
} & TextInputProps;

function NSSearchBar(props: Props, ref: React.Ref<TextInput>) {
  const {
    value,
    multiline = false,
    placeholderTextColor = R.colors.darkBlue64,
    placeholderSize,

    type = 'regular',
    size = 'medium',
    color = R.colors.darkText,
    style,
    containerStyle,
    lineHeight = 'small',

    leftIcon,
    leftIconStyle,
    onClear,
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
    <View
      style={[
        containerStyle,
        {
          height: 42,
          borderColor: isActive? R.colors.P_main: R.colors.darkBlue32,
          borderWidth: 1,
          borderRadius: R.values.borderRadius,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
      ]}>
      <TextInput
        value={value}
        autoCorrect={false}
        autoCapitalize="none"
        allowFontScaling={false}
        multiline={multiline}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        placeholderTextColor={placeholderTextColor}
        onFocus={()=> setActive(true)}
        onBlur={()=>setActive(false)}
        {...anyProps}
        ref={ref}
        selectionColor={R.colors.P_main}
        style={[
          {
            color,
            padding: 0,
            alignContent: 'center',
            paddingLeft: leftIcon? 0: R.values.padding,
            margin: 0,
            flex: 1,
            // height: 48,
            backgroundColor: R.colors.transparent,
            textAlignVertical: 'center',
            ...getConfigsFonts(type, size, 'medium'),
          },
          androidStyle,
          // fixLineHeightIOS,
          multiline? {paddingBottom: 10}:{},
          placeholderStyles && String(value || '').length === 0 ? placeholderStyles : null,
          fixHeightAndroid,
          style,
        ]}
      />
      <CTouchable
        style={styles.buttonContainer}
        onPress={onClear}
        >
        <CIcon
          source={value? R.images.icDelete : R.images.iconSearch()}
          size={16}
          tintColor={R.colors.darkBlue64}
        />
      </CTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default React.forwardRef(NSSearchBar);
