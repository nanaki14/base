const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/assets/js/script.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/js/script.js'
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      TweenMax: 'gsap'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      }
    ]
  }
}
