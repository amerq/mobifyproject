/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {createPropsSelector} from 'reselect-immutable-helpers'
import {openRemoveItemModal, saveToWishlist, updateItem} from '../actions'
import {receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'

import {getCartItems, getCartSummaryCount} from 'progressive-web-sdk/dist/store/cart/selectors'
import {getIsLoggedIn} from '../../../store/user/selectors'

import {noop} from 'progressive-web-sdk/dist/utils/utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Stepper from 'progressive-web-sdk/dist/components/stepper'
import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'

const productItemClassNames = 'u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end'

const ProductImage = ({src, alt}) => (
    <Image src={src} alt={alt} width="104px" height="104px" />
)

ProductImage.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

const ProductSkeleton = () => (
    <ProductItem
        className={productItemClassNames}
        title={<SkeletonText type="h3" className="u-margin-bottom-sm" />}
        image={<ProductImage src="null" alt="null" />}
    >
        <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        <SkeletonText width="60%" style={{lineHeight: '20px'}} className="u-margin-bottom-sm" />
        <div className="t-cart__product-content-placeholder" />
    </ProductItem>
)
/* eslint-disable camelcase */

class CartProductItem extends React.Component {
    constructor(props) {
        super(props)

        this.changeQuantity = this.changeQuantity.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.saveForLater = this.saveForLater.bind(this)
    }

    changeQuantity(newQty) {
        this.props.onQtyChange(this.props.cartItemId, newQty)
    }

    removeItem() {
        this.props.openRemoveItemModal(this.props.cartItemId)
    }

    saveForLater() {
        this.props.onSaveLater(this.props.productId, this.props.cartItemId, this.props.product.href)
    }

    render() {
        const {
            cartItemId,
            configureUrl,
            product,
            quantity,
            itemPrice,
            linePrice,
            setCurrentProduct
        } = this.props

        return (
            <ProductItem customWidth="40%"
                className={productItemClassNames}
                title={<h2 className="u-h5 u-text-family u-text-weight-semi-bold">{product.title}</h2>}
                image={<ProductImage {...product.thumbnail} />}
                >

                <FieldRow className="u-align-bottom">
                    <Field label="Quantity" idFor={`quantity-${cartItemId}`}>
                        <Stepper
                            className="pw--simple t-cart__product-stepper"
                            idForLabel={`quantity-${cartItemId}`}
                            incrementIcon="plus"
                            decrementIcon="minus"
                            initialValue={quantity}
                            minimumValue={1}
                            onChange={this.changeQuantity}
                            />
                    </Field>

                    <Field>
                        <div className="u-text-align-end u-flex">
                            <div className="u-h5 u-color-accent u-text-weight-bold">{linePrice}</div>
                            <div className="u-text-quiet"><em>{itemPrice} each</em></div>
                        </div>
                    </Field>
                </FieldRow>

                <div className="u-flexbox">
                    <Button
                        className="u-text-size-small u-color-brand u-flex-none u-text-letter-spacing-normal"
                        innerClassName="pw--no-min-width u-padding-start-0 u-padding-bottom-0"
                        href={configureUrl}
                        data-analytics-name={UI_NAME.editItem}
                        onClick={() => setCurrentProduct(product.id)}
                        >
                        Edit
                    </Button>

                    <Button
                        className="u-text-size-small u-color-brand u-padding-start-0 u-padding-end-0 u-text-letter-spacing-normal"
                        innerClassName="u-padding-bottom-0 u-padding-start-0"
                        onClick={this.saveForLater}
                        data-analytics-name={UI_NAME.saveItem}
                        >
                        Save for Later
                    </Button>

                    <Button
                        className="u-text-size-small u-color-brand u-text-letter-spacing-normal qa-cart__remove-item"
                        innerClassName="u-padding-end-0 u-padding-bottom-0 u-padding-start-0"
                        onClick={this.removeItem}
                        data-analytics-name={UI_NAME.removeItem}
                        >
                        Remove
                    </Button>
                </div>
            </ProductItem>
        )
    }
}

CartProductItem.defaultProps = {
    onQtyChange: noop
}

CartProductItem.propTypes = {
    cartItemId: PropTypes.string, /* CartItem.id */
    configureUrl: PropTypes.string,
    href: PropTypes.string,
    itemPrice: PropTypes.string,
    linePrice: PropTypes.string,
    openRemoveItemModal: PropTypes.func,
    product: PropTypes.object, /* Product */
    productId: PropTypes.string,
    quantity: PropTypes.number,
    setCurrentProduct: PropTypes.func,
    onQtyChange: PropTypes.func,
    onSaveLater: PropTypes.func

}

const CartProductList = ({items, isLoggedIn, summaryCount, onSaveLater, onUpdateItemQuantity, openRemoveItemModal, onOpenSignIn, setCurrentProduct}) => {
    const isCartEmpty = items.length === 0

    return (
        <div className="t-cart__product-list">
            <div className="t-cart__product-list-title u-padding-top-md u-padding-bottom-md">
                <div className="u-flexbox u-align-center">
                    <h1 className="u-flex u-text-uppercase">
                        Cart {summaryCount > 0 && <span className="u-text-weight-light">({summaryCount} Items)</span>}
                    </h1>
                    {!isLoggedIn &&
                        <Button
                            className="u-flex-none u-color-brand u-text-letter-spacing-normal"
                            onClick={onOpenSignIn}
                            data-analytics-name={UI_NAME.goToSignIn}
                        >
                            <Icon name="user" />
                            Sign in
                        </Button>
                    }
                </div>
            </div>

            <List className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                {isCartEmpty && <ProductSkeleton />}
                {items.map((item) => (
                    <CartProductItem {...item}
                        cartItemId={item.id}
                        setCurrentProduct={setCurrentProduct}
                        key={item.id}
                        onQtyChange={onUpdateItemQuantity}
                        onSaveLater={onSaveLater}
                        openRemoveItemModal={openRemoveItemModal}
                    />))}
            </List>
        </div>
    )
}

CartProductList.propTypes = {
    isLoggedIn: PropTypes.bool,
    items: PropTypes.array,
    openRemoveItemModal: PropTypes.func,
    setCurrentProduct: PropTypes.func,
    summaryCount: PropTypes.number,
    onOpenSignIn: PropTypes.func,
    onSaveLater: PropTypes.func,
    onUpdateItemQuantity: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    items: getCartItems,
    summaryCount: getCartSummaryCount,
    isLoggedIn: getIsLoggedIn
})

const mapDispatchToProps = {
    onUpdateItemQuantity: updateItem,
    onSaveLater: saveToWishlist,
    openRemoveItemModal,
    setCurrentProduct: receiveCurrentProductId
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartProductList)
