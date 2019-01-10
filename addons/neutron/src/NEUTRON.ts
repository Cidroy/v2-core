import express from "express"
import config from "../config"
import { Logger } from "@neutron/lib/CONSOLE"

declare const module: any
export class Neutron {
	private log: Logger

	private async startServer() {
		let app = express()
		app.get("/", (req, res) => {
			res.send({ success: "false" })
		})
		let server = app.listen(config.config.port, () => {
			this.log.okay("NEUTRON SERVER READY")
			this.log.info(`REST: http://localhost:${config.config.port}`)
		})
		return server
	}

	public async main() {
		try {
			this.log.okay("main()")
			let server = await this.startServer()
			if (module.hot) {
				module.hot.accept()
				module.hot.dispose(() => {
					server.close()
					this.log.info("reloading")
				})
			}
		}
		catch (error) {
			this.log.error("server failed to start.", error)
		}
	}
	
	constructor() {
		this.log = new Logger("n-main")
		this.log.info("new instance")
	}
}
