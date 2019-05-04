import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs"
import json5 from "json5"
import { Logger } from "@classes/CONSOLE"
import os from "os"

const defaultCache = {
	createdAt: new Date(),
	lastModified: new Date(),
	lastModification: "",
}
let cache: typeof defaultCache
// TODO: filename based on project name
const productName = "gymkonnect"
export default class AppConfig {
	private static log = new Logger("app-config")

	private static get file(): string {
		try { if(!existsSync(AppConfig.DataFolder)) mkdirSync(AppConfig.DataFolder) }
		catch (error) {
			AppConfig.log.error(error)
			AppConfig.log.verbose("failed to create data folder")
		}
		if (process.env.NODE_ENV === "development") return "dist/appConfig.json5"
		else return `${AppConfig.DataFolder}/${productName}.w+boson`
	}

	public static get DataFolder() { return os.homedir() + `/${productName}` }

	private static readonly defaultCache = defaultCache

	private static get cache() { return cache || AppConfig.defaultCache }
	private static set cache(value){ cache = value }

	public static async Initialize(refresh: boolean = false) {
		AppConfig.log.verbose("getting ready")
		if (!refresh && AppConfig.cache !== AppConfig.defaultCache) return
		if (!existsSync(AppConfig.file)) writeFileSync(AppConfig.file, json5.stringify(AppConfig.cache))
		let conf = readFileSync(AppConfig.file, "utf8")
		AppConfig.cache = json5.parse(conf)
		AppConfig.log.verbose("file", AppConfig.file)
		AppConfig.log.verbose(AppConfig.cache)
	}

	public static async Save(modification = "") {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		AppConfig.log.verbose("save")
		AppConfig.cache.lastModified = new Date()
		AppConfig.cache.lastModification = modification
		writeFileSync(AppConfig.file, json5.stringify(AppConfig.cache, null, 4))
	}

	public static async Has(name: string): Promise<boolean> {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		AppConfig.log.verbose(`get ${name}`)
		if ((<{}>AppConfig.cache).hasOwnProperty(name)){
			AppConfig.log.verbose("used cache")
			return true
		}
		return false
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

	public static async GetSet<T>(name: string, defaults?: T): Promise<T> {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		AppConfig.log.verbose(`get ${name}`)
		if ((<{}>AppConfig.cache).hasOwnProperty(name)){
			AppConfig.log.verbose("used cache")
			return <T>(<{}>AppConfig.cache)[name]
		}
		else if (defaults !== undefined){
			AppConfig.log.verbose("used default and saving")
			AppConfig.Set(name, defaults)
			return defaults
		}
		else throw `Unable to fetch AppConfig for ${name}`
	}

	public static async Set<T>(name: string, value: T): Promise<boolean> {
		if (AppConfig.cache === undefined) AppConfig.Initialize();
		(<{}>AppConfig.cache)[name] = value
		await AppConfig.Save(name)
		return true
	}

	public static async Remove(name: string): Promise<boolean> {
		if (AppConfig.cache === undefined) AppConfig.Initialize()
		if ((<{}>AppConfig.cache).hasOwnProperty(name)) { }
		delete (<{}>AppConfig.cache)[name]
		return true
	}
}
