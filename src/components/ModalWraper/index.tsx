import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import R from 'src/res/R';

import ModalHeader from './ModalHeader';

const Modal = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.modalContainer}
      behavior={'padding'}
      enabled={Platform.OS === 'ios'}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  container: {
    maxHeight: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: R.values.borderRadiusLarge,
    borderTopRightRadius: R.values.borderRadiusLarge,
    paddingBottom: R.values.paddingBig,
  },
});

export default Modal;
