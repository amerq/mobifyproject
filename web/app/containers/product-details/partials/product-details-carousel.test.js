/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import React from 'react'
import ConnectedProductDetailsCarousel from './product-details-carousel'
import {mount, shallow} from 'enzyme'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const ProductDetailsCarousel = ConnectedProductDetailsCarousel.WrappedComponent

/* eslint-disable newline-per-chained-call */

test('renders without errors', () => {
    const wrapper = mount(<ProductDetailsCarousel images={[]} />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-product-details__carousel'

test('renders the component class correctly', () => {
    const images = [
        {src: 'test.png'}
    ]
    const wrapper = shallow(<ProductDetailsCarousel images={images} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders a Carousel', () => {
    const images = [
        {src: 'test.png'}
    ]
    const wrapper = shallow(<ProductDetailsCarousel images={images} />)

    expect(wrapper.type()).toBe(Carousel)
})

test('renders a CarouselItem for each image passed', () => {
    const images = [
        {src: 'test.png'},
        {src: 'whoa.gif'}
    ];

    [1, 2].forEach((n) => {
        const wrapper = shallow(<ProductDetailsCarousel images={images.slice(0, n)} />)
        const carouselItems = wrapper.find(CarouselItem)

        expect(carouselItems.length).toBe(n)

        for (let i = 0; i < n; i++) {
            const itemContents = carouselItems.at(i).children()
            expect(itemContents.length).toBe(1)
            expect(itemContents.type()).toBe(Image)
            expect(itemContents.prop('src')).toBe(images[i].src)
        }
    })
})

test('renders two SkeletonBlock when the images array is empty', () => {
    // One skeleton block is a placeholder for the carousel image, the other is
    // for the carousel pips

    const wrapper = shallow(<ProductDetailsCarousel images={[]} />)
    const skeletonBlocks = wrapper.find(SkeletonBlock)
    const placeholderCount = 2 // image placeholder, and pip placeholder

    expect(skeletonBlocks.length).toBe(placeholderCount)
})
