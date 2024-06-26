import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showSuccess = (message: string) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.primary,
    color: colors.white,
  });
};

export const showError = (message: string) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
  });
};
