import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

type Props = {
  value: string;
  onChangeText: (e: any) => void;
  onPress: () => void;
};

const InputChat = ({value, onChangeText, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a message"
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        type="btn-icon-send"
        disable={value.length < 1}
        onPress={onPress}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
});
