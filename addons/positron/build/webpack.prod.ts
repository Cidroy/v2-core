process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import webpack from "webpack"
import webpackBase from "~positron/build/webpack.base"

const serverConfig: webpack.Configuration = {
	name: "positron-production",
	mode : "production",
	externals: [
		nodeExternals(),
	],
}

export default webpackMerge(webpackBase, serverConfig)