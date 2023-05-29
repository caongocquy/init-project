import React from 'react';
import { StyleSheet, TouchableOpacity, ViewProps, View } from 'react-native';

import CTouchable from './CTouchable';
import CText from './CText';
import CIcon from './CIcon';
import SpaceDevider from './SpaceDevider';
import R from '../res/R';
import metrics from '../config/metrics';

// type for props
type Props = {
  title?: string;
  titleRight?: string;
  style?: ViewProps['style'];
  containerStyle?: ViewProps['style'];
  value?: string;
  placeholder?: string;
  isWarning?: boolean;
  warningText?: string;
  renderLeft?: () => React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

const HEIGHT = 32;

export default function ({
  title,
  titleRight,
  value,
  style,
  warningText,
  placeholder,
  containerStyle,
  disabled = false,
  onPress,
  renderLeft,
}: Props) {

  // title of butotn
  const renderTitle = () => {
    if (!title && !titleRight) return null;
    return (
      <View style={styles.title}>
        {/* title left */}
        {title ? (
          <CText size="tiny" color={R.colors.D05} lineHeight="small">
            {title}
          </CText>
        ) : null}
        {/* title right */}
        {titleRight ? (
          <CText size="tiny" color={R.colors.D05} lineHeight="small">
            {titleRight}
          </CText>
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderTitle()}
      <TouchableOpacity disabled={disabled} activeOpacity={0.8} style={styles.wrapInput} onPress={() => onPress?.()}>
        <View style={[styles.inputContainer, warningText ? styles.warning : {}, style]}>
          {renderLeft?.()}
          <View style={styles.input}>
            <CText size="small" type={value ? 'semiBold' : 'regular'} color={value ? R.colors.D05 : R.colors.D02}>
              {value || placeholder}
            </CText>
          </View>
          <View style={styles.buttonEye}>
            <CIcon source={R.images.iconDown()} size={16} tintColor={'#222222'} />
          </View>
        </View>
      </TouchableOpacity>
      {/* error text */}
      {/* {warningText ? (
        <View style={styles.warningContainer}>
          <CIcon source={imageResources.iconWarning} size={12} tintColor={R.colors.R04} />
          <CText size="tiny" color={R.colors.R04} style={styles.textWarning}>
            {warningText}
          </CText>
        </View>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonEye: {
    height: HEIGHT,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    paddingLeft: 12,
    backgroundColor: R.colors.white,
  },
  wrapInput: {
    width: '100%',
  },
  warningContainer: {
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {},
  input: {
    flex: 1,
    height: HEIGHT,
    justifyContent: 'center',
  },
  textWarning: {
    alignSelf: 'center',
    marginLeft: 4,
  },
  warning: {
    borderColor: R.colors.R04,
  },
});