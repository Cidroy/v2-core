import { app } from "electron"
import electron from "electron-util"

import * as util from "@@/config/util"
import { Window, WindowSize } from "@electron/window"
import { Global } from "@@/typescript/global"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("electron")

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

	private store: Map<string, any> = new Map()

	private async initializeStorage() {
		// TODO: Get settings from server
		let data = {}
		this.store = new Map(Object.entries(data))
	}

	private getDisplay(): Electron.Display| null {
		try {
			let screen = require("electron").screen.getAllDisplays()
			let screenId: Point
			let display: Electron.Display
			screenId = this.store.has(ConfigName.Screen)
				? this.store.get(ConfigName.Screen)
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
			Console.okay("Normal Exit")
		} catch (error) {
			Console.error("Abnormal Exit :", error)
		}
		app.quit()
	}

	public async initialize(): Promise<void> {
		await Promise.all([ electron.appReady, this.initializeStorage(), ])
		let display: Electron.Display | null = this.getDisplay()
		if (!display) return
		Console.okay("Display Data Ready")
		if (!this.setOptions(display)) return
		Console.okay("Options Ready")
		//#region start application
		try {
			await this.windows.splash.show()
			Console.info("Showing Splashscreen")
			await this.windows.main.show()
			Console.info("Showing Mainscreen")
			this.windows.splash.close()
			Console.info("Closed Splashscreen")

			Console.info(this.store)

			this.windows.main._.on("moved", (event) => {
				Console.okay("Main Window Moved", event.sender)
				try {
					let options = this.windows.main._.getBounds()
					let screen: Point = { x: options.x, y: options.y }
					this.store.set(ConfigName.Screen, screen)
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
}

try {
	Console.okay("Core Thread Started")
	const App = new Application()
	Console.okay("Core App Started")
	App.SingleInstance()
	App.initialize()
} catch (error) {
	Console.error("Core Thread Failed", error)
}