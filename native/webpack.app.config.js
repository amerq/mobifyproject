/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var appPackageJson = require('./package.json')

var rootDir = process.cwd();
var entry = path.resolve(rootDir, 'app/app.js');
var outDir = path.resolve(rootDir, 'app/build');

var isProd = process.env.NODE_ENV === 'production';
var analyzeBundle = process.env.ASTRO_ANALYZE === 'true';

// resolve.symlinks = false so that we can `npm link` node modules
//                          in and not get lint errors from linting them.

var config = {
    entry: entry,
    output: {
        filename: 'app.js',
        path: outDir
    },
    resolve: {
        alias: {
            'progressive-app-sdk': path.resolve(rootDir, 'node_modules/mobify-progressive-app-sdk/js/src/'),
            vendor: path.resolve(rootDir, 'node_modules/mobify-progressive-app-sdk/js/vendor/'),
            bluebird: path.resolve(rootDir, 'node_modules/bluebird')
        },
        symlinks: false
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: path.resolve(__dirname, '.eslintrc.yml'),
                    formatter: require('eslint/lib/formatters/unix')
                }
            }
        }),
        new webpack.DefinePlugin({
            // Boolean constant
            MESSAGING_ENABLED: `${appPackageJson.messagingEnabled}`,
            // String constant
            MESSAGING_SITE_ID: `'${appPackageJson.messagingSiteId}'`
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            use: ['eslint-loader'],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            include: [
                path.resolve(rootDir, 'node_modules/mobify-progressive-app-sdk/js'),
                path.resolve(rootDir, 'app'),
                path.resolve(rootDir, 'onboarding')
            ]
        }]
    }
};

if (isProd) {
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]);
} else {
    config.devtool = 'inline-source-maps';
}

if (analyzeBundle) {
    config.plugins = config.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true
        })
    ]);
}

module.exports = config;
