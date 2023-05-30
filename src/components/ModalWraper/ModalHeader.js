import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';

import { CText } from '../';
import CTouchable from '../CTouchable';
import { useNavigation } from '@react-navigation/native';
import R from '../../res/R';

const ModalHeader = ({ title, centerComponent, leftComponent, rightComponent }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {leftComponent ? <View style={styles.leftRightContainer}>{leftComponent}</View> : null}
      {centerComponent ? (
        <View
          style={[styles.centerContainer, leftComponent ? styles.alignCenter : styles.alignLeft]}>
          {centerComponent}
        </View>
      ) : (
        <CText
          type="medium"
          size={'large'}
          style={[styles.title, leftComponent ? styles.alignCenter : styles.alignLeft]}>
          {title}
        </CText>
      )}
      {rightComponent ? (
        <View style={styles.leftRightContainer}>{rightComponent}</View>
      ) : (
        <CTouchable style={styles.leftRightContainer} onPress={() => navigation.goBack()}>
          <Image source={R.images.iconClose()} />
        </CTouchable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: R.colors.darkBlue32,
  },

  title: {
    flex: 1,
    paddingHorizontal: R.values.padding,
  },

  centerContainer: {
    flex: 1,
    paddingHorizontal: R.values.padding,
  },

  alignCenter: {
    alignItems: 'center',
    textAlign: 'center',
  },

  alignLeft: {
    alignItems: 'flex-start',
    textAlign: 'left',
  },

  leftRightContainer: {
    alignItems: 'center',
    paddingHorizontal: R.values.paddingSmall,
  },
});

export default ModalHeader;
