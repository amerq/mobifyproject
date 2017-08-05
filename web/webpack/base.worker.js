/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env node */
/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './worker/main.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'worker.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            PROJECT_SLUG: JSON.stringify(require('../package.json').name) // eslint-disable-line import/no-extraneous-dependencies
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: path.join(__dirname, 'tmp')
                }
            }
        }]
    }
}
