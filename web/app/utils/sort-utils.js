/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const DOLLAR_SIGN = /\$/

// replacing $ sign with empty string to compare the price
const getPriceValue = (item) => parseFloat(item.get('price').replace(DOLLAR_SIGN, ''))

export const sortLib = {
    // sort by name
    name: (a, b) => {
        // getting name of products
        const nameA = a.get('title')
        const nameB = b.get('title')

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    },

    // sort by price
    price: (a, b) => (getPriceValue(a) - getPriceValue(b)),

    // sort by postition (default)
    position: () => 0
}
