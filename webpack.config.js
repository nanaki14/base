const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/assets/js/script.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/js/script.js'
  },
  devtool: '#eval-source-map',//jsxを扱う場合は'inline-source-map'を使用
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
  },
  externals: {
    '$': 'jquery',
    'TweenMax': 'gsap'
  },
}
