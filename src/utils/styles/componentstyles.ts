import { StyleSheet } from 'react-native'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'


export const defaultStyles = (initialStyles: any = {}) => StyleSheet.create({
    ...initialStyles,
    container: {
        ...initialStyles.container,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const scaledStyles = ScaledSheet.create({
    listSectionHeaderContainer: {
        width: "100%",
        height: "30@vs",
        paddingHorizontal: "20@vs",
        paddingTop: 5,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    listSectionTitle: {
        textTransform: "uppercase",
        color: 'gray',
        textAlignVertical: "bottom",
        fontWeight: 'bold'
    },
});

export const tabStyles = (initialStyles: any = {}) => StyleSheet.create({
    ...initialStyles,
    headerStyle: {
        ...initialStyles.container,
        paddingTop: getStatusBarHeight(true)
    }
});