import React from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
  space?: number,
  vertical?: boolean,
  style?: ViewStyle
}

export default function({
  space = 4,
  vertical = false,
  style,
}: Props) {
  if (!vertical) return <View style={[{ width: space }, style]} />;
  return <View style={[{ height: space }, style]} />;
}
