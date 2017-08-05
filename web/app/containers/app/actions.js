/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */

import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {logout} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {setPageFetchError, clearPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'

import {OFFLINE_ASSET_URL} from './constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {OFFLINE_MODAL} from '../../modals/constants'

export const updateSvgSprite = createAction('Updated SVG sprite', ['sprite'])
export const toggleHideApp = createAction('Toggling the hiding of App', ['hideApp'])


/**
 * Make a separate request that is intercepted by the worker. The worker will
 * return a JSON object where `{offline: true}` if the request failed, which we
 * can use to detect if we're offline.
 */
export const checkIfOffline = () => (dispatch, getState) => {
    // we need to cachebreak every request to ensure we don't get something
    // stale from the disk cache on the device - the CDN will ignore query
    // parameters for this asset, however
    return fetch(`${OFFLINE_ASSET_URL}?${Date.now()}`, {
        cache: 'no-store'
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.offline) {
                dispatch(setPageFetchError('Network failure, using worker cache'))
            } else {
                dispatch(clearPageFetchError())

                if (isModalOpen(OFFLINE_MODAL)(getState())) {
                    dispatch(closeModal(OFFLINE_MODAL, UI_NAME.offline))
                }
            }
        })
        .catch((error) => {
            // In cases where we don't have the worker installed, this means
            // we indeed have a network failure, so switch on offline
            dispatch(setPageFetchError(error.message))
        })
}

/**
 * Until the day that the `use` element's cross-domain issues are fixed, we are
 * forced to fetch the SVG Sprite's XML as a string and manually inject it into
 * the DOM. See here for details on the issue with `use`:
 * @URL: https://bugs.chromium.org/p/chromium/issues/detail?id=470601
 */
export const fetchSvgSprite = () => (dispatch) => {
    const spriteUrl = getAssetUrl('static/svg/sprite-dist/sprite.svg')
    return makeRequest(spriteUrl)
        .then((response) => response.text())
        .then((text) => dispatch(updateSvgSprite(text)))
}


export const signOut = () => (dispatch) => (
    dispatch(logout()).then(() => {
        // Desktop's message includes 'redirect to home page' message
        // so we'll just hardcode a message instead
        dispatch(addNotification(
            'signedOutNotification',
            'You are now signed out'
        ))
    })
)

export const cartExpired = () => (dispatch) => {
    // navigate to homepage, show notification
    browserHistory.push({
        pathname: '/'
    })
    dispatch(addNotification(
        'cartUpdateError',
        'Your cart has expired.',
        true
    ))
}

export const handleCartExpiryError = (error) => (dispatch) => {
    if (error.message.includes('expired')) {
        return dispatch(cartExpired())
    }
    throw error
}
