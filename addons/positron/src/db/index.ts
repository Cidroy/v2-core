import { createConnection, Connection } from "typeorm"
import { Logger } from "@classes/CONSOLE"
import entities from "@positron/db/entities"
import migrations from "@positron/db/migrations"
import AppConfig from "@classes/appConfig"
import { TDatabaseConnectionOptions } from "@positron/db/misc"

const log = new Logger("positron/db")

export class Database {
	private static Namespace = "positron/database"
	protected static log: Logger = new Logger("databse")

	private static config: {
		connection: TDatabaseConnectionOptions | null,
		prefix: string,
	} = {
		connection: null,
		prefix: "p_"
	}

	private static cache: {
		connection: Connection | null
	} = {
		connection: null
	}

	public static get Connected(){
		if(Database.cache.connection) return Database.cache.connection.isConnected
		else return false
	}

	public static async Initialize(){
		Database.config = await AppConfig.Get(Database.Namespace, Database.config)
		Database.log.verbose("initialized", Database.config)
	}

	public static async SaveConfig(){
		try {
			await AppConfig.Set(Database.Namespace, Database.config)
			Database.log.verbose("saving config")
		} catch (error) {
			Database.log.error(error)
			throw "unable to save neutron config"
		}
	}

	public static async SetConnection(options: TDatabaseConnectionOptions){
		try {
			options = <any>{ ...options, prefix: Database.config.prefix }
			Database.log.verbose("try connection", options)
			let connection = await createConnection({
				...options,
				name: "default",
			})
			if(!connection.isConnected) throw "Databse Connection Failed"
			Database.log.verbose("connected")
			Database.config.connection = options
			await Database.SaveConfig()
		} catch (error) {
			Database.log.error(error)
			throw error
		}
	}

	public static async Connect(args: { verbose: boolean }){
		let config = Database.config.connection
		try {
			if(!config) throw "Please set database connection"

			let entitiesAndMigrations = {
				entities,
				migrations,
			}

			log.info("attempting db connection.")

			Database.cache.connection = await createConnection({
				...config,
				...entitiesAndMigrations,
				name: "default",
				logging: args.verbose,
			})

			return Database.cache.connection
		} catch (error) {
			log.error("typeorm connection failed.", error)
			log.info(config)
			throw "DB failed to connect"
		}
	}
}