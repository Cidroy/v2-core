process.env.NODE_ENV = "production"

import buildConfig from "~config/electron.build.ts"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"

import { ElectronBuilder } from "~build/electron/ElectronBuilder"
import ServerExecutableBuilder from "~addons/positron"

let applicationBuilder = new ElectronBuilder(
	{
		main: mainConfig,
		renderer: rendererConfig,
		splashscreen: splashscreenConfig
	},
	buildConfig
)

applicationBuilder.onBuild(async (buildPath, electronVersion, platform, arch) => {
	let serverBuilder = new ServerExecutableBuilder(buildPath, platform)
	await serverBuilder.build()
	return true
})

applicationBuilder.build()