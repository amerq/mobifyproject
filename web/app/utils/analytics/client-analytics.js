/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Connector from 'progressive-web-sdk/dist/analytics/connectors/connector'

export default class ClientAnalytics extends Connector {
    constructor() {
        super('Client Analytics')

        // any other pre-initialization setup required for this analytics vendor

        // Connector.loadScript('https://www.example.com/script_to_a_3rd_party_analytics_library.js', this)
    }

    // Override ready function if you need to do any after script initialization
    // This function will be invoked when the script finishes loading
    ready() {
        // It is mandatory to invoke super.ready() as the last command
        // This will drain the queued events if any
        super.ready()
    }

    // This function will be invoked when navigation occurs
    // pageviewEvent() {
    //     // Return an object that send() function will process
    //     return {}
    // }

    // This function will be invoked when a transaction occurs
    // purchaseEvent() {
    //     // Return an object that send() function will process
    //     return {}
    // }

    // send(type, payload) {
    //     // Sends the analytics event to the 3rd party analytics script

    //     // It is optional to invoke super.send() as the last command
    //     // This will invoke the debug logging if debug flag is on
    //     super.send(type, payload)
    // }
}
