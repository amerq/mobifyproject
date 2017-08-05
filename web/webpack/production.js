/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const webpack = require('webpack')
const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')
const workerConfig = require('./base.worker')
const onboardingConfig = require('./base.onboarding')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    // Extend base config with production settings here
    plugins: [].concat(baseMainConfig.plugins, [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            DEBUG: false
        })
    ])
})

baseMainConfig.module.rules = baseMainConfig.module.rules.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css-loader?-autoprefixer&-url&minification', 'postcss-loader', 'sass-loader']),
    include: [
        /progressive-web-sdk/,
        /app/
    ]
})

baseLoaderConfig.plugins = baseLoaderConfig.plugins.concat([
    new webpack.DefinePlugin({
        DEBUG: false
    })
])

workerConfig.plugins = workerConfig.plugins.concat([
    new webpack.DefinePlugin({
        DEBUG: false
    })
])

module.exports = [productionMainConfig, baseLoaderConfig, workerConfig, onboardingConfig]
