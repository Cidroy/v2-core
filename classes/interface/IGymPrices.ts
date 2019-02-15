import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymPrices extends IEntityBase {
	name?: string,
	description?: string,
	category?: number,
	group?: number,
	gymProgramme? : number,
	gymPackage?: number,
	membershipType? : number,
	counsellorType? : number,
	trainerType? : number,
	timeSlot?: number,
	price: number,
	
}