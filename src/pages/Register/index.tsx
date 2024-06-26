import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Input, Link, Loading} from '../../components';
import {colors, storeData, useForm} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fireAuth, fireDB} from '../../config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {ref, set} from 'firebase/database';
import {UserType} from '../../types';

type RootStackParamList = {
  Register: undefined;
  UploadPhoto: UserType;
  Login: undefined;
  RegisterDoctor: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Register = ({navigation}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const onContinue = () => {
    setLoading(true);
    createUserWithEmailAndPassword(fireAuth, form.email, form.password)
      .then(response => {
        const datauser = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: response.user.uid,
          role: 'user',
        };
        //Save to Firebase
        const userDoc = ref(fireDB, `users/${response.user.uid}`);
        set(userDoc, datauser);
        //Save to localStorage
        storeData('user', datauser);
        //Reset form
        setLoading(false);
        setForm('reset');

        navigation.replace('UploadPhoto', datauser);
      })
      .catch(error => {
        setLoading(false);
        showMessage({
          message: error.message,
          type: 'danger',
        });
        //console.log(error);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Daftar Akun" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email Address"
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
            <Button title="Continue" onPress={onContinue} />
            <Gap height={40} />
            <Link
              title="Already have account ? Login here"
              fontSize={16}
              align="center"
              onPress={() => navigation.replace('Login')}
            />
            <Gap height={40} />
            <Link
              title="Register Doctor"
              fontSize={16}
              align="center"
              onPress={() => navigation.navigate('RegisterDoctor')}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    padding: 40,
    paddingTop: 0,
  },
});
