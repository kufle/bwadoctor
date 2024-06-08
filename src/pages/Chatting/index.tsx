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
import {ChatItemType, UserType} from '../../types';
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
  const [chatInput, setChatInput] = useState('');
  const [user, setUser] = useState<any>({});
  const [chatData, setChatData] = useState<any>([]);

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
      const allDataChatt: any[] = [];
      if (dataSnapshot) {
        Object.keys(dataSnapshot).map(key => {
          const newDataChat: any[] = [];
          if (key) {
            Object.keys(dataSnapshot[key]).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataSnapshot[key][itemChat],
              });
            });
          }
          allDataChatt.push({
            id: key,
            data: newDataChat,
          });
        });
        setChatData(allDataChatt);
      }
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
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatInput,
    };

    let chatId = `${user.uid}_${other_user.uid}`;
    //set agar yang role nya doctor itu id nya selalu ada di sebelah kanan
    if (user?.role === 'doctor') {
      chatId = `${other_user.uid}_${user.uid}`;
    }

    const chatCollection = `chatting/${chatId}/allChat/${getDate(today)}`;
    //ini url untuk collection baru menyimpan last chat
    const lastMessageUserCollection = `messages/${user.uid}/${chatId}`;
    const lastMessageOtherUserCollection = `messages/${other_user.uid}/${chatId}`;

    const lastHistoryChatForUser = {
      lastContentChat: chatInput,
      lastChatDate: today.getTime(),
      uidOtherUser: other_user.uid,
    };

    const lastHistoryChatForOtherUser = {
      lastContentChat: chatInput,
      lastChatDate: today.getTime(),
      uidOtherUser: user.uid,
    };

    push(ref(fireDB, chatCollection), data)
      .then(() => {
        setChatInput('');
        //set history lst chat for user
        set(ref(fireDB, lastMessageUserCollection), lastHistoryChatForUser);
        //set history last chat for other user
        set(
          ref(fireDB, lastMessageOtherUserCollection),
          lastHistoryChatForOtherUser,
        );
      })
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
            {chatData.map((chat: any) => (
              <View key={chat.id}>
                <Text style={styles.textChatDate}>{chat.id}</Text>
                {chat?.data.map((chatItem: ChatItemType) => (
                  <View key={chatItem.id}>
                    <ChatItem
                      isMe={chatItem.data.sendBy === user.uid}
                      text={chatItem.data.chatContent}
                      date={chatItem.data.chatTime}
                      photo={other_user.photo ? {uri: other_user.photo} : null}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <InputChat
          value={chatInput}
          onChangeText={(val: string) => setChatInput(val)}
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
