process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import StartServerPlugin from "start-server-webpack-plugin"
import { RESOLVE_PATHS } from "~build/webpack.base"
import webpackBase, { RESOLVE } from "~positron/build/webpack.base"
import env from "~/config/env"
import { resolve } from "~/config/resolve"

const serverConfig: webpack.Configuration = {
	name: "positron-dev",
	mode : "development",
	entry: {
		index: [
			RESOLVE("src/index.dev.ts"),
		],
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
	externals: [
		nodeExternals({
			whitelist: [
			],
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
		new webpack.NamedModulesPlugin(),
		new StartServerPlugin("index.js"),
	]
}

export default webpackMerge(webpackBase, serverConfig)
