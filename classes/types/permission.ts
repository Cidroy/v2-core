export type Permission = {
	permission: { [ NAMESAPCE: string ]: string }
	description: string,
	access: string,
}

export type Permissions = { [name: string]: Permission }