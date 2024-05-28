import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  IconDoctor,
  IconDoctorActive,
  IconHospitals,
  IconHospitalsActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets';
import {colors} from '../../../utils/colors/index';

interface TabItemProps {
  title: string;
  active?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  options: BottomTabNavigationOptions;
}

interface IconProps {
  icon: string;
  active?: boolean;
}

const Icon: React.FC<IconProps> = ({icon, active = false}) => {
  switch (icon) {
    case 'Doctor':
      return active ? <IconDoctorActive /> : <IconDoctor />;
    case 'Messages':
      return active ? <IconMessagesActive /> : <IconMessages />;
    case 'Hospitals':
      return active ? <IconHospitalsActive /> : <IconHospitals />;
    default:
      return <IconDoctor />;
  }
};

const TabItem: React.FC<TabItemProps> = ({
  title,
  active = false,
  onPress,
  onLongPress,
  options,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      accessibilityState={active ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon icon={title} active={active} />
      <Text style={styles1.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: colors.text.menuInactive,
  },
});

const styles1 = {
  text: (active: boolean): TextStyle => ({
    color: active ? colors.text.menuActive : colors.text.menuInactive,
  }),
};
