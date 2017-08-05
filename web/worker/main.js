/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import worker from 'progressive-web-sdk/dist/worker/main'

const workerParams = worker({
    slug: PROJECT_SLUG,
    isDebug: DEBUG
})

// Load the Messaging worker code if we're not running under Astro
import isRunningIn from '../app/vendor/astro-detect'
if (!isRunningIn.app()) {
    try {
        self.importScripts('https://webpush-cdn.mobify.net/pwa-messaging-service-worker.js')
        // Pass the toolbox module used by the SDK worker to the Messaging
        // worker, so it's shared.
        self.MessagingServiceWorker.messagingWorkerMain(
            {
                toolbox: workerParams.toolbox,
                isDebug: workerParams.isDebug
            }
        )
    } catch (e) {
        console.log(`Error importing/initializing Messaging service worker: ${e}`)
    }
}
