const isRunningIn = {};

const APP_REGEX = /Astro App/i;
const ANDROID_REGEX = /android/i;
const IOS_REGEX = /ip(hone|ad)/i;

// This method is for doing feature detection within a website
// for augmenting behaviour in the app.
isRunningIn.app = function() {
    return APP_REGEX.test(navigator.userAgent);
};

// This method is for doing feature detection within a website
// for making Android-specific augmentations in the app.
isRunningIn.androidApp = function() {
    return isRunningIn.app() && ANDROID_REGEX.test(navigator.userAgent);
};

// This method is for doing feature detection within a website
// for making iOS-specific augmentations in the app.
isRunningIn.iOSApp = function() {
    return isRunningIn.app() && IOS_REGEX.test(navigator.userAgent);
};

export default isRunningIn;
