import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserType} from '../../types';

type RootStackParamList = {
  DoctorProfile: UserType;
  Chatting: UserType;
};

type DoctorProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'DoctorProfile'
>;

interface Props {
  route: DoctorProfileScreenRouteProp;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const DoctorProfile: React.FC<Props> = ({navigation, route}) => {
  const doctor = route.params;
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={doctor.fullName}
        desc={doctor.specialist}
        photo={doctor.photo ? {uri: doctor.photo} : null}
      />
      <Gap height={10} />
      <ProfileItem title="Alumnus" desc={doctor.university} />
      <ProfileItem title="Hospital Address" desc={doctor.hospitalAddress} />
      <ProfileItem title="Certificate Number" desc={doctor.rcnumber} />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', doctor)}
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
