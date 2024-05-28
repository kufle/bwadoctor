const baseColors: any = {
  primary: '#0BCAD4',
  primary2: '#EDFCFD',
  secondary: '#112340',
  secondary2: '#495A75',
  secondary3: '#8092AF',
  grey1: '#7D8797',
  grey2: '#E9E9E9',
  grey3: '#EDEEF0',
  white: 'white',
  black: 'black',
  black2: 'rgba(0, 0, 0, 0.5)',
  tertiary: '#0066CB',
  red1: '#E06379',
};

export const colors: any = {
  ...baseColors,
  disable: baseColors.grey3,
  text: {
    primary: baseColors.secondary,
    secondary: baseColors.grey1,
    menuInactive: baseColors.secondary2,
    menuActive: baseColors.primary,
    subTitle: baseColors.secondary3,
  },
  button: {
    primary: {
      background: baseColors.primary,
      text: baseColors.white,
    },
    secondary: {
      background: baseColors.white,
      text: baseColors.black,
    },
  },
  border: baseColors.grey2,
  cardLight: baseColors.primary2,
  loadingBackground: baseColors.black2,
  error: baseColors.red1,
};
