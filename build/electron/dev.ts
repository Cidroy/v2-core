"use strict"
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"

import chalk from "chalk"
import electron from "electron"
import { spawn, ChildProcess } from "child_process"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackHotMiddleware from "webpack-hot-middleware"

import mainConfig from "~build/electron/webpack.main"
import rendererConfig from "~build/electron/webpack.renderer"
import splashscreenConfig from "~build/electron/webpack.splashscreen"
import BuildHelper from "~build/helper"

type DevServerKeys = "renderer" | "splashscreen"
class DevServer extends BuildHelper{
	private _electronProcess: ChildProcess | undefined
	private _manualRestart: boolean = false
	private _hotMiddlewares: { [I in DevServerKeys]: webpackHotMiddleware.EventStream| null }
	private _compilers: { [I in DevServerKeys]: webpack.Compiler|null }
	private _otherConfigs: { [I in DevServerKeys]: { config: webpack.Configuration, port: number } }
	private _mainConfig: webpack.Configuration

	constructor(
		mainConfig: webpack.Configuration,
		otherConfig: { [I in DevServerKeys]: { config: webpack.Configuration, port: number } },
	){
		super()
		try {
			this._mainConfig = mainConfig
			this._otherConfigs = otherConfig
			
			this._compilers = {
				renderer: null,
				splashscreen: null,
			}
			this._hotMiddlewares = {
				renderer: null,
				splashscreen: null,
			}
			for (const name in this._otherConfigs) {
				if (this._otherConfigs.hasOwnProperty(name)) {
					const element = this._otherConfigs[name]
					(<webpack.Entry>this._otherConfigs[name].entry).renderer = [DevServer.resolve("build/dev-client"),].concat((<webpack.Entry>this._otherConfigs[name].entry)[name])
					this._compilers[name] = webpack(this._otherConfigs[name])
					this._hotMiddlewares[name] = webpackHotMiddleware(this._compilers[name], {
						log: false,
						heartbeat: 2500
					})
				}
			}
		} catch (error) {
			DevServer.console.error("DevServer", error)
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
		} catch (error) { DevServer.console.error("DevServer Start", error) }
	}

	private startMain() {
		return new Promise((res, rej) => {
			try {
				(<webpack.Entry>this._mainConfig.entry).main = [DevServer.resolve("src/electron/index.dev.js"),].concat((<webpack.Entry>this._mainConfig.entry).main)

				const compiler = webpack(mainConfig)
				compiler.plugin("watch-run", (compilation, done) => {
					DevServer.log("Main Process", chalk.white.bold("compiling..."));
					(<webpackHotMiddleware.EventStream>this._hotMiddlewares.renderer).publish({ action: "compiling" })
					done()
				})

				compiler.watch({}, (err, stats) => {
					if (err) {
						console.log(err)
						return
					}
					DevServer.log("Main Process", stats)

					if (this._electronProcess && this._electronProcess.kill) {
						this._manualRestart = true
						process.kill(this._electronProcess.pid)
						this._electronProcess = undefined
						this.startElectron()

						setTimeout(() => { this._manualRestart = false }, 5000)
					}
					res()
				})
			} catch (error) {
				DevServer.console.error("Main Promise", error)
			}
		})
	}

	private startRenderer() {
		let reload = (conf: DevServerKeys , compilation) => {
			compilation.plugin("html-webpack-plugin-after-emit", (data, cb) => {
				(<webpackHotMiddleware.EventStream>this._hotMiddlewares[conf]).publish({ action: "reload" })
				if (typeof cb === "function") cb()
			})
		}

		return new Promise((res, rej) => {
			try {
				const servers: object = {}
				for (const name in this._compilers) {
					if (this._compilers.hasOwnProperty(name)) {
						(<webpack.Compiler>this._compilers[<DevServerKeys>name]).plugin("compilation", compilation => reload("splashscreen", compilation));
						(<webpack.Compiler>this._compilers[<DevServerKeys>name]).plugin("done", stats => { DevServer.log(`${name} Process`, stats) })
						servers[<DevServerKeys>name] = this.createDevServer(<DevServerKeys>name, res);
						(<WebpackDevServer>servers[<DevServerKeys>name]).listen(this._otherConfigs[name].port)
					}
				}
			} catch (error) {
				DevServer.console.error("Renderer Promise", error)
				throw error
			}
		})
	}

	private createDevServer(conf: DevServerKeys , res: (value?: {} | PromiseLike<{}> | undefined) => void) {
		try {
			let that = this
			let devServer = new WebpackDevServer(<webpack.Compiler>this._compilers[conf], {
				contentBase: DevServer.resolve("/"),
				quiet: true,
				// @ts-ignore
				before(app, ctx) {
					app.use(that._hotMiddlewares[conf])
					ctx.middleware.waitUntilValid(() => { res() })
				}
			})
			return devServer
		} catch (error) {
			DevServer.console.error("Create Dev Server", error)
		}
	}

	private startElectron() {
		try {
			this._electronProcess = spawn(electron.toString(), ["--inspect=5858", DevServer.resolve("dist/electron/main.js"), ])
	
			this._electronProcess.stdout.on("data", data => { DevServer.log("Electron", data, "blue", true) })
			this._electronProcess.stderr.on("data", data => { DevServer.log("Electron", data, "red") })
			
			this._electronProcess.on("close", () => {
				if (!this._manualRestart){
					DevServer.console.done("Live Server Exited")
					process.exit()
				}
			})
		} catch (error) {
			DevServer.console.error("Electron Promise", error)
			throw error
		}
	}
}

const devServer = new DevServer(
	mainConfig,
	{
		renderer: { config: rendererConfig, port: 9080 },
		splashscreen: { config: splashscreenConfig, port: 9081 }
	}
)
devServer.start()