/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getApp = createSelector(getUi, ({app}) => app)

export const getSvgSprite = createGetSelector(getApp, 'sprite')
export const getHideApp = createGetSelector(getApp, 'hideApp')

export const getCheckoutShippingURL = createGetSelector(getApp, 'checkoutShippingURL')
export const getCartURL = createGetSelector(getApp, 'cartURL')
