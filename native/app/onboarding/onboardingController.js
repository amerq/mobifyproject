
import WebViewPlugin from 'progressive-app-sdk/plugins/webViewPlugin'
import onboardingConfig from './onboardingConfig'

const OnboardingController = function(navigationView) {
    this.viewPlugin = navigationView
}

OnboardingController.init = async function() {
    const webView = await WebViewPlugin.init()

    // Disable webview loader when first loading onboarding page
    webView.disableLoader()
    webView.disableScrolling()

    const onboardingController = new OnboardingController(webView)
    onboardingController.navigate(onboardingConfig.url)

    return onboardingController
}

OnboardingController.prototype.navigate = function(url) {
    if (!url) {
        return
    }

    this.viewPlugin.navigate(url)
}

OnboardingController.prototype.back = function() {
    this.viewPlugin.back()
}

OnboardingController.prototype.canGoBack = async function() {
    return await this.viewPlugin.canGoBack()
}

export default OnboardingController
