/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */

import {fromJS} from 'immutable'
import {checkIfOffline} from './actions'
import {setPageFetchError, clearPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {OFFLINE_MODAL} from '../../modals/constants'
import {OFFLINE_ASSET_URL} from './constants'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
    global.fetch.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    global.fetch = realFetch
})

test('checkIfOffline dispatches setPageFetchError if network request fails', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(new TypeError('failed to fetch')))

    const fakeDispatch = jest.fn()
    const thunk = checkIfOffline()

    return thunk(fakeDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toBeCalled()
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('failed to fetch'))
        })
})

test('checkIfOffline dispatches setPageFetchError if it receives modified JSON from worker', () => {
    const mockResponse = {
        obj: {
            offline: true
        },
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const fakeGetState = () => fromJS({
        modals: undefined
    })
    const thunk = checkIfOffline()

    return thunk(fakeDispatch, fakeGetState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(1)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('Network failure, using worker cache'))
        })
})

test('checkIfOffline clears offline modal and page fetch errors when it receives untouched JSON from network', () => {
    const mockResponse = {
        obj: {},
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const fakeGetState = () => ({
        modals: fromJS({
            [OFFLINE_MODAL]: true
        })
    })
    const thunk = checkIfOffline()

    return thunk(fakeDispatch, fakeGetState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(2)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(clearPageFetchError())
            expect(fakeDispatch.mock.calls[1][0]).toEqual(closeModal(OFFLINE_MODAL, UI_NAME.offline))
        })
})
