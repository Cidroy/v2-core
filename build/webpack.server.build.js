"use strict"

process.env.BABEL_ENV = "server"

const webpackMerge = require("webpack-merge")
const webpackBase = require("./webpack.server.base")
const nodeExternals = require("webpack-node-externals")

const serverConfig = {
	"mode" : "production",
	externals: [
		nodeExternals(),
	],
}

module.exports = webpackMerge(webpackBase, serverConfig)