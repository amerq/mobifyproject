/* eslint-disable no-console, import/no-commonjs */

const chalk = require('chalk')
const ip = require('ip')

const url = process.env.npm_package_siteUrl
const siteFolder = (port) => {
    return `https://localhost:${port}/loader.js`
}
const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

    waitForBuild: () => {
        console.log(chalk.yellow('webpack: building bundle...'))
    },

    // Called whenever there's an error on the server we want to print
    error: (err) => {
        console.error(chalk.red(err))
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port) => {
        console.log(`Server started ${chalk.green('✓')}`)

        const encodedUrl = encodeURIComponent(url)
        const encodedSiteFolder = encodeURIComponent(siteFolder(port))

        console.log(
            chalk.bold('Access URLs:') + '\n' + // eslint-disable-line prefer-template
            divider + '\n' +
            'Localhost: ' + chalk.magenta(`https://localhost:${port}`) + '\n' +
            'LAN: ' + chalk.magenta(`https://${ip.address()}:${port}`) + '\n' +
            divider
        )

        console.log(
            chalk.bold('Preview URL: ') + // eslint-disable-line prefer-template
            chalk.magenta(`https://preview.mobify.com/?url=${encodedUrl}&site_folder=${encodedSiteFolder}&disabled=0&domain=&scope=0`) + '\n' +
            divider + '\n' +
            chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`) + '\n'
        )
    },
}

module.exports = logger
