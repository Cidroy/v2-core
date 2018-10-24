var path = require("path")

function resolve(dir) {
	return path.join(__dirname, "..", dir)
}

let RESOLVE_PATHS = [
	resolve("server"),
	resolve("typescript"),
	resolve("classes"),
	resolve("test"),
]

module.exports = {
	entry: {
		index: resolve("server/index.ts")
	},
	output: {
		path: resolve("dist/server"),
		filename: "[name].js"
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
		modules: ["node_modules", path.resolve(__dirname, "../app_modules/webpack/loaders"),]
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
				test: /\.node$/,
				use: "node-loader"
			}
		]
	},
}