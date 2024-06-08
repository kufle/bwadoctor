import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {get, onValue, ref} from 'firebase/database';
import {fireDB} from '../../config';

type RootStackParamList = {
  Chatting: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const Messages = ({navigation}: Props) => {
  const [user, setUser] = useState<any>({});
  const [historyChat, setHistoryChat] = useState<any[]>([]);

  useEffect(() => {
    getDataUserFromLocal();
    const lastHistoryMessage = `messages/${user.uid}`;
    onValue(ref(fireDB, lastHistoryMessage), async snapshot => {
      try {
        const dataSnapshot = snapshot.val();
        const messageArr: any[] = [];

        const promises = Object.keys(dataSnapshot).map(async itemMessage => {
          const userCollection = `users/${dataSnapshot[itemMessage].uidOtherUser}`;
          const fetchUserinfo = await get(ref(fireDB, userCollection));
          const userDetail = fetchUserinfo.val();
          messageArr.push({
            id: itemMessage,
            userDetail,
            ...dataSnapshot[itemMessage],
          });
        });

        await Promise.all(promises);
        console.log(messageArr);
        setHistoryChat(messageArr);
      } catch (error) {
        console.log(error);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(itemChat => (
          <List
            key={itemChat.id}
            picture={
              itemChat.userDetail.photo
                ? {uri: itemChat.userDetail.photo}
                : null
            }
            title={itemChat.userDetail.fullName}
            desc={itemChat.lastContentChat}
            onPress={() => navigation.navigate('Chatting', itemChat.userDetail)}
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
