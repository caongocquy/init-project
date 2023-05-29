import React, { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardStatus = () => {
  const [isShow, setIsShow] = useState(false);
  const [coordinate, setCoordinate] = useState(null);
  useEffect(() => {
    const showEvent = Platform.select({ ios: 'keyboardWillShow', android: 'keyboardDidShow' });
    Keyboard.addListener(showEvent, event => {
      setCoordinate(event.endCoordinates);
      setIsShow(true);
    });
    return () => Keyboard.removeAllListeners(showEvent);
  }, []);

  useEffect(() => {
    const hideEvent = Platform.select({ ios: 'keyboardWillHide', android: 'keyboardDidHide' });
    Keyboard.addListener(hideEvent, event => {
      setCoordinate(null);
      setIsShow(false);
    });
    return () => Keyboard.removeAllListeners(hideEvent);
  }, []);

  return { isShow, coordinate };
};

export default useKeyboardStatus;
