import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPayment extends IEntityBase{
	mode : number
	receipt : string
	amount : number
	transacionId?: number
	adjustment : number
}