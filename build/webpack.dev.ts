import webpack from "webpack"
import config from "~config/index"
import webpackMerge from "webpack-merge"
import baseWebpackConfig, { resolve } from "~build/webpack.base"
import prodWebpackConfig from "~build/webpack.prod"
import FriendlyErrorsPlugin from "friendly-errors-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

if(!baseWebpackConfig.hasOwnProperty("entry")) baseWebpackConfig.entry = {}
// add hot-reload related code to entry chunks
Object.keys(prodWebpackConfig.entry as object).forEach(function(name) {
	(<webpack.Configuration>baseWebpackConfig.entry)[name] = [resolve("build/dev-client"),].concat((<webpack.Configuration>prodWebpackConfig.entry)[name])
})

const devConfig: webpack.Configuration = {
	name: "dev",
	mode: "development",
	// cheap-module-eval-source-map is faster for development
	devtool: "#cheap-module-eval-source-map",
	target: "node",
	plugins: [
		new BundleAnalyzerPlugin({
			openAnalyzer: false
		}),
		new webpack.DefinePlugin({
			"process.env": config.dev.env
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new HtmlWebpackPlugin({
			chunksSortMode: "none",
			filename: "index.html",
			template: "index.html",
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrorsPlugin(),
	]
}

export default webpackMerge( baseWebpackConfig, devConfig )