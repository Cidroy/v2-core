import { readFileSync, existsSync, writeFileSync } from "fs"
import json5 from "json5"
import { Logger } from "@classes/CONSOLE"

export default class AppConfig {
	private static log = new Logger("app-config")

	private static get file(): string {
		if (process.env.NODE_ENV == "development") return "dist/appConfig.json5"
		else return "W+.boson"
	}

	private static readonly defaultCache = {
		lastModified: new Date()
	}

	private static cache = AppConfig.defaultCache

	public static async Initialize(refresh: boolean = false) {
		AppConfig.log.verbose("getting ready")
		if (!refresh && AppConfig.cache !== AppConfig.defaultCache) return
		if (!existsSync(AppConfig.file)) writeFileSync(AppConfig.file, json5.stringify(AppConfig.cache))
		let conf = readFileSync(AppConfig.file, "utf8")
		AppConfig.cache = json5.parse(conf)
		AppConfig.log.verbose("file", AppConfig.file)
		AppConfig.log.verbose(AppConfig.cache)
	}

	public static async Save() {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		AppConfig.log.verbose("save")
		writeFileSync(AppConfig.file, json5.stringify(AppConfig.cache, null, 4))
	}

	public static async Get<T>(name: string, defaults?: T): Promise<T> {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		AppConfig.log.verbose(`get ${name}`)
		if ((<{}>AppConfig.cache).hasOwnProperty(name)){
			AppConfig.log.verbose("used cache")
			return <T>(<{}>AppConfig.cache)[name]
		}
		else if (defaults !== undefined){
			AppConfig.log.verbose("used default")
			return defaults
		}
		else throw `Unable to fetch AppConfig for ${name}`
	}

	public static async Set<T>(name: string, value: T): Promise<boolean> {
		if (AppConfig.cache === undefined) AppConfig.Initialize();
		(<{}>AppConfig.cache)[name] = value
		await AppConfig.Save()
		return true
	}

	public static async Remove(name: string): Promise<boolean> {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		if ((<{}>AppConfig.cache).hasOwnProperty(name)) { }
		delete (<{}>AppConfig.cache)[name]
		return true
	}
}