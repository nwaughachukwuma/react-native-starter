/**
 * created on 10-01-2020
 */

import {rootReducer, store} from './index'


export type ReduxState = ReturnType<typeof rootReducer>
export type ReduxDispatch = ReturnType<typeof store.dispatch>