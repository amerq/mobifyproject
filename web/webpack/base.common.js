/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const autoprefixer = require('autoprefixer')
const WebpackNotifierPlugin = require('webpack-notifier')
const packageConfig = require('../package.json')

module.exports = {
    plugins: [
        new WebpackNotifierPlugin({
            title: `Mobify Project: ${packageConfig.name}`,
            excludeWarnings: true,
            skipFirstNotification: true
        }),
    ],
    postcss: () => {
        return [
            autoprefixer({
                browsers: [
                    'iOS >= 9.0',
                    'Android >= 4.4.4',
                    'last 4 ChromeAndroid versions'
                ]
            })
        ]
    }
}
