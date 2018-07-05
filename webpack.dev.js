const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.common.js')

const DIST_DIR = path.resolve(__dirname, 'dist')

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000/',
    },
    contentBase: DIST_DIR,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(common, config)
