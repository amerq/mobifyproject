/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* eslint-env jquery, jest, node */

import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import {productDetailsParser, productListParser} from './parsers'

/* eslint-disable max-nested-callbacks */

describe('the ProductDetails product parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/product-details-example.html`)
    const parsedContent = productDetailsParser($, $content)

    it('extracts the title from the page', () => {
        expect(parsedContent.title).toBe('Eye Of Newt')
    })

    it('extracts the price from the page', () => {
        expect(parsedContent.price).toBe('$12.00')
    })

    it('extracts images from the page', () => {
        const images = parsedContent.images
        expect(images.length).toBe(3)

        images.forEach((item) => {
            ['src', 'thumbnailSrc', 'zoomSrc'].forEach((prop) => {
                expect(isURL(item[prop])).toBe(true)
                expect(item[prop]).toMatch(/\.png$/)
            })
        })
    })

    it('extracts the description from the page', () => {
        expect(typeof parsedContent.description).toBe('string')
    })
})

describe('the ProductList product parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/product-list.test.html`)
    const parsedContent = productListParser($, $content)

    it('should extract the product list content from the rendered HTML', () => {
        const urls = Object.keys(parsedContent)
        expect(urls.length).toBe(7)
        const expected = {
            productKeys: ['id', 'title', 'price', 'available', 'href', 'thumbnail', 'images'],
            imageKeys: ['title', 'alt', 'src']
        }
        // Test that the shallow properties of the product list object are correct
        urls.forEach((url) => {
            expect(Object.keys(parsedContent[url])).toEqual(expected.productKeys)
            expect(Object.keys(parsedContent[url].thumbnail)).toEqual(expected.imageKeys)
        })
    })
})
