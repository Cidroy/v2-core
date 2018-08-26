var utils = require("./utils")
var config = require("./index")
var isProduction = process.env.NODE_ENV === "production"

module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: isProduction
			? config.build.productionSourceMap
			: config.dev.cssSourceMap,
		extract: isProduction
	}),
	extractCSS: isProduction,
	transformToRequire: {
		video: "src",
		source: "src",
		img: "src",
		image: "xlink:href"
	}
}