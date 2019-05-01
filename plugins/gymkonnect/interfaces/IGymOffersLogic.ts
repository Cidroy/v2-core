import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ICategory extends IEntityBase {
	offer: number,
	programme?: number,
	packages?: number,
	group?: number,
	membershipType?: number,
	category?: number,
	discountPercentage?: number,

}