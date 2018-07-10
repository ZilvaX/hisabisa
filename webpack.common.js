const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'client')
const TEMPLATE = path.resolve(APP_DIR, 'index.html')
const ENTRY = path.resolve(APP_DIR, 'index.js')

const config = {
  entry: ENTRY,
  target: 'web',
  context: APP_DIR,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
    }),
  ],
}

module.exports = config
