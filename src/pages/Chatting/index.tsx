import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  getDate,
  showError,
} from '../../utils';
import {RouteProp} from '@react-navigation/native';
import {UserType} from '../../types';
import {onValue, push, ref, set} from 'firebase/database';
import {fireDB} from '../../config';

type RootStackParamList = {
  Chatting: UserType;
};

type Props = {
  route: RouteProp<RootStackParamList>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Chatting = ({navigation, route}: Props) => {
  const other_user = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    getDataUserFromLocal();
    let chatId = `${user.uid}_${other_user.uid}`;
    //set agar yang role nya doctor itu id nya selalu ada di sebelah kanan
    if (user?.role === 'doctor') {
      chatId = `${other_user.uid}_${user.uid}`;
    }

    const chatRef = ref(fireDB, `chatting/${chatId}/allChat/`);
    onValue(chatRef, (snapshot: any) => {
      const dataSnapshot = snapshot.val();
      const allDataChatt = [];
      if (dataSnapshot) {
        Object.keys(dataSnapshot).map(key => {
          allDataChatt.push({
            id: key,
            data: dataSnapshot[key],
          });
        });
      }
      console.log('data chat: ', allDataChatt);
    });
  }, [other_user.uid, user?.role, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    let chatId = `${user.uid}_${other_user.uid}`;
    //set agar yang role nya doctor itu id nya selalu ada di sebelah kanan
    if (user?.role === 'doctor') {
      chatId = `${other_user.uid}_${user.uid}`;
    }

    const chatCollection = `chatting/${chatId}/allChat/${getDate(today)}`;

    const generateKey = push(ref(fireDB, chatCollection)).key;

    set(ref(fireDB, `${chatCollection}/${generateKey}`), data)
      .then(() => setChatContent(''))
      .catch(err => showError(err.message));
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={other_user.fullName}
        desc={other_user.specialist}
        photo={other_user.photo ? {uri: other_user.photo} : null}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textChatDate}>Monday, 21 May 2024</Text>
            <ChatItem isMe={true} />
            <ChatItem />
            <ChatItem isMe={true} />
          </ScrollView>
        </View>
        <InputChat
          value={chatContent}
          onChangeText={(val: string) => setChatContent(val)}
          onPress={chatSend}
        />
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
