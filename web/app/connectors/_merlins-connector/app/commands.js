/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {parseLoginStatus, parseSearchSuggestions} from './parser'
import {parseNavigation} from '../navigation/parser'
import {receiveFormKey} from '../actions'
import {CHECKOUT_SHIPPING_URL, CART_URL, buildQueryURL, buildSearchURL} from '../config'
import {getCookieValue} from '../../../utils/utils'
import {generateFormKeyCookie} from '../../../utils/magento-utils'
import {setPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'


import {
    receiveNavigationData,
    receiveSearchSuggestions,
    setCheckoutShippingURL,
    setCartURL,
    setLoggedIn
} from 'progressive-web-sdk/dist/integration-manager/results'

const requestCapturedDoc = () => {
    return window.Progressive.capturedDocHTMLPromise.then((initialCapturedDocHTML) => {
        const body = new Blob([initialCapturedDocHTML], {type: 'text/html'})
        const capturedDocResponse = new Response(body, {
            status: 200,
            statusText: 'OK'
        })

        return Promise.resolve(capturedDocResponse)
    })
}

let isInitialEntryToSite = true

export const fetchPageData = (url) => (dispatch) => {
    const request = isInitialEntryToSite ? requestCapturedDoc() : makeRequest(url)
    isInitialEntryToSite = false

    return request
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            const isLoggedIn = parseLoginStatus($response)
            dispatch(setLoggedIn(isLoggedIn))
            dispatch(receiveNavigationData(parseNavigation($, $response, isLoggedIn)))
            return res
        })
        .catch((error) => {
            console.info(error.message)
            if (error.name !== 'FetchError') {
                throw error
            } else {
                dispatch(setPageFetchError(error.message))
            }
        })
}

export const getSearchSuggestions = (query) => (dispatch) => {
    // Mimic desktop behaviour, only make request search when query is 2 characters or more.
    // Empty list if less than 2 characters
    if (query.length < 2) {
        return dispatch(receiveSearchSuggestions(null))
    }

    const queryURL = buildQueryURL(query)
    return makeRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const searchProducts = (query) => (dispatch) => {
    browserHistory.push({pathname: buildSearchURL(query)})
}


export const initApp = () => (dispatch) => {
    // Use the pre-existing form_key if it already exists
    const formKey = getCookieValue('form_key') || generateFormKeyCookie()
    dispatch(receiveFormKey(formKey))

    dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
    return dispatch(setCartURL(CART_URL))
}
