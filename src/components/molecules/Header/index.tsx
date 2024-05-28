import {
  Image,
  ImageStyle,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';
import {ILNullPhoto} from '../../../assets';

interface Props {
  title: string;
  onPress?: () => void;
  type?: string;
  showDetail?: boolean;
}

const Header = ({onPress, title, type, showDetail}: Props) => {
  return (
    <View style={styleContainer.container(type)}>
      <View style={styleContainer.icon()}>
        <Button
          type="icon-only"
          icon={type === 'dark' ? 'back-light' : 'back-dark'}
          onPress={onPress}
        />
      </View>
      <View>
        <Text style={styleContainer.text(type)}>{title}</Text>
        {showDetail && (
          <Text style={styleContainer.desc(type)}>Mugiwara Doctor</Text>
        )}
      </View>
      {showDetail && (
        <Image style={styleContainer.avatar()} source={ILNullPhoto} />
      )}
    </View>
  );
};

export default Header;

const styleContainer = {
  container: (type: string | undefined): ViewStyle => ({
    paddingVertical: 20,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
  }),
  text: (type: string | undefined): TextStyle => ({
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    fontSize: 20,
  }),
  desc: (type: string | undefined): TextStyle => ({
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: type === 'dark' ? colors.text.subTitle : colors.text.primary,
  }),
  icon: (): ViewStyle => ({
    position: 'absolute',
    left: 16,
  }),
  avatar: (): ImageStyle => ({
    width: 46,
    height: 46,
    position: 'absolute',
    right: 16,
  }),
};
