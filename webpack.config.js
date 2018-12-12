const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    path.resolve(__dirname, './src/assets/js/script.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/js/script.js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  'useBuiltIns': 'usage',
                  'targets': '> 0.25%, not dead'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
