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
import {firebaseConfig} from 'utils'
// import { ClearAppDataTypes } from './clearappdata';

// redux-firebase integration
const reactNativeFirebaseConfig = {
    debug: true,
    ...firebaseConfig
};

// read more on how to configure the wrapper: https://react-redux-firebase.com
export const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
    enableClaims: true,  // we can now use userProfile.token.claims
    enableRedirectHandling: false,
    useFirestoreForProfile: true, // make false if you need to use Firebase RDB
    // For presence, am saving to user presence info in RDB path
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
    // this handler is useful when uploading files to firebase storage, 
    // as it exposes useful metadata 
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
        // Clear redux-firestore and other vital user/app info
        if (!authData) { // (i.e. on logout)
            // dispatch({ type: ClearAppDataTypes.CLEAR_APP_DATA });
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
        timeout: 2000, // 0 || null
    };
    //@ts-ignore
    let firebase = RNFirebase.app() || RNFirebase.initializeApp(reactNativeFirebaseConfig);
    // Initialize other services on firebase instance
    RNFirebase.firestore();
    // RNFirebase.functions(); // <- needed if using httpsCallable

    const composeEnhancer = compose; 
    // when using redux devtools: const composeEnhancer = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // persist reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        persistedReducer,
        initialState,
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
