import { ApolloServer } from "apollo-server-express"
import config from "../config"
import connectDatabase from "@positron/db"
import { Logger } from "@classes/CONSOLE"
import GQL from "@positron/graphql"
import { Neutron } from "@neutron/NEUTRON"
import AppConfig from "@classes/appConfig"
import { Server } from "@positron/server"

export declare const module: any

export class Positron {
	private log: Logger

	private server: Server

	private config = {
		verbose: false
	}

	public get Server(){ return this.server }

	private async startServer() {
		let apollo = new ApolloServer({
			schema: await GQL.Schema(),
			playground: true
		})
		apollo.applyMiddleware({
			path: "/gql",
			app: this.server.expressApp,
		})
		await this.server.start()
		this.log.okay("SERVER READY")
		this.log.info(`REST: http://localhost:${config.config.port}`)
		this.log.info(`GQL : http://localhost:${config.config.port}/gql`)
	}
	public async main() {
		try {
			this.log.okay("main()")
			await AppConfig.Initialize()
			this.log.okay("app-config ready")
			const connection = await connectDatabase({
				verbose: this.config.verbose
			})
			this.log.okay("db connected")
			await this.startServer()
			if (module && module.hot) {
				module.hot.accept()
				module.hot.dispose(() => {
					connection.close()
					this.log.info("reloading")
				})
			}
		}
		catch (error) {
			this.log.error("server failed to start.", error)
		}
	}
	public static Neutron: Neutron
	constructor(args: any) {
		this.log = new Logger("positron/core")
		this.log.info("new instance")
		this.log.info({ args })
		this.config.verbose = args.verbose?args.verbose: this.config.verbose
		
		Logger.Verbose = this.config.verbose

		this.server = new Server(this.config)
		Positron.Neutron = new Neutron(this.config)
		this.server.addControllersList(Positron.Neutron.Server.controllersList)
	}
}
