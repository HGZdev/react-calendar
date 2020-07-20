// const webpack = require('webpack')
const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const outputDirectory = "dist";
const LOCAL_PORT = 3000;

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    // // publicPath allows you to specify the base path for all the assets within your application (compile proper path to dynamic index.html file)
    // publicPath: '.' or outputDirectory...,
    // // Keeps path name in bundle.js comments
    // pathinfo: true,
  },
  // set default options for webpack-dev-server mode
  devServer: {
    // hot update
    hot: true,
    // refresh app automatically after update
    inline: true,
    // prevent removing bundle.js on development mode run => available for local compilation (e.g. we can check whether paths in dynamic index.html are correct).
    writeToDisk: true,
    // The contentBase in devServer represents the location where the server is told to provide content.
    // contentBase: '.', // works with src="bundle.js" in root
    port: LOCAL_PORT,
    // historyAPIFallback will redirect 404s to /index.html => fix a problem (works only for local dev-server) with "cannot GET /URL" error on refresh with React Router https://tylermcginnis.com/react-router-cannot-get-url-refresh/, ALTERNATIVE method (hack): HashRouter
    // historyApiFallback: true,
  },
  // keep local production mode hot
  watch: true,
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {loader: "css-loader", options: {sourceMap: true}},
          // Compiles Sass to CSS
          {loader: "sass-loader", options: {sourceMap: true}},
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // // Dynamic index.html generator
    // // Beware: github-pagres doesn't like index.html in different dir than root (static needed)
    // new HtmlWebpackPlugin({
    // 	template: 'index.html', // pointing to base html for minified html.index creation (with auto injected bundle.js script) - default 'index.html'
    // 	title: 'Kreator Fałszywych Cytatów', // 'template' prop will override 'title' prop
    // }),
  ],
};
