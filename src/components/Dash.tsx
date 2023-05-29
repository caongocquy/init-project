import React from 'react';
import {Image, ImageSourcePropType, ViewProps, View} from 'react-native';

// type for props
type Props = {
  style?: ViewProps['style'];
  size?: number;
  color?: string;
  vertical?: boolean,
  
};

const Dash = (props: Props & ImageSourcePropType) => {
  const {size = 1, style, color = '#F1F1F1', vertical = false} = props || {};
  if (vertical) {
    return (
      <View
        style={[{height: '100%', width: size, }, style, {backgroundColor: color }]}
      />
    )
  }
  return (
    <View
      style={[{width: '100%', height: size, }, style, {backgroundColor: color }]}
    />
  );
};

export default Dash;