import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.loadingBackground,
    padding: 10,
  },
  wrapper: {
    backgroundColor: colors.white,
    padding: 15,
    margin: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    marginTop: 16,
  },
});
