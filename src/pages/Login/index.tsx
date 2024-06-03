import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, showError, storeData, useForm} from '../../utils';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {fireAuth, fireDB} from '../../config';
import {child, get, ref} from 'firebase/database';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/accountSlice';

type RootStackParamList = {
  MainApp: undefined;
  Register: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Login = ({navigation}: Props) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(setLoading(true));
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
        dispatch(setLoading(false));
        navigation.replace('MainApp');
      }

      setForm('reset');
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      showError(error.message);
    }
  };

  return (
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
