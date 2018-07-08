const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'client')
const TEMPLATE_DIR = path.resolve(APP_DIR, 'index.html')

const config = {
  entry: APP_DIR,
  target: 'web',
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE_DIR,
      inject: 'body',
    }),
    new CleanWebpackPlugin('dist'),
  ],
}

module.exports = config
