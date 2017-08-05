/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

import app from './app/reducer'
import cart from './cart/reducer'
import checkoutConfirmation from './checkout-confirmation/reducer'
import checkoutPayment from './checkout-payment/reducer'
import checkoutShipping from './checkout-shipping/reducer'
import footer from './footer/reducer'
import header from './header/reducer'
import home from './home/reducer'
import login from './login/reducer'
import navigation from '../modals/navigation/reducer'
import productDetails from './product-details/reducer'
import productList from './product-list/reducer'

const uiReducer = combineReducers({
    app,
    cart,
    checkoutConfirmation,
    checkoutPayment,
    checkoutShipping,
    footer,
    header,
    home,
    login,
    navigation,
    productDetails,
    productList
})

export default uiReducer
