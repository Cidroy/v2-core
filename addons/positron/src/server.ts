import * as API from "@tsed/common"
import Controllers from "@positron/controllers"
import path from "path"
import cors from "cors"
import session from "express-session"

import config from "../config"
import { Logger } from "@classes/CONSOLE"
import uuid from "uuid"

const DefaultSession = {
	id: "",
	counter: 0,
	username: "Mr. Nobody",
}

type TDefaultSession = typeof DefaultSession

declare global {
	namespace Express {
		interface Session extends TDefaultSession{}
	}
}

@API.ServerSettings({
	rootDir: __dirname,
	acceptMimes: ["application/json",],
	mount: Controllers,
	port: config.config.port,
	componentsScan: [],
	uploadDir: path.resolve(__dirname, "/assets"),
})
export class Server extends API.ServerLoader {
	private log: Logger

	private middlewares: any[] = []
	public addMiddleware(middleware: any){ this.middlewares.push(middleware) }

	public $onMountingMiddlewares() {
		this.log.verbose("mounting middleware")
		let bodyParser = require("body-parser")
		const MemoryStore = require("memorystore")(session)

		this
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(cors())
			.use(session({
				name: "positron",
				saveUninitialized: true,
				cookie: { maxAge: 86400000 },
				store: new MemoryStore({ checkPeriod: 86400000, }),
				// FIXME: use some sort of config
				secret: "positron-server"
			}))

		this.middlewares.forEach(middleware => this.use(middleware))
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

	constructor(args: { verbose: boolean, id?: string }) {
		super()
		let debug = args.verbose ? args.verbose : false
		let id = args.id || uuid()
		this.log = new Logger(`api#${id}/positron`)
		this.log.verbose({ debug })
		this.setSettings({
			debug,
			logger: {
				debug,
				logRequest: debug,
				disableRoutesSummary: !debug,
				format: debug ? `${this.log.prefix.replace(" >>> ", " ")}%[%d{[yyyy-MM-dd hh:mm:ss,SSS}] %p%] %m >>> ` : "-"
			}
		})

		// Set default session
		this.addMiddleware((req: Express.Request, res: Express.Response, next: Express.NextFunction)=>{
			if(!req.session) req.session = <Express.Session>DefaultSession
			next()
		})
	}
}