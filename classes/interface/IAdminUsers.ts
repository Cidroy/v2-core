import { IEntityBase } from "@classes/interface/IEntityBase"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"

export interface IAdminUsers extends IEntityBase {
	/**
	 * References Users.id
	 *
	 * @type {number}
	 * @memberof IAdminUsers
	 */
	userId : number,
	username: string,
	password?: string,
	pin?: string,
	/**
	 * Preferred method of password
	 *
	 * @type {PASSWORD_PREFERENCE}
	 * @memberof IAdminUsers
	 */
	passwordPreference: PASSWORD_PREFERENCE,
	access: number,
	referredToUsers?: number[],
	permissions?: object
	
}