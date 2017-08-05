/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as utils from '../utils'
import {
    receiveNavigationData,
    receiveSearchSuggestions,
    setLoggedIn,
    setCheckoutShippingURL,
    setCartURL
} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveUserEmail} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {parseCategories, parseSearchSuggestions} from '../parsers'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {getSignInURL, getCheckoutShippingURL, getCartURL, buildSearchURL} from '../config'
import {SIGNED_IN_NAV_ITEM_TYPE, GUEST_NAV_ITEM_TYPE} from '../../../modals/navigation/constants'


export const fetchNavigationData = () => (dispatch) => {
    return utils.makeUnAuthenticatedApiRequest('/categories/root?levels=2', {method: 'GET'})
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = parseCategories(categories)

            const accountNode = utils.isUserLoggedIn(utils.getAuthToken())
                ? {
                    title: 'Sign Out',
                    type: SIGNED_IN_NAV_ITEM_TYPE
                }
                : {
                    title: 'Sign In',
                    type: GUEST_NAV_ITEM_TYPE
                }

            // Long story. The nav system ignores the `path` property when the user is
            // logged in. Until we rework this, we always send the login path so the
            // reducer in the `containers/navigation/` area can just flip the account
            // node type and title and not worry about switching/adding/deleting the
            // `path` attribute.
            // See also `modals/navigation/container.jsx`'s `itemFactory()` function.
            accountNode.path = getSignInURL()

            return dispatch(receiveNavigationData({
                path: '/',
                root: {
                    title: 'root',
                    path: '/',
                    children: [
                        accountNode,
                        ...navData
                    ]
                }
            }))
        })
}

export const getSearchSuggestions = (query) => (dispatch) => {
    // SFCC API requires min length of 3
    if (query.length < 3) {
        return dispatch(receiveSearchSuggestions(null))
    }
    const queryURL = `/search_suggestion?q=${query}`
    return utils.makeApiRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const searchProducts = (query) => (dispatch) => {
    browserHistory.push({pathname: buildSearchURL(query)})
}

export const initApp = () => (dispatch) => {
    return utils.initSfccAuthAndSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            const customerData = utils.getCustomerData(utils.getAuthToken())
            dispatch(setCheckoutShippingURL(getCheckoutShippingURL()))
            dispatch(setCartURL(getCartURL()))
            if (!customerData.guest) {
                dispatch(setLoggedIn(true))
                return utils.makeApiRequest(`/customers/${customerData.customer_id}`, {method: 'GET'})
                    .then((response) => response.json())
                    .then(({email}) => {
                        return dispatch(receiveUserEmail(email))
                    })
            }

            return dispatch(setLoggedIn(false))
        })
}
