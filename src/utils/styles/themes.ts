import { configureFonts, DefaultTheme } from 'react-native-paper';

const fontConfig = {
  default: {
    bold: {
      fontFamily: 'SF-Pro-Text-Bold',
      fontWeight: 'bold',
    },
    regular: {
      fontFamily: 'SF-Pro-Text-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SF-Pro-Text-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'SF-Pro-Text-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export const primaryTheme = (dark = false) => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
    dark,
    mode: 'adaptive',
    // @ts-ignore
    fonts: configureFonts(fontConfig)
});