import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ICategory extends IEntityBase {
	name: string,
	/**
	 * refers ServicesAvailable.id
	 *
	 * @type {number}
	 * @memberof ICategory
	 */
	serviceType: number,
	description?: string
}