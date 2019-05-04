import * as API from "@tsed/common"
import Controllers from "@neutron/controllers"
import path from "path"
import cors from "cors"

import config from "../config"
import { Logger } from "@classes/CONSOLE"
import uuid from "uuid"

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
	private log: Logger

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

	constructor(args: { verbose: boolean, id: string, }) {
		super()
		let debug = args.verbose ? args.verbose : false
		let id = args.id || uuid()
		this.log = new Logger(`api#${id}/neutron`)
		this.log.verbose(this.settings)
		this.setSettings({
			debug,
			logger: {
				debug,
				logRequest: debug,
				disableRoutesSummary: !debug,
				format: debug ? `${this.log.prefix.replace(" >>> ", " ")}%[%d{[yyyy-MM-dd hh:mm:ss,SSS}] %p%] >>> %m` : "-"
			}
		})
	}
}
