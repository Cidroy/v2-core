import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpack from "webpack"
import { resolve } from "~build/webpack.base"

const RESOLVE_PATHS = [
	resolve("server"),
	resolve("typescript"),
	resolve("classes"),
	resolve("test"),
]

const baseConfig: webpack.Configuration = {
	name: "server-base",
	target: "node",
	entry: {
		index: resolve("server/index.ts"),
	},
	output: {
		path: resolve("dist/server"),
		filename: "[name].js"
	},
	optimization: {
		minimizer: [
			// we specify a custom UglifyJsPlugin here to get source maps in production
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					ecma: 6,
					mangle: true
				},
				sourceMap: true
			}),
		],
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				},
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
	},
	resolve: {
		extensions: [
			".js",
			".jsx",
			".json",
			".node",
			".ts",
			".tsx",
		],
		alias: {
			"@typescript": resolve("typescript"),
			"@classes": resolve("classes"),
			"@server": resolve("server")
		}
	},
	resolveLoader: {
		modules: [
			"node_modules",
			resolve("app_modules/webpack/loaders"),
		]
	},
	module: {
		rules: [
			{
				test: /\.((j|t)sx?)$/,
				use: "strip-debug-block",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
			{
				test: /\.js$/,
				loader: "eslint-loader",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
			{
				test: /\.((j|t)sx?)$/,
				use: "babel-loader",
				exclude: /node_modules/,
				include: RESOLVE_PATHS
			},
			{
				test: /\.json5$/,
				use: "json5-loader"
			},
			{
				test: /\.node$/,
				use: "node-loader"
			},
		]
	},
}

export default baseConfig