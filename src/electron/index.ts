import { app, ipcMain } from "electron"
import electron from "electron-util"

import * as util from "@@/config/util"
import { Window, WindowSize } from "@electron/window"
import { Global } from "@@/typescript/global"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"
import ParticleAccelerator from "@classes/ParticleAccelerator"

const request = require("request-promise-native").defaults({ simple: false })

const Console = new Logger("electron/main")

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
	(<Global>global).__static = require("path").join(__dirname, "/static").replace(/\\/g, "\\\\")
}

enum ConfigName {
	Screen = "Screen"
}

class Application {
	private windows = {
		main: {} as Window,
		splash: {} as Window,
	}

	private options = {
		main: {} as Electron.BrowserWindowConstructorOptions,
		splash: {} as Electron.BrowserWindowConstructorOptions,
	}

	private url = {
		main: process.env.NODE_ENV === "development"
			? "http://localhost:9080"
			: `file://${__dirname}/index.html`,
		splash: process.env.NODE_ENV === "development"
			? "http://localhost:9081/splashscreen.html"
			: `file://${__dirname}/splashscreen.html`,
	}

	private defaultOptions: Electron.BrowserWindowConstructorOptions = {
		frame: false,
		show: false,
		resizable: true,
	}

	private store = {
		positron: {
			host: "localhost",
			port: 9101,
			ssl: false,
			mode: "master"
		}
	}

	private async initializeStorage() {
		await AppConfig.Initialize()
		if(await AppConfig.Get("__dirname", null) === null){
			let t = __dirname
			t = t.substr(0, t.lastIndexOf("/resources"))
			await Promise.all([
				AppConfig.Set("__dirname", t),
				AppConfig.Set("electron/ui", this.store),
			])

		}
		// TODO: Get settings from server
		this.store = await AppConfig.Get("electron/ui", this.store)
	}

	private getDisplay(): Electron.Display| null {
		try {
			let screen = require("electron").screen.getAllDisplays()
			let screenId: Point
			let display: Electron.Display
			screenId = this.store.hasOwnProperty(ConfigName.Screen)
				? this.store[ConfigName.Screen]
				: { x: 0, y: 0 }
			display = screen.find(i => i.bounds.x === screenId.x && i.bounds.y === screenId.y)
				|| screen[0]
			return display
		} catch (error) {
			Console.error("Get Display Failed :", error)
			return null
		}
	}

	private setOptions(display: Electron.Display){
		try {
			this.options.splash = <Electron.BrowserWindowConstructorOptions>{
				...this.defaultOptions,
				...new WindowSize(display, 400, 200) ,
			}
			if (util.isNotInstalled()){
				Console.info("Main window set to `installation` settings")
				this.options.main = <Electron.BrowserWindowConstructorOptions>{
					...this.defaultOptions,
					...new WindowSize(
						display,
						Math.min(400, display.size.width),
						Math.min(600, display.size.height)
					),
				}
			}
			else{
				Console.info("Main window set to `main` settings")
				this.options.main = <Electron.BrowserWindowConstructorOptions>{
					...this.defaultOptions,
					...new WindowSize(display, display.workArea.width, display.workArea.height),
				}
			}

			this.windows.splash = new Window(this.options.splash)
			this.windows.main = new Window(this.options.main)
			Console.okay("Windows initialized")

			this.windows.splash.url = this.url.splash
			this.windows.main.url = this.url.main
			Console.okay("Windows source set")
			return true
		} catch (error) {
			Console.error("Set Options Failed :", error)
			return false
		}
	}

	private async onExit(event: Electron.Event) {
		try {
			await AppConfig.Set("electron/ui", this.store)
			Console.verbose("saved", this.store)
			Console.okay("Normal Exit")
		} catch (error) {
			Console.error("Abnormal Exit :", error)
		}
		app.quit()
	}

