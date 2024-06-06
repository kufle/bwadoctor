import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ILCatObat, ILCatPsikiater, ILCatUmum} from '../../../assets';
import {colors, fonts} from '../../../utils';

interface Props {
  category: string;
  onPress?: () => void;
}

interface IconProps {
  category: string;
}

const Icon = ({category}: IconProps) => {
  if (category === 'dokter umum') {
    return <ILCatUmum style={styles.illustration} />;
  }

  if (category === 'psikiater') {
    return <ILCatPsikiater style={styles.illustration} />;
  }

  if (category === 'dokter obat') {
    return <ILCatObat style={styles.illustration} />;
  }

  return <ILCatUmum style={styles.illustration} />;
};

const DoctorCategory = ({category, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon category={category} />
      <Text style={styles.label}>Saya Butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 110,
    height: 130,
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
});
