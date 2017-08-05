/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const baseCommon = require('./base.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webPackageJson = require('../package.json')   // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/native/onboarding/onboarding.jsx',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'onboarding.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
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
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.svg$/,
                use: 'text-loader'
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
        new HtmlWebpackPlugin({
            template: './app/native/onboarding/index.html'
        }),
        new webpack.DefinePlugin({
            // This is defined as a boolean, not a string
            MESSAGING_ENABLED: `${webPackageJson.messagingEnabled}`
        })
    ]
}
