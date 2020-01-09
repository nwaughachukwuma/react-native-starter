module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
    [
      'module-resolver',
      {
          root: ['.'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            assets: './src/assets',
            utils: './src/utils',
            networking: './src/networking',
            configs: './src/configs',
          },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console']
    },
  },
};
