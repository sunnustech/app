const versions = {
  main: '3.0.6',
  ios: '4',
  android: 17, 
}

const IOS_GOOGLE_MAP_API_KEY = 'AIzaSyAeW2OZIBAcgMncxw7BcZOuf2EUnL9xxxk'
const ANDROID_GOOGLE_MAP_API_KEY = 'AIzaSyAMokc0eF4l5_HGuMBGGgVOIKsw8BQCccU'

const config = {
  expo: {
    name: 'SunNUS',
    slug: 'SunNUS',
    version: '3.0.6',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      config: {
        // googleMapsApiKey: process.env.IOS_GOOGLE_MAP_API_KEY,
        googleMapsApiKey: IOS_GOOGLE_MAP_API_KEY,
      },
      buildNumber: versions.ios,
      supportsTablet: true,
      bundleIdentifier: 'com.nus.sunnus',
    },
    android: {
      config: {
        googleMaps: {
          // apiKey: process.env.ANDROID_GOOGLE_MAP_API_KEY,
          apiKey: ANDROID_GOOGLE_MAP_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.nus.sunnus',
      versionCode: versions.android,
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}

export default config
