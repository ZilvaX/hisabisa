const path = require('path')

const DIST_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'client')

const config = {
  mode: 'development',
  entry: APP_DIR,
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [APP_DIR],
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    proxy: {
      '/entries': 'http://localhost:3000/',
    },
    contentBase: DIST_DIR,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}

module.exports = config
