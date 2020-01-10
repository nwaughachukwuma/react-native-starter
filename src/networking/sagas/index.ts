// Sagas are useful in any case where we need to connect the
// App to a 3rd party directly without leveraging cloud functions.
// read more about redux-saga here: https://github.com/redux-saga/redux-saga

import {
    all, 
    takeLatest,
    throttle
    // takeEvery,
  } from 'redux-saga/effects';
  
  /* ------------- Types ------------- 
  bring in the types from redux
  */
//   import { NetworkTypes } from 'app-redux/network'
  
  /* ------------- Sagas ------------- 
  bring in the saga functions
  */
  
//   import { checkNetwork } from './network'
  
  
  // We call the API function here and pass it along to the sagas.
  /* ------------- Connect Types To Sagas ------------- */
  
  export default function* root(getFirebase: any) {
    // note that getFirebase is not necessary in all the generator function calls. 
    // It kinda just turned into a pattern for me - @chuks
  
    yield all([
        // takeLatest(
        //   NetworkTypes.CHECK_NETWORK,
        //   checkNetwork
        // ),
    ])
  }
  