import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer, createFirebaseInstance } from 'react-redux-firebase'
// import { reducer as formReducer } from 'redux-form';
import configureStore from './configurestore';
// import { reducer as networkReducer} from './network';


export const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    /* redux form helps forms in component maintain data over app session
     thus users don't need to re-enter form values after until the form
     is submitted. 
     Read more here: https://redux-form.com/8.2.2/docs/gettingstarted.md/
    */
    // form: formReducer,
    // app reducers
    // networkState: networkReducer
})

// approach for version 3 integration
// https://github.com/prescottprue/react-redux-firebase/issues/783
const { 
    store,
    persistor,
    reduxFirebaseProps,
    firestoreInstance 
} = configureStore(rootReducer);

const rrfProps = {
    ...reduxFirebaseProps,
    dispatch: store.dispatch,
    ...firestoreInstance
}

// create an extended firebase instance
function configureExtendedFirebase(dispatch: any) {
    const {firebase, config: rrfConfig} = reduxFirebaseProps;
    //@ts-ignore
    createFirebaseInstance(firebase, rrfConfig, dispatch);
    return firebase;
}
const extendedFirebase = configureExtendedFirebase(store.dispatch);

export { store, persistor, rrfProps, extendedFirebase }
export default store;