import { combineReducers } from 'redux';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { firebaseReducer, createFirebaseInstance } from 'react-redux-firebase'
// import { reducer as formReducer } from 'redux-form';
import configureStore from './configurestore';
// import { reducer as networkReducer} from './network';


export const reducers = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    /* redux for helps forms in component maintain data over app session
     thus users don't need to re-enter form values after until the form
     is submitted. 
     Read more here: https://redux-form.com/8.2.2/docs/gettingstarted.md/
    */
    // form: formReducer,
    // app reducers
    // networkState: networkReducer
})

export const rootReducer = reducers;

// approach for version 3 integration
// https://github.com/prescottprue/react-redux-firebase/issues/783
const { 
    store,
    persistor,
    reduxFirebaseProps,
    firestoreInstance 
} = configureStore(rootReducer);

export interface ReduxState {
    firestore: any,
    firebase: any,
}
export type ReduxDispatch = typeof store.dispatch

const rrfProps = {
    ...reduxFirebaseProps,
    dispatch: store.dispatch,
    ...firestoreInstance
    //createFirestoreInstance // <- needed if using firestore
}

export function configureExtendedFirebase(dispatch: any) {
    const {firebase, config: rrfConfig} = reduxFirebaseProps;
    //@ts-ignore
    createFirebaseInstance(firebase, rrfConfig, dispatch);
    return firebase;
}
// create an extended firebase instance
const extendedFirebase = configureExtendedFirebase(store.dispatch);

export { store, persistor, rrfProps, extendedFirebase }
export default store;