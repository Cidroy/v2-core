import { Logger } from "@classes/CONSOLE"
import { Server } from "@neutron/server"
import BiometricDevices from "@neutron/lib/biometric"

declare const module: any
export class Neutron extends BiometricDevices{
	protected log: Logger
	protected Namespace = "neutron/core"

	private server: Server

	public get Server(){ return this.server }

	private async _startExpressServer() {
		await this.server.start()
	}

	public async startServer() {
		try {
			this.log.okay("main()")
			await this._startExpressServer()
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
	
	constructor(args: any) {
		super()
		this.log = new Logger("neutron/core")
		this.log.info("new instance")
		this.server = new Server()
	}
}