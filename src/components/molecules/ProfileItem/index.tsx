import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

interface Props {
  title: string;
  desc?: string;
}

const ProfileItem = ({title, desc}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
});
