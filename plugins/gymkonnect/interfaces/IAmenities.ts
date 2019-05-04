import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

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
