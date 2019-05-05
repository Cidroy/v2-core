import chalk from "chalk"
import del from "del"
import packager from "electron-packager"
import webpack from "webpack"
import Multispinner from "multispinner"
import path from "path"
import Helper from "~build/helper"

type ElectronBuilderPostBuildFn = (buildPath: string, electronVersion: string, platform: string, arch: string) => Promise<boolean>
type ElectronWebpackConfig = {
	[I in "main" | "renderer" | "splashscreen"]: webpack.Configuration;
}

export class ElectronBuilder extends Helper {
	private _onBuild: packager.onCompleteFn[] = [
		(buildPath, electronVersion, platform, arch, callback) => {
			ElectronBuilder.console.info(`starting post build for '${platform}-${arch}'`)
			callback()
		},
	]

	private _webpackConfig: ElectronWebpackConfig

	private _buildConfig: packager.Options

	constructor(webpackConfig: ElectronWebpackConfig, buildConfig: packager.Options) {
		super()
		this._webpackConfig = webpackConfig
		this._buildConfig = buildConfig
	}

	public async bundleApp() {
		try {
			let appPaths: string | string[]
			ElectronBuilder.console.log("starting packager")
			this._buildConfig.afterPrune = this._onBuild
			appPaths = await packager(this._buildConfig)
			ElectronBuilder.console.done(`Build Complete`)
			ElectronBuilder.log("Output", appPaths, "gray")
			return true
		}
		catch (err) {
			ElectronBuilder.console.error(chalk.yellow("`electron-packager`"), err)
			throw "Electron packager failed"
		}
		return false
	}

	public build() {
		try {
			console.log(chalk.yellow.bold("Building ..."))
			del.sync(["dist/*", "!.gitkeep", "!dist/appConfig.json5",])
			const tasks: (keyof ElectronWebpackConfig)[] = ["main", "renderer", "splashscreen",]
			const m = new Multispinner(tasks, {
				preText: "building",
				postText: "process"
			})
			let results = ""
			m.on("success", () => {
				process.stdout.write("\x1B[2J\x1B[0f")
				console.log(`\n\n${results}`)
				ElectronBuilder.console.done(`take it away ${chalk.yellow("`electron-packager`")}`)
				this.bundleApp()
			})
			tasks.forEach(task => {
				ElectronBuilder.pack(this._webpackConfig[task])
					.then(result => {
						results += result + "\n\n"
						m.success(task)
					})
					.catch(err => {
						m.error(task)
						ElectronBuilder.console.error(`failed to build ${task} process`, err)
						process.exit(1)
					})
			})
		}
		catch (error) {
			ElectronBuilder.console.error("Build Failed", error)
		}
	}

	public onBuild(fn: ElectronBuilderPostBuildFn): void {
		this._onBuild.push(async (buildPath, electronVersion, platform, arch, callback) => {
			try {
				if (["linux", "win32",].includes(platform))
					buildPath = path.resolve(buildPath, "../..")
				// TODO: resolve path for mac
				else
					buildPath = path.resolve(buildPath, "..")
				await fn(buildPath, electronVersion, platform, arch)
				callback()
			}
			catch (error) {
				ElectronBuilder.console.error(`Postbuild Failed for '${platform}-${arch}'`, error)
				process.exit(1)
			}
		})
	}
}
