"use strict"

process.env.BABEL_ENV = "renderer"

const path = require("path")
const { dependencies } = require("../package.json")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const BabiliWebpackPlugin = require("babili-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const webpackBase = require("./webpack.base")

/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = [ "vue", "vuetify", ]

let rendererConfig = {
	mode: "production",
	devtool: "#cheap-module-eval-source-map",
	entry: {
		renderer: path.join(__dirname, "../src/app/index.js")
	},
	externals: [ ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d)),  ],
	node: {
		__dirname: process.env.NODE_ENV !== "production",
		__filename: process.env.NODE_ENV !== "production"
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "../src/index.ejs"),
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			},
			nodeModules: process.env.NODE_ENV !== "production"
				? path.resolve(__dirname, "../node_modules")
				: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
	output: {
		filename: "[name].js",
		libraryTarget: "commonjs2",
		path: path.join(__dirname, "../dist/electron")
	},
	target: "electron-renderer"
}

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
	rendererConfig.plugins.push(
		new webpack.DefinePlugin({
			"__static": `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
		})
	)
	rendererConfig.mode = "development"
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
	rendererConfig.devtool = ""

	rendererConfig.plugins.push(
		new BabiliWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, "../static"),
				to: path.join(__dirname, "../dist/electron/static"),
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

module.exports = webpackMerge(webpackBase, rendererConfig)
