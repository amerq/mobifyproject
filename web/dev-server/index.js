/* eslint-disable import/no-commonjs */
/* eslint-env node */

const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack/dev.js')

const addMiddleware = require('./middlewares/frontendMiddleware')
const logger = require('./logger')

const argv = require('minimist')(process.argv.slice(2))
const port = argv.port || process.env.PORT || 8443

const compiler = webpack(config)

const localhostKeyAndCert = fs.readFileSync('./dev-server/localhost.pem')

const server = new WebpackDevServer(compiler, {
    headers: {
        // The Mobify CDN has this response header, and we need it for certain
        // CORS fetches
        'Access-Control-Allow-Origin': '*'
    },
    https: {
        cert: localhostKeyAndCert,
        key: localhostKeyAndCert,
    },
    stats: {
        // Configures logging: https://webpack.github.io/docs/node.js-api.html#stats
        assets: false,
        colors: true,
        version: false,
        hash: false,
        chunks: true,
        chunkModules: false
    },
})

addMiddleware(server)

server.listen(port, (err) => { // eslint-disable-line consistent-return
    if (err) {
        return logger.error(err.message)
    }
    logger.appStarted(port)
    logger.waitForBuild()
})
