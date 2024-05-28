import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors, fonts} from '../../utils';

type RootStackParamList = {
  Chatting: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Chatting = ({navigation}: Props) => {
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title="Tony tony Chopper"
        showDetail={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.textChatDate}>Monday, 21 May 2024</Text>
          <ChatItem isMe={true} />
          <ChatItem />
          <ChatItem isMe={true} />
        </View>
        <InputChat />
      </View>
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  wrapper: {
    padding: 16,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  textChatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
