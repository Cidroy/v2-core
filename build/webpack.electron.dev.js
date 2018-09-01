const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const webpackBase = require("./webpack.base")

module.exports = webpackMerge(webpackBase, {
	target: "electron-renderer",
	mode: "development",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
	],
	devtool: "cheap-source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "../dist", "dev"),
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