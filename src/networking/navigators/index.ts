import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from 'screens/home'
import Starter from 'screens/starter'

const AppNavigator = createStackNavigator({
        Home: {
            screen: HomeScreen,
        },
        Starter: {
            screen: Starter
        }, 
    },
    {
        initialRouteName: 'Starter'
    }
);

export default createAppContainer(AppNavigator);