# Progressive Mobile App SDK Scaffold

This directory contains the Progressive Mobile App SDK (Astro) Scaffold. It is a fully functioning iOS and Android app demoing the Merlins Potions e-commerce store and is a part of the Mobify Platform.

## Requirements

* [Git](https://git-scm.com/)
* node 6 LTS\*
* npm 3
* Xcode 8.3
* Android Studio 2.3

We recommend using [nvm](https://github.com/creationix/nvm#installation) to manage your node and npm versions. 

## Setup

Before you get started, take some time to look through [the Getting Started Guide](http://astro.mobify.com/latest/guides/before-you-begin/). Once you're familiar with progressive apps, follow these steps to set up this project to start developing:

```sh
# Clone the repo
git clone git@github.com:mobify/platform-scaffold.git
# or git clone https://github.com/mobify/platform-scaffold.git

cd platform-scaffold/native

# Install dependencies
npm run deps
```

## Run

### iOS
To run the app for iOS, follow these steps:
- Open the `scaffold.xcworkspace` file in the `ios` folder.
- Make sure you have the `scaffold` target selected.
- Build and run the app (<kbd>⌘**R**</kbd>)

### Android
To run the app for Android, follow these steps:
- Open Android Studio
- Select `Import Project`
- Select the build.gradle file inside the `android` folder
- Gradle will now build your dependencies, once it's done, you can run the app.

## Testing
To run the tests for each project, follow these steps:

### iOS
- With the project open, run the tests with (<kbd>⌘**U**</kbd>)

### Android
- With the project open, run the tests by right-clicking the androidTest package and selecting "Run Tests in 'com.mobify...'"

### Continuous Integration
The Scaffold project uses Buddybuild [for iOS](https://dashboard.buddybuild.com/apps/58adef614b5a980100922518) and [for Android](https://dashboard.buddybuild.com/apps/58addc71d556a80100e89aa3).

## Development
Development of progressive mobile apps occurs in two streams:

- The content for the app is developed as part of the progressive mobile web, inside the [`web`](../web) folder
- The structure of the app is developed inside this folder, `native`.

To preview local changes made to the content, you must run a local preview server. You can do that by following [these instructions](../web#setup). Your computer will now serve a local bundle over `https` on port `8443`. Changes made to the `web` folder while running the development server appear on reload of the page. Changes made to the native structure of the app (inside this folder) require compiling and running the app.
By default, the [configuration](../native/app/config/baseConfig.js) will show a preview window if the `previewEnabled` flag is `true`.

## Deployment
Deployment of the Scaffold is handled by Buddybuild. See [Buddybuild's deployment guide](http://docs.buddybuild.com/docs/deploy-manually) for more information.

