import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IPaymentMode extends IEntityBase {
	name: string,
	description?: string,
	requireTransactionId? : boolean,
}
