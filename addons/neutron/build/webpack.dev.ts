process.env.BABEL_ENV = "server"

import webpackMerge from "webpack-merge"
import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import StartServerPlugin from "start-server-webpack-plugin"
import { resolve } from "~build/webpack.base"
import webpackBase, { RESOLVE } from "~neutron/build/webpack.base"

const serverConfig: webpack.Configuration = {
	name: "neutron-dev",
	mode : "development",
	entry: {
		index: [ "webpack/hot/poll?100", RESOLVE("src/index.dev.ts"), ],
	},
	devtool: "cheap-source-map",
	devServer: {
		contentBase: resolve("dist/neutron-dev"),
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
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new StartServerPlugin("index.js"),
	]
}

export default webpackMerge(webpackBase, serverConfig)
