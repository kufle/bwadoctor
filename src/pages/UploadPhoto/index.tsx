import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {RouteProp} from '@react-navigation/native';
import {Button, Gap, Header, Link, Loading} from '../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {colors, fonts, storeData} from '../../utils';
import {UserType} from '../../types';
import {ref, update} from 'firebase/database';
import {fireDB} from '../../config';

type RootStackParamList = {
  MainApp: undefined;
  UploadPhoto: UserType;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'UploadPhoto'>;
}

const UploadPhoto = ({navigation, route}: Props) => {
  const {fullName, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoBase64, setPhotoBase64] = useState('');
  const [loading, setLoading] = useState(false);

  const getImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
      maxWidth: 200,
      maxHeight: 200,
    });

    //console.log('result', result);
    if (result.didCancel) {
      showMessage({
        message: 'Oops, it seems you did not select the photos',
        type: 'danger',
      });
    } else {
      const source = {uri: result.assets![0]?.uri};
      setPhoto(source);
      setHasPhoto(true);
      const base64Photo = `data:${result.assets![0].type};base64, ${
        result.assets![0]?.base64
      }`;
      setPhotoBase64(base64Photo);
    }
  };

  const handleUploadAndContinue = () => {
    setLoading(true);
    update(ref(fireDB, `users/${uid}`), {photo: photoBase64})
      .then(() => {
        // Set image base64 to localStorage
        const data = {...route.params};
        data.photo = photoBase64;
        storeData('user', data);
        //Set loading and redirect to mainapp
        setLoading(false);
        navigation.replace('MainApp');
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <>
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
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.profession}>{profession}</Text>
          </View>
          <View>
            <Button
              title="Upload and Continue"
              disable={!hasPhoto}
              onPress={handleUploadAndContinue}
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
      {loading && <Loading />}
    </>
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
