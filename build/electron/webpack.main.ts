"use strict"

process.env.BABEL_ENV = "main"

const { dependencies } = require("~/package.json")
import webpack from "webpack"
import webpackMerge from "webpack-merge"
import BabiliWebpackPlugin from "babili-webpack-plugin"

import webpackBase, { resolve } from "~build/webpack.base"

let mainConfig : webpack.Configuration= {
	name: "electron-main",
	mode: "production",
	entry: {
		main: resolve("src/electron/index.ts")
	},
	externals: [ ...Object.keys(dependencies || {}),  ],
	node: {
		__dirname: process.env.NODE_ENV !== "production",
		__filename: process.env.NODE_ENV !== "production"
	},
	output: {
		filename: "[name].js",
		libraryTarget: "commonjs2",
		path: resolve("dist/electron")
	},
	plugins: [ new webpack.NoEmitOnErrorsPlugin(),  ],
	target: "electron-main"
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
	(<webpack.Plugin[]>mainConfig.plugins).push(
		new webpack.DefinePlugin({
			__static: `"${resolve("static").replace(/\\/g, "\\\\")}"`
		})
	)
	mainConfig.mode = "development"
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
	(<webpack.Plugin[]>mainConfig.plugins).push(
		new BabiliWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\""
		})
	)
}

export default webpackMerge(webpackBase, mainConfig)