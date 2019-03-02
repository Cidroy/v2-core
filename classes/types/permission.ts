export type TPermission = {
	permission: { [ NAMESAPCE: string ]: string }
	description: string,
	access: string,
}

export type TPermissions = { [name: string]: TPermission }