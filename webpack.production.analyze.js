const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const productionConfig = require('./webpack.production.js')

const config = {
  plugins: [new BundleAnalyzerPlugin()],
}
module.exports = merge(productionConfig, config)
