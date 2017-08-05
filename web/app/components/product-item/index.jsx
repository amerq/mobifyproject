/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'

/**
 * Product Item represents a single product and it's basic information: name,
 * price, category and other desired information.
 */

const ProductItem = ({
    category,
    children,
    className,
    image,
    price,
    title,
    customWidth
}) => {
    const classes = classNames('c-product-item', 'u-flexbox', 'u-direction-row-reverse', className)

    return (
        <article className={classes}>
            <div className="u-flex">
                {!!category &&
                    <p className="c-product-item__category u-margin-bottom-sm u-color-brand">
                        {category}
                    </p>
                }

                <div className="u-margin-bottom-sm u-text-capitilize">
                    {title}
                </div>

                {!!price &&
                    <div>{price}</div>
                }

                {!!children &&
                    <div>
                        {children}
                    </div>
                }
            </div>


            {image &&
                <div className="u-padding-end u-flex-none" style={{width: customWidth}}>
                    {image}
                </div>
            }
        </article>
    )
}


ProductItem.propTypes = {
    /**
     * The ProductItem's name or designation
     */
    title: PropTypes.node.isRequired,

    /**
     * Designates the ProductItem's category (i.e. Potions, Books, etc.)
     */
    category: PropTypes.string,

    /**
     * Any children to be nested within this ProductItem
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Designates the custom width that accepets valid css units
     */
    customWidth: PropTypes.string,

    /**
     * Image of the product. Usually an `<img />` tag or `<Image />` component
     */
    image: PropTypes.node,

    /**
     * Designates the ProductItem's unit price
     */
    price: PropTypes.node
}

export default ProductItem
