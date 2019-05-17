import { ApolloServer } from "apollo-server-express"
import config from "../config"
import { Database } from "@positron/db"
import { Logger } from "@classes/CONSOLE"
import GQL from "@positron/graphql"
import { Neutron } from "@neutron/NEUTRON"
import AppConfig from "@classes/appConfig"
import { Server } from "@positron/server"
import { INSTALL_STEP } from "@positron/lib/misc"
import { version } from "@positron/../package.local.json"
import { Tunnel } from "@positron/lib/localtunnel"
import Tasks from "./tasks"

export declare const module: any

export class Positron {
	// TODO: detect user
	public static User = {
		id: 1
	}

	public static InstallationState(): { installed: boolean, step: INSTALL_STEP }{
		let installed = true
		let step = INSTALL_STEP.NONE

		try {
			step = INSTALL_STEP.DATABASE; if(!Database.Installed) throw ""

			step = INSTALL_STEP.NONE
			return { installed, step }
		} catch (error) {
			installed = false
			return { installed, step }
		}
	}

	private log: Logger
	protected Namespace = "positron/core"

	private server: Server

	private config = {
		verbose: false,
		id: "none",
		version,
	}

	public get Server(){ return this.server }

	private async startServer() {
		if(Database.Connected){
			this.log.verbose("adding gql")
			this.server.addMiddleware(await GQL.Middleware())
		}
		this.log.verbose("starting server")
		let [ allowTunnel, ] = await Promise.all([
			AppConfig.GetSet("positron/allow-tunnel", false),
			this.server.start(),
		])
		this.log.okay("SERVER READY")
		this.log.info(`REST: http://localhost:${config.config.port}`)
		if (Database.Connected) this.log.info(`GQL : http://localhost:${config.config.port}/gql`)
		/**
		 * Fire up localtunnel only if appconfig."positron/allow-tunnel" === true
		 */
		if(allowTunnel) Tunnel.Start(config.config.port)
			.then(url => this.log.info(`TUNNEL: ${url}`))
			.catch(e => {})
	}

	private async stopServer(){
		this.log.verbose("stop server")
		Tunnel.Close()
		await Promise.all([
			this.server.httpServer.close(),
			this.server.httpsServer.close(),
		])
		this.log.verbose("stopped server")
	}

	public async main() {
		try {
			this.log.okay("main()")
			await this.Initialize()
			this.log.verbose("initialized")
			try {
				await Database.Initialize()
				const connection = await Database.Connect()
				this.log.okay("db connected")
			} catch (error) {
				this.log.error(error)
				this.log.info("Will Start server without database. Functions are limited")
			}
			await this.startServer()
			Tasks()
		}
		catch (error) {
			this.log.error("server failed to start.", error)
		}
	}

	public async destroy(){
		try {
			this.log.verbose("destroy")
			await Promise.all([
				Database.Destroy(),
				this.stopServer(),
			])
		} catch (error) {
			this.log.error("Destructor failed")
			this.log.error(error)
		}
	}

	public async Initialize(){
		await AppConfig.Initialize()
		this.config = await AppConfig.Get(this.Namespace, this.config)
		this.log.info("app-config ready")
	}

	public static Neutron: Neutron

	constructor(args: PositronConstructorOptions) {
		this.log = new Logger(`core#${args.id}/positron`)
		this.log.info("new instance")
		this.log.info({ args })
		this.config.verbose = args.verbose?args.verbose: this.config.verbose
		this.config.id = args.id
		Logger.Verbose = this.config.verbose

		this.server = new Server(this.config)
		Positron.Neutron = new Neutron(this.config)
		this.server.addControllersList(Positron.Neutron.Server.controllersList)
	}
}

declare global {
	type PositronConstructorOptions = {
		verbose: boolean,
		id: string,
	}
}
