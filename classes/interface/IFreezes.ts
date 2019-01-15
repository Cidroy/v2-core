import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IFreezes extends IEntityBase{
	user : string,
	transaction? : string,
	count? : number,
	start : Date,
	end? : Date,
	payment? : string,
	days? : number
	
}