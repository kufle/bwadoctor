import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {colors, fonts, storeData, useForm} from '../../utils';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {fireAuth, fireDB} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {child, get, ref} from 'firebase/database';

type RootStackParamList = {
  MainApp: undefined;
  Register: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Login = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setLoading(true);
    //Firebase Login
    try {
      const login = await signInWithEmailAndPassword(
        fireAuth,
        form.email,
        form.password,
      );

      //get Detail user
      const detailUser = await get(
        child(ref(fireDB), `users/${login.user.uid}`),
      );

      if (detailUser.exists()) {
        storeData('user', detailUser.val());
        navigation.replace('MainApp');
      }
      setForm('reset');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai{'\n'}berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={form.password}
            onChangeText={value => setForm('password', value)}
          />
          <Gap height={10} />
          <Link title="Forgot My Password" fontSize={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={handleLogin} />
          <Gap height={30} />
          <Link
            title="Create new account"
            fontSize={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
  },
});
