process.env.NODE_ENV = "production"

import webpack from "webpack"
import buildConfig from "~config/electron.build.ts"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"

import { ElectronBuilder } from "~build/electron/ElectronBuilder"
import PositronBinaryBuilder from "~addons/positron"
import PrinterTemplateBuilder from "~/addons/printer"
import env from "~/config/env"
import { RESOLVE_PATHS } from "~build/webpack.base"

const debugRule: webpack.RuleSetRule = {
	test: /\.((j|t)sx?)$/,
	enforce: "pre",
	loader: "webpack-preprocessor-loader",
	options: {
		params: {
			...env.preprocessor,
			debug: true,
			electron: true,
		},
	},
	exclude: /node_modules/,
	include: RESOLVE_PATHS,
}
mainConfig.module!.rules.push(debugRule)
rendererConfig.module!.rules.push(debugRule)
splashscreenConfig.module!.rules.push(debugRule)

let applicationBuilder = new ElectronBuilder(
	{
		main: mainConfig,
		renderer: rendererConfig,
		splashscreen: splashscreenConfig
	},
	buildConfig
)

applicationBuilder.onBuild(async (buildPath, electronVersion, platform, arch) => {
 	let positronBuilder = new PositronBinaryBuilder(buildPath, platform)
 	await positronBuilder.build()
 	return true
})

applicationBuilder.onBuild(async (buildPath, electronVersion, platform, arch) => {
	let printerTemplateBuilder = new PrinterTemplateBuilder(buildPath, platform)
	await printerTemplateBuilder.build()
 	return true
})

applicationBuilder.build()
