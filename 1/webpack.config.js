const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopywebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.APP_ENV;
const isTest = ENV === 'test';
const isProd = ENV === 'prod';

const setDevTool = () => {
  if (isTest) return 'inline-source-map';
  if (isProd) return 'source-map';
  return 'eval-source-map';
}

config = {
  entry: path.resolve(__dirname, "/src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: '',
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: /node_modules/,
  },
  devtool: setDevTool(),
  module: {
    rules: [
      {
        // Conditions:
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: 'body',
    }),
    new DashboardPlugin(),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
}

isProd && config.plugins.push(
  new UglifyJSPlugin(),
  new CopywebpackPlugin([{ from: path.resolve(__dirname, 'src/public') }])
)

module.exports = config;