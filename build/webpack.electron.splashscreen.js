"use strict"

process.env.BABEL_ENV = "renderer"

const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const BabiliWebpackPlugin = require("babili-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const webpackBase = require("./webpack.base")

let splashscreenConfig = {
	mode: "production",
	devtool: "#cheap-module-eval-source-map",
	entry: {
		splashscreen: path.join(__dirname, "../src/splashscreen/main.ts")
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "splashscreen.html",
			template: path.resolve(__dirname, "../src/splashscreen/splashscreen.html"),
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
		filename: "js/[name].js",
		libraryTarget: "commonjs2",
		path: path.join(__dirname, "../dist/electron")
	},
	target: "electron-renderer"
}

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
	splashscreenConfig.mode = "development"
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
	splashscreenConfig.devtool = ""

	splashscreenConfig.plugins.push(
		new BabiliWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\""
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	)
}

module.exports = webpackMerge(webpackBase, splashscreenConfig)
