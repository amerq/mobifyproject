/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import ProductItem from '../product-item'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

/**
 * Product Tile represents a product and it's basic information: image,
 * link and price.
 */

const titleClassName = classNames(
    'c-product-tile__name',
    'u-h4',
    'u-text-family',
    'u-text-weight-medium',
    'u-color-neutral-60'
)

const ProductImage = ({src, alt}) => (
    <Image
        src={src}
        alt={alt}
        height="150px"
        width="120px"
        />
)

ProductImage.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

const ProductTile = ({className, thumbnail, href, price, title, onClick}) => {
    const productImage = (<ProductImage {...thumbnail} />)

    const titleElement = title
        ? <h2 className={titleClassName}>{title}</h2>
        : <SkeletonBlock height="34px" />
    const priceElement = (price !== null && price !== undefined)
        ? price.length > 0 && <span className="u-text-weight-bold u-color-error">{price}</span>
        : <SkeletonBlock height="22px" width="50px" />

    return (
        <ListTile className="c-product-tile u-card" onClick={onClick} href={href}>
            <ProductItem customWidth="45%"
                className={classNames('u-align-center', className)}
                title={titleElement}
                price={priceElement}
                image={productImage} />
        </ListTile>
    )
}

ProductTile.propTypes = {
    /**
     * Optional className for the product tile
     */
    className: PropTypes.string,
    href: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default ProductTile
