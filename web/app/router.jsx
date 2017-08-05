/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, {PropTypes} from 'react'
import {Router as SDKRouter, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {Provider} from 'react-redux'

import {setFetchedPage} from 'progressive-web-sdk/dist/store/offline/actions'

// Containers
import App from './containers/app/container'
// These templates are code-split out of the main bundle.
import {Cart, CheckoutConfirmation, CheckoutPayment, CheckoutShipping, Login, ProductList, ProductDetails} from './containers/templates'

// We build this into the app so we can load the home page right away
import Home from './containers/home/container'
import CheckoutHeader from './containers/checkout-header/container'
import CheckoutFooter from './containers/checkout-footer/container'

import {initHomePage} from 'progressive-web-sdk/dist/integration-manager/home/commands'
import {initCartPage} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {initProductListPage} from 'progressive-web-sdk/dist/integration-manager/categories/commands'
import {initProductDetailsPage} from 'progressive-web-sdk/dist/integration-manager/products/commands'
import {initRegisterPage, initLoginPage} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {initCheckoutConfirmationPage} from 'progressive-web-sdk/dist/integration-manager/checkout/commands'
import {initShippingPage} from './containers/checkout-shipping/actions'
import {initPaymentPage} from './containers/checkout-payment/actions'

import {checkIfOffline} from './containers/app/actions'

import {getURL} from './utils/utils'
import {isRunningInAstro, pwaNavigate} from './utils/astro-integration'

// We define an initial OnChange as a no-op for non-Astro use
let OnChange = () => {}

if (isRunningInAstro) {
    // Redefine OnChange to enable Astro integration
    OnChange = (prevState, nextState, replace, callback) => {
        if (nextState.location.action === 'POP') {
            callback()
            return
        }

        pwaNavigate({url: getURL(nextState)}).then(() => {
            callback()
        })
    }
}

const initPage = (initAction) => (url, routeName) => (dispatch) => {
    return dispatch(initAction(url, routeName))
        .then(() => dispatch(setFetchedPage(url)))
        .catch((error) => console.error(`Error executing fetch action for ${routeName}`, error))
        .then(() => dispatch(checkIfOffline()))
}

const Router = ({store}) => (
    <Provider store={store}>
        <SDKRouter>
            <Route path="/" component={App} onChange={OnChange}>
                <IndexRoute component={Home} routeName="home" fetchAction={initPage(initHomePage)} />
                <Route component={Cart} path="checkout/cart/" routeName="cart" fetchAction={initPage(initCartPage)} />
                <Route component={Login} path="customer/account/login/" routeName="signin" fetchAction={initPage(initLoginPage)} />
                <Route component={Login} path="customer/account/create/" routeName="register" fetchAction={initPage(initRegisterPage)} />
                <Route component={ProductList} path="potions.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="books.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="ingredients.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="supplies.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="new-arrivals.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="charms.html" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="catalogsearch/result/*" routeName="searchResultPage" fetchAction={initPage(initProductListPage)} />
                {/* Careful. The routeName on this 'configure' route is used to change how the ProductDetails component renders */}
                <Route component={ProductDetails} path="checkout/cart/configure/id/*/product_id/*/" routeName="cartEditPage" fetchAction={initPage(initProductDetailsPage)} />
                <Route component={ProductDetails} path="*.html" routeName="productDetailsPage" fetchAction={initPage(initProductDetailsPage)} />
                <Route
                    component={CheckoutShipping}
                    path="checkout/"
                    routeName="checkout-shipping"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    headerHasSignIn
                    fetchAction={initPage(initShippingPage)}
                />
                {/*
                    The URL for the payment page on desktop is /checkout/#payment,
                    but routing wasn't working properly when using this as the
                    route path so we specify a fetchUrl to make sure when we
                    fetch it's using the URL for the desktop page
                */}
                <Route
                    component={CheckoutPayment}
                    path="checkout/payment/"
                    fetchUrl="/checkout/#payment"
                    routeName="checkout-payment"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initPage(initPaymentPage)}
                />
                <Route
                    component={CheckoutConfirmation}
                    path="checkout/onepage/success/"
                    routeName="checkout-confirmation"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initPage(initCheckoutConfirmationPage)}
                />

                {/* SFCC Connector routes */}
                <Route component={Home} path="*/Home-Show*" routeName="home" fetchAction={initPage(initHomePage)} />
                <Route component={ProductList} path="*/womens*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/mens*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/newarrivals*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/electronics*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/gift-certificates*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/top-seller*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route component={ProductList} path="*/Search-Show?*" routeName="productListPage" fetchAction={initPage(initProductListPage)} />
                <Route
                    component={CheckoutShipping}
                    path="*/COShipping-Start*"
                    routeName="checkout-shipping"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    headerHasSignIn
                    fetchAction={initPage(initShippingPage)}
                />
                <Route
                    component={CheckoutPayment}
                    path="*/COBilling-Start*"
                    routeName="checkout-payment"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initPage(initPaymentPage)}
                />
                <Route component={Login} path="*/Account-Show*" routeName="signin" fetchAction={initPage(initLoginPage)} />
                <Route component={Cart} path="*/Cart-Show*" routeName="cart" fetchAction={initPage(initCartPage)} />

                <Route
                    component={CheckoutConfirmation}
                    path="*/COSummary-Submit*"
                    routeName="checkout-confirmation"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initPage(initCheckoutConfirmationPage)}
                />

            </Route>
        </SDKRouter>
    </Provider>
)

Router.propTypes = {
    store: PropTypes.object
}

export default Router
