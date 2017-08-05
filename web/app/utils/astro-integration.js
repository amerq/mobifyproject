/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import isRunningIn from '../vendor/astro-detect'

export const isRunningInAstro = isRunningIn.app()

/**
 * Triggers an event into the native Astro app.
 * This is exactly the same method as documented here:
 * http://astro.mobify.com/latest/advanced/webview-appjs-communication/
 */
export const trigger = (eventName, params) => {
    if (isRunningInAstro) {
        window.Progressive.AstroPromise.then((client) =>
            client.trigger(eventName, params)
        )
    }
}

/**
 * Triggers a JS RPC method in Astro
 * http://astro.mobify.com/latest/advanced/webview-appjs-communication/
 */
export const jsRpcMethod = (methodName, methodArgs) => {
    let result = () => {}

    if (isRunningInAstro) {
        // The original Astro.jsRpcMethod returns a function via Promise.promisify,
        // which is why we return a function as per below.
        result = () => {
            return window.Progressive.AstroPromise.then((client) =>
                client.jsRpcMethod(methodName, methodArgs)()
            )
        }
    }

    return result
}

/**
 * Provides coordination with the native app (Astro)
 * If we aren't in a native app then the function
 * is just a no-op.
 */
export const pwaNavigate = () => jsRpcMethod('pwa-navigate', ['url'])()

/**
 * Exports Astro as a listener
 */
export const onAstroEvent = (eventName, callback) => {
    if (isRunningInAstro) {
        window.Progressive.AstroPromise.then((client) =>
            client.on(eventName, callback)
        )
    }
}
export const disableAstroEvent = (event, callback, context) => {
    if (isRunningInAstro) {
        window.Progressive.AstroPromise.then((client) =>
            client.off(event, callback, context)
        )
    }
}
