import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILHospitalBG} from '../../../assets';
import {colors, fonts} from '../../../utils';

interface Props {
  title: string;
  date: string;
  image: string;
}

const NewstItem = ({title, date, image}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image
        source={image ? {uri: image} : ILHospitalBG}
        style={styles.image}
      />
    </View>
  );
};

export default NewstItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
