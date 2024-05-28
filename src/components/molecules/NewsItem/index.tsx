import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILHospitalBG} from '../../../assets';
import {colors, fonts} from '../../../utils';

const NewstItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Is it safe to stay at greenland?</Text>
        <Text style={styles.date}>Today</Text>
      </View>
      <Image source={ILHospitalBG} style={styles.image} />
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
