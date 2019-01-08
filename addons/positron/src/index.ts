import "reflect-metadata"
import express from "express"
import { ApolloServer } from "apollo-server-express"

import config from "../config"
import connectDatabase from "@positron/db"
import { Logger } from "@positron/lib/CONSOLE"
import { Connection } from "typeorm"
import GQL from "@positron/graphql"

declare const module: any
class Positron{
	private log: Logger

	private async startServer(connection: Connection) {
		let app = express()
		let apollo = new ApolloServer({
			schema: await GQL.Schema(),
			playground: true
		})
	
		apollo.applyMiddleware({
			app,
			path: "/gql"
		})

		app.get("/", (req, res) => {
			res.send({ success: "false" })
		})
	
		let server = app.listen(config.config.port, () => {
			this.log.okay("SERVER READY")
		})
	
		return server
	}
		
	public async main(){
		try {
			this.log.okay("main()")
			const connection = await connectDatabase()
			this.log.okay("db connected")
	
			let server = await this.startServer(connection)
	
			if (module.hot) {
				module.hot.accept()
				module.hot.dispose(() =>{
					connection.close()
					server.close()
					this.log.info("reloading")
				})
			}
		} catch (error) { this.log.error("server failed to start.", error) }
	}

	constructor(){
		this.log = new Logger("p-main")
	}
}

let positron = new Positron()
positron.main()