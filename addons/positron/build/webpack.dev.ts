process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import StartServerPlugin from "start-server-webpack-plugin"
import { resolve, RESOLVE_PATHS } from "~build/webpack.base"
import webpackBase, { RESOLVE } from "~positron/build/webpack.base"
import env from "~/config/env"

const serverConfig: webpack.Configuration = {
	name: "positron-dev",
	mode : "development",
	entry: {
		index: [ "webpack/hot/poll?100", RESOLVE("src/index.dev.ts"), ],
	},
	devtool: "cheap-source-map",
	devServer: {
		contentBase: resolve("dist/positron-dev"),
		stats: {
			colors: true,
			chunks: false,
			children: false
		},
	},
	watch: true,
	externals: [
		nodeExternals({
			whitelist: [ "webpack/hot/poll?100", ],
		}),
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
						positron: true,
						debug: true,
					},
				},
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new StartServerPlugin("index.js"),
	]
}

export default webpackMerge(webpackBase, serverConfig)
