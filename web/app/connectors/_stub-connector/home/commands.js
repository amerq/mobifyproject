/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveHomeData} from 'progressive-web-sdk/dist/integration-manager/results'

export const initHomePage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initHomePage stub with arguments:', url, routeName)

    const exampleData = {
        banners: [{
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }, {
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }, {
            src: '//via.placeholder.com/400x200',
            alt: 'Placeholder Image'
        }]
    }

    // We need to receive the carousel data async for it to work correctly
    return Promise.resolve()
        .then(() => dispatch(receiveHomeData(exampleData)))
}
