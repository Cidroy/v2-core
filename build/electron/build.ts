process.env.NODE_ENV = "production"

import chalk from "chalk"
import del from "del"
import packager from "electron-packager"
import webpack from "webpack"
import Multispinner from "multispinner"
import { compile } from "nexe"
import path from "path"

import buildConfig from "~config/electron.build.ts"
import server from "~config/server.build"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"
import serverConfig from "~build/server/webpack.prod"

class ApplicationBuilder {
	private console = {
		error: (e: string, i?: any) => {
			console.log(chalk.bgRed("ERROR") + " " + chalk.bold(e))
			if (i) console.log(chalk.gray(i))
		},
		warning: (e: string) => console.log(chalk.bgYellow("WARN") + " " + chalk.bold(e)),
		done: (e: string) => console.log(chalk.bgGreen("DONE") + " " + chalk.bold(e)),
		log: (e: string) => console.log(e),
	}

	private log(process: string, data: any, color: string = "yellow", compact: boolean = false) {
		let log = ""
		let strip = false
		let flatData = () => data
			.toString()
			.split(/\r?\n/)
			.forEach(line => {
				if (compact) log += line
				else log += chalk[color].bold("║    ") + line + "\n"
			}
			)

		let consoleLog = () => {
			if (compact) console.log(chalk[color](`${process} >>> `), log)
			else {
				console.log(
					chalk[color].bold(`╓── ${process} ${new Array((25 - process.length) + 1).join("─")}\n`) +
					log +
					chalk[color].bold(`╙${new Array(30).join("─")}\n`)
				)
			}
		}

		try {
			if (typeof data === "object") {
				data.toString({
					colors: true,
					chunks: false,
				}).split(/\r?\n/).forEach(line => {
					log += chalk[color].bold("║    ") + line + "\n"
				})
			}
			else flatData()
		} catch (error) {
			strip = true
		}

		if (strip) {
			log = ""
			flatData()

			if (/[0-9A-z]+/.test(log)) consoleLog()
		} else consoleLog()
	}

	private pack(config: webpack.Configuration){
		return new Promise((resolve, reject) => {
			webpack(config, (err, stats) => {
				if (err) reject(err.stack || err)
				else if (stats.hasErrors()) {
					let err = ""
					this.log("Webpack " + <string>config.name, stats)
					reject(err)
				}
				else {
					resolve(stats.toString({
						chunks: false,
						colors: true
					}))
				}
			})
		})
	}

	private async bundleServer(appPaths, platform){
		console.log("Building Server")
		try {
			await this.pack(serverConfig)
			for (const key in appPaths) {
				await compile(Object.assign(server.pack, {
					output: path.resolve(appPaths[key], "resources", server.pack.output),
					target: platform
				}))
			}
		} catch (e) {
			this.console.error("Server build failed because", e)
			throw "Server build failure"
		}
	}

	private async bundleApp(){
		try {
			let appPaths: string| string[]
			try {
				this.console.log("starting packager")
				appPaths = await packager(buildConfig)
				this.console.done(`Time to Pack other things`)
			} catch (err) {
				this.console.error(chalk.yellow("`electron-packager`"), err)
				throw "Electron packager failed"
			}
			await this.bundleServer(appPaths, buildConfig.platform)
			return true
		} catch (err) {
			this.console.error("App Bundling failed", err)
			throw "Electron packager failed"
		}
		return false
	}

	public build(){
		try {
			console.log(chalk.yellow.bold("Building ..."))

			del.sync(["dist/*", "bin/*", "!.gitkeep",])

			const tasks = ["main", "renderer", "splashscreen",]
			const m = new Multispinner(tasks, {
				preText: "building",
				postText: "process"
			})

			let results = ""

			m.on("success", () => {
				process.stdout.write("\x1B[2J\x1B[0f")
				console.log(`\n\n${results}`)
				this.console.done(`take it away ${chalk.yellow("`electron-packager`")}`)
				this.bundleApp()
			})

			this.pack(mainConfig).then(result => {
				results += result + "\n\n"
				m.success("main")
			}).catch(err => {
				m.error("main")
				this.console.error("failed to build main process", err)
				process.exit(1)
			})

			this.pack(rendererConfig).then(result => {
				results += result + "\n\n"
				m.success("renderer")
			}).catch(err => {
				m.error("renderer")
				this.console.error("failed to build renderer process", err)
				process.exit(1)
			})

			this.pack(splashscreenConfig).then(result => {
				results += result + "\n\n"
				m.success("splashscreen")
			}).catch(err => {
				m.error("splashscreen")
				this.console.error("failed to build splashscreen process", err)
				process.exit(1)
			})
		} catch (error) {
			this.console.error("Build Failed", error)
		}
	}
}

let builder = new ApplicationBuilder()
builder.build()