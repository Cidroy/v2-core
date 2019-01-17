import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPayment extends IEntityBase{
	mode : string
	reciept : string
	amount : number
	adjustment : number
}