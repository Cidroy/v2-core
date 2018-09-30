"use strict"

process.env.BABEL_ENV = "main"

const path = require("path")
const { dependencies } = require("../package.json")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const BabiliWebpackPlugin = require("babili-webpack-plugin")

const webpackBase = require("./webpack.base")

let mainConfig = {
	mode: "production",
	entry: {
		main: path.join(__dirname, "../src/electron/index.ts")
	},
	externals: [ ...Object.keys(dependencies || {}),  ],
	node: {
		__dirname: process.env.NODE_ENV !== "production",
		__filename: process.env.NODE_ENV !== "production"
	},
	output: {
		filename: "[name].js",
		libraryTarget: "commonjs2",
		path: path.join(__dirname, "../dist/electron")
	},
	plugins: [ new webpack.NoEmitOnErrorsPlugin(),  ],
	target: "electron-main"
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
	mainConfig.plugins.push(
		new webpack.DefinePlugin({
			"__static": `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
		})
	)
	mainConfig.mode = "development"
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
	mainConfig.plugins.push(
		new BabiliWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\""
		})
	)
}

module.exports = webpackMerge(webpackBase, mainConfig)
