import { ConnectionOptions } from "typeorm"

const defaultDevConfig: ConnectionOptions = {
	name: "production",
	type: "mysql",
	host: "localhost",
	port: 17770,
	username: "root",
	password: "",
	database: "positron",
	synchronize: true,
	logging: false,
	entityPrefix: "p_",
}

export default defaultDevConfig