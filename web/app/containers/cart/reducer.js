/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {setRemoveItemId, setIsWishlistComplete, setTaxRequestPending, setPromoSubmitting} from './actions'


export default handleActions({
    [setTaxRequestPending]: mergePayload,
    [setPromoSubmitting]: mergePayload,
    [setRemoveItemId]: mergePayload,
    [setIsWishlistComplete]: mergePayload
}, Immutable.Map())
