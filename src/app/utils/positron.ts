import { Logger } from "@classes/CONSOLE"
import { PORTS } from "@classes/ports"
import AppConfig from "@classes/appConfig"
const request = require("request-promise-native").defaults({ simple: false })

let client = undefined

// TODO: [Vicky] implement positron client
export default class PositronClient{
	private static Namespace = "electron/ui"
	private static log = new Logger(PositronClient.Namespace)

	protected static config = {
		host: "localhost",
		path: "",
		port: PORTS.POSITRON,
		ssl: false,
	}

	public static get uri() {
		return `http${PositronClient.config.ssl ? "s" : ""}://${PositronClient.config.host}${PositronClient.config.port ? ":" + PositronClient.config.port : ""}${PositronClient.config.path||""}`
	}

	public static async Initialize(force: boolean = false){
		if (!force && client) return true
		PositronClient.log.verbose("initialize")
		PositronClient.config = (await AppConfig.Get(PositronClient.Namespace, {
			positron: PositronClient.config
		})).positron
		return true
	}

	public static async GET(path: string, body = {}, options = {}){
		let _options = {
			method: "GET",
			url: PositronClient.uri + path,
			body,
			jar: true,
			json: true,
			followRedirect: true,
			timeout: 10000,
			...options
		}
		return await request(_options)
	}

	public static async POST(path: string, body = {}, options = {}){
		let _options = {
			method: "POST",
			url: PositronClient.uri + path,
			body,
			jar: true,
			json: true,
			followRedirect: true,
			timeout: 10000,
			...options
		}
		return await request(_options)
	}
}
