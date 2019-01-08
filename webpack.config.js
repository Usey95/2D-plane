const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'eval',
  entry: './src/main.ts',
  mode: 'none',
  output: {
    filename: 'bundle.js',
    publicPath: 'dist',
    path: path.resolve('dist')
  },
  devServer: {
    port: 2333,
    historyApiFallback: true,
    inline: true,
    stats: {
      modules: false,
      chunks: false,
      children: false,
      chunkModules: false,
      hash: false,
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      { 
        test: /\.(ts)?$/,
        loaders: ['babel-loader', 'ts-loader'],
        include: path.resolve('src')
      },
      {
        test: /\.(jpg|gif|ico|png|svg)$/,
        use: 'url-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.mp3$/,
        loaders: 'file-loader',
        exclude: /(node_modules)/,
      }
    ]
  }
}
