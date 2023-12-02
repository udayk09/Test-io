const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './store/src/index.js', // Update the entry point as per your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
    },
  },
  plugins: [new NodePolyfillPlugin()],
  // Add any other webpack configurations as needed
};
