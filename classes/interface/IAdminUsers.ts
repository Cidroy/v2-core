import { IEntityBase } from "@classes/interface/IEntityBase"

export enum PASSWORD_PREFERENCE {
	PIN = "PIN",
	PASSWORD = "PASSWORD",
}

export interface IAdminUsers extends IEntityBase {
	/**
	 * References Users.id
	 *
	 * @type {number}
	 * @memberof IAdminUsers
	 */
	userId : number,
	username: string,
	password: string,
	pin: string,
	/**
	 * Preferred method of password
	 *
	 * @type {PASSWORD_PREFERENCE}
	 * @memberof IUser
	 */
	passwordPreference: PASSWORD_PREFERENCE,
	access: number,
	refferedToIDs: number[],
	permissions: object
	
}