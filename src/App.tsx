/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {useState, useEffect} from 'react'
import {
  StatusBar,
  Platform
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux'
import { primaryTheme, appColors } from 'utils'
import AppNavigator from 'networking/navigators'
import {PreferencesContext} from 'utils/reactpatterns/contextapi'
import createStore, { persistor, rrfProps } from "networking/redux";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from 'react-native-safe-area-context';


const isIOS = Platform.OS === 'ios'
const store: any = createStore;

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
    <PaperProvider theme={appTheme}>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export function StoreWrapper(){
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default StoreWrapper