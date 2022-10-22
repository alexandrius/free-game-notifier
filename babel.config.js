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
            hooks: './src/hooks',
            screens: './src/screens',
            styles: './src/styles',
            utils: './src/utils',
            localization: './src/localization',
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
