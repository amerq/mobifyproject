/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

import {getIsLoggedIn} from '../../store/user/selectors'

export const getIntegrationManager = ({integrationManager}) => integrationManager
export const getCustomerEntityID = createGetSelector(getIntegrationManager, 'customerEntityID', '')
export const getFormKey = createGetSelector(getIntegrationManager, 'formKey')
export const getFormInfo = createGetSelector(getIntegrationManager, 'formInfo', Immutable.Map())
export const getFormInfoByPathKey = (pathKey) => createGetSelector(getFormInfo, pathKey, Immutable.Map())
export const getFormInfoByProductId = (id) => createGetSelector(getFormInfo, id, Immutable.Map())
export const getUenc = (pathKey) => createGetSelector(getFormInfoByPathKey(pathKey), 'uenc')

export const getCartBaseUrl = createSelector(
    getIsLoggedIn,
    getCustomerEntityID,
    (isLoggedIn, entityID) => `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}`
)
