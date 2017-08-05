/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// Based on the example here: http://redux-form.com/6.0.1/examples/normalizing/
export const normalizePhone = (value, previousValue) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/^1|\D/g, '')

    const areaCode = onlyNums.slice(0, 3)
    const exchange = onlyNums.slice(3, 6)
    const lineNumber = onlyNums.slice(6, 10)

    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 3) {
            return `(${areaCode}) `
        }

        if (onlyNums.length === 6) {
            return `(${areaCode}) ${exchange}-`
        }
    }

    if (onlyNums.length <= 3) {
        return `(${areaCode}`
    }

    if (onlyNums.length <= 6) {
        return `(${areaCode}) ${exchange}`
    }

    return `(${areaCode}) ${exchange}-${lineNumber}`
}
