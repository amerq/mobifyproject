/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {buildQueryString} from '../../utils/utils'


export const CHECKOUT_SHIPPING_URL = '/checkout/'
export const CART_URL = '/checkout/cart/'
export const PAYMENT_URL = '/checkout/payment/'
export const CREATE_ACCOUNT_POST_URL = '/customer/account/createpost/'
export const LOGIN_POST_URL = '/customer/account/loginPost/'

export const buildQueryURL = (query) => `/search/ajax/suggest/?q=${buildQueryString(query)}&_=${Date.now()}`
export const buildSearchURL = (query) => `/catalogsearch/result/?q=+${buildQueryString(query)}`

// configuration is not currently used by the Merlin's connector
let config = {} // eslint-disable-line

export const registerConfig = (cfg) => {
    config = cfg
}
