import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import get from 'lodash.get'
import AppNavigator from './main'
import AuthNavigator from './auth'

const switchNavigator = createSwitchNavigator({
        Auth: AuthNavigator,
        Main: AppNavigator,
        Onboarding: AppNavigator
    },
    { initialRouteName: "Auth" }
)

export default createAppContainer(switchNavigator);