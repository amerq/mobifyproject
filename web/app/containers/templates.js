/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import {getBuildOrigin} from 'progressive-web-sdk/dist/asset-utils'
import ContainerPlaceholder from '../components/container-placeholder'
import {prefetchLink} from '../utils/loader-utils'
import {requestIdleCallback} from '../utils/utils'

const isRunningInIOS = /ip(hone|ad)/i.test(navigator.userAgent)
const loadableList = []
const prefetchFilenames = []

const PWALoadable = (loader, chunkName) => {
    const loadable = Loadable({
        loader,
        LoadingComponent: ContainerPlaceholder
    })
    loadableList.push(loadable)
    prefetchFilenames.push(`${chunkName}.js`)
    return loadable
}

const registerPreloadCallbacks = () => {
    loadableList.forEach((loadable) => {
        requestIdleCallback(() => loadable.preload())
    })
}

export const prefetchTemplateChunks = () => {
    // iOS browsers do not support prefetch link tags so
    // register the loadables to be preloaded when browser is idle
    if (isRunningInIOS) {
        registerPreloadCallbacks()
    } else {
        prefetchFilenames
            .map((filename) => `${getBuildOrigin()}${filename}`)
            .forEach((link) => prefetchLink({href: link}))
    }
}

export const Cart = PWALoadable(() => import('./cart/container' /* webpackChunkName: "cart" */), 'cart')
export const CheckoutConfirmation = PWALoadable(() => import('./checkout-confirmation/container' /* webpackChunkName: "checkout-confirmation" */), 'checkout-confirmation')
export const CheckoutPayment = PWALoadable(() => import('./checkout-payment/container' /* webpackChunkName: "checkout-payment" */), 'checkout-payment')
export const CheckoutShipping = PWALoadable(() => import('./checkout-shipping/container' /* webpackChunkName: "checkout-shipping" */), 'checkout-shipping')
export const Login = PWALoadable(() => import('./login/container' /* webpackChunkName: "login" */), 'login')
export const ProductDetails = PWALoadable(() => import('./product-details/container' /* webpackChunkName: "product-details" */), 'product-details')
export const ProductList = PWALoadable(() => import('./product-list/container' /* webpackChunkName: "product-list" */), 'product-list')
