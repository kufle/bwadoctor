import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILHospitalBG} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListHospital} from '../../components';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="Rumah Sakit"
          name="Impeldown"
          address="Impel Down level 5.5"
          picture={ILHospitalBG}
        />
        <ListHospital
          type="Rumah Sakit"
          name="Marijoa"
          address="Celestial dragon"
          picture={ILHospitalBG}
        />
        <ListHospital
          type="Klinik"
          name="Sabaody"
          address="sabaody archipelago"
          picture={ILHospitalBG}
        />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: 'center',
    marginTop: 6,
  },
});
