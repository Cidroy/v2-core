process.env.NODE_ENV = "production"

import config from "~config/index"
import webpackConfigProd from "~build/webpack.prod"
import webpackMerge from "webpack-merge"
import { WebBuilder } from "~build/web/WebBuilder"
import { RESOLVE_PATHS } from "~build/webpack.base"
import env from "~/config/env"

let webpackConfig = webpackMerge(webpackConfigProd, {
	module: {
		rules: [
			{
				test: /\.((j|t)sx?)$/,
				enforce: "pre",
				loader: "webpack-preprocessor-loader",
				options: {
					params: {
						...env.preprocessor,
						web: true,
					},
				},
				exclude: /node_modules/,
				include: RESOLVE_PATHS,
			},
		],
	},
})

let builder = new WebBuilder(webpackConfig, config.build.assetsRoot)
builder.build()
