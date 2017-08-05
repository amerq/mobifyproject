/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCheckoutConfirmation = createSelector(getUi, ({checkoutConfirmation}) => checkoutConfirmation)

export const getIsRegistrationFormHidden = createGetSelector(getCheckoutConfirmation, 'isRegistrationFormHidden')
export const getConfirmationData = createGetSelector(getCheckoutConfirmation, 'confirmationData', Immutable.Map())

export const getOrderNumber = createGetSelector(getConfirmationData, 'orderNumber')

export const getOrderUrl = createGetSelector(getCheckoutConfirmation, 'orderUrl')
