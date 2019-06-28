import webpack from "webpack"
import webpackMerge from "webpack-merge"
import webpackBase from "~build/webpack.base"
import { spawn } from "child_process"
import { resolve } from "~/config/resolve"

export default webpackMerge(webpackBase, {
	name: "electron-dev",
	target: "electron-renderer",
	mode: "development",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
	],
	devtool: "cheap-source-map",
	devServer: {
		contentBase: resolve("dist/dev"),
		stats: {
			colors: true,
			chunks: false,
			children: false
		},
		before() {
			spawn(
				"electron",
				[ ".",  ],
				{ shell: true, env: process.env, stdio: "inherit" }
			)
				.on("close", code => process.exit(0))
				.on("error", spawnError => console.error(spawnError))
		}
	}
})
