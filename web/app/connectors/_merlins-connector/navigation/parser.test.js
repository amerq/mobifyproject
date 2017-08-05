/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as parser from './parser'

describe('the navigation parser', () => {

    const expectedRoot = {title: 'Root', path: '/', children: [
        {title: 'Sign In', path: '/customer/account/login/', type: 'AccountNavItem'},
        {title: 'Potions', isCategoryLink: true, path: 'http://www.merlinspotions.com/potions.html'},
        {title: 'Books', isCategoryLink: true, path: 'http://www.merlinspotions.com/books.html'},
        {title: 'Ingredients', isCategoryLink: true, path: 'http://www.merlinspotions.com/ingredients.html'},
        {title: 'Supplies', isCategoryLink: true, path: 'http://www.merlinspotions.com/supplies.html'},
        {title: 'Charms', isCategoryLink: true, path: 'http://www.merlinspotions.com/charms.html'},
        {title: 'New Arrivals', isCategoryLink: true, path: 'http://www.merlinspotions.com/new-arrivals.html'}
    ]}

    test('should extract navigation from the rendered HTML when no category is selected', () => {
        const $content = jquerifyHtmlFile(`${__dirname}/example.html`)
        const expected = {root: expectedRoot, path: '/'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })

    test('should extract navigation from the rendered HTML when a category is selected', () => {
        const $content = jquerifyHtmlFile(`${__dirname}/example2.html`)
        const expected = {root: expectedRoot, path: 'http://www.merlinspotions.com/charms.html'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })
})
