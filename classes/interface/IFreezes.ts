import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IFreezes extends IEntityBase{
	user : number,
	count? : number,
	start : Date,
	end? : Date,
	payment? : number,
	transaction? : number,
	days? : number
	
}