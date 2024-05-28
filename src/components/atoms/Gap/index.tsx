import {View} from 'react-native';
import React from 'react';

interface Props {
  height?: number;
  width?: number;
}

const Gap = ({height, width}: Props) => {
  return <View style={{width: width, height: height}} />;
};

export default Gap;
