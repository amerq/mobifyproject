/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction as createReduxAction} from 'redux-actions'

/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) =>
/* istanbul ignore next */
    () => fn()

/**
 * Returns a path given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the `path` and `search` concatenated together
 */
export const getPath = ({pathname, search}) => pathname + search

/**
 * Returns a full URL given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the full URL for the given location
 */
export const getURL = (location) =>
    window.location.origin + getPath(location)


// Regex courtesy of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export const getCookieValue = (cookieName) => {
    const result = document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')
    return result
}

export const splitFullName = (fullname) => {
    let names = fullname.trim().split(' ')

    // filter out any empty strings
    names = names.filter((name) => name)

    return {
        firstname: names.slice(0, 1).join(' '),
        lastname: names.slice(1).join(' ')
    }
}

/**
 * Currently requestIdleCallback is only supported in Chrome,
 * TODO: We'll have to provide a fallback for iOS Safari
 * https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 * http://caniuse.com/#feat=requestidlecallback
 */
export const requestIdleCallback = (fn) => {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(fn)
    } else {
        return setTimeout(() => fn(), 1)
    }
}

export const typecheck = (type, value) => {
    try {
        type.check(value)
    } catch (e) {
        console.error('Type check failed: ', e, '\n\nValue: ', value)
    }
    return value
}

/**
 * Create an action creator that typechecks its argument.
 *
 * The action creator argument is passed unchanged as the payload if
 * no key is passed, while if a key is provided the action creator
 * argument is wrapped in an object under that key. This allows the
 * action to set a specific key within the Redux store using mergePayload.
 *
 * @param description {string} The description of the action (seen in dev tools)
 * @param type {Runtype} The type to check the action argument against
 * @param key {string} (optional) The key in the store to set with the payload
 * @returns {function} The action creator.
 */
export const createTypedAction = (description, type, key) => createReduxAction(
    description,
    key
        ? (payload) => { return {[key]: typecheck(type, payload)} }
        : (payload) => typecheck(type, payload)
)

export const buildQueryString = (query) => {
    return query.replace(/ /g, '+')
}

export const validateFullName = (fullName) => {
    return /\w+\s+\w+/.test(fullName)
}

/**
 * Checks to see if a credit card has expired given the expiry date.
 *
 * @param ccExpiry {string} expects a numeric string with the format "mmyy"
 */
export const validateCCExpiry = (ccExpiry) => {
    // Expects 'mmyy' format
    if (ccExpiry.length !== 4) {
        return false
    }
    const today = new Date()
    const thisMonth = today.getMonth() + 1 // month indexing begins at 0
    const thisYear = today.getFullYear() % 100
    const expMonth = parseInt(ccExpiry.substring(0, 2))
    const expYear = parseInt(ccExpiry.substring(2))

    if (thisYear > expYear) {
        return false
    } else if (thisYear === expYear && expMonth < thisMonth) {
        return false
    } else {
        return true
    }
}

// Luhn Checksum Algorithm - CC validation
// https://en.wikipedia.org/wiki/Luhn_algorithm
export const validateCCNumber = (ccNumber) => {
    // Only allow for numbers spaces as input
    if (/[^0-9-\s]+/.test(ccNumber)) {
        return false
    }
    // Sanitize the input
    ccNumber = ccNumber.replace(/\D/g, '')

    let checkSum = 0
    let isCheckDigit = false
    for (let i = ccNumber.length - 1; i >= 0; i--) {
        let currentDigit = parseInt(ccNumber.charAt(i), 10)

        if (isCheckDigit) {
            currentDigit = (currentDigit *= 2) > 9
                ? currentDigit -= 9
                : currentDigit
        }
        checkSum += currentDigit
        isCheckDigit = !isCheckDigit
    }

    return checkSum !== 0 && (checkSum % 10) === 0
}
