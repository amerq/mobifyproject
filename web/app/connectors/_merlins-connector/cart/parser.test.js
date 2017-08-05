/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest, node */
import {parseCart, parseCartProducts, parseCartTotals} from './parser'

describe('Parsing the cart', () => {
    test('should map cart summary information to Cart type', () => {
        const data = require('./cart-contents-example.json')
        const expected = require('./cart-contents-parse-cart-expected.json')

        const cart = parseCart(data.cart)

        expect(cart).toEqual(expected)
    })
})

describe('Parsing the cart products', () => {
    test('should map cart product information to Product type', () => {
        const data = require('./cart-contents-example.json')
        const expected = require('./cart-contents-parse-cart-products-expected.json')

        const cartProducts = parseCartProducts(data.cart)

        expect(cartProducts).toEqual(expected)
    })
})

describe('Parsing the cart totals', () => {
    test('should map the cart totals to Cart total type', () => {
        const data = require('./cart-totals-example.json')
        const expected = require('./cart-totals-parse-expected.json')

        const cartTotals = parseCartTotals(data)

        expect(cartTotals).toEqual(expected)
    })
})
