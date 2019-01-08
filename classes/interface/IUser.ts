import { GENDER } from "@classes/enum/misc"
import { IEntityBase } from "@classes/interface/IEntityBase"

export enum PASSWORD_PREFERENCE{
	PIN= "PIN",
	PASSWORD= "PASSWORD",
}

/**
 * Base interface for all user types
 *
 * @export
 * @interface IUser
 * @extends {IEntityBase}
 */
export interface IUser extends IEntityBase{
	firstName: string,
	middleName?: string,
	lastName?: string,
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
	/**
	 * Date of Birth
	 *
	 * @type {Date}
	 * @memberof IUser
	 */
	dob: Date,
	gender: GENDER,
	mobile: string,
	whatsapp ?: string,
	email ?: string,
	/**
	 * References Address.id for primary address
	 *
	 * @type {string}
	 * @memberof IUser
	 */
	address: string,

	access: number,
	permissions: object
}