/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {fetchPageData} from '../app/commands'
import homeParser from './parser'
import {receiveHomeData} from 'progressive-web-sdk/dist/integration-manager/results'

export const initHomePage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveHomeData(homeParser($, $response)))
        })
}
