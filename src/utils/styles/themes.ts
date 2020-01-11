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
  const themeType = dark ? {...DarkTheme}: {...DefaultTheme}
  const custom_colors = customColors(dark)

  return {
    ...themeType,
    colors: {
      ...themeType.colors,
      primary: 'tomato',
      accent: 'yellow',
      ...custom_colors
    },
    dark,
    // mode: 'adaptive',
    // @ts-ignore
    fonts: configureFonts(fontConfig)
}};

export const customColors = (dark: boolean) => {

  const colors = !dark ? customDefaultColors: customDarkColors
  return colors
}

const customDefaultColors = {
  lightText: '#333',
  grey: '#808080',
  lightGrey: '#665'
}

const customDarkColors = {
  lightText: '#78869A',
  grey: '#c4c4c4',
  lightGrey: '#f3f3f3'
}

export const appColors = {
  white: '#fff',
  black: '#000'
}