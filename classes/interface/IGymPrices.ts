import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymPrices extends IEntityBase {
	name: string,
	description?: string,
	category?: number,
	groupMagnitude?: number,
	couples?: boolean,
	gymProgramme? : number,
	gymPackage?: number,
	membershipType? : number,
	counsellorType? : number,
	trainerType? : number,
	price: number
}