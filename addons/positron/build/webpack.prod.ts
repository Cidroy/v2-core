process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import webpack from "webpack"
import webpackBase, { RESOLVE_PATHS } from "~positron/build/webpack.base"
import env from "~/config/env"

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
				enforce: "pre",
				loader: "webpack-preprocessor-loader",
				options: {
					params: {
						...env.preprocessor,
						production: true,
					},
				},
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
		],
	},
}

export default webpackMerge(webpackBase, serverConfig)