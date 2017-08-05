/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './parser'

describe('the home parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/parser.test.html`)
    const parsedContent = homeParser($, $content)

    it('should extract the home content from the rendered HTML', () => {
        const expected = {
            // TODO: Update this expected object after we update desktop with new content
            banners: [
                {
                    alt: 'Merlins Potions',
                    src: 'https://www.merlinspotions.com/media/logo/default/MerlinsPotions_Logo_Light.png'
                },
                {},
                {
                    alt: '',
                    src: 'https://www.merlinspotions.com/media/wysiwyg/MP_banner_4.jpg'
                }
            ]
        }

        expect(parsedContent.banners).toEqual(expected.banners)
    })
})
