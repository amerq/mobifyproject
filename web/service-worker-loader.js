/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// MOBIFY PROGRESSIVE SERVICE WORKER LOADER
// DO NOT MODIFY WITHOUT APPROVAL FROM MOBIFY
const isPreview = /preview=true/.test(self.location.search)

if (isPreview) {
    self.importScripts('https://localhost:8443/worker.js')
} else {
    self.importScripts('https://cdn.mobify.com/sites/progressive-web-scaffold/production/worker.js')
}
