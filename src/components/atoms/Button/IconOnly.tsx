import {TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBackDark, IconBackLight} from '../../../assets';

interface Props {
  icon: string;
  onPress?: () => void;
}

const Icon = ({icon}: {icon: string}) => {
  if (icon === 'back-dark') {
    return <IconBackDark />;
  }

  if (icon === 'back-light') {
    return <IconBackLight />;
  }

  return <IconBackDark />;
};

const IconOnly = ({onPress, icon}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon icon={icon} />
    </TouchableOpacity>
  );
};

export default IconOnly;
