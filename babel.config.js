module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    env: {
      development: {
        plugins: [
          'react-native-reanimated/plugin',
          'module:react-native-dotenv',
        ],
      },
      production: {
        plugins: ['react-native-reanimated/plugin', 'react-native-paper/babel'],
      },
    },
  }
}
