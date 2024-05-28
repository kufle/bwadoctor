import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, List} from '../../components';
import {ILNullPhoto} from '../../assets';
import {colors} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  ChooseDoctor: undefined;
  Chatting: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ChooseDoctor = ({navigation}: Props) => {
  return (
    <View style={styles.page}>
      <Header
        title="Choose a Doctor"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        picture={ILNullPhoto}
        title="Tony tony chopper"
        desc="Strawhat Pirate"
        iconAction="next"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        picture={ILNullPhoto}
        title="Tony tony chopper"
        desc="Strawhat Pirate"
        iconAction="next"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        picture={ILNullPhoto}
        title="Tony tony chopper"
        desc="Strawhat Pirate"
        iconAction="next"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        picture={ILNullPhoto}
        title="Tony tony chopper"
        desc="Strawhat Pirate"
        iconAction="next"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        picture={ILNullPhoto}
        title="Tony tony chopper"
        desc="Strawhat Pirate"
        iconAction="next"
        onPress={() => navigation.navigate('Chatting')}
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
