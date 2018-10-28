import path from "path"
import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin"
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpackMerge from "webpack-merge"
import safeParser from "postcss-safe-parser"
import baseWebpackConfig from "~build/webpack.base"
import config from "~config/index"
import loadMinified from "~config/load-minified"
import webpack from "webpack"

process.env.BABEL_ENV = "web"

const webpackProdConfig: webpack.Configuration = {
	name: "production",
	mode: "production",
	entry: {
		main: path.join(__dirname, "../src/app/index.ts")
	},
	output: {
		filename: "js/[name].js",
		libraryTarget: "commonjs2",
		path: path.join(__dirname, "../dist/web")
	},
	target: "node",
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
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				},
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
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
			serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
				"./service-worker-prod.js"))}</script>`
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "../static"),
				to: config.build.assetsSubDirectory,
				ignore: [ ".*", ]
			},
		]),
		// service worker caching
		new SWPrecacheWebpackPlugin({
			cacheId: "my-vue-app",
			filename: "service-worker.js",
			staticFileGlobs: [ "dist/**/*.{js,html,css}", ],
			minify: true,
			stripPrefix: "dist/"
		}),
	]
}

export default webpackMerge( baseWebpackConfig, webpackProdConfig)