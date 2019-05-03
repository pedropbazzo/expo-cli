const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ensurePWAConfig } = require('@expo/config');
const WebpackPwaManifest = require('../../../build');
const config = require('../app.json');

function absolute(...pathComponents) {
  return path.resolve(process.cwd(), ...pathComponents);
}

const validatedConfig = ensurePWAConfig(config, absolute, {
  templateIcon: path.resolve(__dirname, '../..', 'icon.png'),
});

module.exports = {
  entry: path.join(__dirname, '../App.js'),
  output: {
    path: path.join(__dirname, '../output'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
    new WebpackPwaManifest(validatedConfig, {
      publicPath: '/',
      noResources: true,
      filename: '/manifest.json',
    }),
  ],
};
