import * as API from "@tsed/common"
import Controllers from "@positron/controllers"
import path from "path"
import cors from "cors"

import config from "../config"
import { Logger } from "@classes/CONSOLE"

declare global {
	namespace Express {
		interface Session {
			// FIXME: make this a dynamic implementation
			id: string
			counter: number
		}
	}
}

@API.ServerSettings({
	rootDir: __dirname,
	acceptMimes: [ "application/json", ],
	mount: Controllers,
	port: config.config.port,
	componentsScan: [],
	uploadDir: path.resolve(__dirname , "/assets"),
})
export class Server extends API.ServerLoader{
	private log = new Logger("positron/api")

	public $onMountingMiddlewares(){
		this.log.verbose("mounting middleware")
		let bodyParser = require("body-parser")
		const session = require("express-session")
		const MemoryStore = require("memorystore")(session)

		this
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(cors())
			.use(session({
				saveUninitialized: false,
				cookie: { maxAge: 86400000 },
				store: new MemoryStore({ checkPeriod: 86400000, }),
				// FIXME: use some sort of config
				secret: "positron-server"
			}))
	}

	public addControllersList(list: { [K: string]: any }){
		for (const endpoint in list) {
			if (list.hasOwnProperty(endpoint)) {
				const controllers = list[endpoint]
				this.addControllers(endpoint, controllers)
			}
		}
	}

	public get controllersList(){ return Controllers }

	constructor(args: { verbose: boolean }){
		super()
		let debug = args.verbose ? args.verbose : false
		this.log.verbose({ debug })
		this.setSettings({
			debug,
			logger: {
				debug,
				logRequest: debug,
				disableRoutesSummary: !debug,
				format: debug ? `${this.log.prefix}%[%d{[yyyy-MM-dd hh:mm:ss,SSS}] %p%] %m`: "-"
			}
		})
	}
}