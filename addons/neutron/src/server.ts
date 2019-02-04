import * as API from "@tsed/common"
import Controllers from "@neutron/controllers"
import path from "path"
import cors from "cors"

import config from "../config"
import { Logger } from "@classes/CONSOLE"

@API.ServerSettings({
	rootDir: __dirname,
	acceptMimes: [ "application/json", ],
	exclude: [ "*", "**/*", ],
	mount: Controllers,
	port: config.config.port,
	componentsScan: [],
	uploadDir: path.resolve(__dirname, "/assets"),
})
export class Server extends API.ServerLoader{
	private log = new Logger("neutron/api")

	public $onMountingMiddlewares() {
		this.log.verbose("mounting middleware")
		let bodyParser = require("body-parser")

		this
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(cors())
	}

	public addControllersList(list: { [K: string]: any }) {
		for (const endpoint in list) {
			if (list.hasOwnProperty(endpoint)) {
				const controllers = list[endpoint]
				this.addControllers(endpoint, controllers)
			}
		}
	}

	public get controllersList() { return Controllers }

	constructor(args: { verbose: boolean }) {
		super()
		let debug = args.verbose ? args.verbose : false
		this.log.verbose(this.settings)
		this.setSettings({
			debug,
			logger: {
				debug,
				logRequest: debug,
				disableRoutesSummary: !debug,
				format: debug ? `${this.log.prefix}%[%d{[yyyy-MM-dd hh:mm:ss,SSS}] %p%] %m` : "-"
			}
		})
	}
}