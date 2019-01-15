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
			const connection = await connectDatabase()
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
	constructor() {
		this.log = new Logger("p-main")
		this.log.info("new instance")
		this.server = new Server()
		Positron.Neutron = new Neutron()

		this.server.addControllersList(Positron.Neutron.Server.controllersList)
	}
}
