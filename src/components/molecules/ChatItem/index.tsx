import {
  Image,
  Text,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {ILNullPhoto} from '../../../assets';

interface Props {
  isMe?: boolean;
  text?: string;
  date?: string;
  photo?: ImageSourcePropType | null;
}

const ChatItem = ({isMe = false, text, date, photo}: Props) => {
  return (
    <View style={styleContainer.container(isMe)}>
      {!isMe && (
        <Image
          style={styleContainer.avatar()}
          source={photo ? photo : ILNullPhoto}
        />
      )}
      <View style={styleContainer.chatWrapper()}>
        <View style={styleContainer.chatContent(isMe)}>
          <Text style={styleContainer.text(isMe)}>{text}</Text>
        </View>
        <Text style={styleContainer.date(isMe)}>{date}</Text>
      </View>
    </View>
  );
};

export default ChatItem;

const styleContainer = {
  container: (isMe: boolean): ViewStyle => ({
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: isMe ? 'flex-end' : 'flex-start',
  }),
  avatar: (): ImageStyle => ({
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  }),
  chatWrapper: (): ViewStyle => ({
    maxWidth: '80%',
  }),
  chatContent: (isMe: boolean): ViewStyle => ({
    padding: 12,
    paddingRight: 18,
    backgroundColor: isMe ? colors.cardLight : colors.primary,
    borderRadius: 10,
    borderBottomRightRadius: isMe ? 0 : 10,
    borderBottomLeftRadius: isMe ? 10 : 0,
  }),
  text: (isMe: boolean): TextStyle => ({
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: isMe ? colors.text.primary : colors.white,
  }),
  date: (isMe: boolean): TextStyle => ({
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: isMe ? 'right' : 'left',
  }),
};
