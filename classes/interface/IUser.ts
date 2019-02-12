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
	badgenumber?: string,
	/**
	 * Key: wdmsId
	 * value:zone
	 *
	 * @type {JSON}
	 * @memberof IUser
	 */
	wdmsIDs?: JSON,
	firstName: string,
	middleName?: string,
	lastName?: string,
	/**
	 * Date of Birth
	 *
	 * @type {Date}
	 * @memberof IUser
	 */
	dob?: Date,
	gender?: GENDER,
	mobile: string,
	whatsapp?: string,
	officePhone?: string,
	homeNumber?: string,
	email?: string,
	/**
	 * References Address.id for primary address
	 *
	 * @type {string}
	 * @memberof IUser
	 */
	address?: number,
	/**
	 * References IDTypes.id for IDTypes
	 *
	 * @type {number}
	 * @memberof IUser
	 */
	IDType?: number,
	IDNumber?: string,
	imagePath?: string,
	/**
	 * References occupations.id
	 *
	 * @type {number}
	 * @memberof IUser
	 */
	occupation?: number,
	/**
	 * References organizations.id
	 *
	 * @type {number}
	 * @memberof IUser
	 */
	organization?: number,
	/**
	 * References categories.id
	 *
	 * @type {number}
	 * @memberof IUser
	 */
	category?: number,
	emergencyName?: string,
	emergencyNumber?: string
	
}