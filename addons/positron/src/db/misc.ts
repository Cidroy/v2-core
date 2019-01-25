export enum SUPPORTED_DATABASE{
	MYSQL = "mysql"
}

export type TDatabaseConnectionOptions = {
	username: string,
	password: string,
	host: string,
	port: number,
	database: string,
	type: SUPPORTED_DATABASE
}