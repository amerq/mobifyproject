/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {changeSelectedSort} from './actions'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'

const productListReducer = handleActions({
    [changeSelectedSort]: mergePayload
}, Immutable.Map())

export default productListReducer
