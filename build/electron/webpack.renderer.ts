process.env.BABEL_ENV = "renderer"

const { dependencies } = require("~/package.json")
import webpack from "webpack"
import webpackMerge from "webpack-merge"
import BabiliWebpackPlugin from "babili-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import WebpackPwaManifest from "webpack-pwa-manifest"
import WorkboxPlugin from "workbox-webpack-plugin"

import webpackBase, { resolve } from "~build/webpack.base"
import { manifest } from "~/config/manifest"

/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = [ "vue", "vuetify", ]

let rendererConfig: webpack.Configuration = {
	name: "electron-renderer",
	mode: "production",
	devtool: "#cheap-module-eval-source-map",
	entry: {
		renderer: resolve("src/app/index.ts")
	},
	externals: [ ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d)),  ],
	node: {
		__dirname: process.env.NODE_ENV !== "production",
		__filename: process.env.NODE_ENV !== "production"
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunksSortMode: "none",
			filename: "index.html",
			template: resolve("src/index.ejs"),
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			},
			nodeModules: process.env.NODE_ENV !== "production"
				? resolve("node_modules")
				: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new WebpackPwaManifest(manifest),
		new WorkboxPlugin.GenerateSW({
			importWorkboxFrom: "local",
			clientsClaim: true,
			skipWaiting: true,
			offlineGoogleAnalytics: true,
		}),
	],
	output: {
		filename: "js/[name].js",
		libraryTarget: "commonjs2",
		path: resolve("dist/electron")
	},
	target: "electron-renderer",
	optimization: {
		splitChunks: {
			name: true,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					name(module){
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
						return `vendor.${packageName.replace("@", "")}`
					},
					enforce: true,
					minSize: 102400,
				},
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
	}
}

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
	(<webpack.Plugin[]>rendererConfig.plugins).push(
		new webpack.DefinePlugin({
			__static: `"${resolve("static").replace(/\\/g, "\\\\")}"`
		})
	)
	rendererConfig.mode = "development"
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
	rendererConfig.devtool = false;

	(<webpack.Plugin[]>rendererConfig.plugins).push(
		new BabiliWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: resolve("static"),
				to: resolve("dist/electron/static"),
				ignore: [ ".*", ]
			},
		]),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\""
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	)
}

export default webpackMerge(webpackBase, rendererConfig)