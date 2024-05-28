import {Text, TextStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

type TextAlign = 'left' | 'auto' | 'right' | 'center' | 'justify';

interface Props {
  title: string;
  fontSize: number;
  align?: TextAlign;
  onPress?: () => void;
}

const Link = ({title, fontSize, align, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(fontSize, align)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = {
  text: (fontSize: number, align: TextAlign = 'left'): TextStyle => ({
    fontSize: fontSize,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    textAlign: align,
  }),
};
