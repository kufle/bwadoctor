import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Chatting: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const Messages = ({navigation}: Props) => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profilePict: ILNullPhoto,
      name: 'Tony Tony Chopper',
      chat: 'Chopper self-studied many books of new and highly effective remedies...',
    },
    {
      id: 2,
      profilePict: ILNullPhoto,
      name: 'Trafalgar D water Law',
      chat: 'patching up wounds from battle, and using his knowledge of medicine...',
    },
    {
      id: 3,
      profilePict: ILNullPhoto,
      name: 'Dr Vegapunk',
      chat: 'C A doctor who is stationed aboard a ship and offer...',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => (
          <List
            key={doctor.id}
            picture={doctor.profilePict}
            title={doctor.name}
            desc={doctor.chat}
            onPress={() => navigation.navigate('Chatting')}
          />
        ))}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
