import * as React from 'react';
import {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {withTheme} from  'react-native-paper'
import {defaultStyles} from 'utils'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import isEmpty from 'lodash.isempty'
import {ReduxState, ReduxDispatch} from 'networking/redux/types'
import DeviceInfo from 'react-native-device-info';


type Props = {

}

const styles = StyleSheet.create({
    container: {
        ...defaultStyles().container
    }
})

export const Welcome: React.FC<Props|any> = (props) => {

    // selector hooks
    const userAuth: any = useSelector((select: ReduxState) => select.firebase.auth);
    const userProfile = useSelector((select: ReduxState) => select.firebase.profile);
    const dbUsers = useSelector((select: ReduxState) => select.firestore.ordered.dbUsers);

    const {
        theme: {colors},
    } = props
    // console.log('app state is :==>>', userAuth, userProfile, dbUsers);

    let appName = DeviceInfo.getApplicationName();
    appName = appName.replace(/\w/i, char => char.toUpperCase());

    return (
        <View style={styles.container}>
            <Text style={{color: colors.text}}>
                Welcome to {appName}
            </Text>
        </View>
    )
}

const mapStateToProps = (state: ReduxState) => ({
    
})

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({

})

export default compose(
    withTheme,
    connect(
        ({firebase}: ReduxState) => ({
            userAuth: firebase.auth,
        })
    ),
    firestoreConnect((props: any) => {
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