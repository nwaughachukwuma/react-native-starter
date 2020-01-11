import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import get from 'lodash.get'
import AppNavigator from './main'
import AuthNavigator from './auth'

const switchNavigator = createSwitchNavigator({
        Auth: AuthNavigator,
        Main: AppNavigator,
        // Onboarding: OnBoardNavigator // add an onboard nav
    },
    { initialRouteName: "Auth" }
)

export default createAppContainer(switchNavigator);