import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, Input, Loading, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ref, update} from 'firebase/database';
import {fireAuth, fireDB} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

type RootStackParamList = {
  UpdateProfile: undefined;
  MainApp: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const UpdateProfile = ({navigation}: Props) => {
  const [profile, setProfile] = useState<any>({
    uid: '',
    fullName: '',
    profession: '',
    email: '',
  });

  const [photo, setPhoto] = useState<any>(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      res.photo = res?.photo?.length > 1 ? {uri: res.photo} : null;
      setPhoto(res.photo);
      setPhotoBase64(res.photo);
      setProfile(data);
    });
  }, []);

  const changeText = (key: any, value: any) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
      maxWidth: 200,
      maxHeight: 200,
    });

    if (result.didCancel) {
      showMessage({
        message: 'Oops, it seems you did not select the photos',
        type: 'danger',
      });
    } else {
      const source = {uri: result.assets![0]?.uri};
      const base64Photo = `data:${result.assets![0].type};base64, ${
        result.assets![0]?.base64
      }`;
      setPhoto(source);
      setPhotoBase64(base64Photo);
    }
  };

  const handleSubmit = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password minimum 6 character length',
          type: 'danger',
        });
      } else {
        changePassword();
      }
    } else {
      updateProfile();
    }
  };

  const changePassword = () => {
    onAuthStateChanged(fireAuth, user => {
      if (user) {
        const credential = EmailAuthProvider.credential(
          profile.email,
          oldPassword,
        );
        setLoading(true);
        reauthenticateWithCredential(user, credential)
          .then(() => {
            updatePassword(user, password)
              .then(() => {
                updateProfile();
              })
              .catch(err => {
                showMessage({
                  message: err.message,
                  type: 'danger',
                });
                setLoading(false);
              });
          })
          .catch(err => {
            showMessage({
              message: err.message,
              type: 'danger',
            });
            setLoading(false);
          });
      }
    });
  };

  const updateProfile = () => {
    setLoading(true);
    const data = profile;
    data.photo = photoBase64;
    console.log(photoBase64);
    console.log(data);
    update(ref(fireDB, `users/${profile.uid}`), data)
      .then(() => {
        showMessage({
          message: 'Profile updated',
          type: 'success',
        });
        storeData('user', data);
        setLoading(false);
        navigation.replace('MainApp');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Profile
              isUpload
              name={profile.fullName}
              desc={profile.profession}
              photo={photo}
              onPress={getImageFromGallery}
            />
            <Gap height={26} />
            <Input
              label="Full Name"
              value={profile.fullName}
              onChangeText={val => changeText('fullName', val)}
            />
            <Gap height={24} />
            <Input
              label="Profession"
              value={profile.profession}
              onChangeText={val => changeText('profession', val)}
            />
            <Gap height={24} />
            <Input label="Email" value={profile.email} canEdit={false} />
            <Gap height={24} />
            <Input
              label="Old Password"
              value={oldPassword}
              onChangeText={val => setOldPassword(val)}
              secureTextEntry
            />
            <Text style={styles.small}>
              Keep it blank if you don't want to change password
            </Text>
            <Gap height={24} />
            <Input
              label="Password"
              value={password}
              onChangeText={val => setPassword(val)}
              secureTextEntry
            />
            <Text>Keep it blank if you don't want to change password</Text>
            <Gap height={40} />
            <Button title="Update Profile" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  small: {
    fontSize: 11,
  },
});
