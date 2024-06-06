import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {Header, List} from '../../components';
import {colors, showError} from '../../utils';
import {equalTo, get, orderByChild, query, ref} from 'firebase/database';
import {fireDB} from '../../config';

type RootStackParamList = {
  ChooseDoctor: {id: string; category: string};
  DoctorProfile: undefined;
};

type ChooseDoctorRouteProp = RouteProp<RootStackParamList, 'ChooseDoctor'>;

type Props = {
  route: ChooseDoctorRouteProp;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ChooseDoctor = ({navigation, route}: Props) => {
  const doctorCategory = route.params;

  const [listDoctor, setListDoctor] = useState<any[]>([]);

  useEffect(() => {
    getDoctorListByCategory(doctorCategory.category);
  }, [doctorCategory.category]);

  const getDoctorListByCategory = (category: string) => {
    const getDoctor = query(
      ref(fireDB, 'users'),
      orderByChild('role'),
      equalTo('doctor'),
    );
    get(getDoctor)
      .then(snapshot => {
        if (snapshot.exists()) {
          const dataDoctor = snapshot.val();
          const filterByCategory = [];

          for (const key in dataDoctor) {
            if (dataDoctor[key].specialist === category) {
              filterByCategory.push({id: key, ...dataDoctor[key]});
            }
          }

          setListDoctor(filterByCategory);
        }
      })
      .catch(err => showError(err.message));
  };

  return (
    <View style={styles.page}>
      <Header
        title={`Choose a ${doctorCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      {listDoctor.length > 0 ? (
        listDoctor.map(doctor => (
          <List
            key={doctor.uid}
            picture={doctor.photo ? {uri: doctor.photo} : null}
            title={doctor.fullName}
            desc={doctor.specialist}
            iconAction="next"
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        ))
      ) : (
        <View style={styles.container}>
          <Text>No Doctor</Text>
        </View>
      )}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
