/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const isEmailAvailable = (email) => (dispatch) => {
    return makeJsonEncodedRequest(
            '/rest/default/V1/customers/isEmailAvailable',
            {customerEmail: email},
            {method: 'POST'}
        )
        .then((response) => response.text())
        .then((responseText) => {
            return /true/.test(responseText)
        })
}
