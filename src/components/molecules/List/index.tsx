import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconNext,
  IconRate,
} from '../../../assets';

interface Props {
  picture?: ImageSourcePropType;
  title: string;
  desc?: string;
  iconAction?: string;
  icon?: string;
  onPress?: () => void;
}

interface IconProps {
  icon: string;
}

const Icon = ({icon}: IconProps) => {
  if (icon === 'edit-profile') {
    return <IconEditProfile />;
  }

  if (icon === 'language') {
    return <IconLanguage />;
  }

  if (icon === 'rate') {
    return <IconRate />;
  }

  if (icon === 'help') {
    return <IconHelp />;
  }

  return <IconEditProfile />;
};

const List = ({picture, title, desc, iconAction, icon, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? (
        <Icon icon={icon} />
      ) : (
        <Image source={picture} style={styles.picture} />
      )}
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {iconAction === 'next' && <IconNext />}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picture: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  wrapper: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
