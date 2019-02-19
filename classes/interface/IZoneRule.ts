import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IZoneRule extends IEntityBase {
	
	programme?: number,
	packages?: number,
	membershipType?: number,
	category?: number,
	zone: number

}