// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
// /* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUser} from '../../store/selectors'

export const getIsLoggedIn = createGetSelector(getUser, 'isLoggedIn')

export const getUserCustomContent = createGetSelector(getUser, 'custom', Immutable.Map())
