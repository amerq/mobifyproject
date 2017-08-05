/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import categoryProductsParser from './parser'

describe('the product list parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/parser.test.html`)
    const parsedContent = categoryProductsParser($, $content)

    it('should extract the product list content from the rendered HTML', () => {
        const expected = {
            itemCount: 7,
            title: 'Potions',
            productUrls: [
                'http://www.merlinspotions.com/eye-of-newt.html',
                'http://www.merlinspotions.com/unicorn-blood.html',
                'http://www.merlinspotions.com/aging-potion.html',
                'http://www.merlinspotions.com/aging-potion-1.html',
                'http://www.merlinspotions.com/aging-potion-2.html',
                'http://www.merlinspotions.com/aging-potion-3.html',
                'http://www.merlinspotions.com/aging-potion-4.html',
            ],
            filters: [{
                label: 'Price',
                ruleset: 'price',
                kinds: [{
                    count: '1',
                    criteria: {
                        ceiling: 9.99,
                        floor: 0
                    },
                    label: '$0.00 - $9.99',
                    query: 'priceto10',
                    ruleset: 'price'
                }, {
                    count: '2',
                    criteria: {
                        ceiling: 19.99,
                        floor: 10
                    },
                    label: '$10.00 - $19.99',
                    query: 'price10to20',
                    ruleset: 'price'
                }, {
                    count: '2',
                    criteria: {
                        ceiling: 29.99,
                        floor: 20
                    },
                    label: '$20.00 - $29.99',
                    query: 'price20to30',
                    ruleset: 'price'
                }, {
                    count: '1',
                    criteria: {
                        ceiling: 39.99,
                        floor: 30
                    },
                    label: '$30.00 - $39.99',
                    query: 'price30to40',
                    ruleset: 'price'
                }, {
                    count: '1',
                    criteria: {
                        ceiling: Infinity,
                        floor: 60
                    },
                    label: '$60.00 and above',
                    query: 'price60to',
                    ruleset: 'price'
                }],
            }],
            sort: {name: 'sortSelect',
                options: [
                    {
                        key: 'position',
                        value: 'position',
                        selected: true,
                        text: 'Position',
                    },
                    {
                        key: 'name',
                        value: 'name',
                        selected: false,
                        text: 'Name',
                    },
                    {
                        key: 'price',
                        value: 'price',
                        selected: false,
                        text: 'Price',

                    }
                ]
            }
        }

        // Test that the shallow properties of the product list object are correct
        for (const key in parsedContent) {
            if (key !== 'products') {
                expect(parsedContent[key]).toEqual(expected[key])
            }
        }
    })
})
