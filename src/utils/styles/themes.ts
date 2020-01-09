import { configureFonts, DefaultTheme, DarkTheme } from 'react-native-paper';

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

export const primaryTheme = (dark = false) => {
  const themeType = !dark ? {...DefaultTheme}: {...DarkTheme}
  return {
    ...themeType,
    colors: {
      ...themeType.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
    dark,
    mode: 'adaptive',
    // @ts-ignore
    fonts: configureFonts(fontConfig)
}};