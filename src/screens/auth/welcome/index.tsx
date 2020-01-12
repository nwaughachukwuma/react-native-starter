import * as React from 'react';
import {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {withTheme} from  'react-native-paper'
import {defaultStyles} from 'utils'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import isEmpty from 'lodash.isempty'
import {
    ReduxState, 
    ReduxDispatch, 
    ReduxProps
} from 'networking/redux/types'
import DeviceInfo from 'react-native-device-info';
import Button from 'components/buttons'
import {
    NavigationScreenProp, 
    NavigationState, 
    NavigationParams
} from 'react-navigation'
import {authSelector} from 'networking/reselect'
  

type Props = {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const styles = StyleSheet.create({
    container: {
        ...defaultStyles().container
    }
})

export const Welcome: React.FC<Props|any> = (props) => {

    // selector hooks
    const userProfile: object = useSelector((select: ReduxState) => select.firebase.profile);
    const dbUsers: object[] = useSelector((select: ReduxState) => select.firestore.ordered.dbUsers);

    const {
        navigation,
        theme: {colors},
        userAuth
    } = props
    // console.log('app state is :==>>', userAuth, userProfile, dbUsers);

    let appName = DeviceInfo.getApplicationName();
    appName = appName.replace(/\w/i, char => char.toUpperCase());

    return (
        <View style={styles.container}>
            <Text style={{color: colors.text, fontSize: 20}}>
                Welcome to {appName}
            </Text>
            <Button
                mode="outline"
                onPress={() => {
                    navigation.navigate('Home')
                }}
            >
                Go to App
            </Button>
        </View>
    )
}

const mapStateToProps = (state: ReduxState) => ({
    
})

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({

})

// use react redux populate
export default compose(
    withTheme,
    connect(
        (state: ReduxState) => ({
            userAuth: authSelector(state),
        })
    ),
    firestoreConnect((props: ReduxProps) => {
        if (isEmpty(props.userAuth)) return [];
        return [
            {
                collection: 'users',
                storeAs: 'dbUsers'
            }
        ]
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(Welcome)