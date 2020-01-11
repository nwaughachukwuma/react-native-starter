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

export const AuthFlow = createStackNavigator({
        Welcome: {
            screen: Welcome
        },
        Starter: {
            screen: Starter,
            navigationOptions: ({navigation, screenProps}) => {
                return {
                    headerTitle: 'RN-Starter',
                    headerRight: () => (
                        <IconButton
                            icon="home"
                            color={get(screenProps, 'appTheme.colors.text', '#000')}
                            onPress={() => {
                                navigation.navigate('Welcome')
                            }}
                        >
                            Menu
                        </IconButton>
                    )
                }
            }
        },
    },
    {
        // mode: 'card',
        // headerMode: 'none',
        initialRouteName: 'Starter',
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

export default AuthFlow;