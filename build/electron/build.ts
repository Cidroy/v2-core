process.env.NODE_ENV = "production"

import chalk from "chalk"
import del from "del"
import packager from "electron-packager"
import webpack from "webpack"
import Multispinner from "multispinner"
import path from "path"

import buildConfig from "~config/electron.build.ts"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"
import Helper from "~build/helper"

import ServerExecutableBuilder from "~/app_modules/server"

type ApplicationBuilderPostBuildFn = (buildPath: string, electronVersion: string, platform: string, arch: string) => Promise<boolean>
type ApplicationWebpackConfig = { [I in "main" | "renderer" | "splashscreen"]: webpack.Configuration }
class ApplicationBuilder extends Helper{

	private _onBuild: packager.onCompleteFn[] = [
		(buildPath, electronVersion, platform, arch, callback) => {
			ApplicationBuilder.console.info(`starting post build for '${platform}-${arch}'`)
			callback()
		},
	]
	private _webpackConfig: ApplicationWebpackConfig
	private _buildConfig: packager.Options

	constructor(webpackConfig: ApplicationWebpackConfig, buildConfig: packager.Options) {
		super()
		this._webpackConfig = webpackConfig
		this._buildConfig = buildConfig
	}

	public async bundleApp(){
		try {
			let appPaths: string| string[]
			ApplicationBuilder.console.log("starting packager")
			this._buildConfig.afterPrune = this._onBuild
			appPaths = await packager(this._buildConfig)
			ApplicationBuilder.console.done(`Build Complete`)
			ApplicationBuilder.log("Output", appPaths, "gray")
			return true
		} catch (err) {
			ApplicationBuilder.console.error(chalk.yellow("`electron-packager`"), err)
			throw "Electron packager failed"
		}
		return false
	}

	public build(){
		try {
			console.log(chalk.yellow.bold("Building ..."))
			
			del.sync(["dist/*", "bin/*", "!.gitkeep",])

			const tasks: (keyof ApplicationWebpackConfig)[] = ["main", "renderer", "splashscreen",]
			const m = new Multispinner(tasks, {
				preText: "building",
				postText: "process"
			})

			let results = ""

			m.on("success", () => {
				process.stdout.write("\x1B[2J\x1B[0f")
				console.log(`\n\n${results}`)
				ApplicationBuilder.console.done(`take it away ${chalk.yellow("`electron-packager`")}`)
				this.bundleApp()
			})

			tasks.forEach(task => {
				ApplicationBuilder.pack(this._webpackConfig[task])
					.then(result => {
						results += result + "\n\n"
						m.success(task)
					})
					.catch(err => {
						m.error(task)
						ApplicationBuilder.console.error(`failed to build ${task} process`, err)
						process.exit(1)
					})
			})
		} catch (error) {
			ApplicationBuilder.console.error("Build Failed", error)
		}
	}

	public onBuild(fn: ApplicationBuilderPostBuildFn): void{
		this._onBuild.push(async (buildPath, electronVersion, platform, arch, callback) => {
			try {
				if(["linux", "win32", ].includes(platform)) buildPath = path.resolve(buildPath, "../..")
				// TODO: resolve path for mac
				else buildPath = path.resolve(buildPath, "..")
				await fn(buildPath, electronVersion, platform, arch)
				callback()
			} catch (error) {
				ApplicationBuilder.console.error(`Postbuild Failed for '${platform}-${arch}'`, error)
				process.exit(1)
			}
		})
	}
}

let builder = new ApplicationBuilder(
	{
		main: mainConfig,
		renderer: rendererConfig,
		splashscreen: splashscreenConfig
	},
	buildConfig
)

builder.onBuild(async (buildPath, electronVersion, platform, arch) => {
	let serverBuilder = new ServerExecutableBuilder(buildPath, platform)
	await serverBuilder.build()
	return true
})

builder.build()