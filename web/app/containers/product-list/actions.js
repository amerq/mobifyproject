/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getCurrentPathKey} from 'progressive-web-sdk/dist/store/app/selectors'

export const changeSelectedSort = createAction('Change Selected Sort Order')

export const changeSort = (sort) => (dispatch, getState) => {
    dispatch(changeSelectedSort({
        [getCurrentPathKey(getState())]: {sort}
    }))
}
