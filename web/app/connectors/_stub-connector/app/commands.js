/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {setPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'

import {getCart} from '../cart/commands'

import {
    receiveNavigationData,
    setCartURL
} from 'progressive-web-sdk/dist/integration-manager/results'

/**
 * When the user first lands on the site, the response from the desktop site is saved
 * This function allows you to get that response
 * You will only need to use this function if you're using HTML scraping as your back end
 */
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

/**
 * This function is used to fetch data from a desktop page
 * You will only need to use this function if you're using HTML scraping as your back end
 */
export const fetchPageData = (url) => (dispatch) => {
    const request = isInitialEntryToSite ? requestCapturedDoc() : makeRequest(url)
    isInitialEntryToSite = false

    return request
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res

            // Add global actions here

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

export const initApp = () => (dispatch) => {
    console.log('[Stub Connector] Called initApp stub')

    const exampleNavigationData = {
        path: '/',
        root: {
            title: 'Root',
            path: '/',
            children: [{
                title: 'Category 1',
                path: '/potions.html'
            }, {
                title: 'Category 2',
                path: '/books.html'
            }, {
                title: 'Category 3',
                path: '/ingredients.html'
            }]
        }
    }

    // For more information on the shape of the expected data,
    // see https://docs.mobify.com/progressive-web/latest/components/#!/Nav
    dispatch(receiveNavigationData(exampleNavigationData))
    dispatch(getCart())
    dispatch(setCartURL('/checkout/cart/'))
    return Promise.resolve()
}
