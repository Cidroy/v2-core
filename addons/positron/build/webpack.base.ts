import path from "path"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import webpack from "webpack"
import { resolve } from "~/config/resolve"
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"

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

	resolve("addons/neutron"),
]

const baseConfig: webpack.Configuration = {
	name: "positron-base",
	target: "node",
	entry: {
		index: RESOLVE("src/index.ts"),
	},
	output: {
		path: resolve("dist/positron"),
		filename: "[name].js"
	},
	optimization: {
		minimize: false,
		minimizer: [
			// we specify a custom UglifyJsPlugin here to get source maps in production
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					ecma: 6,
					mangle: true,
					keep_classnames: true,
					keep_fnames: true,
					// compress: false,
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
			"@positron": RESOLVE("src"),

			"@neutron": resolve("addons/neutron/src"),
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
				test: /\.(jsx?)$/,
				use: "babel-loader",
				exclude: /node_modules/,
				include: RESOLVE_PATHS
			},
			{
				test: /\.(tsx?)$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
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
	// plugins: [
		// TODO: implement type check, may cause problem in production
	// 	new ForkTsCheckerPlugin({
	// 		measureCompilationTime: true,
	// 	}),
	// ]
}

export default baseConfig
