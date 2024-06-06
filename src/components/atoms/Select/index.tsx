import {Text, TextStyle, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Picker} from '@react-native-picker/picker';

interface Props {
  label?: string;
  selectItem?: any;
  value?: any;
  onValueChange?: (e: any) => void;
  secureTextEntry?: boolean;
  canEdit?: boolean;
}

const Select = ({label, selectItem, value, onValueChange}: Props) => {
  return (
    <View>
      <Text style={styles.label()}>{label}</Text>
      <View style={styles.select()}>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          <Picker.Item label="Please Select" />
          {selectItem.map((item: any) => (
            <Picker.Item key={item.id} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = {
  select: (): TextStyle => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
  }),
  label: (): TextStyle => ({
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[600],
  }),
};
