process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfigProd from "~build/webpack.prod"
import webpackMerge from "webpack-merge"
import { WebBuilder } from "~build/web/WebBuilder"

let webpackConfig = webpackMerge(webpackConfigProd, {
	module: {
		rules: [
			{
				test: /\.(jsx?|vue|tsx?)$/,
				use: "strip-debug-block",
				enforce: "pre",
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
				options: {
					start: "IF NOT-WEB",
					end: "ENDIF NOT-WEB"
				}
			},
		]
	}
})

let builder = new WebBuilder(webpackConfig, config.build.assetsRoot)
builder.build()