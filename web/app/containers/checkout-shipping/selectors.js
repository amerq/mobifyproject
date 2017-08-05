/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCheckoutShipping = createSelector(getUi, ({checkoutShipping}) => checkoutShipping)

export const getIsCompanyOrAptShown = createGetSelector(getCheckoutShipping, 'isCompanyOrAptShown')

export const getCustomerEmailRecognized = createGetSelector(getCheckoutShipping, 'customerEmailRecognized')

export const getEmailError = createGetSelector(getCheckoutShipping, 'emailError')

export const getShowAddNewAddress = createGetSelector(getCheckoutShipping, 'showAddNewAddress')
