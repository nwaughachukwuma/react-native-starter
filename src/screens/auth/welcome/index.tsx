import * as React from 'react';
import {useEffect} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import {withTheme} from  'react-native-paper'
import {defaultStyles} from 'utils'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase'
import isEmpty from 'lodash.isempty'
import {ReduxState, ReduxDispatch} from 'networking/redux/types'


type Props = {

}

const styles = StyleSheet.create({
    container: {
        ...defaultStyles().container
    }
})

export const Welcome: React.FC<Props|any> = (props) => {

    // select
    const userAuth: any = useSelector((select: ReduxState) => select.firebase.auth);
    const userProfile = useSelector((select: ReduxState) => select.firebase.profile);
    const dbUsers = useSelector((select: ReduxState) => select.firestore.ordered.dbUsers);

    const {
        theme: {colors},
    } = props
    const _users = React.useCallback(
        async () => {
            return await Promise.resolve(setTimeout(()=> console.log('hey'), 1000));
        }, []
    )
    console.log('app state is :==>>', userProfile, userAuth, dbUsers);
    _users()
    return (
        <View style={styles.container}>
            <Text style={{color: colors.text}}>
                Welcome to Events Magazine
            </Text>
        </View>
    )
}

const mapStateToProps = (state: ReduxState) => ({
    users: state.firestore.ordered['usersCol']
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