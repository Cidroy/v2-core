process.env.NODE_ENV = "production"

import buildConfig from "~config/electron.build.ts"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"

import { ElectronBuilder } from "~build/electron/ElectronBuilder"
import PositronBinaryBuilder from "~addons/positron"

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

applicationBuilder.build()