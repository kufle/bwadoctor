import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header, List, Profile} from '../../components';
import {colors, getData} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {signOut} from 'firebase/auth';
import {fireAuth} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';

type RootStackParamList = {
  UserProfile: undefined;
  UpdateProfile: undefined;
  GetStarted: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const UserProfile = ({navigation}: Props) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: '',
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        const data = res;
        data.photo = res.photo ? {uri: data.photo} : null;
        setProfile(data);
        console.log('profile');
      });
    }
  }, [isFocused]);

  const logout = () => {
    signOut(fireAuth)
      .then(() => {
        console.log('logout successfully');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile
        name={profile.fullName}
        desc={profile.profession}
        photo={profile.photo}
      />
      <Gap height={14} />
      <List
        title="Edit Profile"
        desc="last update yesterday"
        iconAction="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        title="Language"
        desc="last update yesterday"
        iconAction="next"
        icon="language"
      />
      <List
        title="Give us rate"
        desc="last update yesterday"
        iconAction="next"
        icon="rate"
      />
      <List
        title="Sign Out"
        desc="last update yesterday"
        iconAction="next"
        icon="help"
        onPress={logout}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
