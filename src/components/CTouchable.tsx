import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

function CTouchable(props: TouchableOpacityProps) {
  const { children, style, ...anyProps } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={style}
      {...anyProps}
    >
      {children}
    </TouchableOpacity>
  );
}

export default CTouchable;
