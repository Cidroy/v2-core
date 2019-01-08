process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import webpack from "webpack"
import webpackBase, { RESOLVE_PATHS } from "~positron/build/webpack.base"

const serverConfig: webpack.Configuration = {
	name: "positron-production",
	mode : "production",
	externals: [
		nodeExternals(),
	],
	module: {
		rules: [
			{
				test: /\.((j|t)sx?)$/,
				use: "strip-debug-block",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
		]
	}
}

export default webpackMerge(webpackBase, serverConfig)