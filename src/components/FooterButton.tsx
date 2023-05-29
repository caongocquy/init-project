import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  TextProps,
  ActivityIndicator,
} from 'react-native';
import { CText, CTouchable, Text } from '.';
import R from '../res/R';
type Props = {
  title?: string;
  leftTitle?: string;
  style?: ViewProps['style'];
  buttonStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  onPress: () => void;
  onLeftPress?: () => void;
  isRequesting?: boolean;
};

export default function ({
  title,
  leftTitle,
  onPress,
  onLeftPress,
  buttonStyle,
  style,
  textStyle,
  isRequesting,
}: Props) {
  return (
    <View style={[styles.footer, style]}>
      { leftTitle
        ?<CTouchable style={[styles.leftButton]} onPress={onLeftPress}>
          {isRequesting ? (
            <ActivityIndicator
              color={R.colors.white}
              size={textStyle?.fontSize ? textStyle?.fontSize : 14}
            />
          ) : (
            <CText
              color={R.colors.red}
              size={textStyle?.fontSize ? textStyle?.fontSize : 'medium'}
              style={[textStyle]}>
              {leftTitle}
            </CText>
          )}
        </CTouchable>
        :null
      }
      <CTouchable style={[styles.buttonFooter, buttonStyle]} onPress={onPress}>
        {isRequesting ? (
          <ActivityIndicator
            color={R.colors.white}
            size={textStyle?.fontSize ? textStyle?.fontSize : 14}
          />
        ) : (
          <CText
            color={textStyle?.color ? textStyle?.color : R.colors.white}
            size={textStyle?.fontSize ? textStyle?.fontSize : 'medium'}
            style={[textStyle]}>
            {title || 'Xác nhận'}
          </CText>
        )}
      </CTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#fff8",
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  buttonFooter: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.P_main,
    borderRadius: R.values.borderRadiusLarge,
  },
  leftButton: {
    width: 80,
    height: 44,
    marginRight: R.values.paddingSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    borderWidth: 1,
    borderColor: R.colors.red,
    borderRadius: R.values.borderRadiusLarge,
  },
});
