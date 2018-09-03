import { app, BrowserWindow } from "electron"
const electron = require("electron-util")

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
	global.__static = require("path").join(__dirname, "/static").replace(/\\/g, "\\\\")
}

let mainWindow
let splashWindow
let mainWindowOpts = {
	frame: false,
	show: false
}
let splashWindowOpts = {
	height: 200,
	width: 200,
	frame: false,
	// transparent: true
}
const mainURL = process.env.NODE_ENV === "development"
	? "http://localhost:9080"
	: `file://${__dirname}/index.html`
const splashURL = process.env.NODE_ENV === "development"
	? "http://localhost:9081/splashscreen.html"
	: `file://${__dirname}/splashscreen.html`

const initialize = async () => {
	await electron.appReady
	if (electron.menuBarHeight()) electron.enforceMacOSAppLocation()

	splashWindow = new BrowserWindow(splashWindowOpts)
	splashWindow.loadURL(splashURL)
	splashWindow.on("closed", () => { splashWindow = null })

	mainWindow = new BrowserWindow(mainWindowOpts)
	mainWindow.loadURL(mainURL)
	mainWindow.on("closed", () => { mainWindow = null })
	mainWindow.once("ready-to-show", () => {
		setTimeout(() => {
			splashWindow.destroy()
			mainWindow.maximize()
		}, 2000)
	})
}

app.on("window-all-closed", () => app.quit())

initialize()