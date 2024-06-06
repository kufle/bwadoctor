import {TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {IconSendDark, IconSendLight} from '../../../assets';
import {colors} from '../../../utils';

interface Props {
  disable?: boolean;
  onPress?: () => void;
}
const BtnIconSend = ({disable = false, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container(disable)}
      onPress={onPress}
      disabled={disable}>
      {disable && <IconSendDark />}
      {!disable && <IconSendLight />}
    </TouchableOpacity>
  );
};

export default BtnIconSend;

const styles = {
  container: (disable: boolean): ViewStyle => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
};
