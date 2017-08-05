/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
/* eslint-env node */

const webpack = require('webpack')
const path = require('path')
const baseCommon = require('./base.common')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webPackageJson = require('../package.json')   // eslint-disable-line import/no-extraneous-dependencies

const analyzeBundle = process.env.MOBIFY_ANALYZE === 'true'

const config = {
    devtool: 'cheap-source-map',
    entry: [
        './app/main.jsx'
    ],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'babel-runtime': path.resolve(process.cwd(), 'node_modules', 'babel-runtime'),
            lodash: path.resolve(process.cwd(), 'node_modules', 'lodash'),
            'lodash._basefor': path.resolve(process.cwd(), 'node_modules', 'lodash', '_baseFor'),
            'lodash.escaperegexp': path.resolve(process.cwd(), 'node_modules', 'lodash', 'escapeRegExp'),
            'lodash.frompairs': path.resolve(process.cwd(), 'node_modules', 'lodash', 'fromPairs'),
            'lodash.isarray': path.resolve(process.cwd(), 'node_modules', 'lodash', 'isArray'),
            'lodash.isarguments': path.resolve(process.cwd(), 'node_modules', 'lodash', 'isArguments'),
            'lodash.intersection': path.resolve(process.cwd(), 'node_modules', 'lodash', 'intersection'),
            'lodash.isplainobject': path.resolve(process.cwd(), 'node_modules', 'lodash', 'isPlainObject'),
            'lodash.keys': path.resolve(process.cwd(), 'node_modules', 'lodash', 'keys'),
            'lodash.keysin': path.resolve(process.cwd(), 'node_modules', 'lodash', 'keysIn'),
            'lodash.mapvalues': path.resolve(process.cwd(), 'node_modules', 'lodash', 'mapValues'),
            'lodash.throttle': path.resolve(process.cwd(), 'node_modules', 'lodash', 'throttle'),
            react: path.resolve(process.cwd(), 'node_modules', 'react')
        }
    },
    plugins: [
        ...baseCommon.plugins,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => /node_modules/.test(module.resource)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // These dependencies are shared between several of the route chunks
            async: 'common-dependencies',
            minChunks: (module) => {
                const context = module.context
                const targets = [/progressive-web-sdk/]
                return context &&
                    context.indexOf('node_modules') >= 0 &&
                    targets.find((target) => target.test(context))
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin([
            {from: 'app/static/', to: 'static/'}
        ]),
        new webpack.DefinePlugin({
            // This is defined as a boolean, not a string
            MESSAGING_ENABLED: `${webPackageJson.messagingEnabled}`,
            // These are defined as string constants
            PROJECT_SLUG: `'${webPackageJson.projectSlug}'`,
            AJS_SLUG: `'${webPackageJson.aJSSlug}'`
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: baseCommon.postcss
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules(?!\/mobify-progressive-app-sdk)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: `${__dirname}/tmp`,
                    plugins: ['syntax-dynamic-import']
                }
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
    }
}

if (analyzeBundle) {
    console.info('Analyzing build...')
    config.plugins = config.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true
        })
    ])
}

// Prepare entries for async loading:
// Webpack doesn't support async loading of the commons and entry bundles out of the box
// Replace `webpackJsonp` calls with `webpackJsonpAsync` and implement the latter in loader
// so that it waits for the vendor script to finish loading
// before running the webpackJsonp with the received arguments.
config.plugins.push(function() {
    this.plugin('after-compile', (compilation, callback) => {
        for (const file in compilation.assets) {
            if (/\.js$/.test(file) && !(/^vendor/.test(file))) {
                const children = compilation.assets[file].children
                if (!children || !children[0]) {
                    continue
                }

                const source = children[0]
                source._value = source._value.replace(/^webpackJsonp\w*/, 'webpackJsonpAsync')
            }
        }

        callback()
    })
})

module.exports = config
