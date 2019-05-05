import * as API from "@tsed/common"
import { ISuccess, IError } from "@plugins/core/interfaces/IResponse"
import { SUPPORTED_DATABASE } from "@positron/db/misc"
import { Database } from "@positron/db"
import { Logger } from "@classes/CONSOLE"

@API.Controller("/database")
export default class DatabaseController{
	private log = new Logger("api/database")

	/**
	 * List Supported databases
	 *
	 * @permission { "positron/core": "supported" }
	 * @returns {(Promise<{ supported: any } & ISuccess>)} response
	 * @memberof DatabaseController
	 */
	@API.Authenticated({ "positron/core": "supported" })
	@API.Post("/supported")
	public async supported(): Promise<{ supported: any } & ISuccess>{
		this.log.verbose("get supported database")
		return {
			type: "success",
			supported: SUPPORTED_DATABASE
		}
	}

	/**
	 * Set Connection for positron
	 *
	 * @param {string} [username] username
	 * @param {string} [password] password
	 * @param {string} [host] host
	 * @param {number} [port] port
	 * @param {string} [database] database
	 * @param {SUPPORTED_DATABASE} [type] database type
	 * @returns {(Promise<ISuccess | IError>)} response
	 * @memberof DatabaseController
	 */
	@API.Authenticated({ "positron/core": "database|set" })
	@API.Post("/set")
	public async setConnection(
		@API.BodyParams("username") username?: string,
		@API.BodyParams("password") password?: string,
		@API.BodyParams("host") host?: string,
		@API.BodyParams("port") port?: number,
		@API.BodyParams("database") database?: string,
		@API.BodyParams("type") type?: SUPPORTED_DATABASE
	): Promise<ISuccess | IError>{
		try {
			this.log.verbose("try set database connection", { username, password, host, port, database, type })
			if(!database) throw "Database name is required"
			if(!username) username = ""
			if(!password) password = ""
			if(!host) host = "localhost"
			if(!port) port = 3306
			if(!type) type = SUPPORTED_DATABASE.MYSQL
			if(typeof port !== "number") port = parseInt(port)

			await Database.SetConnection({
				type,
				host,
				port,
				username,
				password,
				database,
			})

			return { type: "success" }
		} catch (error) {
			return { type: "error", message: error.toString() }
		}
	}

	@API.Authenticated({ "positron/core": "database|sync" })
	@API.Post("/sync")
	public async sync(): Promise<ISuccess | IError>{
		try {
			this.log.verbose("try database sync")
			await Database.Synchronize()
			return { type: "success" }
		} catch (error) {
			return { type: "error", message: error.toString() }
		}
	}
}
