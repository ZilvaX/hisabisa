const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const common = require('./webpack.common.js')

const config = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin('dist')],
}
module.exports = merge(common, config)
