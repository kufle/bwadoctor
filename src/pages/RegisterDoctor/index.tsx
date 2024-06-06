import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {ref, set} from 'firebase/database';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {Button, Gap, Header, Input, Select} from '../../components';
import {colors, showError, storeData, useForm} from '../../utils';
import {setLoading} from '../../redux/accountSlice';
import {fireAuth, fireDB} from '../../config';
import {UserType} from '../../types';

type RootStackParamList = {
  UploadPhoto: UserType;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const specialist = [
  {
    id: 1,
    label: 'Dokter Umum',
    value: 'dokter umum',
  },
  {
    id: 2,
    label: 'Psikiater',
    value: 'psikiater',
  },
  {
    id: 3,
    label: 'Dokter Obat',
    value: 'dokter obat',
  },
  {
    id: 4,
    label: 'Dokter Anak',
    value: 'dokter anak',
  },
  {
    id: 5,
    label: 'Dokter Bedah',
    value: 'dokter bedah',
  },
];

const gender = [
  {
    id: 1,
    label: 'Pria',
    value: 'pria',
  },
  {
    id: 2,
    label: 'Wanita',
    value: 'wanita',
  },
];

const RegisterDoctor = ({navigation}: Props) => {
  const [form, setForm] = useForm({
    fullName: '',
    specialist: '',
    university: '',
    rcnumber: '',
    hospitalAddress: '',
    gender: '',
    email: '',
    password: '',
    rate: 0,
  });

  const dispatch = useDispatch();

  const handleContinue = async () => {
    dispatch(setLoading(true));
    try {
      const result = await createUserWithEmailAndPassword(
        fireAuth,
        form.email,
        form.password,
      );

      const dataUser = {
        ...form,
        uid: result.user.uid,
        role: 'doctor',
        password: undefined,
      };

      const userDoc = ref(fireDB, `users/${result.user.uid}`);
      await set(userDoc, dataUser);
      //save to localstorage
      storeData('user', dataUser);
      dispatch(setLoading(false));
      setForm('reset');
      console.log('form', form);
      console.log('dataUser', dataUser);
      navigation.replace('UploadPhoto', dataUser);
    } catch (error: any) {
      dispatch(setLoading(false));
      showError(error.message);
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Register Doctor" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Select
            label="Specialist"
            selectItem={specialist}
            value={form.specialist}
            onValueChange={(value: any) => setForm('specialist', value)}
          />
          <Gap height={24} />
          <Input
            label="University"
            value={form.university}
            onChangeText={value => setForm('university', value)}
          />
          <Gap height={24} />
          <Input
            label="RC Number"
            value={form.rcnumber}
            onChangeText={value => setForm('rcnumber', value)}
          />
          <Gap height={24} />
          <Input
            label="Hospital Address"
            value={form.hospitalAddress}
            onChangeText={value => setForm('hospitalAddress', value)}
          />
          <Gap height={24} />
          <Select
            label="Gender"
            selectItem={gender}
            value={form.gender}
            onValueChange={(value: any) => setForm('gender', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Continue" onPress={handleContinue} />
          <Gap height={40} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
  },
});
