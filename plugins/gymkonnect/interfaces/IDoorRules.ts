import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IDoorRules extends IEntityBase {
	category?: number,
	gymProgramme? : number,
	gymPackage?: number,
	membershipType? : number,
	counsellorType? : number,
	trainerType? : number,
	timeSlot?: number,
	zoneIds: number[],

}