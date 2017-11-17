const path = require('path');
const APP_DIR = path.resolve(__dirname, '/client');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, 
        loader: 'babel-loader', 
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
        'process.env.FLICKR_API_KEY': JSON.stringify(process.env.FLICKR_API_KEY)
      }),
  ]
}