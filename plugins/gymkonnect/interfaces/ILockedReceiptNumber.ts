import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ILockedReceiptNumber extends IEntityBase {
	receiptNumber: number
}