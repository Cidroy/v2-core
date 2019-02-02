import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IFreezes extends IEntityBase{
	user : number,
	transaction? : number,
	count? : number,
	start : Date,
	end? : Date,
	payment? : number,
	days? : number
	
}