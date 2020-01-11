import {createSelector} from 'reselect'
import get from 'lodash.get'

// auth
export const authSelector = createSelector(
    state => get(state, 'firebase.auth'),
    auth => auth
)
// profile
export const profileSelector = createSelector(
    state => get(state, 'firebase.profile'),
    profile => profile
)