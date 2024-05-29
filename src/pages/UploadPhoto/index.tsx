import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {colors, fonts} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

type RootStackParamList = {
  MainApp: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const UploadPhoto = ({navigation}: Props) => {
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    console.log('result', result);
    if (result.didCancel) {
      showMessage({
        message: 'Oops, it seems you did not select the photos',
        type: 'danger',
      });
    } else {
      const source = {uri: result.assets![0]?.uri};
      setPhoto(source);
      setHasPhoto(true);
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Upload photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={getImageFromGallery}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto ? (
              <IconRemovePhoto style={styles.avatarActionIcon} />
            ) : (
              <IconAddPhoto style={styles.avatarActionIcon} />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>Irawan</Text>
          <Text style={styles.profession}>Product manager</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            disable={!hasPhoto}
            onPress={() => navigation.replace('MainApp')}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            fontSize={16}
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarActionIcon: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
