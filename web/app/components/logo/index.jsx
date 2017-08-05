/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import Image from 'progressive-web-sdk/dist/components/image'

class Logo extends React.Component {
    constructor(props) {
        super(props)

        this.logoURL = getAssetUrl('static/img/global/logo.png')
    }

    render() {
        return (
            <Image role="presentation" src={this.logoURL} />
        )
    }
}

export default Logo
