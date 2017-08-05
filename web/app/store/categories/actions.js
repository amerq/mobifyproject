/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getCurrentPathKey} from 'progressive-web-sdk/dist/store/app/selectors'
import {getSelectedCategory} from './selectors'

export const changeFilter = createAction('Change Filter')

export const changeFilterTo = (filterQuery) => (dispatch, getStore) => {
    const currentState = getStore()
    const categoryData = getSelectedCategory(currentState).toJS()

    categoryData.filters.forEach((filter) =>
        filter.kinds.forEach((kind) => {
            kind.active = kind.query === filterQuery
        })
    )

    const newCategories = {[getCurrentPathKey(currentState)]: categoryData}
    dispatch(changeFilter(newCategories))
}
