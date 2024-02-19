import packageJson from './package.json';

module.exports = {
  "expo": {
    "name": "Hydra",
    "slug": "hydra",
    "version": packageJson.version,
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "hydra",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.dmilin.hydra"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/images/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "7e403d7f-7747-4daa-a3c9-4acb948f7a60"
      }
    },
    "owner": "dmilin",
    "plugins": [
      "expo-router"
    ]
  }
}
