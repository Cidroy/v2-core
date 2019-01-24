import { ApolloServer } from "apollo-server-express"
import config from "../config"
import { Database } from "@positron/db"
import { Logger } from "@classes/CONSOLE"
import GQL from "@positron/graphql"
import { Neutron } from "@neutron/NEUTRON"
import AppConfig from "@classes/appConfig"
import { Server } from "@positron/server"

export declare const module: any

export class Positron {
	private log: Logger
	protected Namespace = "positron/core"

	private server: Server

	private config = {
		verbose: false
	}

	public get Server(){ return this.server }

	private async startServer() {
		if(Database.Connected){
			this.log.verbose("creating gql schema")
			let apollo = new ApolloServer({
				schema: await GQL.Schema(),
				playground: true
			})
			this.log.verbose("adding gql")
			apollo.applyMiddleware({
				path: "/gql",
				app: this.server.expressApp,
			})
		}
		this.log.verbose("starting server")
		await this.server.start()
		this.log.okay("SERVER READY")
		this.log.info(`REST: http://localhost:${config.config.port}`)
		if (Database.Connected) this.log.info(`GQL : http://localhost:${config.config.port}/gql`)
	}

	public async main() {
		try {
			this.log.okay("main()")
			await AppConfig.Initialize()
			this.log.okay("app-config ready")
			try {
				await Database.Initialize()
				const connection = await Database.Connect({
					verbose: this.config.verbose
				})
				this.log.okay("db connected")
			} catch (error) {
				this.log.error(error)
				this.log.info("Will Start server without database. Functions are limited")
			}
			await this.startServer()
			if (module && module.hot) {
				module.hot.accept()
				module.hot.dispose(() => {
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
		this.log = new Logger(this.Namespace)
		this.log.info("new instance")
		this.log.info({ args })
		this.config.verbose = args.verbose?args.verbose: this.config.verbose
		Logger.Verbose = this.config.verbose

		this.server = new Server(this.config)
		Positron.Neutron = new Neutron(this.config)
		this.server.addControllersList(Positron.Neutron.Server.controllersList)
	}
}