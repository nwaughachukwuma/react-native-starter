import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'
import {withTheme} from  'react-native-paper'
import {defaultStyles} from 'utils'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase'
import isEmpty from 'lodash.isempty'
import {ReduxState, ReduxDispatch} from 'networking/redux'


type Props = {

}

const styles = StyleSheet.create({
    container: {
        ...defaultStyles().container
    }
})

export const Welcome: React.FC<Props|any> = (props) => {

    const {
        theme: {colors},
        userProfile,
        userAuth,
        users
    } = props
    const _users = React.useCallback(
        async () => {
            return await Promise.resolve(setTimeout(()=> console.log('hey'), 1000));
        }, []
    )
    console.log('app state is :==>>', userProfile, userAuth, users);
    _users()
    return (
        <View style={styles.container}>
            <Text style={{color: colors.text}}>
                Welcome to Events Magazine
            </Text>
        </View>
    )
}

const mapStateToProps = (state: ReduxState) => {

    const {firestore, firebase} = state;
    return {
        userAuth: firebase.auth,
        userProfile: firebase.profile,
        users: {} // firestore.ordered['usersCol']
    }
}

const mapDispatchToProps = (dispatch: ReduxDispatch) => ({

})

export default compose(
    withTheme,
    connect(
        ({firebase}: ReduxState) => ({
            userAuth: firebase.auth,
        })
    ),
    // firestoreConnect(props => {
    //     if (isEmpty(props.userAuth)) return [];

    //     return [
    //         {
    //             collection: 'users',
    //             storeAs: 'usersCol'
    //         }
    //     ]
    // }),
    connect(mapStateToProps, mapDispatchToProps),
)(Welcome)