/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const componentClass = 'c-container-placeholder'

/**
 * Full viewport placeholder for lazy loaded containers
 */

const ContainerPlaceholder = ({
    className
}) => {
    const classes = classNames(componentClass, className)

    return (
        <div className={classes}>
            <SkeletonBlock height="100vh" width="100vw" />
        </div>
    )
}


ContainerPlaceholder.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string
}

export default ContainerPlaceholder
