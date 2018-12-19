process.env.BABEL_ENV = "renderer"

import webpack from "webpack"
import webpackMerge from "webpack-merge"
import BabiliWebpackPlugin from "babili-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

import webpackBase, { resolve } from "~build/webpack.base"

let splashscreenConfig: webpack.Configuration = {
	name: "electron-splashscreen",
	mode: "production",
	devtool: "#cheap-module-eval-source-map",
	entry: {
		splashscreen: resolve("src/splashscreen/main.ts")
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunksSortMode: "none",
			filename: "splashscreen.html",
			template: resolve("src/splashscreen/splashscreen.html"),
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
	],
	output: {
		filename: "js/[name].js",
		libraryTarget: "commonjs2",
		path: resolve("dist/electron")
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
	splashscreenConfig.devtool = false;

	(<webpack.Plugin[]>splashscreenConfig.plugins).push(
		new BabiliWebpackPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "\"production\""
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	)
}

export default webpackMerge(webpackBase, splashscreenConfig)