const config = {
  presets: [
    '@babel/react',
    ['@babel/env', { modules: false }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
}

module.exports = config
