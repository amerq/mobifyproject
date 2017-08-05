import baseConfig from './baseConfig'

const url = `${baseConfig.baseURL}/checkout/cart/`

const closeIcon = {
    id: 'closeCart_id',
    imageUrl: 'file:///close.png'
}

const cartIcon = {
    id: 'cartIcon_id',
    imageUrl: 'file:///cart.png'
}

const shoppingCart = {
    id: 'shoppingCart_title',
    logoUrl: 'file:///logo.png',
}

const colors = {
    textColor: baseConfig.colors.whiteColor,
    backgroundColor: baseConfig.colors.primaryColor
}

export default {url, closeIcon, cartIcon, shoppingCart, colors}
