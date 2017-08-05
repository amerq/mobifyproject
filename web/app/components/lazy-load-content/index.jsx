/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import throttle from 'lodash.throttle'

const SCROLL_CHECK_INTERVAL = 200

const componentClass = 'c-lazy-load-content'

/**
 * Lazy load image: content will render immediately
 * if its in view or will show when scrolled to it
 */

class LazyLoadContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_CHECK_INTERVAL)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.checkVisible()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    checkVisible() {
        const topPosition = this.el.getBoundingClientRect().top

        if (topPosition <= window.innerHeight + window.scrollY - this.props.threshold) {
            this.setState({
                visible: true
            })

            window.removeEventListener('scroll', this.handleScroll)
        }
    }

    handleScroll() {
        if (!this.state.visible) {
            this.checkVisible()
        }
    }

    render() {
        const {
            className,
            children,
            placeholder
        } = this.props

        const classes = classNames(componentClass, className)

        return (
            <div
                className={classes}
                ref={(el) => { this.el = el }}
            >
                {this.state.visible ?
                    children
                :
                    placeholder
                }
            </div>
        )
    }
}

LazyLoadContent.defaultProps = {
    threshold: 0
}


LazyLoadContent.propTypes = {
    /**
     * Content that will be revealed when scrolled to
     */
    children: PropTypes.node.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Placeholder content when actual content is not revealed
     */
    placeholder: PropTypes.node,

    /**
     * Number of pixels out the viewport before loading the content
     */
    threshold: PropTypes.number
}

export default LazyLoadContent
