import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILGetStarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, fonts} from '../../utils';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const GetStarted = ({navigation}: Props) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={16} />
        <Button
          type="secondary"
          title="Sign In"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    color: colors.white,
    marginTop: 90,
    fontFamily: fonts.primary[600],
  },
});
