process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import webpackBase from "~build/server/webpack.base"
import nodeExternals from "webpack-node-externals"
import webpack from "webpack"

const serverConfig: webpack.Configuration = {
	name: "server-production",
	mode : "production",
	externals: [
		nodeExternals(),
	],
}

export default webpackMerge(webpackBase, serverConfig)