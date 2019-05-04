import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IPayment extends IEntityBase{
	mode : number
	receipt : string
	amount : number
	transacionId?: number
	adjustment : number
}
