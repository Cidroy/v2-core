import path from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import MediaQueryPlugin from "media-query-plugin"
import config from "~config/index"

export const assetsPath = function (_path) {
	let assetsSubDirectory = process.env.NODE_ENV === "production"
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)
}

export const cssLoaders = function (options) {
	options = options || {}

	let cssLoader = {
		loader: "css-loader",
		options: {
			minimize: process.env.NODE_ENV === "production",
			sourceMap: options.sourceMap
		}
	}

	// generate loader string to be used with extract text plugin
	function generateLoaders(
		loader ?:string,
		loaderOptions?: { minimize?: boolean, sourceMap?: any, indentedSyntax ?: boolean }
	)
	{
		let loaders = [ cssLoader, ]
		if (loader) {
			loaders.push({
				loader: loader + "-loader",
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap,
					minimize: true
				})
			})
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return {
				use: [ MiniCssExtractPlugin.loader, MediaQueryPlugin.loader, ].concat(loaders),
				fallback: "vue-style-loader"
			}
		}
		else
			return [ "vue-style-loader", ].concat(loaders as any[])
	}

	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		less: generateLoaders("less"),
		sass: generateLoaders("sass", { indentedSyntax: true }),
		scss: generateLoaders("sass"),
		stylus: generateLoaders("stylus"),
		styl: generateLoaders("stylus")
	}
}

// Generate loaders for standalone style files (outside of .vue)
export const styleLoaders = function (options) {
	let output: { test: RegExp, use: any}[] = []
	let loaders = cssLoaders(options)
	for (let extension in loaders) {
		let loader = loaders[extension]
		output.push({
			test: new RegExp("\\." + extension + "$"),
			use: loader
		})
	}
	return output
}