#!/usr/bin/env node
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/no-commonjs */
const fs = require('fs')
const path = require('path')
const walk = require('walk')
const chalk = require('chalk')

// A number denoting maximum file size in bytes.
const FILE_SIZE_LIMIT = parseInt(process.env.file_size_limit || process.env.npm_package_config_file_size_limit)

let failure = false

/**
* Traverse the build folder and verify that built files are smaller than a
* defined threshold.
*/
const options = {
    listeners: {
        file: (root, fileStats, next) => {
            const filePath = path.join(root, fileStats.name)
            const fileStat = fs.statSync(filePath)
            if (fileStat.size > FILE_SIZE_LIMIT) {
                failure = true
                console.log(chalk.red(`${filePath} is ${fileStat.size} bytes. It is too big!\n`))
            }
            next()
        },
        errors: (root, nodeStatsArray, next) => {
            next()
        },
        end: () => {
            if (failure === false) {
                console.log(chalk.green(`Success! All build files are below the size threshold.`))
            } else {
                console.log(chalk.red(`Run 'npm run analyze-build' to see what is contributing to large files.`))
            }
        }
    }
}

if (fs.existsSync('build')) {
    console.log(`Verifying individual file sizes in the build are less than ${FILE_SIZE_LIMIT} bytes...`)
    walk.walkSync('build', options)
} else {
    console.log(`Run 'npm run prod:build' to generate a build.`)
}

if (failure) {
    process.exit(1)
} else {
    process.exit(0)
}