	public async initialize(): Promise<void> {
		await Promise.all([
			electron.appReady,
			this.initializeStorage(),
		])
		let display: Electron.Display | null = this.getDisplay()
		if (!display) return
		Console.okay("Display Data Ready")
		if (!this.setOptions(display)) return
		Console.okay("Options Ready")
		//#region start application
		try {
			await this.windows.splash.show()
			Console.info("Showing Splashscreen")
			if(await this.beforeMain()){
				await this.windows.main.show()
				Console.info("Showing Mainscreen")
				this.windows.splash.close()
				Console.info("Closed Splashscreen")
			} else {
				Console.info("unable to start application")
				await this.windows.main.close()
				Console.info("Closing Main UI. Refer Splash UI for Error")
			}
			Console.info(this.store)

			this.windows.main._.on("moved", (event) => {
				Console.okay("Main Window Moved", event.sender)
				try {
					let options = this.windows.main._.getBounds()
					let screen: Point = { x: options.x, y: options.y }
					this.store[ConfigName.Screen] = screen
				} catch (error) {
					Console.error("Main window Move Handler Failed", error)
				}
			})
		} catch (error) {
			Console.error("Initialization Failed :", error)
		}
		//#endregion
	}

	constructor() {
		app.on("window-all-closed", this.onExit)
		ipcMain.on("kill-me", (event, args) => { process.kill(args) })
	}

	public SingleInstance(){
		Console.log("try single instance")
		let onlyInstance = app.requestSingleInstanceLock()

		if(!onlyInstance){
			Console.log("quitting because we are instance 2. There is no place for 2nd place in this world")
			app.quit()
		} else {
			app.on("second-instance", (event, argv,  workingDirectory) => {
				Console.verbose("second-instance", { argv, workingDirectory })
				if(this.windows.main._.isMinimized())
					this.windows.main._.restore()
				this.windows.main._.focus()
			})
		}
	}

	private get POSITRON_URL() { return `http${this.store.positron.ssl ? "s" : ""}://${this.store.positron.host}:${this.store.positron.port}` }

	private async beforeMain(){
		const splashLog = (message: string) => this.windows.splash._.webContents.send("splash-log", message)
		const splashError = (message: string, ...args) => this.windows.splash._.webContents.send("splash-error", message, args || null)

		const isPositronActive = async (): Promise<boolean> => {
			Console.verbose("check for positron")
			let _options = {
				method: "GET",
				url: this.POSITRON_URL,
				jar: true,
				json: true,
				followRedirect: true,
				timeout: 10000
			}
			try {
				let response = await request(_options)
				console.log(response)
				Console.log("positron is active")
				return true
			} catch (error) {
				Console.error(error.toString())
				return false
			}
		}

		return new Promise(async (resolve, reject) => {
			try {
				splashLog("searching for positron particle")
				let isPositron = await isPositronActive()
				if (isPositron) {
					splashLog("positron particle found")
				} else {
					splashLog("no positron particle found")
					if(process.env.NODE_ENV === "development"){
						splashLog("dev mode: spin up positron yourself")
					} else if(this.store.positron.mode==="master") {
						splashLog("spinning particle accelerator for positron")
						let positron = await ParticleAccelerator.CreatePositron(splashLog)
						if(!positron){
							splashLog("particle accelerator could not make positron")
							throw "Positron not found"
						}
						splashLog("searching for positron particle")
						if(await isPositronActive()){
							splashLog("positron particle detected!")
						} else {
							splashLog("unable to create positron particle")
							splashError("positron creation failed")
							positron.kill()
							throw "no positron"
						}
					} else {
						splashLog("Please start the Master PC")
					}
				}
				resolve(true)
				return true
			} catch (error) {
				Console.error(error)
				splashError("something went wrong", error)
				resolve(false)
				return false
			}
		})
	}
}

try {
	Logger.Verbose = true
	Console.okay("Core Thread Started")
	const App = new Application()
	Console.okay("Core App Started")
	App.SingleInstance()
	App.initialize()
} catch (error) {
	Console.error("Core Thread Failed", error)
}