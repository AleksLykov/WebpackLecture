const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve(__dirname, "/src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "",
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src/app")
        ],
        // Actions:
        loader: "babel-loader",
        type: "javascript/auto",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // apply multiple loaders and options instead
          // "htmllint-loader",
          {
            loader: "style-loader",
            options: {
              // ...
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY)
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  }
}