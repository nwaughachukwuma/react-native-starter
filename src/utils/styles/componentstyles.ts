import { StyleSheet } from 'react-native'
import {scale} from 'react-native-size-matters'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const defaultStyles = (initialStyles: any={}) => StyleSheet.create({
    ...initialStyles,
    container: {
        ...initialStyles.container,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export const tabStyles = (initialStyles: any={}) => StyleSheet.create({
    ...initialStyles,
    headerStyle: {
        ...initialStyles.container,
        paddingTop: getStatusBarHeight(true)
    }
});