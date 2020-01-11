/**
 * created on 10-01-2020
 */

import {createFirebaseInstance} from 'react-redux-firebase';
import {reduxFirebaseConfig as rrfConfig} from './configurestore'

export default function configureExtendedFirebase(dispatch: any, firebase: any) {
  // const firebase = RNFirebase.app();
  //@ts-ignore
  createFirebaseInstance(firebase, rrfConfig, dispatch);

  return firebase;
}