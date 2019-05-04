process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import webpack from "webpack"
import webpackBase, { RESOLVE_PATHS } from "~neutron/build/webpack.base"

const serverConfig: webpack.Configuration = {
	name: "neutron-production",
	mode : "production",
	externals: [
		nodeExternals(),
	],
	module: {
		rules: [
		]
	}
}

export default webpackMerge(webpackBase, serverConfig)
