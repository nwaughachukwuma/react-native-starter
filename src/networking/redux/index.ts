import { combineReducers } from 'redux';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
// import { reducer as formReducer } from 'redux-form';
import configureStore from './configurestore';
import configureExtendedFirebase from './firebaseinstance'
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
    reduxFirebaseProps 
} = configureStore(rootReducer);

const rrfProps = {
    ...reduxFirebaseProps,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

// create extended firebase instance
const extendedFirebase = configureExtendedFirebase(store.dispatch);

export { store, persistor, rrfProps, extendedFirebase }

export default store;