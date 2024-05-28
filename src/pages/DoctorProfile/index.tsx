import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  DoctorProfile: undefined;
  Chatting: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const DoctorProfile = ({navigation}: Props) => {
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name="Tony tony chopper" desc="Mugiwara" />
      <Gap height={10} />
      <ProfileItem title="Alumnus" desc="Drum island univercity, 2022" />
      <ProfileItem title="Alumnus" desc="Drum island univercity, 2022" />
      <ProfileItem title="Alumnus" desc="Drum island univercity, 2022" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
