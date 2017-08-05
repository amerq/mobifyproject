/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

// SDK Components
import Image from 'progressive-web-sdk/dist/components/image'

// Local Component
import ProductItem from '../../../components/product-item'

const PaymentProductItem = ({
    id,
    product: {
        thumbnail,
        title
    },
    options,
    itemPrice,
    linePrice,
    quantity
}) => {
    const productImage = (
        <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            width="104px"
            height="104px"
        />
    )

    return (
        <ProductItem customWidth="20%"
            className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
            title={<h2 className="u-h5">{title}</h2>}
            image={productImage}
        >
            <div className="u-flexbox u-align-bottom">
                <div className="u-flex-none u-color-neutral-50 u-text-size-small">
                    {options && options.map(({label, value}, idx) => (
                        <p
                            className={idx > 0 ? 'u-margin-top-sm' : ''}
                            key={`${id}-option-${idx}`}
                        >
                            {label}: {value}
                        </p>
                    ))}

                    <p className={options > 0 ? 'u-margin-top-sm' : ''}>
                        Quantity: {quantity}
                    </p>
                </div>

                <div className="u-text-align-end u-flex">
                    <div>
                        <div className="u-h5 u-text-weight-semi-bold">
                            {linePrice}
                        </div>

                        <div className="u-text-quiet">
                            <em>{itemPrice} each</em>
                        </div>
                    </div>
                </div>
            </div>
        </ProductItem>
    )
}

PaymentProductItem.propTypes = {
    /**
     * Item ID
     */
    id: PropTypes.string,
    itemPrice: PropTypes.string,
    linePrice: PropTypes.string,

    /**
     * Product options
     */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    product: PropTypes.object, /* Product */

    /**
     * Number of items
     */
    quantity: PropTypes.number,
}

export default PaymentProductItem
