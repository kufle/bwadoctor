import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';
import BtnIconSend from './BtnIconSend';

interface Props {
  type?: string;
  title?: string;
  icon?: string;
  onPress?: () => void;
  disable?: boolean;
}

const Button = ({type, title, onPress, icon, disable}: Props) => {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable || false} />;
  }

  if (type === 'icon-only') {
    return <IconOnly icon={icon || 'back-dark'} onPress={onPress} />;
  }

  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  container: (type?: string): ViewStyle => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: (type?: string): TextStyle => ({
    fontSize: 18,
    textAlign: 'center',
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
    fontFamily: fonts.primary[600],
  }),
};
