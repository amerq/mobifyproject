/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import Image from 'progressive-web-sdk/dist/components/image'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

const NavigationSocialIcons = () => {
    return (
        <div className="m-navigation__social">
            <div className="u-flexbox u-justify-center">
                {social.map(([url, icon, title]) =>
                    <a href={url} className="m-navigation__social-link" key={url}>
                        <Image
                            src={getAssetUrl(icon)}
                            alt={title}
                            height="32px"
                            width="32px"
                        />
                    </a>
                )}
            </div>
        </div>
    )
}

export default NavigationSocialIcons
