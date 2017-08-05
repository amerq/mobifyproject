/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {
    receiveCategoryInformation,
    receiveCategoryContents
} from 'progressive-web-sdk/dist/integration-manager/categories/results'
import {changeFilter} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [receiveCategoryInformation]: mergePayload,
    [receiveCategoryContents]: mergePayload,
    [changeFilter]: mergePayload,
}, initialState)

export default categoryReducer
