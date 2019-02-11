import { createConnection, Connection } from "typeorm"
import { Logger } from "@classes/CONSOLE"
import entities from "@positron/db/entities"
import migrations from "@positron/db/migrations"
import AppConfig from "@classes/appConfig"
import { TDatabaseConnectionOptions } from "@positron/db/misc"

let config: {
	databaseOptions: TDatabaseConnectionOptions | null,
		prefix: string,
	} = {
	databaseOptions: null,
	prefix: "p_",
}

let cache: {
	connection: Connection | null
} = {
	connection: null
}

export class Database {
	private static Namespace = "positron/database"
	protected static log: Logger = new Logger("database")

	private static get config(){ return config }
	private static set config(value){ config = value }
	private static get cache(){ return cache }
	private static set cache(value){ cache = value }

	public static get Connected(){
		if(Database.cache.connection) return Database.cache.connection.isConnected
		else return false
	}

	public static get Installed(){
		Database.log.verbose({ Connected: Database.Connected , options: Database.config.databaseOptions })
		return Database.Connected && Database.config.databaseOptions
	}

	public static async Initialize(){
		Database.config = {
			...Database.config,
			...await AppConfig.Get(Database.Namespace, Database.config),
		}
		Database.log.verbose("initialized", Database.config)
	}

	public static async SaveConfig(){
		try {
			await AppConfig.Set(Database.Namespace, Database.config)
			Database.log.verbose("saving config")
			return true
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
			await connection.close()
			Database.config.databaseOptions = options
			await Promise.all([
				Database.Connect(),
				Database.SaveConfig(),
			])
			return true
		} catch (error) {
			Database.log.error(error)
			throw error
		}
	}

	public static async Connect(){
		let config = Database.config.databaseOptions
		try {
			if(!config) throw "Please set database connection"

			let entitiesAndMigrations = {
				entities,
				migrations,
			}

			Database.log.info("attempting db connection.")

			Database.cache.connection = await createConnection({
				...config,
				...entitiesAndMigrations,
				name: "default",
				logging: Logger.Verbose,
			})

			return Database.cache.connection
		} catch (error) {
			Database.log.error("typeorm connection failed.", error)
			Database.log.info(config)
			throw "DB failed to connect"
		}
	}

	/**
	 * Synchronize database with all the entities and models
	 *
	 * @static
	 * @memberof Database
	 */
	public static async Synchronize(){
		Database.log.verbose("attempt synchronize")
		Database.log.verbose([ Database.cache, Database.config, ])
		try {
			if(!Database.cache.connection) throw "No Database connection to synchronize"
			await Database.cache.connection.synchronize()
		} catch (error) {
			Database.log.error(error)
			throw "Database synchronization failed"
		}
	}

	public static async Destroy(){
		if (!Database.cache.connection) return
		await Database.cache.connection.close()
	}

	public static get connection(): Connection  {
		if (Database.cache.connection===null) throw "No DB Connection"
		return Database.cache.connection
	}
}