/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import template from '../../template'

import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import Button from 'progressive-web-sdk/dist/components/button'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

import offlineCloud from '../../static/svg/offline-cloud.svg'

/**
 * UI to be shown instead of the page contents while offline and no
 * contents are available.
 */
const Offline = (props, context) => {
    const {reload} = context
    return (
        <div className="t-offline">
            <DangerousHTML html={offlineCloud}>
                {(htmlObj) => <div className="u-margin-bottom-md" dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>
            <p>Fiddlesticks! We couldn't load the</p>
            <p>next page on this connection.</p>
            <p>Please try again.</p>
            <Button
                className="pw--tertiary u-width-full u-text-uppercase u-margin-top-lg"
                onClick={reload}
                data-analytics-name={UI_NAME.retryConnection}
            >
                Retry
            </Button>
        </div>
    )
}

Offline.contextTypes = {
    /**
     * Method that attempts to fetch the page again
     * context source: /web/app/containers/app/container  getChildContext()
     */
    reload: PropTypes.func
}

export default template(Offline)
