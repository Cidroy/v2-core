import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IPaymentMode extends IEntityBase {
	name: string,
	description?: string
}