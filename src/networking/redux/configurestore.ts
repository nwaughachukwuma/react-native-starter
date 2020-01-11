import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// @ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import RNFirebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import { getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, actionTypes } from 'redux-firestore';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import AsyncStorage from "@react-native-community/async-storage";
import { Platform } from 'react-native'
// import { ClearAppDataTypes } from './clearappdata';

// redux-firebase integration
const platformDependentCred = Platform.select({
    ios: {
        appId: '1:387976712874:ios:08059c05b4e8bf7af076d3',
        apiKey: 'AIzaSyB7EOUBixPPkWrheYQP-haGzctxJMqjx-g',
    },
    android: {
        appId: '1:387976712874:android:788e94525a9bf91e',
        apiKey: 'AIzaSyDEwx73uX3M_g0AW1W7XjGtLcX3pq2jhEE',
    }
});
const reactNativeFirebaseConfig = {
    debug: true,
    ...platformDependentCred,
    projectId: 'eventsmag-dd342',
    databaseURL: "https://eventsmag-dd342.firebaseio.com",
    messagingSenderId: "387976712874",
    storageBucket: "eventsmag-dd342.appspot.com"
};

export const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
    enableClaims: true,  // we can now use userProfile.token.claims
    enableRedirectHandling: false,
    useFirestoreForProfile: true, // make false if you need to use Firebase RDB
    // For presence, am saving to user presence info in RDB path
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
    fileMetadataFactory: (uploadRes: any, firebase: any, metadata: any) => {
        // upload response from Firebase's storage upload
        firebase.database.ServerValue = RNFirebase.database.ServerValue;
        const { metadata: { name, fullPath }, downloadURL } = uploadRes
        // default factory includes name, fullPath, downloadURL
        return {
            name,
            fullPath,
            metadata,
            downloadURL
        }
    },
    onAuthStateChanged: (authData: any, firebase: any, dispatch: any) => {
        // Clear redux-firestore and some vital user info
        // state if auth does not exist (i.e logout)
        if (!authData) {
            // a centralized place to carry out clearing of app data 
            //   dispatch({ type: ClearAppDataTypes.CLEAR_APP_DATA });
        }
    }
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export default (rootReducer: any, initialState = { _persist: { version: 6, rehydrated: true }, firebase: {}, firestore: {} }) => {
   
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
        debug: true,
        keyPrefix: '',
        timeout: 2000, // null
    };
    // configure redux-firebase
    //@ts-ignore
    let firebase = RNFirebase.app() || RNFirebase.initializeApp(reactNativeFirebaseConfig);
    // Initialize other services on firebase instance
    RNFirebase.firestore();
    // firebase.functions(); // <- needed if using httpsCallable

    const composeEnhancer = compose;
    // persist reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        persistedReducer,
        initialState,
        // when using redux devtools, wrap compose in a composeEnhancer object.
        composeEnhancer(
            applyMiddleware(sagaMiddleware)
        )
    );

    const persistor = persistStore(store);

    // then run the saga
    let sagasManager = sagaMiddleware.run(rootSaga, getFirebase)
    //@ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        //@ts-ignore
        module.hot.accept(() => {
            store.replaceReducer(rootReducer);

            const newYieldedSagas = require('../sagas/index').default;
            sagasManager.cancel();
            //@ts-ignore
            sagasManager.done.then(() => {
                sagasManager = sagaMiddleware.run(newYieldedSagas);
            });
        });
    }

    const reduxFirebaseProps = {
        firebase,
        config: reduxFirebaseConfig,
    }
    
    const firestoreInstance = {
        createFirestoreInstance, // <- needed if using firestore
    }

    return { store, persistor, reduxFirebaseProps, firestoreInstance };
};
