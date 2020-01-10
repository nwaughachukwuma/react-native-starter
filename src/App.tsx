/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {useState, useEffect} from 'react'
import {
  StatusBar,
  Platform,
  InteractionManager
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { primaryTheme, appColors } from 'utils'
import AppNavigator from 'networking/navigators'
import {PreferencesContext} from 'utils/reactpatterns/contextapi'


const isIOS = Platform.OS === 'ios'
const App = () => {

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem("preferences").then(
      async result => {
        const res = result? JSON.parse(result): {}
        if (res) {
          setDarkMode(res.isDarkMode)
        }
      }
    )
  }, [])

  useEffect(() => {
    // on change save app theme to storage
    try {
      AsyncStorage.setItem("preferences",
        JSON.stringify({
          isDarkMode: darkMode,
        })
      )
    } catch (e) {}
    return () => {
      // remove all listeners
    }
  }, [darkMode]);

  const _toggleTheme = () => {
    setDarkMode(!darkMode)
  };
  
  const _toggleRTL = () => {

  }

  const appTheme = primaryTheme(darkMode)

  return (
    // @ts-ignore
    <PaperProvider theme={appTheme}>
      <PreferencesContext.Provider
        value={{
          toggleTheme: _toggleTheme,
          toggleRTL: _toggleRTL,
          isRTL: false,
          isDarkMode: darkMode,
          isOnBackground: false, //appState === 'inactive'? true: false
        }}
      >
        {isIOS || Platform.Version > 23 ? ( //* Set barColor to black for Android for consistency
          <StatusBar
            backgroundColor={darkMode ? appColors.white: appColors.black}
            barStyle={darkMode ? "light-content" : "dark-content"}
            animated={true}
          />
        ) : Platform.Version > 28 ? (
          <StatusBar
            backgroundColor={appColors.black}
            barStyle={"dark-content"}
            animated={true}
          />
        ) : (
          <StatusBar
            backgroundColor={appColors.black}
            barStyle={"light-content"}
            animated={true}
          />
        )}
        <AppNavigator screenProps={{ appTheme }} theme={darkMode? 'dark': 'light'} />
      </PreferencesContext.Provider>
    </PaperProvider>
  );
};

export default App