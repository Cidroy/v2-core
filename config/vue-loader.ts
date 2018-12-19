import * as utils from "~config/utils"
import config from "~config/index"
const isProduction = process.env.NODE_ENV === "production"

export default {
	loaders: {
		ts: {
			loader: "babel-loader"
		},
		...utils.cssLoaders({
			sourceMap: isProduction
				? config.build.productionSourceMap
				: config.dev.cssSourceMap,
			extract: isProduction
		}),
	},
	extractCSS: isProduction,
	transformToRequire: {
		video: "src",
		source: "src",
		img: "src",
		image: "xlink:href"
	},
	esModule: true
}