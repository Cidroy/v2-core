import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin"
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpackMerge from "webpack-merge"
import webpack from "webpack"
import safeParser from "postcss-safe-parser"
import baseWebpackConfig from "~build/webpack.base"
import config from "~config/index"
import loadMinified from "~config/load-minified"
import BuildHelper from "~build/helper"

process.env.BABEL_ENV = "web"
const resolve = BuildHelper.resolve

const webpackProdConfig: webpack.Configuration = {
	name: "production",
	mode: "production",
	target: "node",
	entry: {
		main: resolve("src/app/index.ts")
	},
	output: {
		filename: "js/[name].js",
		libraryTarget: "commonjs2",
		path: resolve("dist/web")
	},
	optimization: {
		minimizer: [
			// we specify a custom UglifyJsPlugin here to get source maps in production
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					ecma: 6,
					mangle: true
				},
				sourceMap: true
			}),
		],
	},
	plugins: [
		// Compress extracted CSS. We are using this plugin so that possible
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				parser: safeParser,
				discardComments: {
					removeAll: true
				}
			}
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			chunksSortMode: "none",
			// chunksSortMode: "dependency",
			filename: "index.html",
			template: "index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			serviceWorkerLoader: `<script>${loadMinified(resolve("build/service-worker-prod.js"))}</script>`
		}),
		new CopyWebpackPlugin([
			{
				from: resolve("static"),
				to: config.build.assetsSubDirectory,
				ignore: [ ".*", ]
			},
		]),
	]
}

export default webpackMerge( baseWebpackConfig, webpackProdConfig)