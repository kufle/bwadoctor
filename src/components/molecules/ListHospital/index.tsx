import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

interface Props {
  type: string;
  name: string;
  address: string;
  picture: ImageSourcePropType;
}
const ListHospital = ({type, name, address, picture}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={picture} style={styles.image} />
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.desc}>{address}</Text>
      </View>
    </View>
  );
};

export default ListHospital;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 16,
  },
  image: {
    width: 80,
    height: 60,
    marginRight: 16,
    borderRadius: 11,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
