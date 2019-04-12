import { BrowserWindow } from "electron"
import * as TS from "@rubix-code/typeserializer"
import electronUpdate from "@rubix-code/electron-update-window-options"
import { readonly } from "core-decorators"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("electron")

interface IWindowError{
	url_undefined: string,
}

interface IWindowSize{
	__instance__: "IWindowSize"
	width: number
	height: number
	x: number
	y: number
	toObject(): object
	toString(): string
}

@TS.Strategy(TS.ExclusionPolicy.ALL)
export class WindowSize implements IWindowSize {
	@readonly
	@TS.Expose()
	// tslint:disable-next-line:variable-name
	public __instance__= <any>"IWindowSize"
	@TS.Expose() public width: number = 0
	@TS.Expose() public height: number = 0
	@TS.Expose() public x: number = 0
	@TS.Expose() public y: number = 0

	private copy(object: WindowSize){
		this.width = object.width
		this.height = object.height
		this.x = object.x
		this.y = object.y
	}

	constructor()
	constructor(display: Electron.Display, width: number, height: number)
	constructor(display?: Electron.Display | WindowSize, width?: number, height?: number) {
		if(!display){}
		else if(display instanceof WindowSize)
			this.copy(display)
		else {
			width = width?width:0
			height = height?height:0
			this.width = width
			this.height = height
			this.x = display.bounds.x + (display.workArea.width - width) / 2
			this.y = display.bounds.y + (display.workArea.height - height) / 2
		}
	}

	public toObject(): object { return JSON.parse(TS.serialize(this)) }
	public toString(): string { return TS.serialize(this) }
}

@TS.Strategy(TS.ExclusionPolicy.ALL)
export class Window {
	private _window: Electron.BrowserWindow
	private _errors: IWindowError = {
		url_undefined: "url is empty",
	}
	private _display: WindowSize

	@TS.Name("options")
	private _options: Electron.BrowserWindowConstructorOptions = {}
	@TS.Name("url")
	private _url: string = ""

	private static DEFAULT_TIMEOUT: number = 10000

	constructor(object: Electron.BrowserWindowConstructorOptions | Electron.BrowserWindow){
		if(object instanceof BrowserWindow){
			this._window = object
			this._display = new WindowSize()
		}
		else{
			this._options = object
			//# IF DEBUG
			Console.log("window-options", object)
			//# ENDIF DEBUG
			if (process.env.NODE_ENV === "development")
				object = { ...object, webPreferences: { webSecurity: false } }
			this._display = <WindowSize>{ ...object, __instance__: "IWindowSize" }
			this._window = new BrowserWindow(object)
		}
		this._window.on("closed", ()=>{ this._window.destroy() })
	}

	public get options(){ return this._options }
	public set options(value: Electron.BrowserWindowConstructorOptions){
		this._options = { ...this._options, ...value}
		electronUpdate(this._window, this._options)
	}

	public get _(){ return this._window }

	public get url(){ return this._url }
	public set url(url: string){
		this._url = url
		this._window.loadURL(<string>this._url)
	}

	public show(): Promise<void>{
		return new Promise((resolve, reject) => {
			if(!this._url) reject(this._errors.url_undefined)
			let timeout = setTimeout(() => {
				Console.error("ready-to-show timed out")
				this._window.show()
				resolve()
			}, Window.DEFAULT_TIMEOUT)
			this._window.on("ready-to-show",() =>{
				this._window.show()
				clearTimeout(timeout)
				resolve()
			})
		})
	}
	public close(){
		this._window.destroy()
	}
}