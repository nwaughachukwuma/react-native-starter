//@ts-check

import * as React from 'react';
import {
    I18nManager,
    Platform
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import get from 'lodash.get'
import {Welcome} from 'screens/auth'
import Starter from 'screens/starter'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { IconButton } from "react-native-paper";
import { PreferencesContext } from 'utils/reactpatterns/contextapi'
import { SCREEN_DIM, tabStyles } from 'utils'
import { DrawerComponent } from 'components'

export const MainNavigator = createStackNavigator({
        Welcome: {
            screen: Welcome,
            navigationOptions: ({navigation, screenProps}) => {
                return {
                    headerLeft: () => (
                        <IconButton
                            icon="menu"
                            color={get(screenProps, 'appTheme.colors.text', '#000')}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            Menu
                        </IconButton>
                    )
                }
            }
        },
        Starter: {
            screen: Starter
        },
    },
    {
        // mode: 'card',
        // headerMode: 'none',
        initialRouteName: 'Welcome',
        defaultNavigationOptions: ({ navigation, ...rest }) => {
            const { screenProps, navigationOptions, theme } = rest
            console.log('defaultNavigationOptions params: ', rest)
            return {
                headerStyle: {
                    backgroundColor: get(screenProps, 'appTheme.colors.background', '#fff'),
                    // elevation: 0
                },
                headerTitleStyle: {
                    color: get(screenProps, 'appTheme.colors.text', '#000')
                },
            }
        }
    }
);

export const drawerPreset = {
    drawerWidth: (SCREEN_DIM.width * 3) / 4,
    edgeWidth: 10, //* swipe 10px from the edge to open Drawer
    hideStatusBar: false,
    overlayColor: 'transparent', // gray
    // // drawerType: "back", // this has issues. Please test these things well before leaving them in
    // // set drawerPosition to support rtl toggle on android
}

const AuthFlow = createDrawerNavigator({
        MainFlow: MainNavigator,
    },
    {
        initialRouteName: "MainFlow",
        ...drawerPreset,
        drawerPosition: Platform.OS === "android" ?
            (I18nManager.isRTL ? "right" : "left") :
            'left',
        contentComponent: (props) => (
            <PreferencesContext.Consumer>
              {preferences => (
                <DrawerComponent
                  toggleTheme={preferences.toggleTheme}
                  toggleRTL={preferences.toggleRTL}
                  isRTL={preferences.isRTL}
                  isDarkMode={preferences.isDarkMode}
                  isOnBackground={preferences.isOnBackground}
                  {...props}
                />
              )}
            </PreferencesContext.Consumer>
        ),
        contentOptions: {
            activeTintColor: '#000000',
            activeBackgroundColor: '#e6e6e6',
        }
    }
);

export default AuthFlow;