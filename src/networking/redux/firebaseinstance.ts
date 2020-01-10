/**
 * Updated on 24-11-2019
 */

import RNFirebase from '@react-native-firebase/app';
import {createFirebaseInstance} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import {reduxFirebaseConfig} from './configurestore'

export default function configureExtendedFirebase(dispatch: any) {
  const rrfConfig = reduxFirebaseConfig
  const firebase = RNFirebase.app();

  //@ts-ignore
  createFirebaseInstance(firebase, rrfConfig, dispatch);
  //@ts-ignore
  createFirestoreInstance(firebase, rrfConfig, dispatch);

  return firebase;
}