/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {parseImage} from '../../../utils/parser-utils'

const BANNER_SELECTOR = 'strong.logo, .home-t-shirts, .home-erin'

const homeParser = ($, $html) => {
    // TODO: fix this when we put mobile assets on desktop
    const banners = [].map.call(
        $html.find(BANNER_SELECTOR),
        (banner) => parseImage($(banner).find('img'))
    )

    return {banners}
}

export default homeParser
