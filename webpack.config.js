const path = require('path')
const webpack = require('webpack')

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

module.exports = config
