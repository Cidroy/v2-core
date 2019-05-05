import path from "path"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpack from "webpack"
import { resolve } from "~build/webpack.base"

export const RESOLVE = (src: string) => path.resolve(__dirname, "..", src)

export const RESOLVE_PATHS = [
	RESOLVE(""),
	RESOLVE("src"),
	RESOLVE("test"),
	resolve("plugins"),
	resolve("typescript"),
	resolve("build"),
	resolve("classes"),
	resolve("test"),
]

const baseConfig: webpack.Configuration = {
	name: "neutron-base",
	target: "node",
	entry: {
		index: RESOLVE("src/index.ts"),
	},
	output: {
		path: resolve("dist/neutron"),
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
			"~": resolve(""),
			"@typescript": resolve("typescript"),
			"@classes": resolve("classes"),
			"@plugins": resolve("plugins"),
			"@neutron": RESOLVE("src"),
		}
	},
	resolveLoader: {
		modules: [
			"node_modules",
			resolve("addons/webpack/loaders"),
		]
	},
	module: {
		rules: [
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
