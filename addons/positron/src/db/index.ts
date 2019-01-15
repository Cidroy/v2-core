import { createConnection, ConnectionOptions } from "typeorm"
import { Logger } from "@classes/CONSOLE"
import entities from "@positron/db/entities"
import migrations from "@positron/db/migrations"

const log = new Logger("db")

export default async () => {
	let config: ConnectionOptions
	if (process.env.NODE_ENV == "development") {
		try {
			log.info("using dev connection.")
			log.warn("falling back to default config.")
			config = <ConnectionOptions><any>require("@positron/db/connection.dev").default
		} catch (error) {
			log.error("dev mode config file not working.", error)
			log.log("try renaming 'connection.default.ts' to 'connection.dev.ts'")
			throw "dev config not working."
		}
	}
	else {
		try {
			log.info("using production connection.")
			config = <ConnectionOptions><any>require("@positron/db/connection.prod").default
		} catch (error) {
			log.error("db failed to connect in production mode.", error)
			throw "db failed to connect."
		}
	}

	try {
		let entitiesAndMigrations = {
			entities,
			migrations,
		}

		log.info("attempting db connection.")
		return createConnection({
			...config,
			...entitiesAndMigrations,
			name: "default",
		})
	} catch (error) {
		log.error("typeorm connection failed.", error)
		log.info(config)
		throw "DB failed to connect"
	}
}