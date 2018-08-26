var path = require("path")
var CopyWebpackPlugin = require("copy-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
var UglifyJsPlugin = require("uglifyjs-webpack-plugin")
var webpackMerge = require("webpack-merge")
const safeParser = require("postcss-safe-parser")
var baseWebpackConfig = require("./webpack.base")
var config = require("../config")
var loadMinified = require("../config/load-minified")

var webpackProdConfig = webpackMerge(
	baseWebpackConfig,
	{
		mode: "production",
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
			// duplicated CSS from different components can be deduped.
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
				chunksSortMode: "dependency",
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
)

module.exports = webpackProdConfig