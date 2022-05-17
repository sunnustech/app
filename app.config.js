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
        googleMapsApiKey: process.env.IOS_GOOGLE_MAP_API_KEY,
      },
      buildNumber: '3',
      supportsTablet: true,
      bundleIdentifier: 'com.nus.sunnus',
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_GOOGLE_MAP_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.nus.sunnus',
      versionCode: 16,
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}

export default config
