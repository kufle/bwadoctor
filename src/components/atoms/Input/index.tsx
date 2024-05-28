import {Text, TextInput, TextStyle, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

interface Props {
  label?: string;
  value?: string;
  onChangeText?: (e: any) => void;
  secureTextEntry?: boolean;
}

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };

  const onBlurForm = () => {
    setBorder(colors.border);
  };

  return (
    <View>
      <Text style={styles.label()}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = {
  input: (border: any): TextStyle => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: border,
    padding: 12,
  }),
  label: (): TextStyle => ({
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[600],
  }),
};
