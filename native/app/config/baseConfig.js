/* global AstroNative */

// Remember to set up Chrome port forwarding for this to work in Android
const localPreviewUrl = 'https://localhost:8443/loader.js'

const colors = {
    primaryColor: '#4E439B',
    secondaryColor: '#007ba7',
    whiteColor: '#ffffff'
}

const baseConfig = {
    baseURL: 'https://www.merlinspotions.com',
    previewBundle: AstroNative.Configuration.DEBUG
        ? localPreviewUrl
        : '//cdn.mobify.com/sites/progressive-web-scaffold/production/loader.js',
    colors,
    logoUrl: 'file:///logo.png'
}

export default baseConfig
