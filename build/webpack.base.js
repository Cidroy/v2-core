var path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")
var vueLoaderConfig = require("../config/vue-loader")
const config = require("../config")
const utils = require("../config/utils")

function resolve(dir) {
	return path.join(__dirname, "..", dir)
}

let RESOLVE_PATHS = [
	resolve("src"),
	resolve("typescript"),
	resolve("classes"),
	resolve("test"),
]

module.exports = {
	output: {
		path: config.build.assetsRoot,
		filename: "js/[name].js",
		publicPath: process.env.NODE_ENV === "production"
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: [ 
			".js", 
			".jsx", 
			".vue", 
			".json", 
			".node", 
			".ts",
			".tsx",
		],
		alias: {
			"@@": resolve("src"),
			"@": resolve("src/app"),
			"@electron": resolve("src/electron"),
			"@typescript": resolve("typescript"),
			"@classes": resolve("classes"),
			"@server": resolve("server"),
			"vue$": "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' for webpack
		}
	},
	resolveLoader: {
		modules: [ "node_modules", path.resolve(__dirname, "../app_modules/webpack/loaders"), ]
	},
	module: {
		rules: [
			{
				test: /\.(js|vue|tsx?)$/,
				use: "strip-debug-block",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
			{
				test: /\.(js|vue)$/,
				loader: "eslint-loader",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
				options: {
					formatter: require("eslint-friendly-formatter"),
					emitWarning: !config.dev.showEslintErrorsInOverlay
				}
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: vueLoaderConfig
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
			},
			{
				test: /\.json5$/,
				use: "json5-loader"
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("img/[name].[ext]")
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("media/[name].[ext]")
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("fonts/[name].[ext]")
				}
			},
			{
				test: /\.(styl|stylus)$/,
				use: [
					MiniCssExtractPlugin.loader, 
					"css-loader",
					"stylus-loader",
				]			
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 
					"css-loader",
				]			
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader, 
					"css-loader",
					"sass-loader",
				]			
			},
		]
	},
	plugins: [
		// vue-loader version is 15 and above ,you should add VueLoaderPlugin like this in your webpack config
		new VueLoaderPlugin(),
		// alternative to extract-text-webpack-plugin because rumors is that they will stop developing it
		// extract css into its own file
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "css/[name].[id].css"
		}),
	]
}