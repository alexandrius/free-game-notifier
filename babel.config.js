module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            services: './src/services',
            assets: './assets',
            env: './env',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
