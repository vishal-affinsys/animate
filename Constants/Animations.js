import React from 'react';
import {Animated, View} from 'react-native';

export const CustomAnimation = ({children}) => {
  return <Animated.View>{children}</Animated.View>;
};
