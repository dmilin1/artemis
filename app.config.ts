import packageJson from './package.json';

const projectId = "7e403d7f-7747-4daa-a3c9-4acb948f7a60";
const IS_DEV = process.env.APP_VARIANT === 'development';

module.exports = {
  expo: {
    name: "Hydra",
    slug: "hydra",
    version: packageJson.version,
    newArchEnabled: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "hydra",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.dmilin.hydra-dev' : "com.dmilin.hydra"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000"
      }
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      eas: {
        projectId,
      }
    },
    owner: "dmilin",
    plugins: [
      "expo-router",
      [
        'expo-media-library', {
          savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos and videos to your library.',
        }
      ]
    ],
    updates: {
      url: `https://u.expo.dev/${projectId}`
    }
  }
}
