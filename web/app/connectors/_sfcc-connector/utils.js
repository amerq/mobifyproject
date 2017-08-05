/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {isSessionStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

import {getApiEndPoint, getRequestHeaders} from './config'

const AUTH_KEY_NAME = 'mob-auth'
const BASKET_KEY_NAME = 'mob-basket'

const setCookieValue = (keyName, value) => {
    document.cookie = `${keyName}=${value}`
}

const getCookieValue = (keyName) => {
    const cookieRegex = new RegExp(`${keyName}=([^;]+);`)
    const cookieMatch = cookieRegex.exec(document.cookie)

    return cookieMatch ? cookieMatch[1] : ''
}

const removeCookieValue = (keyName) => {
    document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

const setItemInBrowserStorage = (keyName, value) => {
    // Use session storage if it's supported
    if (isSessionStorageAvailable()) {
        window.sessionStorage.setItem(keyName, value)
    } else {
        // Use Cookies otherwise
        setCookieValue(keyName, value)
    }
}

const getItemFromBrowserStorage = (keyName) => {
    if (isSessionStorageAvailable()) {
        return window.sessionStorage.getItem(keyName)
    }

    return getCookieValue(keyName)
}

const removeItemFromBrowserStorage = (keyName) => {
    if (isSessionStorageAvailable()) {
        window.sessionStorage.removeItem(keyName)
    } else {
        removeCookieValue(keyName)
    }
}

export const storeAuthToken = (authorization) => {
    if (authorization) {
        setItemInBrowserStorage(AUTH_KEY_NAME, authorization)
    }
}

export const getAuthToken = () => {
    return getItemFromBrowserStorage(AUTH_KEY_NAME)
}

export const deleteAuthToken = () => {
    removeItemFromBrowserStorage(AUTH_KEY_NAME)
}

export const deleteBasketID = () => {
    removeItemFromBrowserStorage(BASKET_KEY_NAME)
}

export const getBasketID = () => {
    return getItemFromBrowserStorage(BASKET_KEY_NAME)
}

export const storeBasketID = (basketID) => {
    if (basketID === undefined) {
        throw new Error('Storing basketID that is undefined!!')
    }

    setItemInBrowserStorage(BASKET_KEY_NAME, basketID)
}

export const getAuthTokenPayload = (authToken) => {
    if (!authToken) {
        authToken = getAuthToken().replace('Bearer ', '')
    }
    // The token consists of 3 parts: header, payload and signature
    // separated by a '.', each part is encoded
    // we only need the payload
    return JSON.parse(window.atob(authToken.split('.')[1]))
}

export const getCustomerData = (authorization) => {
    const {sub} = getAuthTokenPayload(authorization)
    const subData = JSON.parse(sub)
    return subData.customer_info
}

export const isUserLoggedIn = (authorization) => {
    try {
        return !getCustomerData(authorization).guest
    } catch (e) {
        console.log('Error checking if user is logged in. Assuming `false`', e)
        return false
    }
}

export const initSfccSession = (authorization) => {
    const options = {
        method: 'POST',
        body: '{ type : "session" }',
        headers: {
            ...getRequestHeaders(),
            Authorization: authorization
        }
    }
    return makeRequest(`${getApiEndPoint()}/sessions`, options)
        .then(() => {
            // Once the session has been opened return the authorization headers to the next request
            return options.headers
        })
}

export const initSfccAuthAndSession = () => {
    const authorizationToken = getAuthToken()
    if (authorizationToken) {
        const {exp} = getAuthTokenPayload(authorizationToken.replace('Bearer ', ''))
        // Get current Unix time in seconds (not milliseconds)
        const currentTime = Math.floor(Date.now() / 1000)
        if (currentTime <= exp) {
            // The token is still valid
            return Promise.resolve({
                ...getRequestHeaders(),
                Authorization: authorizationToken
            })
        }
        // The token has expired, refresh it
        const requestOptions = {
            method: 'POST',
            body: '{ type : "refresh" }',
            headers: {
                ...getRequestHeaders(),
                Authorization: authorizationToken
            }
        }
        return makeRequest(`${getApiEndPoint()}/customers/auth`, requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    // The server did not accept the token, start from scratch
                    deleteAuthToken()
                    return initSfccAuthAndSession()
                }

                const authorizationToken = response.headers.get('Authorization')
                storeAuthToken(authorizationToken)
                return {
                    ...getRequestHeaders(),
                    Authorization: authorizationToken
                }
            })
    }
    const options = {
        method: 'POST',
        body: '{ type : "guest" }',
        headers: getRequestHeaders()
    }
    let authorization
    return makeRequest(`${getApiEndPoint()}/customers/auth`, options)
        .then((response) => {
            authorization = response.headers.get('Authorization')
            storeAuthToken(authorization)
            return initSfccSession(authorization)
        })
}

export const makeApiRequest = (path, options) => {
    return initSfccAuthAndSession()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return makeRequest(getApiEndPoint() + path, requestOptions)
        })
}

export const makeApiJsonRequest = (path, body, options) => {
    return makeApiRequest(path, {
        ...options,
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
}

export const checkForResponseFault = (responseJSON) => {
    if (responseJSON.fault) {
        throw new Error(responseJSON.fault.message)
    }
    return responseJSON
}

export const makeUnAuthenticatedApiRequest = (path, options) => {
    const requestOptions = {
        ...options,
        headers: getRequestHeaders()
    }
    return makeRequest(getApiEndPoint() + path, requestOptions)
}

export const formatPrice = (price) => {
    if (!price) {
        price = 0
    }
    return `$${price.toFixed(2)}`
}
