/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {receiveHomeData} from 'progressive-web-sdk/dist/integration-manager/results'

export const initHomePage = () => (dispatch) => {
    // Banners are being pulled from the bundle right now
    // so we just need an array with the correct number of objects
    dispatch(receiveHomeData({banners: [{}, {}, {}]}))
    return Promise.resolve()
}
