const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/assets/js/script.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "./assets/js/script.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
