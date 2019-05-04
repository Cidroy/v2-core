import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IZoneRule extends IEntityBase {

	programme?: number,
	packages?: number,
	membershipType?: number,
	category?: number,
	zone: number

}
