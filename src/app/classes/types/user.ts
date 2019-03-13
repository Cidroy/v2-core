import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

export type TUserStoreUsers = {
	name: string,
	preference: PASSWORD_PREFERENCE
}

export type TUserStoreUser = {
	id: string | number,
	username: string,
	permissions: Record<string, string[]>,
	name: string,
	userType: string,
}