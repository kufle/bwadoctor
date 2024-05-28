import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconRemovePhoto, ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

interface Props {
  name?: string;
  desc?: string;
  isIcon?: boolean;
}

const Profile = ({name, desc, isIcon = false}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.borderProfile}>
        <Image source={ILNullPhoto} style={styles.avatar} />
        {isIcon && <IconRemovePhoto style={styles.icon} />}
      </View>
      {name && <Text style={styles.name}>{name}</Text>}
      {desc && <Text style={styles.desc}>{desc}</Text>}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
  },
  desc: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
  },
  icon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
