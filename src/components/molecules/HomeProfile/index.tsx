import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts, getData} from '../../../utils';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  onPress?: () => void;
}
const HomeProfile: React.FC<Props> = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        const data = res;
        data.photo = res.photo ? {uri: data.photo} : null;
        setProfile(data);
      });
    }
  }, [isFocused]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={profile.photo ? profile.photo : ILNullPhoto}
        style={styles.avatar}
        defaultSource={ILNullPhoto}
      />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
