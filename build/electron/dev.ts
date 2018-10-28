"use strict"
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"

import chalk from "chalk"
import electron from "electron"
import { spawn, ChildProcess } from "child_process"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackHotMiddleware from "webpack-hot-middleware"

import { resolve } from "~build/webpack.base"
import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"

type DevServerKeys = "renderer" | "splashScreen"
class DevServer {
	private electronProcess: ChildProcess | undefined
	private manualRestart: boolean = false
	private hotMiddlewares: { [I in DevServerKeys]: webpackHotMiddleware.EventStream }
	private compilers: { [I in DevServerKeys]: webpack.Compiler }
	private console = {
		error: (e: string, i?: any) => {
			console.log(chalk.bgRed("ERROR") + " " + chalk.bold(e))
			if (i) console.log(chalk.gray(i))
		},
		warning: (e: string) => console.log(chalk.bgYellow("WARN") + " " + chalk.bold(e)),
		done: (e: string) => console.log(chalk.bgGreen("DONE") + " " + chalk.bold(e)),
		log: (e: string) => console.log(e),
	}

	private log(process: string, data: any, color: string = "yellow", compact: boolean = false){
		let log = ""
		let strip = false
		let flatData = () => data
			.toString()
			.split(/\r?\n/)
			.forEach(line => {
				if(compact) log += line
				else log += chalk[color].bold("║    ") + line + "\n" }
			)

		let consoleLog = () => {
			if(compact) console.log(chalk[color](`${process} >>> `), log)
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

		if(strip){
			log = ""
			flatData()

			if (/[0-9A-z]+/.test(log)) consoleLog()
		} else consoleLog()
	}

	constructor(){
		try {
			(<webpack.Entry>rendererConfig.entry).renderer = [resolve("build/dev-client"),].concat((<webpack.Entry>rendererConfig.entry).renderer);
			(<webpack.Entry>splashscreenConfig.entry).splashscreen = [resolve("build/dev-client"),].concat((<webpack.Entry>splashscreenConfig.entry).splashscreen)

			this.compilers = {
				renderer: webpack(rendererConfig),
				splashScreen: webpack(splashscreenConfig),
			}

			this.hotMiddlewares = {
				renderer: webpackHotMiddleware(this.compilers.renderer, {
					log: false,
					heartbeat: 2500
				}),
				splashScreen: webpackHotMiddleware(this.compilers.splashScreen, {
					log: false,
					heartbeat: 2500
				}),
			}
		} catch (error) {
			this.console.error("DevServer", error)
			throw error
		}
	}

	public async start(){
		// Greetings whoman!
		console.log(chalk.yellow.bold("\n  electron-vue"))
		console.log(chalk.blue("  getting ready... \n"))

		try {
			await Promise.all([ this.startRenderer(), this.startMain(), ])
			this.startElectron()
		} catch (error) { this.console.error("DevServer Start", error) }
	}

	private startMain() {
		return new Promise((res, rej) => {
			try {
				(<webpack.Entry>mainConfig.entry).main = [resolve("src/electron/index.dev.js"),].concat((<webpack.Entry>mainConfig.entry).main)

				const compiler = webpack(mainConfig)
				compiler.plugin("watch-run", (compilation, done) => {
					this.log("Main Process", chalk.white.bold("compiling..."))
					this.hotMiddlewares.renderer.publish({ action: "compiling" })
					done()
				})

				compiler.watch({}, (err, stats) => {
					if (err) {
						console.log(err)
						return
					}
					this.log("Main Process", stats)

					if (this.electronProcess && this.electronProcess.kill) {
						this.manualRestart = true
						process.kill(this.electronProcess.pid)
						this.electronProcess = undefined
						this.startElectron()

						setTimeout(() => { this.manualRestart = false }, 5000)
					}
					res()
				})
			} catch (error) {
				this.console.error("Main Promise", error)
			}
		})
	}

	private startRenderer() {
		let reload = (conf: DevServerKeys , compilation) => {
			compilation.plugin("html-webpack-plugin-after-emit", (data, cb) => {
				this.hotMiddlewares[conf].publish({ action: "reload" })
				if (typeof cb === "function") cb()
			})
		}

		return new Promise((res, rej) => {
			try {
				this.compilers.splashScreen.plugin("compilation", compilation => reload("splashScreen", compilation))
				this.compilers.renderer.plugin("compilation", compilation => reload("renderer", compilation))
				
				this.compilers.splashScreen.plugin("done", stats => { this.log("Splash Screen Process", stats) })
				this.compilers.renderer.plugin("done", stats => { this.log("Renderer Process", stats) })
				
				const splashscreenServer = this.createDevServer("splashScreen", res)
				const server = this.createDevServer("renderer" , res)
				
				server.listen(9080)
				splashscreenServer.listen(9081)
			} catch (error) {
				this.console.error("Renderer Promise", error)
				throw error
			}
		})
	}

	private createDevServer(conf: DevServerKeys , res: (value?: {} | PromiseLike<{}> | undefined) => void) {
		try {
			let that = this
			let devServer = new WebpackDevServer(this.compilers[conf], {
				contentBase: resolve("/"),
				quiet: true,
				// @ts-ignore
				before(app, ctx) {
					app.use(that.hotMiddlewares[conf])
					ctx.middleware.waitUntilValid(() => { res() })
				}
			})
			return devServer
		} catch (error) {
			this.console.error("Create Dev Server", error)
		}
	}

	private startElectron() {
		try {
			this.electronProcess = spawn(electron.toString(), ["--inspect=5858", resolve("dist/electron/main.js"), ])
	
			this.electronProcess.stdout.on("data", data => { this.log("Electron", data, "blue", true) })
			this.electronProcess.stderr.on("data", data => { this.log("Electron", data, "red") })
			
			this.electronProcess.on("close", () => {
				if (!this.manualRestart){
					this.console.done("Live Server Exited")
					process.exit()
				}
			})
		} catch (error) {
			this.console.error("Electron Promise", error)
			throw error
		}
	}
}

const devServer = new DevServer()
devServer.start()