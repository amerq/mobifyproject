/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {loadScript} from './loader-utils'

export const availablePolyfills = [
    {
        test: () => !Array.prototype.fill || !window.Promise,
        load: (callback) => {
            loadScript({
                id: 'progressive-web-core-polyfill',
                src: getAssetUrl('core-polyfill.js'),
                onload: callback,
                onerror: callback
            })
        }
    }, {
        test: () => !global.fetch,
        load: (callback) => {
            loadScript({
                id: 'progressive-web-fetch-polyfill',
                src: getAssetUrl('fetch-polyfill.js'),
                onload: callback,
                onerror: callback
            })
        }
    }
]

export const getNeededPolyfills = () => {
    return availablePolyfills.filter((polyfill) => polyfill.test())
}
