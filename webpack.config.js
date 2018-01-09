const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/assets/js/script.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "./assets/js/script.js"
  },
  devtool: 'source-map'
}
