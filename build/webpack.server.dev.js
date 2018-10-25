"use strict"

process.env.BABEL_ENV = "server"

const webpackMerge = require("webpack-merge")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const StartServerPlugin = require("start-server-webpack-plugin")
const path = require("path")
const webpackBase = require("./webpack.server.base")

function resolve(dir) {
	return path.join(__dirname, "..", dir)
}

const serverConfig = {
	"mode" : "development",
	entry: {
		index: ["webpack/hot/poll?100", resolve("server/index.dev.ts")],
	},
	devtool: "cheap-source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "..", "dist/server"),
		stats: {
			colors: true,
			chunks: false,
			children: false
		},
	},
	watch: true,
	externals: [
		nodeExternals({
			whitelist: ["webpack/hot/poll?100"],
		}),
	],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new StartServerPlugin("index.js")
	]
}

module.exports = webpackMerge(webpackBase, serverConfig)