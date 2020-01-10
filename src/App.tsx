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
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { primaryTheme, appColors } from 'utils'
import AppNavigator from 'networking/navigators'
import {PreferencesContext} from 'utils/reactpatterns/contextapi'


const isIOS = Platform.OS === 'ios'
const App = () => {

  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {

    // on change save app theme to storage
    return () => {
      // remove all listeners
    }
  }, [darkMode]);

  const _toggleTheme = () => {
    setDarkMode(!darkMode)
    // _savePreferences
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