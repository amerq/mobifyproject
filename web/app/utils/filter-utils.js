/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const NON_FLOAT_REGEX = /[^\d.]/g

const RULESETS = {
    price: (item, range) => {
        const price = parseFloat(item.get('price').replace(NON_FLOAT_REGEX, ''))
        return price >= range.floor && price <= range.ceiling
    },
    // insert more rules when applicable
}


/**
 * evaluate - Used to verify whether an object meets the criteria of a ruleset.
 * For example, whether an object has a color prop of a certain alue. A more
 * specific example:
 *
 *     evaluate({ color: 'red' }, 'color', 'blue') // => false
 *     evaluate({ color: 'red' }, 'color', 'red') // => true
 *
 * @param {object} item - The object whose properties will be evaluated.
 * @param {string} ruleset - The identifier for which filtering ruleset will be
 *        used in the evaluation. See RULESETS above for available options.
 * @param {string|object} criteria - The value with which the item object must
 *        meet according to the ruleset in order to be valid. The criteria's
 *        exact format varies depending on the ruleset being used.
 * @returns {boolean} - Whether or not the item meets the ruleset's criteria
 */
const evaluate = (item, ruleset, criteria) => RULESETS[ruleset](item, criteria)


/**
 * byFilters - An array filter callback to shrink down a list of items
 * based on the provided filters. Example usage:
 *
 *    const items = [{}, {}, ...]
 *    items.filter(byFilters(filters)) => items matching filters criteria
 *
 * @param  {array} filterList - list of filters. It's param `currentItem` is
 *         likely an object that will eventually be consumed by a React component.
 * @returns {function} - a callback function, intended for filter methods
 */
export const byFilters = (filterList) => (currentItem) => {
    if (!currentItem) {
        return false
    }

    // [].every(fn) is always true!
    return filterList.every(({ruleset, criteria}) => evaluate(currentItem, ruleset, criteria))
}
