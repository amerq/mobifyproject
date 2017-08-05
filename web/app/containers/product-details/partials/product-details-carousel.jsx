/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getProductImages} from 'progressive-web-sdk/dist/store/products/selectors'
import classNames from 'classnames'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Ratio from 'progressive-web-sdk/dist/components/ratio'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Image from 'progressive-web-sdk/dist/components/image'

const ProductDetailsCarousel = ({images, contentsLoaded}) => {
    // If there are NO ITEMS then display a placeholder skeleton instead
    if (images.length === 0) {
        return (
            <CarouselItem>
                <Ratio aspect="1:1">
                    <SkeletonBlock
                        height="100%"
                        width="100%"
                        className="u-padding-md"
                    />
                </Ratio>
                <SkeletonBlock height="30px" />
            </CarouselItem>
        )
    }

    const carouselProps = {
        previousIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        iconSize: 'medium',
        className: 'pw--frame pw--side-controls t-product-details__carousel u-padding-md u-bg-color-neutral-10',
        showControls: images.length > 1
    }

    const imgProps = {
        className: classNames('u-display-block', {
            'pw--is-transitioning': !contentsLoaded // Carousel hasn't received the final images yet
        }),
        hidePlaceholder: true,
        ratio: {aspect: '1:1'},
        loadingIndicator: <SkeletonBlock height="100%" />,
        useLoaderDuringTransitions: false
    }

    return (
        <Carousel {...carouselProps}>
            {images.map(({src, alt = ''}) => {
                return (
                    <CarouselItem key={src}>
                        <Image {...imgProps} alt={alt} src={src} />
                    </CarouselItem>
                )
            })}
        </Carousel>
    )
}

ProductDetailsCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
    })).isRequired,
    contentsLoaded: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: selectors.getProductDetailsContentsLoaded,
    images: getProductImages
})

export default connect(mapStateToProps)(ProductDetailsCarousel)
