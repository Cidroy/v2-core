import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IFreezes extends IEntityBase{
	user : number,
	count? : number,
	start : Date,
	end? : Date,
	payment? : number,
	transaction? : number,
	days? : number

}
