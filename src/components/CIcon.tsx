import React from 'react';
import { ImageSourcePropType, ViewProps } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

type Props = {
  source: Source | number;
  style?: ViewProps['style'];
  size?: number;
  name?: string;
  color?: string;
  tintColor?: string;
};

const Icon = (props: Props & ImageSourcePropType) => {
  const { size = 24, style, source, tintColor } = props || {};
  // if (name) {
  //   return <Icons name={name} size={size} color={color} />;
  // }
  return (
    <FastImage
      tintColor={tintColor}
      source={source}
      resizeMode="contain"
      style={[{ width: size, height: size }, style]}
    />
  );
};

export default Icon;
