/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const baseCommon = require('./base.common')

const webPackageJson = require('../package.json')

const readNativeAstroVersion = () => {
    const nativePackageJson = require('../../native/package.json').dependencies['mobify-progressive-app-sdk']
    return `'${nativePackageJson}'`
}

module.exports = {
    devtool: 'cheap-source-map',
    entry: {
        loader: './app/loader.js',
        'core-polyfill': 'core-js',
        'fetch-polyfill': 'whatwg-fetch'
    },
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: `${__dirname}/tmp`
                    }
                }
            },
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                use: 'postcss-loader',
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ],
    },
    plugins: [
        ...baseCommon.plugins,
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: baseCommon.postcss
            }
        }),
        new webpack.DefinePlugin({
            // This is defined as a boolean, not a string
            MESSAGING_ENABLED: `${webPackageJson.messagingEnabled}`,
            // These are defined as string constants
            MESSAGING_SITE_ID: `'${webPackageJson.messagingSiteId}'`,
            NATIVE_WEBPACK_ASTRO_VERSION: readNativeAstroVersion(),
            PROJECT_SLUG: `'${webPackageJson.projectSlug}'`,
            AJS_SLUG: `'${webPackageJson.aJSSlug}'`
        })
    ]
}
