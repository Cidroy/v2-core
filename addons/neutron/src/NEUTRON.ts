import config from "../config"
import { Logger } from "@classes/CONSOLE"
import { Server } from "@neutron/server"
import BiometricDevices from "@neutron/lib/biometric"
import AppConfig from "@classes/appConfig"

declare const module: any
export class Neutron extends BiometricDevices{
	protected log: Logger
	protected Namespace = "neutron/core"

	private server: Server

	private config = {
		verbose: false,
		id: "none"
	}

	public get Server(){ return this.server }

	public async startServer() {
		try {
			await AppConfig.Initialize()
			this.log.okay("app-config ready")
			this.log.verbose("starting server")
			await this.server.start()
			this.log.okay("SERVER READY")
			this.log.info(`REST: http://localhost:${config.config.port}`)
			if (module.hot) {
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

	constructor(args: PositronConstructorOptions) {
		super()
		this.log = new Logger(`core#${args.id}/neutron`)
		this.log.info("new instance")
		this.log.info({ args })
		this.config.verbose = args.verbose ? args.verbose : this.config.verbose
		this.config.id = args.id
		// FIXME: auto verbose
		Logger.Verbose = this.config.verbose

		this.server = new Server(this.config)
	}
}