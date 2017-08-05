/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCheckoutPayment = createSelector(getUi, ({checkoutPayment}) => checkoutPayment)

export const getIsFixedPlaceOrderShown = createGetSelector(getCheckoutPayment, 'isFixedPlaceOrderShown')

export const getHasExistingCreditCard = createGetSelector(getCheckoutPayment, 'hasExistingCreditCard')

export const getIsNewCardInputSelected = createGetSelector(getCheckoutPayment, 'isNewCardInputSelected')

export const getIsCompanyOrAptShown = createGetSelector(getCheckoutPayment, 'isCompanyOrAptShown')

export const getNewShippingAddressIsEnabled = createGetSelector(getCheckoutPayment, 'newShippingAddressIsEnabled')

export const getCvvType = createGetSelector(getCheckoutPayment, 'cvvType')

export const getIsLoading = createGetSelector(getCheckoutPayment, 'isLoading')
