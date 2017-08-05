import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'
import AlertViewPlugin from 'progressive-app-sdk/plugins/alertViewPlugin'

import AppEvents from '../global/app-events'
import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView
    this.alertEnabled = false

    this.navigationView.on('sign-in:clicked', () => {
        this.hide()
        AppEvents.trigger(AppEvents.signInShow)
    })

    this.navigationView.on('continue:clicked', () => {
        this.hide()
        AppEvents.trigger(AppEvents.shopShow)
    })

    this.navigationView.on('checkout:disable-alert', () => {
        this.alertEnabled = false
    })

    this.navigationView.on('checkout:enable-alert', () => {
        this.alertEnabled = true
    })

    this.navigationView.on('checkout:completed', () => {
        this.alertEnabled = false
        // The merlin's backend needs a little extra time to process checkout
        // so we wait for a small timeout and then try to update all webviews
        setTimeout(() => {
            AppEvents.trigger(AppEvents.cartNeedsUpdate)
        }, 2000)
    })

    this.navigationView.on('cart:updated', () => {
        AppEvents.trigger(AppEvents.cartNeedsUpdate)
    })

    this.navigationView.on('cart:count-updated', (data) => {
        AppEvents.trigger(AppEvents.updateCart, data)
    })

    this.navigationView.on('close', () => {
        this.hide()
    })
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        navigationView,
        cartHeaderController,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        CartHeaderController.init(),
    ])

    const headerOptions = {
        header: {
            rightIcon: {
                id: CartConfig.closeIcon.id,
                imageUrl: CartConfig.closeIcon.imageUrl
            }
        }
    }

    const alertViewOptions = {
        title: 'Are you sure you want to exit checkout?',
        text: 'You will lose all progress, but the items will remain in your cart for later!',
        okButton: 'Exit',
        cancelButton: 'Cancel'
    }

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.navigateToUrl(CartConfig.url, headerOptions, {})
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

    cartHeaderController.on('back', () => {
        navigationView.back()
    })

    cartHeaderController.on('close', async () => {
        if (cartModalController.alertEnabled) {
            const okButtonPressed = await AlertViewPlugin.alert(alertViewOptions)
            if (okButtonPressed) {
                cartModalController.hide()
            }
        } else {
            cartModalController.hide()
        }
    })

    return cartModalController
}

CartModalController.prototype.show = async function() {
    if (this.isShowing) {
        return
    }
    const webView = await this.navigationView.getTopPlugin()
    webView.reload()
    this.isShowing = true
    this.alertEnabled = false
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = function() {
    this.viewPlugin.hide({animated: true})
    this.isShowing = false
    this.navigationView.popToRoot()
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

export default CartModalController
