var utils = require("../config/utils")
var webpack = require("webpack")
var config = require("../config")
var merge = require("webpack-merge")
var baseWebpackConfig = require("./webpack.base")
var prodWebpackConfig = require("./webpack.prod")
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

if(!baseWebpackConfig.hasOwnProperty("entry")) baseWebpackConfig.entry = {}
// add hot-reload related code to entry chunks
Object.keys(prodWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = [ "./build/dev-client", ].concat(prodWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
	mode: "development",
	module: {},
	// cheap-module-eval-source-map is faster for development
	devtool: "#cheap-module-eval-source-map",
	"target": "node",
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false
		}),
		new webpack.DefinePlugin({
			"process.env": config.dev.env
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrorsPlugin(),
	]
})