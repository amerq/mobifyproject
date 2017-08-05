/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCart = createSelector(getUi, ({cart}) => cart)
export const getRemoveItemID = createGetSelector(getCart, 'removeItemId')
export const getIsWishlistAddComplete = createGetSelector(getCart, 'isWishlistAddComplete')
export const isTaxRequestPending = createGetSelector(getCart, 'taxRequestPending')
export const isPromoSubmitting = createGetSelector(getCart, 'promoSubmitting')
