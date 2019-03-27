import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IDoorRules extends IEntityBase {
	category?: number,
	gymProgramme? : number,
	gymPackage?: number,
	membershipType? : number,
	counsellorType? : number,
	trainerType? : number,
	timeSlot?: number,
	zoneId: number,
	
}