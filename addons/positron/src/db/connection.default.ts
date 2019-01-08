import { ConnectionOptions } from "typeorm"

const defaultDevConfig: ConnectionOptions = {
	name: "default-dev",
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "positron",
	synchronize: true,
	logging: true,
	entityPrefix: "p_",
}

export default defaultDevConfig